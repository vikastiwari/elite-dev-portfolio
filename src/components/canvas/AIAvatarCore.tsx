import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { audioEngine } from '../../utils/audioEngine';

export default function AIAvatarCore() {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF('/RobotExpressive.glb') as any;
  const { actions } = useAnimations(animations, group);
  const { mouse, camera } = useThree();

  useEffect(() => {
    // Play idle animation
    if (actions['Idle']) {
      actions['Idle'].play();
    }
  }, [actions]);

  useFrame(() => {
    // 1. CURSOR TRACKING WITH HEAD BONE
    if (nodes.Head) {
        // Smoothly interpolate rotation to look at mouse
        nodes.Head.rotation.y = THREE.MathUtils.lerp(nodes.Head.rotation.y, -mouse.x * 1.5, 0.1);
        nodes.Head.rotation.x = THREE.MathUtils.lerp(nodes.Head.rotation.x, mouse.y * 1.5, 0.1);
    }
    
    // 2. AUDIO REACTION
    const freqData = audioEngine.getFrequencyData();
    if (freqData && group.current) {
        let sum = 0;
        const limit = Math.min(20, freqData.length);
        for (let i = 0; i < limit; i++) {
          sum += freqData[i];
        }
        const avg = sum / limit;
        const audioForce = avg / 255.0; // 0 to 1
        
        // Scale the entire robot based on audio (subtle pulse)
        const targetScale = 1.0 + audioForce * 0.15;
        group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.2);
    }
  });

  return (
    <group ref={group} position={[0, -2, 0]} dispose={null} data-testid="ai-avatar-core">
      {/* Dynamic 3D Rigged Avatar */}
      <primitive object={nodes.Scene} />
      
      {/* Lighting for the model */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <directionalLight position={[-10, 10, -5]} intensity={0.5} />
    </group>
  );
}

useGLTF.preload('/RobotExpressive.glb');
