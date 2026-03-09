"use client";

import { useEffect, useRef } from "react";
import { FaSlack, FaWhatsapp } from "react-icons/fa";
import { SiZendesk, SiSalesforce, SiFresh } from "react-icons/si";

export default function NuggetAnimation() {
  const nuggetRef = useRef<HTMLDivElement>(null);

  const icons = [
    { icon: <FaWhatsapp size={20} />, degree: 0 },
    { icon: <FaSlack size={20} />, degree: 72 },
    { icon: <SiZendesk size={20} />, degree: 144 },
    { icon: <SiSalesforce size={20} />, degree: 216 },
    { icon: <SiFresh size={20} />, degree: 288 },
  ];

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      {/* Animated Orbits */}
      {[100, 140, 180, 220].map((size, idx) => (
        <div
          key={idx}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div
            className="rounded-full border border-white border-opacity-20 shadow-[0_0_10px_2px_rgba(255,255,255,0.1)]"
            style={{ width: size, height: size }}
          ></div>
        </div>
      ))}

      {/* Orbit Icons */}
      <div className="absolute w-[220px] h-[220px] animate-orbit">
        {icons.map((item, idx) => (
          <div
            key={idx}
            className="absolute top-1/2 left-1/2 bg-black text-white rounded-xl p-2 shadow-lg"
            style={{
              transform: `rotate(${item.degree}deg) translate(110px) rotate(-${item.degree}deg)`,
              transformOrigin: "0 0",
            }}
          >
            {item.icon}
          </div>
        ))}
      </div>

      {/* Center Nugget Logo */}
      <div
        ref={nuggetRef}
        className="absolute w-[30px] h-[30px] z-10"
        style={{ top: 'calc(50% - 50px)', left: 'calc(50% - 15px)' }}
      >
        <img
          src="/black.svg"
          alt="Nugget Logo"
          className="object-contain"
          style={{ width: "100%", height: "100%", filter: "brightness(0) invert(1)" }}
        />
      </div>

      <style jsx>{`
        .animate-orbit {
          animation: orbit-rotation 20s linear infinite;
          transform-origin: center center;
        }
        @keyframes orbit-rotation {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}