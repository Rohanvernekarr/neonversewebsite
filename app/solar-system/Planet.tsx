'use client';

import { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useSpring, animated } from '@react-spring/three';

interface Moon {
  name: string;
  radius: number;
  distance: number;
  speed: number;
  color: string;
  texture?: string;
}

interface PlanetProps {
  name: string;
  radius: number;
  distance: number;
  color: string;
  speed: number;
  texture?: string;
  moons?: Moon[];
  onClick: () => void;
}

const MoonMesh = ({ moon, planetAngle, planetDistance }: { moon: Moon; planetAngle: number; planetDistance: number }) => {
  const moonRef = useRef<THREE.Mesh>(null);
  const texture = moon.texture ? useLoader(TextureLoader, moon.texture) : null;
  useFrame((state) => {
    if (moonRef.current) {
      const time = state.clock.getElapsedTime();
      const angle = time * moon.speed + planetAngle;
      moonRef.current.position.x = Math.sin(angle) * moon.distance + Math.sin(planetAngle) * planetDistance;
      moonRef.current.position.z = Math.cos(angle) * moon.distance + Math.cos(planetAngle) * planetDistance;
    }
  });
  return (
    <mesh ref={moonRef}>
      <sphereGeometry args={[moon.radius, 32, 32]} />
      <meshStandardMaterial map={texture || undefined} color={moon.color} />
    </mesh>
  );
};

const Planet = ({ name, radius, distance, color, speed, texture, moons = [], onClick }: PlanetProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const planetTexture = texture ? useLoader(TextureLoader, texture) : null;

  // Animation for hover effect
  const { scale } = useSpring({
    scale: hovered ? 1.2 : 1,
    config: { mass: 1, tension: 170, friction: 26 }
  });

  useFrame((state) => {
    if (meshRef.current) {
      // Orbit around the sun
      const time = state.clock.getElapsedTime();
      const angle = time * speed;
      meshRef.current.position.x = Math.sin(angle) * distance;
      meshRef.current.position.z = Math.cos(angle) * distance;
      meshRef.current.rotation.y += 0.01;
    }
  });

  // Calculate planet angle for moons
  const planetAngle = typeof window !== 'undefined' ? performance.now() * 0.001 * speed : 0;

  return (
    <animated.mesh
      ref={meshRef}
      scale={scale}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial map={planetTexture || undefined} color={color} roughness={0.7} metalness={0.2} emissive={hovered ? color : '#000000'} emissiveIntensity={hovered ? 0.5 : 0} />
      {/* Moons */}
      {moons.map((moon) => (
        <MoonMesh key={moon.name} moon={moon} planetAngle={planetAngle} planetDistance={distance} />
      ))}
    </animated.mesh>
  );
};

export default Planet; 