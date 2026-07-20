/**
 * @file nft-grid.tsx
 * @description Core implementation module for Electroquest.
 */
"use client"

import { NFTItem } from "./types"
import { NftCard } from "./nft-card"

export function NftGrid({ items }: { items: NFTItem[] }) {
  if (items.length === 0) {
    return (
      <div className="py-20 text-center text-muted-foreground glass-card rounded-2xl border border-dashed border-white/20">
        <p className="text-xl font-(family-name:--font-cinzel)">No artifacts found in this realm.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map(item => (
        <NftCard key={item.id} item={item} />
      ))}
    </div>
  )
}