'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

function CeloArtifact() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHover] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere
        ref={meshRef}
        args={[1, 64, 64]}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.2 : 1}
      >
        <MeshDistortMaterial
          color={hovered ? "#FBCC5C" : "#35D07F"}
          speed={4}
          distort={0.3}
          radius={1}
        />
      </Sphere>
      
      {/* Halo Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.02, 16, 100]} />
        <meshStandardMaterial color="#FBCC5C" emissive="#FBCC5C" emissiveIntensity={2} />
      </mesh>
    </Float>
  )
}

export function HeroScene() {
  return (
    <div className="w-full h-[500px] relative">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#35D07F" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#FBCC5C" />
        <spotLight position={[0, 5, 0]} intensity={2} color="#45D0D5" />
        
        <CeloArtifact />
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
