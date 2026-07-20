// @ts-check
"use client"
import { useGameSound } from "@/hooks/useGameSound"

export { useGameSound }

// Legacy shim — existing components import useSound from here
export function useSound() {
  const { playSound } = useGameSound()
  return { playSound }
}

// AudioPlayer component (kept for backward compat, does nothing visual)
export function AudioPlayer() {
  return null
}
