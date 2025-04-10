'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Import icons if needed
// import { IconType } from 'react-icons'
// import { HiOutlineGlobe, HiOutlineLightningBolt, HiOutlineChip, HiOutlineShieldCheck } from 'react-icons/hi'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface FeatureCardProps {
  title: string
  description: string
  color: string
  index: number
}

function FeatureCard({ title, description, color, index }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current

    if (card) {
      gsap.fromTo(
        card,
        { y: 100, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none none',
          },
        }
      )
    }
  }, [index])

  return (
    <div
      ref={cardRef}
      className={`
        relative
        bg-white/5
        backdrop-blur-lg
        border border-white/10
        rounded-2xl
        p-6
        overflow-hidden
        transition-all
        duration-300
        hover:border-white/30
        hover:shadow-2xl
        hover:shadow-${color.split(' ')[1]}/30
        hover:scale-[1.03]
        group
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Glowing Background Effect */}
      <div className="absolute -inset-[2px] bg-gradient-to-tr from-white/10 via-transparent to-white/5 rounded-2xl blur-sm opacity-30 pointer-events-none" />

      {/* Icon area */}
      <div className={`relative w-14 h-14 mb-6 rounded-xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform duration-300`}>
        <div className="w-7 h-7 bg-white/80 rounded-full shadow-md group-hover:rotate-12 transition-transform duration-300"></div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>

      {/* Description */}
      <p className="text-gray-400">{description}</p>

      {/* Link */}
      <div className="mt-6 flex items-center">
        <a
          href="#"
          className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center group"
        >
          Learn more
          <span className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
        </a>
      </div>
    </div>
  )
}


export default function FuturisticFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const section = sectionRef.current
    
    if (section) {
      gsap.fromTo(
        '.section-title',
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          scrollTrigger: {
            trigger: section,
            start: 'top bottom-=100',
          }
        }
      )
    }
  }, [])
  
  const features = [
    {
      title: 'AI-Powered Solutions',
      description: 'Harness the power of artificial intelligence to drive innovation and efficiency in your business.',
      color: 'bg-gradient-to-br from-blue-600 to-blue-400',
    },
    {
      title: 'Quantum Computing',
      description: 'Prepare for the future with our quantum-ready platforms and infrastructure solutions.',
      color: 'bg-gradient-to-br from-purple-600 to-purple-400',
    },
    {
      title: 'Immersive Experiences',
      description: 'Create captivating digital experiences with our advanced AR and VR technologies.',
      color: 'bg-gradient-to-br from-indigo-600 to-indigo-400',
    },
    {
      title: 'Blockchain Integration',
      description: 'Secure, transparent, and efficient transactions with our blockchain solutions.',
      color: 'bg-gradient-to-br from-cyan-600 to-cyan-400',
    },
  ]
  
  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute w-96 h-96 rounded-full bg-blue-700/20 blur-3xl -top-20 -right-20"></div>
        <div className="absolute w-96 h-96 rounded-full bg-purple-700/20 blur-3xl -bottom-20 -left-20"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl md:text-5xl font-bold mb-4">
            Cutting-Edge 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"> Features</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg">
            Explore the technologies of tomorrow that are available today through our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}