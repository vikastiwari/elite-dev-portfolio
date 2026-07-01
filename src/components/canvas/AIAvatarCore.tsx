import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { audioEngine } from '../../utils/audioEngine';
import { useStore } from '../../store/useStore';

// We use a standard Ready Player Me public avatar ID for the "Real 3D Avatar". 
// You can replace this URL with your own custom RPM avatar URL in the future.
const AVATAR_URL = 'https://models.readyplayer.me/64bfa15f0e72c63d7c393481.glb?morphTargets=ARKit,Oculus+Visemes';

export default function AIAvatarCore() {
  const group = useRef<THREE.Group>(null);
  const { scene, nodes } = useGLTF(AVATAR_URL) as any;
  const { mouse } = useThree();
  const toggleHackerMode = useStore(state => state.toggleHackerMode);

  // Fallback state if the RPM model structure is unexpected
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (nodes && nodes.Wolf3D_Head && nodes.Wolf3D_Teeth) {
      setIsReady(true);
    }
  }, [nodes]);

  useFrame(() => {
    if (!group.current || !isReady) return;

    // 1. Cursor Tracking (Head/Neck Bones)
    const neck = nodes.Neck;
    const head = nodes.Head;
    
    if (neck && head) {
      // Map mouse coordinates to rotation angles (limited range)
      const targetX = -mouse.y * 0.5;
      const targetY = mouse.x * 0.8;
      
      neck.rotation.x = THREE.MathUtils.lerp(neck.rotation.x, targetX * 0.5, 0.1);
      neck.rotation.y = THREE.MathUtils.lerp(neck.rotation.y, targetY * 0.5, 0.1);
      
      head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, targetX * 0.5, 0.1);
      head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, targetY * 0.5, 0.1);
    }

    // 2. Audio-Reactive Lip Sync (Visemes)
    const freqData = audioEngine.getFrequencyData();
    if (freqData) {
      let sum = 0;
      // Focus on lower vocal frequencies for mouth movement
      const limit = Math.min(20, freqData.length);
      for (let i = 0; i < limit; i++) {
        sum += freqData[i];
      }
      const avg = sum / limit;
      // Normalize to 0-1 range for morph target influence
      const audioForce = Math.min(1.0, avg / 128.0);
      
      const headMesh = nodes.Wolf3D_Head;
      const teethMesh = nodes.Wolf3D_Teeth;

      if (headMesh && headMesh.morphTargetDictionary && headMesh.morphTargetInfluences) {
        // Map audio force to the 'mouthOpen' or 'viseme_O' morph target
        const mouthOpenIndex = headMesh.morphTargetDictionary['mouthOpen'] || headMesh.morphTargetDictionary['viseme_O'];
        if (mouthOpenIndex !== undefined) {
          headMesh.morphTargetInfluences[mouthOpenIndex] = THREE.MathUtils.lerp(
            headMesh.morphTargetInfluences[mouthOpenIndex], 
            audioForce, 
            0.3
          );
        }
      }
      
      if (teethMesh && teethMesh.morphTargetDictionary && teethMesh.morphTargetInfluences) {
        const mouthOpenIndexTeeth = teethMesh.morphTargetDictionary['mouthOpen'] || teethMesh.morphTargetDictionary['viseme_O'];
        if (mouthOpenIndexTeeth !== undefined) {
          teethMesh.morphTargetInfluences[mouthOpenIndexTeeth] = THREE.MathUtils.lerp(
            teethMesh.morphTargetInfluences[mouthOpenIndexTeeth], 
            audioForce, 
            0.3
          );
        }
      }
    }
  });

  return (
    <group 
      ref={group} 
      position={[0, -1.5, 2]} // Lowered slightly so the torso is visible
      scale={2.5}
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

useGLTF.preload(AVATAR_URL);
