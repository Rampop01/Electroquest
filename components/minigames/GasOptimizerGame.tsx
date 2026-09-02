"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Zap, Gauge, Sliders, CheckCircle2, TrendingDown, Award } from "lucide-react"

interface GasOptimizerProps {
  onComplete: () => void
}

export function GasOptimizerGame({ onComplete }: GasOptimizerProps) {
  // 3 parameters to calibrate for Electroneum's micro-transaction engine
  const [gasLimit, setGasLimit] = useState(60) // Target: 21 (representing 21k standard transfer)
  const [baseFeeGwei, setBaseFeeGwei] = useState(50) // Target: 1-5 gwei (ultra-low)
  const [batchCapacity, setBatchCapacity] = useState(30) // Target: 80+ tx/sec
  const [isCalibrated, setIsCalibrated] = useState(false)

  // Calculate current transaction cost in USD (target < $0.0001)
  const currentCostUsd = ((gasLimit * 1000 * baseFeeGwei * 1e-9 * 0.005) / 10).toFixed(6)
  const isCostOptimal = parseFloat(currentCostUsd) < 0.0001 && gasLimit <= 30 && baseFeeGwei <= 10 && batchCapacity >= 70

  useEffect(() => {
    if (isCostOptimal && !isCalibrated) {
      setIsCalibrated(true)
      setTimeout(() => {
        onComplete()
      }, 1800)
    }
  }, [isCostOptimal, isCalibrated, onComplete])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-stone-900/90 border-2 border-glow-cyan/40 rounded-2xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 text-glow-cyan border border-cyan-500/30 rounded-full text-xs font-bold uppercase tracking-widest mb-2">
          <Zap className="w-3.5 h-3.5" /> Stage 2 Mini-Game: Micro-Transactions & Gas
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white font-[family-name:var(--font-cinzel-decorative)]">
          Calibrate Ultra-Low ETN Gas
        </h2>
        <p className="text-white/70 text-sm max-w-xl mx-auto mt-1 font-[family-name:var(--font-cinzel)]">
          Electroneum makes global micropayments viable with near-zero gas. Adjust the sliders below until the transaction fee drops under <span className="text-glow-amber font-bold">&lt; $0.0001 USD</span>!
        </p>
      </div>

      {/* Realtime Gas Telemetry Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-stone-800/80 p-4 rounded-xl border border-white/10 text-center">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-wider text-white/60 mb-1">
            <TrendingDown className="w-4 h-4 text-emerald-400" />
            Estimated Fee
          </div>
          <div className={`text-2xl font-black font-mono ${parseFloat(currentCostUsd) < 0.0001 ? "text-emerald-400" : "text-amber-400"}`}>
            ${currentCostUsd}
          </div>
          <div className="text-[10px] text-white/50 mt-1">Goal: &lt; $0.000100</div>
        </div>

        <div className="bg-stone-800/80 p-4 rounded-xl border border-white/10 text-center">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-wider text-white/60 mb-1">
            <Gauge className="w-4 h-4 text-cyan-400" />
            Base Gas Price
          </div>
          <div className="text-2xl font-black font-mono text-glow-cyan">
            {baseFeeGwei} Gwei
          </div>
          <div className="text-[10px] text-white/50 mt-1">Goal: ≤ 10 Gwei</div>
        </div>

        <div className="bg-stone-800/80 p-4 rounded-xl border border-white/10 text-center">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-wider text-white/60 mb-1">
            <Sliders className="w-4 h-4 text-purple-400" />
            Throughput Channel
          </div>
          <div className="text-2xl font-black font-mono text-purple-400">
            {batchCapacity} TPS
          </div>
          <div className="text-[10px] text-white/50 mt-1">Goal: ≥ 70 TPS</div>
        </div>
      </div>

      {/* Interactive Calibration Sliders */}
      <div className="space-y-6 bg-stone-950/60 p-6 rounded-xl border border-white/5 mb-6">
        <div>
          <div className="flex justify-between items-center text-sm font-bold text-white mb-2">
            <span>1. Gas Limit Calibration:</span>
            <span className="font-mono text-glow-cyan">{gasLimit}k Units</span>
          </div>
          <input
            type="range"
            min="20"
            max="100"
            value={gasLimit}
            onChange={(e) => setGasLimit(Number(e.target.value))}
            className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-[10px] text-white/40 mt-1">
            <span>21k (Optimal Micro-Tx)</span>
            <span>100k (Heavy Contract)</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center text-sm font-bold text-white mb-2">
            <span>2. Electroneum Base Fee Valve:</span>
            <span className="font-mono text-glow-amber">{baseFeeGwei} Gwei</span>
          </div>
          <input
            type="range"
            min="1"
            max="80"
            value={baseFeeGwei}
            onChange={(e) => setBaseFeeGwei(Number(e.target.value))}
            className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
          <div className="flex justify-between text-[10px] text-white/40 mt-1">
            <span>1 Gwei (Near-Zero Cost)</span>
            <span>80 Gwei (Congested)</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center text-sm font-bold text-white mb-2">
            <span>3. Batch Pipeline Bandwidth:</span>
            <span className="font-mono text-purple-300">{batchCapacity} TPS</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={batchCapacity}
            onChange={(e) => setBatchCapacity(Number(e.target.value))}
            className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
          />
          <div className="flex justify-between text-[10px] text-white/40 mt-1">
            <span>10 TPS (Low)</span>
            <span>100 TPS (High Speed)</span>
          </div>
        </div>
      </div>

      {/* Success Banner */}
      {isCalibrated && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-emerald-950/90 border-2 border-emerald-400 rounded-xl text-center shadow-[0_0_30px_rgba(52,211,153,0.4)]"
        >
          <div className="flex items-center justify-center gap-2 text-emerald-300 font-bold text-lg mb-1">
            <Award className="w-6 h-6 text-emerald-400" />
            Optimal Micro-Transaction Gas Reached (&lt; $0.0001)!
          </div>
          <p className="text-white/80 text-xs">Unlocking Next Knowledge Stage...</p>
        </motion.div>
      )}
    </div>
  )
}
