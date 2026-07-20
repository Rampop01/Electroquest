import React from "react"
import { cn } from "@/lib/utils"

interface GameTooltipProps {
  text: string
  children: React.ReactNode
  position?: "top" | "bottom" | "left" | "right"
  className?: string
}

export function GameTooltip({ text, children, position = "top", className }: GameTooltipProps) {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-amber-500/80 border-l-transparent border-r-transparent border-b-transparent",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-amber-500/80 border-l-transparent border-r-transparent border-t-transparent",
    left: "left-full top-1/2 -translate-y-1/2 border-l-amber-500/80 border-t-transparent border-b-transparent border-r-transparent",
    right: "right-full top-1/2 -translate-y-1/2 border-r-amber-500/80 border-t-transparent border-b-transparent border-l-transparent",
  }

  return (
    <div className="relative group inline-block">
      {children}
      <div className={cn(
        "absolute z-50 px-3 py-1.5 text-xs font-mono font-bold tracking-wider text-amber-300 bg-stone-900/95 border border-amber-500/80 rounded shadow-glow-primary whitespace-nowrap opacity-0 pointer-events-none scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100",
        positionClasses[position],
        className
      )}>
        {text}
        <div className={cn(
          "absolute border-[5px]",
          arrowClasses[position]
        )} />
      </div>
    </div>
  )
}
