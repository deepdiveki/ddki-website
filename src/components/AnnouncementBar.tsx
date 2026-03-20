"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AnnouncementBar({ variant = "software" }: { variant?: "software" | "fortbildung" }) {
  const [scrolled, setScrolled] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (dismissed) return null;

  const isFortbildung = variant === "fortbildung";

  const containerClass = isFortbildung
    ? "border-primary-base/30 bg-white/95 shadow-xl shadow-primary-base/10"
    : "border-white/10 bg-gradient-to-br from-gray-800/95 via-gray-900/95 to-gray-800/95 shadow-xl shadow-black/30";

  const textClass = isFortbildung ? "text-text-primary" : "text-white";

  const highlightClass = isFortbildung
    ? "font-semibold text-primary-darker"
    : "font-semibold underline decoration-white/50 underline-offset-2";

  const closeClass = isFortbildung
    ? "text-text-tertiary hover:text-text-primary hover:bg-primary-light/20"
    : "text-white/60 hover:text-white hover:bg-white/10";

  return (
    <div className="fixed bottom-6 right-6 z-[1001] animate-in slide-in-from-bottom fade-in duration-700">
      <div
        className={`relative rounded-2xl border backdrop-blur-md transition-all duration-500 ease-in-out ${containerClass} ${
          scrolled ? "max-w-[220px] px-4 py-3 pr-8" : "max-w-sm px-5 py-4 pr-10"
        }`}
      >
        <button
          onClick={(e) => { e.stopPropagation(); setDismissed(true); }}
          className={`absolute top-2 right-2 z-10 rounded-full p-1 transition-colors ${closeClass}`}
          aria-label="Schließen"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <Link href="/fortbildung/kontakt" className="block cursor-pointer">
          <p
            className={`font-medium leading-relaxed transition-all duration-500 ${textClass} ${
              scrolled ? "text-xs" : "text-sm"
            }`}
          >
            {scrolled ? (
              <>
                Förderfähig:{" "}
                <span className={highlightClass}>Startchancen-Programm</span> &{" "}
                <span className={highlightClass}>DigitalPakt 2.0</span>
              </>
            ) : (
              <>
                Alle Fortbildungen und Produkte sind förderfähig im Rahmen des{" "}
                <span className={highlightClass}>Startchancen-Programms</span>{" "}
                und des{" "}
                <span className={highlightClass}>DigitalPakts 2.0</span>
              </>
            )}
          </p>
        </Link>
      </div>
    </div>
  );
}
