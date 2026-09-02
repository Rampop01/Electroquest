'use client'
import { Volume2, VolumeX } from 'lucide-react'
import { useState } from 'react'
import { useGameSound } from '@/hooks/useGameSound'
import { GameTooltip } from './game-tooltip'

export function SoundToggle() {
  const { toggle, soundEnabled } = useGameSound()

  return (
    <GameTooltip text={soundEnabled ? 'Mute sounds' : 'Enable sounds'} position="bottom">
      <button aria-label={soundEnabled ? "Mute sound" : "Unmute sound"}
        onClick={toggle}
        className="relative px-3 py-2 text-xs font-[family-name:var(--font-cinzel)] font-bold text-amber-300 uppercase tracking-wider bg-stone-900/80 border border-amber-500/50 hover:border-amber-500 hover:bg-stone-800 transition-all duration-300 [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] cursor-pointer"
      >
        {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>
    </GameTooltip>
  )
}
