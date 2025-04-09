'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import FuturisticHero from './components/Hero'
import FuturisticNav from './components/Nav'
import FuturisticFeatures from './components/Feature'
import FuturisticFooter from './components/Footer'
import SmoothScroll from './components/SmoothScroll'
import ParticleBackground from './components/ParticleBackground'
import TechStack from './components/TechStack'

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize page animations
    const ctx = gsap.context(() => {
      gsap.from('.fade-in', {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <SmoothScroll>
      <div ref={mainRef} className="min-h-screen bg-black text-white">
      <ParticleBackground />
        <FuturisticNav />
        <main>
          <FuturisticHero />
          <FuturisticFeatures />
          <TechStack />
        </main>
        <FuturisticFooter />
      </div>
    </SmoothScroll>
  )
}
