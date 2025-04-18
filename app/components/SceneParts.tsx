"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

// ☀️ Animated Sun
export function AnimatedSun() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Sphere args={[5, 100, 200]} ref={meshRef}>
      <meshStandardMaterial
        color="#ffd700"
        emissive="#ffd700"
        emissiveIntensity={0.8}
        metalness={1}
        roughness={0.2}
      />
    </Sphere>
  );
}

// 🪐 Planet
export function Planet({
  size,
  color,
  distance,
  speed,
  hasRing = false,
  hasMoon = false,
  name = "",
}: {
  size: number;
  color: string;
  distance: number;
  speed: number;
  hasRing?: boolean;
  hasMoon?: boolean;
  name?: string;
}) {
  const planetRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(0);
  const moonRef = useRef<THREE.Mesh>(null);
  const moonAngleRef = useRef(0);

  useFrame(() => {
    angleRef.current += speed;
    moonAngleRef.current += 0.05;

    if (planetRef.current) {
      planetRef.current.position.x = Math.cos(angleRef.current) * distance;
      planetRef.current.position.z = Math.sin(angleRef.current) * distance;
      planetRef.current.rotation.set(
        0.4,
        planetRef.current.rotation.y + 0.01,
        0
      );
    }

    if (moonRef.current && planetRef.current) {
      const moonDistance = size + 2;
      moonRef.current.position.set(
        planetRef.current.position.x +
          Math.cos(moonAngleRef.current) * moonDistance,
        planetRef.current.position.y,
        planetRef.current.position.z +
          Math.sin(moonAngleRef.current) * moonDistance
      );
    }
  });

  return (
    <>
      {/* Orbit ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[distance - 0.05, distance + 0.05, 64]} />
        <meshBasicMaterial
          color="white"
          side={THREE.DoubleSide}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Planet sphere */}
      <Sphere
        ref={planetRef}
        args={[size, 32, 32]}
        onClick={() => alert(`Planet: ${name}`)}
      >
        <meshStandardMaterial color={color} />
      </Sphere>

      {/* Optional Ring */}
      {hasRing && (
        <mesh
          rotation={[Math.PI / 2, 0, 0]}
          position={planetRef.current?.position}
        >
          <meshBasicMaterial color="lightgray" side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Optional Moon */}
      {hasMoon && (
        <Sphere ref={moonRef} args={[0.3, 16, 16]}>
          <meshStandardMaterial color="lightgray" />
        </Sphere>
      )}
    </>
  );
}

// 🌠 Shooting Star
export function ShootingStar() {
  const starRef = useRef<THREE.Mesh>(null);

  const start = useRef({
    x: Math.random() * 300 - 150,
    y: Math.random() * 150 + 50,
    z: Math.random() * 300 - 150,
    speed: Math.random() * 0.5 + 0.5,
    dir: new THREE.Vector3(
      Math.random() * -1,
      Math.random() * -1,
      Math.random() * -1
    ).normalize(),
  });

  useFrame(() => {
    if (starRef.current) {
      starRef.current.position.x += start.current.dir.x * start.current.speed;
      starRef.current.position.y += start.current.dir.y * start.current.speed;
      starRef.current.position.z += start.current.dir.z * start.current.speed;

      if (starRef.current.position.y < -100) {
        const newX = Math.random() * 300 - 150;
        const newY = Math.random() * 150 + 50;
        const newZ = Math.random() * 300 - 150;
        starRef.current.position.set(newX, newY, newZ);
      }
    }
  });

  return (
    <Sphere
      ref={starRef}
      args={[0.12, 8, 8]}
      position={[start.current.x, start.current.y, start.current.z]}
    >
      <meshBasicMaterial color="white" />
    </Sphere>
  );
}
