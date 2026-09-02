"use client"

import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { Shield, Trophy, RefreshCw, Award, ArrowLeft, ArrowRight } from "lucide-react"

interface EnterpriseShield3DProps {
  questId: string
  onComplete: () => void
}

interface IncomingPacket {
  mesh: THREE.Mesh
  speed: number
}

export function EnterpriseShield3D({ questId, onComplete }: EnterpriseShield3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [deflectedCount, setDeflectedCount] = useState(0)
  const [coreHealth, setCoreHealth] = useState(100)
  const [gameOver, setGameOver] = useState(false)
  const [victory, setVictory] = useState(false)
  const targetDeflect = 10

  const gameStateRef = useRef({
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    renderer: null as THREE.WebGLRenderer | null,
    shieldArc: null as THREE.Mesh | null,
    shieldAngle: 0,
    packets: [] as IncomingPacket[],
    deflected: 0,
    health: 100,
    active: true,
  })

  const initGame = () => {
    if (!containerRef.current) return
    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    if (gameStateRef.current.renderer) {
      if (container.contains(gameStateRef.current.renderer.domElement)) {
        container.removeChild(gameStateRef.current.renderer.domElement)
      }
      gameStateRef.current.renderer.dispose()
    }

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0a14)

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
    camera.position.set(0, 22, 14)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const nodeLight = new THREE.PointLight(0x38bdf8, 3, 25)
    nodeLight.position.set(0, 2, 0)
    scene.add(nodeLight)

    // Central Core Node (Cambridge / Oxford Node)
    const coreGeo = new THREE.IcosahedronGeometry(2.2, 2)
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      metalness: 0.9,
    })
    const core = new THREE.Mesh(coreGeo, coreMat)
    scene.add(core)

    // Orbital Shield Arc
    const arcGeo = new THREE.RingGeometry(4.8, 5.4, 32, 1, 0, Math.PI * 0.7)
    const arcMat = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
      side: THREE.DoubleSide,
    })
    const shieldArc = new THREE.Mesh(arcGeo, arcMat)
    shieldArc.rotation.x = -Math.PI / 2
    scene.add(shieldArc)

    gameStateRef.current = {
      scene,
      camera,
      renderer,
      shieldArc,
      shieldAngle: 0,
      packets: [],
      deflected: 0,
      health: 100,
      active: true,
    }

    setDeflectedCount(0)
    setCoreHealth(100)
    setGameOver(false)
    setVictory(false)

    // Animation Loop
    let lastSpawn = 0
    let animId: number

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate)
      const state = gameStateRef.current
      if (!state.active || !state.scene || !state.camera || !state.renderer) return

      // Rotate Shield Arc
      if (state.shieldArc) {
        state.shieldArc.rotation.z = state.shieldAngle
      }

      // Spawn hostile packet every 2.2s
      if (time - lastSpawn > 2200 && state.packets.length < 5) {
        lastSpawn = time
        const angle = Math.random() * Math.PI * 2
        const rad = 16
        const pGeo = new THREE.SphereGeometry(0.5, 12, 12)
        const pMat = new THREE.MeshStandardMaterial({
          color: 0xef4444,
          emissive: 0x991b1b,
        })
        const pMesh = new THREE.Mesh(pGeo, pMat)
        pMesh.position.set(Math.cos(angle) * rad, 0, Math.sin(angle) * rad)
        state.scene.add(pMesh)
        state.packets.push({ mesh: pMesh, speed: 0.045 })
      }

      // Update incoming packets
      state.packets.forEach((pkt, idx) => {
        const pPos = pkt.mesh.position
        const dir = new THREE.Vector3(0, 0, 0).sub(pPos).normalize()
        pPos.add(dir.multiplyScalar(pkt.speed))

        const dist = pPos.length()

        // Check deflection by shield arc
        if (dist >= 4.6 && dist <= 5.6) {
          const packetAngle = Math.atan2(pPos.x, pPos.z)
          // Normalize angles
          let diff = (packetAngle - state.shieldAngle) % (Math.PI * 2)
          if (diff < -Math.PI) diff += Math.PI * 2
          if (diff > Math.PI) diff -= Math.PI * 2

          if (Math.abs(diff) < Math.PI * 0.35) {
            // Deflected!
            state.scene!.remove(pkt.mesh)
            state.packets.splice(idx, 1)
            state.deflected += 1
            setDeflectedCount(state.deflected)

            if (state.deflected >= targetDeflect) {
              state.active = false
              setVictory(true)
              setTimeout(() => onComplete(), 1500)
            }
          }
        } else if (dist < 2.2) {
          // Packet hit central network core!
          state.scene!.remove(pkt.mesh)
          state.packets.splice(idx, 1)
          state.health -= 25
          setCoreHealth(Math.max(0, state.health))

          if (state.health <= 0) {
            state.active = false
            setGameOver(true)
          }
        }
      })

      state.renderer.render(state.scene, state.camera)
    }

    animate(0)

    return () => {
      cancelAnimationFrame(animId)
    }
  }

  useEffect(() => {
    const cleanup = initGame()
    return () => cleanup && cleanup()
  }, [])

  // Mouse / Touch drag to rotate shield
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!gameStateRef.current.active || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const angle = Math.atan2(e.clientX - centerX, e.clientY - centerY)
    gameStateRef.current.shieldAngle = angle
  }

  const rotateShield = (delta: number) => {
    if (!gameStateRef.current.active) return
    gameStateRef.current.shieldAngle += delta
  }

  return (
    <div className="relative w-full h-[520px] md:h-[620px] bg-stone-950 rounded-2xl overflow-hidden border-2 border-glow-cyan/50 shadow-2xl flex flex-col select-none">
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Top HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none z-10">
        <div className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-cyan-500/30">
          <Shield className="w-5 h-5 text-cyan-400" />
          <span className="text-xs uppercase font-bold text-white/70">Core Shield:</span>
          <span className={`font-mono font-bold ${coreHealth <= 25 ? "text-red-400 animate-pulse" : "text-glow-cyan"}`}>
            {coreHealth}%
          </span>
        </div>

        <div className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-500/30 font-mono font-bold text-glow-amber">
          <Award className="w-4 h-4 text-amber-400" />
          <span>{deflectedCount} / {targetDeflect} Deflected</span>
        </div>
      </div>

      {/* Mobile Touch Rotation Buttons */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-auto md:hidden">
        <button
          onClick={() => rotateShield(0.35)}
          className="w-16 h-14 bg-stone-800/90 active:bg-cyan-500/80 border border-cyan-500/50 rounded-xl flex items-center justify-center text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => rotateShield(-0.35)}
          className="w-16 h-14 bg-stone-800/90 active:bg-cyan-500/80 border border-cyan-500/50 rounded-xl flex items-center justify-center text-white"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop helper */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 text-xs text-white/60 bg-stone-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 pointer-events-none">
        <span>Move Mouse / Drag to rotate the orbital energy shield</span>
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 animate-fade-in text-center">
          <div className="text-6xl mb-3 animate-bounce">💥</div>
          <h3 className="text-3xl font-bold text-red-400 font-[family-name:var(--font-cinzel-decorative)] mb-2">
            Network Core Overwhelmed
          </h3>
          <p className="text-white/70 text-sm max-w-xs mb-6">
            Rotate the orbital shield to intercept all incoming cyber packets.
          </p>
          <button
            onClick={() => initGame()}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-stone-950 font-bold rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
        </div>
      )}

      {/* Victory Modal */}
      {victory && (
        <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 animate-fade-in text-center">
          <Trophy className="w-16 h-16 text-yellow-400 animate-bounce mb-3" />
          <h3 className="text-3xl font-black text-white font-[family-name:var(--font-cinzel-decorative)] mb-1">
            Enterprise Shield Fortified!
          </h3>
          <p className="text-emerald-300 text-sm font-semibold mb-4">
            12 Incursions Deflected • Academic Nodes Safe
          </p>
          <span className="text-xs text-white/60">Opening Quiz Arena...</span>
        </div>
      )}
    </div>
  )
}
