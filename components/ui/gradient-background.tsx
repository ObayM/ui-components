'use client';

import React, { useRef, useMemo, JSX } from 'react';
import { Canvas, useFrame, RootState } from '@react-three/fiber';
import * as THREE from 'three';

type ShaderUniforms = {
  uTime: { value: number };
  uColor1: { value: THREE.Color };
  uColor2: { value: THREE.Color };
};

interface CustomShaderMaterial extends THREE.ShaderMaterial {
  uniforms: ShaderUniforms;
  
}


function BackgroundShader(): JSX.Element {
  const material = useRef<CustomShaderMaterial | null>(null);

  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#191970') }, 
      uColor2: { value: new THREE.Color('#468FEA') },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying vec2 vUv;

      float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.y * u.x;
      }
      
      float fbm(vec2 st) {
          float value = 0.0;
          float amplitude = 0.5;

          for (int i = 0; i < 4; i++) {
              value += amplitude * noise(st);
              st *= 2.0;
              amplitude *= 0.5;
          }
          return value;
      }

      void main() {
        vec2 st = vUv * 1.0;
        float slowTime = uTime * 0.02;
        float noisePattern = fbm(st + slowTime);
        float mixFactor = smoothstep(0.3, 0.7, noisePattern);
        vec3 color = mix(uColor1, uColor2, mixFactor);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `
  }), []);


  useFrame((state: RootState) => {

    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />

      <shaderMaterial ref={material} args={[shaderArgs]} />
    </mesh>
  );
}



const Background: React.FC = () => {
  return (
    <div className="absloute top-0 left-0 w-full h-full -z-20 ">
      <Canvas>
        <BackgroundShader />
      </Canvas>
    </div>
  );
}

export default Background;