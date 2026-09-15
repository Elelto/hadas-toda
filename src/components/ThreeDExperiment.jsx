import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const PARTICLE_COUNT = 2500;

function ParticlesScene() {
  const pointsRef = useRef();

  // Generate the start (chaos) and end (heart) positions once
  const { chaosPositions, heartPositions } = useMemo(() => {
    const chaos = new Float32Array(PARTICLE_COUNT * 3);
    const heart = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // --- CHAOS STATE ---
      // Spread particles across a wide 3D space
      chaos[i3] = (Math.random() - 0.5) * 25;     // X
      chaos[i3 + 1] = (Math.random() - 0.5) * 25; // Y
      chaos[i3 + 2] = (Math.random() - 0.5) * 25; // Z

      // --- HEART STATE ---
      // Mathematical heart formula
      const t = Math.PI * 2 * Math.random();
      const scale = 0.12; 
      
      const baseX = 16 * Math.pow(Math.sin(t), 3);
      const baseY = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      
      // Add slight volume and noise to the heart shape
      heart[i3] = (baseX * scale) + (Math.random() - 0.5) * 0.4;
      heart[i3 + 1] = (baseY * scale) + (Math.random() - 0.5) * 0.4;
      // Z depth for the heart so it's not totally flat
      heart[i3 + 2] = (Math.random() - 0.5) * 1.5; 
    }
    return { chaosPositions: chaos, heartPositions: heart };
  }, []);

  // Initialize the positions array for the geometry
  const initialPositions = useMemo(() => new Float32Array(chaosPositions), [chaosPositions]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Calculate scroll progress (0 to 1)
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    let progress = maxScroll > 0 ? scrollY / maxScroll : 0;
    progress = Math.min(Math.max(progress, 0), 1); // Clamp

    // Optional: Add easing so the heart forms slightly faster
    // progress = Math.pow(progress, 0.8);

    const positions = pointsRef.current.geometry.attributes.position.array;
    const time = state.clock.elapsedTime;

    // Update each particle
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      
      // Interpolate from Chaos to Heart based on scroll
      let targetX = THREE.MathUtils.lerp(chaosPositions[i3], heartPositions[i3], progress);
      let targetY = THREE.MathUtils.lerp(chaosPositions[i3 + 1], heartPositions[i3 + 1], progress);
      let targetZ = THREE.MathUtils.lerp(chaosPositions[i3 + 2], heartPositions[i3 + 2], progress);

      // Add a tiny bit of continuous organic floating movement
      const floatNoise = Math.sin(time * 0.5 + i) * 0.02;
      targetX += floatNoise;
      targetY += Math.cos(time * 0.5 + i) * 0.02;

      // Apply to array
      positions[i3] = targetX;
      positions[i3 + 1] = targetY;
      positions[i3 + 2] = targetZ;
    }

    // Mark the geometry to be updated on the GPU
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Slowly rotate the entire particle system
    pointsRef.current.rotation.y = time * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={initialPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        color="#FF6B6B" // Coral primary color from the site
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </points>
  );
}

export default function ThreeDExperiment() {
  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: 0, // Above background, below content
        pointerEvents: 'none' 
      }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        {/* Soft fog to blend distant particles into the background */}
        <fog attach="fog" args={['#ffffff', 5, 15]} />
        <ParticlesScene />
      </Canvas>
    </div>
  );
}
