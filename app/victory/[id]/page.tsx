import { PortalAnimation } from "@/components/portal-animation"
import { GameButton } from "@/components/game-button"
import { VictorySound } from "@/components/victory-sound"
import Link from "next/link"
import { Trophy, Sparkles } from "lucide-react"

interface VictoryPageProps {
  params: Promise<{ id: string }>
}

export default async function VictoryPage({ params }: VictoryPageProps) {
  const { id } = await params
  const nextQuestId = String(Number(id) + 1)
  const hasNextQuest = Number(id) < 3 // Assuming 3 total quests

  return (
    <div className="min-h-screen bg-stone-dark relative overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('/mystical-portal-chamber-dark.jpg')] bg-cover bg-center" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background/70" />

      {/* Glowing particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-glow-amber rounded-full animate-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl">
        <VictorySound />
      
        {/* Victory text */}
        <h1 className="font-[family-name:var(--font-cinzel-decorative)] text-5xl md:text-7xl font-black text-glow-amber text-glow mb-6">
          STAGE COMPLETE
        </h1>

        <p className="font-[family-name:var(--font-cinzel)] text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed text-balance">
          You have proven your wisdom and conquered this challenge. The ancient knowledge is now yours.
        </p>

        {/* Portal animation */}
        <div className="mb-10">
          <PortalAnimation />
        </div>

        {/* Reward display */}
        <div className="bg-card/50 backdrop-blur-sm border-2 border-glow-amber/50 rounded-lg p-6 mb-10 inline-block">
          <p className="font-[family-name:var(--font-cinzel)] text-glow-cyan text-lg mb-2">Reward Earned</p>
          <div className="text-6xl mb-2">🏆</div>
          <p className="font-[family-name:var(--font-cinzel-decorative)] text-2xl font-bold text-glow-amber">
            Ancient Rune #{id}
          </p>
        </div>

        {/* Next action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {hasNextQuest ? (
            <Link href={`/scroll/${nextQuestId}`}>
              <GameButton size="lg" className="text-xl px-10 py-5">
                Next Quest
              </GameButton>
            </Link>
          ) : (
            <Link href="/">
              <GameButton  size="lg" className="text-xl px-10 py-5">
                Return to Temple
              </GameButton>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
