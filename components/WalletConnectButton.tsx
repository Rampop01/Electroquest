'use client';

import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ELECTRONEUM_TESTNET, SUPPORTED_CHAIN_IDS } from '@/constants/contracts';
import { LogOut, AlertTriangle, X, Wallet, ChevronRight } from 'lucide-react';

export function WalletConnectButton() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const [showConnectors, setShowConnectors] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [connectors]);

  // Clean, crisp button styling
  const gamingBtnClass = "relative overflow-hidden group px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs md:text-sm font-[family-name:var(--font-cinzel)] font-bold text-glow-amber uppercase tracking-wider bg-stone-900/90 border border-glow-amber/50 hover:border-glow-amber hover:bg-stone-800 transition-all duration-300 [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)] cursor-pointer whitespace-nowrap shrink-0";
  const gamingBtnClassCyan = "relative overflow-hidden group px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-[family-name:var(--font-cinzel)] font-bold text-cyan-300 uppercase tracking-wider bg-cyan-950/70 border border-cyan-500/60 hover:border-cyan-400 hover:bg-cyan-900 transition-all duration-300 [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)] cursor-pointer shrink-0";
  const gamingBtnClassRed = "relative overflow-hidden group px-2 sm:px-2.5 py-1.5 text-[11px] sm:text-xs font-[family-name:var(--font-cinzel)] font-bold text-red-300 uppercase tracking-wider bg-red-950/60 border border-red-500/50 hover:border-red-400 hover:bg-red-900/80 transition-all duration-300 [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)] cursor-pointer shrink-0";

  if (!mounted) {
    return (
      <button disabled className={gamingBtnClass + " opacity-50 cursor-not-allowed"}>
        Loading...
      </button>
    );
  }

  const isSupportedNetwork = chain?.id ? (SUPPORTED_CHAIN_IDS as readonly number[]).includes(chain.id) : false;
  const networkName = chain?.id === ELECTRONEUM_TESTNET.id ? 'Testnet' : 'Electroneum';

  if (isConnected && isSupportedNetwork) {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2 bg-stone-950/90 p-1 pl-2 sm:pl-3 pr-1 border border-glow-amber/40 rounded-lg backdrop-blur-md shadow-md shrink-0">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-400 uppercase tracking-wider hidden md:inline">
            {networkName}
          </span>
        </div>
        <div className="h-3.5 w-px bg-white/15 hidden md:block" />
        <span className="text-[11px] sm:text-xs md:text-sm font-bold text-glow-amber font-mono tracking-wider">
          {`${address?.slice(0, 4)}...${address?.slice(-3)}`}
        </span>
        <button
          onClick={() => disconnect()}
          title="Disconnect Wallet"
          className="p-1 text-stone-400 hover:text-red-400 hover:bg-stone-800/80 rounded transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  if (isConnected && !isSupportedNetwork) {
    return (
      <div className="flex items-center gap-1 sm:gap-2 bg-red-950/80 p-1 pl-2 pr-1 border border-red-500/40 rounded-lg backdrop-blur-md shrink-0">
        <div className="flex items-center gap-1 text-red-400 text-xs font-semibold">
          <AlertTriangle className="w-3.5 h-3.5 animate-pulse shrink-0" />
          <span className="hidden lg:inline font-[family-name:var(--font-cinzel)]">Wrong Network</span>
        </div>
        <button 
          onClick={() => switchChain({ chainId: ELECTRONEUM_TESTNET.id })}
          className={gamingBtnClassCyan}
          title="Switch to Electroneum Network"
        >
          <span className="hidden sm:inline">Switch Network</span>
          <span className="sm:hidden">Switch</span>
        </button>
        <button 
          onClick={() => disconnect()} 
          className={gamingBtnClassRed}
          title="Disconnect Wallet"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
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
    if (currentName === 'MetaMask') {
      const firstMetaMaskIndex = array.findIndex(c => getConnectorName(c) === 'MetaMask');
      return index === firstMetaMaskIndex;
    }
    return true;
  });

  // Render modal directly in document body via portal to prevent ANY clipping or header overflow issues
  const renderModalPortal = () => {
    if (!mounted || !showConnectors || typeof document === 'undefined') return null;

    return createPortal(
      <div 
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        onClick={() => setShowConnectors(false)}
      >
        <div 
          className="relative w-full max-w-sm bg-stone-900 border-2 border-amber-500/60 shadow-2xl p-6 rounded-2xl [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] text-white animate-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setShowConnectors(false)}
            className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-[family-name:var(--font-cinzel-decorative)] font-black text-glow-amber uppercase tracking-wider">
                  Connect Wallet
                </h3>
                <p className="text-xs text-white/60">Choose your Web3 gateway</p>
              </div>
            </div>
            
            <div className="space-y-2.5 my-2">
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
                    className="w-full flex items-center justify-between p-3.5 bg-stone-950/90 hover:bg-amber-500/10 border border-amber-500/30 hover:border-amber-400 rounded-xl text-left font-[family-name:var(--font-cinzel)] font-bold text-sm text-stone-200 hover:text-amber-300 transition-all cursor-pointer shadow-md group disabled:opacity-50"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400/80 group-hover:bg-amber-300" />
                      {displayName}
                    </span>
                    <span className="text-xs text-amber-400 flex items-center gap-1 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      Connect <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                );
              })}
            </div>
            
            {error && (
              <p className="text-xs text-red-400 font-mono text-center bg-red-950/50 p-2 rounded-lg border border-red-500/30">
                {error.message}
              </p>
            )}
            
            <button
              onClick={() => setShowConnectors(false)}
              className="mt-1 text-stone-400 hover:text-stone-200 transition-colors text-xs font-[family-name:var(--font-cinzel)] uppercase tracking-wider text-center py-1.5 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <button
        onClick={() => setShowConnectors(true)}
        className={gamingBtnClass}
      >
        <span className="relative z-10 flex items-center gap-1.5">
          <Wallet className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Connect Wallet</span>
          <span className="sm:hidden">Connect</span>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-glow-amber/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      </button>

      {renderModalPortal()}
    </>
  );
}
