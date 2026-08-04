"use client";

import { cn } from "@/lib/utils";

/**
 * Bausteine der neuen Landing-Design-Sprache: körnige Gradient-Karten
 * mit Glas-Panels und grünen Status-Punkten (wie Schulbüro-/Komplettkurs-Mockup).
 */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

const GRADIENTS = {
  /** Türkis → Blau → Lila (Schulbüro-Look) */
  aurora:
    "[background:linear-gradient(155deg,#5ee0d0_0%,#6f8dff_42%,#a78bfa_74%,#c6bdfa_100%)]",
  /** Lila → Pink (Komplettkurs-Look) */
  purple:
    "[background:linear-gradient(155deg,#8b5cf6_0%,#a78bfa_38%,#d68cfa_72%,#f0bdfa_100%)]",
  /** Blau → Lila (neutral) */
  ocean:
    "[background:linear-gradient(155deg,#6f8dff_0%,#8b7cf6_50%,#b89bfa_100%)]",
} as const;

export function GrainCard({
  gradient = "purple",
  className,
  children,
}: {
  gradient?: keyof typeof GRADIENTS;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-md overflow-hidden rounded-[32px] p-4 shadow-2xl sm:p-5",
        GRADIENTS[gradient],
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
        style={{
          backgroundImage: `url("${NOISE}")`,
          backgroundSize: "140px 140px",
        }}
      />
      <div className="relative flex flex-col gap-3">{children}</div>
    </div>
  );
}

export function GlassPanel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-md",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function GreenDot() {
  return (
    <span className="mt-1.5 flex size-3 shrink-0 items-center justify-center rounded-full border-2 border-emerald-300/90">
      <span className="size-1 rounded-full bg-emerald-300" />
    </span>
  );
}

export function GlassStep({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <GreenDot />
      <p className="text-sm text-white/95">{children}</p>
    </div>
  );
}
