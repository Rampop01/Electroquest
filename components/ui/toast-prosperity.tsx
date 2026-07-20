// @ts-check
'use client'

import { useState, useEffect } from 'react'
import { Bell, X, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ProsperityToast({ message, type = 'info', visible, onClose }: { 
  message: string, 
  type?: 'success' | 'info' | 'warning', 
  visible: boolean,
  onClose: () => void 
}) {
  if (!visible) return null

  return (
    <div className={cn(
      "fixed bottom-8 right-8 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300",
      "glass-card holographic rounded-2xl p-4 min-w-[300px] border shadow-2xl flex items-center gap-4",
      type === 'success' ? 'border-primary/50' : 'border-secondary/50'
    )}>
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
        type === 'success' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'
      )}>
        {type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
      </div>
      
      <div className="flex-1">
        <h5 className="text-white font-bold text-sm">System Update</h5>
        <p className="text-white/60 text-xs">{message}</p>
      </div>

      <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
