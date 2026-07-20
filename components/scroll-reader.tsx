/**
 * @file scroll-reader.tsx
 * @description Core implementation module for Electroquest.
 */
'use client'
import { Play, Pause, Square, BookOpen } from 'lucide-react'
import { useTextToSpeech } from '@/hooks/useTextToSpeech'
import { useEffect, useState } from 'react'
import { GameTooltip } from './game-tooltip'

interface ScrollReaderProps {
  title: string
  content: string[]
  analogy: { title: string; text: string }
}

export function ScrollReader({ title, content, analogy }: ScrollReaderProps) {
  const { speak, pause, resume, stop, isSpeaking, isPaused, isSupported } = useTextToSpeech()

  if (!isSupported) return null

  const fullText = [
    title + '.',
    ...content,
    analogy.title + '.',
    analogy.text
  ].join(' ')

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    return () => stop() // Stop reading when unmounting
  }, [stop])

  // Fake progress based on average speaking rate (approx 15 chars per second)
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isSpeaking && !isPaused) {
      const totalTime = (fullText.length / 15) * 1000 // ms
      const updateInterval = 100
      const increment = (updateInterval / totalTime) * 100

      interval = setInterval(() => {
        setProgress(p => Math.min(p + increment, 100))
      }, updateInterval)
    } else if (!isSpeaking) {
      setProgress(0)
    }
    return () => clearInterval(interval)
  }, [isSpeaking, isPaused, fullText.length])

  const btnClass = "relative px-3 py-2 text-xs font-[family-name:var(--font-cinzel)] font-bold uppercase tracking-wider bg-stone-900/90 border border-glow-amber/50 hover:border-glow-amber hover:bg-stone-800 transition-all duration-300 [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)]"

  return (
    <div className="relative mb-6">
      {/* Progress Bar */}
      <div className="absolute -top-1 left-0 right-0 h-1 bg-stone-800 rounded-t-sm overflow-hidden z-10">
        <div 
          className="h-full bg-glow-amber transition-all duration-100 ease-linear shadow-glow-primary"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center gap-3 p-3 bg-stone-900/80 border border-glow-amber/30 backdrop-blur-sm [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]">
        <BookOpen className="w-4 h-4 text-glow-amber flex-shrink-0" />
        <span className="text-xs font-[family-name:var(--font-cinzel)] text-glow-amber uppercase tracking-wider flex-1">
          {isSpeaking ? (isPaused ? 'Paused' : 'Reading aloud...') : 'Read this scroll aloud'}
        </span>
        <div className="flex gap-2">
          {!isSpeaking && (
            <GameTooltip text="Read Aloud" position="top">
              <button onClick={() => speak(fullText)} className={btnClass + ' text-glow-amber'}>
                <Play className="w-4 h-4" />
              </button>
            </GameTooltip>
          )}
          {isSpeaking && !isPaused && (
            <GameTooltip text="Pause" position="top">
              <button onClick={pause} className={btnClass + ' text-glow-cyan'}>
                <Pause className="w-4 h-4" />
              </button>
            </GameTooltip>
          )}
          {isSpeaking && isPaused && (
            <GameTooltip text="Resume" position="top">
              <button onClick={resume} className={btnClass + ' text-glow-amber'}>
                <Play className="w-4 h-4" />
              </button>
            </GameTooltip>
          )}
          {isSpeaking && (
            <GameTooltip text="Stop" position="top">
              <button onClick={stop} className={btnClass + ' text-red-400 border-red-400/50 hover:border-red-400'}>
                <Square className="w-4 h-4" />
              </button>
            </GameTooltip>
          )}
        </div>
        {isSpeaking && !isPaused && (
          <div className="flex gap-0.5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-0.5 bg-glow-amber rounded-full animate-bounce"
                style={{ height: `${8 + (i % 2) * 6}px`, animationDelay: `${i * 0.1}s`, animationDuration: '0.6s' }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
