"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { KeyRound, ShieldCheck, Lock, Award, RefreshCw } from "lucide-react"

interface SignatureVaultProps {
  onComplete: () => void
}

export function SignatureVaultGame({ onComplete }: SignatureVaultProps) {
  // 4 pieces of EIP-712 typed data to align
  const [domainSet, setDomainSet] = useState(false)
  const [payloadSet, setPayloadSet] = useState(false)
  const [nonceFresh, setNonceFresh] = useState(false)
  const [signerVerified, setSignerVerified] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const isAllVerified = domainSet && payloadSet && nonceFresh && signerVerified

  useEffect(() => {
    if (isAllVerified && !isSuccess) {
      setIsSuccess(true)
      setTimeout(() => {
        onComplete()
      }, 1800)
    }
  }, [isAllVerified, isSuccess, onComplete])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-stone-900/90 border-2 border-glow-amber/40 rounded-2xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-glow-amber border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-widest mb-2">
          <KeyRound className="w-3.5 h-3.5" /> Stage 5 Mini-Game: EIP-712 Cryptographic Vault
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white font-[family-name:var(--font-cinzel-decorative)]">
          Construct EIP-712 Secure Voucher
        </h2>
        <p className="text-white/70 text-sm max-w-xl mx-auto mt-1 font-[family-name:var(--font-cinzel)]">
          Electroneum secures reward mints using EIP-712 typed off-chain signatures. Toggle each cryptographic security check to construct an authentic, anti-replay proof!
        </p>
      </div>

      {/* 4 Cryptographic Seal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Card 1: Domain Separator */}
        <div
          onClick={() => setDomainSet((p) => !p)}
          className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
            domainSet
              ? "border-emerald-400 bg-emerald-950/60 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
              : "border-amber-500/30 bg-stone-950 hover:border-amber-400"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-bold text-glow-cyan">1. Domain Separator</span>
            {domainSet ? <ShieldCheck className="w-5 h-5 text-emerald-400" /> : <Lock className="w-5 h-5 text-amber-400/60" />}
          </div>
          <p className="text-xs text-white/70">
            Binds signature strictly to Electroneum Smart Chain (ChainId 52014) and GameCore contract address.
          </p>
          <div className="mt-3 text-[10px] font-mono text-emerald-400">
            {domainSet ? "✓ EIP712Domain Verified" : "Click to Validate Domain"}
          </div>
        </div>

        {/* Card 2: Typed Payload */}
        <div
          onClick={() => setPayloadSet((p) => !p)}
          className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
            payloadSet
              ? "border-emerald-400 bg-emerald-950/60 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
              : "border-amber-500/30 bg-stone-950 hover:border-amber-400"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-bold text-glow-amber">2. Progress TypeHash</span>
            {payloadSet ? <ShieldCheck className="w-5 h-5 text-emerald-400" /> : <Lock className="w-5 h-5 text-amber-400/60" />}
          </div>
          <p className="text-xs text-white/70">
            Hashes user address, quest ID, quiz score (0-100), and earned XP into structured keccak256 bytes.
          </p>
          <div className="mt-3 text-[10px] font-mono text-emerald-400">
            {payloadSet ? "✓ StructHash Generated" : "Click to Hash Payload"}
          </div>
        </div>

        {/* Card 3: Nonce Protection */}
        <div
          onClick={() => setNonceFresh((p) => !p)}
          className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
            nonceFresh
              ? "border-emerald-400 bg-emerald-950/60 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
              : "border-amber-500/30 bg-stone-950 hover:border-amber-400"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-bold text-glow-cyan">3. Anti-Replay Nonce</span>
            {nonceFresh ? <ShieldCheck className="w-5 h-5 text-emerald-400" /> : <Lock className="w-5 h-5 text-amber-400/60" />}
          </div>
          <p className="text-xs text-white/70">
            Generates unique, one-time integer to prevent malicious replay of old quest vouchers.
          </p>
          <div className="mt-3 text-[10px] font-mono text-emerald-400">
            {nonceFresh ? "✓ Nonce Unused & Valid" : "Click to Set Fresh Nonce"}
          </div>
        </div>

        {/* Card 4: ECDSA Signer Verification */}
        <div
          onClick={() => setSignerVerified((p) => !p)}
          className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
            signerVerified
              ? "border-emerald-400 bg-emerald-950/60 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
              : "border-amber-500/30 bg-stone-950 hover:border-amber-400"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-bold text-glow-amber">4. ECDSA Server Recovery</span>
            {signerVerified ? <ShieldCheck className="w-5 h-5 text-emerald-400" /> : <Lock className="w-5 h-5 text-amber-400/60" />}
          </div>
          <p className="text-xs text-white/70">
            Verifies that ECDSA.recover(hash, signature) exactly matches the authorized platform reward signer.
          </p>
          <div className="mt-3 text-[10px] font-mono text-emerald-400">
            {signerVerified ? "✓ Authorized Authority Key" : "Click to Recover Signer"}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-stone-950/80 p-4 rounded-xl border border-white/10 flex justify-between items-center text-xs text-white/70">
        <div>
          Security Verification: <span className="font-bold text-glow-cyan">{[domainSet, payloadSet, nonceFresh, signerVerified].filter(Boolean).length} / 4 Verified</span>
        </div>
        <div className="font-mono text-white/50">Algorithm: ECDSA-SECP256k1</div>
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
            EIP-712 Voucher Successfully Verified & Encrypted!
          </div>
          <p className="text-white/80 text-xs">Proceeding to Quiz Challenge...</p>
        </motion.div>
      )}
    </div>
  )
}
