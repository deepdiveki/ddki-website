"use client";

import AnimationErrorBoundary from "@/components/shared/AnimationErrorBoundary";
import ButtonLink from "@/components/ui/ButtonLink";
import teamData from "@/components/About/Team/teamData";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FortbildungenDetail, SoftwareDetail } from "./CardDetail";
import PlatformSwitcher from "@/components/shared/PlatformSwitcher";
import ContactFormSection from "@/components/Kontakt/ContactFormSection";
import SchulbueroMockup from "./SchulbueroMockup";

const CardShaderBackground = dynamic(() => import("./CardShaderBackground"), {
  ssr: false,
});
const HeadlineShaderBackground = dynamic(
  () => import("./HeadlineShaderBackground"),
  { ssr: false },
);
const AIEngineMini = dynamic(() => import("./AIEngineMini"), { ssr: false });

/* ─── Constants ─── */

const AFTER_INTRO = 0.15;

const TESTIMONIALS = [
  {
    title: "Hilfreich im Unterricht",
    quote: "Der DeepChat hilft mir dabei, gezielt Aufgaben für meine Schüler zu entwickeln.",
    author: "Lehrerin, Berlin",
  },
  {
    title: "Intuitive Bedienung",
    quote: "Der DeepChat ist einfach zu bedienen, auch für technikferne Kolleg:innen. Gute Einführung von Björn und Tim.",
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
    quote: "Björn und Tim waren bei uns an der Schule. Das waren super Workshops. Cool dass man viel ausprobieren konnte.",
    author: "Didaktische Leitung, Niedersachsen",
  },
  {
    title: "Fortbildung mit DeepDiveKI",
    quote: "Vorstellung vieler Apps, direkte Links im Chat, Möglichkeiten zum Ausprobieren, die Videos für zu Hause waren toll.",
    author: "Lehrerin, Thüringen",
  },
];

const SCHOOL_TESTIMONIALS: {
  quote: string;
  highlight?: string;
  author: string;
  role: string;
}[] = [
  {
    quote:
      "Wir haben mit dem Deep-Dive Team wirklich gute Erfahrungen sammeln können. Die Schul-KI wird von den Kolleginnen und Kollegen gut angenommen und erleichtert den datenschutzkonformen Unterricht sehr. Das Deep-Dive-Team ist gut erreichbar, Wünsche und Anliegen werden zeitnah umgesetzt.",
    highlight: "Wir können die Zusammenarbeit sehr empfehlen.",
    author: "C. Weller",
    role: "Rektorin der DBR in Hannover",
  },
  {
    quote:
      "Björn Isenbiel und Tim Philipp haben eine schulinterne Lehrerfortbildung an der Robert-Koch-Schule Clausthal-Zellerfeld durchgeführt. Auch die beteiligten Kollegien des Ratsgymnasiums Goslar sowie des Oberharzgymnasiums Braunlage waren von der Sachkompetenz, der Praxisnähe und der Vielfalt der vorgestellten Anwendungen und Möglichkeiten überzeugt.",
    author: "Jens Wachsmuth",
    role: "Ständiger Vertreter des Schulleiters",
  },
  {
    quote:
      "Die KI-Fortbildung hat uns alle inspiriert und tatsächlich – wie der Name schon sagt – in die Tiefen der KI (inkl. Escape Game) geführt. Es ist wirklich sehr beeindruckend, wie differenziert und multiperspektivisch die Chancen und Grenzen von KI dabei erfahrbar wurden. Danke für die Expertise und die lehrreichen Tage.",
    author: "Anne Schumann",
    role: "Leiterin des Studienseminars f. d. Lehramt an Gymnasien Göttingen",
  },
];

const CLIENTS = [
  {
    id: 1,
    image: "/images/clients/ostfriesische-landschaft.png",
    alt: "Ostfriesische Landschaft",
  },
  {
    id: 2,
    image: "/images/clients/leuphana.png",
    alt: "Leuphana Universität Lüneburg",
  },
  {
    id: 3,
    image: "/images/clients/kla.png",
    alt: "Kaufmännische Lehranstalten Bremerhaven",
  },
  {
    id: 4,
    image: "/images/clients/uni-hildesheim.png",
    alt: "Universität Hildesheim",
  },
  {
    id: 5,
    image: "/images/clients/ema-bonn.png",
    alt: "Ernst-Moritz-Arndt-Gymnasium Bonn",
  },
  {
    id: 6,
    image: "/images/clients/igs-linden.png",
    alt: "IGS Linden Hannover",
  },
];

const BG_NEUTRAL =
  "linear-gradient(180deg, #DDD7FE 0%, #F9F8FB 50%, #F9F8FB 100%)";

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
        DeepDiveKI
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

/* ─── Typewriter (rotating audiences) ─── */

function TypewriterWords({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const current = words[index % words.length];
  const display = current.slice(0, count);

  // Widest word reserves the space so the centered line never reflows.
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && count === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && count === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => setCount((c) => c + (deleting ? -1 : 1)),
        deleting ? 38 : 70,
      );
    }
    return () => clearTimeout(timeout);
  }, [count, deleting, current, words.length]);

  return (
    <span className="relative inline-block whitespace-nowrap align-baseline font-medium">
      {/* Invisible sizer: widest word + caret width */}
      <span aria-hidden className="invisible">
        {longest}
        <span className="ml-0.5 inline-block w-[2px]" />
      </span>
      {/* Visible typed text, overlaid so it doesn't shift the layout */}
      <span className="absolute top-0 left-0 whitespace-nowrap">
        <span className="bg-gradient-to-r from-primary-dark to-primary-darker bg-clip-text text-transparent">
          {display}
        </span>
        <span
          aria-hidden
          className="typewriter-caret ml-0.5 inline-block h-[0.95em] w-[2px] translate-y-[0.12em] rounded-full bg-primary-dark"
        />
      </span>
    </span>
  );
}

/* ─── Expand Button ─── */

/* ─── Section Header (eyebrow + two-tone headline) ─── */

function SectionHeader({
  eyebrow,
  title,
  muted,
  subtitle,
  className,
}: {
  eyebrow: string;
  title: string;
  muted?: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("mx-auto max-w-2xl text-center", className)}
    >
      <p className="mb-3 text-sm font-medium tracking-[0.14em] text-primary-base uppercase">
        {eyebrow}
      </p>
      <h2 className="text-display-xs font-semibold -tracking-[0.5px] text-text-primary md:text-display-sm lg:text-display-md">
        {title}
        {muted && (
          <>
            {" "}
            <span className="font-semibold text-text-primary">{muted}</span>
          </>
        )}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-xl text-md font-light leading-relaxed text-text-secondary lg:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

/* ─── Stacked Glass Cards (3D signature visual) ─── */

function StackedGlassCards() {
  const layers = [
    {
      label: "DeepChat",
      background: "linear-gradient(135deg, #DCD5FF 0%, #8C71F6 100%)",
      tz: 88,
    },
    {
      label: "KI-Schulbüro",
      background: "linear-gradient(135deg, #C6BDFA 0%, #2547D0 100%)",
      tz: 44,
    },
    {
      label: "Schulwebsites",
      background: "linear-gradient(135deg, #CBD5FF 0%, #5B6BFF 100%)",
      tz: 0,
    },
    {
      label: "Materialien & Tools",
      background: "linear-gradient(135deg, #E1E4EA 0%, #B7ADF5 100%)",
      tz: -44,
    },
    {
      label: "Fortbildungen",
      background: "linear-gradient(135deg, #D6C8FF 0%, #6D4BD6 100%)",
      tz: -88,
    },
  ];

  const pills = [
    "Kuratiertes Prompting",
    "DSGVO-konform gehostet",
    "KI-Assistent im Unterricht",
    "Materialien direkt integriert",
  ];

  return (
    <div className="relative flex h-[380px] w-full items-center justify-center [perspective:1500px] lg:h-[440px]">
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="relative h-[280px] w-[280px] [transform-style:preserve-3d]"
          style={{ transform: "rotateX(55deg) rotateZ(-42deg)" }}
        >
          {layers.map((l, i) => (
            <div
              key={l.label}
              className="absolute inset-0 flex flex-col justify-end rounded-[28px] border border-white/50 p-5"
              style={{
                transform: `translateZ(${l.tz}px)`,
                background: l.background,
                boxShadow: "0 40px 70px -25px rgba(37,71,208,0.45)",
              }}
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
                {l.label}
              </span>

              {/* Floating status pills sit on the top layer */}
              {i === 0 && (
                <div className="absolute inset-0 p-5">
                  {pills.map((p, j) => (
                    <span
                      key={p}
                      className="absolute left-5 flex items-center gap-2 rounded-full bg-white/25 px-3 py-1.5 text-[11px] font-medium whitespace-nowrap text-white backdrop-blur-sm"
                      style={{ top: `${18 + j * 42}px` }}
                    >
                      <span className="size-1.5 shrink-0 rounded-full bg-emerald-300" />
                      {p}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Main Page ─── */

export default function ChooserLanding() {
  const [introComplete, setIntroComplete] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("ddki-intro-seen") === "1";
    }
    return false;
  });
  const [expanded, setExpanded] = useState<
    "fortbildungen" | "software" | null
  >(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  // Stable background — no colour shift on hover (calmer, more cohesive)
  const bgGradient = BG_NEUTRAL;

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
          <IntroOverlay onComplete={() => {
            setIntroComplete(true);
            sessionStorage.setItem("ddki-intro-seen", "1");
          }} />
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
          <PlatformSwitcher variant="light" activePlatform="plattform" />
          <ButtonLink href="https://plattform.deepdive-ki.de/auth/signin">
            Login
          </ButtonLink>
        </motion.header>

        {/* Main Content */}
        <div className="relative z-10 flex flex-1 flex-col items-center px-4 pt-24 pb-12">
          <div className="mx-auto flex w-full max-w-304 flex-col items-center">
            {/* Hero — near full-height */}
            <div className="flex min-h-[calc(100dvh-8rem)] w-full flex-col items-center justify-center">
            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={introComplete ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: AFTER_INTRO + 0.1,
                ease: "easeOut",
              }}
              className="relative mx-auto max-w-4xl text-center"
            >
              {/* Shader backdrop behind headline — enlarged, pulsing */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[760px] w-[1320px] max-w-[140vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden blur-[14px]"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(ellipse at center, black 0%, transparent 68%)",
                  maskImage:
                    "radial-gradient(ellipse at center, black 0%, transparent 68%)",
                }}
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{
                  opacity: [0.45, 0.62, 0.45],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 7,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              >
                <HeadlineShaderBackground />
              </motion.div>

              <h1 className="text-display-md font-light -tracking-[0.96px] text-text-primary md:text-display-lg lg:text-display-xl">
                DeepDiveKI ist Ihr Partner für{" "}
                <span className="bg-gradient-to-r from-primary-dark to-primary-darker bg-clip-text font-semibold text-transparent">
                  Fortbildungen
                </span>{" "}
                &amp;{" "}
                <span className="bg-gradient-to-r from-primary-dark to-primary-darker bg-clip-text font-semibold text-transparent">
                  Software-Lösungen
                </span>
              </h1>

              <p className="mx-auto mt-7 max-w-2xl text-lg font-light text-text-secondary lg:text-xl">
                Praxisnah &amp; DSGVO-konform – für{" "}
                <TypewriterWords
                  words={[
                    "Lehrkräfte",
                    "Schüler",
                    "Eltern",
                    "Schulen",
                    "Universitäten",
                  ]}
                />
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/fortbildung/kontakt"
                  className="inline-flex items-center gap-2 rounded-[10px] border border-white/10 px-4 py-2.5 font-inter text-sm font-medium -tracking-[0.084px] text-white transition-colors duration-300 hover:bg-gray-700 [background:linear-gradient(180deg,rgba(255,255,255,0.16)0%,rgba(255,255,255,0)100%),#181B25] [box-shadow:0_1px_2px_0_rgba(21,14,27,0.24),_0_0_0_1px_#000]"
                >
                  Kontakt
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="https://plattform.deepdive-ki.de/auth/signup"
                  className="inline-flex items-center gap-2 rounded-[10px] border border-border-secondary bg-background-primary px-4 py-2.5 font-inter text-sm font-medium -tracking-[0.084px] text-text-primary transition-colors duration-300 hover:bg-background-secondary"
                >
                  Registrieren
                </a>
              </div>
            </motion.div>
            </div>

            {/* Section Label */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-4 text-center text-sm font-medium tracking-[0.14em] text-primary-base uppercase"
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
                className="h-full"
              >
                <Link
                  href="/fortbildung"
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl [background:linear-gradient(150deg,#b9a7fb_0%,#8c71f6_46%,#5f5bef_100%)] lg:p-8"
                >
                  {/* Gradient shader background */}
                  <div className="absolute inset-0 z-0">
                    <AnimationErrorBoundary>
                      <CardShaderBackground variant="fortbildungen" />
                    </AnimationErrorBoundary>
                  </div>

                  {/* Slowly rotating logo watermark */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center overflow-hidden"
                  >
                    <Image
                      src="/images/logo/logo.svg"
                      alt=""
                      width={440}
                      height={440}
                      className="animate-logo-spin size-[52%] max-w-none opacity-[0.14] brightness-0 invert"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-[2] mt-6 flex flex-1 flex-col justify-end">
                    <h2 className="text-display-xs font-semibold tracking-tight lg:text-display-sm">
                      Fortbildungen
                    </h2>
                    <p className="mt-2 min-h-[3em] text-md font-light text-white/80 lg:text-lg">
                      Praxisnahe Lehrerfortbildungen in KI, Digitalisierung &amp;
                      Pädagogik
                    </p>
                    <div className="mt-6 flex items-center justify-end">
                      <ArrowRight className="size-6 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
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
                className="h-full"
              >
                <Link
                  href="/software"
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl [background:linear-gradient(160deg,#241150_0%,#100826_100%)] lg:p-8"
                >
                  {/* Coloured glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-0"
                    style={{
                      background:
                        "radial-gradient(ellipse 65% 55% at 60% 44%, rgba(134,70,244,0.32) 0%, rgba(140,113,246,0.08) 45%, transparent 72%)",
                    }}
                  />
                  {/* Grid optic */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(140,113,246,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(140,113,246,0.09) 1px, transparent 1px)",
                      backgroundSize: "26px 26px",
                    }}
                  />
                  {/* 3D AI engine */}
                  <div className="absolute inset-0 z-0">
                    <AnimationErrorBoundary>
                      <AIEngineMini />
                    </AnimationErrorBoundary>
                  </div>
                  {/* Legibility fade toward the title */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-[1]"
                    style={{
                      background:
                        "linear-gradient(to top right, rgba(16,8,38,0.88) 0%, rgba(16,8,38,0.25) 35%, transparent 62%)",
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-[2] mt-6 flex flex-1 flex-col justify-end">
                    <h2 className="text-display-xs font-semibold tracking-tight lg:text-display-sm">
                      Software
                    </h2>
                    <p className="mt-2 min-h-[3em] text-md font-light text-white/80 lg:text-lg">
                      DeepChat, KI-Schulbüro &amp; digitale Lösungen für Schulen
                    </p>
                    <div className="mt-6 flex items-center justify-end">
                      <ArrowRight className="size-6 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Platform Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-24 w-full lg:mt-32"
          >
            <div className="mx-auto grid max-w-304 grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="text-center lg:text-left">
                <p className="mb-3 text-sm font-medium tracking-[0.14em] text-primary-base uppercase">
                  Die DeepDiveKI-Plattform
                </p>
                <h2 className="text-display-xs font-semibold -tracking-[0.5px] text-text-primary md:text-display-sm lg:text-display-md">
                  Eine Plattform –{" "}
                  <span className="font-semibold text-text-primary">
                    alles an einem Ort.
                  </span>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-md font-light leading-relaxed text-text-secondary lg:mx-0 lg:text-lg">
                  Fortbildungen, DeepChat, KI-Schulbüro, Schulwebsites und
                  kuratierte Materialien greifen ineinander – DSGVO-konform
                  gehostet und direkt im Unterricht einsetzbar.
                </p>
                <ul className="mx-auto mt-6 flex max-w-md flex-col gap-3 text-left lg:mx-0">
                  {[
                    "Moderne Technologie und starke LLM's",
                    "KI-Assistent, der Aufgaben & Material erstellt",
                    "Datenschutzkonform für den Schulalltag",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-md font-light text-text-secondary"
                    >
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-light/60">
                        <span className="size-2 rounded-full bg-primary-dark" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <AnimationErrorBoundary>
                <StackedGlassCards />
              </AnimationErrorBoundary>
            </div>
          </motion.div>

          {/* DeepChat in action — grainy gradient mockup */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-24 w-full lg:mt-32"
          >
            <div className="mx-auto grid max-w-304 grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="order-2 lg:order-1">
                <SchulbueroMockup />
              </div>
              <div className="order-1 text-center lg:order-2 lg:text-left">
                <p className="mb-3 text-sm font-medium tracking-[0.14em] text-primary-base uppercase">
                  KI-Schulbüro in Aktion
                </p>
                <h2 className="text-display-xs font-semibold -tracking-[0.5px] text-text-primary md:text-display-sm lg:text-display-md">
                  Von der E-Mail zur{" "}
                  <span className="font-semibold text-text-primary">
                    erledigten Aufgabe.
                  </span>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-md font-light leading-relaxed text-text-secondary lg:mx-0 lg:text-lg">
                  Das KI-Schulbüro erfasst Anfragen automatisch – ordnet sie zu,
                  pflegt sie ins System ein, benachrichtigt die richtigen
                  Personen und archiviert alles rechtssicher.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Logo Banner */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-24 w-full lg:mt-32"
          >
            <p className="mb-10 text-center text-sm font-medium tracking-[0.14em] text-primary-base uppercase">
              Vertraut von Schulen &amp; Institutionen
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
                      className="flex w-40 shrink-0 items-center justify-center px-5 md:w-52 md:px-8"
                    >
                      <Image
                        src={client.image}
                        alt={client.alt}
                        width={120}
                        height={48}
                        className="h-11 w-auto object-contain opacity-70 transition-all duration-300 hover:scale-105 hover:opacity-100 md:h-14"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-24 w-full lg:mt-32"
          >
            <SectionHeader
              eyebrow="Stimmen aus der Praxis"
              title="Was Lehrkräfte"
              muted="über uns sagen"
              className="mb-10"
            />
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
                className="scrollbar-hide flex gap-4 overflow-x-auto px-12 py-5 scroll-smooth"
              >
                {TESTIMONIALS.map((t, i) => (
                  <motion.div
                    key={t.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
                    whileHover={{ y: -6 }}
                    className="w-72 shrink-0 rounded-xl border border-border-tertiary bg-white p-5 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-primary-base/60 hover:shadow-md md:w-80"
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
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* School Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-24 w-full lg:mt-32"
          >
            <SectionHeader
              eyebrow="Referenzen"
              title="Was Schulen &"
              muted="Institutionen sagen"
              className="mb-10"
            />
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SCHOOL_TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={t.author}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
                  whileHover={{ y: -6 }}
                  className="flex h-full flex-col rounded-2xl border border-border-tertiary bg-white p-6 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-primary-base/60 hover:shadow-lg lg:p-8"
                >
                  <Quote className="mb-3 size-5 text-primary-base opacity-40" />
                  <p className="text-sm font-light leading-relaxed text-text-secondary">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  {t.highlight && (
                    <p className="mt-2 text-sm font-light italic text-text-secondary">
                      &ldquo;{t.highlight}&rdquo;
                    </p>
                  )}
                  <p className="mt-auto pt-4 text-sm font-semibold text-text-primary">
                    {t.author}
                  </p>
                  <p className="text-xs text-text-tertiary">{t.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Über uns */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-24 w-full lg:mt-32"
          >
            <SectionHeader
              eyebrow="Über uns"
              title="Unser"
              muted="Team"
              subtitle="Wir sind ein junges Team aus Hamburg mit einer Leidenschaft für Künstliche Intelligenz und Bildung. Unsere Vision ist es, KI für alle zugänglich zu machen und den Einsatz von KI im Bildungsbereich zu fördern."
            />

            <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {teamData.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="rounded-full bg-gradient-to-br from-primary-base via-primary-dark to-primary-darker p-[3px] shadow-md transition-transform duration-300 hover:scale-105">
                    <div className="size-32 overflow-hidden rounded-full bg-white lg:size-40">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={160}
                        height={160}
                        className={cn(
                          "size-full object-cover",
                          (member.image === "/images/team/team-01.png" ||
                            member.image === "/images/team/team-02.png") &&
                            "scale-125",
                          member.image === "/images/team/team-06.png" &&
                            " object-[center_35%]",
                        )}
                      />
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-text-primary">
                    {member.name}
                  </h3>
                  <p className="mt-1 whitespace-pre-line text-sm font-light text-text-secondary">
                    {member.designation}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <ContactFormSection />

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
            &copy; {new Date().getFullYear()} DeepDiveKI. Alle Rechte vorbehalten.
          </p>
        </motion.footer>
      </motion.div>
    </>
  );
}
