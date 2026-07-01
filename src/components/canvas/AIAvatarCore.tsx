import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { audioEngine } from '../../utils/audioEngine';
import { useStore } from '../../store/useStore';

export default function AIAvatarCore() {
  const group = useRef<THREE.Group>(null);
  // Reverted to DamagedHelmet as the reliable local asset
  const { scene } = useGLTF('/DamagedHelmet.glb') as any;
  const { mouse } = useThree();
  const toggleHackerMode = useStore(state => state.toggleHackerMode);

  // Extract materials that have emissive properties to pulse them
  const emissiveMaterials = useMemo(() => {
    const materials: THREE.MeshStandardMaterial[] = [];
    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        // Clone material so we don't mutate the cached GLTF globally
        child.material = child.material.clone();
        if (child.material.emissive) {
          materials.push(child.material);
        }
      }
    });
    return materials;
  }, [scene]);

  useFrame((state) => {
    if (group.current) {
      const time = state.clock.elapsedTime;

      // 1. Digital Twin Cursor Tracking (Helmet tracks mouse)
      const targetX = mouse.x * 1.2;
      const targetY = mouse.y * 1.2;
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.1);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetY, 0.1);
      
      // Add a subtle floating animation (Google AI style)
      group.current.position.y = Math.sin(time * 2) * 0.1;

      // 2. Audio-Reactive "Glowing Core"
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

      // Pulse the scale slightly
      const targetScale = 2.0 + (audioForce * 0.4);
      group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.2);

      // Pulse the emissive glowing lights (Eyes/Core) on the helmet
      const emissiveIntensity = 1 + (audioForce * 10.0); // massive glow when speaking
      emissiveMaterials.forEach(mat => {
        mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, emissiveIntensity, 0.2);
      });
    }
  });

  return (
    <group 
      ref={group} 
      position={[0, 0, 0]} 
      scale={2.0}
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
