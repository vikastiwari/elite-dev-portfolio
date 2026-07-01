import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Stars } from '@react-three/drei';
import ProjectSwarm from './ProjectSwarm';
import CertificationRing from './CertificationRing';
import CameraController from './CameraController';
import PerformanceManager from './PerformanceManager';

export default function OrbitalCanvas() {
  return (
    <div className="fixed inset-0 z-0 bg-transparent pointer-events-none" data-testid="orbital-canvas">
      <Canvas
        style={{ pointerEvents: 'auto' }}
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <PerformanceManager />
        <CameraController />
        
        <Physics gravity={[0, 0, 0]}>
          <ProjectSwarm />
          <CertificationRing />
        </Physics>
      </Canvas>
    </div>
  );
}
