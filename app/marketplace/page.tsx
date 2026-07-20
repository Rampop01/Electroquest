"use client"

import { useState } from "react"
import { MarketplaceHeader, CategoryFilter, NftGrid, MOCK_NFTS, CATEGORIES } from "@/components/marketplace"
import { ComingSoonOverlay } from "@/components/coming-soon-overlay"

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredItems = activeCategory === "All" 
    ? MOCK_NFTS 
    : MOCK_NFTS.filter(item => item.category === activeCategory)

  return (
    <div className="bg-background min-h-screen relative overflow-hidden pb-20">
      <ComingSoonOverlay 
        title="The Grand Bazaar is Currently Sealed" 
        description="Soon, you will be able to trade your hard-earned Chapter NFTs, legendary weapons, and rare artifacts with other questers via our Marketplace smart contract. Gather your CELO and prepare for the gates to open!" 
      />
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(103,232,249,0.1),transparent_50%)] animate-glow-pulse" />
      <div className="absolute inset-0 bg-[url('/dark-stone-dungeon-room-medieval.jpg')] bg-cover bg-center opacity-10" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-glow-cyan rounded-full animate-float-slow"
            style={{
              left: `\${Math.random() * 100}%`,
              top: `\${Math.random() * 100}%`,
              animationDelay: `\${Math.random() * 5}s`,
              animationDuration: `\${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        <MarketplaceHeader />
        
        <div className="flex justify-center">
          <CategoryFilter 
            categories={CATEGORIES} 
            activeCategory={activeCategory} 
            onSelect={setActiveCategory} 
          />
        </div>
        
        <NftGrid items={filteredItems} />
      </div>
    </div>
  )
}