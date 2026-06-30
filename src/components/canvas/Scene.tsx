import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Text, ContactShadows, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { PORTFOLIO_CONFIG } from '../../config/portfolio.config';
import { audio } from '../../utils/audio';

function ProjectCard({ project, position, color }: { project: any, position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.5 + position[1]) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group 
        position={position}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; audio.init(); audio.playHoverSound(); }}
        onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'auto'; }}
        onClick={(e) => { e.stopPropagation(); audio.playClickSound(); alert(`Opened project: ${project.title}`); }}
      >
        <mesh ref={meshRef}>
          <boxGeometry args={[4, 2, 0.5]} />
          <meshPhysicalMaterial 
            color={color}
            metalness={0.8}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={2}
          />
        </mesh>
        <Text 
          position={[0, 0, 0.3]} 
          fontSize={0.25} 
          color="#ffffff"
          maxWidth={3.5}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
        >
          {project.title}
        </Text>
      </group>
    </Float>
  );
}

function SceneContent() {
  const { activeThemeId } = usePortfolioStore();
  const theme = useMemo(() => PORTFOLIO_CONFIG.themeEngine.find(t => t.id === activeThemeId) || PORTFOLIO_CONFIG.themeEngine[0], [activeThemeId]);

  return (
    <>
      <color attach="background" args={[theme.tokens.background]} />
      <fog attach="fog" args={[theme.tokens.background, 10, 30]} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} color={theme.tokens.primary} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={theme.tokens.accent} />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <group position={[0, 0, -5]}>
        {PORTFOLIO_CONFIG.projectMatrix.map((proj, idx) => {
          // Layout in a grid
          const cols = 3;
          const x = (idx % cols) * 4.5 - 4.5;
          const y = -Math.floor(idx / cols) * 2.5 + 2.5;
          return (
            <ProjectCard 
              key={proj.id} 
              project={proj} 
              position={[x, y, 0]} 
              color={theme.tokens.surface} 
            />
          );
        })}
      </group>

      <ContactShadows position={[0, -5, 0]} opacity={0.4} scale={50} blur={2} far={10} />
      <Environment preset="city" />
    </>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <SceneContent />
    </Canvas>
  );
}
