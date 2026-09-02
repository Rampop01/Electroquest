"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Smartphone, Zap, Radio, CheckCircle2, Award, Globe } from "lucide-react"

interface UtilityPowerGridProps {
  onComplete: () => void
}

interface Tower {
  id: number
  country: string
  region: string
  utility: "Mobile Airtime" | "Electricity" | "Data Bundle"
  connected: boolean
}

const INITIAL_TOWERS: Tower[] = [
  { id: 1, country: "Nigeria", region: "West Africa", utility: "Mobile Airtime", connected: false },
  { id: 2, country: "Brazil", region: "Latin America", utility: "Data Bundle", connected: false },
  { id: 3, country: "Kenya", region: "East Africa", utility: "Electricity", connected: false },
  { id: 4, country: "Philippines", region: "Southeast Asia", utility: "Mobile Airtime", connected: false },
  { id: 5, country: "South Africa", region: "Southern Africa", utility: "Electricity", connected: false },
  { id: 6, country: "India", region: "South Asia", utility: "Data Bundle", connected: false },
]

export function UtilityPowerGridGame({ onComplete }: UtilityPowerGridProps) {
  const [towers, setTowers] = useState<Tower[]>(INITIAL_TOWERS)
  const [isSuccess, setIsSuccess] = useState(false)

  const connectedCount = towers.filter((t) => t.connected).length

  useEffect(() => {
    if (connectedCount === towers.length && !isSuccess) {
      setIsSuccess(true)
      setTimeout(() => {
        onComplete()
      }, 1800)
    }
  }, [connectedCount, towers.length, isSuccess, onComplete])

  const toggleTower = (id: number) => {
    if (isSuccess) return
    setTowers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, connected: !t.connected } : t))
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-stone-900/90 border-2 border-glow-cyan/40 rounded-2xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 text-glow-cyan border border-cyan-500/30 rounded-full text-xs font-bold uppercase tracking-widest mb-2">
          <Globe className="w-3.5 h-3.5" /> Stage 6+ Mini-Game: Global Utility & Mobile Top-Ups
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white font-[family-name:var(--font-cinzel-decorative)]">
          Power the 160+ Country Utility Grid
        </h2>
        <p className="text-white/70 text-sm max-w-xl mx-auto mt-1 font-[family-name:var(--font-cinzel)]">
          Electroneum's real-world ecosystem allows users to settle everyday utility bills and mobile top-ups in 160+ countries. Click each telecommunication and power station to connect them via ETN!
        </p>
      </div>

      {/* Grid Status */}
      <div className="flex justify-between items-center bg-stone-950/80 p-4 rounded-xl border border-white/10 mb-6">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-glow-cyan animate-pulse" />
          <span className="text-xs uppercase tracking-wider text-white/60">Active ETN Relays:</span>
          <span className="text-base font-bold text-glow-cyan">
            {connectedCount} / {towers.length} Stations Online
          </span>
        </div>
        <div className="text-xs font-mono text-emerald-400">
          Network Coverage: 160+ Countries Supported
        </div>
      </div>

      {/* Country Station Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {towers.map((tower) => {
          return (
            <motion.button
              key={tower.id}
              onClick={() => toggleTower(tower.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                tower.connected
                  ? "border-emerald-400 bg-emerald-950/70 shadow-[0_0_20px_rgba(52,211,153,0.3)]"
                  : "border-cyan-500/30 bg-stone-950/80 hover:border-cyan-400"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-white">{tower.country}</span>
                {tower.connected ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Zap className="w-4 h-4 text-cyan-400/50" />
                )}
              </div>
              <div className="text-[11px] text-glow-cyan font-mono">{tower.utility}</div>
              <div className="text-[10px] text-white/50 mt-1">{tower.region}</div>
              <div className="mt-3 text-[9px] uppercase font-bold text-white/40">
                {tower.connected ? "● Online & Ready" : "○ Click to Connect"}
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Success banner */}
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 bg-emerald-950/90 border-2 border-emerald-400 rounded-xl text-center shadow-[0_0_30px_rgba(52,211,153,0.4)]"
        >
          <div className="flex items-center justify-center gap-2 text-emerald-300 font-bold text-lg mb-1">
            <Award className="w-6 h-6 text-emerald-400" />
            Global Utility & Top-Up Grid Fully Connected!
          </div>
          <p className="text-white/80 text-xs">Proceeding to Knowledge Verification...</p>
        </motion.div>
      )}
    </div>
  )
}
