'use client'

import { useState, useRef, ReactNode } from 'react'

interface FuturisticCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export default function FuturisticCard({ 
  children, 
  className = "",
  glowColor = "rgba(100, 120, 255, 0.5)" 
}: FuturisticCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    
    // Calculate mouse position relative to card (0-1)
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    })
  }
  
  // Calculate rotation and glow position based on mouse position
  const rotateX = isHovered ? (mousePosition.y - 0.5) * 10 : 0
  const rotateY = isHovered ? (mousePosition.x - 0.5) * -10 : 0
  
  // Calculate glow position
  const glowX = mousePosition.x * 100
  const glowY = mousePosition.y * 100
  
  return (
    <div
      ref={cardRef}
      className={`relative bg-black/50 border border-white/10 backdrop-blur-md rounded-xl overflow-hidden ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Glow effect */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none opacity-70"
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor}, transparent 40%)`,
          }}
        />
      )}
      
      {/* Border glow */}
      {isHovered && (
        <div 
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            boxShadow: `0 0 15px ${glowColor}`,
          }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}