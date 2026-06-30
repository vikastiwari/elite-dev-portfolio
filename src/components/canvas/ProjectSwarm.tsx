import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { InstancedRigidBodies, RapierRigidBody } from '@react-three/rapier';
import { PORTFOLIO_CONFIG } from '../../config/portfolio.config';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

const GRAVITY_CONSTANT = 0.5;

export default function ProjectSwarm() {
  const projects = PORTFOLIO_CONFIG.projectMatrix;
  const count = projects.length;
  const api = useRef<RapierRigidBody[]>(null);
  const setActiveProject = useStore((state) => state.setActiveProject);

  const positions = useMemo(() => {
    return Array.from({ length: count }, () => [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
    ]) as [number, number, number][];
  }, [count]);

  useFrame(() => {
    if (!api.current) return;
    
    // N-body gravity towards center [0,0,0]
    api.current.forEach((body) => {
      if (!body) return;
      const pos = body.translation();
      const distance = Math.sqrt(pos.x ** 2 + pos.y ** 2 + pos.z ** 2);
      const forceMag = (GRAVITY_CONSTANT * 1) / (distance ** 2 + 0.1); // avoid /0
      
      body.applyImpulse(
        {
          x: -pos.x * forceMag,
          y: -pos.y * forceMag,
          z: -pos.z * forceMag,
        },
        true
      );
    });
  });

  return (
    <InstancedRigidBodies
      ref={api}
      positions={positions}
      colliders="ball"
      restitution={0.8}
      friction={0.1}
      linearDamping={0.5}
    >
      <instancedMesh 
        args={[undefined, undefined, count]} 
        onClick={(e) => {
          e.stopPropagation();
          const instanceId = e.instanceId;
          if (instanceId !== undefined && projects[instanceId]) {
            setActiveProject(projects[instanceId].id);
          }
        }}
        onPointerOver={(e) => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#00ff9f" roughness={0.2} metalness={0.8} />
      </instancedMesh>
    </InstancedRigidBodies>
  );
}
