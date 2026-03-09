"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, OrthographicCamera } from "@react-three/drei";
import { useRef } from "react";
import type { Group, OrthographicCamera as OrthographicCameraType } from "three";

const PURPLE = "#8646F4";
const PURPLE_LIGHT = "#A78BFA";
const ORANGE = "#ff8a00";

function Wire({
  children,
  color = PURPLE,
  opacity = 0.9,
  ...props
}: {
  children: React.ReactNode;
  color?: string;
  opacity?: number;
} & React.ComponentProps<"mesh">) {
  return (
    <mesh {...props}>
      {children}
      <meshBasicMaterial color={color} wireframe transparent opacity={opacity} />
    </mesh>
  );
}

function Core() {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.3;
  });
  return (
    <group ref={ref}>
      <Icosahedron args={[0.65, 1]}>
        <meshStandardMaterial
          color={ORANGE}
          emissive={ORANGE}
          emissiveIntensity={2.5}
          metalness={0.4}
          roughness={0.3}
          wireframe={false}
        />
      </Icosahedron>
      <mesh>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshBasicMaterial color={ORANGE} wireframe transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function MiniStack() {
  const groupRef = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group ref={groupRef} scale={1.1}>
      {/* Top cap */}
      <group position={[0, 1.4, 0]}>
        <Wire>
          <cylinderGeometry args={[0.7, 0.8, 0.5, 32, 1, true]} />
        </Wire>
        <Wire color={PURPLE_LIGHT} opacity={0.6}>
          <torusGeometry args={[0.75, 0.04, 6, 32]} />
        </Wire>
        {/* Fan blades */}
        <group position={[0, 0.25, 0]}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Wire
              key={i}
              rotation={[0, (i / 8) * Math.PI * 2, 0]}
              position={[
                Math.cos((i / 8) * Math.PI * 2) * 0.2,
                0,
                Math.sin((i / 8) * Math.PI * 2) * 0.2,
              ]}
              opacity={0.7}
            >
              <boxGeometry args={[0.03, 0.01, 0.35]} />
            </Wire>
          ))}
        </group>
      </group>

      {/* Upper disk */}
      <group position={[0, 0.8, 0]}>
        <Wire>
          <cylinderGeometry args={[0.95, 0.95, 0.08, 32]} />
        </Wire>
        <Wire color={PURPLE_LIGHT} opacity={0.5}>
          <torusGeometry args={[1.0, 0.03, 4, 32]} />
        </Wire>
      </group>

      {/* Core */}
      <Core />

      {/* Lower disk */}
      <group position={[0, -0.8, 0]}>
        <Wire>
          <cylinderGeometry args={[1.0, 1.0, 0.1, 32]} />
        </Wire>
        <Wire color={PURPLE_LIGHT} opacity={0.5}>
          <torusGeometry args={[1.05, 0.03, 4, 32]} />
        </Wire>
      </group>

      {/* Base unit */}
      <group position={[0, -1.4, 0]}>
        <Wire>
          <cylinderGeometry args={[0.85, 0.95, 0.6, 32, 1, true]} />
        </Wire>
        <Wire color={PURPLE_LIGHT} opacity={0.6}>
          <torusGeometry args={[0.9, 0.04, 6, 32]} />
        </Wire>
        {/* Vertical ribs */}
        {Array.from({ length: 10 }).map((_, i) => (
          <Wire
            key={i}
            rotation={[0, (i / 10) * Math.PI * 2, 0]}
            position={[
              Math.cos((i / 10) * Math.PI * 2) * 0.75,
              0,
              Math.sin((i / 10) * Math.PI * 2) * 0.75,
            ]}
            opacity={0.5}
          >
            <boxGeometry args={[0.03, 0.5, 0.03]} />
          </Wire>
        ))}
      </group>
    </group>
  );
}

function Camera() {
  const ref = useRef<OrthographicCameraType>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.position.x = Math.cos(t * 0.2) * 6;
      ref.current.position.z = Math.sin(t * 0.2) * 6;
      ref.current.position.y = 4.5;
      ref.current.lookAt(0, 0, 0);
    }
  });
  return (
    <OrthographicCamera
      ref={ref}
      makeDefault
      zoom={42}
      position={[6, 4.5, 6]}
    />
  );
}

export default function AIEngineMini() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none", background: "transparent" }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 6, 8]} intensity={0.5} />
      <MiniStack />
      <Camera />
    </Canvas>
  );
}
