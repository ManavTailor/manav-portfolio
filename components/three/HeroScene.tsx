'use client'
import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars, Environment } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedSphere({ position, scale, speed, distort, color }: {
  position: [number, number, number]
  scale: number
  speed: number
  distort: number
  color: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5
  })

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={speed * 2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.7}
        />
      </Sphere>
    </Float>
  )
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 1500

  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20

    const purple = new THREE.Color().setHSL(0.75 + Math.random() * 0.1, 0.9, 0.5 + Math.random() * 0.3)
    colors[i * 3] = purple.r
    colors[i * 3 + 1] = purple.g
    colors[i * 3 + 2] = purple.b
  }

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

function RingGeometry() {
  const ringRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ringRef.current) return
    ringRef.current.rotation.x = state.clock.elapsedTime * 0.2
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.1
  })
  return (
    <mesh ref={ringRef} position={[0, 0, 0]}>
      <torusGeometry args={[3, 0.02, 16, 100]} />
      <meshBasicMaterial color="#7c3aed" transparent opacity={0.4} />
    </mesh>
  )
}

function RingGeometry2() {
  const ringRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ringRef.current) return
    ringRef.current.rotation.x = -state.clock.elapsedTime * 0.15
    ringRef.current.rotation.y = state.clock.elapsedTime * 0.25
  })
  return (
    <mesh ref={ringRef} position={[0, 0, 0]}>
      <torusGeometry args={[4, 0.015, 16, 100]} />
      <meshBasicMaterial color="#d946ef" transparent opacity={0.25} />
    </mesh>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#a855f7" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#7c3aed" />
      <pointLight position={[0, 5, -5]} intensity={0.5} color="#d946ef" />

      <Stars radius={100} depth={50} count={3000} factor={3} saturation={0.8} fade speed={0.5} />

      <ParticleField />
      <RingGeometry />
      <RingGeometry2 />

      <AnimatedSphere position={[-2.5, 1, 0]} scale={1.2} speed={0.8} distort={0.5} color="#7c3aed" />
      <AnimatedSphere position={[2.5, -0.5, -1]} scale={0.9} speed={1.2} distort={0.6} color="#a855f7" />
      <AnimatedSphere position={[0, -2, 1]} scale={0.7} speed={0.6} distort={0.4} color="#d946ef" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </Canvas>
  )
}
