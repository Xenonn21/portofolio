"use client";

import { Canvas } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
} from "@react-three/drei";

function Planet() {
  return (
    <Float
      speed={2}
      rotationIntensity={1.5}
      floatIntensity={2}
    >
      <mesh rotation={[0.4, 0.2, 0]}>

        <sphereGeometry args={[2, 128, 128]} />

        <MeshDistortMaterial
          color="#8b5cf6"
          emissive="#7c3aed"
          emissiveIntensity={2}
          distort={0.35}
          speed={2}
          roughness={0}
        />

      </mesh>
    </Float>
  );
}

export default function PlanetScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6] }}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >

      {/* lights */}
      <ambientLight intensity={1.5} />

      <directionalLight
        position={[3, 2, 5]}
        intensity={2}
      />

      <pointLight
        position={[-5, -5, -5]}
        intensity={2}
        color="#8b5cf6"
      />

      {/* planet */}
      <Planet />

    </Canvas>
  );
}