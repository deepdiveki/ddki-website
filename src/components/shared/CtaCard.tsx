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
        className="relative isolate mx-auto flex max-w-304 items-center justify-center overflow-hidden rounded-3xl bg-[linear-gradient(180deg,rgba(221,215,254,0.40)_0%,#DDD7FE_100%)] bg-cover py-10 md:rounded-[28px] md:py-14 lg:py-20"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/bg-gradient.svg"
          alt=""
          role="presentation"
          aria-hidden="true"
          className="absolute inset-0 z-[-1] h-full w-full object-cover"
        />
        <div className="flex w-full flex-col items-center justify-center px-4 text-center lg:max-w-207.25">
          <h2 className="w-full max-w-[90%] text-display-sm font-light -tracking-[0.96px] text-text-primary md:max-w-[60%] lg:max-w-162.5 lg:text-display-lg">
            Bereit für Ihre nächste Fortbildung?
          </h2>
          <p className="mt-2 max-w-100 text-sm font-light tracking-[0.48px] text-text-secondary md:max-w-100 lg:mt-4 lg:max-w-130 lg:text-md">
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
