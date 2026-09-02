"use client"

import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { Sun, Leaf, Trophy, RefreshCw, CheckCircle2 } from "lucide-react"

interface EcoValidatorSolar3DProps {
  questId: string
  onComplete: () => void
}

interface PrismNode {
  id: number
  mesh: THREE.Mesh
  targetAngle: number
  currentAngle: number
}

export function EcoValidatorSolar3D({ questId, onComplete }: EcoValidatorSolar3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [alignedCount, setAlignedCount] = useState(0)
  const [victory, setVictory] = useState(false)

  const gameStateRef = useRef({
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    renderer: null as THREE.WebGLRenderer | null,
    prisms: [] as PrismNode[],
    laserLine: null as THREE.Line | null,
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
    scene.background = new THREE.Color(0x040d08)
    scene.fog = new THREE.FogExp2(0x040d08, 0.02)

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000)
    camera.position.set(0, 14, 14)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const sun = new THREE.DirectionalLight(0x4ade80, 1.5)
    sun.position.set(5, 12, 10)
    scene.add(sun)

    // Temple Sandstone Floor
    const floorGeo = new THREE.CylinderGeometry(14, 14, 1, 32)
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x14532d,
      roughness: 0.8,
      metalness: 0.2,
    })
    const floor = new THREE.Mesh(floorGeo, floorMat)
    floor.position.y = -0.5
    scene.add(floor)

    // Solar Beam Emitter (Left)
    const emitterGeo = new THREE.ConeGeometry(1, 2, 16)
    const emitterMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      emissive: 0xca8a04,
    })
    const emitter = new THREE.Mesh(emitterGeo, emitterMat)
    emitter.rotation.z = -Math.PI / 2
    emitter.position.set(-8, 1, 0)
    scene.add(emitter)

    // Eco-Crystal Target (Right)
    const crystalGeo = new THREE.OctahedronGeometry(1.6, 0)
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x4ade80,
      emissive: 0x16a34a,
      metalness: 0.9,
    })
    const crystal = new THREE.Mesh(crystalGeo, crystalMat)
    crystal.position.set(8, 1.5, 0)
    scene.add(crystal)

    // 3 Triangular Prisms
    const prismGeo = new THREE.CylinderGeometry(0.8, 0.8, 1.8, 3)
    const prismMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0369a1,
      metalness: 0.8,
      roughness: 0.1,
    })

    const prismConfigs = [
      { id: 1, x: -4, z: -3, targetAngle: 0 },
      { id: 2, x: 0, z: 3, targetAngle: 1 },
      { id: 3, x: 4, z: -2, targetAngle: 2 },
    ]

    const prisms: PrismNode[] = prismConfigs.map((p) => {
      const mesh = new THREE.Mesh(prismGeo, prismMat)
      mesh.position.set(p.x, 1, p.z)
      scene.add(mesh)
      return {
        id: p.id,
        mesh,
        targetAngle: p.targetAngle,
        currentAngle: (p.targetAngle + 2) % 4, // Starts unaligned
      }
    })

    // Green Laser Beam Path
    const points = [
      new THREE.Vector3(-8, 1, 0),
      new THREE.Vector3(-4, 1, -3),
      new THREE.Vector3(0, 1, 3),
      new THREE.Vector3(4, 1, -2),
      new THREE.Vector3(8, 1.5, 0),
    ]
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points)
    const lineMat = new THREE.LineBasicMaterial({ color: 0x22c55e, linewidth: 3 })
    const laserLine = new THREE.Line(lineGeo, lineMat)
    laserLine.visible = false
    scene.add(laserLine)

    gameStateRef.current = {
      scene,
      camera,
      renderer,
      prisms,
      laserLine,
      active: true,
    }

    setAlignedCount(0)
    setVictory(false)

    // Animation Loop
    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const state = gameStateRef.current
      if (!state.active || !state.scene || !state.camera || !state.renderer) return

      crystal.rotation.y += 0.03
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

  const rotatePrism = (id: number) => {
    const state = gameStateRef.current
    if (!state.active) return

    const prism = state.prisms.find((p) => p.id === id)
    if (prism) {
      prism.currentAngle = (prism.currentAngle + 1) % 4
      prism.mesh.rotation.y = prism.currentAngle * (Math.PI / 2)

      // Count aligned
      const totalAligned = state.prisms.filter((p) => p.currentAngle === p.targetAngle).length
      setAlignedCount(totalAligned)

      if (totalAligned === 3) {
        if (state.laserLine) state.laserLine.visible = true
        state.active = false
        setVictory(true)
        setTimeout(() => onComplete(), 1500)
      }
    }
  }

  return (
    <div className="relative w-full h-[520px] md:h-[620px] bg-stone-950 rounded-2xl overflow-hidden border-2 border-emerald-500/50 shadow-2xl flex flex-col select-none">
      <div ref={containerRef} className="w-full h-full cursor-pointer" />

      {/* Top HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none z-10">
        <div className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-500/30">
          <Leaf className="w-5 h-5 text-emerald-400" />
          <span className="text-xs uppercase font-bold text-white/70">Zero-Carbon IBFT Consensus</span>
        </div>

        <div className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-500/30 font-mono font-bold text-glow-amber">
          <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span>{alignedCount} / 3 Prisms Aligned</span>
        </div>
      </div>

      {/* Prism Tap Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3 z-10 pointer-events-auto">
        {gameStateRef.current.prisms.map((prism) => (
          <button
            key={prism.id}
            onClick={() => rotatePrism(prism.id)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
              prism.currentAngle === prism.targetAngle
                ? "bg-emerald-950/90 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                : "bg-stone-900/90 border-cyan-500/40 text-cyan-300 hover:border-cyan-300"
            }`}
          >
            {prism.currentAngle === prism.targetAngle ? "✓ Prism " + prism.id + " Aligned" : "↻ Rotate Prism " + prism.id}
          </button>
        ))}
      </div>

      {/* Victory Modal */}
      {victory && (
        <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 animate-fade-in text-center">
          <Trophy className="w-16 h-16 text-yellow-400 animate-bounce mb-3" />
          <h3 className="text-3xl font-black text-white font-[family-name:var(--font-cinzel-decorative)] mb-1">
            Zero-Carbon Core Charged!
          </h3>
          <p className="text-emerald-300 text-sm font-semibold mb-4">
            Solar Photons Channeled • Eco-Friendly IBFT Verified
          </p>
          <span className="text-xs text-white/60">Opening Quiz Arena...</span>
        </div>
      )}
    </div>
  )
}
