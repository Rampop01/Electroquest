// @ts-check
"use client"

import { Crown } from "lucide-react"

export function LeaderboardHeader() {
  return (
    <div className="text-center pt-16 pb-8">
      <div className="flex justify-center mb-4">
        <Crown className="w-16 h-16 text-glow-amber animate-glow-pulse" />
      </div>
      <h1 className="font-(family-name:--font-cinzel-decorative) text-4xl md:text-6xl font-black text-glow-amber mb-4 text-glow-sm">
        Hall of Champions
      </h1>
      <p className="font-(family-name:--font-cinzel) text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
        Only the most dedicated quester will claim the top spot. Where do you stand?
      </p>
    </div>
  )
}