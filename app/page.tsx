'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import FuturisticHero from './components/Hero'
import FuturisticNav from './components/NAv'
import FuturisticFeatures from './components/Feature'
import FuturisticFooter from './components/Footer'
import SmoothScroll from './components/SmoothScroll'

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
        <FuturisticNav />
        <main>
          <FuturisticHero />
          <FuturisticFeatures />
        </main>
        <FuturisticFooter />
      </div>
    </SmoothScroll>
  )
}
