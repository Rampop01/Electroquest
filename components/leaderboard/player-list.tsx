
/* A11Y NOTE: Ensure proper ARIA roles and tabIndex are maintained for screen readers */
"use client"

import { PlayerStats } from "./types"
import { PlayerRow } from "./player-row"

interface PlayerListProps {
  players: PlayerStats[]
}

export function PlayerList({ players }: PlayerListProps) {
  // Filter out top 3 since they are in the podium
  const remainingPlayers = players.filter(p => p.rank > 3)

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="flex justify-between px-6 pb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-white/10 mb-4">
        <div>Rank & Player</div>
        <div className="flex gap-12">
          <div className="hidden md:block">Quests</div>
          <div>Score</div>
        </div>
      </div>
      
      <div className="space-y-1">
        {remainingPlayers.map(player => (
          <PlayerRow key={player.id} player={player} />
        ))}
      </div>
    </div>
  )
}