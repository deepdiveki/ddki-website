"use client";

import { motion } from "framer-motion";

const heroStats = [
  { title: "254+", subtitle: "Fortbildungen" },
  { title: "12", subtitle: "Themenbereiche" },
  { title: "98%", subtitle: "Zufriedenheit" },
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
        <h2 className="max-w-125 text-display-sm text-text-primary lg:text-display-md xl:max-w-135.25">
          Hochwertige Fortbildungen für Ihren beruflichen Erfolg.
        </h2>

        <div className="flex w-full items-center gap-10 lg:w-fit lg:gap-16 xl:gap-20">
          {heroStats.map((stat) => (
            <Stat
              key={stat.title}
              title={stat.title}
              subtitle={stat.subtitle}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Stat({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="space-y-1">
      <h2 className="text-display-md -tracking-[0.96px] lg:text-display-lg">
        {title}
      </h2>
      <p className="text-sm text-text-secondary md:text-md">{subtitle}</p>
    </div>
  );
}
