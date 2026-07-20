'use client'

import { useEffect, useState } from 'react'

export function VictoryConfetti({ show }: { show: boolean }) {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; top: string; duration: string; delay: string; scale: string }>>([])

  useEffect(() => {
    if (!show) {
      setParticles([])
      return
    }

    // Generate 50 golden sparks
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `-10%`,
      duration: `${1.5 + Math.random() * 2}s`,
      delay: `${Math.random() * 0.5}s`,
      scale: `${0.5 + Math.random() * 0.8}`
    }))

    setParticles(newParticles)
  }, [show])

  if (!show || particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute w-2 h-6 bg-linear-to-b from-amber-300 via-amber-500 to-transparent rounded-full opacity-0 animate-rain"
          style={{
            left: p.left,
            top: p.top,
            transform: `scale(${p.scale}) rotate(${Math.random() * 30 - 15}deg)`,
            animationDuration: p.duration,
            animationDelay: p.delay,
            filter: 'drop-shadow(0 0 5px rgba(245, 158, 11, 0.8))'
          }}
        />
      ))}
    </div>
  )
}
