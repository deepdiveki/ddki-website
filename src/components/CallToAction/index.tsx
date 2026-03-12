"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <section className="py-17.5 lg:py-22.5 xl:py-27.5">
      <motion.div
        className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div
          className="relative z-10 overflow-hidden rounded-[30px] px-4 py-20 shadow-lg lg:py-25"
          style={{
            background:
              "linear-gradient(180deg, rgba(221,215,254,0.5) 0%, #DDD7FE 100%)",
          }}
        >
          {/* Grid pattern overlay */}
          <div
            className="pointer-events-none absolute inset-0 sw-grid-pattern-lg"
            style={{ opacity: 0.5 }}
            aria-hidden="true"
          />

          {/* Decorative glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2"
            style={{
              background:
                "radial-gradient(ellipse, rgba(140,113,246,0.15) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="sw-glass relative mb-4 inline-flex items-center gap-2 rounded-full border border-border-tertiary px-4.5 py-2 text-sm font-medium text-primary-darker shadow-sm"
            >
              Starten mit Künstlicher Intelligenz
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="mb-4.5 text-display-sm -tracking-[0.96px] text-text-primary lg:text-display-lg"
            >
              Integrieren Sie den DeepChat in Ihre Schule
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="mx-auto mb-9 max-w-[714px] text-md font-light text-text-secondary"
            >
              Wir helfen Ihnen dabei, die KI-Technologie in Ihre IT-Systeme zu integrieren. Unsere KI-Produkte sind benutzerfreundlich und einfach zu bedienen. Probieren Sie es aus!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            >
              <Link
                href="https://toolbox.deepdive-ki.de/"
                className="inline-flex rounded-lg bg-primary-darker px-7 py-3 font-medium text-white shadow-md duration-300 ease-in hover:bg-primary-dark hover:shadow-lg"
              >
                Jetzt DeepChat ausprobieren
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
