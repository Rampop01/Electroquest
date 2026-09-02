"use client"

import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { Trophy, Zap, Heart, ArrowLeft, ArrowRight, ArrowUp, RefreshCw, Pause, Play, Volume2, VolumeX } from "lucide-react"
import { useGameSound } from "@/hooks/useGameSound"

interface TempleRunner3DProps {
  questId: string
  onComplete: () => void
  isPaused?: boolean
}

// Dedicated Subway-Surfer style Web Audio Arcade Sound Engine
class RunnerAudioEngine {
  private ctx: AudioContext | null = null
  private bgmInterval: any = null
  private isMuted: boolean = false
  private bgmStep = 0

  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("electroquest_sound_enabled")
      if (saved !== null) {
        this.isMuted = saved === "false"
      }
    }
  }

  private getContext(): AudioContext | null {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      if (AudioContextClass) {
        this.ctx = new AudioContextClass()
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {})
    }
    return this.ctx
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted
    if (this.isMuted) {
      this.stopBgm()
    }
  }

  // Subway Surfer style Coin / Energy Ball Ding
  public playBallPickup() {
    if (this.isMuted) return
    try {
      const ctx = this.getContext()
      if (!ctx) return
      const now = ctx.currentTime

      const osc1 = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      const gain = ctx.createGain()

      osc1.type = "sine"
      osc2.type = "triangle"

      osc1.frequency.setValueAtTime(1320, now) // E6
      osc1.frequency.exponentialRampToValueAtTime(1760, now + 0.12) // A6

      osc2.frequency.setValueAtTime(2640, now)
      osc2.frequency.exponentialRampToValueAtTime(3520, now + 0.12)

      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(0.18, now + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18)

      osc1.connect(gain)
      osc2.connect(gain)
      gain.connect(ctx.destination)

      osc1.start(now)
      osc2.start(now)
      osc1.stop(now + 0.2)
      osc2.stop(now + 0.2)
    } catch {
      // Audio fallback safe
    }
  }

  // Springy arcade jump sound
  public playJump() {
    if (this.isMuted) return
    try {
      const ctx = this.getContext()
      if (!ctx) return
      const now = ctx.currentTime

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = "sine"
      osc.frequency.setValueAtTime(220, now)
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.22)

      gain.gain.setValueAtTime(0.2, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.26)
    } catch {}
  }

  // Quick whoosh on lane swipe
  public playLaneSwipe() {
    if (this.isMuted) return
    try {
      const ctx = this.getContext()
      if (!ctx) return
      const now = ctx.currentTime

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = "sine"
      osc.frequency.setValueAtTime(380, now)
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.12)

      gain.gain.setValueAtTime(0.12, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.15)
    } catch {}
  }

  // Obstacle collision impact
  public playHit() {
    if (this.isMuted) return
    try {
      const ctx = this.getContext()
      if (!ctx) return
      const now = ctx.currentTime

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = "sawtooth"
      osc.frequency.setValueAtTime(160, now)
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.35)

      gain.gain.setValueAtTime(0.3, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.4)
    } catch {}
  }

  // Triumphant Victory Jingle
  public playVictory() {
    if (this.isMuted) return
    try {
      const ctx = this.getContext()
      if (!ctx) return
      const now = ctx.currentTime

      const notes = [523.25, 659.25, 783.99, 1046.5]
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        const noteTime = now + idx * 0.12

        osc.type = "triangle"
        osc.frequency.setValueAtTime(freq, noteTime)

        gain.gain.setValueAtTime(0.2, noteTime)
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.45)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(noteTime)
        osc.stop(noteTime + 0.5)
      })
    } catch {}
  }

  // Uptempo Subway-Surfers style funk beat & synth bassline
  public startBgm() {
    if (this.isMuted || this.bgmInterval) return
    try {
      const ctx = this.getContext()
      if (!ctx) return

      const bassline = [110, 110, 146.83, 110, 130.81, 146.83, 164.81, 130.81]
      this.bgmStep = 0

      this.bgmInterval = setInterval(() => {
        if (this.isMuted) return
        try {
          const now = ctx.currentTime

          const freq = bassline[this.bgmStep % bassline.length]
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()

          osc.type = "triangle"
          osc.frequency.setValueAtTime(freq, now)

          gain.gain.setValueAtTime(0.08, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14)

          osc.connect(gain)
          gain.connect(ctx.destination)

          osc.start(now)
          osc.stop(now + 0.15)

          if (this.bgmStep % 2 === 1) {
            const chime = ctx.createOscillator()
            const chimeGain = ctx.createGain()
            chime.type = "sine"
            chime.frequency.setValueAtTime(freq * 4, now)
            chimeGain.gain.setValueAtTime(0.03, now)
            chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09)

            chime.connect(chimeGain)
            chimeGain.connect(ctx.destination)

            chime.start(now)
            chime.stop(now + 0.1)
          }

          this.bgmStep++
        } catch {}
      }, 125)
    } catch {}
  }

  public stopBgm() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval)
      this.bgmInterval = null
    }
  }

  public cleanup() {
    this.stopBgm()
  }
}

export function TempleRunner3D({ questId, onComplete, isPaused = false }: TempleRunner3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [score, setScore] = useState(0)
  const [health, setHealth] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [victory, setVictory] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const targetScore = 20 // Collect 20 Energy Balls to win 2 ETN

  const { soundEnabled, toggle: toggleGlobalSound } = useGameSound()

  const audioRef = useRef<RunnerAudioEngine | null>(null)
  if (!audioRef.current && typeof window !== "undefined") {
    audioRef.current = new RunnerAudioEngine()
  }

  const effectivePaused = isPaused || userPaused
  const isPausedRef = useRef(effectivePaused)
  useEffect(() => {
    isPausedRef.current = effectivePaused
  }, [effectivePaused])

  useEffect(() => {
    audioRef.current?.setMuted(!soundEnabled)
    if (soundEnabled && !effectivePaused && !gameOver && !victory) {
      audioRef.current?.startBgm()
    } else {
      audioRef.current?.stopBgm()
    }
  }, [soundEnabled, effectivePaused, gameOver, victory])

  useEffect(() => {
    return () => {
      audioRef.current?.cleanup()
    }
  }, [])

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
      leftKnee: null as THREE.Group | null,
      rightKnee: null as THREE.Group | null,
      body: null as THREE.Group | null,
      cape: null as THREE.Mesh | null,
    },
    pillars: [] as THREE.Group[],
    floorSegments: [] as THREE.Mesh[],
    coins: [] as THREE.Mesh[],
    obstacles: [] as THREE.Mesh[],
    speedParticles: [] as THREE.Mesh[],
    playerLane: 0,
    isJumping: false,
    jumpVelocity: 0,
    runCycle: 0,
    speed: 0.45,
    score: 0,
    health: 3,
    active: true,
  })

  // Build high-detail articulated athletic sprinter
  const createHumanoidCharacter = () => {
    const playerGroup = new THREE.Group()
    const bodyContainer = new THREE.Group()
    playerGroup.add(bodyContainer)

    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xd4a373,
      roughness: 0.7,
      metalness: 0.1,
    })
    const armorMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a, // dark obsidian titanium
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

    // 1. Torso & Chest Armor (Athletic V-Taper)
    const chestGeo = new THREE.BoxGeometry(0.72, 0.75, 0.45)
    const chest = new THREE.Mesh(chestGeo, armorMat)
    chest.position.y = 1.35
    chest.castShadow = true
    bodyContainer.add(chest)

    const crestGeo = new THREE.BoxGeometry(0.42, 0.42, 0.08)
    const crest = new THREE.Mesh(crestGeo, goldMat)
    crest.position.set(0, 1.38, 0.23)
    bodyContainer.add(crest)

    const coreGeo = new THREE.SphereGeometry(0.12, 16, 16)
    const core = new THREE.Mesh(coreGeo, energyCyanMat)
    core.position.set(0, 1.38, 0.28)
    bodyContainer.add(core)

    const waistGeo = new THREE.BoxGeometry(0.56, 0.3, 0.38)
    const waist = new THREE.Mesh(waistGeo, goldMat)
    waist.position.y = 0.92
    bodyContainer.add(waist)

    // 2. Head & Helmet (Focused forward glance)
    const headGroup = new THREE.Group()
    headGroup.position.set(0, 1.9, 0)

    const faceGeo = new THREE.SphereGeometry(0.24, 16, 16)
    const face = new THREE.Mesh(faceGeo, skinMat)
    headGroup.add(face)

    const helmetGeo = new THREE.BoxGeometry(0.52, 0.35, 0.52)
    const helmet = new THREE.Mesh(helmetGeo, armorMat)
    helmet.position.set(0, 0.12, -0.02)
    headGroup.add(helmet)

    const helmetFinGeo = new THREE.BoxGeometry(0.08, 0.25, 0.45)
    const helmetFin = new THREE.Mesh(helmetFinGeo, goldMat)
    helmetFin.position.set(0, 0.32, -0.05)
    headGroup.add(helmetFin)

    const visorGeo = new THREE.BoxGeometry(0.38, 0.1, 0.12)
    const visor = new THREE.Mesh(visorGeo, energyCyanMat)
    visor.position.set(0, 0.04, 0.2)
    headGroup.add(visor)

    bodyContainer.add(headGroup)

    // 3. Sprinter Arms (Pumped at 90-degree elbows)
    // Left Arm
    const leftArmPivot = new THREE.Group()
    leftArmPivot.position.set(-0.48, 1.6, 0)

    const shoulderPadL = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), goldMat)
    leftArmPivot.add(shoulderPadL)

    const armUpperL = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.38, 8), armorMat)
    armUpperL.position.set(0, -0.19, 0)
    leftArmPivot.add(armUpperL)

    // Forearm bent 85 degrees forward for sprinter pump
    const forearmL = new THREE.Group()
    forearmL.position.set(0, -0.38, 0)
    forearmL.rotation.x = -1.4 // Bent elbow

    const armLowerL = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.36, 8), skinMat)
    armLowerL.position.set(0, -0.18, 0)
    forearmL.add(armLowerL)

    const fistL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.14), goldMat)
    fistL.position.set(0, -0.36, 0)
    forearmL.add(fistL)

    leftArmPivot.add(forearmL)
    bodyContainer.add(leftArmPivot)

    // Right Arm
    const rightArmPivot = new THREE.Group()
    rightArmPivot.position.set(0.48, 1.6, 0)

    const shoulderPadR = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), goldMat)
    rightArmPivot.add(shoulderPadR)

    const armUpperR = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.38, 8), armorMat)
    armUpperR.position.set(0, -0.19, 0)
    rightArmPivot.add(armUpperR)

    const forearmR = new THREE.Group()
    forearmR.position.set(0, -0.38, 0)
    forearmR.rotation.x = -1.4 // Bent elbow

    const armLowerR = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.36, 8), skinMat)
    armLowerR.position.set(0, -0.18, 0)
    forearmR.add(armLowerR)

    const fistR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.14), goldMat)
    fistR.position.set(0, -0.36, 0)
    forearmR.add(fistR)

    rightArmPivot.add(forearmR)
    bodyContainer.add(rightArmPivot)

    // 4. Sprinter Legs with Articulated Knee Joints
    // Left Leg (Hip Pivot)
    const leftHipPivot = new THREE.Group()
    leftHipPivot.position.set(-0.22, 0.82, 0)

    const thighL = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.11, 0.42, 8), armorMat)
    thighL.position.set(0, -0.21, 0)
    leftHipPivot.add(thighL)

    // Left Knee Pivot
    const leftKneePivot = new THREE.Group()
    leftKneePivot.position.set(0, -0.42, 0)

    const calfL = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.09, 0.4, 8), skinMat)
    calfL.position.set(0, -0.2, 0)
    leftKneePivot.add(calfL)

    const bootL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 0.32), goldMat)
    bootL.position.set(0, -0.4, 0.06)
    leftKneePivot.add(bootL)

    leftHipPivot.add(leftKneePivot)
    bodyContainer.add(leftHipPivot)

    // Right Leg (Hip Pivot)
    const rightHipPivot = new THREE.Group()
    rightHipPivot.position.set(0.22, 0.82, 0)

    const thighR = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.11, 0.42, 8), armorMat)
    thighR.position.set(0, -0.21, 0)
    rightHipPivot.add(thighR)

    // Right Knee Pivot
    const rightKneePivot = new THREE.Group()
    rightKneePivot.position.set(0, -0.42, 0)

    const calfR = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.09, 0.4, 8), skinMat)
    calfR.position.set(0, -0.2, 0)
    rightKneePivot.add(calfR)

    const bootR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 0.32), goldMat)
    bootR.position.set(0, -0.4, 0.06)
    rightKneePivot.add(bootR)

    rightHipPivot.add(rightKneePivot)
    bodyContainer.add(rightHipPivot)

    // 5. Flowing Hero Cape
    const capeGeo = new THREE.PlaneGeometry(0.65, 1.1, 4, 4)
    const capeMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      side: THREE.DoubleSide,
      roughness: 0.6,
    })
    const cape = new THREE.Mesh(capeGeo, capeMat)
    cape.position.set(0, 1.15, -0.25)
    cape.rotation.x = 0.4
    bodyContainer.add(cape)

    // Athletic Sprinter Forward Posture (No lateral catwalk sway)
    bodyContainer.rotation.x = 0.28

    return {
      playerGroup,
      limbs: {
        leftArm: leftArmPivot,
        rightArm: rightArmPivot,
        leftLeg: leftHipPivot,
        rightLeg: rightHipPivot,
        leftKnee: leftKneePivot,
        rightKnee: rightKneePivot,
        body: bodyContainer,
        cape,
      },
    }
  }

  // Start / restart the 3D world
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

    // Floor Runway segments
    const floorSegments: THREE.Mesh[] = []
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      roughness: 0.8,
      metalness: 0.2,
    })
    const stripeMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b })

    for (let z = 20; z >= -500; z -= 50) {
      const segGroup = new THREE.Group()
      const floorTile = new THREE.Mesh(new THREE.PlaneGeometry(12, 50), floorMat)
      floorTile.rotation.x = -Math.PI / 2
      floorTile.position.set(0, 0, 0)
      floorTile.receiveShadow = true
      segGroup.add(floorTile)

      for (const laneX of [-2.2, 0, 2.2]) {
        const line = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 50), stripeMat)
        line.rotation.x = -Math.PI / 2
        line.position.set(laneX, 0.01, 0)
        segGroup.add(line)
      }

      segGroup.position.set(0, 0, z)
      scene.add(segGroup)
      floorSegments.push(segGroup as any)
    }

    // Scrolling Temple Pillars & Torches
    const pillars: THREE.Group[] = []
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0x292524 })

    for (let z = 20; z >= -480; z -= 20) {
      const pGroup = new THREE.Group()
      pGroup.position.set(0, 0, z)

      for (const side of [-5.8, 5.8]) {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.65, 8, 8), pillarMat)
        pillar.position.set(side, 4, 0)
        pGroup.add(pillar)

        const torchLight = new THREE.PointLight(0xf59e0b, 1.2, 14)
        torchLight.position.set(side * 0.85, 4.5, 0)
        pGroup.add(torchLight)
      }

      scene.add(pGroup)
      pillars.push(pGroup)
    }

    // Speed Lines / Dust Particles
    const speedParticles: THREE.Mesh[] = []
    const partMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee })
    for (let i = 0; i < 70; i++) {
      const part = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), partMat)
      part.position.set(
        (Math.random() - 0.5) * 10,
        Math.random() * 4 + 0.2,
        -Math.random() * 300
      )
      scene.add(part)
      speedParticles.push(part)
    }

    // Create Sprinter Hero
    const { playerGroup, limbs } = createHumanoidCharacter()
    scene.add(playerGroup)

    // Spawning Energy Balls & Obstacles
    const coins: THREE.Mesh[] = []
    const obstacles: THREE.Mesh[] = []
    const lanePositions = [-2.2, 0, 2.2]

    for (let z = -25; z >= -550; z -= 11) {
      const lane = lanePositions[Math.floor(Math.random() * lanePositions.length)]
      const isObstacle = Math.random() > 0.45

      if (isObstacle) {
        const obsType = Math.random()
        let obs: THREE.Mesh

        if (obsType < 0.4) {
          const obsGeo = new THREE.BoxGeometry(1.6, 0.9, 0.6)
          const obsMat = new THREE.MeshStandardMaterial({
            color: 0xd97706,
            emissive: 0x991b1b,
            roughness: 0.4,
          })
          obs = new THREE.Mesh(obsGeo, obsMat)
          obs.position.set(lane, 0.45, z)
        } else if (obsType < 0.75) {
          const obsGeo = new THREE.CylinderGeometry(0.45, 0.55, 3.2, 8)
          const obsMat = new THREE.MeshStandardMaterial({
            color: 0x78350f,
            emissive: 0x451a03,
            roughness: 0.6,
          })
          obs = new THREE.Mesh(obsGeo, obsMat)
          obs.position.set(lane, 1.6, z)
        } else {
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
        // Glowing ETN Energy Ball with golden halo ring
        const ballGeo = new THREE.SphereGeometry(0.48, 24, 24)
        const ballMat = new THREE.MeshStandardMaterial({
          color: 0xfacc15,
          emissive: 0xf59e0b,
          emissiveIntensity: 0.9,
          metalness: 0.2,
          roughness: 0.1,
        })
        const ball = new THREE.Mesh(ballGeo, ballMat)
        ball.position.set(lane, 1.0, z)

        const ringGeo = new THREE.TorusGeometry(0.65, 0.04, 8, 24)
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xfef08a })
        const ring = new THREE.Mesh(ringGeo, ringMat)
        ring.rotation.x = Math.PI / 3
        ball.add(ring)

        const innerLight = new THREE.PointLight(0xfbbf24, 1.2, 4)
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
      pillars,
      floorSegments,
      coins,
      obstacles,
      speedParticles,
      playerLane: 0,
      isJumping: false,
      jumpVelocity: 0,
      runCycle: 0,
      speed: 0.45,
      score: 0,
      health: 3,
      active: true,
    }

    setScore(0)
    setHealth(3)
    setGameOver(false)
    setVictory(false)
    setUserPaused(false)

    if (!effectivePaused && soundEnabled) {
      audioRef.current?.startBgm()
    }

    // Animation Loop
    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const state = gameStateRef.current
      if (!state.active || !state.player || !state.scene || !state.camera || !state.renderer) return

      if (isPausedRef.current) {
        state.renderer.render(state.scene, state.camera)
        return
      }

      // Fast Sprinter Cadence
      state.runCycle += state.speed * 1.55

      // 1. Dynamic Hallway Scrolling
      state.pillars.forEach((pGroup) => {
        pGroup.position.z += state.speed
        if (pGroup.position.z > 20) {
          pGroup.position.z -= 500
        }
      })

      // 2. Dynamic Floor Scrolling
      state.floorSegments.forEach((fGroup: any) => {
        fGroup.position.z += state.speed
        if (fGroup.position.z > 20) {
          fGroup.position.z -= 520
        }
      })

      // 3. Speed Particles
      state.speedParticles.forEach((part) => {
        part.position.z += state.speed * 2.5
        if (part.position.z > 10) {
          part.position.z = -300 - Math.random() * 50
          part.position.x = (Math.random() - 0.5) * 10
        }
      })

      // 4. Athletic Sprinter Limbs Animation
      const { limbs } = state
      if (limbs.leftArm && limbs.rightArm && limbs.leftLeg && limbs.rightLeg && limbs.leftKnee && limbs.rightKnee && limbs.body && limbs.cape) {
        if (state.isJumping) {
          limbs.leftLeg.rotation.x = -0.6
          limbs.leftKnee.rotation.x = 1.1
          limbs.rightLeg.rotation.x = -0.4
          limbs.rightKnee.rotation.x = 0.8
          limbs.leftArm.rotation.x = 0.7
          limbs.rightArm.rotation.x = 0.7
          limbs.body.position.y = 0
          limbs.body.rotation.z = 0
          limbs.cape.rotation.x = 0.65
        } else {
          const sin = Math.sin(state.runCycle)
          const cos = Math.cos(state.runCycle)

          limbs.leftArm.rotation.x = -sin * 1.2
          limbs.rightArm.rotation.x = sin * 1.2

          limbs.leftLeg.rotation.x = sin * 1.15
          limbs.rightLeg.rotation.x = -sin * 1.15

          limbs.leftKnee.rotation.x = Math.max(0, -sin * 1.4 + 0.2)
          limbs.rightKnee.rotation.x = Math.max(0, sin * 1.4 + 0.2)

          limbs.body.position.y = Math.abs(cos) * 0.16
          limbs.body.rotation.z = 0
          limbs.body.rotation.x = 0.28

          limbs.cape.rotation.x = 0.45 + Math.sin(state.runCycle * 3.5) * 0.22
        }
      }

      // Snappy lane movement
      const targetX = state.playerLane * 2.2
      state.player.position.x += (targetX - state.player.position.x) * 0.28
      playerLight.position.x = state.player.position.x

      // Jump Physics
      if (state.isJumping) {
        state.player.position.y += state.jumpVelocity
        state.jumpVelocity -= 0.024
        if (state.player.position.y <= 0) {
          state.player.position.y = 0
          state.isJumping = false
        }
      }

      // Move energy balls toward player & detect precise collection
      state.coins.forEach((ball) => {
        ball.position.z += state.speed
        ball.rotation.y += 0.06
        ball.rotation.x += 0.03

        const pPos = state.player!.position
        const dx = Math.abs(ball.position.x - pPos.x)
        const relZ = ball.position.z - pPos.z
        const dy = Math.abs(ball.position.y - (pPos.y + 1.0))

        // Trigger pickup EXACTLY when the hero's body runs through the middle of the ball
        const isTouchingBody = relZ >= 0.25 && relZ <= 0.75 && dx < 0.55 && dy < 1.3

        if (isTouchingBody) {
          audioRef.current?.playBallPickup()
          ball.position.z = -450 - Math.random() * 50
          ball.position.x = lanePositions[Math.floor(Math.random() * lanePositions.length)]
          state.score += 1
          setScore(state.score)

          if (state.score >= targetScore) {
            state.active = false
            audioRef.current?.stopBgm()
            audioRef.current?.playVictory()
            setVictory(true)
            setTimeout(() => {
              audioRef.current?.cleanup()
              onComplete()
            }, 1600)
          }
        } else if (ball.position.z > 15) {
          ball.position.z = -450 - Math.random() * 50
          ball.position.x = lanePositions[Math.floor(Math.random() * lanePositions.length)]
        }
      })

      // Move obstacles toward player & detect exact physical collision
      state.obstacles.forEach((obs) => {
        obs.position.z += state.speed

        const pPos = state.player!.position
        const dx = Math.abs(obs.position.x - pPos.x)
        const relZ = obs.position.z - pPos.z

        // Only collide when obstacle has physically reached the character body (0 to +0.45)
        const isPhysicallyColliding = relZ >= -0.05 && relZ <= 0.45 && dx < 0.55

        if (isPhysicallyColliding) {
          const isLowObstacle = obs.position.y <= 0.6
          const hitHazard = isLowObstacle ? pPos.y < 0.75 : true

          if (hitHazard) {
            audioRef.current?.playHit()
            obs.position.z = -450 - Math.random() * 50
            state.health -= 1
            setHealth(state.health)

            if (state.health <= 0) {
              state.active = false
              audioRef.current?.stopBgm()
              setGameOver(true)
            }
          }
        } else if (obs.position.z > 15) {
          obs.position.z = -450 - Math.random() * 50
          obs.position.x = lanePositions[Math.floor(Math.random() * lanePositions.length)]
        }
      })

      state.renderer.render(state.scene, state.camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      audioRef.current?.cleanup()
    }
  }

  useEffect(() => {
    const cleanup = initGame()
    return () => cleanup && cleanup()
  }, [])

  // Desktop Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "p" || e.key === "P" || e.key === "Escape") {
        setUserPaused((prev) => !prev)
        return
      }

      if (!gameStateRef.current.active || isPausedRef.current) return
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        const nextLane = Math.max(-1, gameStateRef.current.playerLane - 1)
        if (nextLane !== gameStateRef.current.playerLane) {
          audioRef.current?.playLaneSwipe()
          gameStateRef.current.playerLane = nextLane
        }
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        const nextLane = Math.min(1, gameStateRef.current.playerLane + 1)
        if (nextLane !== gameStateRef.current.playerLane) {
          audioRef.current?.playLaneSwipe()
          gameStateRef.current.playerLane = nextLane
        }
      } else if ((e.key === "ArrowUp" || e.key === " " || e.key === "w" || e.key === "W") && !gameStateRef.current.isJumping) {
        audioRef.current?.playJump()
        gameStateRef.current.isJumping = true
        gameStateRef.current.jumpVelocity = 0.48
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Mobile Touch actions
  const moveLeft = () => {
    if (!gameStateRef.current.active || isPausedRef.current) return
    const nextLane = Math.max(-1, gameStateRef.current.playerLane - 1)
    if (nextLane !== gameStateRef.current.playerLane) {
      audioRef.current?.playLaneSwipe()
      gameStateRef.current.playerLane = nextLane
    }
  }

  const moveRight = () => {
    if (!gameStateRef.current.active || isPausedRef.current) return
    const nextLane = Math.min(1, gameStateRef.current.playerLane + 1)
    if (nextLane !== gameStateRef.current.playerLane) {
      audioRef.current?.playLaneSwipe()
      gameStateRef.current.playerLane = nextLane
    }
  }

  const jump = () => {
    if (!gameStateRef.current.active || gameStateRef.current.isJumping || isPausedRef.current) return
    audioRef.current?.playJump()
    gameStateRef.current.isJumping = true
    gameStateRef.current.jumpVelocity = 0.48
  }

  const togglePause = () => {
    setUserPaused((prev) => !prev)
  }

  return (
    <div className="relative w-full h-[520px] md:h-[620px] bg-stone-950 rounded-2xl overflow-hidden border-2 border-glow-amber/50 shadow-2xl flex flex-col select-none">
      {/* 3D Canvas Viewport */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Game HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
        {/* Health & Audio toggle */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="flex items-center gap-1 bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-red-500/30">
            {[...Array(3)].map((_, i) => (
              <Heart
                key={i}
                className={`w-5 h-5 ${i < health ? "text-red-500 fill-red-500" : "text-stone-600"}`}
              />
            ))}
          </div>

          <button
            onClick={toggleGlobalSound}
            title={soundEnabled ? "Mute Game Audio" : "Unmute Game Audio"}
            className="p-1.5 bg-stone-900/80 hover:bg-stone-800 border border-white/20 rounded-full text-stone-300 hover:text-amber-400 transition-colors shadow-md cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
          </button>
        </div>

        {/* Action Controls & Energy Balls Goal */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Pause / Resume Button */}
          <button
            onClick={togglePause}
            title={userPaused ? "Resume Game (P)" : "Pause Game (P)"}
            className="flex items-center gap-1 px-3 py-1.5 bg-stone-900/80 hover:bg-stone-800 border border-cyan-500/40 text-cyan-200 text-xs font-bold rounded-full transition-all cursor-pointer shadow-md"
          >
            {userPaused ? <Play className="w-3.5 h-3.5 fill-cyan-300" /> : <Pause className="w-3.5 h-3.5" />}
            <span>{userPaused ? "Resume" : "Pause"}</span>
          </button>

          {/* Restart Button */}
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
            <span>{score} / {targetScore} Energy Balls</span>
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
        <kbd className="px-2 py-0.5 bg-stone-800 rounded border border-white/20">P (Pause)</kbd>
      </div>

      {/* User Paused Modal */}
      {userPaused && !gameOver && !victory && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 animate-fade-in text-center">
          <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center mb-3">
            <Pause className="w-8 h-8 text-cyan-300" />
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white font-[family-name:var(--font-cinzel-decorative)] mb-2">
            Game Paused
          </h3>
          <p className="text-white/70 text-sm max-w-xs mb-6 font-[family-name:var(--font-cinzel)]">
            Take a breather. Press <strong className="text-amber-300">P</strong> or click Resume to continue sprinting.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setUserPaused(false)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-stone-950 font-black rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer font-[family-name:var(--font-cinzel)] text-sm uppercase tracking-wider"
            >
              <Play className="w-4 h-4 fill-stone-950" /> Resume Game
            </button>
            <button
              onClick={() => initGame()}
              className="flex items-center gap-2 px-5 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl border border-white/10 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer text-sm"
            >
              <RefreshCw className="w-4 h-4" /> Restart
            </button>
          </div>
        </div>
      )}

      {/* Game Over / Retry Modal */}
      {gameOver && (
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 animate-fade-in text-center">
          <div className="text-5xl mb-2 animate-bounce">⚡</div>
          <h3 className="text-2xl md:text-3xl font-bold text-amber-400 font-[family-name:var(--font-cinzel-decorative)] mb-1">
            Corridor Run Interrupted
          </h3>
          <p className="text-white/70 text-sm max-w-xs mb-6">
            You collected <strong className="text-amber-300">{score} / {targetScore}</strong> Energy Balls. Gather all 20 to power the portal and unlock the Quiz!
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
            Stage 1 Mini-game Cleared • Temple Portal Active
          </p>
          <span className="text-xs text-white/70 animate-pulse">Proceeding to Knowledge Quiz...</span>
        </div>
      )}
    </div>
  )
}
