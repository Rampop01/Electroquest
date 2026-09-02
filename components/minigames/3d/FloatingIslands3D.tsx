"use client"

import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { Trophy, Heart, ArrowUp, ArrowLeft, ArrowRight, RefreshCw, Zap } from "lucide-react"

interface FloatingIslands3DProps {
  questId: string
  onComplete: () => void
}

interface Platform {
  mesh: THREE.Mesh
  rune?: THREE.Mesh
  hasRune: boolean
  moveSpeed?: number
  initX: number
  range: number
}

export function FloatingIslands3D({ questId, onComplete }: FloatingIslands3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [runesCollected, setRunesCollected] = useState(0)
  const [health, setHealth] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [victory, setVictory] = useState(false)
  const targetRunes = 4

  const gameStateRef = useRef({
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    renderer: null as THREE.WebGLRenderer | null,
    player: null as THREE.Group | null,
    platforms: [] as Platform[],
    runesCount: 0,
    health: 3,
    active: true,
    vx: 0,
    vz: 0,
    vy: 0,
    isGrounded: true,
    keys: {} as Record<string, boolean>,
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
    scene.background = new THREE.Color(0x050814)
    scene.fog = new THREE.FogExp2(0x050814, 0.02)

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.set(0, 8, 12)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    container.appendChild(renderer.domElement)

    // Cosmic sky ambient & starfield
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const sunLight = new THREE.DirectionalLight(0x38bdf8, 1.2)
    sunLight.position.set(5, 15, 8)
    scene.add(sunLight)

    // Player Hero
    const playerGroup = new THREE.Group()
    const pGeo = new THREE.CylinderGeometry(0.4, 0.5, 1.3, 16)
    const pMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x083344,
      metalness: 0.9,
    })
    const pMesh = new THREE.Mesh(pGeo, pMat)
    pMesh.position.y = 0.65
    playerGroup.add(pMesh)

    const coreLight = new THREE.PointLight(0x22d3ee, 2, 8)
    coreLight.position.set(0, 1, 0)
    playerGroup.add(coreLight)

    playerGroup.position.set(0, 1.5, 0)
    scene.add(playerGroup)

    // Floating Stone Platforms
    const platforms: Platform[] = []
    const platformData = [
      { x: 0, y: 0, z: 0, w: 4.5, d: 4.5, rune: false },
      { x: 0, y: 1, z: -6, w: 3.8, d: 3.8, rune: true, name: "Consensus Rune" },
      { x: -3, y: 2, z: -12, w: 3.6, d: 3.6, rune: true, moveSpeed: 0.015, range: 2.0 },
      { x: 3, y: 3.5, z: -18, w: 3.6, d: 3.6, rune: true, moveSpeed: -0.015, range: 2.0 },
      { x: 0, y: 5, z: -25, w: 4.5, d: 4.5, rune: true, name: "Finality Apex" },
    ]

    const platMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.8,
      metalness: 0.3,
    })

    platformData.forEach((p) => {
      const geo = new THREE.BoxGeometry(p.w, 0.8, p.d)
      const mesh = new THREE.Mesh(geo, platMat)
      mesh.position.set(p.x, p.y, p.z)
      mesh.receiveShadow = true
      scene.add(mesh)

      let runeMesh: THREE.Mesh | undefined
      if (p.rune) {
        const rGeo = new THREE.OctahedronGeometry(0.55, 0)
        const rMat = new THREE.MeshStandardMaterial({
          color: 0xfbbf24,
          emissive: 0xd97706,
          metalness: 0.9,
        })
        runeMesh = new THREE.Mesh(rGeo, rMat)
        runeMesh.position.set(p.x, p.y + 1.2, p.z)
        scene.add(runeMesh)
      }

      platforms.push({
        mesh,
        rune: runeMesh,
        hasRune: !!p.rune,
        moveSpeed: p.moveSpeed,
        initX: p.x,
        range: p.range || 0,
      })
    })

    gameStateRef.current = {
      scene,
      camera,
      renderer,
      player: playerGroup,
      platforms,
      runesCount: 0,
      health: 3,
      active: true,
      vx: 0,
      vz: 0,
      vy: 0,
      isGrounded: true,
      keys: {},
    }

    setRunesCollected(0)
    setHealth(3)
    setGameOver(false)
    setVictory(false)

    // Animation Loop
    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const state = gameStateRef.current
      if (!state.active || !state.player || !state.scene || !state.camera || !state.renderer) return

      const p = state.player.position

      // Handle Keys for planar movement
      const speed = 0.12
      if (state.keys["w"] || state.keys["ArrowUp"]) p.z -= speed
      if (state.keys["s"] || state.keys["ArrowDown"]) p.z += speed
      if (state.keys["a"] || state.keys["ArrowLeft"]) p.x -= speed
      if (state.keys["d"] || state.keys["ArrowRight"]) p.x += speed

      // Moving platforms update
      state.platforms.forEach((plat) => {
        if (plat.moveSpeed) {
          plat.mesh.position.x += plat.moveSpeed
          if (Math.abs(plat.mesh.position.x - plat.initX) > plat.range) {
            plat.moveSpeed = -plat.moveSpeed
          }
          if (plat.rune && plat.hasRune) {
            plat.rune.position.x = plat.mesh.position.x
          }
        }

        // Spin runes & check collection
        if (plat.rune && plat.hasRune) {
          plat.rune.rotation.y += 0.05
          if (p.distanceTo(plat.rune.position) < 1.3) {
            plat.hasRune = false
            state.scene!.remove(plat.rune)
            state.runesCount += 1
            setRunesCollected(state.runesCount)

            if (state.runesCount >= targetRunes) {
              state.active = false
              setVictory(true)
              setTimeout(() => onComplete(), 1500)
            }
          }
        }
      })

      // Vertical gravity & collision with platforms
      p.y += state.vy
      state.vy -= 0.015 // gravity

      let onPlatform = false
      state.platforms.forEach((plat) => {
        const pm = plat.mesh.position
        const halfW = 1.6
        const halfD = 1.6
        if (
          p.x >= pm.x - halfW &&
          p.x <= pm.x + halfW &&
          p.z >= pm.z - halfD &&
          p.z <= pm.z + halfD &&
          p.y >= pm.y + 0.3 &&
          p.y <= pm.y + 1.2
        ) {
          p.y = pm.y + 0.65
          state.vy = 0
          state.isGrounded = true
          onPlatform = true

          // Move player along with moving platform
          if (plat.moveSpeed) {
            p.x += plat.moveSpeed
          }
        }
      })

      if (!onPlatform && p.y > 0) {
        state.isGrounded = false
      }

      // Fell into the cosmic abyss!
      if (p.y < -12) {
        state.health -= 1
        setHealth(state.health)
        p.set(0, 2, 0)
        state.vy = 0

        if (state.health <= 0) {
          state.active = false
          setGameOver(true)
        }
      }

      // Camera follow
      state.camera.position.x += (p.x - state.camera.position.x) * 0.08
      state.camera.position.z += (p.z + 10 - state.camera.position.z) * 0.08
      state.camera.position.y += (p.y + 6 - state.camera.position.y) * 0.08

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

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      gameStateRef.current.keys[e.key.toLowerCase()] = true
      gameStateRef.current.keys[e.key] = true
      if ((e.key === " " || e.key === "Spacebar") && gameStateRef.current.isGrounded) {
        gameStateRef.current.vy = 0.32
        gameStateRef.current.isGrounded = false
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
    if (gameStateRef.current.isGrounded && gameStateRef.current.active) {
      gameStateRef.current.vy = 0.32
      gameStateRef.current.isGrounded = false
    }
  }

  const setDirKey = (key: string, val: boolean) => {
    gameStateRef.current.keys[key] = val
  }

  return (
    <div className="relative w-full h-[520px] md:h-[620px] bg-stone-950 rounded-2xl overflow-hidden border-2 border-glow-cyan/50 shadow-2xl flex flex-col select-none">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* HUD */}
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
          <span>{runesCollected} / {targetRunes} Finality Runes</span>
        </div>
      </div>

      {/* Mobile Touch Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-auto md:hidden">
        <div className="grid grid-cols-3 gap-1.5 w-32 h-32">
          <div />
          <button
            onTouchStart={() => setDirKey("ArrowUp", true)}
            onTouchEnd={() => setDirKey("ArrowUp", false)}
            className="bg-stone-800/90 border border-cyan-500/50 rounded-xl flex items-center justify-center text-white"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
          <div />
          <button
            onTouchStart={() => setDirKey("ArrowLeft", true)}
            onTouchEnd={() => setDirKey("ArrowLeft", false)}
            className="bg-stone-800/90 border border-cyan-500/50 rounded-xl flex items-center justify-center text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div />
          <button
            onTouchStart={() => setDirKey("ArrowRight", true)}
            onTouchEnd={() => setDirKey("ArrowRight", false)}
            className="bg-stone-800/90 border border-cyan-500/50 rounded-xl flex items-center justify-center text-white"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={jump}
          className="w-18 h-18 bg-cyan-600/90 active:bg-cyan-400 border-2 border-cyan-400 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg"
        >
          JUMP
        </button>
      </div>

      {/* Desktop helper */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 text-xs text-white/60 bg-stone-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 pointer-events-none">
        <span>WASD to move • Space to Jump across floating islands</span>
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 animate-fade-in text-center">
          <div className="text-6xl mb-3 animate-bounce">🌌</div>
          <h3 className="text-3xl font-bold text-red-400 font-[family-name:var(--font-cinzel-decorative)] mb-2">
            Fell Into Void
          </h3>
          <p className="text-white/70 text-sm max-w-xs mb-6">
            Time your jumps across moving sky platforms carefully.
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
            Finality Apex Reached!
          </h3>
          <p className="text-emerald-300 text-sm font-semibold mb-4">
            All 4 Sky Runes Gathered • 5-Second Finality Confirmed
          </p>
          <span className="text-xs text-white/60">Opening Quiz Arena...</span>
        </div>
      )}
    </div>
  )
}
