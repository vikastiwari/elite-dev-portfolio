import * as THREE from 'three';
import { WebGPURenderer, PointsNodeMaterial } from 'three/webgpu';
import { Fn, storage, instanceIndex, vec3 } from 'three/tsl';

const particleCount = 1000;
const positionBuffer = new THREE.InstancedBufferAttribute(new Float32Array(particleCount * 3), 3);
const positionStorage = storage(positionBuffer, 'vec3', particleCount);

const computeParticles = Fn(() => {
    const position = positionStorage.element(instanceIndex);
    position.addAssign(vec3(0.01, 0, 0));
});
const computeNode = computeParticles().compute(particleCount);

const material = new PointsNodeMaterial();
material.positionNode = positionStorage.element(instanceIndex);

console.log('SUCCESS');
