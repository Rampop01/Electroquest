'use client'
import { useCallback, useRef, useEffect, useState } from 'react'

type SoundType = 'click' | 'success' | 'fail' | 'unlock' | 'collect' | 'whoosh' | 'correct' | 'wrong' | 'ambient'

interface SoundConfig {
  frequency: number
  duration: number
  gain: number
  type: OscillatorType
}

const SOUNDS: Record<string, SoundConfig> = {
  click: { frequency: 440, duration: 0.08, gain: 0.15, type: 'sine' },
  correct: { frequency: 660, duration: 0.25, gain: 0.2, type: 'sine' },
  wrong: { frequency: 180, duration: 0.35, gain: 0.2, type: 'sawtooth' },
  success: { frequency: 880, duration: 0.6, gain: 0.25, type: 'sine' },
  fail: { frequency: 150, duration: 0.5, gain: 0.2, type: 'sawtooth' },
  unlock: { frequency: 523, duration: 0.8, gain: 0.2, type: 'sine' },
  collect: { frequency: 1047, duration: 0.2, gain: 0.18, type: 'sine' },
  whoosh: { frequency: 200, duration: 0.3, gain: 0.15, type: 'sine' },
}

const SOUND_STORAGE_KEY = 'electroquest_sound_enabled'

let globalSoundEnabled = true
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem(SOUND_STORAGE_KEY)
  if (saved !== null) {
    globalSoundEnabled = saved === 'true'
  }
}

export function useGameSound() {
  const audioCtxRef = useRef<AudioContext | null>(null)
  const [soundEnabled, setSoundEnabled] = useState(globalSoundEnabled)

  useEffect(() => {
    const handleStorage = () => {
      setSoundEnabled(globalSoundEnabled)
    }
    window.addEventListener('electroquest-sound-change', handleStorage)
    return () => window.removeEventListener('electroquest-sound-change', handleStorage)
  }, [])

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass()
        }
      } catch { return null }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {})
    }
    return audioCtxRef.current
  }, [])

  const playSound = useCallback((type: SoundType) => {
    if (!globalSoundEnabled) return
    const ctx = getCtx()
    if (!ctx) return

    const config = SOUNDS[type] || SOUNDS.click
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.type = config.type
    osc.frequency.setValueAtTime(config.frequency, now)

    if (type === 'success') {
      osc.frequency.setValueAtTime(523, now)
      osc.frequency.setValueAtTime(659, now + 0.15)
      osc.frequency.setValueAtTime(784, now + 0.3)
    }
    if (type === 'unlock') {
      osc.frequency.exponentialRampToValueAtTime(1046, now + 0.4)
    }
    if (type === 'wrong' || type === 'fail') {
      osc.frequency.exponentialRampToValueAtTime(80, now + config.duration)
    }

    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(config.gain, now + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.001, now + config.duration)

    osc.start(now)
    osc.stop(now + config.duration + 0.05)
  }, [getCtx])

  const toggle = useCallback(() => {
    globalSoundEnabled = !globalSoundEnabled
    if (typeof window !== 'undefined') {
      localStorage.setItem(SOUND_STORAGE_KEY, String(globalSoundEnabled))
      window.dispatchEvent(new CustomEvent('electroquest-sound-change', { detail: globalSoundEnabled }))
    }
    setSoundEnabled(globalSoundEnabled)
    return globalSoundEnabled
  }, [])

  const isEnabled = () => globalSoundEnabled

  return { playSound, toggle, isEnabled, soundEnabled }
}
