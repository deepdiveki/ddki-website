"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInstant } from "./motion";

/**
 * Bausteine für Folien auf der 1920×1080-Bühne. Schriftgrößen sind absolut,
 * weil die Bühne als Ganzes skaliert wird.
 */

export function SlideFrame({
  children,
  className,
  theme = "light",
}: {
  children: React.ReactNode;
  className?: string;
  theme?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden",
        theme === "light"
          ? "bg-background-secondary text-text-primary"
          : "bg-[#0b0820] text-white",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Brand({ theme = "light" }: { theme?: "light" | "dark" }) {
  return (
    <div className="absolute top-14 left-20 flex items-center gap-4">
      <Image
        src="/images/ddki-logo.svg"
        alt=""
        width={44}
        height={44}
        className={cn("size-11", theme === "dark" && "invert")}
      />
      <span className="text-[26px] font-medium tracking-tight">DeepDiveKI</span>
    </div>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[22px] font-semibold tracking-[0.18em] text-primary-dark uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Headline({
  children,
  className,
  size = "lg",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "md" | "lg" | "xl";
}) {
  const sizes = {
    md: "text-[72px] leading-[1.05]",
    lg: "text-[104px] leading-[1.02]",
    xl: "text-[160px] leading-[0.95]",
  };
  return (
    <h2
      className={cn(
        "font-semibold tracking-[-0.03em] text-balance",
        sizes[size],
        className,
      )}
    >
      {children}
    </h2>
  );
}

/** Blendet Inhalt ab einem Enthüllungsschritt ein. */
export function Reveal({
  when,
  step,
  children,
  className,
  keepSpace = true,
}: {
  when: number;
  step: number;
  children: React.ReactNode;
  className?: string;
  keepSpace?: boolean;
}) {
  const visible = step >= when;
  const instant = useInstant();
  if (instant) {
    return (
      <div
        className={cn(!visible && (keepSpace ? "invisible" : "hidden"), className)}
        aria-hidden={!visible}
      >
        {children}
      </div>
    );
  }
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 24 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={cn(!visible && !keepSpace && "hidden", className)}
      aria-hidden={!visible}
    >
      {children}
    </motion.div>
  );
}

/** Gestaffeltes Einblenden beim Betreten der Folie. */
export function Stagger({
  index,
  active,
  children,
  className,
}: {
  index: number;
  active: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const instant = useInstant();
  if (instant) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 + index * 0.12 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export const GRADIENTS = {
  aurora: "linear-gradient(155deg,#5ee0d0 0%,#6f8dff 42%,#a78bfa 74%,#c6bdfa 100%)",
  purple: "linear-gradient(155deg,#8b5cf6 0%,#a78bfa 38%,#d68cfa 72%,#f0bdfa 100%)",
  ocean: "linear-gradient(155deg,#6f8dff 0%,#8b7cf6 50%,#b89bfa 100%)",
} as const;

/** Große Variante der GrainCard für die Bühne (kein max-w, größere Radien). */
export function StageGrainCard({
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
      className={cn("relative overflow-hidden rounded-[40px] p-10 shadow-2xl", className)}
      style={{ background: GRADIENTS[gradient] }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE}")`, backgroundSize: "140px 140px" }}
      />
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  );
}

export function StageGlassPanel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/25 bg-white/10 p-8 backdrop-blur-md",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function GreenDot({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "mt-3 flex size-6 shrink-0 items-center justify-center rounded-full border-[3px] border-emerald-300/90",
        className,
      )}
    >
      <span className="size-2 rounded-full bg-emerald-300" />
    </span>
  );
}

/** QR-Code für Publikums-Links, lokal erzeugt (kein externer Dienst). */
export function QrCode({
  value,
  size = 420,
  className,
}: {
  value: string;
  size?: number;
  className?: string;
}) {
  const [src, setSrc] = useState<string>();
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) =>
      QRCode.toDataURL(value, {
        width: size * 2,
        margin: 1,
        errorCorrectionLevel: "M",
        color: { dark: "#181b25", light: "#ffffff" },
      }).then((url) => {
        if (!cancelled) setSrc(url);
      }),
    );
    return () => {
      cancelled = true;
    };
  }, [value, size]);
  return (
    <div
      className={cn("flex items-center justify-center rounded-[28px] bg-white p-6 shadow-xl", className)}
      style={{ width: size, height: size }}
    >
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={`QR-Code: ${value}`} width={size - 48} height={size - 48} />
      )}
    </div>
  );
}
