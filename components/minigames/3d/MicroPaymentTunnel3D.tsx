"use client"

import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { Zap, Heart, Trophy, RefreshCw, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react"

interface MicroPaymentTunnel3DProps {
  questId: string
  onComplete: () => void
}

interface RingItem {
  mesh: THREE.Mesh
  z: number
  collected: boolean
}

export function MicroPaymentTunnel3D({ questId, onComplete }: MicroPaymentTunnel3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [ringsPassed, setRingsPassed] = useState(0)
  const [health, setHealth] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [victory, setVictory] = useState(false)
  const targetRings = 8

  const gameStateRef = useRef({
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    renderer: null as THREE.WebGLRenderer | null,
    ship: null as THREE.Group | null,
    rings: [] as RingItem[],
    hazards: [] as THREE.Mesh[],
    shipX: 0,
    shipY: 0,
    targetX: 0,
    targetY: 0,
    speed: 0.8,
    ringsCount: 0,
    health: 3,
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
    scene.background = new THREE.Color(0x030712)
    scene.fog = new THREE.FogExp2(0x030712, 0.02)

    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000)
    camera.position.set(0, 0, 5)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Glowing Cyber Tunnel Rings
    const tunnelRings: THREE.Mesh[] = []
    for (let z = 0; z > -350; z -= 8) {
      const tGeo = new THREE.TorusGeometry(5, 0.08, 8, 32)
      const tMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 })
      const ring = new THREE.Mesh(tGeo, tMat)
      ring.position.z = z
      scene.add(ring)
      tunnelRings.push(ring)
    }

    // Ship / Energy Probe
    const shipGroup = new THREE.Group()
    const shipGeo = new THREE.ConeGeometry(0.5, 1.4, 4)
    const shipMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      emissive: 0xd97706,
      metalness: 0.9,
    })
    const ship = new THREE.Mesh(shipGeo, shipMat)
    ship.rotation.x = -Math.PI / 2
    shipGroup.add(ship)

    const thruster = new THREE.PointLight(0x06b6d4, 3, 10)
    thruster.position.set(0, 0, 0.8)
    shipGroup.add(thruster)

    scene.add(shipGroup)

    // Gas Speed Rings to fly through
    const rings: RingItem[] = []
    const hazards: THREE.Mesh[] = []

    for (let z = -25; z >= -300; z -= 30) {
      // Golden Boost Ring
      const rGeo = new THREE.TorusGeometry(1.6, 0.18, 16, 32)
      const rMat = new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        emissive: 0xf59e0b,
      })
      const rMesh = new THREE.Mesh(rGeo, rMat)
      const rx = (Math.random() - 0.5) * 4
      const ry = (Math.random() - 0.5) * 4
      rMesh.position.set(rx, ry, z)
      scene.add(rMesh)
      rings.push({ mesh: rMesh, z, collected: false })

      // Hazard Firewall node
      const hGeo = new THREE.OctahedronGeometry(0.8, 0)
      const hMat = new THREE.MeshStandardMaterial({
        color: 0xef4444,
        emissive: 0xb91c1c,
      })
      const hMesh = new THREE.Mesh(hGeo, hMat)
      hMesh.position.set(-rx * 0.8, -ry * 0.8, z + 12)
      scene.add(hMesh)
      hazards.push(hMesh)
    }

    gameStateRef.current = {
      scene,
      camera,
      renderer,
      ship: shipGroup,
      rings,
      hazards,
      shipX: 0,
      shipY: 0,
      targetX: 0,
      targetY: 0,
      speed: 0.85,
      ringsCount: 0,
      health: 3,
      active: true,
    }

    setRingsPassed(0)
    setHealth(3)
    setGameOver(false)
    setVictory(false)

    // Animation Loop
    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const state = gameStateRef.current
      if (!state.active || !state.ship || !state.scene || !state.camera || !state.renderer) return

      // Smooth ship movement
      state.shipX += (state.targetX - state.shipX) * 0.12
      state.shipY += (state.targetY - state.shipY) * 0.12
      state.ship.position.set(state.shipX, state.shipY, 0)
      state.ship.rotation.z = (state.shipX - state.targetX) * 0.3

      // Move rings toward player
      state.rings.forEach((ring) => {
        ring.mesh.position.z += state.speed
        ring.mesh.rotation.z += 0.04

        if (!ring.collected) {
          const dx = ring.mesh.position.x - state.shipX
          const dy = ring.mesh.position.y - state.shipY
          const dz = ring.mesh.position.z

          if (Math.abs(dz) < 1.2 && Math.hypot(dx, dy) < 1.8) {
            ring.collected = true
            ;(ring.mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0x10b981)
            state.ringsCount += 1
            setRingsPassed(state.ringsCount)

            if (state.ringsCount >= targetRings) {
              state.active = false
              setVictory(true)
              setTimeout(() => onComplete(), 1500)
            }
          }
        }

        if (ring.mesh.position.z > 10) {
          ring.mesh.position.z = -280
          ring.collected = false
          ;(ring.mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0xf59e0b)
        }
      })

      // Move hazards
      state.hazards.forEach((hazard) => {
        hazard.position.z += state.speed
        hazard.rotation.x += 0.03
        hazard.rotation.y += 0.05

        const dx = hazard.position.x - state.shipX
        const dy = hazard.position.y - state.shipY
        const dz = hazard.position.z

        if (Math.abs(dz) < 1.0 && Math.hypot(dx, dy) < 1.1) {
          hazard.position.z = -280
          state.health -= 1
          setHealth(state.health)

          if (state.health <= 0) {
            state.active = false
            setGameOver(true)
          }
        }

        if (hazard.position.z > 10) {
          hazard.position.z = -280
        }
      })

      // Animate tunnel loop
      tunnelRings.forEach((tr) => {
        tr.position.z += state.speed
        if (tr.position.z > 5) tr.position.z -= 350
      })

      state.renderer.render(state.scene, state.camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
    }
  }

  useEffect(() => {
    const cleanup = initGame()
    return () => cleanup && cleanup()
  }, [])

  // Pointer / Mouse steering
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!gameStateRef.current.active || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    gameStateRef.current.targetX = nx * 3.2
    gameStateRef.current.targetY = ny * 3.2
  }

  const steer = (dx: number, dy: number) => {
    if (!gameStateRef.current.active) return
    gameStateRef.current.targetX = Math.max(-3, Math.min(3, gameStateRef.current.targetX + dx))
    gameStateRef.current.targetY = Math.max(-3, Math.min(3, gameStateRef.current.targetY + dy))
  }

  return (
    <div className="relative w-full h-[520px] md:h-[620px] bg-stone-950 rounded-2xl overflow-hidden border-2 border-glow-amber/50 shadow-2xl flex flex-col select-none">
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        className="w-full h-full cursor-crosshair"
      />

      {/* Top HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none z-10">
        <div className="flex items-center gap-1 bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-red-500/30">
          {[...Array(3)].map((_, i) => (
            <Heart
              key={i}
              className={`w-5 h-5 ${i < health ? "text-red-500 fill-red-500" : "text-stone-600"}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-500/30 font-mono font-bold text-glow-amber">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>{ringsPassed} / {targetRings} Gas Boost Rings</span>
        </div>
      </div>

      {/* Mobile Touch Steer Pad */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-auto md:hidden grid grid-cols-3 gap-1.5 w-36 h-36">
        <div />
        <button onClick={() => steer(0, 1.2)} className="bg-stone-800/90 border border-amber-500/50 rounded-xl flex items-center justify-center text-white">
          <ArrowUp className="w-6 h-6" />
        </button>
        <div />
        <button onClick={() => steer(-1.2, 0)} className="bg-stone-800/90 border border-amber-500/50 rounded-xl flex items-center justify-center text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button onClick={() => steer(0, -1.2)} className="bg-stone-800/90 border border-amber-500/50 rounded-xl flex items-center justify-center text-white">
          <ArrowDown className="w-6 h-6" />
        </button>
        <button onClick={() => steer(1.2, 0)} className="bg-stone-800/90 border border-amber-500/50 rounded-xl flex items-center justify-center text-white">
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop helper */}
      <div className="absolute bottom-4 right-4 hidden md:flex items-center gap-2 text-xs text-white/60 bg-stone-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 pointer-events-none">
        <span>Move Mouse / Drag to steer through Golden Gas Boost rings</span>
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 animate-fade-in text-center">
          <div className="text-6xl mb-3 animate-bounce">💥</div>
          <h3 className="text-3xl font-bold text-red-400 font-[family-name:var(--font-cinzel-decorative)] mb-2">
            Micro-Payment Stalled
          </h3>
          <p className="text-white/70 text-sm max-w-xs mb-6">
            Avoid red firewall nodes while threading through boost rings.
          </p>
          <button
            onClick={() => initGame()}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" /> Re-enter Pipeline
          </button>
        </div>
      )}

      {/* Victory Modal */}
      {victory && (
        <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 animate-fade-in text-center">
          <Trophy className="w-16 h-16 text-yellow-400 animate-bounce mb-3" />
          <h3 className="text-3xl font-black text-white font-[family-name:var(--font-cinzel-decorative)] mb-1">
            Warp Speed Achieved!
          </h3>
          <p className="text-emerald-300 text-sm font-semibold mb-4">
            8 Gas Rings Traversed • Near-Zero Fee Verified
          </p>
          <span className="text-xs text-white/60">Opening Quiz Arena...</span>
        </div>
      )}
    </div>
  )
}
