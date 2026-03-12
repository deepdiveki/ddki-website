"use client";

import AnimationErrorBoundary from "@/components/shared/AnimationErrorBoundary";
import ButtonLink from "@/components/ui/ButtonLink";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Maximize2, Quote } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FortbildungenDetail, SoftwareDetail } from "./CardDetail";
import FortbildungenAnimation from "./FortbildungenAnimation";

const AIEngineMini = dynamic(() => import("./AIEngineMini"), { ssr: false });

/* ─── Constants ─── */

const AFTER_INTRO = 0.15;

const FORTBILDUNGEN_PILLS = [
  "Inklusion, Differenzierung & Sprachbildung",
  "Künstliche Intelligenz",
  "Leistung, Feedback & Lernstand",
  "Digitale Tools & Anwendungen",
];

const SOFTWARE_PILLS = [
  "DeepChat",
  "KI-Schulbüro",
  "Schulwebsites",
  "DSGVO-konform",
];


const TESTIMONIALS = [
  {
    title: "Hilfreich im Unterricht",
    quote: "Der DeepChat hilft mir dabei, gezielt Aufgaben für meine Schüler zu entwickeln.",
    author: "Lehrerin, Berlin",
  },
  {
    title: "Intuitive Bedienung",
    quote: "Der DeepChat ist einfach zu bedienen – auch für technikferne Kolleg:innen. Gute Einführung von Björn und Tim.",
    author: "Schulleiter, Hamburg",
  },
  {
    title: "Enorme Zeitersparnis",
    quote: "Ich spare mit dem DeepChat viel Zeit bei administrativen Aufgaben.",
    author: "Lehrkraft, NRW",
  },
  {
    title: "Tolle Fortbildung",
    quote: "Viele Information und Tipps, die ich sofort umsetzen kann. Coole Notion Materialsammlung. Gute Diskussion mit Toni.",
    author: "Lehrer, Niedersachsen",
  },
  {
    title: "KI Assistent im DeepChat",
    quote: "Den KI Assistenten im DeepChat setze ich gerne ein. So ein Hilfslehrer ist Gold wert.",
    author: "Lehrer, Köln",
  },
  {
    title: "Planung Klassenreisen",
    quote: "Habe meine Klassenfahrt mit dem DeepChat geplant. Das hat mir viel Zeit gespart.",
    author: "Lehrerin, Hamburg",
  },
  {
    title: "Kuratiertes Prompting",
    quote: "Ich bin kein Profi beim Thema Digitales. Ich finde das kuratierte Prompting super.",
    author: "Lehrer, Stuttgart",
  },
  {
    title: "Schilf mit DeepDiveKI",
    quote: "Björn und Tim waren bei uns an der Schule. Das waren super Workshops. Cool das man viel ausprobieren konnte.",
    author: "Didaktische Leitung, Niedersachsen",
  },
  {
    title: "Fortbildung mit DeepDiveKI",
    quote: "Vorstellung vieler Apps, direkte Links im Chat, Möglichkeiten zum Ausprobieren, die Videos für zu Hause waren toll.",
    author: "Lehrerin, Thüringen",
  },
];

const CLIENTS = [
  { id: 1, image: "/images/clients/client-01.svg", alt: "Partnerschule 1" },
  { id: 2, image: "/images/clients/client-02.svg", alt: "Partnerschule 2" },
  { id: 3, image: "/images/clients/client-03.svg", alt: "Partnerschule 3" },
  { id: 4, image: "/images/clients/client-04.svg", alt: "Partnerschule 4" },
  { id: 5, image: "/images/clients/client-05.svg", alt: "Partnerschule 5" },
  { id: 6, image: "/images/clients/client-06.svg", alt: "Partnerschule 6" },
  { id: 7, image: "/images/clients/client-07.svg", alt: "Partnerschule 7" },
];

const BG_NEUTRAL =
  "linear-gradient(180deg, #DDD7FE 0%, #F9F8FB 50%, #F9F8FB 100%)";
const BG_FORTBILDUNGEN =
  "linear-gradient(180deg, #D4CFFC 0%, #EDE9FE 40%, #F9F8FB 100%)";
const BG_SOFTWARE =
  "linear-gradient(180deg, #C8C0F8 0%, #E0DBF9 40%, #F9F8FB 100%)";

/* ─── Intro Overlay ─── */

function IntroOverlay({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/images/ddki-logo.svg"
          alt="DeepDive KI"
          width={80}
          height={80}
          className="size-16 lg:size-20"
          priority
        />
      </motion.div>
      <motion.span
        className="mt-5 text-2xl font-medium tracking-tight text-text-primary lg:text-3xl"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      >
        DeepDive KI
      </motion.span>
      <motion.div
        className="mt-8 h-0.5 rounded-full bg-primary-base"
        initial={{ width: 0 }}
        animate={{ width: 120 }}
        transition={{ duration: 1.8, delay: 0.4, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

/* ─── Feature Pills ─── */

function FeaturePills({
  pills,
  visible,
  variant,
}: {
  pills: string[];
  visible: boolean;
  variant: "light" | "dark";
}) {
  return (
    <div className="mt-4 flex h-[28px] flex-wrap gap-2 overflow-hidden">
      <AnimatePresence>
        {visible &&
          pills.map((pill, i) => (
            <motion.span
              key={pill}
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.25, delay: i * 0.05, ease: "easeOut" }}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium",
                variant === "light"
                  ? "bg-primary-light/30 text-primary-darker"
                  : "bg-[#8646F4]/15 text-[#C4B5FD]",
              )}
            >
              {pill}
            </motion.span>
          ))}
      </AnimatePresence>
    </div>
  );
}

/* ─── Glow Card Wrapper ─── */

function GlowCard({
  children,
  isHovered,
  variant,
  className,
}: {
  children: React.ReactNode;
  isHovered: boolean;
  variant: "light" | "dark";
  className?: string;
}) {
  const glowColor =
    variant === "light"
      ? "rgba(140, 113, 246, 0.4)"
      : "rgba(134, 70, 244, 0.5)";

  return (
    <div className={cn("relative rounded-2xl", className)}>
      <motion.div
        className="pointer-events-none absolute -inset-[1px] rounded-2xl"
        animate={{
          boxShadow: isHovered
            ? `0 0 20px 2px ${glowColor}, inset 0 0 20px 2px ${glowColor}`
            : `0 0 0px 0px transparent, inset 0 0 0px 0px transparent`,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-[1px] overflow-hidden rounded-2xl"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background:
            variant === "light"
              ? "linear-gradient(135deg, #C6BDFA, #8C71F6, #DCD5FF, #8C71F6)"
              : "linear-gradient(135deg, #8646F4, #A78BFA, #6D28D9, #A78BFA)",
          backgroundSize: "300% 300%",
          animation: isHovered
            ? "border-glow-shift 3s linear infinite"
            : "none",
          padding: "1.5px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
      />
      {children}
    </div>
  );
}

/* ─── Expand Button ─── */

function ExpandButton({
  onClick,
  variant,
}: {
  onClick: (e: React.MouseEvent) => void;
  variant: "light" | "dark";
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-xl opacity-0 transition-all duration-200 group-hover:opacity-100",
        variant === "light"
          ? "bg-white/80 text-text-secondary shadow-sm backdrop-blur-sm hover:bg-white hover:text-primary-darker"
          : "bg-white/10 text-white/50 backdrop-blur-sm hover:bg-white/20 hover:text-white",
      )}
      aria-label="Details anzeigen"
    >
      <Maximize2 className="size-4" />
    </button>
  );
}

/* ─── Main Page ─── */

export default function ChooserLanding() {
  const [introComplete, setIntroComplete] = useState(false);
  const [hovered, setHovered] = useState<"fortbildungen" | "software" | null>(
    null,
  );
  const [expanded, setExpanded] = useState<
    "fortbildungen" | "software" | null
  >(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  const bgGradient =
    hovered === "fortbildungen"
      ? BG_FORTBILDUNGEN
      : hovered === "software"
        ? BG_SOFTWARE
        : BG_NEUTRAL;

  // Lock scroll when detail is open
  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [expanded]);

  return (
    <>
      {/* Intro overlay */}
      <AnimatePresence>
        {!introComplete && (
          <IntroOverlay onComplete={() => setIntroComplete(true)} />
        )}
      </AnimatePresence>

      {/* Detail overlays */}
      <AnimatePresence>
        {expanded === "fortbildungen" && (
          <FortbildungenDetail onClose={() => setExpanded(null)} />
        )}
        {expanded === "software" && (
          <SoftwareDetail onClose={() => setExpanded(null)} />
        )}
      </AnimatePresence>

      {/* Page content */}
      <motion.div
        id="main-content"
        className="relative flex min-h-dvh flex-col"
        animate={{ background: bgGradient }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        {/* SVG texture overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[url('/images/bg-gradient.svg')] bg-cover bg-center" />
        {/* Header */}
        <motion.header
          className="font-inter fixed top-4 left-1/2 z-50 mx-auto flex w-[calc(100%-32px)] max-w-304 -translate-x-1/2 items-center justify-between rounded-xl bg-white px-6 py-4 md:top-6 md:rounded-2xl lg:top-7 xl:w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={introComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: AFTER_INTRO, ease: "easeOut" }}
        >
          <Link
            href="/"
            className="flex items-center gap-2 focus-visible:outline-primary-base"
          >
            <Image
              src="/images/ddki-logo.svg"
              alt="DeepDive KI Logo"
              width={32}
              height={32}
              className="size-8 lg:size-9"
            />
            <span className="text-lg font-medium tracking-tight text-text-primary lg:text-xl">
              DeepDiveKI{" "}
              <span className="font-light text-text-secondary">Plattform</span>
            </span>
          </Link>
          <ButtonLink href="https://www.deepdive-ki.de" target="_blank" rel="noopener noreferrer">
            Login
          </ButtonLink>
        </motion.header>

        {/* Main Content */}
        <div className="flex flex-1 flex-col items-center justify-center px-4 pt-28 pb-12 lg:pt-32">
          <div className="mx-auto flex w-full max-w-304 flex-col items-center">
            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={introComplete ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: AFTER_INTRO + 0.1,
                ease: "easeOut",
              }}
              className="max-w-3xl text-left"
            >
              <h1 className="text-display-sm font-light -tracking-[0.96px] text-text-primary md:text-display-md lg:text-display-lg">
                DeepDiveKI ist Ihr Partner in Sachen{" "}
                <span className="font-semibold">Fortbildungen</span> und{" "}
                <span className="font-semibold">Software-Lösungen</span>{" "}
                <span className="text-text-secondary">
                  für Lehrkräfte, Schüler, Eltern, Schulen und
                  Universitäten.
                </span>
              </h1>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/fortbildung/kontakt"
                  className="inline-flex items-center gap-2 rounded-[10px] border border-white/10 px-4 py-2.5 font-inter text-sm font-medium -tracking-[0.084px] text-white transition-colors duration-300 hover:bg-gray-700 [background:linear-gradient(180deg,rgba(255,255,255,0.16)0%,rgba(255,255,255,0)100%),#181B25] [box-shadow:0_1px_2px_0_rgba(21,14,27,0.24),_0_0_0_1px_#000]"
                >
                  Kontakt
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="https://www.deepdive-ki.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[10px] border border-border-secondary bg-background-primary px-4 py-2.5 font-inter text-sm font-medium -tracking-[0.084px] text-text-primary transition-colors duration-300 hover:bg-background-secondary"
                >
                  Registrieren
                </a>
              </div>
            </motion.div>

            {/* Section Label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={introComplete ? { opacity: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: AFTER_INTRO + 0.2,
                ease: "easeOut",
              }}
              className="mt-14 text-center text-sm font-medium tracking-wide text-text-tertiary uppercase lg:mt-18"
            >
              Wählen Sie Ihren Bereich
            </motion.p>

            {/* Cards */}
            <div className="mt-10 grid w-full auto-rows-[1fr] grid-cols-1 gap-6 md:grid-cols-2 lg:mt-14 lg:gap-8">
              {/* ── Fortbildungen Card ── */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={introComplete ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: AFTER_INTRO + 0.25,
                  ease: "easeOut",
                }}
                onMouseEnter={() => setHovered("fortbildungen")}
                onMouseLeave={() => setHovered(null)}
                className="transition-transform duration-300"
              >
                <GlowCard
                  isHovered={hovered === "fortbildungen"}
                  variant="light"
                  className="h-full"
                >
                  <Link
                    href="/fortbildung"
                    className={cn(
                      "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-tertiary bg-white shadow-sm transition-shadow duration-300",
                      "hover:shadow-xl",
                    )}
                  >
                    {/* Expand button */}
                    <ExpandButton
                      variant="light"
                      onClick={(e) => {
                        e.preventDefault();
                        setExpanded("fortbildungen");
                      }}
                    />

                    {/* Visual header */}
                    <div className="relative h-48 bg-gradient-to-br from-primary-light/40 to-primary-base/10 lg:h-56">
                      <AnimationErrorBoundary>
                        <FortbildungenAnimation />
                      </AnimationErrorBoundary>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between p-6 lg:p-8">
                      <div>
                        <h2 className="text-display-xs font-semibold tracking-tight text-text-primary lg:text-display-sm">
                          Fortbildungen
                        </h2>
                        <p className="mt-2 text-md font-light text-text-secondary lg:text-lg">
                          Praxisnahe Lehrerfortbildungen in KI, Digitalisierung
                          & Pädagogik
                        </p>
                        <FeaturePills
                          pills={FORTBILDUNGEN_PILLS}
                          visible={hovered === "fortbildungen"}
                          variant="light"
                        />
                      </div>
                      <div className="mt-6 flex items-center justify-end">
                        <ArrowRight className="size-6 text-primary-darker transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </GlowCard>
              </motion.div>

              {/* ── Software Card ── */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={introComplete ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: AFTER_INTRO + 0.4,
                  ease: "easeOut",
                }}
                onMouseEnter={() => setHovered("software")}
                onMouseLeave={() => setHovered(null)}
                className="transition-transform duration-300"
              >
                <GlowCard
                  isHovered={hovered === "software"}
                  variant="dark"
                  className="h-full"
                >
                  <a
                    href="/software"
                    target=""
                    rel="noopener noreferrer"
                    className={cn(
                      "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#8646F4]/20 shadow-sm transition-shadow duration-300",
                      "hover:shadow-xl hover:shadow-[#8646F4]/10",
                    )}
                    style={{
                      background:
                        "linear-gradient(135deg, #0F0C1F 0%, #030014 100%)",
                    }}
                  >
                    {/* Expand button */}
                    <ExpandButton
                      variant="dark"
                      onClick={(e) => {
                        e.preventDefault();
                        setExpanded("software");
                      }}
                    />

                    {/* Visual header — AIEngine */}
                    <div
                      className="relative h-48 lg:h-56"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                        `,
                        backgroundSize: "20px 20px",
                      }}
                    >
                      <div className="absolute inset-0">
                        <AnimationErrorBoundary>
                          <AIEngineMini />
                        </AnimationErrorBoundary>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#030014] to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between p-6 lg:p-8">
                      <div>
                        <h2 className="text-display-xs font-semibold tracking-tight text-white lg:text-display-sm">
                          Software
                        </h2>
                        <p className="mt-2 text-md font-light text-[#918EA0] lg:text-lg">
                          DeepChat, KI-Schulbüro & digitale Lösungen für Schulen
                        </p>
                        <FeaturePills
                          pills={SOFTWARE_PILLS}
                          visible={hovered === "software"}
                          variant="dark"
                        />
                      </div>
                      <div className="mt-6 flex items-center justify-end">
                        <ArrowRight className="size-6 text-[#A78BFA] transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </a>
                </GlowCard>
              </motion.div>
            </div>
          </div>

          {/* Logo Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={introComplete ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: AFTER_INTRO + 0.5 }}
            className="mt-16 w-full lg:mt-20"
          >
            <p className="mb-6 text-center text-sm font-medium tracking-wide text-text-tertiary uppercase">
              Vertraut von Schulen & Institutionen
            </p>
            <div className="relative overflow-hidden">
              <span className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#F9F8FB] to-transparent md:w-28" />
              <span className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#F9F8FB] to-transparent md:w-28" />
              <div className="flex w-max animate-marquee">
                {Array.from({ length: 4 })
                  .flatMap(() => CLIENTS)
                  .map((client, i) => (
                    <div
                      key={`${client.id}-${i}`}
                      className="flex w-36 shrink-0 items-center justify-center px-5 md:w-44 md:px-7"
                    >
                      <Image
                        src={client.image}
                        alt={client.alt}
                        width={120}
                        height={48}
                        className="h-9 w-auto object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-11"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={introComplete ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: AFTER_INTRO + 0.6 }}
            className="mt-16 w-full lg:mt-20"
          >
            <p className="mb-8 text-center text-sm font-medium tracking-wide text-text-tertiary uppercase">
              Was Lehrkräfte sagen
            </p>
            <div className="relative">
              {/* Left arrow */}
              <button
                onClick={() => {
                  testimonialRef.current?.scrollBy({ left: -320, behavior: "smooth" });
                }}
                aria-label="Vorherige Bewertungen"
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-border-tertiary bg-white shadow-sm transition-colors hover:bg-background-secondary"
              >
                <ArrowLeft className="size-4 text-text-secondary" />
              </button>
              {/* Right arrow */}
              <button
                onClick={() => {
                  testimonialRef.current?.scrollBy({ left: 320, behavior: "smooth" });
                }}
                aria-label="Nächste Bewertungen"
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-border-tertiary bg-white shadow-sm transition-colors hover:bg-background-secondary"
              >
                <ArrowRight className="size-4 text-text-secondary" />
              </button>
              {/* Fade edges */}
              <span className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-12 bg-gradient-to-r from-[#F9F8FB] to-transparent" />
              <span className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-12 bg-gradient-to-l from-[#F9F8FB] to-transparent" />
              {/* Scrollable track */}
              <div
                ref={testimonialRef}
                className="scrollbar-hide flex gap-4 overflow-x-auto px-12 scroll-smooth"
              >
                {TESTIMONIALS.map((t) => (
                  <div
                    key={t.title}
                    className="w-72 shrink-0 rounded-xl border border-border-tertiary bg-white p-5 shadow-sm md:w-80"
                  >
                    <Quote className="mb-2 size-4 text-primary-base opacity-40" />
                    <p className="text-sm font-semibold text-text-primary">
                      {t.title}
                    </p>
                    <p className="mt-2 text-sm font-light leading-relaxed text-text-secondary">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p className="mt-3 text-xs font-medium text-text-tertiary">
                      — {t.author}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* School Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={introComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: AFTER_INTRO + 0.7 }}
            className="mt-16 w-full lg:mt-20"
          >
            <p className="mb-8 text-center text-sm font-medium tracking-wide text-text-tertiary uppercase">
              Was unsere Schulen sagen
            </p>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border-tertiary bg-white p-6 shadow-sm lg:p-8">
                <Quote className="mb-3 size-5 text-primary-base opacity-40" />
                <p className="text-sm font-light leading-relaxed text-text-secondary">
                  &ldquo;Wir haben mit dem Deep-Dive Team wirklich gute
                  Erfahrungen sammeln können. Die Schul-KI wird von den
                  Kolleginnen und Kollegen gut angenommen und erleichtert den
                  datenschutzkonformen Unterricht sehr. Das Deep-Dive-Team ist
                  gut erreichbar, Wünsche und Anliegen werden zeitnah
                  umgesetzt.&rdquo;
                </p>
                <p className="mt-2 text-sm font-light italic text-text-secondary">
                  &ldquo;Wir können die Zusammenarbeit sehr empfehlen.&rdquo;
                </p>
                <p className="mt-4 text-sm font-semibold text-text-primary">
                  C. Weller
                </p>
                <p className="text-xs text-text-tertiary">
                  Rektorin der DBR in Hannover
                </p>
              </div>
              <div className="rounded-2xl border border-border-tertiary bg-white p-6 shadow-sm lg:p-8">
                <Quote className="mb-3 size-5 text-primary-base opacity-40" />
                <p className="text-sm font-light leading-relaxed text-text-secondary">
                  &ldquo;Björn Isenbiel und Tim Philipp haben eine schulinterne
                  Lehrerfortbildung an der Robert-Koch-Schule
                  Clausthal-Zellerfeld durchgeführt. Auch die beteiligten
                  Kollegien des Ratsgymnasiums Goslar sowie des
                  Oberharzgymnasiums Braunlage waren von der Sachkompetenz, der
                  Praxisnähe und der Vielfalt der vorgestellten Anwendungen und
                  Möglichkeiten überzeugt.&rdquo;
                </p>
                <p className="mt-4 text-sm font-semibold text-text-primary">
                  Jens Wachsmuth
                </p>
                <p className="text-xs text-text-tertiary">
                  Ständiger Vertreter des Schulleiters
                </p>
              </div>
            </div>
          </motion.div>

          {/* Über uns */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={introComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: AFTER_INTRO + 0.8 }}
            className="mt-16 w-full lg:mt-20"
          >
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-2 text-sm font-medium tracking-wide text-text-tertiary uppercase">
                Über uns
              </p>
              <h2 className="text-display-xs font-semibold tracking-tight text-text-primary lg:text-display-sm">
                Unser Team
              </h2>
              <p className="mt-3 text-md font-light leading-relaxed text-text-secondary lg:text-lg">
                Wir sind ein junges Team aus Hamburg mit einer Leidenschaft für
                Künstliche Intelligenz und Bildung. Unsere Vision ist es, KI für
                alle zugänglich zu machen und den Einsatz von KI im
                Bildungsbereich zu fördern.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Björn Isenbiel */}
              <div className="flex flex-col items-center text-center">
                <div className="size-32 overflow-hidden rounded-full lg:size-40">
                  <Image
                    src="/images/team/team-01.png"
                    alt="Björn Isenbiel"
                    width={160}
                    height={160}
                    className="size-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-text-primary">
                  Björn Isenbiel
                </h3>
                <p className="mt-1 text-sm font-light text-text-secondary">
                  Geschäftsführer
                </p>
                <p className="text-sm font-light text-text-secondary">
                  Lehrkraft für PGW, Informatik & Sport
                </p>
              </div>

              {/* Tim Philipp */}
              <div className="flex flex-col items-center text-center">
                <div className="size-32 overflow-hidden rounded-full lg:size-40">
                  <Image
                    src="/images/team/team-02.png"
                    alt="Tim Philipp"
                    width={160}
                    height={160}
                    className="size-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-text-primary">
                  Tim Philipp
                </h3>
                <p className="mt-1 text-sm font-light text-text-secondary">
                  Geschäftsführer
                </p>
                <p className="text-sm font-light text-text-secondary">
                  Lehrkraft für Informatik & Sport
                </p>
              </div>

              {/* Dr. Nora Schröder */}
              <div className="flex flex-col items-center text-center">
                <div className="size-32 overflow-hidden rounded-full lg:size-40">
                  <Image
                    src="/images/team/team-06.png"
                    alt="Dr. Nora Schröder"
                    width={160}
                    height={160}
                    className="size-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-text-primary">
                  Dr. Nora Schröder
                </h3>
                <p className="mt-1 text-sm font-light text-text-secondary">
                  Learning Experience Designer
                </p>
                <p className="text-sm font-light text-text-secondary">
                  and Teaching Consultant
                </p>
              </div>

              {/* Tim Maximilian Baum */}
              <div className="flex flex-col items-center text-center">
                <div className="size-32 overflow-hidden rounded-full border-2 border-black lg:size-40">
                  <Image
                    src="/images/team/team-05.png"
                    alt="Tim Maximilian Baum"
                    width={160}
                    height={160}
                    className="size-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-text-primary">
                  Tim Maximilian Baum
                </h3>
                <p className="mt-1 text-sm font-light text-text-secondary">
                  Full Stack Software Engineer
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={introComplete ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: AFTER_INTRO + 0.5 }}
          className="mx-auto flex w-full max-w-304 flex-col items-center justify-center gap-2 px-4 py-6 text-center text-sm font-medium tracking-[0.28px] text-text-tertiary"
        >
          <div className="flex items-center gap-x-4">
            <Link
              href="/impressum"
              className="text-text-secondary duration-300 hover:text-primary-base"
            >
              Impressum
            </Link>
            <span aria-hidden="true">|</span>
            <Link
              href="/datenschutz"
              className="text-text-secondary duration-300 hover:text-primary-base"
            >
              Datenschutz
            </Link>
          </div>
          <p>
            &copy; {new Date().getFullYear()} DeepDive KI. Alle Rechte vorbehalten.
          </p>
        </motion.footer>
      </motion.div>
    </>
  );
}
