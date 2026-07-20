"use client"

import { useState } from "react"
import { QuizCard } from "./quiz-card"
import { ProgressBar } from "./progress-bar"
import { GameButton } from "./game-button"
import { useRouter } from "next/navigation"
import { Flame, AlertCircle, CheckCircle, Loader2, Clock } from "lucide-react"
import { useSound } from "./audio-player"
import { useAccount } from "wagmi"
import { useQuestCompletion } from "@/hooks/useQuest"
import { WalletConnectButton } from "./WalletConnectButton"
import { CompletionBadge } from "./completion-badge"
import { VictoryConfetti } from "./victory-confetti"
import { useEffect } from "react"
import { cn } from "@/lib/utils"

interface Question {
  question: string
  options: string[]
  correctAnswer: number
}

interface QuizRoomProps {
  questions: Question[]
  questId: string
  questType: "ethereum" | "celo"
}

export function QuizRoom({ questions, questId, questType }: QuizRoomProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1))
  const [showResults, setShowResults] = useState(false)
  const [streak, setStreak] = useState(0)
  const [xpGainIndicators, setXpGainIndicators] = useState<{id: number, val: number}[]>([])
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(true)
  const router = useRouter()
  const { playSound } = useSound()
  
  const { isConnected } = useAccount()
  const { claimProgress, isSubmitting, isConfirming, isConfirmed, message, error } = useQuestCompletion()

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerActive && !showResults) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerActive, showResults])

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)
    playSound("click")

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setStreak(s => s + 1)
      const id = Date.now()
      setXpGainIndicators(prev => [...prev, { id, val: 10 }])
      setTimeout(() => {
        setXpGainIndicators(prev => prev.filter(x => x.id !== id))
      }, 1000)
    } else {
      setStreak(0)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      playSound('whoosh')
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      playSound('whoosh')
    }
  }

  const handleSubmit = () => {
    setShowResults(true)
    const finalScore = calculateScore()
    setTimeout(() => {
      playSound(finalScore >= 7 ? "success" : "fail")
    }, 300)
  }

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0)
    }, 0)
  }

  const score = calculateScore()
  const passed = score >= 7
  const allAnswered = answers.every((a) => a !== -1)

  const handleRetry = () => {
    setAnswers(new Array(questions.length).fill(-1))
    setCurrentQuestion(0)
    setShowResults(false)
    playSound("click")
  }

  const handleVictory = async () => {
    if (!isConnected) {
      alert("Please connect your wallet above to claim your on-chain rewards!");
      return;
    }

    try {
      await claimProgress({
        questType: questType === "celo" ? 1 : 0,
        questId: Number(questId),
        quizScore: score * 10, // Convert 7/10 to 70%
        timeTaken: 120, // Hardcoded time for now
        xp: 100, // Base XP reward
      });
    } catch (err) {
      console.error("Failed to claim:", err);
    }
  }

  // Play success or fail sound when results are shown
  useEffect(() => {
    if (showResults) {
      const finalScore = calculateScore()
      setTimeout(() => {
        playSound(finalScore >= 7 ? 'success' : 'fail')
      }, 300)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResults])

  // Listen for successful confirmation to update local UI state and redirect
  useEffect(() => {
    if (isConfirmed) {
      const storageKey = questType === "celo" ? "celoQuestProgress" : "ethereumQuestProgress"
      const savedProgress = localStorage.getItem(storageKey)
      const progress = savedProgress ? JSON.parse(savedProgress) : {}

      progress[questId] = "completed"

      const nextQuestId = String(Number(questId) + 1)
      if (Number(nextQuestId) <= 10) {
        progress[nextQuestId] = "unlocked"
      }

      localStorage.setItem(storageKey, JSON.stringify(progress))

      playSound("unlock")
      setTimeout(() => {
        router.push(`/victory/${questId}`)
      }, 500)
    }
  }, [isConfirmed, questId, questType, router, playSound])

  if (showResults) {
    return (
      <div className="min-h-screen bg-stone-dark relative overflow-hidden flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[url('/dark-mystical-cave-glowing.jpg')] bg-cover bg-center" />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/60 to-background/80" />

        <VictoryConfetti show={passed} />
        <CompletionBadge show={passed} />

        {/* Results card */}
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <div className="bg-card/80 backdrop-blur-sm border-2 border-glow-amber/50 rounded-lg p-8 md:p-12 text-center">
            {passed ? (
              <>
                <CheckCircle className="w-20 h-20 text-glow-cyan mx-auto mb-6 animate-glow-pulse" />
                <h2 
                  style={{ fontFamily: 'var(--font-cinzel-decorative)' }}
                  className="text-4xl md:text-5xl font-black text-glow-cyan text-glow-sm mb-4"
                >
                  Victory!
                </h2>
                <p 
                  style={{ fontFamily: 'var(--font-cinzel)' }}
                  className="text-xl text-foreground/80 mb-6"
                >
                  You have proven your wisdom and passed the trial.
                </p>
              </>
            ) : (
              <>
                <AlertCircle className="w-20 h-20 text-destructive mx-auto mb-6 animate-glow-pulse" />
                <h2 
                  style={{ fontFamily: 'var(--font-cinzel-decorative)' }}
                  className="text-4xl md:text-5xl font-black text-destructive text-glow-sm mb-4"
                >
                  Quest Failed
                </h2>
                <p 
                  style={{ fontFamily: 'var(--font-cinzel)' }}
                  className="text-xl text-foreground/80 mb-6"
                >
                  You need more wisdom to pass this challenge.
                </p>
              </>
            )}

            <div className="bg-secondary/50 rounded-lg p-6 mb-8">
              <p 
                style={{ fontFamily: 'var(--font-cinzel)' }}
                className="text-muted-foreground mb-2"
              >
                Your Score
              </p>
              <p 
                style={{ fontFamily: 'var(--font-cinzel-decorative)' }}
                className="text-6xl font-black text-glow-amber"
              >
                {score}/10
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {passed ? (
                <div className="flex flex-col items-center gap-4">
                  {!isConnected && (
                    <div className="flex flex-col items-center gap-2 mb-4 p-4 bg-stone-900/50 rounded-lg border border-glow-amber/30">
                      <p className="text-glow-amber text-sm text-center">Connect your wallet to claim XP and NFTs!</p>
                      <WalletConnectButton />
                    </div>
                  )}
                  
                  <GameButton 
                    size="lg" 
                    onClick={handleVictory} 
                    disabled={isSubmitting || isConfirming || !isConnected}
                  >
                    {(isSubmitting || isConfirming) ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Minting on Chain...
                      </span>
                    ) : (
                      "Claim Rewards & Continue"
                    )}
                  </GameButton>
                  
                  {message && (
                    <p className="text-glow-cyan text-sm mt-2 animate-pulse">{message}</p>
                  )}
                  {error && (
                    <p className="text-red-500 text-sm mt-2 max-w-xs">{error.message || "Transaction failed"}</p>
                  )}
                </div>
              ) : (
                <>
                  <GameButton size="lg" onClick={handleRetry}>
                    Retry Quiz
                  </GameButton>
                  <GameButton size="lg" variant="secondary" onClick={() => router.push("/")}>
                    Return to Temple
                  </GameButton>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-dark relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('/dark-cave-mystical-glowing-crystals.jpg')] bg-cover bg-center" />
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/60 to-background/80" />

      {/* Torches */}
      <div className="absolute top-10 left-10 md:left-20">
        <Flame className="w-10 h-10 md:w-14 md:h-14 text-glow-amber animate-flicker" />
        <Flame className="absolute top-0 left-0 w-10 h-10 md:w-14 md:h-14 text-amber-500 animate-flicker mix-blend-screen opacity-70" style={{ animationDelay: '150ms', animationDuration: '2.5s' }} />
        <div className="absolute inset-0 blur-xl bg-glow-amber/50 animate-glow-pulse" />
      </div>
      <div className="absolute top-10 right-10 md:right-20">
        <Flame className="w-10 h-10 md:w-14 md:h-14 text-glow-amber animate-flicker" style={{ animationDelay: '100ms' }} />
        <Flame className="absolute top-0 left-0 w-10 h-10 md:w-14 md:h-14 text-amber-500 animate-flicker mix-blend-screen opacity-70" style={{ animationDelay: '250ms', animationDuration: '2.3s' }} />
        <div className="absolute inset-0 blur-xl bg-glow-amber/50 animate-glow-pulse" />
      </div>

      {/* Progress bar */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-20">
        <ProgressBar current={currentQuestion + 1} total={questions.length} />
        
        {/* XP Gain Indicators */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none z-30">
          {xpGainIndicators.map(indicator => (
            <div 
              key={indicator.id}
              className="absolute -top-4 left-0 text-xl font-bold text-glow-amber animate-float-up opacity-0 whitespace-nowrap"
              style={{ fontFamily: 'var(--font-cinzel-decorative)' }}
            >
              +{indicator.val} XP
            </div>
          ))}
        </div>
      </div>

      {/* Streak badge */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20">
        <div className={cn(
          "px-4 py-1 rounded-full border bg-stone-900/80 backdrop-blur-sm transition-all duration-300",
          streak > 1 ? "border-amber-500 shadow-glow-primary scale-110 opacity-100" : "border-amber-500/30 opacity-0 scale-90"
        )}>
          <span className="font-bold text-amber-500 font-[family-name:var(--font-cinzel-decorative)]">
            🔥 {streak} Streak!
          </span>
        </div>
      </div>

      {/* Elapsed Time Counter */}
      <div className="absolute top-8 right-4 md:right-8 z-20 flex items-center gap-2 bg-stone-900/80 px-3 py-2 rounded-lg border border-amber-500/30 backdrop-blur-sm shadow-lg">
        <Clock className="w-4 h-4 text-amber-500 animate-pulse" />
        <span suppressHydrationWarning className="font-mono text-amber-400 font-bold tracking-wider">
          {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
        </span>
      </div>

      {/* Quiz content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-24 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-3xl">
          <QuizCard
            question={questions[currentQuestion]}
            questionNumber={currentQuestion + 1}
            selectedAnswer={answers[currentQuestion]}
            onAnswer={handleAnswer}
            revealed={answers[currentQuestion] !== -1}
          />

          {/* Navigation */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
            <GameButton variant="secondary" onClick={handlePrevious} disabled={currentQuestion === 0}>
              Previous
            </GameButton>

            <div className="flex gap-4">
              {currentQuestion < questions.length - 1 ? (
                <GameButton onClick={handleNext} disabled={answers[currentQuestion] === -1}>
                  Next Question
                </GameButton>
              ) : (
                <GameButton onClick={handleSubmit} disabled={!allAnswered}>
                  Submit Answers
                </GameButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
