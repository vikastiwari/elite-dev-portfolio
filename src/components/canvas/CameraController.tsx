import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useStore } from '../../store/useStore';
import * as THREE from 'three';

export default function CameraController() {
  const { camera } = useThree();
  const activeProject = useStore(state => state.activeProject);
  const isHackerMode = useStore(state => state.isHackerMode);

  useEffect(() => {
    if (activeProject) {
      // Zoom into a node (in a real app we'd get the node's position, for now we zoom to center)
      gsap.to(camera.position, {
        x: 0,
        y: 2,
        z: 5,
        duration: 1.5,
        ease: 'power3.inOut'
      });
    } else if (isHackerMode) {
      // Move camera back to view the whole matrix
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 25,
        duration: 2,
        ease: 'power2.inOut'
      });
    } else {
      // Default view
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 15,
        duration: 1.5,
        ease: 'power2.out'
      });
    }
  }, [activeProject, isHackerMode, camera.position]);

  return null;
}
