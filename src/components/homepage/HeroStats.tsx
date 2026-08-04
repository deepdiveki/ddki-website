"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const heroStats = [
  { value: 254, suffix: "+", subtitle: "Fortbildungen" },
  { value: 12, suffix: "", subtitle: "Themenbereiche" },
  { value: 98, suffix: " %", subtitle: "Zufriedenheit" },
];

export default function HeroStats() {
  return (
    <section className="bg-white py-10 md:py-14 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        transition={{ duration: 0.4 }}
        className="mx-auto flex max-w-304 flex-col items-center justify-between gap-10 px-4 py-8 md:flex-row xl:px-0"
      >
        <h2 className="max-w-125 text-display-sm font-semibold -tracking-[0.5px] text-text-primary lg:text-display-md xl:max-w-135.25">
          Hochwertige Fortbildungen für Ihren beruflichen Erfolg.
        </h2>

        <div className="flex w-full items-center gap-10 lg:w-fit lg:gap-16 xl:gap-20">
          {heroStats.map((stat) => (
            <Stat
              key={stat.subtitle}
              value={stat.value}
              suffix={stat.suffix}
              subtitle={stat.subtitle}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Stat({
  value,
  suffix,
  subtitle,
}: {
  value: number;
  suffix: string;
  subtitle: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    const duration = 1400;
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div ref={ref} className="space-y-1">
      <p className="bg-[linear-gradient(120deg,#8646F4_0%,#D345F8_100%)] bg-clip-text text-display-md font-semibold -tracking-[0.96px] text-transparent lg:text-display-lg">
        {display}
        {suffix}
      </p>
      <p className="text-sm text-text-secondary md:text-md">{subtitle}</p>
    </div>
  );
}
