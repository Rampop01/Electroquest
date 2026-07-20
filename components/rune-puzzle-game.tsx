"use client"

import { useState, useEffect } from "react"
import { Sparkles, Zap, Flame, Wind } from "lucide-react"

interface RunePuzzleGameProps {
  targetWord: string
  onComplete: () => void
}

const RUNES = [
  { symbol: "ᚨ", element: "air", icon: Wind, color: "text-glow-cyan" },
  { symbol: "ᚠ", element: "fire", icon: Flame, color: "text-glow-amber" },
  { symbol: "ᚦ", element: "energy", icon: Zap, color: "text-glow-purple" },
  { symbol: "ᚱ", element: "spirit", icon: Sparkles, color: "text-emerald-400" },
]

interface Riddle {
  question: string
  correctAnswer: string
  wrongAnswers: string[]
}

const RIDDLES: Record<string, Riddle[]> = {
  NODE: [
    {
      question: "I am a guardian that never sleeps, validating truth in digital deeps. What am I?",
      correctAnswer: "N",
      wrongAnswers: ["K", "M", "V"],
    },
    {
      question: "Round like a ring, zero like void, I complete the circle. What letter am I?",
      correctAnswer: "O",
      wrongAnswers: ["Q", "C", "U"],
    },
    {
      question: "I stand for data, I stand for disk, the foundation of all. What am I?",
      correctAnswer: "D",
      wrongAnswers: ["B", "P", "R"],
    },
    {
      question: "At the end of node, at the start of Ethereum. I am the final piece. What am I?",
      correctAnswer: "E",
      wrongAnswers: ["A", "I", "F"],
    },
  ],
  GAS: [
    {
      question: "I am the energy that powers the realm, measured in gwei. My first letter?",
      correctAnswer: "G",
      wrongAnswers: ["E", "F", "H"],
    },
    {
      question: "Like an atom, I am fundamental. Like an answer, I am necessary. What am I?",
      correctAnswer: "A",
      wrongAnswers: ["E", "O", "U"],
    },
    {
      question: "I hiss like a serpent, I start the speed. The last of GAS. What am I?",
      correctAnswer: "S",
      wrongAnswers: ["Z", "X", "C"],
    },
  ],
  CONTRACT: [
    {
      question: "I curve like a crescent, opening doors. The first of CONTRACT.",
      correctAnswer: "C",
      wrongAnswers: ["G", "O", "U"],
    },
    {
      question: "Round and whole, I appear twice in your word. What letter circles?",
      correctAnswer: "O",
      wrongAnswers: ["Q", "D", "P"],
    },
    {
      question: "I follow C and O, standing tall like a pillar. What am I?",
      correctAnswer: "N",
      wrongAnswers: ["M", "H", "W"],
    },
    {
      question: "I cross paths, marking the spot. The fourth letter stands. What am I?",
      correctAnswer: "T",
      wrongAnswers: ["F", "L", "I"],
    },
    {
      question: "I am the runner in CONTRACT, moving forward. What am I?",
      correctAnswer: "R",
      wrongAnswers: ["P", "K", "B"],
    },
    {
      question: "Like the first answer, I repeat. The sixth letter. What am I?",
      correctAnswer: "A",
      wrongAnswers: ["E", "O", "U"],
    },
    {
      question: "I appear again, the crescent returns. The seventh letter. What am I?",
      correctAnswer: "C",
      wrongAnswers: ["G", "S", "O"],
    },
    {
      question: "I cross again at the end, sealing the CONTRACT. What am I?",
      correctAnswer: "T",
      wrongAnswers: ["F", "L", "Y"],
    },
  ],
}

export function RunePuzzleGame({ targetWord, onComplete }: RunePuzzleGameProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [collectedLetters, setCollectedLetters] = useState<string[]>([])
  const [selectedRune, setSelectedRune] = useState<number | null>(null)
  const [runeSequence, setRuneSequence] = useState<number[]>([])
  const [gamePhase, setGamePhase] = useState<"rune" | "riddle">("rune")
  const [showHint, setShowHint] = useState(false)

  const riddles = RIDDLES[targetWord] || []
  const currentRiddle = riddles[currentStep]

  useEffect(() => {
    if (collectedLetters.length === targetWord.length) {
      setTimeout(() => onComplete(), 1000)
    }
  }, [collectedLetters, targetWord, onComplete])

  const handleRuneSelect = (index: number) => {
    if (selectedRune === index) {
      setSelectedRune(null)
      return
    }
    setSelectedRune(index)
    const newSequence = [...runeSequence, index]
    setRuneSequence(newSequence)

    if (newSequence.length === 3) {
      setTimeout(() => {
        setGamePhase("riddle")
        setRuneSequence([])
        setSelectedRune(null)
      }, 500)
    }
  }

  const handleAnswerSelect = (answer: string) => {
    if (answer === currentRiddle.correctAnswer) {
      setCollectedLetters([...collectedLetters, answer])
      if (currentStep + 1 < riddles.length) {
        setTimeout(() => {
          setCurrentStep(currentStep + 1)
          setGamePhase("rune")
          setShowHint(false)
        }, 1000)
      }
    } else {
      setRuneSequence([])
      setTimeout(() => {
        setGamePhase("rune")
        setShowHint(false)
      }, 500)
    }
  }

  const allAnswers = currentRiddle
    ? [currentRiddle.correctAnswer, ...currentRiddle.wrongAnswers].sort(() => Math.random() - 0.5)
    : []

  return (
    <div className="min-h-screen bg-stone-dark relative overflow-hidden flex items-center justify-center p-4">
      {/* Mystical background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)] animate-glow-pulse" />

      <div className="relative z-10 max-w-4xl w-full">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-center gap-2 mb-4">
            {targetWord.split("").map((letter, index) => (
              <div
                key={index}
                style={{ fontFamily: 'var(--font-cinzel-decorative)' }}
                className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border-2 rounded-lg text-2xl md:text-3xl font-bold transition-all ${
                  collectedLetters[index]
                    ? "border-glow-amber bg-glow-amber/20 text-glow-amber animate-glow-pulse"
                    : "border-border bg-secondary/20 text-muted-foreground"
                }`}
              >
                {collectedLetters[index] || "?"}
              </div>
            ))}
          </div>
          <p 
            style={{ fontFamily: 'var(--font-cinzel)' }}
            className="text-center text-sm text-muted-foreground"
          >
            Letter {collectedLetters.length + 1} of {targetWord.length}
          </p>
        </div>

        {gamePhase === "rune" ? (
          <div className="text-center">
            <h2 
              style={{ fontFamily: 'var(--font-cinzel-decorative)' }}
              className="text-3xl md:text-4xl font-bold text-glow-cyan mb-4 text-glow-sm"
            >
              Activate the Runes
            </h2>
            <p 
              style={{ fontFamily: 'var(--font-cinzel)' }}
              className="text-muted-foreground mb-8"
            >
              Select three runes in any order to unlock the riddle
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
              {RUNES.map((rune, index) => {
                const Icon = rune.icon
                const isSelected = runeSequence.includes(index)
                return (
                  <button
                    key={index}
                    onClick={() => handleRuneSelect(index)}
                    className={`relative group aspect-square rounded-xl border-2 transition-all duration-300 ${
                      isSelected
                        ? "border-glow-amber bg-glow-amber/20 scale-110"
                        : "border-border bg-card/50 hover:border-glow-cyan hover:scale-105"
                    }`}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Icon
                        className={`w-12 h-12 md:w-16 md:h-16 mb-2 ${isSelected ? "text-glow-amber animate-glow-pulse" : rune.color}`}
                      />
                      <span 
                        style={{ fontFamily: 'var(--font-cinzel-decorative)' }}
                        className="text-4xl md:text-5xl"
                      >
                        {rune.symbol}
                      </span>
                      <span 
                        style={{ fontFamily: 'var(--font-cinzel)' }}
                        className="text-xs text-muted-foreground mt-2 capitalize"
                      >
                        {rune.element}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-glow-amber text-stone-dark rounded-full flex items-center justify-center text-xs font-bold">
                        {runeSequence.indexOf(index) + 1}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="flex justify-center gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    runeSequence[i] !== undefined ? "bg-glow-amber scale-125" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="bg-card/80 backdrop-blur-sm border-2 border-glow-purple rounded-xl p-6 md:p-8 mb-8">
              <h2 
                style={{ fontFamily: 'var(--font-cinzel-decorative)' }}
                className="text-2xl md:text-3xl font-bold text-glow-purple mb-6 text-glow-sm"
              >
                Ancient Riddle
              </h2>
              <p 
                style={{ fontFamily: 'var(--font-cinzel)' }}
                className="text-lg md:text-xl text-foreground leading-relaxed mb-8"
              >
                {currentRiddle?.question}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {allAnswers.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(answer)}
                    className="group relative bg-secondary/50 hover:bg-glow-cyan/20 border-2 border-border hover:border-glow-cyan rounded-lg p-6 transition-all hover:scale-105"
                  >
                    <span 
                      style={{ fontFamily: 'var(--font-cinzel-decorative)' }}
                      className="text-4xl font-bold text-foreground group-hover:text-glow-cyan transition-colors"
                    >
                      {answer}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setShowHint(!showHint)}
                  style={{ fontFamily: 'var(--font-cinzel)' }}
                  className="text-sm text-muted-foreground hover:text-glow-cyan transition-colors"
                >
                  {showHint ? "Hide Hint" : "Need a Hint?"}
                </button>
                {showHint && (
                  <p 
                    style={{ fontFamily: 'var(--font-cinzel)' }}
                    className="text-sm text-glow-amber mt-2 animate-in fade-in"
                  >
                    The answer is part of the word: {targetWord}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
