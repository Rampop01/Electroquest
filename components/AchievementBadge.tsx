import { Star, Shield, Zap, Award } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AchievementBadge({ type, level }: { type: 'explorer' | 'builder' | 'stable' | 'governor', level: number }) {
  const configs = {
    explorer: { icon: Zap, label: 'Celo Explorer', color: 'text-primary border-primary/30 bg-primary/10' },
    builder: { icon: Award, label: 'System Builder', color: 'text-secondary border-secondary/30 bg-secondary/10' },
    stable: { icon: Shield, label: 'Stability Guard', color: 'text-primary border-primary/30 bg-primary/10' },
    governor: { icon: Star, label: 'Ecosystem Governor', color: 'text-secondary border-secondary/30 bg-secondary/10' }
  }

  const { icon: Icon, label, color } = configs[type]

  return (
    <div className={cn(
      "glass-card holographic rounded-2xl p-4 border flex flex-col items-center gap-3 transition-all hover:scale-110 cursor-pointer",
      color
    )}>
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-xl">
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-center">
        <h6 className="text-[10px] font-black uppercase tracking-widest opacity-60">Achievement</h6>
        <p className="text-sm font-bold text-white whitespace-nowrap">{label}</p>
        <div className="flex gap-1 justify-center mt-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={cn("w-1.5 h-1.5 rounded-full", i < level ? "bg-secondary" : "bg-white/10")} />
          ))}
        </div>
      </div>
    </div>
  )
}
