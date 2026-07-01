import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { InstancedRigidBodies, RapierRigidBody } from '@react-three/rapier';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

const COUNT = 150;

export default function Minigame() {
  const { mouse, viewport } = useThree();
  const api = useRef<RapierRigidBody[]>(null);
  const cursorRef = useRef<THREE.Mesh>(null);
  
  // Random positions for boxes
  const positions = Array.from({ length: COUNT }, () => [
    (Math.random() - 0.5) * 15,
    (Math.random() - 0.5) * 15,
    (Math.random() - 0.5) * 5
  ]);

  useFrame(() => {
    const targetX = (mouse.x * viewport.width) / 2;
    const targetY = (mouse.y * viewport.height) / 2;
    const mousePos = new THREE.Vector3(targetX, targetY, 0);

    if (cursorRef.current) {
        cursorRef.current.position.copy(mousePos);
    }

    if (!api.current) return;
    
    // Apply gravity well force towards mouse
    api.current.forEach((body) => {
      if (!body) return;
      const pos = body.translation();
      const bodyPos = new THREE.Vector3(pos.x, pos.y, pos.z);
      
      const dir = mousePos.clone().sub(bodyPos);
      const dist = dir.length();
      
      // Force calculation
      if (dist > 0.5) { // Prevent extreme forces at origin
        dir.normalize().multiplyScalar(40 / (dist * dist + 1));
        body.applyImpulse({ x: dir.x, y: dir.y, z: dir.z }, true);
      }
      
      // Linear damping to prevent infinite acceleration
      body.setLinearDamping(2);
      body.setAngularDamping(2);
    });
  });

  return (
    <group>
      <InstancedRigidBodies
        ref={api}
        positions={positions as any}
        colliders="cuboid"
      >
        <instancedMesh args={[undefined, undefined, COUNT]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#00ffcc" roughness={0.1} metalness={0.8} />
        </instancedMesh>
      </InstancedRigidBodies>
      
      {/* Visual Cursor Gravity Well */}
      <Box ref={cursorRef} args={[0.4, 0.4, 0.4]}>
         <meshBasicMaterial color="#ff0044" wireframe />
      </Box>
    </group>
  );
}
