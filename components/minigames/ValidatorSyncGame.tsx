"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Shield, Zap, CheckCircle2, RotateCcw, Award } from "lucide-react"

interface ValidatorSyncProps {
  onComplete: () => void
}

interface ValidatorNode {
  id: number
  name: string
  org: string
  angle: number
  status: "pending" | "synced" | "faulty"
  keyRequired: number
  currentKey: number
}

const VALIDATORS_DATA: Omit<ValidatorNode, "currentKey" | "status">[] = [
  { id: 1, name: "Cambridge Academic Node", org: "University Validator", angle: 0, keyRequired: 1 },
  { id: 2, name: "Oxford Research Relay", org: "Academic Validator", angle: 72, keyRequired: 2 },
  { id: 3, name: "Global Aid Initiative", org: "NGO Validator", angle: 144, keyRequired: 3 },
  { id: 4, name: "African Tech Foundation", org: "Enterprise Validator", angle: 216, keyRequired: 1 },
  { id: 5, name: "Electroneum Core Sentry", org: "Consensus Authority", angle: 288, keyRequired: 2 },
]

export function ValidatorSyncGame({ onComplete }: ValidatorSyncProps) {
  const [nodes, setNodes] = useState<ValidatorNode[]>(
    VALIDATORS_DATA.map((v) => ({
      ...v,
      status: "pending",
      currentKey: (v.keyRequired + Math.floor(Math.random() * 2) + 1) % 4,
    }))
  )
  const [timeLeft, setTimeLeft] = useState(15)
  const [isSuccess, setIsSuccess] = useState(false)
  const [syncedCount, setSyncedCount] = useState(0)

  // Timer countdown (representing IBFT 5-second block cadence window)
  useEffect(() => {
    if (isSuccess) return
    if (timeLeft <= 0) {
      // Auto-reset keys on timeout with subtle penalty
      setTimeLeft(15)
      return
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft, isSuccess])

  // Check consensus threshold (2/3 supermajority = 4 out of 5 validators)
  useEffect(() => {
    const synced = nodes.filter((n) => n.currentKey === n.keyRequired).length
    setSyncedCount(synced)
    if (synced >= 4 && !isSuccess) {
      setIsSuccess(true)
      setTimeout(() => {
        onComplete()
      }, 1800)
    }
  }, [nodes, isSuccess, onComplete])

  const rotateKey = (id: number) => {
    if (isSuccess) return
    setNodes((prev) =>
      prev.map((node) => {
        if (node.id === id) {
          const nextKey = (node.currentKey + 1) % 4
          return {
            ...node,
            currentKey: nextKey,
            status: nextKey === node.keyRequired ? "synced" : "pending",
          }
        }
        return node
      })
    )
  }

  const keyLabels = ["α - Alpha", "β - Beta", "γ - Gamma", "δ - Delta"]

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-stone-900/90 border-2 border-glow-amber/40 rounded-2xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-glow-amber border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-widest mb-2">
          <Shield className="w-3.5 h-3.5" /> Stage 1 Mini-Game: IBFT 2.0 Consensus
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white font-[family-name:var(--font-cinzel-decorative)]">
          Synchronize Enterprise Validators
        </h2>
        <p className="text-white/70 text-sm max-w-xl mx-auto mt-1 font-[family-name:var(--font-cinzel)]">
          Electroneum is secured by known academic & NGO validators. Click nodes to rotate their cryptographic frequency until at least <span className="text-glow-cyan font-bold">4 of 5 (2/3 Supermajority)</span> reach consensus!
        </p>
      </div>

      {/* HUD Info */}
      <div className="flex justify-between items-center bg-stone-800/80 px-6 py-3 rounded-xl border border-white/10 mb-8">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-glow-amber animate-pulse" />
          <span className="text-xs uppercase tracking-wider text-white/60">Consensus Quorum:</span>
          <span className="text-base font-bold text-glow-cyan">
            {syncedCount} / 5 Nodes Synced ({Math.round((syncedCount / 5) * 100)}%)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-white/60">Block Window:</span>
          <span className={`text-lg font-black font-mono ${timeLeft <= 5 ? "text-red-400 animate-bounce" : "text-glow-amber"}`}>
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Interactive Node Radar */}
      <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto my-6 flex items-center justify-center">
        {/* Central Block Hub */}
        <div className="absolute w-28 h-28 rounded-full border-2 border-glow-cyan/50 bg-stone-950 flex flex-col items-center justify-center z-10 shadow-[0_0_25px_rgba(6,182,212,0.3)]">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping mb-1" />
          <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider">Aurelius Hub</span>
          <span className="text-xs font-black text-glow-amber">5s Block Finality</span>
        </div>

        {/* Orbit Rings */}
        <div className="absolute inset-0 rounded-full border border-white/10 animate-spin-slow pointer-events-none" />
        <div className="absolute inset-8 rounded-full border border-dashed border-amber-500/20 pointer-events-none" />

        {/* Validator Nodes Around Orbit */}
        {nodes.map((node) => {
          const isNodeSynced = node.currentKey === node.keyRequired
          const radius = 130 // px from center
          const rad = (node.angle - 90) * (Math.PI / 180)
          const x = radius * Math.cos(rad)
          const y = radius * Math.sin(rad)

          return (
            <motion.button
              key={node.id}
              onClick={() => rotateKey(node.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
              className={`absolute w-20 h-20 md:w-24 md:h-24 rounded-2xl flex flex-col items-center justify-center p-2 border-2 transition-all shadow-xl z-20 cursor-pointer ${
                isNodeSynced
                  ? "bg-emerald-950/90 border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.4)]"
                  : "bg-stone-900/90 border-amber-500/50 hover:border-amber-400"
              }`}
            >
              <div className="flex items-center gap-1 mb-1">
                {isNodeSynced ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                )}
                <span className="text-[9px] font-bold text-white/80 truncate max-w-[55px]">{node.org}</span>
              </div>
              <span className="text-[10px] font-mono text-center font-bold text-glow-cyan truncate w-full">
                {keyLabels[node.currentKey]}
              </span>
              <span className="text-[8px] text-white/50 mt-0.5">Click to Rotate</span>
            </motion.button>
          )
        })}
      </div>

      {/* Success Celebration */}
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 bg-emerald-950/90 border-2 border-emerald-400 rounded-xl text-center shadow-[0_0_30px_rgba(52,211,153,0.4)]"
        >
          <div className="flex items-center justify-center gap-2 text-emerald-300 font-bold text-lg mb-1">
            <Award className="w-6 h-6 text-emerald-400" />
            IBFT Supermajority Achieved! Block Finalized in 5s!
          </div>
          <p className="text-white/80 text-xs">Proceeding to Knowledge Verification...</p>
        </motion.div>
      )}
    </div>
  )
}
