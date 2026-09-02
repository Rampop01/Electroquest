'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

export function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isSupported] = useState(() => typeof window !== 'undefined' && 'speechSynthesis' in window)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoiceState] = useState<string>('')
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Load and listen for available voices in the browser
  useEffect(() => {
    if (!isSupported) return

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices()
      if (availableVoices.length > 0) {
        setVoices(availableVoices)
        // Check stored voice or pick first suitable English voice
        const stored = localStorage.getItem('electroquest_selected_voice')
        if (stored && availableVoices.some(v => v.name === stored)) {
          setSelectedVoiceState(stored)
        } else {
          const defaultVoice = availableVoices.find(v => 
            v.lang.startsWith('en') && (v.name.includes('Daniel') || v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Alex'))
          ) || availableVoices.find(v => v.lang.startsWith('en')) || availableVoices[0]
          
          if (defaultVoice) {
            setSelectedVoiceState(defaultVoice.name)
          }
        }
      }
    }

    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null
      }
    }
  }, [isSupported])

  const setSelectedVoice = useCallback((voiceName: string) => {
    setSelectedVoiceState(voiceName)
    try {
      localStorage.setItem('electroquest_selected_voice', voiceName)
    } catch (e) {
      // Ignore localStorage errors
    }
  }, [])

  const speak = useCallback((text: string) => {
    if (!isSupported) return
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.95
    utterance.pitch = 1.0
    utterance.volume = 0.95
    
    // Pick the user's selected voice
    const available = window.speechSynthesis.getVoices()
    const chosen = available.find(v => v.name === selectedVoice) || available.find(v => v.lang.startsWith('en'))
    if (chosen) {
      utterance.voice = chosen
    }

    utterance.onstart = () => { setIsSpeaking(true); setIsPaused(false) }
    utterance.onend = () => { setIsSpeaking(false); setIsPaused(false) }
    utterance.onerror = () => { setIsSpeaking(false); setIsPaused(false) }
    utterance.onpause = () => setIsPaused(true)
    utterance.onresume = () => setIsPaused(false)

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [isSupported, selectedVoice])

  const pause = useCallback(() => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause()
      setIsPaused(true)
    }
  }, [])

  const resume = useCallback(() => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume()
      setIsPaused(false)
    }
  }, [])

  const stop = useCallback(() => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
    setIsPaused(false)
  }, [])

  return {
    speak,
    pause,
    resume,
    stop,
    isSpeaking,
    isPaused,
    isSupported,
    voices,
    selectedVoice,
    setSelectedVoice,
  }
}
