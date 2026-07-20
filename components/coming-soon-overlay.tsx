/**
 * @file coming-soon-overlay.tsx
 * @description Core implementation module for Electroquest.
 */
import { Lock } from "lucide-react"

interface ComingSoonOverlayProps {
  title: string
  description: string
}

export function ComingSoonOverlay({ title, description }: ComingSoonOverlayProps) {
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-24 px-4">
      {/* Blur Backdrop - more transparent */}
      <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm" />
      
      {/* Content Box - smaller padding */}
      <div className="relative glass-card holographic rounded-2xl p-6 md:p-8 max-w-xl text-center border-2 border-glow-amber/50 shadow-glow-secondary transform transition-all hover:scale-105 duration-500">
        {/* Card background - more transparent */}
        <div className="absolute inset-0 bg-stone-900/60 rounded-2xl -z-10" />
        
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-glow-amber/20 border-2 border-glow-amber flex items-center justify-center animate-glow-pulse shadow-glow-secondary">
            <Lock className="w-8 h-8 text-glow-amber" />
          </div>
        </div>
        
        <h2 className="font-[family-name:var(--font-cinzel-decorative)] text-2xl md:text-4xl font-black text-glow-amber mb-4 text-glow-sm">
          Coming Soon
        </h2>
        
        <h3 className="font-[family-name:var(--font-cinzel)] text-lg md:text-xl font-bold text-stone-200 mb-3">
          {title}
        </h3>
        
        <p className="text-stone-300 text-xs md:text-sm leading-relaxed">
          {description}
        </p>
        
        <div className="mt-6 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-glow-amber animate-pulse" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full bg-glow-cyan animate-pulse" style={{ animationDelay: "300ms" }} />
          <div className="w-2 h-2 rounded-full bg-glow-purple animate-pulse" style={{ animationDelay: "600ms" }} />
        </div>
      </div>
    </div>
  )
}
