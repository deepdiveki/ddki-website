"use client";

import AnimationErrorBoundary from "@/components/shared/AnimationErrorBoundary";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Apple,
  ArrowRight,
  AudioLines,
  Bike,
  Brain,
  Bug,
  Coffee,
  Database,
  Glasses,
  MousePointerClick,
  Orbit,
  Pizza,
  ScanSearch,
  Send,
  Shirt,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Brand,
  Eyebrow,
  GreenDot,
  Headline,
  QrCode,
  Reveal,
  SlideFrame,
  StageGlassPanel,
  StageGrainCard,
  Stagger,
} from "../blocks";
import { useInstant } from "../motion";
import type { Deck, SlideProps } from "../types";
import { getDeckMeta } from "./manifest";

/**
 * Deck „Keynote DDKI Nerd Intro“.
 * Baut ausschließlich auf den Folienmustern der Keynote „KI in der Bildung“ auf:
 *  - Titel (dunkel, Shader) · Danke (Lila-Grain)
 *  - Kopfzeile: Brand, Eyebrow + Headline links oben, Inhalt darunter (px-20 pt-36 pb-20)
 *  - Statement mit nummerierten Enthüllungszeilen
 *  - Drei GrainCards im Raster (01/02/03 + GlassPanel)
 *  - Zweispaltig: 760px-GrainCard links, Text/Bullets rechts
 *  - Dunkle Demo-Folie: Text links, Live-Element rechts
 */

const HeadlineShaderBackground = dynamic(
  () => import("@/components/chooser/HeadlineShaderBackground"),
  { ssr: false },
);
const AIEngineMini = dynamic(() => import("@/components/chooser/AIEngineMini"), {
  ssr: false,
});

/** Kopfbereich aller Inhaltsfolien (identisch zur Keynote). */
export function SlideHead({
  eyebrow,
  title,
  active,
  dark = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  active: boolean;
  dark?: boolean;
}) {
  return (
    <Stagger index={0} active={active}>
      <Eyebrow className={dark ? "text-primary-base" : undefined}>{eyebrow}</Eyebrow>
      <Headline size="md" className={cn("mt-6", dark && "text-white")}>
        {title}
      </Headline>
    </Stagger>
  );
}

export const TEAM = [
  {
    name: "Björn Isenbiel",
    role: "Geschäftsführer DeepDiveKI",
    text: "Lehrkraft für Informatik, PGW, Geschichte und Sport am ATW in Hamburg",
    image: "/images/team/team-01-cutout.webp",
    gradient: "purple" as const,
  },
  {
    name: "Tim Philipp",
    role: "Geschäftsführer DeepDiveKI",
    text: "Lehrkraft für Informatik und Sport an der Heinrich-Hertz-Schule in Hamburg",
    image: "/images/team/team-02-cutout.webp",
    gradient: "ocean" as const,
  },
  {
    name: "Dr. Nora Schröder",
    role: "Dozentin KI",
    text: "Learning Experience Designerin und Beraterin für Lehre und Didaktik",
    image: "/images/team/team-06.webp",
    gradient: "aurora" as const,
  },
  {
    name: "Dr. Antonius Baehr-Oliva",
    role: "Dozent KI & Sprache",
    text: "Lehrer und Fachleitung Englisch und Deutsch an der StS Eppendorf in Hamburg",
    image: "/images/team/team-03.png",
    gradient: "purple" as const,
  },
];

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
              Nerd Intro.
            </Headline>
          </Stagger>
          <Stagger index={2} active={active}>
            <p className="mt-10 max-w-[1000px] text-[40px] leading-[1.3] font-light text-white/85">
              Was KI ist, wie ein Sprachmodell arbeitet und warum alles so schnell ging.
            </p>
          </Stagger>
        </div>
        <Stagger index={3} active={active} className="shrink-0">
          <div className="flex items-center gap-5 rounded-full border border-white/20 bg-white/10 py-3 pr-9 pl-4 backdrop-blur-md">
            <div className="flex -space-x-6">
              {TEAM.map((p) => (
                <div
                  key={p.name}
                  className="relative size-20 overflow-hidden rounded-full border-4 border-[#0b0820] bg-[#DDD7FE]"
                >
                  <Image src={p.image} alt="" fill sizes="80px" className="object-cover object-top" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-[30px] font-semibold text-white">Das DeepDiveKI-Team</p>
              <p className="text-[22px] text-white/70">Lehrkräfte · Hamburg</p>
            </div>
          </div>
        </Stagger>
      </div>
    </SlideFrame>
  );
}

/* ─── 2 · Hi! ─── */

export function HiSlide({ active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col px-20 pt-36 pb-20">
        <SlideHead eyebrow="Wer heute spricht" title="Hi!" active={active} />
        <div className="mt-14 grid flex-1 grid-cols-4 gap-8">
          {TEAM.map((person, i) => (
            <Stagger key={person.name} index={1 + i} active={active} className="h-full">
              <StageGrainCard gradient={person.gradient} className="h-full p-0">
                <div className="relative h-full w-full">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="420px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent_0%,rgba(11,8,32,0.85)_100%)] px-7 pt-40 pb-7">
                    <p className="text-[34px] leading-tight font-semibold text-white">
                      {person.name}
                    </p>
                    <p className="mt-1 text-[22px] font-medium text-primary-light">
                      {person.role}
                    </p>
                    <p className="mt-3 text-[20px] leading-snug text-white/80">{person.text}</p>
                  </div>
                </div>
              </StageGrainCard>
            </Stagger>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── 3 · Drei Gewissheiten (Statement-Muster) ─── */

const GEWISSHEITEN = [
  "Alles, was digitalisiert werden kann, wird digitalisiert.",
  "Alles, was vernetzt werden kann, wird vernetzt.",
  "Alles, was automatisiert werden kann, wird automatisiert.",
];

function GewissheitenSlide({ step, active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col justify-center px-20">
        <Stagger index={0} active={active}>
          <Eyebrow>Die Ausgangslage</Eyebrow>
        </Stagger>
        <Stagger index={1} active={active}>
          <Headline size="lg" className="mt-8">
            Drei Gewissheiten.
          </Headline>
        </Stagger>
        <div className="mt-16 space-y-6">
          {GEWISSHEITEN.map((line, i) => (
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

/* ─── 4 · Man kann schnell falsch liegen (Drei-Karten-Muster) ─── */

const QUOTES = [
  {
    year: "1903",
    gradient: "aurora" as const,
    quote: "The automobile is a fad, a novelty. Horses are here to stay.",
    author: "Präsident der Michigan Savings Bank",
    context: "zu Henry Fords Anwalt, der in Ford investieren wollte",
  },
  {
    year: "1998",
    gradient: "purple" as const,
    quote:
      "The internet will fade away because most people have nothing to say to each other. By 2005 it will be clear that the internet's impact on the global economy has been no greater than the fax machine.",
    author: "Paul Krugman",
    context: "Ökonom, später Nobelpreisträger",
  },
  {
    year: "2007",
    gradient: "ocean" as const,
    quote: "There is no chance of the iPhone ever gaining significant market share.",
    author: "Steve Ballmer",
    context: "CEO von Microsoft",
  },
];

export function FalschLiegenSlide({ step, active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col px-20 pt-36 pb-20">
        <SlideHead eyebrow="Prognosen" title="Man kann schnell falsch liegen." active={active} />
        <div className="mt-14 grid flex-1 grid-cols-3 gap-10">
          {QUOTES.map((q, i) => (
            <Reveal key={q.year} when={i + 1} step={step} className="h-full">
              <StageGrainCard gradient={q.gradient} className="h-full">
                <p className="text-[26px] font-medium tracking-wider text-white/70 uppercase">
                  {q.year}
                </p>
                <StageGlassPanel className="mt-6">
                  <p className="text-[26px] leading-snug text-white/95">„{q.quote}“</p>
                </StageGlassPanel>
                <div className="mt-auto pt-8">
                  <h3 className="text-[34px] leading-tight font-semibold text-white">{q.author}</h3>
                  <p className="mt-2 text-[22px] leading-snug text-white/75">{q.context}</p>
                </div>
              </StageGrainCard>
            </Reveal>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── 5 · Was ist K.I.? (Demo-Muster, dunkel) ─── */

const KI_POINTS = [
  "Keine Magie, sondern Mathematik: Muster aus Daten.",
  "Lernt nicht wie ein Kind, sondern wie eine Statistik.",
  "Kann beeindruckend viel. Und versteht trotzdem nichts.",
];

export function WasIstKiSlide({ active }: SlideProps) {
  const instant = useInstant();
  return (
    <SlideFrame theme="dark">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(140,113,246,0.25)_0%,transparent_60%)]" />
      <Brand theme="dark" />
      <div className="grid h-full grid-cols-[1fr_900px] items-center gap-16 px-20 pt-28 pb-20">
        <div>
          <SlideHead eyebrow="Nerd Intro · Grundlagen" title="Was ist K.I.?" active={active} dark />
          <ul className="mt-14 space-y-7">
            {KI_POINTS.map((point, i) => (
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
          {active && !instant ? (
            <AnimationErrorBoundary>
              <AIEngineMini />
            </AnimationErrorBoundary>
          ) : (
            <div className="flex h-full items-center justify-center">
              <StageGrainCard gradient="ocean" className="size-[560px] items-center justify-center">
                <Brain className="m-auto size-64 text-white/90" strokeWidth={1.2} />
              </StageGrainCard>
            </div>
          )}
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── 6 · Quickdraw (Zweispalten-Muster) ─── */

const DOODLES = [Bike, Pizza, Apple, Coffee, Shirt, Glasses, Bug, Brain];

export function QuickdrawSlide({ active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="grid h-full grid-cols-[760px_1fr] items-center gap-24 px-20 pt-28 pb-20">
        <Stagger index={0} active={active}>
          <StageGrainCard gradient="aurora" className="h-[780px]">
            <StageGlassPanel className="text-center">
              <p className="text-[52px] font-semibold tracking-tight text-white">
                Flugs gezeichnet!
              </p>
              <p className="mt-2 text-[24px] text-white/80">
                Erkennt ein neuronales Netz, was Sie kritzeln?
              </p>
            </StageGlassPanel>
            <div className="mt-8 grid flex-1 grid-cols-4 gap-5">
              {DOODLES.map((Icon, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center rounded-3xl border border-white/25 bg-white/10"
                >
                  <Icon className="size-16 text-white" strokeWidth={1.4} />
                </div>
              ))}
            </div>
          </StageGrainCard>
        </Stagger>
        <div>
          <Stagger index={1} active={active}>
            <Eyebrow>Mitmachen · 20 Sekunden pro Begriff</Eyebrow>
            <Headline size="md" className="mt-6">
              Quickdraw.
            </Headline>
            <p className="mt-6 text-[34px] font-medium text-primary-dark">
              quickdraw.withgoogle.com
            </p>
          </Stagger>
          <Stagger index={2} active={active} className="mt-12">
            <QrCode value="https://quickdraw.withgoogle.com" size={380} />
          </Stagger>
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── 7 · Wofür eigentlich KI? (Drei-Karten-Muster) ─── */

const PIPELINE = [
  {
    icon: Database,
    gradient: "aurora" as const,
    title: "Analyse großer Datenmengen",
    text: "Mehr Daten, als ein Mensch je lesen könnte.",
  },
  {
    icon: ScanSearch,
    gradient: "purple" as const,
    title: "Muster erkennen",
    text: "Regelmäßigkeiten, die niemand explizit programmiert hat.",
  },
  {
    icon: MousePointerClick,
    gradient: "ocean" as const,
    title: "Entscheidungen treffen",
    text: "Die Ausgabe: ein Wort, ein Bild, eine Empfehlung, eine Handlung.",
  },
];

export function PipelineSlide({ step, active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col px-20 pt-36 pb-20">
        <SlideHead eyebrow="Wofür eigentlich KI?" title="Daten rein. Entscheidung raus." active={active} />
        <div className="mt-14 grid flex-1 grid-cols-3 gap-10">
          {PIPELINE.map((item, i) => (
            <Reveal key={item.title} when={i} step={step} className="h-full">
              <StageGrainCard gradient={item.gradient} className="h-full">
                <div className="flex size-20 items-center justify-center rounded-2xl border border-white/30 bg-white/15 backdrop-blur-md">
                  <item.icon className="size-10 text-white" />
                </div>
                <p className="mt-auto text-[26px] font-medium tracking-wider text-white/70 uppercase">
                  0{i + 1}
                </p>
                <h3 className="mt-2 text-[44px] leading-tight font-semibold text-white">
                  {item.title}
                </h3>
                <StageGlassPanel className="mt-8">
                  <p className="text-[26px] leading-snug text-white/95">{item.text}</p>
                </StageGlassPanel>
              </StageGrainCard>
            </Reveal>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── 8 · Ausgabe bei ChatGPT (Zweispalten-Muster, Token-Stream) ─── */

const PROMPT =
  "Schreibe mir ein Gedicht im Duktus von Hermann Hesse, das Lehrerinnen und Lehrern LLMs erklärt.";

const POEM = `In stillen Hallen weiser Schulen,
wo Wissen fließt in sanften Wellen,
da stehen Lehrer, stark, geduldig,
und führen Seelen durch die Zeiten.

Die Bücher alt und neu zugleich,
Erinnerungen an weite Reisen,
sie sind die Tore zu den Welten,
wo Geist und Herz sich frei entfalten.

Doch nicht allein der Mensch lehrt hier,
es naht heran in leisen Schritten
ein neues Wesen, klug und stetig,
die LLM, der Weisheit Hüter.

Im stummen Glanz der Monitoren,
wo Daten tanzen, Zeilen fließen,
entsteht ein Werk aus Licht und Zahlen,
das Antworten und Fragen webt.

Die Lehrerinnen und Lehrer nun,
sie finden in den neuen Wegen
ein Bündnis, das den Geist beflügelt,
das Wissen teilt in klaren Strahlen.`;

const POEM_TOKENS = POEM.split(/(\s+)/).filter((t) => t.length > 0);

function TokenStream({ active }: { active: boolean }) {
  const instant = useInstant();
  const [count, setCount] = useState(0);
  const done = count >= POEM_TOKENS.length;

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    if (instant) {
      setCount(POEM_TOKENS.length);
      return;
    }
    let interval = 0;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setCount((c) => {
          if (c >= POEM_TOKENS.length) {
            window.clearInterval(interval);
            return c;
          }
          return c + 1;
        });
      }, 55);
    }, 900);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [active, instant]);

  return (
    <p className="text-[19px] leading-[1.4] whitespace-pre-line text-white/95">
      {POEM_TOKENS.slice(0, count).map((t, i) =>
        /\s/.test(t) ? (
          t
        ) : (
          <span key={i} className={cn("rounded", i === count - 1 && !done && "bg-white/30")}>
            {t}
          </span>
        ),
      )}
      {!done && (
        <span className="ml-1 inline-block h-[1em] w-[3px] translate-y-[0.15em] animate-pulse bg-white" />
      )}
    </p>
  );
}

const CHATGPT_POINTS = [
  "Prompt: eine Anfrage, ein einziger Satz.",
  "Antwort: unverändert und vollautomatisch generiert (GPT-4o).",
  "Die Ausgabe entsteht Token für Token. Genau so, wie Sie es gerade sehen.",
];

export function ChatGptSlide({ active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="grid h-full grid-cols-[760px_1fr] items-center gap-24 px-20 pt-28 pb-20">
        <Stagger index={0} active={active}>
          <StageGrainCard gradient="purple" className="h-[840px] p-6">
            <div className="ml-auto max-w-[560px] rounded-2xl rounded-tr-md border border-white/25 bg-white/15 px-5 py-3 text-[20px] leading-snug text-white backdrop-blur-md">
              {PROMPT}
            </div>
            <StageGlassPanel className="mt-4 flex-1 p-6" data-interactive>
              <div className="flex items-start gap-4">
                <GreenDot />
                <TokenStream active={active} />
              </div>
            </StageGlassPanel>
          </StageGrainCard>
        </Stagger>
        <div>
          <SlideHead eyebrow="Ausgabe bei ChatGPT" title="Was dabei herauskommt." active={active} />
          <ul className="mt-14 space-y-7">
            {CHATGPT_POINTS.map((point, i) => (
              <Stagger key={point} index={1 + i} active={active}>
                <li className="flex items-start gap-5 text-[30px] leading-snug text-text-secondary">
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

/* ─── 9 · Aufgabe eines LLM (feste Spalten, keine Layout-Animationen) ─── */

const PROBS = [
  { token: "ein", p: "90,00 %", width: 90, top: true },
  { token: "eine", p: "5,00 %", width: 5 },
  { token: "seine", p: "2,00 %", width: 2 },
  { token: "deine", p: "1,00 %", width: 1 },
  { token: "du", p: "0,00 %", width: 0 },
  { token: "Atlanta", p: "0,00 %", width: 0 },
];

const LLM_CAPTIONS = [
  "Das nächste Wort (Token) in einer Wortsequenz soll vorhergesagt werden.",
  "Allen möglichen Tokens wird eine Wahrscheinlichkeit zugeordnet.",
  "Der Token mit der höchsten Wahrscheinlichkeit wird angehängt. Dann beginnt alles von vorn.",
];

function Chip({ children, highlight = false }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex h-20 items-center rounded-2xl border px-7 text-[32px] font-medium",
        highlight
          ? "border-primary-dark bg-primary-light text-primary-darker"
          : "border-border-secondary bg-white text-text-primary",
      )}
    >
      {children}
    </span>
  );
}

export function LlmSlide({ step, active }: SlideProps) {
  const instant = useInstant();
  const fade = { duration: instant ? 0 : 0.3 };
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col px-20 pt-36 pb-20">
        <SlideHead eyebrow="Wie ein Sprachmodell arbeitet" title="Aufgabe eines LLM." active={active} />
        <Stagger index={1} active={active} className="mt-12 flex-1">
          <div className="relative flex h-full flex-col rounded-[40px] border border-border-tertiary bg-white p-12 shadow-xl">
            <div className="grid flex-1 grid-cols-[620px_80px_220px_80px_1fr] content-center items-start gap-6">
              {/* Input */}
              <div>
                <p className="text-[20px] font-semibold tracking-[0.14em] text-text-tertiary uppercase">
                  Input (Kontext)
                </p>
                <div className="mt-4 flex gap-3">
                  <Chip>Houston</Chip>
                  <Chip>wir</Chip>
                  <Chip>haben</Chip>
                  <Reveal when={2} step={step}>
                    <Chip highlight>ein</Chip>
                  </Reveal>
                </div>
              </div>
              <ArrowRight className="mt-[52px] size-14 text-text-tertiary" strokeWidth={1.5} />
              {/* LLM */}
              <div className="relative size-40">
                <div className="absolute inset-0 translate-x-4 -translate-y-4 rounded-[28px] bg-[#2a2d3a]" />
                <div className="absolute inset-0 flex items-center justify-center rounded-[28px] bg-[#181b25] shadow-2xl">
                  <span className="text-[32px] font-semibold tracking-wide text-white">LLM</span>
                </div>
              </div>
              <ArrowRight className="mt-[52px] size-14 text-text-tertiary" strokeWidth={1.5} />
              {/* Output */}
              <div className="h-[420px]">
                <p className="text-[20px] font-semibold tracking-[0.14em] text-text-tertiary uppercase">
                  Output
                </p>
                <div className="relative mt-4 h-[400px]">
                  <AnimatePresence mode="wait" initial={false}>
                    {step === 0 && (
                      <motion.div
                        key="s0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={fade}
                        className="absolute inset-x-0 top-0"
                      >
                        <Chip>ein</Chip>
                      </motion.div>
                    )}
                    {step === 1 && (
                      <motion.ul
                        key="s1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={fade}
                        className="absolute inset-x-0 top-0 space-y-2"
                      >
                        {PROBS.map((row) => (
                          <li
                            key={row.token}
                            className={cn(
                              "grid grid-cols-[150px_1fr_130px] items-center gap-4 rounded-xl border px-4 py-2 text-[24px]",
                              row.top
                                ? "border-primary-dark bg-primary-light text-primary-darker"
                                : "border-border-tertiary bg-white text-text-secondary",
                            )}
                          >
                            <span className="font-medium">{row.token}</span>
                            <span className="h-2.5 overflow-hidden rounded-full bg-black/5">
                              <span
                                className="block h-full rounded-full bg-primary-dark"
                                style={{ width: `${Math.max(row.width, 1)}%` }}
                              />
                            </span>
                            <span className="text-right tabular-nums">{row.p}</span>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                    {step >= 2 && (
                      <motion.div
                        key="s2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={fade}
                        className="absolute inset-x-0 top-0"
                      >
                        <Chip>Problem</Chip>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
            {/* Rückkopplung + Bildunterschrift */}
            <div className="mt-auto flex h-24 items-center justify-center gap-6">
              <Reveal when={2} step={step} keepSpace={false}>
                <span className="flex items-center gap-3 rounded-full bg-primary-light px-6 py-3 text-[24px] font-medium text-primary-darker">
                  <ArrowRight className="size-7 rotate-180" />
                  „ein“ wandert in den Input
                </span>
              </Reveal>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={Math.min(step, 2)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={fade}
                  className="text-[30px] leading-snug text-text-secondary"
                >
                  {LLM_CAPTIONS[Math.min(step, 2)]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </Stagger>
      </div>
    </SlideFrame>
  );
}

/* ─── 10 · Soekia GPT (Zweispalten-Muster) ─── */

const SOEKIA_SUGGESTIONS = ["ja nimmermehr", "nimmermehr", "Als sie", "Als es", "Als er", "Als der"];
const SOEKIA_NGRAMS = ["in den Wald", ". Als sie", ". Und als", ". Als es", ". Das Schneiderlein", ". Es war"];

export function SoekiaSlide({ active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="grid h-full grid-cols-[760px_1fr] items-center gap-24 px-20 pt-28 pb-20">
        <Stagger index={0} active={active}>
          <StageGrainCard gradient="ocean" className="h-[780px]">
            <StageGlassPanel className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-[34px] font-semibold tracking-tight text-white">
                  Soekia <span className="align-super text-[14px] font-medium">GPT</span>
                </p>
                <span className="rounded-lg border border-white/40 px-3 py-1 text-[14px] font-semibold tracking-wider text-white uppercase">
                  Schau hinein →
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-white px-4 py-3 text-[18px] text-text-secondary italic">
                Schreibe mir ein Märchen. <Send className="size-5 text-primary-dark" />
              </div>
              <p className="mt-4 text-[17px] leading-relaxed text-white/90">
                Schreibe mir ein Märchen. Da gieng er{" "}
                <span className="rounded bg-white/30 px-1 text-white">ein</span> Welchen neben
                Rotkäppchen her dann sprach er Rotkäppchen sieh einmal die schönen Blumen die rings
                umher stehen warum guckst du dich nicht um? Ich glaube du hörst gar nicht wie die
                Vöglein so lieblich singen …{" "}
                <span className="rounded bg-white/30 px-1 text-white">Als</span>
              </p>
            </StageGlassPanel>
            <div className="mt-4 grid flex-1 grid-cols-2 gap-4">
              <StageGlassPanel className="p-5">
                <p className="text-[18px] font-semibold tracking-wider text-white/80 uppercase">
                  Wortvorschläge
                </p>
                <ul className="mt-3 space-y-2">
                  {SOEKIA_SUGGESTIONS.map((w, i) => (
                    <li key={w} className="flex items-center gap-3 text-[18px] text-white">
                      <GreenDot className="mt-0" />
                      <span className={cn(i === 0 && "font-semibold")}>{w}</span>
                    </li>
                  ))}
                </ul>
              </StageGlassPanel>
              <StageGlassPanel className="p-5">
                <p className="text-[18px] font-semibold tracking-wider text-white/80 uppercase">
                  N-Gramme
                </p>
                <ul className="mt-3 divide-y divide-white/15 text-[18px] text-white/90">
                  {SOEKIA_NGRAMS.map((n) => (
                    <li key={n} className="py-1.5">
                      {n}
                    </li>
                  ))}
                </ul>
              </StageGlassPanel>
            </div>
          </StageGrainCard>
        </Stagger>
        <div>
          <Stagger index={1} active={active}>
            <Eyebrow>Selbst ausprobieren</Eyebrow>
            <Headline size="md" className="mt-6">
              Soekia GPT.
            </Headline>
            <p className="mt-6 text-[34px] font-medium text-primary-dark">soekia.ch/GPT/</p>
          </Stagger>
          <Stagger index={2} active={active} className="mt-12">
            <QrCode value="https://www.soekia.ch/GPT/" size={380} />
          </Stagger>
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── 11 · Transformationsgeschwindigkeit (Spaltenraster, Jahr für Jahr) ─── */

type Milestone = { label: string; detail?: string; product?: boolean };

const TIMELINE: { year: string; items: Milestone[] }[] = [
  { year: "2018", items: [{ label: "Transformer" }, { label: "GPT-1", detail: "117 Mio. Parameter" }] },
  { year: "2019", items: [{ label: "GPT-2", detail: "1,5 Mrd. Parameter" }] },
  { year: "2020", items: [{ label: "GPT-3", detail: "175 Mrd. Parameter" }] },
  { year: "2021", items: [] },
  {
    year: "2022",
    items: [
      { label: "InstructGPT", detail: "GPT-3 + RLHF" },
      { label: "Perplexity", product: true },
      { label: "ChatGPT", product: true },
    ],
  },
  {
    year: "2023",
    items: [
      { label: "GPT-4", detail: "170 Bio. Parameter" },
      { label: "Gemini", product: true },
    ],
  },
  { year: "2024", items: [] },
  { year: "2025", items: [{ label: "DeepSeek", product: true }] },
];

export function TimelineSlide({ active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col px-20 pt-36 pb-20">
        <SlideHead
          eyebrow="Transformationsgeschwindigkeit"
          title="Alles in sieben Jahren."
          active={active}
        />
        <div className="relative mt-14 flex-1">
          {/* Zeitstrahl hinter den Jahreschips */}
          <div className="absolute top-7 right-0 left-0 h-[3px] bg-border-secondary" />
          <div className="relative grid h-full grid-cols-8 gap-5">
            {TIMELINE.map((col, i) => (
              <Stagger key={col.year} index={1 + i} active={active} className="flex flex-col">
                <span
                  className={cn(
                    "mx-auto rounded-full border px-5 py-2 text-[24px] font-semibold tabular-nums",
                    col.items.length
                      ? "border-text-primary bg-text-primary text-white"
                      : "border-border-secondary bg-background-secondary text-text-tertiary",
                  )}
                >
                  {col.year}
                </span>
                <div className="mt-10 flex flex-col gap-5">
                  {col.items.map((item) => (
                    <div
                      key={item.label}
                      className={cn(
                        "flex min-h-[150px] flex-col items-center justify-center rounded-3xl px-4 text-center shadow-md",
                        item.product
                          ? "bg-primary-dark text-white"
                          : "border border-border-tertiary bg-white text-text-primary",
                      )}
                    >
                      <span className="text-[30px] leading-tight font-semibold">{item.label}</span>
                      {item.detail && (
                        <span
                          className={cn(
                            "mt-2 text-[20px] leading-tight",
                            item.product ? "text-white/80" : "text-text-secondary",
                          )}
                        >
                          {item.detail}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </Stagger>
            ))}
          </div>
        </div>
        <Stagger index={10} active={active}>
          <p className="mt-8 flex items-center gap-8 text-[22px] text-text-tertiary">
            <span className="flex items-center gap-3">
              <span className="size-5 rounded-md bg-primary-dark" /> Produkte
            </span>
            <span className="flex items-center gap-3">
              <span className="size-5 rounded-md border border-border-secondary bg-white" /> Modelle
            </span>
          </p>
        </Stagger>
      </div>
    </SlideFrame>
  );
}

/* ─── 12 · 100 Millionen User (Demo-Muster, dunkel) ─── */

const ADOPTION = [
  { name: "Netflix", value: "3,5 Jahre", months: 42 },
  { name: "Twitter", value: "2 Jahre", months: 24 },
  { name: "Facebook", value: "10 Monate", months: 10 },
  { name: "Spotify", value: "5 Monate", months: 5 },
  { name: "Instagram", value: "2,5 Monate", months: 2.5 },
  { name: "ChatGPT", value: "5 Tage", months: 0.17, highlight: true },
];

export function AdoptionSlide({ active }: SlideProps) {
  const instant = useInstant();
  const maxLog = Math.log10(ADOPTION[0].months * 6 + 1);
  return (
    <SlideFrame theme="dark">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(140,113,246,0.25)_0%,transparent_55%)]" />
      <Brand theme="dark" />
      <div className="flex h-full flex-col px-20 pt-36 pb-20">
        <SlideHead
          eyebrow="Zeit bis 100 Millionen Nutzer"
          title="100 Millionen User."
          active={active}
          dark
        />
        <div className="mt-10 grid flex-1 grid-cols-6 items-end gap-10">
          {ADOPTION.map((item, i) => {
            const h = Math.max(0.06, Math.log10(item.months * 6 + 1) / maxLog);
            return (
              <div key={item.name} className="flex h-full flex-col items-center justify-end">
                <motion.span
                  className={cn(
                    "mb-5 text-[40px] font-semibold tabular-nums",
                    item.highlight ? "text-primary-base" : "text-white",
                  )}
                  initial={{ opacity: 0 }}
                  animate={active ? { opacity: 1 } : {}}
                  transition={{ delay: instant ? 0 : 0.5 + i * 0.15 }}
                >
                  {item.value}
                </motion.span>
                <div className="flex h-[400px] w-full items-end justify-center">
                  <motion.div
                    className={cn(
                      "w-28 rounded-t-3xl",
                      item.highlight
                        ? "[background:linear-gradient(180deg,#d68cfa_0%,#8b5cf6_100%)] shadow-[0_0_60px_rgba(140,113,246,0.6)]"
                        : "bg-white/20",
                    )}
                    initial={{ height: 0 }}
                    animate={active ? { height: `${h * 100}%` } : {}}
                    transition={{
                      duration: instant ? 0 : 0.8,
                      delay: instant ? 0 : 0.3 + i * 0.15,
                      ease: "easeOut",
                    }}
                  />
                </div>
                <span className="mt-6 text-[28px] font-medium text-white/85">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── 13 · Entwicklung der KI (Drei-Karten-Muster) ─── */

const STAGES = [
  {
    icon: AudioLines,
    gradient: "aurora" as const,
    title: "Schwache KI",
    sub: "Weak AI · gibt es",
    text: "KI-Systeme, die auf spezifische Aufgaben spezialisiert sind und keine allgemeine Intelligenz besitzen. „Hey Siri.“",
  },
  {
    icon: Brain,
    gradient: "purple" as const,
    title: "Starke KI",
    sub: "Strong AI · hypothetisch",
    text: "KI-Systeme mit einer allgemeinen Intelligenz, die der menschlichen ebenbürtig oder überlegen ist.",
  },
  {
    icon: Orbit,
    gradient: "ocean" as const,
    title: "Überlegene KI",
    sub: "Superintelligence · hypothetisch",
    text: "Eine Form der KI, die in allen Bereichen die menschliche Intelligenz weit übertrifft.",
  },
];

export function StagesSlide({ step, active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col px-20 pt-36 pb-20">
        <SlideHead eyebrow="Entwicklung der KI" title="Drei Stufen. Eine davon gibt es." active={active} />
        <div className="mt-14 grid flex-1 grid-cols-3 gap-10">
          {STAGES.map((stage, i) => (
            <Reveal key={stage.title} when={i} step={step} className="h-full">
              <StageGrainCard gradient={stage.gradient} className="h-full">
                <div className="flex size-20 items-center justify-center rounded-2xl border border-white/30 bg-white/15 backdrop-blur-md">
                  <stage.icon className="size-10 text-white" />
                </div>
                <p className="mt-auto text-[22px] font-medium tracking-wider text-white/70 uppercase">
                  {stage.sub}
                </p>
                <h3 className="mt-2 text-[48px] leading-tight font-semibold text-white">
                  {stage.title}
                </h3>
                <StageGlassPanel className="mt-8">
                  <p className="text-[26px] leading-snug text-white/95">{stage.text}</p>
                </StageGlassPanel>
              </StageGrainCard>
            </Reveal>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── 14 · Danke ─── */

export function ThanksSlide({ active }: SlideProps) {
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
          <p className="mt-10 text-[44px] font-light text-white/90">Fragen? Jetzt oder später.</p>
        </Stagger>
        <Stagger index={2} active={active}>
          <div className="mt-20 flex items-center gap-10 rounded-full border border-white/30 bg-white/15 px-14 py-6 text-[30px] text-white backdrop-blur-md">
            <span>deepdive-ki.de</span>
            <span className="h-8 w-px bg-white/40" />
            <span>info@deepdive-ki.de</span>
          </div>
        </Stagger>
      </div>
    </SlideFrame>
  );
}

/* ─── Deck ─── */

const meta = getDeckMeta("nerd-intro")!;

export const nerdIntroDeck: Deck = {
  ...meta,
  slides: [
    {
      id: "titel",
      title: "Titel",
      theme: "dark",
      Component: TitleSlide,
      notes: "Kurz stehen lassen, Publikum ankommen lassen. Dann begrüßen.",
    },
    {
      id: "hi",
      title: "Hi!",
      theme: "light",
      Component: HiSlide,
      notes: "Wer heute im Raum ist, stellt sich selbst vor. Die anderen nur kurz nennen.",
    },
    {
      id: "gewissheiten",
      title: "Drei Gewissheiten",
      theme: "light",
      steps: 3,
      Component: GewissheitenSlide,
      notes:
        "Headline wirken lassen, dann die drei Zeilen einzeln aufdecken (3× Weiter).\n\nDigitalisieren → Vernetzen → Automatisieren. KI ist die dritte Stufe.",
    },
    {
      id: "falsch-liegen",
      title: "Man kann schnell falsch liegen",
      theme: "light",
      steps: 3,
      Component: FalschLiegenSlide,
      notes:
        "Drei Karten, je ein Zitat (3× Weiter). Auflockerung: Wer hätte 2007 das iPhone unterschätzt?\n\nPointe: Auch bei KI werden wir uns in Teilen irren, in beide Richtungen.",
    },
    {
      id: "was-ist-ki",
      title: "Was ist K.I.?",
      theme: "dark",
      Component: WasIstKiSlide,
      notes:
        "Frage offen ins Publikum stellen, zwei, drei Antworten einsammeln. Die 3D-Animation rechts läuft von allein.",
    },
    {
      id: "quickdraw",
      title: "Quickdraw",
      theme: "light",
      Component: QuickdrawSlide,
      notes:
        "Mitmach-Phase: QR-Code scannen, 20 Sekunden pro Begriff. Danach: Woher weiß das Netz, was eine Pizza ist? Überleitung zur nächsten Folie.",
    },
    {
      id: "pipeline",
      title: "Wofür eigentlich KI?",
      theme: "light",
      steps: 2,
      Component: PipelineSlide,
      notes:
        "Drei Karten, zwei Schritte: Analyse großer Datenmengen → Muster erkennen → Entscheidungen treffen.\n\nBrücke zu Quickdraw: Millionen Kritzeleien (Daten) → Muster → „Das ist eine Pizza“ (Ausgabe).",
    },
    {
      id: "chatgpt",
      title: "Ausgabe bei ChatGPT",
      theme: "light",
      Component: ChatGptSlide,
      notes:
        "Das Gedicht baut sich Token für Token auf (ca. 10 Sekunden). Nicht vorlesen, laufen lassen und auf die drei Punkte rechts zeigen.\n\nPrompt: „Schreibe mir ein Gedicht im Duktus von Hermann Hesse, das Lehrerinnen und Lehrern LLMs erklärt.“ Antwort unverändert von GPT-4o.",
    },
    {
      id: "llm",
      title: "Aufgabe eines LLM",
      theme: "light",
      steps: 2,
      Component: LlmSlide,
      notes:
        "Schritt 0: Nur das nächste Wort vorhersagen.\nSchritt 1 (Weiter): Alle Tokens bekommen eine Wahrscheinlichkeit, „ein“ gewinnt mit 90 %.\nSchritt 2 (Weiter): „ein“ wandert in den Input, Modell sagt „Problem“ vorher. Der Kreis schließt sich.\n\nKernsatz: Ein LLM versteht nichts, es rechnet Wahrscheinlichkeiten. Und trotzdem entsteht daraus brauchbarer Text.",
    },
    {
      id: "soekia",
      title: "Soekia GPT",
      theme: "light",
      Component: SoekiaSlide,
      notes:
        "Mitmach-Phase 2: Soekia zeigt live, wie ein kleines Modell Token für Token entscheidet (Wortvorschläge, N-Gramme). Verankert das LLM-Bild von eben.",
    },
    {
      id: "timeline",
      title: "Transformationsgeschwindigkeit",
      theme: "light",
      Component: TimelineSlide,
      notes:
        "Spalten blenden Jahr für Jahr ein. Lila = Produkte, Weiß = Modelle.\n\n2018 Transformer + GPT-1 → 2019 GPT-2 → 2020 GPT-3 → 2022 InstructGPT, Perplexity, ChatGPT → 2023 GPT-4, Gemini → 2025 DeepSeek.\n\nHinweis: Parameterzahl von GPT-4 ist nicht offiziell bestätigt.",
    },
    {
      id: "adoption",
      title: "100 Millionen User",
      theme: "dark",
      Component: AdoptionSlide,
      notes:
        "Balken wachsen nacheinander, ChatGPT leuchtet. Nicht maßstäblich (logarithmisch gestaucht), sonst wären die kleinen Werte unsichtbar.\n\nNetflix 3,5 Jahre · Twitter 2 Jahre · Facebook 10 Monate · Spotify 5 Monate · Instagram 2,5 Monate · ChatGPT 5 Tage. Quelle vor dem Vortrag prüfen.",
    },
    {
      id: "stages",
      title: "Entwicklung der KI",
      theme: "light",
      steps: 2,
      Component: StagesSlide,
      notes:
        "Zwei Schritte: Schwache KI (gibt es, z. B. Siri, ChatGPT) → Starke KI (hypothetisch) → Überlegene KI (hypothetisch).\n\nAbschluss der Grundlagen: Alles, was wir heute nutzen, ist schwache KI. Auch die beeindruckendste.",
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
