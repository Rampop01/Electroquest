
/* A11Y NOTE: Ensure proper ARIA roles and tabIndex are maintained for screen readers */
'use client';

import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { GameButton } from './game-button';
import { useState, useEffect } from 'react';
import { ELECTRONEUM_NETWORK } from '@/constants/contracts';

export function WalletConnectButton() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const [showConnectors, setShowConnectors] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Debug: Log available connectors
    if (connectors.length > 0) {
      
    }
  }, [connectors]);

  // Custom gaming button style for the wallet connector
  const gamingBtnClass = "relative overflow-hidden group px-4 py-2 text-xs md:text-sm font-[family-name:var(--font-cinzel)] font-bold text-glow-amber uppercase tracking-wider bg-stone-900/80 border border-glow-amber/50 hover:border-glow-amber hover:bg-stone-800 transition-all duration-300 [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]";
  const gamingBtnClassCyan = "relative overflow-hidden group px-4 py-2 text-xs md:text-sm font-[family-name:var(--font-cinzel)] font-bold text-glow-cyan uppercase tracking-wider bg-stone-900/80 border border-glow-cyan/50 hover:border-glow-cyan hover:bg-stone-800 transition-all duration-300 [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]";
  const gamingBtnClassRed = "relative overflow-hidden group px-4 py-2 text-xs md:text-sm font-[family-name:var(--font-cinzel)] font-bold text-red-400 uppercase tracking-wider bg-stone-900/80 border border-red-500/50 hover:border-red-500 hover:bg-stone-800 transition-all duration-300 [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]";

  // Don't render during SSR
  if (!mounted) {
    return (
      <button disabled className={gamingBtnClass + " opacity-50 cursor-not-allowed"}>
        Loading...
      </button>
    );
  }

  if (isConnected && !(chain?.id !== ELECTRONEUM_NETWORK.id)) {
    return (
      <div className="flex items-center gap-3 bg-stone-900/50 p-1 pr-1 border border-glow-amber/20 backdrop-blur-sm [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]">
        <span className="text-xs md:text-sm font-bold text-glow-cyan font-[family-name:var(--font-cinzel)] tracking-wider pl-3">
          {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
        </span>
        <button className={gamingBtnClass} onClick={() => disconnect()}>
          Disconnect
        </button>
      </div>
    );
  }

  if (isConnected && (chain?.id !== ELECTRONEUM_NETWORK.id)) {
    return (
      <div className="flex items-center gap-2 bg-stone-900/50 p-1 border border-red-500/30 backdrop-blur-sm [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]">
        <span className="text-xs md:text-sm text-red-400 font-[family-name:var(--font-cinzel)] font-bold animate-pulse pl-2">Wrong Realm</span>
        <button 
          onClick={() => switchChain({ chainId: ELECTRONEUM_NETWORK.id })}
          className={gamingBtnClassCyan}
        >
          Enter Celo
        </button>
        <button onClick={() => disconnect()} className={gamingBtnClassRed}>
          Flee
        </button>
      </div>
    );
  }

  if (!showConnectors) {
    return (
      <button
        onClick={() => setShowConnectors(true)}
        className={gamingBtnClass}
      >
        <span className="relative z-10">Connect Wallet</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-glow-amber/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      </button>
    );
  }

  const getConnectorName = (connector: any) => {
    const name = connector.name?.toLowerCase() || '';
    const id = connector.id?.toLowerCase() || '';
    
    if (name.includes('metamask') || id.includes('metamask')) {
      return 'MetaMask';
    }
    
    if (name.includes('coinbase') || id.includes('coinbase')) {
      return 'Coinbase Wallet';
    }
    
    if (name.includes('walletconnect') || id.includes('walletconnect')) {
      return 'WalletConnect';
    }
    
    if (name.includes('injected') || id.includes('injected')) {
      if (typeof window !== 'undefined') {
        if ((window as any).ethereum?.isMetaMask) {
          return 'MetaMask';
        }
        if ((window as any).ethereum?.isBraveWallet) {
          return 'Brave Wallet';
        }
        if ((window as any).ethereum?.isRabby) {
          return 'Rabby Wallet';
        }
      }
      return 'Browser Wallet';
    }
    
    return connector.name || 'Unknown Wallet';
  };

  // Filter out duplicate wallet types
  const uniqueConnectors = connectors.filter((connector, index, array) => {
    const currentName = getConnectorName(connector);
    
    // For MetaMask, only keep the first one we encounter
    if (currentName === 'MetaMask') {
      const firstMetaMaskIndex = array.findIndex(c => getConnectorName(c) === 'MetaMask');
      return index === firstMetaMaskIndex;
    }
    
    return true;
  });

  return (
    <div className="relative">
      <div 
        className="fixed inset-0 z-40" 
        onClick={() => setShowConnectors(false)}
      />
      
      <div className="absolute right-0 top-full mt-2 z-50 bg-stone-900 border border-glow-amber/40 shadow-glow-secondary p-3 min-w-48 holographic glass-card [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]">
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-[family-name:var(--font-cinzel)] font-bold text-glow-amber mb-1 uppercase tracking-wider border-b border-glow-amber/20 pb-1 text-center">Choose Gateway</h3>
          
          {uniqueConnectors.map((connector) => {
            const displayName = getConnectorName(connector);
            
            return (
              <button
                key={connector.uid}
                onClick={() => {
                  connect({ connector });
                  setShowConnectors(false);
                }}
                disabled={isPending}
                className={gamingBtnClass + " w-full text-left justify-start !px-3 !py-1.5 opacity-90 hover:opacity-100 disabled:opacity-50"}
              >
                {isPending ? 'Summoning...' : displayName}
              </button>
            );
          })}
          
          {error && (
            <p className="text-xs text-red-400 mt-1 font-[family-name:var(--font-cinzel)] text-center">
              {error.message}
            </p>
          )}
          
          <button
            onClick={() => setShowConnectors(false)}
            className="mt-1 text-stone-400 hover:text-glow-amber transition-colors text-xs font-[family-name:var(--font-cinzel)] uppercase tracking-wider text-center py-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
