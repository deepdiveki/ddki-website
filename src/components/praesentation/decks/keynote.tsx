"use client";

import KomplettkursMockup from "@/components/chooser/KomplettkursMockup";
import SchulbueroMockup from "@/components/chooser/SchulbueroMockup";
import AnimationErrorBoundary from "@/components/shared/AnimationErrorBoundary";
import { motion } from "framer-motion";
import { Brain, Presentation, Shield } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Brand,
  Eyebrow,
  GreenDot,
  Headline,
  Reveal,
  SlideFrame,
  StageGlassPanel,
  StageGrainCard,
  Stagger,
} from "../blocks";
import { useInstant } from "../motion";
import type { Deck, SlideProps } from "../types";
import { getDeckMeta } from "./manifest";

const HeadlineShaderBackground = dynamic(
  () => import("@/components/chooser/HeadlineShaderBackground"),
  { ssr: false },
);
const AIEngineMini = dynamic(() => import("@/components/chooser/AIEngineMini"), {
  ssr: false,
});

/* ─── 1 · Titel ─── */

function TitleSlide({ active }: SlideProps) {
  return (
    <SlideFrame theme="dark">
      <div className="absolute inset-0">
        <AnimationErrorBoundary>
          <HeadlineShaderBackground />
        </AnimationErrorBoundary>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,8,32,0.35)_0%,rgba(11,8,32,0.55)_55%,rgba(11,8,32,0.92)_100%)]" />
      <Brand theme="dark" />
      <div className="relative mt-auto flex items-end justify-between px-20 pb-24">
        <div className="max-w-[1250px]">
          <Stagger index={0} active={active}>
            <Eyebrow className="text-white/80">DeepDiveKI · Keynote</Eyebrow>
          </Stagger>
          <Stagger index={1} active={active}>
            <Headline size="xl" className="mt-6 text-white">
              KI in der Bildung.
            </Headline>
          </Stagger>
          <Stagger index={2} active={active}>
            <p className="mt-10 max-w-[1000px] text-[40px] leading-[1.3] font-light text-white/85">
              Was sich im Klassenzimmer gerade verändert und was wir damit anfangen.
            </p>
          </Stagger>
        </div>
        <Stagger index={3} active={active} className="shrink-0">
          <div className="flex items-center gap-5 rounded-full border border-white/20 bg-white/10 py-3 pr-9 pl-3 backdrop-blur-md">
            <div className="rounded-full p-1 [background:linear-gradient(155deg,#8b5cf6_0%,#a78bfa_38%,#d68cfa_72%,#f0bdfa_100%)]">
              <div className="relative size-24 overflow-hidden rounded-full border-4 border-[#0b0820] bg-[#DDD7FE]">
                <Image
                  src="/images/team/team-01-cutout.webp"
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-[30px] font-semibold text-white">Björn Isenbiel</p>
              <p className="text-[22px] text-white/70">
                Lehrer · Geschäftsführer DeepDiveKI
              </p>
            </div>
          </div>
        </Stagger>
      </div>
    </SlideFrame>
  );
}

/* ─── 2 · Wer spricht ─── */

const SPEAKER_POINTS = [
  "Lehrkraft für PGW, Informatik und Sport, nach wie vor im Unterricht",
  "Mitgründer und Geschäftsführer von DeepDiveKI, Hamburg",
  "Wissenschaftlicher Mitarbeiter an der Leuphana, Promotion zu KI und Bildung",
  "Entwickler des Video-KI-Komplettkurses für Lehrkräfte",
];

function SpeakerSlide({ active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="grid h-full grid-cols-[760px_1fr] items-center gap-24 px-20 pt-28 pb-20">
        <Stagger index={0} active={active}>
          <StageGrainCard gradient="purple" className="h-[780px] p-0">
            <div className="relative h-full w-full">
              <Image
                src="/images/team/team-01-cutout.webp"
                alt="Björn Isenbiel"
                fill
                sizes="760px"
                className="object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent_0%,rgba(11,8,32,0.75)_100%)] px-10 pt-32 pb-10">
                <p className="text-[48px] font-semibold text-white">Björn Isenbiel</p>
                <p className="text-[26px] text-white/80">deepdive-ki.de/fortbildung/keynote</p>
              </div>
            </div>
          </StageGrainCard>
        </Stagger>
        <div>
          <Stagger index={1} active={active}>
            <Eyebrow>Wer hier spricht</Eyebrow>
            <Headline size="md" className="mt-6">
              Lehrer zuerst. <br />
              Dann Gründer.
            </Headline>
          </Stagger>
          <ul className="mt-14 space-y-7">
            {SPEAKER_POINTS.map((point, i) => (
              <Stagger key={point} index={2 + i} active={active}>
                <li className="flex items-start gap-5 text-[32px] leading-snug text-text-secondary">
                  <GreenDot className="border-primary-dark/80 [&>span]:bg-primary-dark" />
                  {point}
                </li>
              </Stagger>
            ))}
          </ul>
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── 3 · Ausgangslage (mit Enthüllungsschritten) ─── */

const TENSION_LINES = [
  "Die bekannten Tools sind dafür nicht freigegeben.",
  "Das Kollegium hat weder Zeit noch Ausbildung dafür.",
  "Und die Fördermittel verfallen derweil.",
];

function TensionSlide({ step, active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col justify-center px-20">
        <Stagger index={0} active={active}>
          <Eyebrow>Die Ausgangslage</Eyebrow>
        </Stagger>
        <Stagger index={1} active={active}>
          <Headline size="lg" className="mt-8">
            Schulen sollen KI einsetzen.
          </Headline>
        </Stagger>
        <div className="mt-16 space-y-6">
          {TENSION_LINES.map((line, i) => (
            <Reveal key={line} when={i + 1} step={step}>
              <p className="text-[56px] leading-tight font-light tracking-[-0.02em] text-text-secondary">
                <span className="mr-6 inline-block w-14 text-primary-dark">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {line}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── 4 · Drei Fragen ─── */

const QUESTIONS = [
  {
    icon: Presentation,
    gradient: "aurora" as const,
    title: "KI im Klassenzimmer",
    text: "Wie verändert KI den Unterricht konkret, und was bleibt die Aufgabe der Lehrkraft?",
  },
  {
    icon: Brain,
    gradient: "purple" as const,
    title: "Zukunft der Bildung",
    text: "Welche Entwicklungen prägen das Bildungssystem in den nächsten Jahren wirklich?",
  },
  {
    icon: Shield,
    gradient: "ocean" as const,
    title: "Datenschutz & Ethik",
    text: "Was ist in der Schule erlaubt, was nicht, und wie entscheiden wir verantwortungsvoll?",
  },
];

function QuestionsSlide({ active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col px-20 pt-40 pb-20">
        <Stagger index={0} active={active}>
          <Eyebrow>Drei Fragen für heute</Eyebrow>
          <Headline size="md" className="mt-6">
            Worüber wir sprechen.
          </Headline>
        </Stagger>
        <div className="mt-16 grid flex-1 grid-cols-3 gap-10">
          {QUESTIONS.map((q, i) => (
            <Stagger key={q.title} index={1 + i} active={active} className="h-full">
              <StageGrainCard gradient={q.gradient} className="h-full">
                <div className="flex size-20 items-center justify-center rounded-2xl border border-white/30 bg-white/15 backdrop-blur-md">
                  <q.icon className="size-10 text-white" />
                </div>
                <p className="mt-auto text-[26px] font-medium tracking-wider text-white/70 uppercase">
                  0{i + 1}
                </p>
                <h3 className="mt-2 text-[48px] leading-tight font-semibold text-white">
                  {q.title}
                </h3>
                <StageGlassPanel className="mt-8">
                  <p className="text-[26px] leading-snug text-white/95">{q.text}</p>
                </StageGlassPanel>
              </StageGrainCard>
            </Stagger>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── 5 · Typewriter (lebt nur im Web) ─── */

const PARTNER_WORDS = [
  "Unterrichtsvorbereitung.",
  "Differenzierung.",
  "Korrektur und Feedback.",
  "Elternkommunikation.",
  "Klassenfahrten.",
  "die Schulverwaltung.",
];

function Typewriter({ words, active }: { words: string[]; active: boolean }) {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const current = words[index % words.length];
  const instant = useInstant();

  useEffect(() => {
    if (!active || instant) return;
    let delay = deleting ? 40 : 75;
    if (!deleting && count === current.length) delay = 1600;
    if (deleting && count === 0) delay = 300;
    const id = window.setTimeout(() => {
      if (!deleting && count === current.length) setDeleting(true);
      else if (deleting && count === 0) {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else setCount((c) => c + (deleting ? -1 : 1));
    }, delay);
    return () => window.clearTimeout(id);
  }, [active, count, deleting, current]);

  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b));
  return (
    <span className="relative inline-block text-left">
      <span className="invisible">{longest}</span>
      <span className="absolute inset-0 whitespace-nowrap text-primary-dark">
        {instant ? current : current.slice(0, count)}
        <span className="typewriter-caret ml-1 inline-block h-[0.9em] w-[6px] translate-y-[0.1em] bg-primary-dark align-baseline" />
      </span>
    </span>
  );
}

function PartnerSlide({ active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col items-center justify-center px-20 text-center">
        <Stagger index={0} active={active}>
          <Eyebrow>Was Lehrkräfte uns berichten</Eyebrow>
        </Stagger>
        <Stagger index={1} active={active}>
          <Headline size="lg" className="mt-10 font-light">
            KI ist mein Partner für
            <br />
            <Typewriter words={PARTNER_WORDS} active={active} />
          </Headline>
        </Stagger>
        <Stagger index={2} active={active}>
          <p className="mt-20 max-w-[1100px] text-[30px] leading-relaxed text-text-tertiary">
            Aus Rückmeldungen von Teilnehmenden unserer Fortbildungen.
            Die Zeitersparnis ist immer das erste Argument. Die Qualität das zweite.
          </p>
        </Stagger>
      </div>
    </SlideFrame>
  );
}

/* ─── 6 · Live statt Screenshot ─── */

const DEMO_POINTS = [
  "KI-Chats im Schulalltag: ChatGPT, Claude, Gemini und Co., Überblick unter deepdive-ki.de/ki-tools",
  "KI-Schulbüro: beantwortet Elternfragen direkt auf der Schulwebsite",
  "Video-Komplettkurs: das Kollegium lernt im eigenen Tempo",
];

function DemoSlide({ active }: SlideProps) {
  const instant = useInstant();
  return (
    <SlideFrame theme="dark">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(140,113,246,0.25)_0%,transparent_60%)]" />
      <Brand theme="dark" />
      <div className="grid h-full grid-cols-[1fr_900px] items-center gap-16 px-20 pt-28 pb-20">
        <div>
          <Stagger index={0} active={active}>
            <Eyebrow className="text-primary-base">Live statt Screenshot</Eyebrow>
            <Headline size="md" className="mt-6 text-white">
              So sieht es aus, wenn eine Schule KI einsetzt.
            </Headline>
          </Stagger>
          <ul className="mt-14 space-y-7">
            {DEMO_POINTS.map((point, i) => (
              <Stagger key={point} index={1 + i} active={active}>
                <li className="flex items-start gap-5 text-[30px] leading-snug text-white/85">
                  <GreenDot />
                  {point}
                </li>
              </Stagger>
            ))}
          </ul>
        </div>
        <div className="relative h-[820px]" data-interactive>
          {active && !instant && (
            <div className="absolute inset-0 z-0 opacity-80">
              <AnimationErrorBoundary>
                <AIEngineMini />
              </AnimationErrorBoundary>
            </div>
          )}
          <Stagger index={2} active={active} className="absolute top-0 left-0 z-10 w-[520px] scale-[1.15] origin-top-left">
            <SchulbueroMockup />
          </Stagger>
          <Stagger index={4} active={active} className="absolute right-0 bottom-0 z-20 w-[520px] scale-[1.15] origin-bottom-right">
            <KomplettkursMockup />
          </Stagger>
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── 7 · Danke ─── */

function ThanksSlide({ active }: SlideProps) {
  return (
    <SlideFrame theme="dark">
      <div className="absolute inset-0 [background:linear-gradient(155deg,#8b5cf6_0%,#a78bfa_38%,#d68cfa_72%,#f0bdfa_100%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "140px 140px",
        }}
      />
      <Brand theme="dark" />
      <div className="relative flex h-full flex-col items-center justify-center text-center">
        <Stagger index={0} active={active}>
          <Headline size="xl" className="text-white">
            Danke.
          </Headline>
        </Stagger>
        <Stagger index={1} active={active}>
          <p className="mt-10 text-[44px] font-light text-white/90">
            Fragen? Jetzt oder später.
          </p>
        </Stagger>
        <Stagger index={2} active={active}>
          <motion.div
            className="mt-20 flex items-center gap-10 rounded-full border border-white/30 bg-white/15 px-14 py-6 text-[30px] text-white backdrop-blur-md"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>deepdive-ki.de/fortbildung/keynote</span>
            <span className="h-8 w-px bg-white/40" />
            <span>info@deepdive-ki.de</span>
          </motion.div>
        </Stagger>
      </div>
    </SlideFrame>
  );
}

/* ─── Deck ─── */

const meta = getDeckMeta("keynote")!;

export const keynoteDeck: Deck = {
  ...meta,
  slides: [
    {
      id: "titel",
      title: "Titel",
      theme: "dark",
      Component: TitleSlide,
      notes:
        "Kurz stehen lassen, Publikum ankommen lassen. Erst dann begrüßen.\n\nEinstiegssatz: „Ich bin Lehrer. Ich stehe montags selbst vor einer Klasse. Alles, was ich heute zeige, habe ich dort ausprobiert.“",
    },
    {
      id: "wer",
      title: "Wer spricht",
      theme: "light",
      Component: SpeakerSlide,
      notes:
        "Maximal 45 Sekunden. Die Punkte nicht vorlesen, nur die Rolle als Lehrkraft betonen. Das ist der Vertrauensanker für das Publikum.",
    },
    {
      id: "ausgangslage",
      title: "Ausgangslage",
      theme: "light",
      steps: 3,
      Component: TensionSlide,
      notes:
        "Headline wirken lassen, dann die drei Punkte einzeln aufdecken (3× Weiter).\n\n1 → Datenschutz: ChatGPT & Co. sind für Schülerdaten nicht freigegeben.\n2 → Zeit: Niemand im Kollegium hat Kapazität, sich das selbst zu erarbeiten.\n3 → Geld: Startchancen und DigitalPakt 2.0 liegen da, werden aber nicht abgerufen.\n\nÜberleitung: „Genau an dieser Stelle setzen wir an.“",
    },
    {
      id: "fragen",
      title: "Drei Fragen",
      theme: "light",
      Component: QuestionsSlide,
      notes:
        "Agenda in drei Fragen. Jede Karte einen Satz, nicht mehr. Zeitplan: Frage 1 bekommt die meiste Zeit.",
    },
    {
      id: "partner",
      title: "Partner für …",
      theme: "light",
      Component: PartnerSlide,
      notes:
        "Der Schreibeffekt läuft automatisch durch. Ruhig abwarten, bis zwei, drei Begriffe durchgelaufen sind.\n\nFrage ins Publikum: „Wer hat diese Woche schon KI für eine dieser Sachen benutzt? Hand hoch.“",
    },
    {
      id: "demo",
      title: "Live-Demo",
      theme: "dark",
      Component: DemoSlide,
      notes:
        "Hier ggf. live in einen KI-Chat wechseln (zweiter Tab vorbereiten!).\n\nFallback ohne WLAN: Die Mockups auf der Folie erklären, was das Schulbüro und der Komplettkurs tun.",
    },
    {
      id: "danke",
      title: "Danke",
      theme: "dark",
      Component: ThanksSlide,
      notes: "Kontakt steht auf der Folie. Fragen aus dem Publikum einsammeln.",
    },
  ],
};
