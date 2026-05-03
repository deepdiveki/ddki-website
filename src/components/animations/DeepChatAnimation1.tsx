"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { IconArrowLeft, IconArrowRight, IconVolume, IconVolumeOff } from "@tabler/icons-react";

const videoSlides = [
  {
    title: "Dokumente erstellen",
    src: "/video/Dokument-erstellen.mp4",
    features: [
      "🧠 Automatische Analyse von Lernfortschritten",
      "⚡ Interaktive Unterrichtsplanung in Sekunden",
      "🤖 KI-gestützte Feedbackvorschläge",
    ],
  },
  {
    title: "KI-Assistent DDKI DeepChat",
    src: "/video/KI-Assistent-DDKI-DeepChat.mp4",
    features: [
      "🎯 Maßgeschneiderte Aufgaben für Lernniveaus",
      "📊 Adaptive Lernanalysen in Echtzeit",
    ],
  },
  {
    title: "Klassenraumfunktion",
    src: "/video/Klassenraumfunktion.mp4",
    features: [
      "🧩 Interaktive Quiz- und Übungsgeneratoren",
      "🎨 Kreative Tools für differenzierte Inhalte",
    ],
  },
];

export default function DeepChatAnimationCarousel() {
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      video.currentTime = 0;
      if (index === active) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [active]);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % videoSlides.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + videoSlides.length) % videoSlides.length);
  };

  const isActive = (index: number) => index === active;

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-5xl md:px-8 lg:px-12 text-white">
      <div className="flex flex-col gap-20">
        <div className="relative w-full aspect-[2036/1080] max-h-[600px]">
          {videoSlides.map((slide, index) => (
            <motion.div
              key={slide.src}
              initial={false}
              animate={{
                opacity: isActive(index) ? 1 : 0,
                scale: isActive(index) ? 1 : 0.98,
                zIndex: isActive(index) ? 40 : 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ pointerEvents: isActive(index) ? "auto" : "none" }}
            >
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                key={slide.src}
                src={slide.src}
                autoPlay
                muted={muted || !isActive(index)}
                loop
                playsInline
                className="max-w-full max-h-full object-contain rounded-3xl shadow-xl"
              />
            </motion.div>
          ))}
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
          <button
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Ton einschalten" : "Ton ausschalten"}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            {muted ? (
              <IconVolumeOff className="h-5 w-5 text-white" />
            ) : (
              <IconVolume className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}