import { Trophy } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function CompletionBadge({ show }: { show: boolean }) {
  const [render, setRender] = useState(false)

  useEffect(() => {
    if (show) setRender(true)
  }, [show])

  if (!render) return null

  return (
    <div className={cn(
      "fixed top-24 right-4 md:right-8 z-50 flex items-center gap-3 bg-stone-900/90 border-2 border-amber-500 shadow-glow-primary rounded-lg p-4 backdrop-blur-md transition-all duration-700",
      show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
    )}>
      <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/50">
        <Trophy className="w-5 h-5 text-amber-500 animate-pulse" />
      </div>
      <div>
        <h4 className="font-bold text-amber-400 text-sm tracking-wider" style={{ fontFamily: 'var(--font-cinzel-decorative)' }}>
          QUEST COMPLETE
        </h4>
        <p className="text-xs text-foreground/80 font-mono">
          Rewards Available
        </p>
      </div>
    </div>
  )
}
