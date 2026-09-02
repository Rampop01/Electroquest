'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleClaim = () => {
    if (!canClaim) return;
    const res = claimDailyStreak();
    if (res.success) {
      playSound('unlock');
      setJustClaimed(true);
      setTimeout(() => setJustClaimed(false), 3000);
    }
  };

  const modalContent = (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg my-auto bg-stone-950 border-2 border-amber-500/50 rounded-2xl shadow-2xl overflow-y-auto max-h-[92vh] [clip-path:polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)] p-4 sm:p-6 md:p-8 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-4 sm:mb-6">
          <div className="relative mb-2 sm:mb-3">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl p-1 bg-stone-900/90 border border-amber-500/40 animate-float flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Electroquest Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            {currentStreak > 0 && (
              <span className="absolute -bottom-1 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black text-[11px] sm:text-xs px-2 py-0.5 rounded-full shadow-md font-mono border border-stone-950">
                {currentStreak}d
              </span>
            )}
          </div>

          <h2 className="font-[family-name:var(--font-cinzel-decorative)] text-xl sm:text-2xl md:text-3xl font-black text-glow-amber mb-1 tracking-wider">
            Daily Energy Streak
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 font-[family-name:var(--font-cinzel)] max-w-sm">
            Check in every 24 hours to fuel your ancient conduit, amplify your on-chain XP, and unlock weekly ETN rewards.
          </p>
        </div>

        {/* 7-Day Reward Path Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          {STREAK_REWARDS.map((reward) => {
            const isPastClaimed = claimedToday
              ? reward.day <= activeDayNumber
              : reward.day < activeDayNumber;
            const isToday = reward.day === activeDayNumber;

            return (
              <div
                key={reward.day}
                className={`relative flex flex-col items-center p-2 rounded-xl border transition-all duration-300 text-center ${
                  isPastClaimed
                    ? 'bg-amber-950/40 border-emerald-500/60 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                    : isToday
                    ? 'bg-amber-500/20 border-amber-400 shadow-glow-secondary scale-105 animate-pulse'
                    : 'bg-stone-900/40 border-stone-800 opacity-60'
                } ${reward.day === 7 ? 'col-span-4 sm:col-span-1' : ''}`}
              >
                {/* Day label */}
                <span className="text-[9px] sm:text-[10px] font-bold text-stone-400 font-mono mb-0.5">
                  DAY {reward.day}
                </span>

                {/* Icon / Status */}
                <div className="my-0.5 sm:my-1">
                  {isPastClaimed ? (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                  ) : reward.day === 7 ? (
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                  ) : (
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400/80" />
                  )}
                </div>

                {/* Reward Value */}
                <span className="text-[11px] sm:text-xs font-black text-glow-amber font-mono">
                  +{reward.xp}
                </span>
                <span className="text-[8px] sm:text-[9px] text-stone-400 uppercase">XP</span>

                {reward.etnBonus && (
                  <span className="mt-0.5 text-[8px] sm:text-[9px] font-bold text-cyan-400 bg-cyan-950/80 px-1 rounded border border-cyan-500/30">
                    +1 ETN
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Action / Countdown Banner */}
        <div className="bg-stone-900/80 border border-amber-500/20 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex items-center justify-between text-xs text-stone-300">
            <span className="font-[family-name:var(--font-cinzel)] font-bold text-glow-cyan flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Next Reset in
            </span>
            <span className="font-mono text-xs sm:text-sm font-bold text-amber-300 tracking-wider">
              {timeUntilReset}
            </span>
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[10px] sm:text-[11px] text-stone-400 border-t border-white/10 pt-2">
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
              className="w-full py-3.5 sm:py-4 text-sm sm:text-base md:text-lg font-black tracking-wider uppercase cursor-pointer"
            >
              Claim Day {activeDayNumber} Energy (+{STREAK_REWARDS[activeDayNumber - 1]?.xp} XP)
            </GameButton>
          ) : (
            <button
              disabled
              className="w-full py-3 px-4 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 font-[family-name:var(--font-cinzel)] font-bold text-xs sm:text-sm tracking-wider uppercase cursor-not-allowed flex items-center justify-center gap-2"
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

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
