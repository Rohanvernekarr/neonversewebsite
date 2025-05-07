"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { AnimatedSun, Planet, ShootingStar } from "../components/SceneParts";

export default function ExplorePage() {
  return (
    <div className="h-screen w-full">
       <Canvas className="z-10" camera={{ position: [50, 50, 100] }}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8860ff" />
              <color attach="background" args={["#000"]} />
      
              <AnimatedSun />
      
              {/* Planets with visible axis */}
              <Planet size={1} color="gray" distance={10} speed={0.02} />
              <Planet size={1.5} color="orange" distance={15} speed={0.015} />
              <Planet size={2} color="blue" distance={22} speed={0.01} hasMoon />
              <Planet size={1.8} color="red" distance={30} speed={0.008} />
              <Planet size={4} color="brown" distance={45} speed={0.005} hasRing />
              <Planet size={3.5} color="goldenrod" distance={60} speed={0.004} />
              <Planet size={2.8} color="lightblue" distance={75} speed={0.003} />
              <Planet size={2.5} color="blue" distance={90} speed={0.002} />
      
              {/* Stars */}
              {[...Array(200)].map((_, i) => (
                <Sphere
                  key={i}
                  args={[0.2, 16, 16]}
                  position={[
                    (Math.random() - 0.5) * 200,
                    (Math.random() - 0.5) * 200,
                    (Math.random() - 0.5) * 200,
                  ]}
                >
                  <meshBasicMaterial color="white" />
                </Sphere>
              ))}
              {[...Array(30)].map((_, i) => (
                <ShootingStar key={i} />
              ))}
      
              <OrbitControls
                enableZoom
                enableDamping
                dampingFactor={0.05}
                maxDistance={120}
                minDistance={30}
              />
            </Canvas>
    </div>
  );
}
