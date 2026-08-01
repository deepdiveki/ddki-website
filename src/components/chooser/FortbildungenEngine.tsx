"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, OrthographicCamera } from "@react-three/drei";
import { useRef } from "react";
import type { Group, OrthographicCamera as OrthographicCameraType } from "three";

const PURPLE = "#8646F4";
const PURPLE_LIGHT = "#A78BFA";
const BLUE = "#3B82F6";

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
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.4;
  });
  return (
    <group ref={ref}>
      <Icosahedron args={[0.7, 1]}>
        <meshStandardMaterial
          color={BLUE}
          emissive={BLUE}
          emissiveIntensity={2.2}
          metalness={0.4}
          roughness={0.3}
        />
      </Icosahedron>
      <mesh>
        <icosahedronGeometry args={[0.78, 1]} />
        <meshBasicMaterial
          color={PURPLE_LIGHT}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

function Ring({
  tilt,
  speed,
  radius,
}: {
  tilt: [number, number, number];
  speed: number;
  radius: number;
}) {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.getElapsedTime() * speed;
  });
  return (
    <group rotation={tilt}>
      <group ref={ref}>
        <Wire color={PURPLE} opacity={0.65}>
          <torusGeometry args={[radius, 0.02, 6, 48]} />
        </Wire>
        {/* Orbiting node */}
        <group position={[radius, 0, 0]}>
          <Wire color={PURPLE_LIGHT} opacity={0.95}>
            <octahedronGeometry args={[0.13, 0]} />
          </Wire>
        </group>
      </group>
    </group>
  );
}

function KnowledgeCore() {
  const groupRef = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group ref={groupRef} scale={1.05}>
      <Core />
      <Ring tilt={[Math.PI / 2.2, 0, 0]} speed={0.5} radius={1.5} />
      <Ring tilt={[Math.PI / 2.4, Math.PI / 3, Math.PI / 4]} speed={-0.4} radius={1.85} />
      <Ring tilt={[Math.PI / 3, Math.PI / 2, 0]} speed={0.32} radius={2.15} />
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
    <OrthographicCamera ref={ref} makeDefault zoom={38} position={[6, 4.5, 6]} />
  );
}

export default function FortbildungenEngine() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none", background: "transparent" }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 6, 8]} intensity={0.5} />
      <KnowledgeCore />
      <Camera />
    </Canvas>
  );
}
