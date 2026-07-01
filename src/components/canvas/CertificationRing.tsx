import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { InstancedRigidBodies, RapierRigidBody } from '@react-three/rapier';
import { PORTFOLIO_CONFIG } from '../../config/portfolio.config';
import { useStore } from '../../store/useStore';

export default function CertificationRing() {
  const certs = PORTFOLIO_CONFIG.certificationGraph;
  const count = certs.length;
  const api = useRef<RapierRigidBody[]>(null);
  const themeIndex = useStore((state) => state.themeIndex);
  const theme = PORTFOLIO_CONFIG.themeEngine[themeIndex].tokens;

  const positions = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 10;
      return [
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 2, // slight vertical scatter
        Math.sin(angle) * radius,
      ];
    }) as [number, number, number][];
  }, [count]);

  useFrame(({ clock }) => {
    if (!api.current) return;
    const t = clock.getElapsedTime();
    
    // Make them orbit slowly
    api.current.forEach((body, i) => {
      if (!body) return;
      const angle = (i / count) * Math.PI * 2 + t * 0.1;
      const radius = 10;
      const targetX = Math.cos(angle) * radius;
      const targetZ = Math.sin(angle) * radius;
      const currentPos = body.translation();
      
      body.applyImpulse({
        x: (targetX - currentPos.x) * 0.01,
        y: -currentPos.y * 0.01,
        z: (targetZ - currentPos.z) * 0.01,
      }, true);
    });
  });

  return (
    <InstancedRigidBodies
      ref={api}
      positions={positions}
      colliders="ball"
      linearDamping={1}
    >
      <instancedMesh args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={theme.accent} emissive={theme.accent} emissiveIntensity={0.5} />
      </instancedMesh>
    </InstancedRigidBodies>
  );
}
