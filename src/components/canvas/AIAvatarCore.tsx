import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { TorusKnot } from '@react-three/drei';
import * as THREE from 'three';
import { audioEngine } from '../../utils/audioEngine';
import { useStore } from '../../store/useStore';
import { PORTFOLIO_CONFIG } from '../../config/portfolio.config';

export default function AIAvatarCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a raw shader material that distorts vertices based on an audio uniform
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        audioFrequency: { value: 0 },
        primaryColor: { value: new THREE.Color() },
        accentColor: { value: new THREE.Color() }
      },
      vertexShader: `
        uniform float time;
        uniform float audioFrequency;
        varying vec2 vUv;
        varying vec3 vNormal;
        
        // Simple noise function
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        
        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          
          vec3 i  = floor(v + dot(v, C.yyy) );
          vec3 x0 = v - i + dot(i, C.xxx) ;
          
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min( g.xyz, l.zxy );
          vec3 i2 = max( g.xyz, l.zxy );
          
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          
          i = mod289(i);
          vec4 p = permute( permute( permute(
                     i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                   + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                   + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
                   
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_ );
          
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          
          vec4 b0 = vec4( x.xy, y.xy );
          vec4 b1 = vec4( x.zw, y.zw );
          
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
          
          vec3 p0 = vec3(a0.xy,h.x);
          vec3 p1 = vec3(a0.zw,h.y);
          vec3 p2 = vec3(a1.xy,h.z);
          vec3 p3 = vec3(a1.zw,h.w);
          
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;
          
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
        }

        void main() {
          vUv = uv;
          vNormal = normal;
          
          // Calculate noise based displacement
          float noise = snoise(position * 2.0 + time);
          
          // audioFrequency is scaled 0 to 1
          float displacement = noise * (0.2 + audioFrequency * 0.8);
          vec3 newPosition = position + normal * displacement;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 primaryColor;
        uniform vec3 accentColor;
        uniform float audioFrequency;
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          float intensity = 0.5 + 0.5 * audioFrequency;
          
          // Mix between primary and accent colors based on geometry UV and audio intensity
          float mixFactor = clamp(vUv.y + audioFrequency - 0.2, 0.0, 1.0);
          vec3 mixedColor = mix(primaryColor, accentColor, mixFactor);
          
          vec3 finalColor = mixedColor * intensity;
          
          // Add some fake fresnel
          float fresnel = dot(vNormal, vec3(0.0, 0.0, 1.0));
          fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
          fresnel = pow(fresnel, 2.0);
          
          gl_FragColor = vec4(finalColor + vec3(fresnel), 1.0);
        }
      `,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
  }, []);

  useFrame((state) => {
    if (material) {
      material.uniforms.time.value = state.clock.elapsedTime;
      
      const currentThemeId = useStore.getState().currentTheme;
      const theme = PORTFOLIO_CONFIG.themeEngine.find(t => t.id === currentThemeId) || PORTFOLIO_CONFIG.themeEngine[0];
      material.uniforms.primaryColor.value.set(theme.tokens.primary);
      material.uniforms.accentColor.value.set(theme.tokens.accent);
      
      const freqData = audioEngine.getFrequencyData();
      if (freqData) {
        // Calculate average volume for low frequencies (bass)
        let sum = 0;
        const limit = Math.min(20, freqData.length);
        for (let i = 0; i < limit; i++) {
          sum += freqData[i];
        }
        const avg = sum / limit;
        const normalized = avg / 255.0;
        
        // Lerp for smooth transitions to prevent jittering
        material.uniforms.audioFrequency.value += (normalized - material.uniforms.audioFrequency.value) * 0.1;
      }
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }
  });

  return (
    <group position={[0, 0, 0]} data-testid="ai-avatar-core">
      <TorusKnot ref={meshRef} args={[1.5, 0.4, 128, 32]} material={material} />
    </group>
  );
}
