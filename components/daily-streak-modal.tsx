'use client';

import { useState } from 'react';
import { useDailyStreak, STREAK_REWARDS } from '@/hooks/useDailyStreak';
import { Flame, CheckCircle2, Clock, X, Sparkles, Trophy } from 'lucide-react';
import { GameButton } from './game-button';
import { useSound } from './audio-player';

interface DailyStreakModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DailyStreakModal({ isOpen, onClose }: DailyStreakModalProps) {
  const {
    currentStreak,
    highestStreak,
    claimedToday,
    canClaim,
    timeUntilReset,
    activeDayNumber,
    totalXpClaimed,
    totalEtnClaimed,
    claimDailyStreak,
  } = useDailyStreak();

  const { playSound } = useSound();
  const [justClaimed, setJustClaimed] = useState(false);

  if (!isOpen) return null;

  const handleClaim = () => {
    if (!canClaim) return;
    const res = claimDailyStreak();
    if (res.success) {
      playSound('unlock');
      setJustClaimed(true);
      setTimeout(() => setJustClaimed(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-stone-950/95 border-2 border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden [clip-path:polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)] p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 p-0.5 shadow-glow-secondary animate-float">
              <div className="w-full h-full bg-stone-900 rounded-[14px] flex items-center justify-center">
                <Flame className="w-9 h-9 text-amber-400 fill-amber-400 animate-pulse" />
              </div>
            </div>
            {currentStreak > 0 && (
              <span className="absolute -bottom-1 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black text-xs px-2 py-0.5 rounded-full shadow-md font-mono">
                {currentStreak}d
              </span>
            )}
          </div>

          <h2 className="font-[family-name:var(--font-cinzel-decorative)] text-2xl md:text-3xl font-black text-glow-amber mb-1 tracking-wider">
            Daily Energy Streak
          </h2>
          <p className="text-xs md:text-sm text-stone-300 font-[family-name:var(--font-cinzel)] max-w-sm">
            Check in every 24 hours to fuel your ancient conduit, amplify your on-chain XP, and unlock weekly ETN rewards.
          </p>
        </div>

        {/* 7-Day Reward Path Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-6">
          {STREAK_REWARDS.map((reward) => {
            const isPastClaimed = claimedToday
              ? reward.day <= activeDayNumber
              : reward.day < activeDayNumber;
            const isToday = reward.day === activeDayNumber;

            return (
              <div
                key={reward.day}
                className={`relative flex flex-col items-center p-2.5 rounded-xl border transition-all duration-300 text-center ${
                  isPastClaimed
                    ? 'bg-amber-950/40 border-emerald-500/60 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                    : isToday
                    ? 'bg-amber-500/20 border-amber-400 shadow-glow-secondary scale-105 animate-pulse'
                    : 'bg-stone-900/40 border-stone-800 opacity-60'
                } ${reward.day === 7 ? 'col-span-4 sm:col-span-1' : ''}`}
              >
                {/* Day label */}
                <span className="text-[10px] font-bold text-stone-400 font-mono mb-1">
                  DAY {reward.day}
                </span>

                {/* Icon / Status */}
                <div className="my-1">
                  {isPastClaimed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : reward.day === 7 ? (
                    <Trophy className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-amber-400/80" />
                  )}
                </div>

                {/* Reward Value */}
                <span className="text-xs font-black text-glow-amber font-mono">
                  +{reward.xp}
                </span>
                <span className="text-[9px] text-stone-400 uppercase">XP</span>

                {reward.etnBonus && (
                  <span className="mt-1 text-[9px] font-bold text-cyan-400 bg-cyan-950/80 px-1 rounded border border-cyan-500/30">
                    +1 ETN
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Action / Countdown Banner */}
        <div className="bg-stone-900/70 border border-amber-500/20 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between text-xs text-stone-300">
            <span className="font-[family-name:var(--font-cinzel)] font-bold text-glow-cyan flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-cyan-400" />
              Next Reset in
            </span>
            <span className="font-mono text-sm font-bold text-amber-300 tracking-wider">
              {timeUntilReset}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-stone-400 border-t border-white/10 pt-2.5">
            <span>All-time Best: <strong className="text-stone-200">{highestStreak} Days</strong></span>
            <span>Total Earned: <strong className="text-amber-400">+{totalXpClaimed} XP</strong></span>
          </div>
        </div>

        {/* Main Claim Button */}
        <div className="flex flex-col gap-2">
          {canClaim ? (
            <GameButton
              size="lg"
              onClick={handleClaim}
              className="w-full py-4 text-base md:text-lg font-black tracking-wider uppercase"
            >
              Claim Day {activeDayNumber} Energy (+{STREAK_REWARDS[activeDayNumber - 1]?.xp} XP)
            </GameButton>
          ) : (
            <button
              disabled
              className="w-full py-3.5 px-4 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 font-[family-name:var(--font-cinzel)] font-bold text-sm tracking-wider uppercase cursor-not-allowed flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Claimed for Today (Streak Active)
            </button>
          )}

          {justClaimed && (
            <p className="text-center text-xs text-emerald-400 font-bold animate-bounce mt-1 font-[family-name:var(--font-cinzel)]">
              ✨ Energy Conduit Charged! Streak increased!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
