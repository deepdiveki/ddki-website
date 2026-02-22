/** Pure-function particle engine — no React dependency. */

export type ParticleType = "dust" | "sparkle" | "burst" | "hit" | "ambient";

export type Particle = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  opacity: number;
  type: ParticleType;
};

let nextId = 0;
const pid = () => ++nextId;

const HARD_CAP = 40;
const MOBILE_CAP = 20;

export function getParticleCap(viewportWidth: number): number {
  return viewportWidth < 600 ? MOBILE_CAP : HARD_CAP;
}

/** Advance all particles by dt seconds. Remove dead particles. */
export function updateParticles(particles: Particle[], dt: number): Particle[] {
  const result: Particle[] = [];
  for (const p of particles) {
    const next: Particle = {
      ...p,
      x: p.x + p.vx * dt,
      y: p.y + p.vy * dt,
      vy: p.vy + 180 * dt, // light gravity
      life: p.life - dt,
      opacity: Math.max(0, p.life / p.maxLife),
    };
    if (next.life > 0) {
      result.push(next);
    }
  }
  return result;
}

/* ─── spawn factories ─── */

function randomRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function spawnDust(x: number, y: number, count: number = 4): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: pid(),
      x: x + randomRange(-8, 8),
      y: y + randomRange(-2, 0),
      vx: randomRange(-30, 30),
      vy: randomRange(-50, -20),
      life: randomRange(0.25, 0.45),
      maxLife: 0.45,
      size: randomRange(2, 4),
      color: "rgba(161,137,104,0.8)",
      opacity: 1,
      type: "dust",
    });
  }
  return particles;
}

export function spawnRunDust(x: number, y: number): Particle[] {
  return [{
    id: pid(),
    x: x + randomRange(-3, 3),
    y: y,
    vx: randomRange(-15, 15),
    vy: randomRange(-25, -10),
    life: randomRange(0.18, 0.3),
    maxLife: 0.3,
    size: randomRange(1.5, 3),
    color: "rgba(161,137,104,0.6)",
    opacity: 1,
    type: "dust",
  }];
}

export function spawnSparkle(x: number, y: number, count: number = 7): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + randomRange(-0.3, 0.3);
    const speed = randomRange(40, 90);
    particles.push({
      id: pid(),
      x: x + randomRange(-4, 4),
      y: y + randomRange(-4, 4),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 30,
      life: randomRange(0.3, 0.55),
      maxLife: 0.55,
      size: randomRange(2, 4),
      color: "rgba(250,204,21,0.9)",
      opacity: 1,
      type: "sparkle",
    });
  }
  return particles;
}

export function spawnBurst(x: number, y: number, count: number = 11): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + randomRange(-0.2, 0.2);
    const speed = randomRange(50, 110);
    particles.push({
      id: pid(),
      x: x + randomRange(-3, 3),
      y: y + randomRange(-3, 3),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 40,
      life: randomRange(0.35, 0.6),
      maxLife: 0.6,
      size: randomRange(2.5, 5),
      color: "rgba(239,68,68,0.85)",
      opacity: 1,
      type: "burst",
    });
  }
  return particles;
}

export function spawnHitParticles(x: number, y: number, count: number = 5): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: pid(),
      x: x + randomRange(-6, 6),
      y: y + randomRange(-6, 6),
      vx: randomRange(-60, 60),
      vy: randomRange(-80, -20),
      life: randomRange(0.25, 0.4),
      maxLife: 0.4,
      size: randomRange(2, 4),
      color: "rgba(239,68,68,0.9)",
      opacity: 1,
      type: "hit",
    });
  }
  return particles;
}

export function spawnAmbient(
  viewportLeft: number,
  viewportWidth: number,
  worldHeight: number,
  color: string,
  count: number = 3,
): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: pid(),
      x: viewportLeft + randomRange(0, viewportWidth),
      y: randomRange(20, worldHeight * 0.6),
      vx: randomRange(-8, 8),
      vy: randomRange(-12, -4),
      life: randomRange(1.5, 3),
      maxLife: 3,
      size: randomRange(2, 3.5),
      color,
      opacity: 1,
      type: "ambient",
    });
  }
  return particles;
}
