"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import dynamic from "next/dynamic";

const AIEngineAnimation = dynamic(
  () => import("@/components/animations/AIEngineAnimation"),
  { ssr: false, loading: () => <div className="relative z-20 mt-2 min-h-[200px]" /> }
);

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
            className="sw-glass relative mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-primary-light"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1C12 1 12.7 5.3 14.7 7.3C16.7 9.3 21 10 21 10C21 10 16.7 10.7 14.7 12.7C12.7 14.7 12 19 12 19C12 19 11.3 14.7 9.3 12.7C7.3 10.7 3 10 3 10C3 10 7.3 9.3 9.3 7.3C11.3 5.3 12 1 12 1Z"/><path d="M19 15C19 15 19.4 17.1 20.1 17.9C20.9 18.6 23 19 23 19C23 19 20.9 19.4 20.1 20.1C19.4 20.9 19 23 19 23C19 23 18.6 20.9 17.9 20.1C17.1 19.4 15 19 15 19C15 19 17.1 18.6 17.9 17.9C18.6 17.1 19 15 19 15Z" opacity="0.7"/><circle cx="20" cy="5" r="1" opacity="0.5"/></svg>
            Für die Zukunft mit KI
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mb-6 text-display-sm font-bold -tracking-[1.2px] text-white lg:text-display-lg xl:text-display-xl"
          >
            DeepDiveKI – Ihr Partner für KI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mx-auto mb-9 max-w-[500px] text-md font-light text-white/80"
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
