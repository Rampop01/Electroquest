"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { TempleRunner3D } from "./3d/TempleRunner3D"
import { ValidatorDefense3D } from "./3d/ValidatorDefense3D"
import { DungeonMaze3D } from "./3d/DungeonMaze3D"
import { FloatingIslands3D } from "./3d/FloatingIslands3D"
import { EVMStackCubes3D } from "./3d/EVMStackCubes3D"
import { EnterpriseShield3D } from "./3d/EnterpriseShield3D"
import { MicroPaymentTunnel3D } from "./3d/MicroPaymentTunnel3D"
import { GlobalUtilityGrid3D } from "./3d/GlobalUtilityGrid3D"
import { EcoValidatorSolar3D } from "./3d/EcoValidatorSolar3D"
import { AureliusGrandTemple3D } from "./3d/AureliusGrandTemple3D"
import { GameButton } from "@/components/game-button"
import { ArrowRight, Trophy, Sparkles } from "lucide-react"

interface StageMiniGameProps {
  questId: string
  questType?: "electroneum" | "ethereum"
}

export function StageMiniGame({ questId, questType = "electroneum" }: StageMiniGameProps) {
  const router = useRouter()
  const [completed, setCompleted] = useState(false)

  const handleMiniGameComplete = () => {
    setCompleted(true)
  }

  const handleProceedToQuiz = () => {
    if (questType === "electroneum") {
      router.push(`/electro-quests/${questId}/quiz`)
    } else {
      router.push(`/quiz/${questId}`)
    }
  }

  // Render stage-specific unique 3D mini-game based on quest ID
  const renderGame = () => {
    const qNum = parseInt(questId, 10) || 1

    switch (qNum) {
      case 1:
        return <TempleRunner3D questId={questId} onComplete={handleMiniGameComplete} />
      case 2:
        return <ValidatorDefense3D questId={questId} onComplete={handleMiniGameComplete} />
      case 3:
        return <DungeonMaze3D questId={questId} onComplete={handleMiniGameComplete} />
      case 4:
        return <FloatingIslands3D questId={questId} onComplete={handleMiniGameComplete} />
      case 5:
        return <EVMStackCubes3D questId={questId} onComplete={handleMiniGameComplete} />
      case 6:
        return <EnterpriseShield3D questId={questId} onComplete={handleMiniGameComplete} />
      case 7:
        return <MicroPaymentTunnel3D questId={questId} onComplete={handleMiniGameComplete} />
      case 8:
        return <GlobalUtilityGrid3D questId={questId} onComplete={handleMiniGameComplete} />
      case 9:
        return <EcoValidatorSolar3D questId={questId} onComplete={handleMiniGameComplete} />
      case 10:
      default:
        return <AureliusGrandTemple3D questId={questId} onComplete={handleMiniGameComplete} />
    }
  }

  return (
    <div className="min-h-screen bg-stone-dark relative overflow-hidden py-12 px-4 flex flex-col justify-between">
      {/* Background imagery */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/dark-stone-temple-wall-texture.jpg')] bg-cover bg-center" />
      </div>

      {/* Main Game Container */}
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Stage Header */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-glow-amber">
              Interactive Stage Trial #{questId}
            </span>
            <h1 className="text-2xl font-black text-white font-[family-name:var(--font-cinzel-decorative)]">
              Temple of Electroneum
            </h1>
          </div>

          {completed && (
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-950/80 border border-emerald-400 rounded-full text-emerald-300 text-xs font-bold shadow-[0_0_15px_rgba(52,211,153,0.3)] animate-bounce">
              <Trophy className="w-4 h-4 text-emerald-400" /> Trial Cleared!
            </div>
          )}
        </div>

        {/* The active Mini Game */}
        <div className="my-6">
          {renderGame()}
        </div>

        {/* Continue to Quiz Button once finished */}
        {completed && (
          <div className="mt-8 text-center animate-fade-in">
            <GameButton
              onClick={handleProceedToQuiz}
              size="lg"
              className="text-lg px-12 py-6 shadow-2xl hover:scale-105 transition-transform"
            >
              Enter Quiz Arena <ArrowRight className="ml-2 w-5 h-5 inline" />
            </GameButton>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="relative z-10 text-center text-xs text-white/40 pt-8 font-[family-name:var(--font-cinzel)]">
        Electroneum Smart Chain (Aurelius) • IBFT 2.0 • 5s Finality • Near-Zero Gas
      </div>
    </div>
  )
}
