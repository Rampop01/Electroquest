'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Trophy, Sparkles, ArrowRight } from 'lucide-react'
import { GameButton } from './game-button'
import { AchievementBadge } from './AchievementBadge'

interface QuestSuccessModalProps {
  isOpen: boolean
  questTitle: string
  xpEarned: number
  onNext: () => void
}

export function QuestSuccessModal({ isOpen, questTitle, xpEarned, onNext }: QuestSuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="glass-card holographic rounded-3xl p-8 max-w-lg w-full border border-primary/30 shadow-[0_0_50px_rgba(53,208,127,0.2)] text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary via-secondary to-primary animate-shimmer" />
            
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary animate-pulse">
                  <Trophy className="w-10 h-10 text-primary" />
                </div>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-2 border-2 border-dashed border-secondary/40 rounded-full" 
                />
              </div>
            </div>

            <h2 className="font-[family-name:var(--font-cinzel-decorative)] text-3xl font-black text-white mb-2">
              QUEST COMPLETE
            </h2>
            <p className="text-primary font-bold tracking-widest text-sm mb-6 uppercase">
              {questTitle}
            </p>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Rewards Unlocked</span>
                <span className="text-secondary text-xs font-black">+ {xpEarned} XP</span>
              </div>
              <div className="flex justify-center gap-4">
                <AchievementBadge type="explorer" level={1} />
              </div>
            </div>

            <div className="space-y-4">
              <GameButton onClick={onNext} className="w-full py-4 text-lg">
                CONTINUE JOURNEY <ArrowRight className="ml-2 w-5 h-5" />
              </GameButton>
              <button className="text-white/40 hover:text-white text-xs font-bold transition-colors">
                SHARE ACHIEVEMENT
              </button>
            </div>

            {/* Sparkle effects */}
            <div className="absolute top-10 left-10 text-primary/40 animate-pulse">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="absolute bottom-20 right-10 text-secondary/40 animate-pulse delay-700">
              <Sparkles className="w-6 h-6" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
