'use client'

import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

// Animated Sun component
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
      <MeshDistortMaterial 
        color="#ffd700"
        distort={0.3}
        speed={1.2}
        roughness={0.1}
        metalness={0.9}
        emissive="#ffd700"
        emissiveIntensity={0.5}
      />
    </Sphere>
  )
}

// Planet component
function Planet({ size, color, distance, speed }: { size: number, color: string, distance: number, speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const angleRef = useRef(0)

  useFrame(() => {
    angleRef.current += speed
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(angleRef.current) * distance
      meshRef.current.position.z = Math.sin(angleRef.current) * distance
    }
  })

  return (
    <Sphere ref={meshRef} args={[size, 32, 32]}>
      <meshStandardMaterial color={color} />
    </Sphere>
  )
}

export default function CosmicExperience() {
  const heroRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Text reveal animation
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        duration: 1.2,
        y: 100,
        opacity: 0,
        ease: 'power4.out',
        delay: 0.2,
      })
      
      gsap.from('.hero-subtitle', {
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: 'power4.out',
        delay: 0.5,
      })
      
      gsap.from('.hero-cta', {
        duration: 1,
        opacity: 0,
        y: 30,
        ease: 'power3.out',
        delay: 0.8,
      })
    }, heroRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef} className="relative h-screen flex items-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black"></div>
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} 
      ></div>
      
      {/* Combined 3D Scene */}
      <Canvas camera={{ position: [0, 50, 150] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8860ff" />
        
        {/* Animated Sun */}
        <AnimatedSun />
        
        {/* Planets */}
        <Planet size={1} color="gray" distance={10} speed={0.02} />
        <Planet size={1.5} color="orange" distance={15} speed={0.015} />
        <Planet size={2} color="blue" distance={22} speed={0.01} />
        <Planet size={1.8} color="red" distance={30} speed={0.008} />
        <Planet size={4} color="brown" distance={45} speed={0.005} />
        <Planet size={3.5} color="goldenrod" distance={60} speed={0.004} />
        <Planet size={2.8} color="lightblue" distance={75} speed={0.003} />
        <Planet size={2.5} color="blue" distance={90} speed={0.002} />

        {/* Stars Background */}
        {[...Array(200)].map((_, i) => (
          <Sphere key={i} args={[0.2, 16, 16]} position={[
            (Math.random() - 0.5) * 400,
            (Math.random() - 0.5) * 400,
            (Math.random() - 0.5) * 400
          ]}>
            <meshBasicMaterial color="white" />
          </Sphere>
        ))}

        <OrbitControls enableZoom={true} />
      </Canvas>

      {/* Hero content */}
      <div className="relative z-10 h-full flex items-center justify-start">
        <div className="container px-6 md:px-12">
          <div className="flex flex-col gap-6 max-w-2xl">
            <h1 className="hero-title text-5xl md:text-7xl font-bold">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Cosmic Explorer
              </span>
              <span className="text-white">Journey Through Space</span>
            </h1>
            
            <p className="hero-subtitle text-xl md:text-2xl text-gray-300">
              Witness the beauty of our solar system with interactive celestial exploration.
            </p>
            
            <div className="hero-cta flex gap-4 mt-4">
              <button className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30">
                Start Journey
              </button>
              <button className="px-8 py-3 rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 text-white">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}