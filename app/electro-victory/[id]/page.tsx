import { PortalAnimation } from "@/components/portal-animation"
import { GameButton } from "@/components/game-button"
import Link from "next/link"

interface ElectroVictoryPageProps {
  params: Promise<{ id: string }>
}

export default async function ElectroVictoryPage({ params }: ElectroVictoryPageProps) {
  const { id } = await params
  const nextQuestId = String(Number(id) + 1)
  const hasNextQuest = Number(id) < 10

  return (
    <div className="min-h-screen bg-stone-dark relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('/mystical-portal-chamber-dark.jpg')] bg-cover bg-center" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background/70" />

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

      <div className="relative z-10 text-center px-4 max-w-2xl">
        <h1 className="font-[family-name:var(--font-cinzel-decorative)] text-5xl md:text-7xl font-black text-glow-amber text-glow mb-6">
          STAGE COMPLETE
        </h1>

        <p className="font-[family-name:var(--font-cinzel)] text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed text-balance">
          You have proven your wisdom and conquered this challenge. The ancient knowledge is now yours.
        </p>

        <div className="mb-10">
          <PortalAnimation />
        </div>

        <div className="bg-card/50 backdrop-blur-sm border-2 border-glow-amber/50 rounded-2xl p-6 mb-10 inline-block shadow-2xl">
          <p className="font-[family-name:var(--font-cinzel)] text-glow-cyan text-sm uppercase tracking-widest mb-3">Rewards Claimed</p>
          <div className="flex items-center justify-center gap-6">
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-1">🪙</div>
              <p className="font-[family-name:var(--font-cinzel-decorative)] text-xl font-bold text-glow-amber">
                +5 ETN
              </p>
              <span className="text-[11px] text-white/60">Stage Reward</span>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-1">🏆</div>
              <p className="font-[family-name:var(--font-cinzel-decorative)] text-xl font-bold text-glow-amber">
                Rune #{id}
              </p>
              <span className="text-[11px] text-white/60">Chapter Collectible</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {hasNextQuest ? (
            <Link href={`/electro-quests/${nextQuestId}`}>
              <GameButton size="lg" className="text-xl px-10 py-5">
                Next Quest
              </GameButton>
            </Link>
          ) : (
            <Link href="/">
              <GameButton size="lg" className="text-xl px-10 py-5">
                Return to Temple
              </GameButton>
            </Link>
          )}

          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `I just conquered Stage #${id} on @electroquest_ built on @electroneum\n\nEarned on-chain XP & Ancient Rune #${id} on the Aurelius Smart Chain.\n\nPlay now: https://electroquest.app @afr_electroneum #Electroneum #ETN #afr_electroneum #Web3Gaming`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-stone-900/90 border border-glow-cyan/50 hover:border-glow-cyan text-glow-cyan rounded-xl font-bold font-[family-name:var(--font-cinzel)] hover:scale-105 transition-all text-base shadow-lg"
          >
            <span>Share on 𝕏</span>
          </a>
        </div>
      </div>
    </div>
  )
}
