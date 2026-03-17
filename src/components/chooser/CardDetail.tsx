"use client";

import { motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import AnimationErrorBoundary from "@/components/shared/AnimationErrorBoundary";
import dynamic from "next/dynamic";
import FortbildungenAnimation from "./FortbildungenAnimation";

const AIEngineMini = dynamic(() => import("./AIEngineMini"), { ssr: false });

/* ─── Animation helpers ─── */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const fadeUpSlow = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

/* ─── Fortbildungen Detail ─── */

const FORTBILDUNGEN_PRODUCTS = [
  {
    category: "Künstliche Intelligenz",
    title: "KI im Unterricht",
    desc: "Praktische Methoden für den Einsatz von KI-Tools im Schulalltag. Von Prompt Engineering bis zur Integration in den Fachunterricht.",
    href: "/fortbildung/fortbildungen",
  },
  {
    category: "Flexible Formate",
    title: "Modulare Kurse",
    desc: "Vom Crash-Kurs bis zum Deep-Dive — flexibel buchbar. Individuelle Lernpfade für jedes Erfahrungslevel.",
    href: "/fortbildung/fortbildungen",
  },
  {
    category: "Nachweis",
    title: "Zertifizierte Abschlüsse",
    desc: "Anerkannte Fortbildungsnachweise für Ihr Portfolio. Dokumentierte Kompetenzen für Ihre berufliche Weiterentwicklung.",
    href: "/fortbildung/fortbildungen",
  },
  {
    category: "Kollegium",
    title: "Pädagogischer Tag",
    desc: "Maßgeschneiderte Workshops für Ihr gesamtes Kollegium. Gemeinsam digitale Kompetenzen aufbauen und den Schulalltag transformieren.",
    href: "/fortbildung/paedagogischer-tag",
  },
];

function FortbildungenProductCard({
  product,
}: {
  product: (typeof FORTBILDUNGEN_PRODUCTS)[number];
}) {
  return (
    <motion.div variants={fadeUpSlow}>
      <Link
        href={product.href}
        className="group relative flex flex-col rounded-2xl border border-border-tertiary bg-white/35 p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-border-secondary hover:bg-white/50 hover:shadow-lg lg:p-9"
      >
        {/* Category */}
        <span className="text-xs font-medium tracking-wide text-primary-darker uppercase">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="mt-3 text-xl font-semibold -tracking-[0.3px] text-text-primary lg:text-2xl">
          {product.title}
        </h3>

        {/* Description */}
        <p className="mt-2.5 text-sm font-light leading-relaxed text-text-secondary lg:text-[15px]">
          {product.desc}
        </p>

        {/* Link indicator */}
        <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-primary-darker">
          Mehr erfahren
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </Link>
    </motion.div>
  );
}

export function FortbildungenDetail({ onClose }: { onClose: () => void }) {
  return (
    <DetailShell onClose={onClose}>
      <motion.div
        className="flex flex-col gap-14 lg:gap-20"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Hero */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            variants={fadeUp}
            className="inline-block rounded-full bg-primary-light/30 px-3.5 py-1 text-xs font-medium tracking-wide text-primary-darker"
          >
            Fortbildungen
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-display-sm font-light -tracking-[0.96px] text-text-primary lg:text-display-md"
          >
            Praxisnahe Fortbildungen für Lehrkräfte
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-md font-light leading-relaxed text-text-secondary lg:text-lg"
          >
            Entdecken Sie unser umfangreiches Angebot an Fortbildungen in den
            Bereichen KI, Digitalisierung und Pädagogik — individuell und
            zukunftsorientiert.
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          className="mx-auto flex w-full max-w-md justify-between"
        >
          {[
            { value: "40+", label: "Kursthemen" },
            { value: "500+", label: "Teilnehmer" },
            { value: "98%", label: "Zufriedenheit" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-display-sm font-semibold -tracking-[0.5px] text-primary-darker lg:text-display-md">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-light text-text-tertiary">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={fadeUp}
          className="mx-auto h-px w-16 bg-border-tertiary"
        />

        {/* Product grid */}
        <div className="relative">
          {/* Animation center — hidden on mobile */}
          <div className="pointer-events-none absolute inset-0 z-0 hidden items-center justify-center lg:flex">
            <div className="h-72 w-72 opacity-60">
              <AnimationErrorBoundary>
                <FortbildungenAnimation />
              </AnimationErrorBoundary>
            </div>
          </div>

          <motion.div
            variants={stagger}
            className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5"
          >
            {FORTBILDUNGEN_PRODUCTS.map((product) => (
              <FortbildungenProductCard
                key={product.title}
                product={product}
              />
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/fortbildung"
            className="inline-flex items-center gap-2.5 rounded-xl bg-primary-darker px-7 py-3.5 text-[15px] font-medium text-white transition-all duration-200 hover:-translate-y-px hover:shadow-lg hover:shadow-primary-darker/20"
          >
            Fortbildungen entdecken
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/fortbildung/kontakt"
            className="inline-flex items-center gap-2 rounded-xl border border-border-secondary bg-white px-7 py-3.5 text-[15px] font-medium text-text-primary transition-all duration-200 hover:-translate-y-px hover:shadow-md"
          >
            Kontakt aufnehmen
          </Link>
        </motion.div>
      </motion.div>
    </DetailShell>
  );
}

/* ─── Software Detail ─── */

const SOFTWARE_PRODUCTS = [
  {
    category: "KI-Chat",
    title: "DeepChat",
    desc: "Der intelligente und datenschutzkonforme Chatbot für Lehrkräfte und Schüler. Optimiert für Bildungszwecke und Lernunterstützung.",
    href: "/software/ddki-toolbox",
  },
  {
    category: "Schulbüro 3.0",
    title: "KI-Schulbüro",
    desc: "Das intelligente Verwaltungsbüro für Schulen. Automatisierte Prozesse, Dokumentenverwaltung und effiziente Kommunikation.",
    href: "/software/chatbot-fuer-ihre-schule",
  },
  {
    category: "Online Auftritt",
    title: "Websites für Schulen",
    desc: "Professionelle Schulwebsites mit modernem Design und benutzerfreundlicher Bedienung. Responsive Layouts und Content-Management-Systeme.",
    href: "/software/websites",
  },
  {
    category: "Workshops",
    title: "Fortbildungen für Lehrkräfte",
    desc: "Professionelle Weiterbildung im Bereich KI für Pädagogen. Modulare Kurse, praktische Anwendungen und zertifizierte Abschlüsse.",
    href: "/fortbildung/fortbildungen",
  },
];

function SoftwareProductCard({
  product,
}: {
  product: (typeof SOFTWARE_PRODUCTS)[number];
}) {
  return (
    <motion.div variants={fadeUpSlow}>
      <Link
        href={product.href}
        className="group relative flex flex-col rounded-2xl border border-purple-500/20 bg-white/5 p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-500/40 hover:bg-white/10 hover:shadow-lg hover:shadow-purple/10 lg:p-9"
      >
        {/* Category */}
        <span className="text-xs font-medium tracking-wide text-purple-light uppercase">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="mt-3 text-xl font-semibold -tracking-[0.3px] text-white lg:text-2xl">
          {product.title}
        </h3>

        {/* Description */}
        <p className="mt-2.5 text-sm font-light leading-relaxed text-white/70 lg:text-[15px]">
          {product.desc}
        </p>

        {/* Link indicator */}
        <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-purple-light">
          Mehr erfahren
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </Link>
    </motion.div>
  );
}

export function SoftwareDetail({ onClose }: { onClose: () => void }) {
  return (
    <DetailShell onClose={onClose} variant="dark">
      <motion.div
        className="flex flex-col gap-14 lg:gap-20"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Hero */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            variants={fadeUp}
            className="inline-block rounded-full bg-purple/15 px-3.5 py-1 text-xs font-medium tracking-wide text-purple-light"
          >
            Software-Lösungen
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-display-sm font-bold -tracking-[0.96px] text-white lg:text-display-md"
          >
            KI-Software für den Schulalltag
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-md font-light leading-relaxed text-white/70 lg:text-lg"
          >
            DeepChat, KI-Schulbüro und weitere digitale Lösungen — entwickelt
            für die Anforderungen moderner Schulen.
          </motion.p>
        </div>

        {/* Divider */}
        <motion.div
          variants={fadeUp}
          className="mx-auto h-px w-16 bg-purple-500/30"
        />

        {/* Product grid */}
        <div className="relative">
          {/* AIEngine center — hidden on mobile */}
          <div className="pointer-events-none absolute inset-0 z-0 hidden items-center justify-center lg:flex">
            <div className="h-80 w-64 opacity-50">
              <AnimationErrorBoundary>
                <AIEngineMini />
              </AnimationErrorBoundary>
            </div>
          </div>

          <motion.div
            variants={stagger}
            className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5"
          >
            {SOFTWARE_PRODUCTS.map((product) => (
              <SoftwareProductCard key={product.title} product={product} />
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/software"
            className="inline-flex items-center gap-2.5 rounded-xl bg-purple px-7 py-3.5 text-[15px] font-medium text-white transition-all duration-200 hover:-translate-y-px hover:bg-purple-light hover:shadow-lg hover:shadow-purple/20"
          >
            Alle Produkte entdecken
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/software/kontakt"
            className="inline-flex items-center gap-2 rounded-xl border border-purple-500/30 bg-white/5 px-7 py-3.5 text-[15px] font-medium text-white transition-all duration-200 hover:-translate-y-px hover:bg-white/10 hover:shadow-md"
          >
            Demo anfragen
          </Link>
        </motion.div>
      </motion.div>
    </DetailShell>
  );
}

/* ─── Shared Shell ─── */

function DetailShell({
  children,
  onClose,
  variant = "light",
}: {
  children: React.ReactNode;
  onClose: () => void;
  variant?: "light" | "dark";
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Focus trap: focus the panel on mount
  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        className="fixed inset-x-3 top-16 bottom-3 z-[70] mx-auto max-w-304 overflow-y-auto overscroll-contain rounded-3xl shadow-2xl outline-none md:inset-x-6 lg:top-20 lg:bottom-6"
        style={{
          background:
            variant === "dark"
              ? "linear-gradient(170deg, #0F0C1F 0%, #030014 100%)"
              : "#ffffff",
          ...(variant === "dark"
            ? {
                backgroundImage: `
                  linear-gradient(170deg, #0F0C1F 0%, #030014 100%),
                  linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
                `,
                backgroundSize: "100% 100%, 24px 24px, 24px 24px",
              }
            : {}),
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300,
          mass: 0.8,
        }}
      >
        {/* Close button — pinned top-right */}
        <div className="sticky top-0 z-20 flex justify-end px-5 pt-5">
          <button
            onClick={onClose}
            aria-label="Schließen"
            className={`flex size-10 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-200 ${
              variant === "dark"
                ? "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80"
                : "bg-black/[0.03] text-text-tertiary hover:bg-black/[0.06] hover:text-text-primary"
            }`}
          >
            <X className="size-4.5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pt-2 pb-10 md:px-12 lg:px-16 lg:pt-4 lg:pb-16">
          {children}
        </div>
      </motion.div>
    </>
  );
}
