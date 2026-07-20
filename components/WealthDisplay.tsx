
// NOTE: This component is part of the core Electroquest UI system
// Ensure all changes maintain the RPG theme guidelines (stone, amber, cyan)
'use client'

import { useState, useEffect } from 'react'
import { Coins, Wallet, ArrowUpRight, TrendingUp } from 'lucide-react'

export function WealthDisplay() {
  const [balance, setBalance] = useState({ celo: 0, cusd: 0 })

  useEffect(() => {
    // Simulate balance loading
    const timer = setTimeout(() => {
      setBalance({ celo: 125.42, cusd: 450.00 })
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="glass-card holographic rounded-2xl p-6 w-full max-w-sm border border-white/10 shadow-2xl relative group overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
        <div className="bg-primary/20 p-2 rounded-full animate-pulse">
          <TrendingUp className="w-4 h-4 text-primary" />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="bg-secondary/20 p-3 rounded-xl border border-secondary/30">
          <Wallet className="w-6 h-6 text-secondary" />
        </div>
        <div>
          <h4 className="text-white/60 text-xs font-bold uppercase tracking-widest">Available Balance</h4>
          <p className="text-2xl font-black text-white font-mono">
            ${(balance.celo * 0.8 + balance.cusd).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group/item">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/30">
              <span className="text-secondary font-bold text-xs">C</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white">CELO</p>
              <p className="text-[10px] text-white/40">Native Asset</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-white">{balance.celo} CELO</p>
            <p className="text-[10px] text-secondary">+$12.4%</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group/item">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <span className="text-primary font-bold text-xs">$</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white">cUSD</p>
              <p className="text-[10px] text-white/40">Celo Dollar</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-white">{balance.cusd.toFixed(2)} cUSD</p>
            <p className="text-[10px] text-primary">Stable</p>
          </div>
        </div>
      </div>

      <button className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 border border-white/5">
        View Full Portfolio <ArrowUpRight className="w-3 h-3" />
      </button>
    </div>
  )
}
