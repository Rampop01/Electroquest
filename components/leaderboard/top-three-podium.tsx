/**
 * @file top-three-podium.tsx
 * @description Core implementation module for Electroquest.
 */
"use client"

import { PlayerStats } from "./types"
import Image from "next/image"
import { Trophy, Medal, Award } from "lucide-react"

interface TopThreePodiumProps {
  players: PlayerStats[]
}

export function TopThreePodium({ players }: TopThreePodiumProps) {
  if (players.length < 3) return null

  // Rank 1, 2, 3
  const first = players[0]
  const second = players[1]
  const third = players[2]

  return (
    <div className="flex flex-row justify-center items-end gap-2 md:gap-6 pt-12 pb-8 h-80">
      {/* Rank 2 */}
      <PodiumSpot player={second} rank={2} height="h-32" colorClass="text-slate-300" borderClass="border-slate-300" icon={<Medal className="w-6 h-6 text-slate-300" />} />
      
      {/* Rank 1 */}
      <PodiumSpot player={first} rank={1} height="h-44" colorClass="text-glow-amber" borderClass="border-glow-amber" icon={<Trophy className="w-8 h-8 text-glow-amber animate-glow-pulse" />} />
      
      {/* Rank 3 */}
      <PodiumSpot player={third} rank={3} height="h-24" colorClass="text-amber-700" borderClass="border-amber-700" icon={<Award className="w-6 h-6 text-amber-700" />} />
    </div>
  )
}

function PodiumSpot({ player, rank, height, colorClass, borderClass, icon }: { player: PlayerStats, rank: number, height: string, colorClass: string, borderClass: string, icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center group">
      <div className="relative mb-4 z-10 transition-transform duration-300 group-hover:-translate-y-2">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
          {icon}
        </div>
        <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-4 \${borderClass} shadow-glow-primary`}>
          <Image
            src={player.avatarUrl || "/placeholder-user.jpg"}
            alt={player.name}
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        </div>
        <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-stone-dark border-2 \${borderClass} flex items-center justify-center font-bold font-(family-name:--font-cinzel) \${colorClass}`}>
          {rank}
        </div>
      </div>
      <div className="text-center mb-2 z-10">
        <h3 className="font-bold text-sm md:text-lg text-foreground truncate w-24 md:w-32">{player.name}</h3>
        <p className={`font-bold text-xs md:text-sm \${colorClass}`}>{player.totalXp} XP</p>
      </div>
      <div className={`w-24 md:w-32 \${height} glass-card holographic rounded-t-lg relative overflow-hidden border-t-2 border-l border-r \${borderClass} opacity-80`}>
        <div className="absolute inset-0 bg-linear-to-t from-stone-900 to-transparent"></div>
        <div className="absolute inset-0 bg-stone-800 opacity-20 mix-blend-overlay"></div>
      </div>
    </div>
  )
}