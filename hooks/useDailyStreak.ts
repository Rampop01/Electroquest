'use client';

import { useState, useEffect, useCallback } from 'react';

export interface StreakReward {
  day: number;
  xp: number;
  etnBonus?: number;
  badge?: string;
  isMilestone?: boolean;
}

export const STREAK_REWARDS: StreakReward[] = [
  { day: 1, xp: 10 },
  { day: 2, xp: 15 },
  { day: 3, xp: 25, badge: 'Flame Keeper' },
  { day: 4, xp: 35 },
  { day: 5, xp: 50 },
  { day: 6, xp: 75 },
  { day: 7, xp: 100, etnBonus: 1, badge: 'Aurelius Guardian', isMilestone: true },
];

export interface StreakState {
  currentStreak: number;
  highestStreak: number;
  lastCheckInDate: string | null; // 'YYYY-MM-DD' UTC
  totalXpClaimed: number;
  totalEtnClaimed: number;
}

const STORAGE_KEY = 'electroquest_daily_streak_v1';

function getUtcDateString(date = new Date()): string {
  return date.toISOString().split('T')[0];
}

function getYesterdayUtcString(): string {
  const yesterday = new Date();
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  return getUtcDateString(yesterday);
}

function getSecondsUntilNextUtcMidnight(): number {
  const now = new Date();
  const nextMidnight = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
    0, 0, 0, 0
  ));
  return Math.max(0, Math.floor((nextMidnight.getTime() - now.getTime()) / 1000));
}

export function useDailyStreak() {
  const [streakState, setStreakState] = useState<StreakState>({
    currentStreak: 0,
    highestStreak: 0,
    lastCheckInDate: null,
    totalXpClaimed: 0,
    totalEtnClaimed: 0,
  });

  const [timeUntilReset, setTimeUntilReset] = useState<string>('00:00:00');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as StreakState;
        const todayUtc = getUtcDateString();
        const yesterdayUtc = getYesterdayUtcString();

        // If last check in was before yesterday, the streak expired
        if (parsed.lastCheckInDate && parsed.lastCheckInDate !== todayUtc && parsed.lastCheckInDate !== yesterdayUtc) {
          const resetState = {
            ...parsed,
            currentStreak: 0,
          };
          setStreakState(resetState);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(resetState));
        } else {
          setStreakState(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to parse streak state', e);
    }
    setIsLoaded(true);
  }, []);

  // Update countdown timer every second
  useEffect(() => {
    const updateTimer = () => {
      const totalSec = getSecondsUntilNextUtcMidnight();
      const hrs = Math.floor(totalSec / 3600).toString().padStart(2, '0');
      const mins = Math.floor((totalSec % 3600) / 60).toString().padStart(2, '0');
      const secs = (totalSec % 60).toString().padStart(2, '0');
      setTimeUntilReset(`${hrs}:${mins}:${secs}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const todayUtc = getUtcDateString();
  const claimedToday = streakState.lastCheckInDate === todayUtc;
  const currentDayIndex = streakState.currentStreak % 7; // 0 to 6
  const activeDayNumber = claimedToday
    ? ((streakState.currentStreak - 1) % 7) + 1
    : (streakState.currentStreak % 7) + 1;

  // Claim check-in
  const claimDailyStreak = useCallback(() => {
    const today = getUtcDateString();
    if (streakState.lastCheckInDate === today) {
      return { success: false, message: 'Already claimed today!' };
    }

    const yesterday = getYesterdayUtcString();
    let newStreak = 1;
    if (streakState.lastCheckInDate === yesterday) {
      newStreak = streakState.currentStreak + 1;
    }

    const dayRewardIndex = (newStreak - 1) % 7;
    const reward = STREAK_REWARDS[dayRewardIndex];

    const updated: StreakState = {
      currentStreak: newStreak,
      highestStreak: Math.max(streakState.highestStreak, newStreak),
      lastCheckInDate: today,
      totalXpClaimed: streakState.totalXpClaimed + reward.xp,
      totalEtnClaimed: streakState.totalEtnClaimed + (reward.etnBonus || 0),
    };

    setStreakState(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save streak', e);
    }

    return {
      success: true,
      streak: newStreak,
      reward,
    };
  }, [streakState]);

  return {
    isLoaded,
    currentStreak: streakState.currentStreak,
    highestStreak: streakState.highestStreak,
    claimedToday,
    canClaim: !claimedToday,
    timeUntilReset,
    activeDayNumber,
    totalXpClaimed: streakState.totalXpClaimed,
    totalEtnClaimed: streakState.totalEtnClaimed,
    rewards: STREAK_REWARDS,
    claimDailyStreak,
  };
}
