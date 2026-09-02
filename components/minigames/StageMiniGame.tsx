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
import { MINIGAME_INSTRUCTIONS } from "@/lib/minigame-instructions"
import { GameButton } from "@/components/game-button"
import {
  ArrowRight,
  Trophy,
  Sparkles,
  HelpCircle,
  FastForward,
  Coins,
  Gamepad2,
  Smartphone,
  Monitor,
  CheckCircle2,
  X,
} from "lucide-react"

interface StageMiniGameProps {
  questId: string
  questType?: "electroneum" | "ethereum"
}

export function StageMiniGame({ questId, questType = "electroneum" }: StageMiniGameProps) {
  const router = useRouter()
  const qNum = parseInt(questId, 10) || 1
  const instruction = MINIGAME_INSTRUCTIONS[qNum] || MINIGAME_INSTRUCTIONS[1]

  const [completed, setCompleted] = useState(false)
  const [showBriefing, setShowBriefing] = useState(true)
  const [showSkipModal, setShowSkipModal] = useState(false)
  const [isSkipping, setIsSkipping] = useState(false)

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

  const handleConfirmSkip = () => {
    setIsSkipping(true)
    setTimeout(() => {
      setIsSkipping(false)
      setShowSkipModal(false)
      setCompleted(true)
      handleProceedToQuiz()
    }, 900)
  }

  // Render stage-specific unique 3D mini-game based on quest ID
  const renderGame = () => {
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
    <div className="min-h-screen bg-stone-dark relative overflow-hidden py-10 px-4 flex flex-col justify-between">
      {/* Background imagery */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/dark-stone-temple-wall-texture.jpg')] bg-cover bg-center" />
      </div>

      {/* Main Game Container */}
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Stage Header & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-widest text-glow-amber">
                Stage #{questId} {questId === 10 ? 'Boss Arena' : 'Quest Game'}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <Coins className="w-3 h-3 text-amber-400" /> Reward: 5 ETN
              </span>
            </div>
            <h1 className="text-2xl font-black text-white font-[family-name:var(--font-cinzel-decorative)]">
              {instruction.title}
            </h1>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            {/* Help / Instructions Button */}
            <button
              onClick={() => setShowBriefing(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-stone-900/90 hover:bg-stone-800 border border-amber-500/40 hover:border-amber-400 text-amber-200 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md"
              title="View How to Play Instructions"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>How to Play</span>
            </button>

            {/* Fast-Pass Skip Stage Button */}
            {!completed && (
              <button
                onClick={() => setShowSkipModal(true)}
                className="flex items-center gap-1.5 px-3 py-2 bg-purple-950/80 hover:bg-purple-900 border border-purple-400/50 hover:border-purple-400 text-purple-200 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md"
                title="Skip Mini-game with 1 ETN Fast-Pass"
              >
                <FastForward className="w-4 h-4 text-purple-300" />
                <span>Fast-Pass (1 ETN)</span>
              </button>
            )}

            {completed && (
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-950/90 border border-emerald-400 rounded-full text-emerald-300 text-xs font-bold shadow-[0_0_15px_rgba(52,211,153,0.3)] animate-bounce">
                <Trophy className="w-4 h-4 text-emerald-400" /> Quest Cleared!
              </div>
            )}
          </div>
        </div>

        {/* The active Mini Game */}
        <div className="my-4">
          {renderGame()}
        </div>

        {/* Continue to Quiz Button once finished */}
        {completed && (
          <div className="mt-6 text-center animate-fade-in">
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

      {/* Mission Briefing / Instructions Modal */}
      {showBriefing && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-stone-900 border-2 border-glow-amber rounded-2xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative overflow-hidden text-white">
            <button
              onClick={() => setShowBriefing(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-glow-amber mb-1">
              <Gamepad2 className="w-4 h-4" /> Mission Briefing
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-white font-[family-name:var(--font-cinzel-decorative)] mb-1">
              {instruction.title}
            </h2>
            <p className="text-xs text-amber-200/70 mb-4">{instruction.subtitle}</p>

            {/* Objective Box */}
            <div className="p-4 bg-stone-950/80 border border-amber-500/30 rounded-xl mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Objective
              </span>
              <p className="text-sm text-white/90 leading-relaxed">
                {instruction.objective}
              </p>
            </div>

            {/* Controls Guide */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-xs">
              <div className="p-3 bg-stone-950/60 rounded-xl border border-white/10">
                <div className="flex items-center gap-1.5 font-bold text-cyan-300 mb-1.5">
                  <Monitor className="w-3.5 h-3.5" /> Desktop Controls
                </div>
                <ul className="space-y-1 text-white/80 list-disc list-inside">
                  {instruction.desktopControls.map((ctrl, i) => (
                    <li key={i}>{ctrl}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-stone-950/60 rounded-xl border border-white/10">
                <div className="flex items-center gap-1.5 font-bold text-emerald-300 mb-1.5">
                  <Smartphone className="w-3.5 h-3.5" /> Mobile Controls
                </div>
                <ul className="space-y-1 text-white/80 list-disc list-inside">
                  {instruction.mobileControls.map((ctrl, i) => (
                    <li key={i}>{ctrl}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reward & Pro Tip */}
            <div className="flex items-center justify-between p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl mb-6 text-xs">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-amber-200">{instruction.reward}</span>
              </div>
              <span className="text-[11px] text-white/60 hidden sm:inline italic">
                {instruction.proTip}
              </span>
            </div>

            {/* Start Button */}
            <button
              onClick={() => setShowBriefing(false)}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black rounded-xl text-base shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer font-[family-name:var(--font-cinzel)]"
            >
              {questId === 10 ? "ENTER BOSS ARENA" : "START QUEST GAME"}
            </button>
          </div>
        </div>
      )}

      {/* Fast-Pass Skip Stage Modal */}
      {showSkipModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-stone-900 border-2 border-purple-500 rounded-2xl max-w-md w-full p-6 text-center text-white shadow-2xl relative">
            <div className="w-14 h-14 mx-auto mb-3 bg-purple-500/20 border border-purple-400/40 rounded-full flex items-center justify-center text-purple-300">
              <FastForward className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-black font-[family-name:var(--font-cinzel-decorative)] text-white mb-2">
              Fast-Pass: Skip Game
            </h3>

            <p className="text-white/70 text-sm mb-4">
              Prefer jumping straight to the knowledge quiz? You can skip this 3D mini-game with a fast-pass fee.
            </p>

            <div className="p-3 bg-stone-950 rounded-xl border border-purple-500/30 mb-6 flex justify-between items-center text-sm font-mono">
              <span className="text-white/60">Fast-Pass Fee:</span>
              <span className="text-purple-300 font-bold flex items-center gap-1">
                <Coins className="w-4 h-4 text-purple-400" /> 1 ETN
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSkipModal(false)}
                className="flex-1 py-3 bg-stone-800 hover:bg-stone-700 text-white/80 font-bold rounded-xl text-sm transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSkip}
                disabled={isSkipping}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold rounded-xl text-sm shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isSkipping ? "Unlocking Quiz..." : "Confirm & Skip (1 ETN)"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="relative z-10 text-center text-xs text-white/40 pt-6 font-[family-name:var(--font-cinzel)]">
        Electroneum Smart Chain (Aurelius) • IBFT 2.0 • 5s Finality • 5 ETN Quest Rewards
      </div>
    </div>
  )
}
