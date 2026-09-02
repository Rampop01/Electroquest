"use client"

import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { Shield, Zap, Heart, Trophy, RefreshCw, Crosshair } from "lucide-react"

interface ValidatorDefense3DProps {
  questId: string
  onComplete: () => void
}

export function ValidatorDefense3D({ questId, onComplete }: ValidatorDefense3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [destroyedCount, setDestroyedCount] = useState(0)
  const [shieldHealth, setShieldHealth] = useState(100)
  const [gameOver, setGameOver] = useState(false)
  const [victory, setVictory] = useState(false)
  const targetKills = 10

  const gameStateRef = useRef({
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    renderer: null as THREE.WebGLRenderer | null,
    turret: null as THREE.Group | null,
    enemies: [] as THREE.Mesh[],
    lasers: [] as THREE.Mesh[],
    particles: [] as THREE.Points[],
    destroyed: 0,
    health: 100,
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
    scene.background = new THREE.Color(0x060913)
    scene.fog = new THREE.FogExp2(0x060913, 0.03)

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
    camera.position.set(0, 16, 12)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Ambient & Center lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)

    const centerLight = new THREE.PointLight(0x06b6d4, 2.5, 30)
    centerLight.position.set(0, 4, 0)
    scene.add(centerLight)

    // Sanctuary Floor
    const floorGeo = new THREE.CylinderGeometry(14, 14, 0.8, 48)
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.7,
      metalness: 0.3,
    })
    const floor = new THREE.Mesh(floorGeo, floorMat)
    floor.position.y = -0.4
    scene.add(floor)

    // 5 Validator Nodes (Crystals in ring)
    const crystalGeo = new THREE.OctahedronGeometry(0.7, 0)
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x083344,
      metalness: 0.9,
    })
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2
      const crystal = new THREE.Mesh(crystalGeo, crystalMat)
      crystal.position.set(Math.cos(angle) * 3, 1, Math.sin(angle) * 3)
      scene.add(crystal)
    }

    // Central Sentry Gun
    const turretGroup = new THREE.Group()
    const baseGeo = new THREE.CylinderGeometry(1.2, 1.4, 0.6, 16)
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x334155 })
    const base = new THREE.Mesh(baseGeo, baseMat)
    turretGroup.add(base)

    const barrelGeo = new THREE.CylinderGeometry(0.2, 0.25, 1.6, 16)
    const barrelMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0369a1 })
    const barrel = new THREE.Mesh(barrelGeo, barrelMat)
    barrel.rotation.x = Math.PI / 2
    barrel.position.set(0, 1.2, 1.5)
    turretGroup.add(barrel)

    scene.add(turretGroup)

    gameStateRef.current = {
      scene,
      camera,
      renderer,
      turret: turretGroup,
      enemies: [],
      lasers: [],
      particles: [],
      destroyed: 0,
      health: 100,
      active: true,
    }

    setDestroyedCount(0)
    setShieldHealth(100)
    setGameOver(false)
    setVictory(false)

    // Enemy Spawner helper
    let lastSpawn = 0
    let animId: number

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate)
      const state = gameStateRef.current
      if (!state.active || !state.scene || !state.camera || !state.renderer) return

      // Spawn anomalies every 2.2s for gentle pacing
      if (time - lastSpawn > 2200 && state.enemies.length < 6) {
        lastSpawn = time
        const angle = Math.random() * Math.PI * 2
        const spawnRadius = 20
        const enemyGeo = new THREE.DodecahedronGeometry(0.9, 1)
        const enemyMat = new THREE.MeshStandardMaterial({
          color: 0xef4444,
          emissive: 0x991b1b,
          roughness: 0.3,
        })
        const enemy = new THREE.Mesh(enemyGeo, enemyMat)
        enemy.position.set(Math.cos(angle) * spawnRadius, 1.2, Math.sin(angle) * spawnRadius)
        state.scene.add(enemy)
        state.enemies.push(enemy)
      }

      // Move enemies gently toward center
      state.enemies.forEach((enemy, idx) => {
        const dir = new THREE.Vector3(0, 1.2, 0).sub(enemy.position).normalize()
        enemy.position.add(dir.multiplyScalar(0.026))
        enemy.rotation.x += 0.02
        enemy.rotation.y += 0.03

        // Breached shield!
        if (enemy.position.length() < 3.5) {
          state.scene!.remove(enemy)
          state.enemies.splice(idx, 1)
          state.health -= 25
          setShieldHealth(Math.max(0, state.health))

          if (state.health <= 0) {
            state.active = false
            setGameOver(true)
          }
        }
      })

      // Move lasers & detect collision with generous hitbox
      state.lasers.forEach((laser, lIdx) => {
        const speed = (laser.userData.dir as THREE.Vector3).clone().multiplyScalar(0.85)
        laser.position.add(speed)

        // Check collision with any enemy
        state.enemies.forEach((enemy, eIdx) => {
          if (laser.position.distanceTo(enemy.position) < 1.8) {
            // Hit enemy!
            state.scene!.remove(enemy)
            state.scene!.remove(laser)
            state.enemies.splice(eIdx, 1)
            state.lasers.splice(lIdx, 1)

            state.destroyed += 1
            setDestroyedCount(state.destroyed)

            // Check Victory
            if (state.destroyed >= targetKills) {
              state.active = false
              setVictory(true)
              setTimeout(() => onComplete(), 1500)
            }
          }
        })

        // Remove laser if out of bounds
        if (laser.position.length() > 25) {
          state.scene!.remove(laser)
          state.lasers.splice(lIdx, 1)
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

  // Fire laser towards target point in 3D
  const fireLaserAt = (clientX: number, clientY: number) => {
    const state = gameStateRef.current
    if (!state.active || !state.scene || !state.camera || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 2 - 1
    const y = -((clientY - rect.top) / rect.height) * 2 + 1

    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(new THREE.Vector2(x, y), state.camera)

    // Raycast against ground plane
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
    const targetPoint = new THREE.Vector3()
    raycaster.ray.intersectPlane(plane, targetPoint)

    if (targetPoint) {
      // Aim turret
      if (state.turret) {
        state.turret.lookAt(targetPoint.x, state.turret.position.y, targetPoint.z)
      }

      // Create laser beam
      const laserGeo = new THREE.SphereGeometry(0.3, 8, 8)
      const laserMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
      const laser = new THREE.Mesh(laserGeo, laserMat)
      laser.position.set(0, 1.5, 0)

      const dir = targetPoint.clone().sub(laser.position).normalize()
      laser.userData = { dir }

      state.scene.add(laser)
      state.lasers.push(laser)
    }
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    fireLaserAt(e.clientX, e.clientY)
  }

  return (
    <div className="relative w-full h-[520px] md:h-[620px] bg-stone-950 rounded-2xl overflow-hidden border-2 border-glow-cyan/50 shadow-2xl flex flex-col select-none">
      {/* 3D Canvas Viewport */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        className="w-full h-full cursor-crosshair active:scale-[0.999] transition-transform"
      />

      {/* Top Game HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none z-10">
        {/* IBFT Validator Barrier Health */}
        <div className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-cyan-500/30">
          <Shield className="w-5 h-5 text-cyan-400" />
          <span className="text-xs uppercase font-bold text-white/70">Barrier:</span>
          <span className={`font-mono font-bold ${shieldHealth <= 25 ? "text-red-400 animate-pulse" : "text-glow-cyan"}`}>
            {shieldHealth}%
          </span>
        </div>

        {/* Anomalies Destroyed Target */}
        <div className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-500/30 font-mono font-bold text-glow-amber">
          <Crosshair className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span>{destroyedCount} / {targetKills} Threat Neutralized</span>
        </div>
      </div>

      {/* Helper Footer */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-white/60 bg-stone-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 pointer-events-none">
        <Zap className="w-3.5 h-3.5 text-cyan-400" />
        <span>Tap / Click anywhere on 3D arena to fire lightning sentry bolts</span>
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 animate-fade-in text-center">
          <div className="text-6xl mb-3 animate-bounce">💥</div>
          <h3 className="text-3xl font-bold text-red-400 font-[family-name:var(--font-cinzel-decorative)] mb-2">
            Validator Shield Breached
          </h3>
          <p className="text-white/70 text-sm max-w-xs mb-6">
            Corrupted anomalies overwhelmed the IBFT consensus sentry.
          </p>
          <button
            onClick={() => initGame()}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-stone-950 font-bold rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" /> Re-engage Sentry
          </button>
        </div>
      )}

      {/* Victory Modal */}
      {victory && (
        <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 animate-fade-in text-center">
          <Trophy className="w-16 h-16 text-yellow-400 animate-bounce mb-3" />
          <h3 className="text-3xl font-black text-white font-[family-name:var(--font-cinzel-decorative)] mb-1">
            Validators Secured!
          </h3>
          <p className="text-emerald-300 text-sm font-semibold mb-4">
            12 Corrupt Anomalies Vaporized • Network Consensus Intact
          </p>
          <span className="text-xs text-white/60">Opening Quiz Arena...</span>
        </div>
      )}
    </div>
  )
}
