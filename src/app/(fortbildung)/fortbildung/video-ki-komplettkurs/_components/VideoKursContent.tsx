"use client";

import KomplettkursMockup from "@/components/chooser/KomplettkursMockup";
import { GlassStep, GrainCard } from "@/components/fortbildungen/GrainCard";
import ButtonLink from "@/components/ui/button-link-fortbildung";
import { Modal } from "@/components/ui/modal";
import {
  HeaderEyebrow,
  HeaderSubtitle,
  HeaderTitle,
  SectionHeader,
} from "@/components/ui/section-header-fortbildung";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Award,
  BadgeCheck,
  Clock,
  Download,
  MessageCircle,
  MonitorPlay,
  NotebookPen,
  ShoppingCart,
  Sparkles,
  X,
} from "lucide-react";

const KAUF_LINK = "https://buy.stripe.com/6oUdRa3EB8JffCvcAafYY03";
const LOGIN_LINK = "https://plattform.deepdive-ki.de/ki-komplettkurs";

const triggerBtnClass =
  "inline-flex cursor-pointer items-center justify-center gap-1 rounded-[10px] border px-4 py-2.5 font-inter text-sm font-medium -tracking-[0.084px] transition-colors duration-300 focus-visible:outline-0 border-white/10 text-white [background:linear-gradient(180deg,rgba(255,255,255,0.16)0%,rgba(255,255,255,0)100%),#181B25] [box-shadow:0_1px_2px_0_rgba(21,14,27,0.24),_0_0_0_1px_#000] hover:bg-gray-700";

const STATS = [
  { icon: MonitorPlay, value: 65, suffix: "", label: "Videos" },
  { icon: Sparkles, value: 14, suffix: "", label: "Interaktive Tools" },
  { icon: Download, value: 60, suffix: "+", label: "Materialien" },
  { icon: BadgeCheck, value: 3, suffix: "", label: "Quizze" },
];

const MODULES: {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  gradient: "aurora" | "purple" | "ocean";
}[] = [
  {
    eyebrow: "Crash-Kurs",
    title: "KI wirklich verstehen",
    description:
      "Wie funktionieren ChatGPT und Co. unter der Haube? Der Crash-Kurs erklärt es anschaulich und ohne Vorwissen.",
    points: [
      "Sprachmodelle, Token und Halluzinationen verständlich erklärt",
      "Die wichtigsten KI-Tools für die Schule im Überblick",
      "Sicherer Umgang mit Datenschutz und Grenzen der KI",
    ],
    gradient: "aurora",
  },
  {
    eyebrow: "Modul I",
    title: "Unterrichtseinheiten mit KI",
    description:
      "Schritt für Schritt zur kompletten Unterrichtseinheit: von der Idee über Material und Differenzierung bis zur fertigen Stunde.",
    points: [
      "Komplette Unterrichtseinheiten mit KI planen",
      "Arbeitsblätter, Bilder und Differenzierung erstellen",
      "Prompting-Strategien, die im Schulalltag funktionieren",
    ],
    gradient: "purple",
  },
  {
    eyebrow: "Modul II",
    title: "Plagiate, Hausaufgaben & Klausuren",
    description:
      "Souveräne Antworten auf die schwierigen Fragen: Was tun, wenn Texte von der KI stammen? Wie bleiben Prüfungen fair?",
    points: [
      "Warum KI-Detektoren nicht zuverlässig funktionieren",
      "Gesprächsleitfäden und Strategien für Verdachtsfälle",
      "Aufgaben- und Prüfungsformate neu denken",
    ],
    gradient: "ocean",
  },
];

const FEATURES = [
  {
    icon: Clock,
    title: "In Ihrem Tempo",
    description:
      "Rund 4,5 Stunden Videomaterial, jederzeit abrufbar. Sie lernen, wann und wo es in Ihren Alltag passt.",
  },
  {
    icon: MonitorPlay,
    title: "14 interaktive Tools",
    description:
      "Direkt im Kurs ausprobieren statt nur zuschauen: interaktive Übungen und Werkzeuge zu den Lektionen.",
  },
  {
    icon: Download,
    title: "60+ Materialien als PDF",
    description:
      "Checklisten, Leitfäden und Vorlagen zu jeder Lektion, fertig gestaltet zum Herunterladen und Einsetzen.",
  },
  {
    icon: NotebookPen,
    title: "Notizen & Ergebnisse",
    description:
      "Halten Sie Ihre Gedanken und Arbeitsergebnisse direkt im Kurs fest und finden Sie sie jederzeit wieder.",
  },
  {
    icon: Sparkles,
    title: "Sofort umsetzbar",
    description:
      "Alle Beispiele kommen aus dem echten Schulalltag. Was Sie heute lernen, nutzen Sie morgen im Unterricht.",
  },
  {
    icon: Award,
    title: "Zertifikat inklusive",
    description:
      "Nach drei bestandenen Quizzen erhalten Sie Ihr digitales Fortbildungszertifikat als Nachweis.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    const duration = 1400;
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function VideoKursContent() {
  const [accessOpen, setAccessOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[linear-gradient(180deg,#DDD7FE_0%,#FFF_100%)] hero-offset pb-10 lg:pb-20">
        <div className="mx-auto grid max-w-304 grid-cols-1 items-center gap-10 px-4 lg:grid-cols-2 lg:gap-16 xl:px-0">
          <div className="text-center lg:text-left">
            <p className="mb-3 text-sm font-medium tracking-[0.14em] text-primary-base uppercase">
              Video-KI-Komplettkurs
            </p>
            <h1 className="text-display-sm font-semibold -tracking-[0.96px] text-text-primary lg:text-display-lg">
              Vom KI-Einstieg zur souveränen Praxis
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-md font-light leading-relaxed text-text-secondary lg:mx-0 lg:text-lg">
              Der Videokurs für Lehrkräfte: KI wirklich verstehen, komplette
              Unterrichtseinheiten mit KI planen und souveräne Antworten auf
              Plagiate, Hausaufgaben und Klausuren entwickeln.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <button
                type="button"
                onClick={() => setAccessOpen(true)}
                className={triggerBtnClass}
              >
                Zugang anfragen
              </button>
              <ButtonLink
                href="https://plattform.deepdive-ki.de/ki-komplettkurs"
                variant="secondary"
              >
                Ich habe bereits Zugang
              </ButtonLink>
            </div>
          </div>
          <KomplettkursMockup />
        </div>
      </section>

      {/* Zahlen-Band */}
      <section className="bg-white py-10 lg:py-14">
        <div className="mx-auto grid max-w-304 grid-cols-2 gap-4 px-4 md:grid-cols-4 xl:px-0">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
              className="group rounded-2xl bg-[#F9F8FB] px-4 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <span className="mx-auto flex size-11 items-center justify-center rounded-xl bg-primary-base/15 transition-transform duration-300 group-hover:scale-110">
                <stat.icon className="size-5.5 text-primary-darker" />
              </span>
              <p className="mt-3 bg-[linear-gradient(120deg,#8646F4_0%,#D345F8_100%)] bg-clip-text text-display-xs font-semibold -tracking-[0.5px] text-transparent lg:text-display-sm">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-sm font-medium text-text-secondary">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Kursaufbau */}
      <section className="bg-white py-10 md:py-14 lg:py-24">
        <div className="mx-auto max-w-304 px-4 xl:px-0">
          <SectionHeader>
            <HeaderEyebrow>Kursaufbau</HeaderEyebrow>
            <HeaderTitle>Drei Stationen bis zur KI-Souveränität</HeaderTitle>
            <HeaderSubtitle>
              Vom verständlichen Einstieg über die konkrete Unterrichtsplanung
              bis zu den schwierigen Fragen rund um Prüfungen und Plagiate.
            </HeaderSubtitle>
          </SectionHeader>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-16">
            {MODULES.map((mod, index) => (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
              >
                <GrainCard gradient={mod.gradient} className="h-full max-w-none">
                  <div className="rounded-2xl border border-white/25 bg-white/10 p-5 backdrop-blur-md">
                    <p className="text-xs font-medium tracking-[0.14em] text-white/70 uppercase">
                      {mod.eyebrow}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      {mod.title}
                    </h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-white/85">
                      {mod.description}
                    </p>
                    <div className="my-4 h-px w-full bg-white/20" />
                    <div className="flex flex-col gap-2.5">
                      {mod.points.map((point) => (
                        <GlassStep key={point}>{point}</GlassStep>
                      ))}
                    </div>
                  </div>
                </GrainCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* So funktioniert der Kurs */}
      <section className="bg-[#F9F8FB] py-10 md:py-14 lg:py-24">
        <div className="mx-auto max-w-304 px-4 xl:px-0">
          <SectionHeader>
            <HeaderEyebrow>So funktioniert der Kurs</HeaderEyebrow>
            <HeaderTitle>Lernen, das in den Schulalltag passt</HeaderTitle>
          </SectionHeader>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: (index % 3) * 0.1,
                }}
                className="rounded-2xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary-base/10">
                  <feature.icon className="size-5.5 text-primary-base" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-text-primary">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-text-secondary">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Abschluss-CTA */}
      <section className="bg-white px-4 py-10 md:py-14 lg:py-28 xl:px-0">
        <motion.div
          {...fadeUp}
          className="relative isolate mx-auto flex max-w-304 items-center justify-center overflow-hidden rounded-[32px] py-10 [background:linear-gradient(155deg,#8b5cf6_0%,#a78bfa_38%,#d68cfa_72%,#f0bdfa_100%)] md:py-14 lg:py-20"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "140px 140px",
            }}
          />
          <div className="flex w-full flex-col items-center justify-center px-4 text-center lg:max-w-207.25">
            <h2 className="w-full max-w-[90%] text-display-sm font-semibold -tracking-[0.96px] text-white md:max-w-[70%] lg:max-w-162.5 lg:text-display-lg">
              Starten Sie Ihre KI-Fortbildung
            </h2>
            <p className="mt-2 max-w-100 text-sm font-light tracking-[0.48px] text-white/85 md:max-w-100 lg:mt-4 lg:max-w-130 lg:text-md">
              Sichern Sie sich Zugang zum Video-KI-Komplettkurs und lernen Sie
              in Ihrem Tempo, wie KI Ihren Unterricht bereichert.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:mt-11">
              <button
                type="button"
                onClick={() => setAccessOpen(true)}
                className={triggerBtnClass}
              >
                Zugang anfragen
              </button>
              <ButtonLink
                href="https://plattform.deepdive-ki.de/ki-komplettkurs"
                variant="secondary"
              >
                Zum Kurs-Login
              </ButtonLink>
            </div>
          </div>
        </motion.div>
      </section>

      <Modal
        open={accessOpen}
        onClose={() => setAccessOpen(false)}
        className="h-auto max-h-[90vh] max-w-[480px]"
      >
        <div className="relative rounded-2xl bg-white p-7 shadow-2xl">
          <button
            type="button"
            onClick={() => setAccessOpen(false)}
            aria-label="Schließen"
            className="absolute right-4 top-4 rounded-full p-1.5 text-text-tertiary transition hover:bg-background-secondary hover:text-text-primary"
          >
            <X className="size-4.5" />
          </button>

          <p className="text-sm font-medium tracking-[0.14em] text-primary-base uppercase">
            Video-KI-Komplettkurs
          </p>
          <h2
            id="search-dialog-title"
            className="mt-2 text-xl font-semibold text-text-primary"
          >
            Zugang zum Kurs
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            Kaufen Sie Ihren Zugang direkt online oder nehmen Sie Kontakt mit uns
            auf.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href={KAUF_LINK}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary-base px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              <ShoppingCart className="size-4.5" />
              Jetzt kaufen
            </a>

            <Link
              href="/fortbildung/kontakt"
              onClick={() => setAccessOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl border border-border-secondary bg-white px-4 py-3 text-sm font-semibold text-text-primary transition hover:bg-background-secondary"
            >
              <MessageCircle className="size-4.5" />
              Zum Kontaktformular
            </Link>
          </div>

          <div className="mt-6 rounded-xl border border-border-secondary bg-background-secondary/60 p-4">
            <p className="text-sm leading-relaxed text-text-secondary">
              Sie haben Ihren Zugang bereits über eine andere Plattform erworben?
              Dann ist nur noch ein{" "}
              <a
                href={LOGIN_LINK}
                className="font-medium text-primary-base underline underline-offset-2 hover:text-primary-dark"
              >
                Login
              </a>{" "}
              nötig. Sollte etwas nicht funktionieren, melden Sie sich einfach{" "}
              <Link
                href="/fortbildung/kontakt"
                onClick={() => setAccessOpen(false)}
                className="font-medium text-primary-base underline underline-offset-2 hover:text-primary-dark"
              >
                bei uns
              </Link>
              .
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
