'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

export default function FuturisticNav() {
  const [isOpen, setIsOpen] = useState(false)
  
  useEffect(() => {
    // Animation for menu items
    if (isOpen) {
      gsap.fromTo('.menu-item', 
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.5, ease: 'power3.out' }
      )
    }
  }, [isOpen])
  
  return (
    <nav className="fixed w-full z-50 backdrop-blur-md bg-black/50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500">
              NEONVERSE
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {['Home', 'Features', 'Technology', 'Contact'].map((item) => (
                <Link 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white px-3 py-2 relative group overflow-hidden"
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-black/20 p-2 rounded-md text-gray-400 hover:text-white"
            >
              <span className="sr-only">Open menu</span>
              <div className="w-6 h-0.5 bg-current mb-1.5 transition-all duration-300 ease-out transform origin-left"
                   style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}></div>
              <div className="w-6 h-0.5 bg-current mb-1.5 transition-all duration-300 ease-out"
                   style={{ opacity: isOpen ? 0 : 1 }}></div>
              <div className="w-6 h-0.5 bg-current transition-all duration-300 ease-out transform origin-left"
                   style={{ transform: isOpen ? 'rotate(-45deg)' : 'rotate(0)' }}></div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/80 backdrop-blur-md">
          {['Home', 'Features', 'Technology', 'Contact'].map((item, index) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="menu-item block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-900/50"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}