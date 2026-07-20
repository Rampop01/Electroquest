"use client"

import { LeaderboardHeader, TopThreePodium, PlayerList, LEADERBOARD_DATA } from "@/components/leaderboard"
import { ComingSoonOverlay } from "@/components/coming-soon-overlay"

export default function LeaderboardPage() {
  return (
    <div className="bg-background min-h-screen relative overflow-hidden pb-20">
      <ComingSoonOverlay 
        title="The Hall of Champions is Being Built" 
        description="Soon, your on-chain XP and quest victories will be etched into the global rankings. Only the most dedicated questers will claim the top spots on the podium once the Leaderboard contract goes live!" 
      />
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,204,92,0.1),transparent_50%)] animate-glow-pulse" />
      <div className="absolute inset-0 bg-[url('/dark-mystical-map-with-ancient-paths.jpg')] bg-cover bg-center opacity-10" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-glow-amber rounded-full animate-float-slow"
            style={{
              left: `\${Math.random() * 100}%`,
              top: `\${Math.random() * 100}%`,
              animationDelay: `\${Math.random() * 5}s`,
              animationDuration: `\${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <LeaderboardHeader />
        
        <div className="max-w-5xl mx-auto glass-card rounded-2xl border-2 border-glow-amber/20 overflow-hidden shadow-2xl relative">
          <div className="absolute inset-0 bg-stone-dark/80 backdrop-blur-xl -z-10"></div>
          
          <TopThreePodium players={LEADERBOARD_DATA} />
          <PlayerList players={LEADERBOARD_DATA} />
        </div>
      </div>
    </div>
  )
}