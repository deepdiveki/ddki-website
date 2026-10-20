"use client";

import { cn } from "@/lib/utils";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { STAGE_HEIGHT, STAGE_WIDTH } from "./types";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Feste 1920×1080-Bühne, die in ihren Container eingepasst wird.
 * Folien werden einmal für Full-HD gestaltet und auf jedem Beamer
 * (4:3, 16:10, 4K) proportional skaliert.
 */
export default function Stage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      setScale(Math.min(width / STAGE_WIDTH, height / STAGE_HEIGHT));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("relative h-full w-full overflow-hidden", className)}>
      <div
        className="absolute top-1/2 left-1/2 overflow-hidden"
        style={{
          width: STAGE_WIDTH,
          height: STAGE_HEIGHT,
          transform: `translate(-50%, -50%) scale(${scale ?? 0})`,
          transformOrigin: "center",
          visibility: scale === null ? "hidden" : "visible",
        }}
      >
        {children}
      </div>
    </div>
  );
}
