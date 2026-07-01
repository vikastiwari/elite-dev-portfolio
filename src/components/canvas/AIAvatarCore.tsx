import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { audioEngine } from '../../utils/audioEngine';
import { useStore } from '../../store/useStore';

export default function AIAvatarCore() {
  const group = useRef<THREE.Group>(null);
  const { scene, nodes, materials } = useGLTF('/avatar.glb') as any;
  const { mouse } = useThree();
  const toggleHackerMode = useStore(state => state.toggleHackerMode);
  
  const [headBone, setHeadBone] = useState<THREE.Bone | null>(null);
  const [neckBone, setNeckBone] = useState<THREE.Bone | null>(null);

  useEffect(() => {
    // Find the head and neck bones dynamically (works for Mixamo/Xbot)
    let foundHead = null;
    let foundNeck = null;
    
    scene.traverse((child: any) => {
      if (child.isBone) {
        if (child.name.toLowerCase().includes('head')) {
          foundHead = child;
        }
        if (child.name.toLowerCase().includes('neck')) {
          foundNeck = child;
        }
      }
      
      // Make the materials look cyberpunk/holographic
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.material.transparent = true;
        child.material.opacity = 0.9;
        child.material.color.setHex(0x06b6d4); // Cyan tint
        child.material.emissive.setHex(0x000000);
        child.material.wireframe = false;
      }
    });

    setHeadBone(foundHead);
    setNeckBone(foundNeck);
  }, [scene]);

  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;

    // Subtle floating
    group.current.position.y = -2.5 + Math.sin(time * 2) * 0.05;

    // Audio Reactivity
    const freqData = audioEngine.getFrequencyData();
    let audioForce = 0;
    if (freqData) {
      let sum = 0;
      const limit = Math.min(20, freqData.length);
      for (let i = 0; i < limit; i++) {
        sum += freqData[i];
      }
      audioForce = (sum / limit) / 255.0; // 0 to 1
    }

    // 1. Digital Twin Cursor Tracking (Head/Neck bones)
    if (neckBone && headBone) {
      const targetX = -mouse.y * 0.8;
      const targetY = mouse.x * 0.8;
      
      // Add audio force to the X rotation so the robot nods to the beat!
      const nodAngle = audioForce * 0.5;

      neckBone.rotation.x = THREE.MathUtils.lerp(neckBone.rotation.x, targetX * 0.5 + nodAngle, 0.1);
      neckBone.rotation.y = THREE.MathUtils.lerp(neckBone.rotation.y, targetY * 0.5, 0.1);
      
      headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, targetX * 0.5 + nodAngle, 0.1);
      headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, targetY * 0.5, 0.1);
    } else {
      // Fallback: rotate the whole body if bones aren't found
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.x * 0.5, 0.1);
    }
  });

  return (
    <group 
      ref={group} 
      position={[0, -2.5, 1]} 
      scale={2.2}
      data-testid="ai-avatar-core"
      onClick={(e) => {
        e.stopPropagation();
        toggleHackerMode();
      }}
      onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; }}
    >
      <primitive object={scene} />
      
      {/* PBR Environment for hyper-realistic lighting */}
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#00ffcc" />
      <pointLight position={[-5, 5, 5]} intensity={1.0} color="#ff00ff" />
    </group>
  );
}

useGLTF.preload('/avatar.glb');
