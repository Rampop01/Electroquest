'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WalletConnectButton } from './WalletConnectButton';
import { SoundToggle } from './sound-toggle';
import { DailyStreakModal } from './daily-streak-modal';
import { useDailyStreak } from '@/hooks/useDailyStreak';
import { cn } from '@/lib/utils';
import { Menu, X, Flame } from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Home', href: '/', isNew: false },
  { name: 'Electro Quests', href: '/electro-quests', isNew: false },
  { name: 'Marketplace', href: '/marketplace', isNew: false },
  { name: 'Leaderboard', href: '/leaderboard', isNew: false },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [streakModalOpen, setStreakModalOpen] = useState(false);
  const { currentStreak, canClaim } = useDailyStreak();
  
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href) ?? false;
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-amber-900/30 bg-stone-950/90 backdrop-blur-md shadow-md">
        <div className="w-full max-w-7xl mx-auto flex h-16 items-center justify-between px-3 sm:px-4 md:px-6">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 md:gap-6 min-w-0">
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-amber-500/30 bg-stone-900/60 group-hover:scale-105 transition-transform duration-300 shrink-0 flex items-center justify-center p-0.5">
                <img 
                  src="/logo.png" 
                  alt="Electroquest Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-[family-name:var(--font-cinzel-decorative)] font-black text-sm sm:text-base md:text-lg tracking-wider text-glow-amber group-hover:text-glow-cyan transition-colors truncate">
                  ELECTROQUEST
                </span>
                <span className="text-[9px] font-[family-name:var(--font-cinzel)] text-cyan-400/80 tracking-widest uppercase -mt-1 hidden md:block">
                  Aurelius Smart Chain
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'relative px-3.5 py-1.5 rounded-md transition-colors duration-200 font-[family-name:var(--font-cinzel)] tracking-wider text-xs md:text-sm font-semibold',
                      active ? 'text-glow-amber bg-amber-950/30 border border-amber-500/30' : 'text-stone-300 hover:text-glow-amber hover:bg-stone-900/50'
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          {/* Right Action Tools: Streak (Desktop), Sound & Wallet */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            {/* Daily Streak Flame Button (Desktop Only) */}
            <button
              onClick={() => setStreakModalOpen(true)}
              title={canClaim ? "Claim today's daily streak energy!" : `${currentStreak} Day Streak Active`}
              className={cn(
                "hidden md:flex relative items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all duration-300 font-mono text-xs font-bold cursor-pointer shrink-0",
                canClaim 
                  ? "bg-amber-500/20 border-amber-400/80 text-amber-300 shadow-glow-secondary animate-pulse"
                  : "bg-stone-900/80 border-amber-500/30 text-amber-400 hover:border-amber-400"
              )}
            >
              <Flame className={cn("w-4 h-4", canClaim ? "text-amber-400 fill-amber-400 animate-bounce" : "text-amber-400 fill-amber-400/60")} />
              <span>{currentStreak > 0 ? `${currentStreak}d` : 'Streak'}</span>
              {canClaim && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute -top-0.5 -right-0.5" />
              )}
            </button>

            <div className="hidden sm:block shrink-0">
              <SoundToggle />
            </div>
            
            <div className="shrink-0">
              <WalletConnectButton />
            </div>

            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-stone-300 hover:text-amber-400 rounded-lg hover:bg-stone-800 transition-colors shrink-0 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-stone-900/95 backdrop-blur-md border-b border-amber-900/40 shadow-2xl animate-in slide-in-from-top-2 z-50">
          <nav className="flex flex-col px-4 py-4 space-y-2">
            {/* Mobile Daily Streak Card */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setStreakModalOpen(true);
              }}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-xl border font-[family-name:var(--font-cinzel)] font-bold text-sm transition-all cursor-pointer shadow-md mb-2",
                canClaim 
                  ? "bg-amber-500/20 border-amber-400 text-amber-300 animate-pulse" 
                  : "bg-stone-950/80 border-amber-500/30 text-amber-400 hover:border-amber-400"
              )}
            >
              <div className="flex items-center gap-2">
                <Flame className={cn("w-4 h-4", canClaim ? "text-amber-400 fill-amber-400 animate-bounce" : "text-amber-400 fill-amber-400/60")} />
                <span>Daily Energy Streak</span>
              </div>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-stone-900 border border-amber-500/40">
                {currentStreak > 0 ? `${currentStreak} Days 🔥` : 'Claim Energy'}
              </span>
            </button>

            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block px-4 py-2.5 rounded-lg font-[family-name:var(--font-cinzel)] tracking-wider text-sm font-semibold border transition-colors',
                    active 
                      ? 'text-glow-amber bg-amber-950/40 border-amber-500/40' 
                      : 'text-stone-300 hover:text-glow-amber hover:bg-stone-800/80 border-transparent'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
            
            <div className="pt-3 mt-1 border-t border-white/10 flex items-center justify-between px-4">
              <span className="text-xs text-stone-400 font-[family-name:var(--font-cinzel)] font-bold">Sound FX</span>
              <SoundToggle />
            </div>
          </nav>
        </div>
      )}
    </header>

    {/* Daily Streak Modal */}
    <DailyStreakModal 
      isOpen={streakModalOpen} 
      onClose={() => setStreakModalOpen(false)} 
    />
  </>
  );
}
