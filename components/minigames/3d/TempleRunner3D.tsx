"use client"

import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { Trophy, Zap, Heart, ArrowLeft, ArrowRight, ArrowUp, RefreshCw } from "lucide-react"

interface TempleRunner3DProps {
  questId: string
  onComplete: () => void
  isPaused?: boolean
}

export function TempleRunner3D({ questId, onComplete, isPaused = false }: TempleRunner3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [score, setScore] = useState(0)
  const [health, setHealth] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [victory, setVictory] = useState(false)
  const targetScore = 20 // Collect 20 Energy Balls to win 2 ETN

  const isPausedRef = useRef(isPaused)
  useEffect(() => {
    isPausedRef.current = isPaused
  }, [isPaused])

  const gameStateRef = useRef({
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    renderer: null as THREE.WebGLRenderer | null,
    player: null as THREE.Group | null,
    limbs: {
      leftArm: null as THREE.Group | null,
      rightArm: null as THREE.Group | null,
      leftLeg: null as THREE.Group | null,
      rightLeg: null as THREE.Group | null,
      body: null as THREE.Group | null,
    },
    coins: [] as THREE.Mesh[],
    obstacles: [] as THREE.Mesh[],
    dustParticles: [] as THREE.Mesh[],
    playerLane: 0, // -1 (Left), 0 (Center), 1 (Right)
    isJumping: false,
    jumpVelocity: 0,
    runCycle: 0,
    speed: 0.28,
    score: 0,
    health: 3,
    active: true,
  })

  // Build high-detail humanoid runner
  const createHumanoidCharacter = () => {
    const playerGroup = new THREE.Group()
    const bodyContainer = new THREE.Group()
    playerGroup.add(bodyContainer)

    // Materials
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xd4a373,
      roughness: 0.7,
      metalness: 0.1,
    })
    const armorMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a, // dark obsidian titanium armor
      roughness: 0.3,
      metalness: 0.8,
    })
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0x78350f,
      roughness: 0.2,
      metalness: 0.9,
    })
    const energyCyanMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 })

    // 1. Torso & Chest Armor
    const chestGeo = new THREE.BoxGeometry(0.7, 0.75, 0.45)
    const chest = new THREE.Mesh(chestGeo, armorMat)
    chest.position.y = 1.35
    chest.castShadow = true
    bodyContainer.add(chest)

    // Gold Chestplate Emblem
    const crestGeo = new THREE.BoxGeometry(0.4, 0.4, 0.08)
    const crest = new THREE.Mesh(crestGeo, goldMat)
    crest.position.set(0, 1.38, 0.23)
    bodyContainer.add(crest)

    // Glowing Core in Center of Chest
    const coreGeo = new THREE.SphereGeometry(0.12, 16, 16)
    const core = new THREE.Mesh(coreGeo, energyCyanMat)
    core.position.set(0, 1.38, 0.28)
    bodyContainer.add(core)

    // Abdomen / Belt
    const waistGeo = new THREE.BoxGeometry(0.58, 0.3, 0.4)
    const waist = new THREE.Mesh(waistGeo, goldMat)
    waist.position.y = 0.92
    bodyContainer.add(waist)

    // 2. Head & Helmet
    const headGroup = new THREE.Group()
    headGroup.position.set(0, 1.9, 0)

    const faceGeo = new THREE.SphereGeometry(0.24, 16, 16)
    const face = new THREE.Mesh(faceGeo, skinMat)
    headGroup.add(face)

    // Helmet Crest & Crown
    const helmetGeo = new THREE.BoxGeometry(0.52, 0.35, 0.52)
    const helmet = new THREE.Mesh(helmetGeo, armorMat)
    helmet.position.set(0, 0.12, -0.02)
    headGroup.add(helmet)

    const helmetFinGeo = new THREE.BoxGeometry(0.08, 0.25, 0.45)
    const helmetFin = new THREE.Mesh(helmetFinGeo, goldMat)
    helmetFin.position.set(0, 0.32, -0.05)
    headGroup.add(helmetFin)

    // Glowing Cyan Visor
    const visorGeo = new THREE.BoxGeometry(0.38, 0.1, 0.12)
    const visor = new THREE.Mesh(visorGeo, energyCyanMat)
    visor.position.set(0, 0.04, 0.2)
    headGroup.add(visor)

    bodyContainer.add(headGroup)

    // 3. Shoulders & Arms
    // Left Arm
    const leftArmPivot = new THREE.Group()
    leftArmPivot.position.set(-0.48, 1.6, 0)

    const shoulderPadL = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), goldMat)
    shoulderPadL.position.set(0, 0, 0)
    leftArmPivot.add(shoulderPadL)

    const armUpperL = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.4, 8), armorMat)
    armUpperL.position.set(0, -0.22, 0)
    leftArmPivot.add(armUpperL)

    const armLowerL = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.35, 8), skinMat)
    armLowerL.position.set(0, -0.55, 0.08)
    armLowerL.rotation.x = -0.4
    leftArmPivot.add(armLowerL)

    const fistL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.14), goldMat)
    fistL.position.set(0, -0.72, 0.18)
    leftArmPivot.add(fistL)

    bodyContainer.add(leftArmPivot)

    // Right Arm
    const rightArmPivot = new THREE.Group()
    rightArmPivot.position.set(0.48, 1.6, 0)

    const shoulderPadR = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), goldMat)
    shoulderPadR.position.set(0, 0, 0)
    rightArmPivot.add(shoulderPadR)

    const armUpperR = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.4, 8), armorMat)
    armUpperR.position.set(0, -0.22, 0)
    rightArmPivot.add(armUpperR)

    const armLowerR = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.35, 8), skinMat)
    armLowerR.position.set(0, -0.55, 0.08)
    armLowerR.rotation.x = -0.4
    rightArmPivot.add(armLowerR)

    const fistR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.14), goldMat)
    fistR.position.set(0, -0.72, 0.18)
    rightArmPivot.add(fistR)

    bodyContainer.add(rightArmPivot)

    // 4. Hips & Legs
    // Left Leg
    const leftLegPivot = new THREE.Group()
    leftLegPivot.position.set(-0.2, 0.8, 0)

    const thighL = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.11, 0.45, 8), armorMat)
    thighL.position.set(0, -0.22, 0)
    leftLegPivot.add(thighL)

    const calfL = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.09, 0.42, 8), skinMat)
    calfL.position.set(0, -0.58, 0.02)
    leftLegPivot.add(calfL)

    const bootL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.32), goldMat)
    bootL.position.set(0, -0.82, 0.08)
    leftLegPivot.add(bootL)

    bodyContainer.add(leftLegPivot)

    // Right Leg
    const rightLegPivot = new THREE.Group()
    rightLegPivot.position.set(0.2, 0.8, 0)

    const thighR = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.11, 0.45, 8), armorMat)
    thighR.position.set(0, -0.22, 0)
    rightLegPivot.add(thighR)

    const calfR = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.09, 0.42, 8), skinMat)
    calfR.position.set(0, -0.58, 0.02)
    rightLegPivot.add(calfR)

    const bootR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.32), goldMat)
    bootR.position.set(0, -0.82, 0.08)
    rightLegPivot.add(bootR)

    bodyContainer.add(rightLegPivot)

    // 5. Flowing Hero Cape
    const capeGeo = new THREE.PlaneGeometry(0.65, 1.1, 4, 4)
    const capeMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      side: THREE.DoubleSide,
      roughness: 0.6,
    })
    const cape = new THREE.Mesh(capeGeo, capeMat)
    cape.position.set(0, 1.15, -0.25)
    cape.rotation.x = 0.25
    bodyContainer.add(cape)

    // Slight forward running lean
    bodyContainer.rotation.x = 0.14

    return {
      playerGroup,
      limbs: {
        leftArm: leftArmPivot,
        rightArm: rightArmPivot,
        leftLeg: leftLegPivot,
        rightLeg: rightLegPivot,
        body: bodyContainer,
      },
    }
  }

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
    scene.fog = new THREE.FogExp2(0x0a0908, 0.012)

    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000)
    camera.position.set(0, 3.8, 7.2)
    camera.lookAt(0, 1.6, -6)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xfbbf24, 1.5)
    dirLight.position.set(5, 14, 10)
    dirLight.castShadow = true
    scene.add(dirLight)

    const playerLight = new THREE.PointLight(0x06b6d4, 2.5, 10)
    playerLight.position.set(0, 2, 0)
    scene.add(playerLight)

    // Temple Floor Runway (500 units long)
    const floorGeo = new THREE.PlaneGeometry(12, 600, 10, 100)
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      roughness: 0.8,
      metalness: 0.2,
    })
    const floor = new THREE.Mesh(floorGeo, floorMat)
    floor.rotation.x = -Math.PI / 2
    floor.position.z = -250
    floor.receiveShadow = true
    scene.add(floor)

    // Floor Glowing Grid Lines
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b })
    for (const laneX of [-2.2, 0, 2.2]) {
      const lineGeo = new THREE.PlaneGeometry(0.12, 600)
      const line = new THREE.Mesh(lineGeo, lineMat)
      line.rotation.x = -Math.PI / 2
      line.position.set(laneX, 0.01, -250)
      scene.add(line)
    }

    // Temple Wall Pillars & Torches
    for (let z = -500; z <= 20; z += 16) {
      for (const side of [-5.8, 5.8]) {
        const pillarGeo = new THREE.CylinderGeometry(0.5, 0.65, 8, 8)
        const pillarMat = new THREE.MeshStandardMaterial({ color: 0x292524 })
        const pillar = new THREE.Mesh(pillarGeo, pillarMat)
        pillar.position.set(side, 4, z)
        scene.add(pillar)

        const torchLight = new THREE.PointLight(0xf59e0b, 1.2, 14)
        torchLight.position.set(side * 0.85, 4.5, z)
        scene.add(torchLight)
      }
    }

    // Create Detailed Animated Humanoid Hero
    const { playerGroup, limbs } = createHumanoidCharacter()
    scene.add(playerGroup)

    // Spawning Energy Balls & MORE Frequent Obstacles
    const coins: THREE.Mesh[] = []
    const obstacles: THREE.Mesh[] = []
    const lanePositions = [-2.2, 0, 2.2]

    // Spacing every 11 units along the corridor
    for (let z = -20; z >= -550; z -= 11) {
      const lane = lanePositions[Math.floor(Math.random() * lanePositions.length)]
      // 55% Obstacles, 45% Energy Balls (creates a thrilling dodge runner experience!)
      const isObstacle = Math.random() > 0.45

      if (isObstacle) {
        // Varied Obstacle Types:
        const obsType = Math.random()
        let obs: THREE.Mesh

        if (obsType < 0.4) {
          // 1. Low Spiked Stone Barrier (Jump or Dodge)
          const obsGeo = new THREE.BoxGeometry(1.6, 0.9, 0.6)
          const obsMat = new THREE.MeshStandardMaterial({
            color: 0xd97706,
            emissive: 0x991b1b,
            roughness: 0.4,
          })
          obs = new THREE.Mesh(obsGeo, obsMat)
          obs.position.set(lane, 0.45, z)
        } else if (obsType < 0.75) {
          // 2. Tall Ancient Obelisk Pillar (Must Dodge)
          const obsGeo = new THREE.CylinderGeometry(0.45, 0.55, 3.2, 8)
          const obsMat = new THREE.MeshStandardMaterial({
            color: 0x78350f,
            emissive: 0x451a03,
            roughness: 0.6,
          })
          obs = new THREE.Mesh(obsGeo, obsMat)
          obs.position.set(lane, 1.6, z)
        } else {
          // 3. Double-Lane Hazard (Leaves only 1 safe lane!)
          const safeLane = lanePositions[Math.floor(Math.random() * lanePositions.length)]
          const doubleLanes = lanePositions.filter((l) => l !== safeLane)
          doubleLanes.forEach((dL) => {
            const obsGeo = new THREE.BoxGeometry(1.4, 1.3, 0.7)
            const obsMat = new THREE.MeshStandardMaterial({
              color: 0xef4444,
              emissive: 0x7f1d1d,
              roughness: 0.4,
            })
            const dObs = new THREE.Mesh(obsGeo, obsMat)
            dObs.position.set(dL, 0.65, z)
            dObs.castShadow = true
            scene.add(dObs)
            obstacles.push(dObs)
          })
          continue
        }

        obs.castShadow = true
        scene.add(obs)
        obstacles.push(obs)
      } else {
        // Glowing ETN Energy Ball (Sphere with bright golden aura)
        const ballGeo = new THREE.SphereGeometry(0.42, 24, 24)
        const ballMat = new THREE.MeshStandardMaterial({
          color: 0xfbbf24,
          emissive: 0xd97706,
          metalness: 0.9,
          roughness: 0.1,
        })
        const ball = new THREE.Mesh(ballGeo, ballMat)
        ball.position.set(lane, 1.2, z)

        const innerLight = new THREE.PointLight(0xf59e0b, 0.8, 3)
        innerLight.position.set(0, 0, 0)
        ball.add(innerLight)

        scene.add(ball)
        coins.push(ball)
      }
    }

    gameStateRef.current = {
      scene,
      camera,
      renderer,
      player: playerGroup,
      limbs,
      coins,
      obstacles,
      dustParticles: [],
      playerLane: 0,
      isJumping: false,
      jumpVelocity: 0,
      runCycle: 0,
      speed: 0.28,
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

      // Do not progress game if paused by briefing modal
      if (isPausedRef.current) {
        state.renderer.render(state.scene, state.camera)
        return
      }

      // Progress Running Cycle for fluid human animation
      state.runCycle += state.speed * 0.75

      // Animate Humanoid Running Limbs
      if (state.limbs.leftArm && state.limbs.rightArm && state.limbs.leftLeg && state.limbs.rightLeg && state.limbs.body) {
        if (state.isJumping) {
          // Jump pose: limbs tucked
          state.limbs.leftLeg.rotation.x = -0.5
          state.limbs.rightLeg.rotation.x = -0.3
          state.limbs.leftArm.rotation.x = 0.6
          state.limbs.rightArm.rotation.x = 0.6
          state.limbs.body.position.y = 0
        } else {
          // Running gait cycle
          const swing = Math.sin(state.runCycle)
          state.limbs.leftArm.rotation.x = swing * 0.95
          state.limbs.rightArm.rotation.x = -swing * 0.95
          state.limbs.leftLeg.rotation.x = -swing * 1.1
          state.limbs.rightLeg.rotation.x = swing * 1.1

          // Vertical bounce & torso bobbing
          state.limbs.body.position.y = Math.abs(Math.sin(state.runCycle * 2)) * 0.12
          // Subtle lateral sway
          state.limbs.body.rotation.z = Math.sin(state.runCycle) * 0.04
        }
      }

      // Smooth lane movement
      const targetX = state.playerLane * 2.2
      state.player.position.x += (targetX - state.player.position.x) * 0.2
      playerLight.position.x = state.player.position.x

      // Jump Physics
      if (state.isJumping) {
        state.player.position.y += state.jumpVelocity
        state.jumpVelocity -= 0.022
        if (state.player.position.y <= 0) {
          state.player.position.y = 0
          state.isJumping = false
        }
      }

      // Move energy balls toward player
      state.coins.forEach((ball) => {
        ball.position.z += state.speed
        ball.rotation.y += 0.04
        ball.rotation.x += 0.02

        // Energy Ball Collision check
        const pPos = state.player!.position
        if (
          Math.abs(ball.position.z - pPos.z) < 1.1 &&
          Math.abs(ball.position.x - pPos.x) < 1.0 &&
          pPos.y < 1.6
        ) {
          // Collected 1 Energy Ball
          ball.position.z = -450 - Math.random() * 50
          ball.position.x = lanePositions[Math.floor(Math.random() * lanePositions.length)]
          state.score += 1
          setScore(state.score)

          // Check 20 Balls Victory Condition
          if (state.score >= targetScore) {
            state.active = false
            setVictory(true)
            setTimeout(() => onComplete(), 1500)
          }
        } else if (ball.position.z > 10) {
          // Recycle ball ahead
          ball.position.z = -450 - Math.random() * 50
          ball.position.x = lanePositions[Math.floor(Math.random() * lanePositions.length)]
        }
      })

      // Move obstacles toward player
      state.obstacles.forEach((obs) => {
        obs.position.z += state.speed

        // Obstacle Collision check
        const pPos = state.player!.position
        if (
          Math.abs(obs.position.z - pPos.z) < 1.0 &&
          Math.abs(obs.position.x - pPos.x) < 0.9 &&
          pPos.y < 1.1
        ) {
          obs.position.z = -450 - Math.random() * 50
          state.health -= 1
          setHealth(state.health)

          if (state.health <= 0) {
            state.active = false
            setGameOver(true)
          }
        } else if (obs.position.z > 10) {
          obs.position.z = -450 - Math.random() * 50
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
      if (!gameStateRef.current.active || isPausedRef.current) return
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
    if (!gameStateRef.current.active || isPausedRef.current) return
    gameStateRef.current.playerLane = Math.max(-1, gameStateRef.current.playerLane - 1)
  }

  const moveRight = () => {
    if (!gameStateRef.current.active || isPausedRef.current) return
    gameStateRef.current.playerLane = Math.min(1, gameStateRef.current.playerLane + 1)
  }

  const jump = () => {
    if (!gameStateRef.current.active || gameStateRef.current.isJumping || isPausedRef.current) return
    gameStateRef.current.isJumping = true
    gameStateRef.current.jumpVelocity = 0.45
  }

  return (
    <div className="relative w-full h-[520px] md:h-[620px] bg-stone-950 rounded-2xl overflow-hidden border-2 border-glow-amber/50 shadow-2xl flex flex-col select-none">
      {/* 3D Canvas Viewport */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Game HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
        {/* Health */}
        <div className="flex items-center gap-1 bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-red-500/30 pointer-events-auto">
          {[...Array(3)].map((_, i) => (
            <Heart
              key={i}
              className={`w-5 h-5 ${i < health ? "text-red-500 fill-red-500" : "text-stone-600"}`}
            />
          ))}
        </div>

        {/* Action Controls & Energy Balls Goal */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => initGame()}
            title="Restart Stage"
            className="flex items-center gap-1 px-3 py-1.5 bg-stone-900/80 hover:bg-stone-800 border border-amber-500/40 text-amber-200 text-xs font-bold rounded-full transition-all cursor-pointer shadow-md"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Restart</span>
          </button>

          <div className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-500/40 font-mono font-bold text-glow-amber text-xs md:text-sm">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <span>{score} / {targetScore} Balls (2 ETN)</span>
          </div>
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
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 text-xs text-white/60 bg-stone-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 pointer-events-none">
        <span>Controls:</span>
        <kbd className="px-2 py-0.5 bg-stone-800 rounded border border-white/20">A / ←</kbd>
        <kbd className="px-2 py-0.5 bg-stone-800 rounded border border-white/20">D / →</kbd>
        <kbd className="px-2 py-0.5 bg-stone-800 rounded border border-white/20">Space (Jump)</kbd>
      </div>

      {/* Game Over / Retry Modal */}
      {gameOver && (
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 animate-fade-in text-center">
          <div className="text-5xl mb-2 animate-bounce">⚡</div>
          <h3 className="text-2xl md:text-3xl font-bold text-amber-400 font-[family-name:var(--font-cinzel-decorative)] mb-1">
            Corridor Run Interrupted
          </h3>
          <p className="text-white/70 text-sm max-w-xs mb-6">
            You collected <strong className="text-amber-300">{score} / {targetScore}</strong> Energy Balls. Gather all 20 to earn 2 ETN and unlock the Quiz!
          </p>
          <button
            onClick={() => initGame()}
            className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer font-[family-name:var(--font-cinzel)] text-base uppercase tracking-wider"
          >
            <RefreshCw className="w-5 h-5" /> Play Again
          </button>
        </div>
      )}

      {/* Victory Modal */}
      {victory && (
        <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 animate-fade-in text-center">
          <Trophy className="w-16 h-16 text-yellow-400 animate-bounce mb-3" />
          <h3 className="text-2xl md:text-3xl font-black text-white font-[family-name:var(--font-cinzel-decorative)] mb-1">
            20 Energy Balls Collected!
          </h3>
          <p className="text-emerald-300 text-sm font-semibold mb-4">
            Stage 1 Mini-game Cleared (+2 ETN Earned) • Temple Portal Active
          </p>
          <span className="text-xs text-white/70 animate-pulse">Proceeding to Knowledge Quiz (+3 ETN)...</span>
        </div>
      )}
    </div>
  )
}
