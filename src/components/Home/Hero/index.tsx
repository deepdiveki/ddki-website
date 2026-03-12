"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import AIEngineAnimation from "@/components/animations/AIEngineAnimation";

const Hero = () => {
  useEffect(() => {
    const letters = document.querySelectorAll(".animated-title span");

    const tl = gsap.timeline({ delay: 0.6 });

    tl.fromTo(
      letters,
      {
        y: 0,
        rotationX: 0,
        opacity: 1,
      },
      {
        y: -30,
        rotationX: 90,
        duration: 0.1,
        opacity: 0.8,
        ease: "power1.in",
        stagger: {
          each: 0.015,
          from: "center",
        },
      }
    ).to(
      letters,
      {
        y: 0,
        rotationX: 0,
        opacity: 1,
        duration: 0.15,
        ease: "back.out(2)",
        stagger: {
          each: 0.015,
          from: "center",
        },
      },
      ">0.05"
    );
  }, []);

  return (
    <section
      id="home"
      className="relative z-10 overflow-visible pt-35 pb-0 md:pt-40 xl:pt-45"
    >
      {/* Hero gradient overlay — stronger purple at top */}
      <div
        className="pointer-events-none absolute inset-0 -top-20 z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(140,113,246,0.12) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Fine grid lines for techy feel */}
      <div
        className="pointer-events-none absolute inset-0 z-0 sw-grid-pattern-lg"
        style={{ maskImage: "linear-gradient(180deg, black 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-1 mx-auto max-w-[900px] px-4 sm:px-8 xl:px-0">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="sw-glass relative mb-5 inline-flex items-center gap-2 rounded-full border border-border-tertiary px-4.5 py-2 text-sm font-medium text-primary-darker shadow-sm"
          >
            Für die Zukunft mit KI
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mb-6 text-display-sm font-light -tracking-[1.2px] text-text-primary lg:text-display-lg xl:text-display-xl"
          >
            DeepDiveKI – Ihr Partner für KI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mx-auto mb-9 max-w-[500px] text-md font-light text-text-secondary"
          >
            Wir bieten vier innovative KI-Produkte für Lehrende, Lernende und
            Schulen – perfekt aufeinander abgestimmt:
          </motion.p>
        </div>

        {/* AI Engine Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="relative z-20 mt-2"
        >
          <AIEngineAnimation />
        </motion.div>

        {/* Abstand zwischen AI Engine und nächstem Abschnitt */}
        <div className="h-16 md:h-20"></div>
      </div>
    </section>
  );
};

export default Hero;
