import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { audioEngine } from '../../utils/audioEngine';
import { useStore } from '../../store/useStore';

export default function AIAvatarCore() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/DamagedHelmet.glb') as any;
  const { mouse } = useThree();
  const toggleHackerMode = useStore(state => state.toggleHackerMode);

  useFrame(() => {
    if (group.current) {
      // 1. Cursor Tracking (The Helmet looks at the mouse)
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.x * 1.5, 0.1);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -mouse.y * 1.5, 0.1);

      // 2. Audio Pulse
      const freqData = audioEngine.getFrequencyData();
      if (freqData) {
        let sum = 0;
        const limit = Math.min(20, freqData.length);
        for (let i = 0; i < limit; i++) {
          sum += freqData[i];
        }
        const avg = sum / limit;
        const audioForce = avg / 255.0; // 0 to 1
        
        // Base scale + audio pulse
        const baseScale = 2.0;
        const targetScale = baseScale + (audioForce * 0.3);
        
        group.current.scale.lerp(
          new THREE.Vector3(targetScale, targetScale, targetScale), 
          0.2
        );
      }
    }
  });

  return (
    <group 
      ref={group} 
      position={[0, 0, 0]} 
      data-testid="ai-avatar-core"
      onClick={(e) => {
        e.stopPropagation();
        toggleHackerMode();
      }}
      onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; }}
    >
      <primitive object={scene} />
      
      {/* PBR Environment for hyper-realistic metallic reflections */}
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
    </group>
  );
}

useGLTF.preload('/DamagedHelmet.glb');
