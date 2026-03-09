"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const slides = [
  {
    src: "/images/paedagogischer-tag/slide-1.jpg",
    alt: "Pädagogischer Tag – Impression 1",
  },
  {
    src: "/images/paedagogischer-tag/slide-2.jpg",
    alt: "Pädagogischer Tag – Impression 2",
  },
  {
    src: "/images/paedagogischer-tag/slide-3.jpg",
    alt: "Pädagogischer Tag – Impression 3",
  },
];

export default function ImageSlideshow() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <section className="bg-white px-4 py-10 md:py-14 lg:py-20 xl:px-0">
      <div className="mx-auto max-w-304">
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl">
          <div className="relative aspect-video">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={slides[current].src}
                  alt={slides[current].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1216px) 100vw, 1216px"
                  priority={current === 0}
                />
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prev}
              className="absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-text-primary backdrop-blur-sm transition-colors hover:bg-white md:left-5 md:size-12"
              aria-label="Vorheriges Bild"
            >
              <ChevronLeft className="size-5 md:size-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-text-primary backdrop-blur-sm transition-colors hover:bg-white md:right-5 md:size-12"
              aria-label="Nächstes Bild"
            >
              <ChevronRight className="size-5 md:size-6" />
            </button>
          </div>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === current
                    ? "w-6 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/75",
                )}
                aria-label={`Bild ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
