import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGeometry({ position, color, speed, scale, type }) {
  const meshRef = useRef();
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.getElapsedTime() * speed * 0.3;
    meshRef.current.rotation.y = clock.getElapsedTime() * speed * 0.5;
  });

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={1.5} position={position}>
      <mesh ref={meshRef} scale={scale}>
        {type === 'torus' ? (
          <torusKnotGeometry args={[1, 0.3, 64, 16]} />
        ) : type === 'icosahedron' ? (
          <icosahedronGeometry args={[1, 0]} />
        ) : type === 'octahedron' ? (
          <octahedronGeometry args={[1, 0]} />
        ) : (
          <boxGeometry args={[1, 1, 1]} />
        )}
        <MeshDistortMaterial
          color={color}
          roughness={0.3}
          metalness={0.8}
          wireframe={false}
          transparent
          opacity={0.15}
          envMapIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#c17028" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#e8954a" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.6} />
    </>
  );
}

export default function ThreeScene() {
  const geometries = useMemo(() => [
    { position: [-8, 3, -5], color: '#c17028', speed: 0.5, scale: 1.5, type: 'torus' },
    { position: [7, -2, -8], color: '#e8954a', speed: 0.3, scale: 1.2, type: 'icosahedron' },
    { position: [5, 4, -12], color: '#d4823a', speed: 0.4, scale: 1, type: 'octahedron' },
    { position: [-6, -3, -10], color: '#c17028', speed: 0.6, scale: 0.8, type: 'torus' },
    { position: [0, -4, -15], color: '#e8954a', speed: 0.35, scale: 1.8, type: 'torus' },
    { position: [-4, 5, -20], color: '#b06020', speed: 0.25, scale: 2, type: 'icosahedron' },
  ], []);

  return (
    <div id="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <SceneLights />
        {geometries.map((g, i) => (
          <FloatingGeometry key={i} {...g} />
        ))}
      </Canvas>
    </div>
  );
}