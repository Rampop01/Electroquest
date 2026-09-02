"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Globe, CreditCard, ArrowRight, Smartphone, CheckCircle2, Award, DollarSign } from "lucide-react"

interface PaymentRouterProps {
  onComplete: () => void
}

interface StepNode {
  id: string
  label: string
  sublabel: string
  icon: any
  active: boolean
}

export function PaymentRouterGame({ onComplete }: PaymentRouterProps) {
  // Step connections for AnyTask route
  const [selectedRoute, setSelectedRoute] = useState<string[]>([])
  const [isSuccess, setIsSuccess] = useState(false)
  const [sellerFee, setSellerFee] = useState(20) // Traditional platforms charge 20%
  const [payoutReceived, setPayoutReceived] = useState(80)

  // Desired correct sequence: "buyer_card" -> "anytask_gateway" -> "etn_smartchain" -> "freelancer_wallet"
  const correctSequence = ["buyer_card", "anytask_gateway", "etn_smartchain", "freelancer_wallet"]

  const nodes = [
    {
      id: "buyer_card",
      label: "1. Global Buyer",
      sublabel: "USD/EUR Credit Card",
      icon: CreditCard,
      color: "border-blue-500/50 bg-blue-950/40 text-blue-400",
    },
    {
      id: "traditional_bank",
      label: "❌ Legacy SWIFT",
      sublabel: "3-5 Days & $35 Wire Fee",
      icon: DollarSign,
      color: "border-red-500/40 bg-red-950/30 text-red-400",
    },
    {
      id: "anytask_gateway",
      label: "2. AnyTask Engine",
      sublabel: "Instant Conversion / 0% Seller Fee",
      icon: Globe,
      color: "border-amber-500/50 bg-amber-950/40 text-glow-amber",
    },
    {
      id: "etn_smartchain",
      label: "3. ETN Smart Chain",
      sublabel: "5s Settlement & <$0.0001 Gas",
      icon: Globe,
      color: "border-cyan-500/50 bg-cyan-950/40 text-glow-cyan",
    },
    {
      id: "freelancer_wallet",
      label: "4. Freelancer Mobile",
      sublabel: "100% Earnings (No Bank Needed)",
      icon: Smartphone,
      color: "border-emerald-500/50 bg-emerald-950/40 text-emerald-400",
    },
  ]

  const handleNodeClick = (nodeId: string) => {
    if (isSuccess) return
    if (nodeId === "traditional_bank") {
      // Penalty: traditional bank charges fee
      setSellerFee(20)
      setPayoutReceived(80)
      setSelectedRoute([])
      return
    }

    if (!selectedRoute.includes(nodeId)) {
      const nextRoute = [...selectedRoute, nodeId]
      setSelectedRoute(nextRoute)

      if (nextRoute.includes("anytask_gateway")) {
        setSellerFee(0)
        setPayoutReceived(100)
      }

      // Check if full sequence matched
      if (
        nextRoute.length === 4 &&
        nextRoute[0] === "buyer_card" &&
        nextRoute[1] === "anytask_gateway" &&
        nextRoute[2] === "etn_smartchain" &&
        nextRoute[3] === "freelancer_wallet"
      ) {
        setIsSuccess(true)
        setTimeout(() => {
          onComplete()
        }, 1800)
      }
    }
  }

  const resetRoute = () => {
    setSelectedRoute([])
    setSellerFee(20)
    setPayoutReceived(80)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-stone-900/90 border-2 border-glow-amber/40 rounded-2xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-glow-amber border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-widest mb-2">
          <Globe className="w-3.5 h-3.5" /> Stage 3 Mini-Game: AnyTask Zero-Fee Ecosystem
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white font-[family-name:var(--font-cinzel-decorative)]">
          Route the Zero-Fee Payment Pipeline
        </h2>
        <p className="text-white/70 text-sm max-w-xl mx-auto mt-1 font-[family-name:var(--font-cinzel)]">
          AnyTask allows buyers to pay with a credit card while empowering unbanked global freelancers with <span className="text-emerald-400 font-bold">100% of their earnings (0% seller fee)</span>. Click the nodes in sequence to establish the pipeline!
        </p>
      </div>

      {/* Stats comparison */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-stone-950/80 p-4 rounded-xl border border-white/10 text-center">
          <span className="text-xs uppercase tracking-wider text-white/50">Seller Platform Fee</span>
          <div className={`text-2xl font-black font-mono ${sellerFee === 0 ? "text-emerald-400" : "text-red-400"}`}>
            {sellerFee}% {sellerFee === 0 ? "(Zero Fee!)" : "(High Fee)"}
          </div>
        </div>
        <div className="bg-stone-950/80 p-4 rounded-xl border border-white/10 text-center">
          <span className="text-xs uppercase tracking-wider text-white/50">Freelancer Payout on $100</span>
          <div className={`text-2xl font-black font-mono ${payoutReceived === 100 ? "text-emerald-400" : "text-amber-400"}`}>
            ${payoutReceived}.00 USD in ETN
          </div>
        </div>
      </div>

      {/* Node selection grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
        {nodes.map((node, index) => {
          const isSelected = selectedRoute.includes(node.id)
          const selectionIndex = selectedRoute.indexOf(node.id) + 1

          return (
            <motion.button
              key={node.id}
              onClick={() => handleNodeClick(node.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`relative p-4 rounded-xl border-2 flex flex-col items-center justify-between text-center transition-all cursor-pointer ${
                isSelected ? "border-emerald-400 bg-emerald-950/70 shadow-[0_0_20px_rgba(52,211,153,0.3)]" : node.color
              }`}
            >
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 text-stone-900 font-black text-xs flex items-center justify-center">
                  {selectionIndex}
                </div>
              )}
              <node.icon className="w-8 h-8 mb-2" />
              <div className="font-bold text-sm text-white">{node.label}</div>
              <div className="text-[10px] text-white/60 mt-1">{node.sublabel}</div>
            </motion.button>
          )
        })}
      </div>

      {/* Pipeline Status */}
      <div className="flex justify-between items-center bg-stone-950/60 p-4 rounded-xl border border-white/5">
        <div className="text-xs text-white/70">
          Selected Sequence: <span className="font-mono text-glow-cyan font-bold">{selectedRoute.length} / 4 Nodes Connected</span>
        </div>
        <button
          onClick={resetRoute}
          className="text-xs text-amber-400 hover:underline cursor-pointer"
        >
          Reset Pipeline
        </button>
      </div>

      {/* Success banner */}
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 bg-emerald-950/90 border-2 border-emerald-400 rounded-xl text-center shadow-[0_0_30px_rgba(52,211,153,0.4)]"
        >
          <div className="flex items-center justify-center gap-2 text-emerald-300 font-bold text-lg mb-1">
            <Award className="w-6 h-6 text-emerald-400" />
            AnyTask 0% Seller Fee Pipeline Activated!
          </div>
          <p className="text-white/80 text-xs">Proceeding to Quiz Challenge...</p>
        </motion.div>
      )}
    </div>
  )
}
