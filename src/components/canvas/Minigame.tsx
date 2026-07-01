import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

const COUNT = 150;

export default function Minigame() {
  const { mouse, viewport } = useThree();
  const apiRefs = useRef<(RapierRigidBody | null)[]>([]);
  const cursorRef = useRef<THREE.Mesh>(null);
  
  // Random positions for boxes
  const positions = useMemo(() => Array.from({ length: COUNT }, () => [
    (Math.random() - 0.5) * 15,
    (Math.random() - 0.5) * 15,
    (Math.random() - 0.5) * 5
  ]), []);

  useFrame(() => {
    const targetX = (mouse.x * viewport.width) / 2;
    const targetY = (mouse.y * viewport.height) / 2;
    const mousePos = new THREE.Vector3(targetX, targetY, 0);

    if (cursorRef.current) {
        cursorRef.current.position.copy(mousePos);
    }

    // Apply gravity well force towards mouse
    for (let i = 0; i < COUNT; i++) {
      const body = apiRefs.current[i];
      if (!body) continue;
      
      const pos = body.translation();
      const bodyPos = new THREE.Vector3(pos.x, pos.y, pos.z);
      
      const dir = mousePos.clone().sub(bodyPos);
      const dist = dir.length();
      
      // Force calculation
      if (dist > 0.5) { 
        dir.normalize().multiplyScalar(20 / (dist * dist + 1));
        body.applyImpulse({ x: dir.x, y: dir.y, z: dir.z }, true);
      }
      
      body.setLinearDamping(2);
      body.setAngularDamping(2);
    }
  });

  return (
    <group>
      {positions.map((pos, i) => (
        <RigidBody 
          key={i} 
          ref={(el) => (apiRefs.current[i] = el)} 
          position={pos as [number, number, number]} 
          colliders="cuboid"
        >
          <Box args={[0.5, 0.5, 0.5]}>
            <meshStandardMaterial color="#00ffcc" roughness={0.1} metalness={0.8} />
          </Box>
        </RigidBody>
      ))}
      
      {/* Visual Cursor Gravity Well */}
      <Box ref={cursorRef} args={[0.4, 0.4, 0.4]}>
         <meshBasicMaterial color="#ff0044" wireframe />
      </Box>
    </group>
  );
}
