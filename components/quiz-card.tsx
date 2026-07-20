"use client"

import { cn } from "@/lib/utils"
import { useSound } from "@/components/audio-player"

interface Question {
  question: string
  options: string[]
  correctAnswer: number
}

interface QuizCardProps {
  question: Question
  questionNumber: number
  selectedAnswer: number
  onAnswer: (answerIndex: number) => void
  revealed?: boolean
}

export function QuizCard({ question, questionNumber, selectedAnswer, onAnswer, revealed }: QuizCardProps) {
  const { playSound } = useSound()

  const handleOptionClick = (index: number) => {
    if (selectedAnswer !== -1) return
    playSound('click')
    onAnswer(index)
    if (revealed) {
      if (index === question.correctAnswer) {
        playSound('correct')
      } else {
        playSound('wrong')
      }
    }
  }

  const getOptionStyle = (index: number) => {
    if (selectedAnswer !== index) {
      return "bg-secondary/50 border-border text-foreground/80 hover:border-amber-500/50 hover:bg-secondary/70"
    }
    if (revealed) {
      if (index === question.correctAnswer) {
        return "bg-cyan-500/20 border-cyan-400 text-foreground shadow-lg shadow-cyan-400/30 animate-flash-correct"
      } else {
        return "bg-red-900/20 border-red-400/60 text-foreground shadow-lg shadow-red-400/20 animate-flash-wrong"
      }
    }
    return "bg-amber-500/20 border-amber-500 text-foreground shadow-lg shadow-amber-500/30 animate-glow-pulse"
  }

  return (
    <div className={cn(
      "bg-card/80 backdrop-blur-sm border-2 border-amber-500/30 rounded-lg p-6 md:p-8 shadow-2xl",
      revealed && selectedAnswer !== -1 && selectedAnswer !== question.correctAnswer && "animate-shake"
    )}>
      {/* Question number */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/50">
          <span 
            style={{ fontFamily: 'var(--font-cinzel-decorative)' }}
            className="text-2xl font-black text-stone-900"
          >
            {questionNumber}
          </span>
        </div>
        <p 
          style={{ fontFamily: 'var(--font-cinzel)' }}
          className="text-sm text-amber-300/70"
        >
          Question {questionNumber} of 10
        </p>
      </div>

      {/* Question text */}
      <h3 
        style={{ fontFamily: 'var(--font-cinzel)' }}
        className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed"
      >
        {question.question}
      </h3>

      {/* Options */}
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            style={{ fontFamily: 'var(--font-cinzel)' }}
            className={cn(
              "w-full text-left p-4 md:p-5 rounded-lg border-2 transition-all duration-200",
              "text-base md:text-lg",
              "hover:scale-[1.02] active:scale-[0.98]",
              getOptionStyle(index),
            )}
          >
            <div className="flex items-center gap-4">
              <div
                style={{ fontFamily: 'var(--font-cinzel-decorative)' }}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                  selectedAnswer === index ? "bg-amber-500 text-stone-900" : "bg-muted text-amber-300/70",
                )}
              >
                {String.fromCharCode(65 + index)}
              </div>
              <span>{option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
