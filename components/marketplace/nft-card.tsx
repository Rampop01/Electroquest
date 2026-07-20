
// NOTE: This component is part of the core Electroquest UI system
// Ensure all changes maintain the RPG theme guidelines (stone, amber, cyan)
"use client"

import { NFTItem } from "./types"
import { RarityBadge } from "./rarity-badge"
import Image from "next/image"
import { Heart } from "lucide-react"

export function NftCard({ item }: { item: NFTItem }) {
  return (
    <div className="glass-card group relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-glow-cyan border border-white/5 hover:border-glow-cyan/50 flex flex-col">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-glow-cyan/10 via-transparent to-glow-amber/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-stone-900 p-4">
        <div className="absolute top-3 left-3 z-10">
          <RarityBadge rarity={item.rarity} />
        </div>
        <div className="absolute top-3 right-3 z-10 bg-black/50 backdrop-blur-md rounded-full px-2 py-1 flex items-center gap-1 border border-white/10">
          <Heart className="w-3 h-3 text-glow-amber" />
          <span className="text-xs text-stone-300">{item.likes}</span>
        </div>
        <div className="relative w-full h-full rounded-lg overflow-hidden border border-white/10 shadow-inner">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg font-(family-name:--font-cinzel-decorative) text-foreground line-clamp-1">{item.name}</h3>
        </div>
        
        <div className="text-xs text-muted-foreground mb-4 font-mono">
          by {item.creator}
        </div>
        
        <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Price</div>
            <div className="font-bold text-glow-amber flex items-center gap-1">
              <span className="text-xl">{item.price}</span> ETN
            </div>
          </div>
          
          <button className="px-4 py-2 bg-glow-cyan/20 text-glow-cyan border border-glow-cyan rounded-lg font-bold text-sm transition-all hover:bg-glow-cyan hover:text-stone-900 hover:shadow-glow-cyan">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}