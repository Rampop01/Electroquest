
/* A11Y NOTE: Ensure proper ARIA roles and tabIndex are maintained for screen readers */
"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface FloatingLetterProps {
  letter: string
  position: { x: string; y: string }
  isFound: boolean
  onClick: () => void
  hint: string
}

export function FloatingLetter({ letter, position, isFound, onClick, hint }: FloatingLetterProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      className={cn(
        "absolute group transition-all duration-300",
        isFound ? "opacity-0 pointer-events-none scale-0" : "opacity-100 scale-100",
        "hover:scale-125 active:scale-95",
      )}
      style={{
        left: position.x,
        top: position.y,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={isFound}
    >
      {/* Letter with glow */}
      <div className="relative">
        <div className="text-6xl font-[family-name:var(--font-cinzel-decorative)] font-black text-glow-amber animate-glow-pulse cursor-pointer">
          {letter}
        </div>
        <div className="absolute inset-0 blur-2xl bg-glow-amber/50 animate-glow-pulse -z-10" />
      </div>

      {/* Hint tooltip */}
      {isHovered && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 p-3 bg-card/95 backdrop-blur-sm border border-glow-amber/50 rounded-lg animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          <p className="font-[family-name:var(--font-cinzel)] text-sm text-foreground text-center">{hint}</p>
        </div>
      )}
    </button>
  )
}
