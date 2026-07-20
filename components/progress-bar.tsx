import { cn } from "@/lib/utils"

interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100
  const isLastThree = total - current < 3

  return (
    <div className={cn(
      "bg-card/80 backdrop-blur-sm border-2 rounded-lg p-4 transition-all duration-300",
      isLastThree ? "border-amber-500 animate-glow-pulse shadow-glow-primary" : "border-glow-amber/30"
    )}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-[family-name:var(--font-cinzel)] text-sm text-foreground">Progress</span>
        <span className="font-[family-name:var(--font-cinzel-decorative)] text-sm font-bold text-glow-amber">
          {current} / {total}
        </span>
      </div>
      <div className="h-3 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-glow-amber via-primary to-glow-amber transition-all duration-500 ease-out animate-shimmer"
          style={{
            width: `${percentage}%`,
            backgroundSize: "200% 100%",
          }}
        />
      </div>
    </div>
  )
}
