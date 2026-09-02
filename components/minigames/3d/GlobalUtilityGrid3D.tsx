"use client"

import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { Globe, Trophy, RefreshCw, Radio, CheckCircle2 } from "lucide-react"

interface GlobalUtilityGrid3DProps {
  questId: string
  onComplete: () => void
}

interface HubNode {
  id: number
  name: string
  lat: number
  lon: number
  mesh: THREE.Mesh
  connected: boolean
}

export function GlobalUtilityGrid3D({ questId, onComplete }: GlobalUtilityGrid3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeCount, setActiveCount] = useState(0)
  const [victory, setVictory] = useState(false)
  const totalHubs = 5

  const gameStateRef = useRef({
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    renderer: null as THREE.WebGLRenderer | null,
    globe: null as THREE.Group | null,
    hubs: [] as HubNode[],
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
    scene.background = new THREE.Color(0x050711)

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
    camera.position.set(0, 0, 10)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    const sun = new THREE.DirectionalLight(0x38bdf8, 1.5)
    sun.position.set(8, 5, 8)
    scene.add(sun)

    const globeGroup = new THREE.Group()

    // 3D Earth Sphere (Dark ocean & glowing grid)
    const globeGeo = new THREE.SphereGeometry(3.5, 32, 32)
    const globeMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.7,
      metalness: 0.3,
    })
    const globeMesh = new THREE.Mesh(globeGeo, globeMat)
    globeGroup.add(globeMesh)

    // Wireframe Grid Overlay
    const wireGeo = new THREE.SphereGeometry(3.52, 24, 24)
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    })
    const wireMesh = new THREE.Mesh(wireGeo, wireMat)
    globeGroup.add(wireMesh)

    // Hub coordinates
    const hubCoords = [
      { id: 1, name: "Lagos Hub", lat: 6.5, lon: 3.3 },
      { id: 2, name: "London HQ", lat: 51.5, lon: -0.1 },
      { id: 3, name: "Nairobi Relay", lat: -1.2, lon: 36.8 },
      { id: 4, name: "Sao Paulo Station", lat: -23.5, lon: -46.6 },
      { id: 5, name: "Manila Terminal", lat: 14.6, lon: 121.0 },
    ]

    const hubs: HubNode[] = []

    hubCoords.forEach((h) => {
      // Convert lat/lon to 3D sphere coordinate
      const phi = (90 - h.lat) * (Math.PI / 180)
      const theta = (h.lon + 180) * (Math.PI / 180)
      const radius = 3.65

      const x = -(radius * Math.sin(phi) * Math.cos(theta))
      const z = radius * Math.sin(phi) * Math.sin(theta)
      const y = radius * Math.cos(phi)

      const pylonGeo = new THREE.CylinderGeometry(0.1, 0.2, 0.6, 8)
      const pylonMat = new THREE.MeshStandardMaterial({
        color: 0xf43f5e,
        emissive: 0x9f1239,
      })
      const pylon = new THREE.Mesh(pylonGeo, pylonMat)
      pylon.position.set(x, y, z)
      pylon.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(x, y, z).normalize())
      globeGroup.add(pylon)

      hubs.push({
        id: h.id,
        name: h.name,
        lat: h.lat,
        lon: h.lon,
        mesh: pylon,
        connected: false,
      })
    })

    scene.add(globeGroup)

    gameStateRef.current = {
      scene,
      camera,
      renderer,
      globe: globeGroup,
      hubs,
      active: true,
    }

    setActiveCount(0)
    setVictory(false)

    // Animation loop
    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const state = gameStateRef.current
      if (!state.active || !state.globe || !state.scene || !state.camera || !state.renderer) return

      // Gentle auto-rotation
      state.globe.rotation.y += 0.005

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

  // Raycast tap on globe hubs
  const handlePointerDown = (e: React.PointerEvent) => {
    const state = gameStateRef.current
    if (!state.active || !state.camera || !containerRef.current || !state.scene) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1

    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(new THREE.Vector2(x, y), state.camera)

    const meshes = state.hubs.map((h) => h.mesh)
    const intersects = raycaster.intersectObjects(meshes)

    if (intersects.length > 0) {
      const hitMesh = intersects[0].object as THREE.Mesh
      const hub = state.hubs.find((h) => h.mesh === hitMesh)

      if (hub && !hub.connected) {
        hub.connected = true
        ;(hub.mesh.material as THREE.MeshStandardMaterial).color.setHex(0x10b981)
        ;(hub.mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0x059669)

        const connectedTotal = state.hubs.filter((h) => h.connected).length
        setActiveCount(connectedTotal)

        if (connectedTotal >= totalHubs) {
          state.active = false
          setVictory(true)
          setTimeout(() => onComplete(), 1500)
        }
      }
    }
  }

  // Quick fallback button for mobile
  const connectHubByIndex = (idx: number) => {
    const state = gameStateRef.current
    const hub = state.hubs[idx]
    if (hub && !hub.connected && state.active) {
      hub.connected = true
      ;(hub.mesh.material as THREE.MeshStandardMaterial).color.setHex(0x10b981)
      ;(hub.mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0x059669)

      const connectedTotal = state.hubs.filter((h) => h.connected).length
      setActiveCount(connectedTotal)

      if (connectedTotal >= totalHubs) {
        state.active = false
        setVictory(true)
        setTimeout(() => onComplete(), 1500)
      }
    }
  }

  return (
    <div className="relative w-full h-[520px] md:h-[620px] bg-stone-950 rounded-2xl overflow-hidden border-2 border-glow-cyan/50 shadow-2xl flex flex-col select-none">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        className="w-full h-full cursor-pointer"
      />

      {/* Top HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none z-10">
        <div className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-cyan-500/30">
          <Globe className="w-5 h-5 text-cyan-400" />
          <span className="text-xs uppercase font-bold text-white/70">160+ Countries Coverage:</span>
        </div>

        <div className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-500/30 font-mono font-bold text-glow-amber">
          <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>{activeCount} / {totalHubs} Hubs Online</span>
        </div>
      </div>

      {/* Quick Access Global Hub Strip */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2 z-10 pointer-events-auto flex-wrap">
        {gameStateRef.current.hubs.map((hub, idx) => (
          <button
            key={hub.id}
            onClick={() => connectHubByIndex(idx)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
              hub.connected
                ? "bg-emerald-950/80 border-emerald-400 text-emerald-300"
                : "bg-stone-900/90 border-white/20 text-white/70 hover:border-cyan-400"
            }`}
          >
            {hub.connected ? "✓ " : "⚡ "} {hub.name}
          </button>
        ))}
      </div>

      {/* Victory Modal */}
      {victory && (
        <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 animate-fade-in text-center">
          <Trophy className="w-16 h-16 text-yellow-400 animate-bounce mb-3" />
          <h3 className="text-3xl font-black text-white font-[family-name:var(--font-cinzel-decorative)] mb-1">
            Global Utility Grid Online!
          </h3>
          <p className="text-emerald-300 text-sm font-semibold mb-4">
            Airtime Top-ups & Energy Payments Connected Globally
          </p>
          <span className="text-xs text-white/60">Opening Quiz Arena...</span>
        </div>
      )}
    </div>
  )
}
