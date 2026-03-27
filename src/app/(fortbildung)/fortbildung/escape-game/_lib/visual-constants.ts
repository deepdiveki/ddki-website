/** Shared CSS keyframes and timing constants for escape-game visual effects. */

export const VISUAL_KEYFRAMES = `
@keyframes pixel-breathe {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-1px); }
}
@keyframes pixel-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
@keyframes pixel-shimmer {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.72; }
}
@keyframes pixel-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}
@keyframes pixel-glow {
  0%, 100% { box-shadow: 0 0 4px 1px rgba(234,179,8,0.3); }
  50% { box-shadow: 0 0 10px 3px rgba(234,179,8,0.6); }
}
@keyframes pixel-ring {
  0% { transform: scale(0.8); opacity: 0.7; }
  100% { transform: scale(1.6); opacity: 0; }
}
@keyframes pixel-trophy-bounce {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-2px) rotate(-3deg); }
  75% { transform: translateY(-2px) rotate(3deg); }
}

@media (prefers-reduced-motion: reduce) {
  .anim-breathe,
  .anim-bob,
  .anim-shimmer,
  .anim-pulse,
  .anim-glow,
  .anim-ring,
  .anim-trophy-bounce {
    animation: none !important;
  }
}
`;

export const ANIM = {
  breathe: "pixel-breathe 1.6s ease-in-out infinite",
  bob: "pixel-bob 1.2s ease-in-out infinite",
  shimmer: "pixel-shimmer 2s ease-in-out infinite",
  pulse: "pixel-pulse 2s ease-in-out infinite",
  glow: "pixel-glow 1.5s ease-in-out infinite",
  ring: "pixel-ring 1.2s ease-out infinite",
  trophyBounce: "pixel-trophy-bounce 1.4s ease-in-out infinite",
} as const;

export const DIMENSION_COLORS = {
  ueber: { accent: "#f59e0b", soft: "#fef3c7", glow: "rgba(245,158,11,0.5)" },
  durch: { accent: "#06b6d4", soft: "#cffafe", glow: "rgba(6,182,212,0.5)" },
  mit: { accent: "#f472b6", soft: "#fce7f3", glow: "rgba(244,114,182,0.5)" },
  trotz: { accent: "#f87171", soft: "#fee2e2", glow: "rgba(248,113,113,0.5)" },
} as const;

export type DimensionId = "ueber" | "durch" | "mit" | "trotz";
