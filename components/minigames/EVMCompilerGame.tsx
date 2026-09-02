"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Cpu, Terminal, CheckCircle2, Award, Play, RotateCcw } from "lucide-react"

interface EVMCompilerProps {
  onComplete: () => void
}

interface Opcode {
  id: string
  name: string
  gasCost: number
  description: string
  category: "data" | "memory" | "call" | "return"
}

const AVAILABLE_OPCODES: Opcode[] = [
  { id: "PUSH32", name: "PUSH32 [Data]", gasCost: 3, description: "Load ETN recipient & amount into stack", category: "data" },
  { id: "MSTORE", name: "MSTORE [0x40]", gasCost: 3, description: "Write payload to volatile memory", category: "memory" },
  { id: "CALL", name: "CALL [Contract]", gasCost: 100, description: "Invoke smart contract function on Electroneum", category: "call" },
  { id: "RETURN", name: "RETURN [0x00]", gasCost: 0, description: "Halt execution & emit successful receipt", category: "return" },
]

export function EVMCompilerGame({ onComplete }: EVMCompilerProps) {
  const [slottedOpcodes, setSlottedOpcodes] = useState<Opcode[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [outputLog, setOutputLog] = useState<string>("Ready to compile Solidity bytecode on Electroneum...")

  const correctOrder = ["PUSH32", "MSTORE", "CALL", "RETURN"]

  const addOpcode = (opcode: Opcode) => {
    if (isRunning || isSuccess) return
    if (slottedOpcodes.length < 4 && !slottedOpcodes.some((o) => o.id === opcode.id)) {
      setSlottedOpcodes((prev) => [...prev, opcode])
    }
  }

  const removeOpcode = (index: number) => {
    if (isRunning || isSuccess) return
    setSlottedOpcodes((prev) => prev.filter((_, i) => i !== index))
  }

  const runExecution = () => {
    if (slottedOpcodes.length !== 4) {
      setOutputLog("❌ Incomplete Stack: Slot all 4 opcodes before executing.")
      return
    }

    setIsRunning(true)
    setOutputLog("⚡ Initializing EVM Execution Environment on Electroneum Layer 1...")

    setTimeout(() => {
      const currentIds = slottedOpcodes.map((o) => o.id)
      const isMatch = currentIds.every((id, idx) => id === correctOrder[idx])

      if (isMatch) {
        setOutputLog("✅ EVM Bytecode verified! Gas consumed: 106 gas (~0.000001 ETN). Contract Deployed successfully!")
        setIsSuccess(true)
        setTimeout(() => {
          onComplete()
        }, 1800)
      } else {
        setOutputLog("❌ Execution Reverted: Invalid stack ordering. Opcodes must execute in logical lifecycle order.")
        setIsRunning(false)
      }
    }, 1200)
  }

  const resetStack = () => {
    setSlottedOpcodes([])
    setIsRunning(false)
    setOutputLog("Stack reset. Re-order your opcodes.")
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-stone-900/90 border-2 border-glow-cyan/40 rounded-2xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 text-glow-cyan border border-cyan-500/30 rounded-full text-xs font-bold uppercase tracking-widest mb-2">
          <Cpu className="w-3.5 h-3.5" /> Stage 4 Mini-Game: EVM Smart Contracts
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white font-[family-name:var(--font-cinzel-decorative)]">
          Compile EVM Bytecode on Electroneum
        </h2>
        <p className="text-white/70 text-sm max-w-xl mx-auto mt-1 font-[family-name:var(--font-cinzel)]">
          Electroneum is fully EVM compatible. Slot the opcode runes in the correct execution lifecycle order (<span className="text-glow-amber">PUSH32 → MSTORE → CALL → RETURN</span>) to compile your dApp!
        </p>
      </div>

      {/* Opcode Inventory */}
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider text-white/50 mb-2">Available Opcode Runes:</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {AVAILABLE_OPCODES.map((opcode) => {
            const isSlotted = slottedOpcodes.some((o) => o.id === opcode.id)
            return (
              <button
                key={opcode.id}
                disabled={isSlotted || isRunning}
                onClick={() => addOpcode(opcode)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSlotted
                    ? "opacity-30 border-white/10 bg-stone-950"
                    : "border-cyan-500/40 bg-stone-950/80 hover:border-cyan-400 hover:scale-102"
                }`}
              >
                <div className="font-mono font-bold text-sm text-glow-cyan">{opcode.name}</div>
                <div className="text-[10px] text-white/60 mt-1">{opcode.description}</div>
                <div className="text-[9px] text-amber-400 mt-1 font-mono">Gas: {opcode.gasCost}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Execution Stack Machine Slots */}
      <div className="bg-stone-950/80 p-5 rounded-xl border border-white/10 mb-6">
        <div className="flex justify-between items-center text-xs uppercase tracking-wider text-white/50 mb-3">
          <span>EVM Execution Stack (4 Slots):</span>
          <button onClick={resetStack} className="text-amber-400 hover:underline flex items-center gap-1 cursor-pointer">
            <RotateCcw className="w-3 h-3" /> Clear Stack
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((slotIdx) => {
            const slotted = slottedOpcodes[slotIdx]
            return (
              <div
                key={slotIdx}
                onClick={() => slotted && removeOpcode(slotIdx)}
                className={`h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-2 text-center transition-all cursor-pointer ${
                  slotted
                    ? "border-emerald-400 bg-emerald-950/50"
                    : "border-white/20 bg-stone-900/40 hover:border-white/40"
                }`}
              >
                {slotted ? (
                  <>
                    <div className="text-[10px] text-white/40 font-mono">Slot {slotIdx + 1}</div>
                    <div className="font-mono font-bold text-xs text-white mt-1">{slotted.name}</div>
                    <div className="text-[9px] text-red-400 mt-1">Click to Remove</div>
                  </>
                ) : (
                  <span className="text-[10px] text-white/30 font-mono">Slot {slotIdx + 1} Empty</span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Terminal / Run Console */}
      <div className="bg-black/90 p-4 rounded-xl border border-white/10 font-mono text-xs text-green-400 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="truncate">{outputLog}</span>
        </div>
        <button
          onClick={runExecution}
          disabled={isRunning || slottedOpcodes.length !== 4 || isSuccess}
          className={`px-4 py-2 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
            slottedOpcodes.length === 4 && !isSuccess
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-stone-950 hover:scale-105 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              : "bg-stone-800 text-white/40 cursor-not-allowed"
          }`}
        >
          <Play className="w-3.5 h-3.5" /> Execute
        </button>
      </div>

      {/* Success banner */}
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-emerald-950/90 border-2 border-emerald-400 rounded-xl text-center shadow-[0_0_30px_rgba(52,211,153,0.4)]"
        >
          <div className="flex items-center justify-center gap-2 text-emerald-300 font-bold text-lg mb-1">
            <Award className="w-6 h-6 text-emerald-400" />
            EVM Bytecode Successfully Compiled & Verified!
          </div>
          <p className="text-white/80 text-xs">Proceeding to Quiz Challenge...</p>
        </motion.div>
      )}
    </div>
  )
}
