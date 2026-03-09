"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

const videoSlides = [
  {
    title: "DeepChat im Unterricht",
    src: "/video/Basketball.mp4",
    features: [
      "🧠 Automatische Analyse von Lernfortschritten",
      "⚡ Interaktive Unterrichtsplanung in Sekunden",
      "🤖 KI-gestützte Feedbackvorschläge",
    ],
  },
  {
    title: "Individuelle Förderung",
    src: "/video/Matritzen.mp4",
    features: [
      "🎯 Maßgeschneiderte Aufgaben für Lernniveaus",
      "📊 Adaptive Lernanalysen in Echtzeit",
    ],
  },
  {
    title: "Interaktive Inhalte erstellen",
    src: "/video/Elternbrief2.mp4",
    features: [
      "🧩 Interaktive Quiz- und Übungsgeneratoren",
      "🎨 Kreative Tools für differenzierte Inhalte",
    ],
  },
];

export default function DeepChatAnimationCarousel() {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % videoSlides.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + videoSlides.length) % videoSlides.length);
  };

  const isActive = (index: number) => index === active;

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-5xl md:px-8 lg:px-12 text-white">
      <div className="flex flex-col gap-20">
        <div className="relative w-full aspect-video max-h-[600px]">
          <AnimatePresence>
            {videoSlides.map((slide, index) => (
              <motion.div
                key={slide.src}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotate: randomRotateY(),
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index) ? 0 : randomRotateY(),
                  zIndex: isActive(index)
                    ? 40
                    : videoSlides.length + 2 - index,
                  y: isActive(index) ? [0, -40, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: randomRotateY(),
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 origin-bottom overflow-hidden rounded-xl border border-white shadow-xl bg-white"
              >
                <video
                  key={slide.src}
                  src={slide.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-contain"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4 pt-1">
          <button
            onClick={handlePrev}
            className="group/button flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <IconArrowLeft className="h-5 w-5 text-white group-hover/button:rotate-12 transition-transform" />
          </button>
          <button
            onClick={handleNext}
            className="group/button flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <IconArrowRight className="h-5 w-5 text-white group-hover/button:-rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}