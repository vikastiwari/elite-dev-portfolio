import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { audioEngine } from '../../utils/audioEngine';
import { useStore } from '../../store/useStore';
import { PORTFOLIO_CONFIG } from '../../config/portfolio.config';

export default function AIAvatarCore() {
  const headGroupRef = useRef<THREE.Group>(null);
  const jawRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  
  const { mouse, camera } = useThree();

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
       color: 0x222222,
       roughness: 0.2,
       metalness: 0.8,
       wireframe: true
    });
  }, []);

  const glowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({ color: 0x00ffcc });
  }, []);

  useFrame((state) => {
    const currentThemeId = useStore.getState().currentTheme;
    const theme = PORTFOLIO_CONFIG.themeEngine.find(t => t.id === currentThemeId) || PORTFOLIO_CONFIG.themeEngine[0];
    
    // Sync Glow Material
    glowMaterial.color.set(theme.tokens.accent);
    material.color.set(theme.tokens.primary);
    
    // 1. CURSOR TRACKING WITH QUATERNIONS
    if (headGroupRef.current) {
        // Map mouse (-1 to +1) to 3D space targets, exaggerated for movement
        const targetX = mouse.x * 3;
        const targetY = mouse.y * 3;
        
        // Target position to look at
        const targetVector = new THREE.Vector3(targetX, targetY, camera.position.z + 5);
        
        // Use Quaternion.slerp for smooth, organic rotation
        const currentQuat = headGroupRef.current.quaternion.clone();
        
        // Create a dummy object to calculate the target rotation
        const dummy = new THREE.Object3D();
        dummy.position.copy(headGroupRef.current.position);
        dummy.lookAt(targetVector);
        
        const targetQuat = dummy.quaternion;
        
        // Smoothly interpolate rotation (speed factor 0.1)
        currentQuat.slerp(targetQuat, 0.1);
        headGroupRef.current.quaternion.copy(currentQuat);
    }
    
    // 2. AUDIO LIP-SYNC (JAW MOVEMENT)
    const freqData = audioEngine.getFrequencyData();
    let audioForce = 0;
    if (freqData) {
      let sum = 0;
      const limit = Math.min(20, freqData.length);
      for (let i = 0; i < limit; i++) {
        sum += freqData[i];
      }
      const avg = sum / limit;
      audioForce = avg / 255.0; // 0 to 1
    }
    
    if (jawRef.current) {
        // Drop the jaw based on audio volume
        const targetJawY = -1.0 - (audioForce * 0.8);
        jawRef.current.position.y += (targetJawY - jawRef.current.position.y) * 0.2;
    }
    
    // Pulse eyes based on audio
    if (leftEyeRef.current && rightEyeRef.current) {
        const scale = 1 + audioForce * 1.5;
        leftEyeRef.current.scale.setScalar(scale);
        rightEyeRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={[0, 0, 0]} data-testid="ai-avatar-core">
      {/* Dynamic Tracking Head Group */}
      <group ref={headGroupRef}>
          {/* Main Skull */}
          <Box args={[2, 2.5, 2]} material={material} position={[0, 0.5, 0]} />
          
          {/* Audio-Reactive Jaw */}
          <Box ref={jawRef} args={[1.8, 0.8, 1.8]} material={material} position={[0, -1.0, 0]} />
          
          {/* Left Eye */}
          <Sphere ref={leftEyeRef} args={[0.3, 16, 16]} material={glowMaterial} position={[-0.5, 0.8, 1.05]} />
          
          {/* Right Eye */}
          <Sphere ref={rightEyeRef} args={[0.3, 16, 16]} material={glowMaterial} position={[0.5, 0.8, 1.05]} />
          
          {/* Brain Core (Floating inside) */}
          <Sphere args={[0.6, 16, 16]} material={glowMaterial} position={[0, 0.5, 0]}>
              <meshBasicMaterial color={0xffffff} transparent opacity={0.5} wireframe />
          </Sphere>
      </group>
    </group>
  );
}
