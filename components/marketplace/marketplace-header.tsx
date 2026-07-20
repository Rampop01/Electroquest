
// NOTE: This component is part of the core Electroquest UI system
// Ensure all changes maintain the RPG theme guidelines (stone, amber, cyan)
"use client"

import { Coins } from "lucide-react"

export function MarketplaceHeader() {
  return (
    <div className="text-center pt-16 pb-12">
      <div className="flex justify-center mb-4">
        <Coins className="w-16 h-16 text-glow-cyan animate-glow-pulse" />
      </div>
      <h1 className="font-(family-name:--font-cinzel-decorative) text-4xl md:text-6xl font-black text-glow-cyan mb-4 text-glow-sm">
        The Grand Bazaar
      </h1>
      <p className="font-(family-name:--font-cinzel) text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
        Trade rare artifacts, powerful weapons, and ancient knowledge.
      </p>
    </div>
  )
}

export function CategoryFilter({ categories, activeCategory, onSelect }: { categories: string[], activeCategory: string, onSelect: (c: string) => void }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 \${
            activeCategory === category
              ? "bg-glow-cyan text-black shadow-glow-cyan border-glow-cyan"
              : "bg-white/5 text-foreground border-white/10 hover:bg-white/10 hover:border-glow-cyan/50"
          } border`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}