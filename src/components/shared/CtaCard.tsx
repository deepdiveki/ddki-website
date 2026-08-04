"use client";

import { motion } from "framer-motion";
import ButtonLink from "../ui/button-link-fortbildung";

export default function CtaCard() {
  return (
    <section className="bg-white px-4 py-10 md:py-14 lg:py-28 xl:px-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative isolate mx-auto flex max-w-304 items-center justify-center overflow-hidden rounded-[32px] py-10 [background:linear-gradient(155deg,#8b5cf6_0%,#a78bfa_38%,#d68cfa_72%,#f0bdfa_100%)] md:py-14 lg:py-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
          style={{
            backgroundImage:
              `url("data:image/svg+xml,%3Csvg xmlns=\x27http://www.w3.org/2000/svg\x27 width=\x27140\x27 height=\x27140\x27%3E%3Cfilter id=\x27n\x27%3E%3CfeTurbulence type=\x27fractalNoise\x27 baseFrequency=\x270.82\x27 numOctaves=\x273\x27 stitchTiles=\x27stitch\x27/%3E%3C/filter%3E%3Crect width=\x27100%25\x27 height=\x27100%25\x27 filter=\x27url(%23n)\x27/%3E%3C/svg%3E")`,
            backgroundSize: "140px 140px",
          }}
        />
        <div className="flex w-full flex-col items-center justify-center px-4 text-center lg:max-w-207.25">
          <h2 className="w-full max-w-[90%] text-display-sm font-semibold -tracking-[0.96px] text-white md:max-w-[60%] lg:max-w-162.5 lg:text-display-lg">
            Bereit für Ihre nächste Fortbildung?
          </h2>
          <p className="mt-2 max-w-100 text-sm font-light tracking-[0.48px] text-white/85 md:max-w-100 lg:mt-4 lg:max-w-130 lg:text-md">
            Entdecken Sie unser vielfältiges Angebot an Fortbildungen und finden
            Sie den passenden Kurs für Ihre berufliche Weiterentwicklung.
          </p>
          <div className="mt-6 flex gap-3 lg:mt-11">
            <ButtonLink href="/fortbildung/fortbildungen">
              Fortbildungen entdecken
            </ButtonLink>
            <ButtonLink href="/fortbildung/kontakt" variant="secondary">
              Kontakt aufnehmen
            </ButtonLink>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
