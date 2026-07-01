import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { WebGPURenderer, MeshBasicNodeMaterial } from 'three/webgpu';
import { Fn, storage, instanceIndex, vec3, color, float, positionLocal, time, sin, mix } from 'three/tsl';

export default function GitHubGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let renderer: WebGPURenderer | null = null;
    let animationFrameId: number;
    let isDestroyed = false;

    const init = async () => {
      const container = containerRef.current;
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      try {
        renderer = new WebGPURenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);
      } catch (e) {
        console.error("WebGPU not supported on this browser", e);
        container.innerHTML = `<div class="p-4 text-red-500 font-mono text-xs">WebGPU not supported by this browser. Cannot render 1M Particle TSL Compute Shader.</div>`;
        return;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.z = 14;
      camera.position.y = 2;
      camera.lookAt(0, 0, 0);

      // 1,000,000 Particles!
      const particleCount = 1000000;
      
      const basePositions = new Float32Array(particleCount * 3);
      const targetPositions = new Float32Array(particleCount * 3);
      
      for(let i=0; i<particleCount; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = 3.0; // Globe base radius
        
        // Base globe surface
        const bx = r * Math.sin(phi) * Math.cos(theta);
        const by = r * Math.sin(phi) * Math.sin(theta);
        const bz = r * Math.cos(phi);
        
        basePositions[i*3] = bx;
        basePositions[i*3+1] = by;
        basePositions[i*3+2] = bz;
        
        // Target: Popping out (simulating a commit burst)
        const burstMultiplier = Math.random() > 0.99 ? 1.5 : (Math.random() > 0.9 ? 1.1 : 1.0);
        targetPositions[i*3] = bx * burstMultiplier;
        targetPositions[i*3+1] = by * burstMultiplier;
        targetPositions[i*3+2] = bz * burstMultiplier;
      }

      const baseBuffer = new THREE.InstancedBufferAttribute(new Float32Array(basePositions), 3);
      const positionBuffer = new THREE.InstancedBufferAttribute(basePositions, 3);
      const targetBuffer = new THREE.InstancedBufferAttribute(targetPositions, 3);
      
      const baseStorage = storage(baseBuffer, 'vec3', particleCount);
      const positionStorage = storage(positionBuffer, 'vec3', particleCount);
      const targetStorage = storage(targetBuffer, 'vec3', particleCount);

      // The TSL Compute Shader
      const computeParticles = Fn(() => {
          const basePos = baseStorage.element(instanceIndex);
          const currentPos = positionStorage.element(instanceIndex);
          const targetPos = targetStorage.element(instanceIndex);
          
          const iFloat = float(instanceIndex);
          const speed = float(2.0);
          // Math: Smoothly pulse between 0 and 1
          const oscillation = sin(time.mul(speed).add(iFloat.mul(0.0001))).add(1.0).mul(0.5); 
          
          // Pure functional position calculation based on time
          const newPos = mix(basePos, targetPos, oscillation);
          
          currentPos.assign(newPos);
      });
      
      const computeNode = computeParticles().compute(particleCount);

      // Geometry and Material
      const geometry = new THREE.PlaneGeometry(0.015, 0.015);
      const material = new MeshBasicNodeMaterial({
        color: 0x00ffcc,
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });

      // Bind the compute storage to the vertex position
      material.positionNode = positionStorage.element(instanceIndex).add(positionLocal);

      const instancedMesh = new THREE.InstancedMesh(geometry, material, particleCount);
      scene.add(instancedMesh);

      const render = async () => {
        if (isDestroyed) return;
        
        // Rotate the globe slowly
        instancedMesh.rotation.y += 0.002;
        instancedMesh.rotation.x += 0.0005;

        await renderer!.compute(computeNode);
        await renderer!.renderAsync(scene, camera);
        animationFrameId = requestAnimationFrame(render);
      };

      render();

      const handleResize = () => {
        if (!containerRef.current || !renderer) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);
    };

    init();

    return () => {
      isDestroyed = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (renderer && containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] bg-[var(--color-bg-secondary)] border-t border-[var(--color-primary)]/10 flex items-center justify-center overflow-hidden">
      <div className="absolute top-8 left-8 z-10 font-mono text-xs text-[var(--color-text)] bg-[var(--color-bg)]/80 p-4 rounded border border-[var(--color-primary)]/20 backdrop-blur-md">
        <div className="text-neon-cyan mb-2">{'>> ORBITAL_COMMAND_SYNC'}</div>
        <div>MODULE: LIVE_GITHUB_COMMITS</div>
        <div>RENDERER: WEBGPU</div>
        <div>SHADER: TSL_COMPUTE</div>
        <div>PARTICLES: 1,000,000</div>
        <div className="mt-2 text-neon-green animate-pulse">STATUS: COMPUTE_SHADER_ACTIVE</div>
      </div>
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
