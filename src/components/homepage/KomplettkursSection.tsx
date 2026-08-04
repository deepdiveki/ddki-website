"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import KomplettkursMockup from "../chooser/KomplettkursMockup";

export default function KomplettkursSection() {
  return (
    <section className="bg-white py-10 md:py-14 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto grid max-w-304 grid-cols-1 items-center gap-10 px-4 lg:grid-cols-2 lg:gap-16 xl:px-0"
      >
        <div className="text-center lg:text-left">
          <p className="mb-3 text-sm font-medium tracking-[0.14em] text-primary-base uppercase">
            Neu: Video-KI-Komplettkurs
          </p>
          <h2 className="text-display-xs font-semibold -tracking-[0.5px] text-text-primary md:text-display-sm lg:text-display-md">
            Lernen Sie in Ihrem Tempo.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-md font-light leading-relaxed text-text-secondary lg:mx-0 lg:text-lg">
            Der Videokurs für Lehrkräfte: KI wirklich verstehen, komplette
            Unterrichtseinheiten mit KI planen und souveräne Antworten auf
            Plagiate, Hausaufgaben und Klausuren entwickeln. Mit 65 Videos, 14
            interaktiven Tools und über 60 fertigen Materialien.
          </p>
          <Link
            href="/fortbildung/video-ki-komplettkurs"
            className="group mt-6 inline-flex items-center gap-2 text-md font-medium text-primary-base transition hover:text-primary-dark"
          >
            Zum Kurs
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        <KomplettkursMockup />
      </motion.div>
    </section>
  );
}
