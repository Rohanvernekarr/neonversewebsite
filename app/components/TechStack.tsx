'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FuturisticCard from './Card'


gsap.registerPlugin(ScrollTrigger)

interface TechItem {
  name: string
  description: string
  icon: string
  color: string
}

export default function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const techStack: TechItem[] = [
    {
      name: 'Next.js',
      description: 'React framework with server-side rendering and static site generation.',
      icon: '▲',
      color: 'rgba(0, 112, 243, 0.7)'
    },
    {
      name: 'TypeScript',
      description: 'Strongly typed programming language that builds on JavaScript.',
      icon: 'TS',
      color: 'rgba(0, 122, 204, 0.7)'
    },
    {
      name: 'Tailwind CSS',
      description: 'Utility-first CSS framework for rapid UI development.',
      icon: '🌊',
      color: 'rgba(56, 189, 248, 0.7)'
    },
    {
      name: 'GSAP',
      description: 'Professional-grade animation library for the modern web.',
      icon: '⚡',
      color: 'rgba(145, 219, 105, 0.7)'
    },
    {
      name: 'Three.js',
      description: '3D library that makes WebGL simpler and more accessible.',
      icon: '3D',
      color: 'rgba(245, 130, 32, 0.7)'
    },
    {
      name: 'Lenis',
      description: 'Smooth scroll library with acceleration and deceleration.',
      icon: '👁‍',
      color: 'rgba(255, 123, 114, 0.7)'
    }
  ]

  useEffect(() => {
    const section = sectionRef.current

    if (section) {
      gsap.fromTo(
        '.tech-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom-=100'
          }
        }
      )

      gsap.fromTo(
        '.tech-card',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom-=100'
          }
        }
      )
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 relative">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute w-96 h-96 rounded-full bg-indigo-700/20 blur-3xl top-20 -left-20"></div>
        <div className="absolute w-96 h-96 rounded-full bg-blue-700/20 blur-3xl bottom-20 -right-20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="tech-title text-4xl md:text-5xl font-bold mb-4">
            Powered by
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"> Advanced Tech</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg">
            Our futuristic websites leverage cutting-edge technologies to deliver unparalleled digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((tech, index) => (
            <div key={index} className="tech-card">
              <FuturisticCard glowColor={tech.color} className="h-full p-6">
                <div className="flex flex-col h-full">
                  <div
                    className="w-12 h-12 mb-4 rounded-lg flex items-center justify-center text-2xl font-bold"
                    style={{ background: tech.color }}
                  >
                    {tech.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-2">
                   
                  </h3>

                  <p className="text-gray-400 mt-2 flex-grow">{tech.description}</p>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <a
                      href="#"
                      className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center group"
                    >
                      Learn more
                      <span className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </a>
                  </div>
                </div>
              </FuturisticCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}