"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

/**
 * Kompakte Bild-Collage: ein großes Leitmotiv links, vier kleinere Kacheln
 * daneben. Sanfter Zoom beim Hovern, gestaffeltes Einblenden beim Scrollen.
 */
const slides = [
  {
    src: "/images/paedagogischer-tag/slide-1.jpg",
    alt: "Pädagogischer Tag – Vortrag in der Aula",
    className: "col-span-2 row-span-2",
  },
  {
    src: "/images/paedagogischer-tag/slide-2.jpg",
    alt: "Pädagogischer Tag – Workshop im Kollegium",
    className: "col-span-1 row-span-1",
  },
  {
    src: "/images/paedagogischer-tag/slide-3.jpg",
    alt: "Pädagogischer Tag – Gemeinsames Arbeiten",
    className: "col-span-1 row-span-1",
  },
  {
    src: "/images/paedagogischer-tag/slide-4.jpg",
    alt: "Pädagogischer Tag – Praxisphase",
    className: "col-span-1 row-span-1",
  },
  {
    src: "/images/paedagogischer-tag/slide-5.jpg",
    alt: "Pädagogischer Tag – Austausch in der Gruppe",
    className: "col-span-1 row-span-1",
  },
];

export default function ImageSlideshow() {
  return (
    <section className="bg-white px-4 py-10 md:py-14 lg:py-20 xl:px-0">
      <div className="mx-auto max-w-304">
        <div className="grid grid-cols-2 grid-rows-[repeat(4,10rem)] gap-3 md:grid-cols-4 md:grid-rows-[repeat(2,13rem)] md:gap-4">
          {slides.map((slide, index) => (
            <motion.div
              key={slide.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.08,
              }}
              className={cn(
                "group relative overflow-hidden rounded-2xl shadow-sm",
                slide.className,
              )}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
                quality={90}
                priority={index === 0}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
