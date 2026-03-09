"use client";

import Image from "next/image";

const clients = [
  { id: 1, image: "/images/clients/client-01.svg", alt: "Partnerschule 1" },
  { id: 2, image: "/images/clients/client-02.svg", alt: "Partnerschule 2" },
  { id: 3, image: "/images/clients/client-03.svg", alt: "Partnerschule 3" },
  { id: 4, image: "/images/clients/client-04.svg", alt: "Partnerschule 4" },
  { id: 5, image: "/images/clients/client-05.svg", alt: "Partnerschule 5" },
  { id: 6, image: "/images/clients/client-06.svg", alt: "Partnerschule 6" },
  { id: 7, image: "/images/clients/client-07.svg", alt: "Partnerschule 7" },
];

export default function LogoSlider() {
  return (
    <section className="bg-white px-4 py-10 md:py-14 lg:py-20 xl:px-0">
      <div className="mx-auto max-w-304">
        <h2 className="mb-10 text-center text-display-xs font-light -tracking-[0.96px] text-text-primary lg:text-display-md">
          Unsere Referenzen
        </h2>
        <div className="relative overflow-hidden">
          <span className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-white/0 md:w-32" />
          <span className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-white/0 md:w-32" />

          <div className="flex w-max animate-marquee">
            {[...clients, ...clients, ...clients, ...clients].map(
              (client, index) => (
                <div
                  key={`${client.id}-${index}`}
                  className="flex w-40 shrink-0 items-center justify-center px-6 md:w-48 md:px-8"
                >
                  <Image
                    src={client.image}
                    alt={client.alt}
                    width={120}
                    height={48}
                    className="h-10 w-auto object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-12"
                  />
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
