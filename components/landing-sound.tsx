'use client'
import { useEffect } from 'react'
import { useGameSound } from '@/hooks/useGameSound'

export function LandingSound() {
  const { playSound } = useGameSound()

  useEffect(() => {
    const timer = setTimeout(() => {
      playSound('whoosh')
    }, 1000)
    return () => clearTimeout(timer)
  }, [playSound])

  return null
}
