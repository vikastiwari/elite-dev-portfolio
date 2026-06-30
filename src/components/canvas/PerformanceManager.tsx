import React from 'react';
import { PerformanceMonitor } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

export default function PerformanceManager() {
  const { gl } = useThree();

  return (
    <PerformanceMonitor
      onIncline={() => gl.setPixelRatio(Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 1))}
      onDecline={() => gl.setPixelRatio(1)}
    />
  );
}
