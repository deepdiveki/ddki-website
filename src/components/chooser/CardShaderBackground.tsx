"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ScreenQuad } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Color, ShaderMaterial, Vector2 } from "three";

/* Soft gradient + radiating "sun" burst of grainy filaments + fine film grain. */

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uSeed;
  uniform float uHasSun;
  uniform vec2 uSunPos;
  uniform vec3 uBgA;
  uniform vec3 uBgB;
  uniform vec3 uSun;
  uniform vec3 uCore;
  varying vec2 vUv;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++){ v += a * noise(p); p = p * 2.0 + 1.7; a *= 0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    float t = uTime * uSpeed * 0.05;

    // Soft diagonal gradient (bottom-left -> top-right)
    float d = clamp((uv.x + uv.y) * 0.5, 0.0, 1.0);
    vec3 col = mix(uBgB, uBgA, d);
    col += 0.03 * (fbm(uv * 2.5 + t) - 0.5);

    // Radiating sun burst (optional)
    if (uHasSun > 0.5) {
      vec2 c = uv - uSunPos;
      c.x *= 1.2;
      float r = length(c);
      vec2 dir = c / max(r, 1e-3);

      float base = fbm(dir * 5.0 + uSeed + vec2(t * 0.5, -t * 0.5));
      float tex = fbm(dir * 16.0 + r * 5.0 - t * 1.3);
      float fil = pow(clamp(base * (0.55 + 0.9 * tex), 0.0, 1.0), 1.5);

      float rays = fil * smoothstep(0.60, 0.015, r);
      float glow = smoothstep(0.50, 0.04, r) * 0.30;
      float core = smoothstep(0.09, 0.0, r);

      col = mix(col, uSun, clamp(rays * 1.7 + glow, 0.0, 1.0));
      col = mix(col, uCore, core);

      col = mix(col, uSun, smoothstep(0.055, 0.0, length(uv - vec2(0.82, 0.30))) * 0.5);
      col = mix(col, uSun, smoothstep(0.045, 0.0, length(uv - vec2(0.76, 0.72))) * 0.4);
    }

    // Fine film grain
    float grain = hash(uv * 700.0 + floor(uTime * 20.0));
    col += (grain - 0.5) * 0.06;

    gl_FragColor = vec4(col, 1.0);
  }
`;

type Variant = "fortbildungen" | "software";

const CONFIG: Record<
  Variant,
  {
    bgA: string;
    bgB: string;
    sun: string;
    core: string;
    sunPos: [number, number];
    seed: number;
    speed: number;
    hasSun: boolean;
  }
> = {
  fortbildungen: {
    bgA: "#c4b5fd",
    bgB: "#7c86f0",
    sun: "#ffbf3a",
    core: "#fff2cf",
    sunPos: [0.6, 0.5],
    seed: 2.0,
    speed: 0.7,
    hasSun: false,
  },
  software: {
    bgA: "#54d6c2",
    bgB: "#6f86f0",
    sun: "#ffab24",
    core: "#fff0bf",
    sunPos: [0.58, 0.48],
    seed: 0.0,
    speed: 0.85,
    hasSun: true,
  },
};

function ShaderPlane({ variant }: { variant: Variant }) {
  const ref = useRef<ShaderMaterial>(null);
  const cfg = CONFIG[variant];

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: cfg.speed },
      uSeed: { value: cfg.seed },
      uSunPos: { value: new Vector2(cfg.sunPos[0], cfg.sunPos[1]) },
      uBgA: { value: new Color(cfg.bgA) },
      uBgB: { value: new Color(cfg.bgB) },
      uSun: { value: new Color(cfg.sun) },
      uCore: { value: new Color(cfg.core) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((_, delta) => {
    if (ref.current) ref.current.uniforms.uTime.value += delta;
  });

  return (
    <ScreenQuad>
      <shaderMaterial
        ref={ref}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
      />
    </ScreenQuad>
  );
}

export default function CardShaderBackground({ variant }: { variant: Variant }) {
  return (
    <Canvas
      gl={{ antialias: true }}
      dpr={[1, 1.5]}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      frameloop="always"
    >
      <ShaderPlane variant={variant} />
    </Canvas>
  );
}
