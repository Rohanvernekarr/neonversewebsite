'use client'

import { useRef, useEffect } from 'react'

interface Particle {
  x: number
  y: number
  radius: number
  color: string
  speedX: number
  speedY: number
  alpha: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const animationFrameId = useRef<number | null>(null)
  const mouse = useRef({ x: 0, y: 0 })
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }
    
    // Initialize canvas
    handleResize()
    window.addEventListener('resize', handleResize)
    
    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = {
        x: e.clientX,
        y: e.clientY
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    
    // Initialize particles
    function initParticles() {
        if (!canvas) return; 
      particles.current = []
      const particleCount = Math.min(
        Math.floor((canvas.width * canvas.height) / 10000), 
        150
      )
      
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * (canvas?.width || 0),
          y: Math.random() * (canvas?.height || 0),
          radius: Math.random() * 2 + 1,
          color: getRandomColor(),
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          alpha: Math.random() * 0.5 + 0.1
        })
      }
    }
    
    // Get random blue/purple color for particles
    function getRandomColor() {
      const colors = [
        'rgba(64, 96, 255, 0.7)',   // Blue
        'rgba(96, 72, 255, 0.7)',   // Purple
        'rgba(129, 140, 248, 0.7)', // Indigo
        'rgba(79, 209, 197, 0.7)',  // Cyan
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }
    
    // Animation loop
    function animate() {
      if (!ctx) return
      if (canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
      
      // Update and draw particles
      particles.current.forEach((particle, index) => {
        // Move particles
        particle.x += particle.speedX
        particle.y += particle.speedY
        
        // Wrap around screen edges
        if (!canvas) return
        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height
        
        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
        
        // Connect particles within range
        connectParticles(particle, index)
        
        // Interact with mouse
        const dx = mouse.current.x - particle.x
        const dy = mouse.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 120) {
          const angle = Math.atan2(dy, dx)
          particle.x -= Math.cos(angle) * 0.5
          particle.y -= Math.sin(angle) * 0.5
        }
      })
      
      animationFrameId.current = requestAnimationFrame(animate)
    }
    
    // Connect nearby particles with lines
    function connectParticles(particle: Particle, index: number) {
      for (let i = index + 1; i < particles.current.length; i++) {
        const otherParticle = particles.current[i]
        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          // Create gradient line with opacity based on distance
          const opacity = 1 - (distance / 100)
          if (!ctx) return
          ctx.beginPath()
          ctx.strokeStyle = `rgba(100, 120, 255, ${opacity * 0.2})`
          ctx.lineWidth = 0.5
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(otherParticle.x, otherParticle.y)
          ctx.stroke()
        }
      }
    }
    
    // Start animation
    initParticles()
    animate()
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  )
}