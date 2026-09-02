"use client"

import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { Trophy, Zap, Heart, ArrowLeft, ArrowRight, ArrowUp, RefreshCw } from "lucide-react"

interface TempleRunner3DProps {
  questId: string
  onComplete: () => void
}

export function TempleRunner3D({ questId, onComplete }: TempleRunner3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [score, setScore] = useState(0)
  const [health, setHealth] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [victory, setVictory] = useState(false)
  const targetScore = 50 // Need 50 ETN energy points to clear the trial

  const gameStateRef = useRef({
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    renderer: null as THREE.WebGLRenderer | null,
    player: null as THREE.Group | null,
    coins: [] as THREE.Mesh[],
    obstacles: [] as THREE.Mesh[],
    playerLane: 0, // -1 (Left), 0 (Center), 1 (Right)
    isJumping: false,
    jumpVelocity: 0,
    speed: 0.6,
    distance: 0,
    score: 0,
    health: 3,
    active: true,
  })

  // Start / restart the 3D world
  const initGame = () => {
    if (!containerRef.current) return
    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Cleanup previous instance if any
    if (gameStateRef.current.renderer) {
      if (container.contains(gameStateRef.current.renderer.domElement)) {
        container.removeChild(gameStateRef.current.renderer.domElement)
      }
      gameStateRef.current.renderer.dispose()
    }

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0908)
    scene.fog = new THREE.FogExp2(0x0a0908, 0.02)

    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000)
    camera.position.set(0, 3.5, 7)
    camera.lookAt(0, 1.5, -5)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xfbbf24, 1.2)
    dirLight.position.set(5, 12, 10)
    dirLight.castShadow = true
    scene.add(dirLight)

    const playerLight = new THREE.PointLight(0x06b6d4, 2, 8)
    playerLight.position.set(0, 2, 0)
    scene.add(playerLight)

    // Temple Floor Runway
    const floorGeo = new THREE.PlaneGeometry(12, 400, 10, 100)
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      roughness: 0.8,
      metalness: 0.2,
    })
    const floor = new THREE.Mesh(floorGeo, floorMat)
    floor.rotation.x = -Math.PI / 2
    floor.position.z = -150
    floor.receiveShadow = true
    scene.add(floor)

    // Floor Glowing Grid Lines
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b })
    for (const laneX of [-2, 0, 2]) {
      const lineGeo = new THREE.PlaneGeometry(0.1, 400)
      const line = new THREE.Mesh(lineGeo, lineMat)
      line.rotation.x = -Math.PI / 2
      line.position.set(laneX, 0.01, -150)
      scene.add(line)
    }

    // Temple Wall Pillars
    for (let z = -300; z <= 20; z += 15) {
      for (const side of [-5.5, 5.5]) {
        const pillarGeo = new THREE.CylinderGeometry(0.5, 0.6, 8, 8)
        const pillarMat = new THREE.MeshStandardMaterial({ color: 0x292524 })
        const pillar = new THREE.Mesh(pillarGeo, pillarMat)
        pillar.position.set(side, 4, z)
        scene.add(pillar)

        // Torch on pillar
        const torchLight = new THREE.PointLight(0xf59e0b, 1.2, 12)
        torchLight.position.set(side * 0.85, 4.5, z)
        scene.add(torchLight)
      }
    }

    // Hero Character (Glowing Elemental Knight)
    const playerGroup = new THREE.Group()

    // Body
    const bodyGeo = new THREE.BoxGeometry(0.8, 1.2, 0.6)
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x083344,
      metalness: 0.8,
      roughness: 0.2,
    })
    const body = new THREE.Mesh(bodyGeo, bodyMat)
    body.position.y = 1
    body.castShadow = true
    playerGroup.add(body)

    // Head with visor
    const headGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    const headMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0x78350f })
    const head = new THREE.Mesh(headGeo, headMat)
    head.position.y = 1.85
    playerGroup.add(head)

    // Energy Core Aura
    const coreGeo = new THREE.SphereGeometry(0.25, 16, 16)
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee })
    const core = new THREE.Mesh(coreGeo, coreMat)
    core.position.set(0, 1, 0.32)
    playerGroup.add(core)

    scene.add(playerGroup)

    // Spawning Initial Coins & Obstacles
    const coins: THREE.Mesh[] = []
    const obstacles: THREE.Mesh[] = []
    const lanePositions = [-2, 0, 2]

    for (let z = -20; z >= -350; z -= 12) {
      const lane = lanePositions[Math.floor(Math.random() * lanePositions.length)]
      const isObstacle = Math.random() > 0.45

      if (isObstacle) {
        // Red spike hazard or stone barrier
        const obsGeo = new THREE.BoxGeometry(1.4, 1.4, 0.8)
        const obsMat = new THREE.MeshStandardMaterial({
          color: 0xd97706,
          emissive: 0x7f1d1d,
          roughness: 0.5,
        })
        const obs = new THREE.Mesh(obsGeo, obsMat)
        obs.position.set(lane, 0.7, z)
        obs.castShadow = true
        scene.add(obs)
        obstacles.push(obs)
      } else {
        // Glowing ETN coin
        const coinGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.12, 16)
        const coinMat = new THREE.MeshStandardMaterial({
          color: 0xfbbf24,
          emissive: 0xd97706,
          metalness: 0.9,
          roughness: 0.1,
        })
        const coin = new THREE.Mesh(coinGeo, coinMat)
        coin.rotation.x = Math.PI / 2
        coin.position.set(lane, 1.2, z)
        scene.add(coin)
        coins.push(coin)
      }
    }

    gameStateRef.current = {
      scene,
      camera,
      renderer,
      player: playerGroup,
      coins,
      obstacles,
      playerLane: 0,
      isJumping: false,
      jumpVelocity: 0,
      speed: 0.65,
      distance: 0,
      score: 0,
      health: 3,
      active: true,
    }

    setScore(0)
    setHealth(3)
    setGameOver(false)
    setVictory(false)

    // Animation Loop
    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const state = gameStateRef.current
      if (!state.active || !state.player || !state.scene || !state.camera || !state.renderer) return

      // Smooth lane movement
      const targetX = state.playerLane * 2
      state.player.position.x += (targetX - state.player.position.x) * 0.18
      playerLight.position.x = state.player.position.x

      // Jump Physics
      if (state.isJumping) {
        state.player.position.y += state.jumpVelocity
        state.jumpVelocity -= 0.035
        if (state.player.position.y <= 0) {
          state.player.position.y = 0
          state.isJumping = false
        }
      }

      // Move coins & obstacles toward player
      state.coins.forEach((coin) => {
        coin.position.z += state.speed
        coin.rotation.z += 0.05 // Spin coin

        // Coin Collision check
        const pPos = state.player!.position
        if (
          Math.abs(coin.position.z - pPos.z) < 1.0 &&
          Math.abs(coin.position.x - pPos.x) < 0.9 &&
          pPos.y < 1.5
        ) {
          // Collected coin!
          coin.position.z = -300 - Math.random() * 50
          coin.position.x = lanePositions[Math.floor(Math.random() * lanePositions.length)]
          state.score += 5
          setScore(state.score)

          // Check Victory
          if (state.score >= targetScore) {
            state.active = false
            setVictory(true)
            setTimeout(() => onComplete(), 1500)
          }
        } else if (coin.position.z > 10) {
          // Recycle coin ahead
          coin.position.z = -300 - Math.random() * 50
          coin.position.x = lanePositions[Math.floor(Math.random() * lanePositions.length)]
        }
      })

      state.obstacles.forEach((obs) => {
        obs.position.z += state.speed

        // Obstacle Collision check
        const pPos = state.player!.position
        if (
          Math.abs(obs.position.z - pPos.z) < 0.9 &&
          Math.abs(obs.position.x - pPos.x) < 0.8 &&
          pPos.y < 1.0
        ) {
          // Hit hazard!
          obs.position.z = -300 - Math.random() * 50
          state.health -= 1
          setHealth(state.health)

          if (state.health <= 0) {
            state.active = false
            setGameOver(true)
          }
        } else if (obs.position.z > 10) {
          // Recycle obstacle
          obs.position.z = -300 - Math.random() * 50
          obs.position.x = lanePositions[Math.floor(Math.random() * lanePositions.length)]
        }
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

  // Desktop Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStateRef.current.active) return
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        gameStateRef.current.playerLane = Math.max(-1, gameStateRef.current.playerLane - 1)
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        gameStateRef.current.playerLane = Math.min(1, gameStateRef.current.playerLane + 1)
      } else if ((e.key === "ArrowUp" || e.key === " " || e.key === "w" || e.key === "W") && !gameStateRef.current.isJumping) {
        gameStateRef.current.isJumping = true
        gameStateRef.current.jumpVelocity = 0.45
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Mobile Touch actions
  const moveLeft = () => {
    if (!gameStateRef.current.active) return
    gameStateRef.current.playerLane = Math.max(-1, gameStateRef.current.playerLane - 1)
  }

  const moveRight = () => {
    if (!gameStateRef.current.active) return
    gameStateRef.current.playerLane = Math.min(1, gameStateRef.current.playerLane + 1)
  }

  const jump = () => {
    if (!gameStateRef.current.active || gameStateRef.current.isJumping) return
    gameStateRef.current.isJumping = true
    gameStateRef.current.jumpVelocity = 0.45
  }

  return (
    <div className="relative w-full h-[520px] md:h-[620px] bg-stone-950 rounded-2xl overflow-hidden border-2 border-glow-amber/50 shadow-2xl flex flex-col select-none">
      {/* 3D Canvas Viewport */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Game HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none z-10">
        {/* Health */}
        <div className="flex items-center gap-1 bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-red-500/30">
          {[...Array(3)].map((_, i) => (
            <Heart
              key={i}
              className={`w-5 h-5 ${i < health ? "text-red-500 fill-red-500" : "text-stone-600"}`}
            />
          ))}
        </div>

        {/* ETN Energy Collected / Goal */}
        <div className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-500/30 font-mono font-bold text-glow-amber">
          <Zap className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
          <span>{score} / {targetScore} ETN</span>
        </div>
      </div>

      {/* Mobile Touch Controls Overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-auto md:hidden">
        <div className="flex gap-2">
          <button
            onClick={moveLeft}
            className="w-14 h-14 bg-stone-800/90 active:bg-amber-500/80 border-2 border-amber-500/50 rounded-xl flex items-center justify-center text-white shadow-lg touch-manipulation"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <button
            onClick={moveRight}
            className="w-14 h-14 bg-stone-800/90 active:bg-amber-500/80 border-2 border-amber-500/50 rounded-xl flex items-center justify-center text-white shadow-lg touch-manipulation"
          >
            <ArrowRight className="w-7 h-7" />
          </button>
        </div>

        <button
          onClick={jump}
          className="w-16 h-14 bg-cyan-600/90 active:bg-cyan-400/90 border-2 border-cyan-400 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg touch-manipulation"
        >
          <ArrowUp className="w-7 h-7" />
        </button>
      </div>

      {/* Desktop Key Helper */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 text-xs text-white/50 bg-stone-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 pointer-events-none">
        <span>Controls:</span>
        <kbd className="px-2 py-0.5 bg-stone-800 rounded border border-white/20">A / ←</kbd>
        <kbd className="px-2 py-0.5 bg-stone-800 rounded border border-white/20">D / →</kbd>
        <kbd className="px-2 py-0.5 bg-stone-800 rounded border border-white/20">Space (Jump)</kbd>
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 animate-fade-in">
          <div className="text-6xl mb-3 animate-bounce">💀</div>
          <h3 className="text-3xl font-bold text-red-400 font-[family-name:var(--font-cinzel-decorative)] mb-2">
            Temple Trial Failed
          </h3>
          <p className="text-white/70 text-sm max-w-xs text-center mb-6">
            You were struck by ancient hazards before gathering 50 ETN energy.
          </p>
          <button
            onClick={() => initGame()}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
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
            Corridor Conquered!
          </h3>
          <p className="text-emerald-300 text-sm font-semibold mb-4">
            50 ETN Energy Collected • Temple Portal Activated
          </p>
          <span className="text-xs text-white/60">Opening Quiz Arena...</span>
        </div>
      )}
    </div>
  )
}
