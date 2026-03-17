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
              "linear-gradient(180deg, rgba(20,14,48,0.8) 0%, rgba(30,22,64,0.9) 100%)",
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
              className="sw-glass relative mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-primary-light"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1C12 1 12.7 5.3 14.7 7.3C16.7 9.3 21 10 21 10C21 10 16.7 10.7 14.7 12.7C12.7 14.7 12 19 12 19C12 19 11.3 14.7 9.3 12.7C7.3 10.7 3 10 3 10C3 10 7.3 9.3 9.3 7.3C11.3 5.3 12 1 12 1Z"/><path d="M19 15C19 15 19.4 17.1 20.1 17.9C20.9 18.6 23 19 23 19C23 19 20.9 19.4 20.1 20.1C19.4 20.9 19 23 19 23C19 23 18.6 20.9 17.9 20.1C17.1 19.4 15 19 15 19C15 19 17.1 18.6 17.9 17.9C18.6 17.1 19 15 19 15Z" opacity="0.7"/><circle cx="20" cy="5" r="1" opacity="0.5"/></svg>
              Starten mit Künstlicher Intelligenz
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="mb-4.5 text-display-sm font-bold -tracking-[0.96px] text-white lg:text-display-lg"
            >
              Integrieren Sie den DeepChat in Ihre Schule
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="mx-auto mb-9 max-w-[714px] text-md font-light text-white/70"
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
                className="inline-flex rounded-lg bg-purple px-7 py-3 font-medium text-white shadow-md duration-300 ease-in hover:bg-purple-light hover:shadow-lg"
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
