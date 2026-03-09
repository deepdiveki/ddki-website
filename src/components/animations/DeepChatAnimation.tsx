"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const videoSlides = [
  {
    title: "DeepChat im Unterricht",
    src: "/video/Bildschirmaufnahme.mp4",
    features: [
      "🧠 Automatische Analyse von Lernfortschritten",
      "⚡ Interaktive Unterrichtsplanung in Sekunden",
      "🤖 KI-gestützte Feedbackvorschläge",
    ],
  },
  {
    title: "Individuelle Förderung",
    src: "/video/zweitesVideo.mp4",
    features: [
      "🎯 Maßgeschneiderte Aufgaben für Lernniveaus",
      "📊 Adaptive Lernanalysen in Echtzeit",
    ],
  },
  {
    title: "Interaktive Inhalte erstellen",
    src: "/video/drittesVideo.mp4",
    features: [
      "🧩 Interaktive Quiz- und Übungsgeneratoren",
      "🎨 Kreative Tools für differenzierte Inhalte",
    ],
  },
];

export default function DeepChatAnimationCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentSlide = videoSlides[activeIndex];

  const handleNext = () =>
    setActiveIndex((prev) => (prev + 1) % videoSlides.length);
  const handlePrev = () =>
    setActiveIndex((prev) =>
      prev === 0 ? videoSlides.length - 1 : prev - 1
    );

  return (
    <section className="relative w-full bg-gradient-to-br from-neutral-900 to-black text-white px-4 py-20 flex flex-col items-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
        {currentSlide.title}
      </h2>

      <div className="relative w-full max-w-5xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-2xl border border-white/10 shadow-xl bg-white/5 backdrop-blur-lg"
          >
            <video
              key={currentSlide.src}
              src={currentSlide.src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-[360px] object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          {videoSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === activeIndex ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mt-10 space-y-2 text-center">
        {currentSlide.features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + idx * 0.2 }}
            className="text-lg text-neutral-300"
          >
            {feature}
          </motion.div>
        ))}
      </div>

      {/* Prev/Next Buttons */}
      <div className="mt-10 flex gap-6">
        <button
          onClick={handlePrev}
          className="px-4 py-2 border border-white/20 rounded-md hover:bg-white/10"
        >
          Zurück
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 border border-white/20 rounded-md hover:bg-white/10"
        >
          Weiter
        </button>
      </div>
    </section>
  );
}