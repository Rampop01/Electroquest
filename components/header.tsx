'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WalletConnectButton } from './WalletConnectButton';
import { SoundToggle } from './sound-toggle';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
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
  
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href) ?? false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-900/30 bg-stone-950/90 backdrop-blur-md shadow-2xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        
        {/* Logo & Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 via-amber-600 to-cyan-500 p-0.5 shadow-glow-primary group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-stone-950 rounded-[7px] flex items-center justify-center">
                <span className="text-amber-400 font-bold text-sm">⚡</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-[family-name:var(--font-cinzel-decorative)] font-black text-base md:text-lg tracking-wider text-glow-amber group-hover:text-glow-cyan transition-colors">
                ELECTROQUEST
              </span>
              <span className="text-[9px] font-[family-name:var(--font-cinzel)] text-cyan-400/80 tracking-widest uppercase -mt-1 hidden sm:block">
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
        
        {/* Right Action Tools: Sound & Wallet */}
        <div className="flex items-center gap-2.5">
          <SoundToggle />
          <div className="h-5 w-px bg-white/15 hidden sm:block" />
          <WalletConnectButton />

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-stone-300 hover:text-amber-400 rounded-lg hover:bg-stone-800 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-stone-900/95 backdrop-blur border-b border-amber-900/20 shadow-glow-secondary animate-in slide-in-from-top-2">
          <nav className="flex flex-col px-4 py-4 space-y-4">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block px-4 py-2 rounded-md font-[family-name:var(--font-cinzel)] tracking-wider border border-transparent',
                    active 
                      ? 'text-glow-amber bg-stone-800 border-glow-amber/30' 
                      : 'text-stone-300 hover:text-glow-amber hover:bg-stone-800'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
