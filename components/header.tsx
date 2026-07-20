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
    <header className="sticky top-0 z-50 w-full border-b border-amber-900/20 bg-stone-900/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4">
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-amber-100/70 hover:text-amber-400 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <nav className="flex items-center space-x-1 text-sm font-medium">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={cn(
                      'relative px-4 py-2 rounded-md transition-colors duration-200 font-[family-name:var(--font-cinzel)] tracking-wider',
                      active ? 'text-glow-amber' : 'text-stone-300 hover:text-glow-amber'
                    )}
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className={cn(
                      'absolute bottom-0 left-1/2 w-0 h-0.5 bg-glow-amber transition-all duration-200 -translate-x-1/2',
                      active && 'w-4/5 shadow-glow-secondary'
                    )}></span>
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <SoundToggle />
          <WalletConnectButton />
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
