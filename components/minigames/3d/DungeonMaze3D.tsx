"use client"

import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { Trophy, Compass, Key, Heart, RefreshCw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react"

interface DungeonMaze3DProps {
  questId: string
  onComplete: () => void
}

interface Relic {
  id: number
  mesh: THREE.Mesh
  collected: boolean
  name: string
}

export function DungeonMaze3D({ questId, onComplete }: DungeonMaze3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [relicsCollected, setRelicsCollected] = useState(0)
  const [health, setHealth] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [victory, setVictory] = useState(false)
  const [portalUnlocked, setPortalUnlocked] = useState(false)

  const gameStateRef = useRef({
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    renderer: null as THREE.WebGLRenderer | null,
    player: null as THREE.Group | null,
    portal: null as THREE.Mesh | null,
    relics: [] as Relic[],
    guard: null as THREE.Mesh | null,
    guardAngle: 0,
    keys: {} as Record<string, boolean>,
    relicsCount: 0,
    health: 3,
    active: true,
  })

  const initGame = () => {
    if (!containerRef.current) return
    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Cleanup previous renderer
    if (gameStateRef.current.renderer) {
      if (container.contains(gameStateRef.current.renderer.domElement)) {
        container.removeChild(gameStateRef.current.renderer.domElement)
      }
      gameStateRef.current.renderer.dispose()
    }

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x080706)
    scene.fog = new THREE.FogExp2(0x080706, 0.03)

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000)
    camera.position.set(0, 15, 12)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const torch1 = new THREE.PointLight(0xfbbf24, 2, 20)
    torch1.position.set(-8, 4, -8)
    scene.add(torch1)

    const torch2 = new THREE.PointLight(0x06b6d4, 2, 20)
    torch2.position.set(8, 4, 8)
    scene.add(torch2)

    // Dungeon Floor
    const floorGeo = new THREE.PlaneGeometry(28, 28, 14, 14)
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      roughness: 0.85,
      metalness: 0.15,
    })
    const floor = new THREE.Mesh(floorGeo, floorMat)
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true
    scene.add(floor)

    // Outer Perimeter Walls
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x292524, roughness: 0.9 })
    const addWall = (x: number, z: number, w: number, d: number) => {
      const wallGeo = new THREE.BoxGeometry(w, 3, d)
      const wall = new THREE.Mesh(wallGeo, wallMat)
      wall.position.set(x, 1.5, z)
      wall.castShadow = true
      wall.receiveShadow = true
      scene.add(wall)
    }

    // Outer borders
    addWall(0, -14, 28, 1)
    addWall(0, 14, 28, 1)
    addWall(-14, 0, 1, 28)
    addWall(14, 0, 1, 28)

    // Interior labyrinth columns & obstacles
    addWall(-5, -5, 6, 2)
    addWall(5, 5, 6, 2)
    addWall(0, -2, 2, 8)
    addWall(-6, 6, 2, 6)
    addWall(6, -6, 2, 6)

    // Player Hero
    const playerGroup = new THREE.Group()
    const pBodyGeo = new THREE.CylinderGeometry(0.5, 0.6, 1.4, 16)
    const pBodyMat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x0891b2,
      metalness: 0.8,
    })
    const pBody = new THREE.Mesh(pBodyGeo, pBodyMat)
    pBody.position.y = 0.7
    playerGroup.add(pBody)

    const pLight = new THREE.PointLight(0x38bdf8, 2, 8)
    pLight.position.set(0, 1.2, 0)
    playerGroup.add(pLight)

    playerGroup.position.set(0, 0, 10)
    scene.add(playerGroup)

    // 3 Glowing Ancient Relics
    const relicPositions = [
      { x: -10, z: -10, name: "AnyTask Relic", color: 0xf59e0b },
      { x: 10, z: -10, name: "EVM Smart Relic", color: 0xa855f7 },
      { x: -10, z: 8, name: "Aurelius Crystal", color: 0x34d399 },
    ]

    const relics: Relic[] = relicPositions.map((pos, idx) => {
      const rGeo = new THREE.OctahedronGeometry(0.7, 0)
      const rMat = new THREE.MeshStandardMaterial({
        color: pos.color,
        emissive: pos.color,
        emissiveIntensity: 0.6,
        metalness: 0.9,
      })
      const mesh = new THREE.Mesh(rGeo, rMat)
      mesh.position.set(pos.x, 1, pos.z)
      scene.add(mesh)
      return { id: idx, mesh, collected: false, name: pos.name }
    })

    // Exit Portal (starts locked/dark, glows once all 3 relics found)
    const portalGeo = new THREE.TorusGeometry(1.6, 0.25, 16, 32)
    const portalMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      emissive: 0x0f172a,
    })
    const portal = new THREE.Mesh(portalGeo, portalMat)
    portal.position.set(10, 1.8, 10)
    portal.rotation.y = Math.PI / 4
    scene.add(portal)

    // Roaming Sentry Drone
    const guardGeo = new THREE.SphereGeometry(0.8, 16, 16)
    const guardMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0x991b1b,
    })
    const guard = new THREE.Mesh(guardGeo, guardMat)
    guard.position.set(0, 1, 0)
    scene.add(guard)

    gameStateRef.current = {
      scene,
      camera,
      renderer,
      player: playerGroup,
      portal,
      relics,
      guard,
      guardAngle: 0,
      keys: {},
      relicsCount: 0,
      health: 3,
      active: true,
    }

    setRelicsCollected(0)
    setHealth(3)
    setGameOver(false)
    setVictory(false)
    setPortalUnlocked(false)

    // Animation Loop
    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const state = gameStateRef.current
      if (!state.active || !state.player || !state.scene || !state.camera || !state.renderer) return

      // Handle Player WASD Movement
      const moveSpeed = 0.16
      const p = state.player.position

      if (state.keys["w"] || state.keys["ArrowUp"]) p.z = Math.max(-12, p.z - moveSpeed)
      if (state.keys["s"] || state.keys["ArrowDown"]) p.z = Math.min(12, p.z + moveSpeed)
      if (state.keys["a"] || state.keys["ArrowLeft"]) p.x = Math.max(-12, p.x - moveSpeed)
      if (state.keys["d"] || state.keys["ArrowRight"]) p.x = Math.min(12, p.x + moveSpeed)

      // Smooth Camera Follow
      state.camera.position.x += (p.x - state.camera.position.x) * 0.08
      state.camera.position.z += (p.z + 12 - state.camera.position.z) * 0.08

      // Rotate Relics & check collection with generous radius
      state.relics.forEach((relic) => {
        if (!relic.collected) {
          relic.mesh.rotation.y += 0.03
          relic.mesh.rotation.x += 0.015

          if (p.distanceTo(relic.mesh.position) < 1.8) {
            relic.collected = true
            state.scene!.remove(relic.mesh)
            state.relicsCount += 1
            setRelicsCollected(state.relicsCount)

            if (state.relicsCount === 3) {
              setPortalUnlocked(true)
              // Make portal glow
              if (state.portal) {
                ;(state.portal.material as THREE.MeshStandardMaterial).color.setHex(0xfbbf24)
                ;(state.portal.material as THREE.MeshStandardMaterial).emissive.setHex(0xd97706)
              }
            }
          }
        }
      })

      // Move Patrol Sentry in gentle, relaxed circular patrol
      if (state.guard) {
        state.guardAngle += 0.011
        state.guard.position.x = Math.cos(state.guardAngle) * 7
        state.guard.position.z = Math.sin(state.guardAngle) * 7

        // Check Guard Collision with player
        if (p.distanceTo(state.guard.position) < 1.3) {
          state.health -= 1
          setHealth(state.health)
          p.set(0, 0, 10) // Respawn player to starting spot

          if (state.health <= 0) {
            state.active = false
            setGameOver(true)
          }
        }
      }

      // Check Portal Escape Collision
      if (state.relicsCount === 3 && state.portal) {
        state.portal.rotation.z += 0.05
        if (p.distanceTo(state.portal.position) < 1.8) {
          state.active = false
          setVictory(true)
          setTimeout(() => onComplete(), 1500)
        }
      }

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

  // Touch controls helpers
  const handleTouchDir = (dir: string, isPressed: boolean) => {
    gameStateRef.current.keys[dir] = isPressed
  }

  return (
    <div className="relative w-full h-[520px] md:h-[620px] bg-stone-950 rounded-2xl overflow-hidden border-2 border-glow-amber/50 shadow-2xl flex flex-col select-none">
      {/* 3D Canvas Viewport */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Game HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none z-10">
        {/* Player Health */}
        <div className="flex items-center gap-1 bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-red-500/30">
          {[...Array(3)].map((_, i) => (
            <Heart
              key={i}
              className={`w-5 h-5 ${i < health ? "text-red-500 fill-red-500" : "text-stone-600"}`}
            />
          ))}
        </div>

        {/* Relics Collected Status */}
        <div className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-500/30 font-mono font-bold text-glow-amber">
          <Key className="w-4 h-4 text-amber-400" />
          <span>{relicsCollected} / 3 Relics Found</span>
        </div>
      </div>

      {/* Portal notification toast */}
      {portalUnlocked && !victory && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-amber-500/90 text-stone-950 px-4 py-1.5 rounded-full font-bold text-xs shadow-lg animate-bounce pointer-events-none z-10">
          ✨ Golden Portal Activated! Walk into it to escape!
        </div>
      )}

      {/* Mobile Touch D-Pad Controls */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-auto md:hidden grid grid-cols-3 gap-1.5 w-36 h-36">
        <div />
        <button
          onTouchStart={() => handleTouchDir("ArrowUp", true)}
          onTouchEnd={() => handleTouchDir("ArrowUp", false)}
          onMouseDown={() => handleTouchDir("ArrowUp", true)}
          onMouseUp={() => handleTouchDir("ArrowUp", false)}
          className="bg-stone-800/90 active:bg-amber-500/80 border border-amber-500/50 rounded-xl flex items-center justify-center text-white"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
        <div />
        <button
          onTouchStart={() => handleTouchDir("ArrowLeft", true)}
          onTouchEnd={() => handleTouchDir("ArrowLeft", false)}
          onMouseDown={() => handleTouchDir("ArrowLeft", true)}
          onMouseUp={() => handleTouchDir("ArrowLeft", false)}
          className="bg-stone-800/90 active:bg-amber-500/80 border border-amber-500/50 rounded-xl flex items-center justify-center text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          onTouchStart={() => handleTouchDir("ArrowDown", true)}
          onTouchEnd={() => handleTouchDir("ArrowDown", false)}
          onMouseDown={() => handleTouchDir("ArrowDown", true)}
          onMouseUp={() => handleTouchDir("ArrowDown", false)}
          className="bg-stone-800/90 active:bg-amber-500/80 border border-amber-500/50 rounded-xl flex items-center justify-center text-white"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
        <button
          onTouchStart={() => handleTouchDir("ArrowRight", true)}
          onTouchEnd={() => handleTouchDir("ArrowRight", false)}
          onMouseDown={() => handleTouchDir("ArrowRight", true)}
          onMouseUp={() => handleTouchDir("ArrowRight", false)}
          className="bg-stone-800/90 active:bg-amber-500/80 border border-amber-500/50 rounded-xl flex items-center justify-center text-white"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop Helper */}
      <div className="absolute bottom-4 right-4 hidden md:flex items-center gap-2 text-xs text-white/50 bg-stone-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 pointer-events-none">
        <Compass className="w-3.5 h-3.5 text-amber-400" />
        <span>Use WASD or Arrow keys to explore & dodge the red sentry</span>
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 animate-fade-in text-center">
          <div className="text-6xl mb-3 animate-bounce">💀</div>
          <h3 className="text-3xl font-bold text-red-400 font-[family-name:var(--font-cinzel-decorative)] mb-2">
            Captured by Sentry
          </h3>
          <p className="text-white/70 text-sm max-w-xs mb-6">
            The patrol drone caught you in the labyrinth.
          </p>
          <button
            onClick={() => initGame()}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" /> Re-enter Labyrinth
          </button>
        </div>
      )}

      {/* Victory Modal */}
      {victory && (
        <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 animate-fade-in text-center">
          <Trophy className="w-16 h-16 text-yellow-400 animate-bounce mb-3" />
          <h3 className="text-3xl font-black text-white font-[family-name:var(--font-cinzel-decorative)] mb-1">
            Labyrinth Conquered!
          </h3>
          <p className="text-emerald-300 text-sm font-semibold mb-4">
            All 3 Relics Gathered • Portal Unlocked
          </p>
          <span className="text-xs text-white/60">Opening Quiz Arena...</span>
        </div>
      )}
    </div>
  )
}
