"use client"

import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { Trophy, Layers, RefreshCw, Award } from "lucide-react"

interface EVMStackCubes3DProps {
  questId: string
  onComplete: () => void
}

interface StackCube {
  mesh: THREE.Mesh
  width: number
  depth: number
  x: number
  z: number
  y: number
}

const OPCODES = ["PUSH32", "MSTORE", "CALLVALUE", "CALL", "RETURN"]

export function EVMStackCubes3D({ questId, onComplete }: EVMStackCubes3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [stackedCount, setStackedCount] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [victory, setVictory] = useState(false)
  const targetStack = 5

  const gameStateRef = useRef({
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    renderer: null as THREE.WebGLRenderer | null,
    stack: [] as StackCube[],
    currentBlock: null as THREE.Mesh | null,
    swingAngle: 0,
    swingSpeed: 0.045,
    stackIndex: 0,
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
    scene.background = new THREE.Color(0x0a0c10)
    scene.fog = new THREE.FogExp2(0x0a0c10, 0.03)

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
    camera.position.set(8, 9, 8)
    camera.lookAt(0, 3, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0x06b6d4, 1.2)
    dirLight.position.set(6, 15, 6)
    dirLight.castShadow = true
    scene.add(dirLight)

    // Base Pedestal
    const baseGeo = new THREE.BoxGeometry(4, 1.5, 4)
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.2,
    })
    const baseMesh = new THREE.Mesh(baseGeo, baseMat)
    baseMesh.position.y = 0.75
    scene.add(baseMesh)

    const initialStack: StackCube[] = [
      { mesh: baseMesh, width: 4, depth: 4, x: 0, z: 0, y: 0.75 },
    ]

    // Create the first moving block
    const blockGeo = new THREE.BoxGeometry(3.5, 1, 3.5)
    const blockMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      emissive: 0xd97706,
      metalness: 0.9,
    })
    const firstBlock = new THREE.Mesh(blockGeo, blockMat)
    firstBlock.position.set(0, 2, 0)
    scene.add(firstBlock)

    gameStateRef.current = {
      scene,
      camera,
      renderer,
      stack: initialStack,
      currentBlock: firstBlock,
      swingAngle: 0,
      swingSpeed: 0.045,
      stackIndex: 0,
      active: true,
    }

    setStackedCount(0)
    setGameOver(false)
    setVictory(false)

    // Animation Loop
    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const state = gameStateRef.current
      if (!state.active || !state.scene || !state.camera || !state.renderer) return

      // Swing current block left and right along X axis
      if (state.currentBlock) {
        state.swingAngle += state.swingSpeed
        state.currentBlock.position.x = Math.sin(state.swingAngle) * 3.8
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

  // Drop block action
  const dropBlock = () => {
    const state = gameStateRef.current
    if (!state.active || !state.currentBlock || !state.scene || !state.camera) return

    const prev = state.stack[state.stack.length - 1]
    const curX = state.currentBlock.position.x
    const diff = Math.abs(curX - prev.x)

    // If offset is too large -> tower topples!
    if (diff > prev.width * 0.75) {
      state.active = false
      setGameOver(true)
      return
    }

    // Successfully stacked!
    const newWidth = Math.max(1, prev.width - diff * 0.4)
    const newY = prev.y + 1.0

    state.stack.push({
      mesh: state.currentBlock,
      width: newWidth,
      depth: prev.depth,
      x: curX,
      z: 0,
      y: newY,
    })

    const newCount = state.stack.length - 1
    setStackedCount(newCount)

    // Smoothly pan camera upwards as tower grows
    state.camera.position.y += 1.0
    state.camera.lookAt(0, newY, 0)

    // Check Victory
    if (newCount >= targetStack) {
      state.active = false
      setVictory(true)
      setTimeout(() => onComplete(), 1500)
      return
    }

    // Spawn next moving block
    const colors = [0x06b6d4, 0x3b82f6, 0xa855f7, 0x10b981, 0xf59e0b]
    const nextColor = colors[newCount % colors.length]

    const nextGeo = new THREE.BoxGeometry(newWidth, 1, prev.depth)
    const nextMat = new THREE.MeshStandardMaterial({
      color: nextColor,
      emissive: nextColor,
      emissiveIntensity: 0.3,
      metalness: 0.8,
    })
    const nextBlock = new THREE.Mesh(nextGeo, nextMat)
    nextBlock.position.set(0, newY + 1.0, 0)
    state.scene.add(nextBlock)
    state.currentBlock = nextBlock
    state.swingAngle = 0
    state.swingSpeed += 0.008 // Gradually increases difficulty
  }

  return (
    <div
      onClick={dropBlock}
      className="relative w-full h-[520px] md:h-[620px] bg-stone-950 rounded-2xl overflow-hidden border-2 border-glow-amber/50 shadow-2xl flex flex-col select-none cursor-pointer"
    >
      <div ref={containerRef} className="w-full h-full" />

      {/* Top Game HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none z-10">
        <div className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-cyan-500/30 font-mono font-bold text-glow-cyan">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Opcode: {OPCODES[stackedCount] || "BYTECODE_DEPLOYED"}</span>
        </div>

        <div className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-500/30 font-mono font-bold text-glow-amber">
          <span>{stackedCount} / {targetStack} Cubes Stacked</span>
        </div>
      </div>

      {/* Helper Footer */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-white/60 bg-stone-900/80 backdrop-blur-md px-5 py-2 rounded-full border border-white/10 pointer-events-none">
        <span>⚡ Tap or Click with timing to drop & stack EVM opcode blocks</span>
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 animate-fade-in text-center">
          <div className="text-6xl mb-3 animate-bounce">💥</div>
          <h3 className="text-3xl font-bold text-red-400 font-[family-name:var(--font-cinzel-decorative)] mb-2">
            Tower Toppled!
          </h3>
          <p className="text-white/70 text-sm max-w-xs mb-6">
            EVM stack misaligned. Time your block drops precisely over the base.
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation()
              initGame()
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" /> Re-stack Contract
          </button>
        </div>
      )}

      {/* Victory Modal */}
      {victory && (
        <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 animate-fade-in text-center">
          <Trophy className="w-16 h-16 text-yellow-400 animate-bounce mb-3" />
          <h3 className="text-3xl font-black text-white font-[family-name:var(--font-cinzel-decorative)] mb-1">
            EVM Stack Completed!
          </h3>
          <p className="text-emerald-300 text-sm font-semibold mb-4">
            5 Opcode Cubes Compiled • Smart Contract Active
          </p>
          <span className="text-xs text-white/60">Opening Quiz Arena...</span>
        </div>
      )}
    </div>
  )
}
