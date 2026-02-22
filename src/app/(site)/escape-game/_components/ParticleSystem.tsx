"use client";

import type { Particle } from "../_lib/particle-engine";

type Props = {
  particles: Particle[];
};

export default function ParticleSystem({ particles }: Props) {
  if (particles.length === 0) return null;
  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="pointer-events-none absolute"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: p.opacity,
            borderRadius: p.type === "sparkle" ? "1px" : "50%",
            transform: p.type === "sparkle" ? "rotate(45deg)" : undefined,
          }}
        />
      ))}
    </>
  );
}
