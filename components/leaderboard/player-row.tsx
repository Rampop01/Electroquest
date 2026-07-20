
// NOTE: This component is part of the core Electroquest UI system
// Ensure all changes maintain the RPG theme guidelines (stone, amber, cyan)
"use client"

import { PlayerStats } from "./types"
import Image from "next/image"

interface PlayerRowProps {
  player: PlayerStats
}

export function PlayerRow({ player }: PlayerRowProps) {
  const isTopThree = player.rank <= 3
  
  return (
    <div className={`flex items-center justify-between p-4 rounded-lg mb-3 glass-card transition-all duration-200 hover:bg-white/5 hover:border-glow-cyan/50 hover:shadow-glow-cyan/20 \${player.isCurrentUser ? 'border-glow-amber bg-glow-amber/10' : ''}`}>
      <div className="flex items-center gap-4">
        <div className={`w-8 text-center font-bold font-(family-name:--font-cinzel) \${isTopThree ? 'text-glow-amber' : 'text-muted-foreground'}`}>
          #{player.rank}
        </div>
        
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-border">
          <Image
            src={player.avatarUrl || "/placeholder-user.jpg"}
            alt={player.name}
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        
        <div>
          <div className="font-bold text-foreground flex items-center gap-2">
            {player.name}
            {player.isCurrentUser && (
              <span className="text-[10px] bg-glow-amber/20 text-glow-amber px-2 py-0.5 rounded-full uppercase tracking-wider">You</span>
            )}
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            {player.address}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-8 text-right">
        <div className="hidden md:block">
          <div className="text-xs text-muted-foreground uppercase tracking-wider">Quests</div>
          <div className="font-bold">{player.questsCompleted}</div>
        </div>
        <div>
          <div className="text-xs text-glow-cyan uppercase tracking-wider">Total XP</div>
          <div className="font-bold font-(family-name:--font-cinzel-decorative) text-lg text-glow-cyan">{player.totalXp.toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}