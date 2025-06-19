'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Suspense, useState } from 'react';
import Planet from './Planet';

const planetData = [
  {
    name: 'Mercury',
    radius: 0.4,
    distance: 5,
    color: '#A9A9A9',
    speed: 0.04,
    texture: '/textures/mercury.jpg',
    moons: [],
    details: {
      diameter: '4,880 km',
      distanceFromSun: '57.9 million km',
      orbitalPeriod: '88 days',
      surfaceTemperature: '-173°C to 427°C',
      funFact: 'Mercury has almost no atmosphere.'
    }
  },
  {
    name: 'Venus',
    radius: 0.9,
    distance: 7,
    color: '#E6E6FA',
    speed: 0.03,
    texture: '/textures/venus.jpg',
    moons: [],
    details: {
      diameter: '12,104 km',
      distanceFromSun: '108.2 million km',
      orbitalPeriod: '225 days',
      surfaceTemperature: '462°C',
      funFact: 'Venus spins in the opposite direction to most planets.'
    }
  },
  {
    name: 'Earth',
    radius: 1,
    distance: 10,
    color: '#4169E1',
    speed: 0.02,
    texture: '/textures/earth.jpg',
    moons: [
      { name: 'Moon', radius: 0.27, distance: 1.5, speed: 0.08, color: '#ccc', texture: '/textures/moon.jpg' }
    ],
    details: {
      diameter: '12,742 km',
      distanceFromSun: '149.6 million km',
      orbitalPeriod: '365 days',
      surfaceTemperature: '-88°C to 58°C',
      funFact: 'Earth is the only planet known to support life.'
    }
  },
  {
    name: 'Mars',
    radius: 0.5,
    distance: 15,
    color: '#CD5C5C',
    speed: 0.015,
    texture: '/textures/mars.jpg',
    moons: [
      { name: 'Phobos', radius: 0.1, distance: 0.8, speed: 0.12, color: '#aaa', texture: '/textures/phobos.jpg' },
      { name: 'Deimos', radius: 0.08, distance: 1.2, speed: 0.09, color: '#bbb', texture: '/textures/deimos.jpg' }
    ],
    details: {
      diameter: '6,779 km',
      distanceFromSun: '227.9 million km',
      orbitalPeriod: '687 days',
      surfaceTemperature: '-140°C to 20°C',
      funFact: 'Mars has the tallest volcano in the solar system.'
    }
  },
  {
    name: 'Jupiter',
    radius: 2.5,
    distance: 20,
    color: '#DAA520',
    speed: 0.01,
    texture: '/textures/jupiter.jpg',
    moons: [
      { name: 'Io', radius: 0.2, distance: 3, speed: 0.13, color: '#e0c068', texture: '/textures/io.jpg' },
      { name: 'Europa', radius: 0.18, distance: 4, speed: 0.11, color: '#c9d1d3', texture: '/textures/europa.jpg' }
    ],
    details: {
      diameter: '139,820 km',
      distanceFromSun: '778.5 million km',
      orbitalPeriod: '12 years',
      surfaceTemperature: '-110°C',
      funFact: 'Jupiter is the largest planet in our solar system.'
    }
  },
  {
    name: 'Saturn',
    radius: 2,
    distance: 25,
    color: '#F4A460',
    speed: 0.008,
    texture: '/textures/saturn.jpg',
    moons: [
      { name: 'Titan', radius: 0.22, distance: 3.5, speed: 0.1, color: '#e3c16f', texture: '/textures/titan.jpg' }
    ],
    details: {
      diameter: '116,460 km',
      distanceFromSun: '1.4 billion km',
      orbitalPeriod: '29 years',
      surfaceTemperature: '-140°C',
      funFact: 'Saturn has the most spectacular ring system.'
    }
  },
  {
    name: 'Uranus',
    radius: 1.5,
    distance: 30,
    color: '#40E0D0',
    speed: 0.006,
    texture: '/textures/uranus.jpg',
    moons: [],
    details: {
      diameter: '50,724 km',
      distanceFromSun: '2.9 billion km',
      orbitalPeriod: '84 years',
      surfaceTemperature: '-195°C',
      funFact: 'Uranus rotates on its side.'
    }
  },
  {
    name: 'Neptune',
    radius: 1.4,
    distance: 35,
    color: '#1E90FF',
    speed: 0.005,
    texture: '/textures/neptune.jpg',
    moons: [],
    details: {
      diameter: '49,244 km',
      distanceFromSun: '4.5 billion km',
      orbitalPeriod: '165 years',
      surfaceTemperature: '-200°C',
      funFact: 'Neptune has the strongest winds in the solar system.'
    }
  }
];

export default function SolarSystemPage() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  return (
    <div className="w-full h-screen relative bg-black">
      <audio src="/audio/space-ambience.mp3" autoPlay loop volume={0.2} />
      <Canvas camera={{ position: [0, 20, 40], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} intensity={1.2} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        {/* Sun */}
        <mesh>
          <sphereGeometry args={[2.5, 32, 32]} />
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={1.2} />
        </mesh>
        {/* Planets */}
        {planetData.map((planet, idx) => (
          <Planet key={planet.name} {...planet} onClick={() => setSelectedPlanet(planet)} />
        ))}
        <OrbitControls enableZoom enablePan enableRotate zoomSpeed={0.6} panSpeed={0.5} rotateSpeed={0.4} />
      </Canvas>
      {/* Modal for planet details */}
      {selectedPlanet && (
        <div className="absolute top-4 right-4 bg-black/90 text-white p-6 rounded-lg max-w-sm shadow-lg z-50 animate-fade-in">
          <h2 className="text-2xl font-bold mb-2">{selectedPlanet.name}</h2>
          <img src={selectedPlanet.texture} alt={selectedPlanet.name} className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-2 border-white" />
          <div className="space-y-2 text-sm">
            <p><strong>Diameter:</strong> {selectedPlanet.details.diameter}</p>
            <p><strong>Distance from Sun:</strong> {selectedPlanet.details.distanceFromSun}</p>
            <p><strong>Orbital Period:</strong> {selectedPlanet.details.orbitalPeriod}</p>
            <p><strong>Surface Temperature:</strong> {selectedPlanet.details.surfaceTemperature}</p>
            <p><strong>Fun Fact:</strong> {selectedPlanet.details.funFact}</p>
          </div>
          <button onClick={() => setSelectedPlanet(null)} className="mt-4 px-4 py-2 bg-white/20 rounded hover:bg-white/30 w-full">Close</button>
        </div>
      )}
    </div>
  );
} 