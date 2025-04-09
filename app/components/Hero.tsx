'use client'

import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

// Animated Sun
function AnimatedSun() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
    }
  })

  return (
    <Sphere args={[5, 100, 200]} ref={meshRef}>
      <meshStandardMaterial
        color="#ffd700"
        emissive="#ffd700"
        emissiveIntensity={0.8}
        metalness={1}
        roughness={0.2}
      />
    </Sphere>
  )
}

// Planet with orbit ring, optional moon/ring
function Planet({
  size,
  color,
  distance,
  speed,
  hasRing = false,
  hasMoon = false
}: {
  size: number
  color: string
  distance: number
  speed: number
  hasRing?: boolean
  hasMoon?: boolean
}) {
  const planetRef = useRef<THREE.Mesh>(null)
  const angleRef = useRef(0)
  const moonRef = useRef<THREE.Mesh>(null)
  const moonAngleRef = useRef(0)

  useFrame(() => {
    angleRef.current += speed
    moonAngleRef.current += 0.05

    if (planetRef.current) {
      planetRef.current.position.x = Math.cos(angleRef.current) * distance
      planetRef.current.position.z = Math.sin(angleRef.current) * distance
      planetRef.current.rotation.set(0.4, planetRef.current.rotation.y + 0.01, 0)
    }

    if (moonRef.current && planetRef.current) {
      const moonDistance = size + 2
      moonRef.current.position.set(
        planetRef.current.position.x + Math.cos(moonAngleRef.current) * moonDistance,
        planetRef.current.position.y,
        planetRef.current.position.z + Math.sin(moonAngleRef.current) * moonDistance
      )
    }
  })

  return (
    <>
      {/* Orbit path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[distance - 0.05, distance + 0.05, 64]} />
        <meshBasicMaterial color="white" side={THREE.DoubleSide} transparent opacity={0.2} />
      </mesh>

      {/* Planet */}
      <Sphere ref={planetRef} args={[size, 32, 32]}>
        <meshStandardMaterial color={color} />
      </Sphere>

      {/* Planet Ring like Saturn */}
      {hasRing && (
        <mesh rotation={[Math.PI / 2, 0, 0]} position={planetRef.current?.position}>
         
          <meshBasicMaterial color="lightgray" side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Moon */}
      {hasMoon && (
        <Sphere ref={moonRef} args={[0.3, 16, 16]}>
          <meshStandardMaterial color="lightgray" />
        </Sphere>
      )}
    </>
  )
}

export default function CosmicExperience() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        duration: 1.2,
        y: 100,
        opacity: 0,
        ease: 'power4.out',
        delay: 0.2
      })
      gsap.from('.hero-subtitle', {
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: 'power4.out',
        delay: 0.5
      })
      gsap.from('.hero-cta', {
        duration: 1,
        opacity: 0,
        y: 30,
        ease: 'power3.out',
        delay: 0.8
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative h-screen w-full">
      {/* Text Overlay */}
      <div
        ref={heroRef}
        className="absolute inset-0 z-20 flex items-center justify-start bg-gradient-to-r from-black via-transparent to-black px-6"
      >
        <div className="max-w-2xl space-y-6">
          <h1 className="hero-title text-5xl md:text-7xl font-bold text-white">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Cosmic Explorer
            </span>
            Journey Through Space
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl text-gray-300">
            Witness the beauty of our solar system with interactive celestial exploration.
          </p>

          <div className="hero-cta flex gap-4">
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition">
              Start Journey
            </button>
            <button className="px-6 py-3 rounded-full border border-white/20 backdrop-blur-sm hover:bg-white/10 text-white transition">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* 3D Solar System */}
      <Canvas className="z-10" camera={{ position: [50, 50, 100] }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8860ff" />
        <color attach="background" args={['#000']} />

        <AnimatedSun />

        {/* Planets with visible axis */}
        <Planet size={1} color="gray" distance={10} speed={0.02} />
        <Planet size={1.5} color="orange" distance={15} speed={0.015} />
        <Planet size={2} color="blue" distance={22} speed={0.01} hasMoon />
        <Planet size={1.8} color="red" distance={30} speed={0.008} />
        <Planet size={4} color="brown" distance={45} speed={0.005} hasRing />
        <Planet size={3.5} color="goldenrod" distance={60} speed={0.004} />
        <Planet size={2.8} color="lightblue" distance={75} speed={0.003} />
        <Planet size={2.5} color="blue" distance={90} speed={0.002} />

        {/* Stars */}
        {[...Array(200)].map((_, i) => (
          <Sphere key={i} args={[0.2, 16, 16]} position={[
            (Math.random() - 0.5) * 300,
            (Math.random() - 0.5) * 300,
            (Math.random() - 0.5) * 300
          ]}>
            <meshBasicMaterial color="white" />
          </Sphere>
        ))}

        <OrbitControls enableZoom />
      </Canvas>
    </div>
  )
}
