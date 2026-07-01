import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Stars } from '@react-three/drei';
import ProjectSwarm from './ProjectSwarm';
import CertificationRing from './CertificationRing';
import AIAvatarCore from './AIAvatarCore';
import CameraController from './CameraController';
import PerformanceManager from './PerformanceManager';
import Minigame from './Minigame';
import { useStore } from '../../store/useStore';

export default function OrbitalCanvas() {
  const isFocusMode = useStore((state) => state.isFocusMode);
  const isGameActive = useStore((state) => state.isGameActive);

  return (
    <div 
      className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-700 ease-in-out ${isFocusMode ? 'opacity-0' : 'opacity-100 bg-transparent'}`} 
      data-testid="orbital-canvas"
    >
      <Canvas
        frameloop={isFocusMode ? 'never' : 'always'}
        style={{ pointerEvents: 'auto' }}
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <PerformanceManager />
        <CameraController />
        
        {!isGameActive && <AIAvatarCore />}

        <Physics gravity={[0, 0, 0]}>
          {isGameActive ? (
            <Minigame />
          ) : (
            <>
              <ProjectSwarm />
              <CertificationRing />
            </>
          )}
        </Physics>
      </Canvas>
    </div>
  );
}
