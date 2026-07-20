/**
 * @file rarity-badge.tsx
 * @description Core implementation module for Electroquest.
 */
"use client"

import { Rarity } from "./types"

const rarityStyles: Record<Rarity, string> = {
  Common: "bg-stone-500/20 text-stone-300 border-stone-500/50",
  Rare: "bg-blue-500/20 text-blue-300 border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.2)]",
  Epic: "bg-glow-purple/20 text-glow-purple border-glow-purple shadow-[0_0_15px_rgba(168,85,247,0.4)]",
  Legendary: "bg-glow-amber/20 text-glow-amber border-glow-amber shadow-glow-amber animate-glow-pulse",
}

export function RarityBadge({ rarity }: { rarity: Rarity }) {
  return (
    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border \${rarityStyles[rarity]}`}>
      {rarity}
    </span>
  )
}