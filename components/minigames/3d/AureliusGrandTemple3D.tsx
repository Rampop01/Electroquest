"use client"

import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { Trophy, Heart, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Zap, RefreshCw, Crown } from "lucide-react"

interface AureliusGrandTemple3DProps {
  questId: string
  onComplete: () => void
}

interface RelicItem {
  id: number
  name: string
  color: number
  mesh: THREE.Mesh
  collected: boolean
}

export function AureliusGrandTemple3D({ questId, onComplete }: AureliusGrandTemple3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [relicsCount, setRelicsCount] = useState(0)
  const [health, setHealth] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [victory, setVictory] = useState(false)
  const totalRelics = 4

  const gameStateRef = useRef({
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    renderer: null as THREE.WebGLRenderer | null,
    player: null as THREE.Group | null,
    colossus: null as THREE.Mesh | null,
    shockwaves: [] as THREE.Mesh[],
    relics: [] as RelicItem[],
    keys: {} as Record<string, boolean>,
    isJumping: false,
    jumpVelocity: 0,
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
    scene.background = new THREE.Color(0x0a0705)
    scene.fog = new THREE.FogExp2(0x0a0705, 0.025)

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000)
    camera.position.set(0, 16, 16)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const bossLight = new THREE.PointLight(0xfbbf24, 3, 25)
    bossLight.position.set(0, 6, 0)
    scene.add(bossLight)

    // Grand Temple Arena Floor
    const floorGeo = new THREE.CylinderGeometry(20, 20, 1, 64)
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      roughness: 0.8,
      metalness: 0.3,
    })
    const floor = new THREE.Mesh(floorGeo, floorMat)
    floor.position.y = -0.5
    scene.add(floor)

    // Central Aurelius Guardian Colossus
    const bossGeo = new THREE.DodecahedronGeometry(2.5, 1)
    const bossMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0x78350f,
      metalness: 0.9,
    })
    const colossus = new THREE.Mesh(bossGeo, bossMat)
    colossus.position.set(0, 3, 0)
    scene.add(colossus)

    // Player Hero
    const playerGroup = new THREE.Group()
    const pGeo = new THREE.BoxGeometry(0.8, 1.2, 0.8)
    const pMat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x0891b2,
      metalness: 0.8,
    })
    const pMesh = new THREE.Mesh(pGeo, pMat)
    pMesh.position.y = 0.6
    playerGroup.add(pMesh)

    playerGroup.position.set(0, 0, 12)
    scene.add(playerGroup)

    // 4 Grand Relics placed at cardinal directions
    const relicData = [
      { id: 1, name: "IBFT Core", color: 0x06b6d4, x: -11, z: 0 },
      { id: 2, name: "EVM Spire", color: 0xa855f7, x: 11, z: 0 },
      { id: 3, name: "AnyTask Seal", color: 0x10b981, x: 0, z: -11 },
      { id: 4, name: "ETN Sovereign", color: 0xfbbf24, x: 0, z: 11 },
    ]

    const relics: RelicItem[] = relicData.map((rd) => {
      const rGeo = new THREE.OctahedronGeometry(0.8, 0)
      const rMat = new THREE.MeshStandardMaterial({
        color: rd.color,
        emissive: rd.color,
        emissiveIntensity: 0.5,
      })
      const rMesh = new THREE.Mesh(rGeo, rMat)
      rMesh.position.set(rd.x, 1.2, rd.z)
      scene.add(rMesh)
      return {
        id: rd.id,
        name: rd.name,
        color: rd.color,
        mesh: rMesh,
        collected: false,
      }
    })

    gameStateRef.current = {
      scene,
      camera,
      renderer,
      player: playerGroup,
      colossus,
      shockwaves: [],
      relics,
      keys: {},
      isJumping: false,
      jumpVelocity: 0,
      health: 3,
      active: true,
    }

    setRelicsCount(0)
    setHealth(3)
    setGameOver(false)
    setVictory(false)

    // Shockwave spawner & game loop
    let lastShockwave = 0
    let animId: number

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate)
      const state = gameStateRef.current
      if (!state.active || !state.player || !state.scene || !state.camera || !state.renderer) return

      colossus.rotation.y += 0.015

      // Spawn expanding shockwave ring every 3.5s for strategic timing
      if (time - lastShockwave > 3500 && state.shockwaves.length < 3) {
        lastShockwave = time
        const sGeo = new THREE.RingGeometry(2.5, 3.2, 32)
        const sMat = new THREE.MeshBasicMaterial({
          color: 0xf59e0b,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.75,
        })
        const shockwave = new THREE.Mesh(sGeo, sMat)
        shockwave.rotation.x = -Math.PI / 2
        shockwave.position.y = 0.15
        state.scene.add(shockwave)
        state.shockwaves.push(shockwave)
      }

      // Expand shockwaves gently
      state.shockwaves.forEach((sw, idx) => {
        sw.scale.x += 0.028
        sw.scale.y += 0.028

        const radius = sw.scale.x * 2.8
        const pDist = state.player!.position.length()

        // Check if shockwave hits grounded player
        if (Math.abs(pDist - radius) < 0.6 && state.player!.position.y < 0.8) {
          // Player hit!
          state.health -= 1
          setHealth(state.health)
          state.scene!.remove(sw)
          state.shockwaves.splice(idx, 1)

          if (state.health <= 0) {
            state.active = false
            setGameOver(true)
          }
        }

        if (radius > 22) {
          state.scene!.remove(sw)
          state.shockwaves.splice(idx, 1)
        }
      })

      // Player Movement
      const p = state.player.position
      const speed = 0.16
      if (state.keys["w"] || state.keys["ArrowUp"]) p.z = Math.max(-16, p.z - speed)
      if (state.keys["s"] || state.keys["ArrowDown"]) p.z = Math.min(16, p.z + speed)
      if (state.keys["a"] || state.keys["ArrowLeft"]) p.x = Math.max(-16, p.x - speed)
      if (state.keys["d"] || state.keys["ArrowRight"]) p.x = Math.min(16, p.x + speed)

      // Jump Physics (floaty and generous)
      if (state.isJumping) {
        p.y += state.jumpVelocity
        state.jumpVelocity -= 0.02
        if (p.y <= 0) {
          p.y = 0
          state.isJumping = false
        }
      }

      // Check Relic Collection
      state.relics.forEach((relic) => {
        if (!relic.collected) {
          relic.mesh.rotation.y += 0.03

          if (p.distanceTo(relic.mesh.position) < 2.0) {
            relic.collected = true
            state.scene!.remove(relic.mesh)
            const collectedNow = state.relics.filter((r) => r.collected).length
            setRelicsCount(collectedNow)

            if (collectedNow >= totalRelics) {
              state.active = false
              setVictory(true)
              setTimeout(() => onComplete(), 1600)
            }
          }
        }
      })

      // Camera follow
      state.camera.position.x += (p.x - state.camera.position.x) * 0.05
      state.camera.position.z += (p.z + 14 - state.camera.position.z) * 0.05

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

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      gameStateRef.current.keys[e.key.toLowerCase()] = true
      gameStateRef.current.keys[e.key] = true
      if ((e.key === " " || e.key === "Spacebar") && !gameStateRef.current.isJumping) {
        gameStateRef.current.isJumping = true
        gameStateRef.current.jumpVelocity = 0.38
      }
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      gameStateRef.current.keys[e.key.toLowerCase()] = false
      gameStateRef.current.keys[e.key] = false
    }
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  const jump = () => {
    if (!gameStateRef.current.isJumping && gameStateRef.current.active) {
      gameStateRef.current.isJumping = true
      gameStateRef.current.jumpVelocity = 0.38
    }
  }

  const setDir = (key: string, val: boolean) => {
    gameStateRef.current.keys[key] = val
  }

  return (
    <div className="relative w-full h-[520px] md:h-[620px] bg-stone-950 rounded-2xl overflow-hidden border-2 border-glow-amber/60 shadow-2xl flex flex-col select-none">
      <div ref={containerRef} className="w-full h-full cursor-grab" />

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
          <Crown className="w-4 h-4 text-amber-400" />
          <span>{relicsCount} / {totalRelics} Grand Relics</span>
        </div>
      </div>

      {/* Mobile Touch Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-auto md:hidden">
        <div className="grid grid-cols-3 gap-1 w-32 h-32">
          <div />
          <button onTouchStart={() => setDir("ArrowUp", true)} onTouchEnd={() => setDir("ArrowUp", false)} className="bg-stone-800/90 border border-amber-500/50 rounded-xl flex items-center justify-center text-white">
            <ArrowUp className="w-5 h-5" />
          </button>
          <div />
          <button onTouchStart={() => setDir("ArrowLeft", true)} onTouchEnd={() => setDir("ArrowLeft", false)} className="bg-stone-800/90 border border-amber-500/50 rounded-xl flex items-center justify-center text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button onTouchStart={() => setDir("ArrowDown", true)} onTouchEnd={() => setDir("ArrowDown", false)} className="bg-stone-800/90 border border-amber-500/50 rounded-xl flex items-center justify-center text-white">
            <ArrowDown className="w-5 h-5" />
          </button>
          <button onTouchStart={() => setDir("ArrowRight", true)} onTouchEnd={() => setDir("ArrowRight", false)} className="bg-stone-800/90 border border-amber-500/50 rounded-xl flex items-center justify-center text-white">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={jump}
          className="w-20 h-16 bg-amber-500 active:bg-amber-400 text-stone-950 font-black rounded-2xl flex items-center justify-center shadow-lg text-sm"
        >
          JUMP
        </button>
      </div>

      {/* Desktop helper */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 text-xs text-white/60 bg-stone-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 pointer-events-none">
        <span>WASD to Move • Press Space to Jump over expanding shockwave rings!</span>
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 animate-fade-in text-center">
          <div className="text-6xl mb-3 animate-bounce">⚡</div>
          <h3 className="text-3xl font-bold text-red-400 font-[family-name:var(--font-cinzel-decorative)] mb-2">
            Shockwave Overwhelmed
          </h3>
          <p className="text-white/70 text-sm max-w-xs mb-6">
            Jump over the expanding golden shockwave rings as they pulse outward.
          </p>
          <button
            onClick={() => initGame()}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" /> Re-enter Grand Arena
          </button>
        </div>
      )}

      {/* Victory Modal */}
      {victory && (
        <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 animate-fade-in text-center">
          <Crown className="w-20 h-20 text-yellow-400 animate-bounce mb-3" />
          <h3 className="text-3xl font-black text-white font-[family-name:var(--font-cinzel-decorative)] mb-1">
            Grand Aurelius Conquered!
          </h3>
          <p className="text-emerald-300 text-sm font-semibold mb-4">
            All 4 Grand Relics Crowned • Master Chapter Unlocked
          </p>
          <span className="text-xs text-white/60">Opening Final Quiz Arena...</span>
        </div>
      )}
    </div>
  )
}
