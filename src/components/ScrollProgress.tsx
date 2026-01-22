"use client";

import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const updateProgress = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - doc.clientHeight;
      const next = maxScroll > 0 ? (doc.scrollTop / maxScroll) * 100 : 0;
      const clamped = Math.min(100, Math.max(0, next));
      setProgress(clamped);
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        updateProgress();
        rafId = null;
      });
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div className="pointer-events-none fixed right-4 top-1/2 z-9999 -translate-y-1/2">
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-full border border-white/10 bg-dark/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 backdrop-blur">
          {Math.round(progress)}%
        </div>
        <div className="flex h-40 w-2 items-end overflow-hidden rounded-full border border-white/10 bg-white/5">
          <div
            className="w-full bg-gradient-to-t from-purple-light to-pink-light transition-[height] duration-150 ease-out"
            style={{ height: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollProgress;
