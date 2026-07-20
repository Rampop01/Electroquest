import Link from "next/link"
import { GameButton } from "@/components/game-button"
import { MiniPayBadge } from "@/components/minipay-badge"
import { FogOverlay } from "@/components/fog-overlay"
import { AnimatedParticles } from "@/components/animated-particles"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { LandingSound } from "@/components/landing-sound"

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-stone-dark flex flex-col justify-between">
      <LandingSound />
      <MiniPayBadge />
      
      {/* Animated background with stone texture */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('/dark-stone-temple-wall-texture.jpg')] bg-cover bg-center" />
      </div>

      {/* Fog overlay */}
      <FogOverlay />

      {/* Particles/stars */}
      <AnimatedParticles />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-6 lg:px-8">
        {/* Logo with glow effect */}
        <div className="mb-14 text-center animate-float">
          <h1 className="font-[family-name:var(--font-cinzel-decorative)] text-6xl md:text-8xl lg:text-9xl font-black text-glow-amber text-glow mb-4 tracking-wider">
            CELO 
          </h1>
          <h2 className="font-[family-name:var(--font-cinzel-decorative)] text-5xl md:text-7xl lg:text-8xl font-black text-glow-cyan text-glow tracking-widest">
            QUEST
          </h2>
          <div className="mt-8 w-64 h-1 mx-auto bg-gradient-to-r from-transparent via-glow-amber to-transparent animate-shimmer" />
        </div>

        {/* Description */}
        <p className="font-[family-name:var(--font-cinzel)] text-center max-w-lg md:max-w-2xl text-foreground/90 text-lg md:text-2xl leading-relaxed mb-14 text-balance drop-shadow-md">
          A mystical journey into the world of Celo. Learn ancient knowledge, solve cryptic puzzles, and conquer
          legendary quests.
        </p>

        <Link href="/path-selection" className="group">
          <GameButton size="lg" className="text-xl md:text-2xl px-14 py-8 mb-8 shadow-2xl transition-transform group-hover:scale-105">
            Start Adventure
          </GameButton>
        </Link>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </div>

      {/* Bottom instructions section (visible on scroll) */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-24 bg-gradient-to-t from-background/90 to-transparent">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h3 className="font-[family-name:var(--font-cinzel-decorative)] text-5xl font-bold text-glow-amber text-glow-sm">
            How to Play
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-foreground/90 font-[family-name:var(--font-cinzel)] text-lg leading-relaxed">
            <div className="p-8 bg-card/60 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl hover:bg-card/80 transition-colors">
              <h4 className="text-2xl font-bold text-glow-cyan mb-4">📜 Read the Scrolls</h4>
              <p className="text-foreground/80">Ancient parchments will reveal the knowledge you seek</p>
            </div>
            <div className="p-8 bg-card/60 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl hover:bg-card/80 transition-colors">
              <h4 className="text-2xl font-bold text-glow-cyan mb-4">🏛️ Explore Quest Rooms</h4>
              <p className="text-foreground/80">Solve rune puzzles and answer riddles to collect letters</p>
            </div>
            <div className="p-8 bg-card/60 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl hover:bg-card/80 transition-colors">
              <h4 className="text-2xl font-bold text-glow-cyan mb-4">❓ Answer the Riddles</h4>
              <p className="text-foreground/80">Prove your wisdom by conquering the quiz challenges</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
