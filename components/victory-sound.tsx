// @ts-check
'use client'
import { useEffect } from 'react'
import { useGameSound } from '@/hooks/useGameSound'

export function VictorySound() {
  const { playSound } = useGameSound()

  useEffect(() => {
    const timer = setTimeout(() => {
      playSound('unlock')
    }, 500)
    return () => clearTimeout(timer)
  }, [playSound])

  return null
}
