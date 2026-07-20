/**
 * @file particle-burst.tsx
 * @description Core implementation module for Electroquest.
 */
'use client'
import { useEffect, useState } from 'react'

export function ParticleBurst({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<{x: number, y: number, angle: number}[]>([])
  
  useEffect(() => {
    if (active) {
      setParticles(
        Array.from({length: 12}, (_, i) => ({
          x: 0, y: 0,
          angle: (i / 12) * 360
        }))
      )
      setTimeout(() => setParticles([]), 800)
    }
  }, [active])

  if (!particles.length) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 bg-glow-amber rounded-full"
          style={{
            left: '50%', top: '50%',
            animation: `particle-${i % 4} 0.8s ease-out forwards`,
            '--angle': `${p.angle}deg`,
          } as any}
        />
      ))}
    </div>
  )
}
