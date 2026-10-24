"use client";

import AnimationErrorBoundary from "@/components/shared/AnimationErrorBoundary";
import { cn } from "@/lib/utils";
import {
  Anchor,
  BookOpen,
  Bug,
  CircleHelp,
  FlaskConical,
  Gauge,
  MessagesSquare,
  Route,
  SlidersHorizontal,
  Sparkles,
  UserRound,
  Users,
  Zap,
} from "lucide-react";
import dynamic from "next/dynamic";
import { Bricolage_Grotesque } from "next/font/google";
import Image from "next/image";
import { SparkMark } from "../SparkMark";
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
import { SPARK_LIVE } from "../live/activities";
import { LivePollSlide, LiveWordsSlide } from "../live/StageLive";
import type { Deck, SlideProps } from "../types";
import { CardsSlide, GridSlide, StatementSlide } from "./crash-kurs";
import { getDeckMeta } from "./manifest";
import { SlideHead } from "./nerd-intro";

/**
 * Keynote „SPARK: Individuelle Lernwege mit KI“.
 * Baut auf den Mustern der Keynote „KI in der Bildung“ und des Nerd Intro auf.
 *
 * Kern: Live-Experiment mit Seilen. Gruppe A lernt den Palstek mit SPARK
 * (Kurs „Palstek – den wichtigsten Seemannsknoten lernen“ in der SPARK-App),
 * Gruppe B bekommt nur einen fertig geknoteten Palstek als Vorlage.
 *
 * Beitrittscode: Die SPARK-App erzeugt pro Kurs einen sechsstelligen Code
 * (Lehrkraft → Kurs → Lobby). Vor dem Vortrag entweder SPARK_JOIN_CODE unten
 * anpassen oder die Bühne mit ?join=CODE öffnen, z. B.
 * /praesentation/spark?join=K7PX2M
 */

const DECK = "spark";
const L = SPARK_LIVE;

const SPARK_URL = "https://spark-ten-alpha.vercel.app";
const SPARK_JOIN_CODE = "PALSTK";
const SPARK_AMBER = "#f7b32b";
const WORK_MINUTES = 8;

/** Überschriften-Schrift der SPARK-App (siehe spark/src/app/layout.tsx). */
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["700", "800"], display: "swap" });

/** Design-Token der SPARK-App (spark/src/app/globals.css). */
const SPARK = {
  page: "linear-gradient(135deg,#d6efe9 0%,#e6ebfb 50%,#ddd9f4 100%)",
  hero: "radial-gradient(90% 80% at 90% 4%,#4fd0be 0%,transparent 52%), radial-gradient(60% 55% at 42% 112%,rgba(214,224,255,0.5) 0%,transparent 60%), linear-gradient(152deg,#3fb3c6 0%,#5b81d6 50%,#93a1e7 100%)",
  grain:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.42' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
  ink: "#191a2c",
  inkSoft: "#33344a",
  markVars: { "--spark": "#f7b32b", "--spark-deep": "#e0951a", "--spark-core": "#fff4d6", "--sky": "#aecdf4" } as React.CSSProperties,
};

const HeadlineShaderBackground = dynamic(
  () => import("@/components/chooser/HeadlineShaderBackground"),
  { ssr: false },
);

/** Beitrittscode aus ?join=…, sonst Konstante. */
function useJoinCode() {
  const [code, setCode] = useState(SPARK_JOIN_CODE);
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("join");
    if (c) setCode(c.trim().toUpperCase());
  }, []);
  return code;
}

const joinUrl = (code: string) => `${SPARK_URL}/join/${code}`;
const shortHost = SPARK_URL.replace(/^https?:\/\//, "");

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
            <Eyebrow className="text-white/80">DeepDiveKI · Keynote · Forschungsprojekt SPARK</Eyebrow>
          </Stagger>
          <Stagger index={1} active={active}>
            <Headline size="xl" className="mt-6 text-white">
              Der Knoten im Kopf.
            </Headline>
          </Stagger>
          <Stagger index={2} active={active}>
            <p className="mt-10 max-w-[1050px] text-[40px] leading-[1.3] font-light text-white/85">
              Wie KI individuelle Lernwege erzeugt. Ein Experiment mit zwei Gruppen, einem Seil
              und einem Knoten.
            </p>
          </Stagger>
        </div>
        <Stagger index={3} active={active} className="shrink-0">
          <div className="flex items-center gap-5 rounded-full border border-white/20 bg-white/10 py-3 pr-9 pl-3 backdrop-blur-md">
            <div className="rounded-full p-1 [background:linear-gradient(155deg,#3fc9bd_0%,#7b98f3_48%,#c2b2fb_100%)]">
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
              <p className="text-[22px] text-white/70">Lehrer · Leuphana · DeepDiveKI</p>
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
  "Wissenschaftlicher Mitarbeiter an der Leuphana, Teilprojekt „Didaktisch-technische Entwicklung“ im Verbund SPARK",
  "Entwickler des SPARK-Prototyps, der heute im Raum läuft",
  "Mitgründer und Geschäftsführer von DeepDiveKI, Hamburg",
];

function SpeakerSlide({ active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="grid h-full grid-cols-[760px_1fr] items-center gap-24 px-20 pt-28 pb-20">
        <Stagger index={0} active={active}>
          <StageGrainCard gradient="spark" className="h-[780px] p-0">
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
                <p className="text-[26px] text-white/80">deepdive-ki.de</p>
              </div>
            </div>
          </StageGrainCard>
        </Stagger>
        <div>
          <Stagger index={1} active={active}>
            <Eyebrow>Wer hier spricht</Eyebrow>
            <Headline size="md" className="mt-6">
              Lehrer zuerst. <br />
              Dann Forscher.
            </Headline>
          </Stagger>
          <ul className="mt-14 space-y-7">
            {SPEAKER_POINTS.map((point, i) => (
              <Stagger key={point} index={2 + i} active={active}>
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

/* ─── 6 · SPARK vorstellen (im Design der SPARK-App) ─── */

const SPARK_LETTERS = [
  { letter: "S", word: "Sensemaking" },
  { letter: "P", word: "Personalized Learning" },
  { letter: "A", word: "Agency" },
  { letter: "R", word: "Regulation" },
  { letter: "K", word: "Knowledge Building" },
];

const PARTNERS = [
  { name: "Universität Ulm", role: "Koordination · Lernpsychologie", logo: "/images/spark/uni-ulm.svg", h: 64 },
  { name: "PH Schwäbisch Gmünd", role: "Fachdidaktik · Climate Literacy", logo: "/images/spark/ph-gmuend.svg", h: 44 },
  { name: "Leuphana Lüneburg", role: "Didaktisch-technische Entwicklung", logo: "/images/spark/leuphana.svg", h: 64 },
];

const HERO_CHIPS = ["Sokratischer Dialog", "Präkonzept-Diagnostik", "Learning Analytics"];

function SparkIntroSlide({ active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <div className="absolute inset-0" style={{ background: SPARK.page }} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: SPARK.grain, backgroundSize: "200px 200px" }}
      />
      <Brand />
      <div className="relative flex h-full flex-col px-20 pt-36 pb-16">
        <Stagger index={0} active={active}>
          <Eyebrow>Das Forschungsprojekt · spark-ten-alpha.vercel.app</Eyebrow>
        </Stagger>

        {/* Hero-Kachel wie auf der SPARK-Startseite */}
        <Stagger index={1} active={active} className="mt-6">
          <div
            className="relative isolate h-[590px] overflow-hidden rounded-[40px] px-16 py-14 text-white shadow-[0_24px_60px_-30px_rgba(60,40,110,0.3)]"
            style={{ background: SPARK.hero }}
          >
            <div
              className="pointer-events-none absolute inset-y-0 right-0 -z-10 flex w-[52%] items-center justify-center [mask-image:linear-gradient(to_right,transparent,#000_30%)]"
              style={SPARK.markVars}
            >
              <SparkMark variant="soft" className="size-[700px] translate-x-10" />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-20 opacity-[0.42] mix-blend-overlay"
              style={{ backgroundImage: SPARK.grain, backgroundSize: "200px 200px" }}
            />
            <div className="relative z-10 flex h-full max-w-[1000px] flex-col">
              <div className="flex items-center gap-4">
                <span style={SPARK.markVars}>
                  <SparkMark variant="sharp" className="size-14" />
                </span>
                <span className={cn(bricolage.className, "text-[34px] font-extrabold tracking-tight")}>SPARK</span>
              </div>
              <h2 className={cn(bricolage.className, "mt-7 text-[82px] leading-[1.02] font-extrabold tracking-tight")}>
                Der Funke, der zum <span style={{ color: SPARK_AMBER }}>Denken</span> anregt.
              </h2>
              <p className="mt-6 max-w-[900px] text-[26px] leading-snug text-white/85">
                SPARK gibt keine fertigen Lösungen. Er verbindet kuratierte Inhalte, den
                individuellen Lernstand und die didaktischen Vorgaben der Lehrkraft zu einer
                adaptiven Lernbegleitung.
              </p>
              <div className="mt-auto flex flex-wrap gap-3">
                {HERO_CHIPS.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-white/25 bg-white/15 px-6 py-3 text-[22px] font-semibold backdrop-blur-sm"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Stagger>

        {/* Schwebende Panels: Akronym + Verbundpartner */}
        <div className="mt-6 grid flex-1 grid-cols-[1fr_1.1fr] gap-6">
          <Stagger index={2} active={active} className="h-full">
            <div className="flex h-full flex-col justify-center rounded-[32px] border border-white/60 bg-white/55 px-10 py-7 backdrop-blur-sm">
              <p className="text-[18px] font-bold tracking-[0.18em] uppercase" style={{ color: "rgba(51,52,74,0.55)" }}>
                SPARK steht für
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                {SPARK_LETTERS.map((l) => (
                  <li key={l.letter} className="flex items-baseline gap-2 text-[26px]" style={{ color: SPARK.inkSoft }}>
                    <span className={cn(bricolage.className, "text-[34px] font-extrabold")} style={{ color: SPARK_AMBER }}>
                      {l.letter}
                    </span>
                    {l.word}
                  </li>
                ))}
              </ul>
            </div>
          </Stagger>
          <Stagger index={3} active={active} className="h-full">
            <div className="flex h-full flex-col justify-center rounded-[32px] border border-white/60 bg-white/55 px-10 py-7 text-center backdrop-blur-sm">
              <p className="text-[18px] font-bold tracking-[0.18em] uppercase" style={{ color: "rgba(51,52,74,0.55)" }}>
                Ein Verbundprojekt von
              </p>
              <div className="mt-5 flex items-center justify-between gap-10">
                {PARTNERS.map((p) => (
                  <div key={p.name} className="flex flex-col items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.logo} alt={p.name} style={{ height: p.h }} className="w-auto opacity-80 grayscale" />
                    <span className="text-[17px]" style={{ color: SPARK.inkSoft }}>{p.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </Stagger>
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── 9 · So klingt SPARK (Chat-Mockup, 2 Schritte) ─── */

type Msg = { from: "spark" | "me"; text: string; when: number; badge?: string; chips?: string[] };

const DIALOG: Msg[] = [
  {
    from: "spark",
    when: 0,
    text: "Du hast ein Seil in der Hand? Dann los. Schritt 1: Leg etwa zwei Handbreit vom Ende ein kleines Auge ins lange Seil, so dass das kurze Ende oben liegt. Beschreib mir kurz, was du jetzt in der Hand hältst.",
  },
  { from: "me", when: 1, text: "Ich hab eine kleine Schlaufe, das kurze Ende liegt unten drunter." },
  {
    from: "spark",
    when: 1,
    text: "Fast. Das kurze Ende muss oben aus dem Auge kommen, sonst geht der Knoten später unter Last auf. Dreh das Auge einmal um. Liegt das Ende jetzt oben?",
    badge: "Diagnostik: Fehlvorstellung „Auge verkehrt herum“ erkannt",
  },
  { from: "me", when: 2, text: "Jetzt liegt es oben." },
  {
    from: "spark",
    when: 2,
    text: "Genau so. Jetzt der Merkspruch: Das Kaninchen kommt aus dem Loch. Steck das kurze Ende von unten durch das Auge. Was siehst du?",
    chips: ["Was ist das Kaninchen?", "Nächster Schritt"],
  },
];

const SPARK_POINTS = [
  "Ein Schritt pro Nachricht. Weiter geht es erst, wenn du beschreibst, was du in der Hand hältst.",
  "Nach jedem Satz prüft SPARK: Passt das zu einer typischen Fehlvorstellung? Dann ändert sich der nächste Schritt.",
  "Die Lehrkraft hat vorher eingestellt: anleiten statt zurückhalten. Bei einem Knoten wäre Sokrates fehl am Platz.",
];

function SparkChatMockup({ step }: { step: number }) {
  return (
    <StageGrainCard gradient="spark" className="h-[840px] p-6">
      <div className="flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-xl">
        <div className="flex items-center gap-3 border-b border-black/5 px-6 py-4">
          <span
            className="flex size-9 items-center justify-center rounded-xl"
            style={{ background: SPARK_AMBER }}
          >
            <Zap className="size-5 text-[#1b1530]" strokeWidth={2.2} />
          </span>
          <div className="leading-tight">
            <p className="text-[20px] font-semibold text-text-primary">SPARK</p>
            <p className="text-[15px] text-text-tertiary">Palstek · Schritt für Schritt</p>
          </div>
          <span className="ml-auto rounded-full bg-emerald-50 px-3 py-1 text-[14px] font-medium text-emerald-700">
            Überwachen
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-4 overflow-hidden px-6 py-5">
          {DIALOG.map((m, i) => (
            <Reveal key={i} when={m.when} step={step} keepSpace={false}>
              <div className={cn("flex flex-col gap-2", m.from === "me" ? "items-end" : "items-start")}>
                <div
                  className={cn(
                    "max-w-[88%] rounded-2xl px-4 py-3 text-[18px] leading-snug",
                    m.from === "me"
                      ? "rounded-tr-md bg-[#eef0f6] text-text-primary"
                      : "rounded-tl-md border border-black/5 bg-[#faf8ff] text-text-primary",
                  )}
                >
                  {m.text}
                </div>
                {m.badge && (
                  <span className="flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-[14px] font-medium text-rose-700">
                    <Bug className="size-4" /> {m.badge}
                  </span>
                )}
                {m.chips && (
                  <div className="flex flex-wrap gap-2">
                    {m.chips.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border px-3 py-1 text-[15px] font-medium"
                        style={{ borderColor: SPARK_AMBER, color: "#8a5a00", background: "#fff6e0" }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        <div className="border-t border-black/5 px-6 py-4">
          <div className="flex items-center justify-between rounded-xl bg-[#f3f4f8] px-4 py-3 text-[16px] text-text-tertiary">
            Beschreib, was du in der Hand hältst …
            <span className="size-7 rounded-lg" style={{ background: SPARK_AMBER }} />
          </div>
        </div>
      </div>
    </StageGrainCard>
  );
}

function SparkChatSlide({ step, active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="grid h-full grid-cols-[760px_1fr] items-center gap-24 px-20 pt-28 pb-20">
        <Stagger index={0} active={active}>
          <SparkChatMockup step={step} />
        </Stagger>
        <div>
          <SlideHead eyebrow="Ein Dialog, drei Schritte" title="So klingt SPARK." active={active} />
          <ul className="mt-14 space-y-7">
            {SPARK_POINTS.map((point, i) => (
              <li key={point}>
                <Reveal when={i} step={step}>
                  <div className="flex items-start gap-5 text-[28px] leading-snug text-text-secondary">
                    <GreenDot className="border-primary-dark/80 [&>span]:bg-primary-dark" />
                    {point}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── 11 · Zwei Gruppen ─── */

function GroupsSlide({ active }: SlideProps) {
  const code = useJoinCode();
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col px-20 pt-36 pb-20">
        <SlideHead eyebrow="Das Experiment · Seile sind verteilt" title="Zwei Gruppen. Ein Knoten." active={active} />
        <div className="mt-12 grid flex-1 grid-cols-2 gap-10">
          <Stagger index={1} active={active} className="h-full">
            <StageGrainCard gradient="spark" className="h-full">
              <div className="flex items-center justify-between">
                <p className="text-[24px] font-medium tracking-wider text-white/75 uppercase">
                  Gruppe A · linke Raumhälfte
                </p>
                <Zap className="size-10 text-white" strokeWidth={1.8} />
              </div>
              <h3 className="mt-2 text-[48px] leading-tight font-semibold text-white">Mit SPARK.</h3>
              <div className="mt-6 flex flex-1 items-center gap-8">
                <QrCode value={joinUrl(code)} size={330} />
                <div className="flex-1">
                  <p className="text-[20px] font-medium tracking-wider text-white/70 uppercase">Code</p>
                  <p className="mt-1 font-mono text-[56px] leading-none font-semibold tracking-[0.18em] text-white">
                    {code}
                  </p>
                  <p className="mt-3 text-[20px] text-white/80">{shortHost}/join</p>
                  <ul className="mt-6 space-y-3 text-[22px] leading-snug text-white/95">
                    <li className="flex gap-3"><GreenDot className="mt-1" />Handy raus, QR scannen, Vornamen eingeben.</li>
                    <li className="flex gap-3"><GreenDot className="mt-1" />SPARK führt euch Schritt für Schritt. Antwortet ehrlich.</li>
                  </ul>
                </div>
              </div>
            </StageGrainCard>
          </Stagger>
          <Stagger index={2} active={active} className="h-full">
            <StageGrainCard gradient="purple" className="h-full">
              <div className="flex items-center justify-between">
                <p className="text-[24px] font-medium tracking-wider text-white/75 uppercase">
                  Gruppe B · rechte Raumhälfte
                </p>
                <Anchor className="size-10 text-white" strokeWidth={1.8} />
              </div>
              <h3 className="mt-2 text-[48px] leading-tight font-semibold text-white">Mit der Vorlage.</h3>
              <div className="mt-6 flex flex-1 flex-col justify-center">
                <StageGlassPanel className="flex items-center gap-6">
                  <Anchor className="size-24 shrink-0 text-white/90" strokeWidth={1.2} />
                  <p className="text-[26px] leading-snug text-white/95">
                    Ihr bekommt einen fertig geknoteten Palstek in die Hand.
                  </p>
                </StageGlassPanel>
                <ul className="mt-8 space-y-4 text-[26px] leading-snug text-white/95">
                  <li className="flex gap-3"><GreenDot className="mt-1" />Keine Anleitung, keine KI, kein Handy.</li>
                  <li className="flex gap-3"><GreenDot className="mt-1" />Schaut genau hin. Knotet ihn mit eurem Seil nach.</li>
                  <li className="flex gap-3"><GreenDot className="mt-1" />Ihr dürft euch gegenseitig helfen.</li>
                </ul>
              </div>
            </StageGrainCard>
          </Stagger>
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── 12 · Arbeitsphase mit Countdown ─── */

function WorkSlide({ active }: SlideProps) {
  const TOTAL = WORK_MINUTES * 60;
  const code = useJoinCode();
  const [left, setLeft] = useState(TOTAL);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  useEffect(() => {
    if (!active) {
      setStartedAt(null);
      setLeft(TOTAL);
      return;
    }
    const start = startedAt ?? Date.now();
    if (!startedAt) setStartedAt(start);
    const id = window.setInterval(
      () => setLeft(Math.max(0, TOTAL - Math.floor((Date.now() - start) / 1000))),
      500,
    );
    return () => window.clearInterval(id);
  }, [active, TOTAL, startedAt]);
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  return (
    <SlideFrame theme="dark">
      <div className="absolute inset-0 [background:linear-gradient(155deg,#3fc9bd_0%,#7b98f3_48%,#c2b2fb_100%)]" />
      <Brand theme="dark" />
      <div className="relative grid h-full grid-cols-[1fr_640px] items-center gap-20 px-20 pt-28 pb-20">
        <div>
          <Stagger index={0} active={active}>
            <Eyebrow className="text-white/80">Arbeitsphase</Eyebrow>
          </Stagger>
          <Stagger index={1} active={active}>
            <Headline size="lg" className="mt-6 text-white">
              Knoten, bitte.
            </Headline>
          </Stagger>
          <Stagger index={2} active={active}>
            <p
              className="mt-10 text-[200px] leading-none font-semibold tracking-tight text-white tabular-nums"
              data-interactive
              onClick={() => setStartedAt(Date.now())}
              title="Klick: Countdown neu starten"
            >
              {mm}:{ss}
            </p>
            <p className="mt-6 text-[30px] text-white/85">
              {startedAt && left === 0
                ? "Zeit ist um. Seile festhalten, gleich kommt die Zugprobe."
                : "Gruppe A: SPARK auf dem Handy. Gruppe B: die Vorlage ansehen und nachknoten."}
            </p>
          </Stagger>
        </div>
        <Stagger index={3} active={active}>
          <StageGlassPanel className="flex flex-col items-center p-10">
            <p className="text-[22px] font-medium tracking-wider text-white/80 uppercase">Gruppe A</p>
            <div className="mt-5">
              <QrCode value={joinUrl(code)} size={300} />
            </div>
            <p className="mt-5 font-mono text-[44px] leading-none font-semibold tracking-[0.18em] text-white">
              {code}
            </p>
            <p className="mt-2 text-[20px] text-white/80">{shortHost}/join</p>
          </StageGlassPanel>
        </Stagger>
      </div>
    </SlideFrame>
  );
}

/* ─── 16 · Was die Lehrkraft sieht (Dashboard-Mockup) ─── */

const KPIS = [
  { label: "Lernende aktiv", value: "31" },
  { label: "Nachrichten", value: "214" },
  { label: "Ø Schritte bis zum Knoten", value: "6" },
];

const PRECONCEPTS = [
  { label: "Auge verkehrt herum", pct: 38 },
  { label: "Kaninchen auf der falschen Seite", pct: 24 },
  { label: "„Zieht sich doch zu wie jeder Knoten“", pct: 12 },
];

const SRL = [
  { label: "Planen", pct: 18, color: "#7b98f3" },
  { label: "Überwachen", pct: 61, color: SPARK_AMBER },
  { label: "Bewerten", pct: 21, color: "#3fc9bd" },
];

const DASHBOARD_POINTS = [
  "Formative Diagnostik: Nach jedem Satz wird geprüft, welche Fehlvorstellung gerade im Raum ist.",
  "Learning Analytics live: Wer hängt wo? Nicht am Ende der Stunde, sondern jetzt.",
  "Handlungsempfehlung: Die KI schlägt vor, die Lehrkraft entscheidet.",
];

function DashboardMockup() {
  return (
    <StageGrainCard gradient="spark" className="h-[840px] p-6">
      <div className="flex h-full flex-col gap-4 overflow-hidden rounded-[28px] bg-[#f6f5fb] p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl" style={{ background: SPARK_AMBER }}>
              <Zap className="size-5 text-[#1b1530]" strokeWidth={2.2} />
            </span>
            <p className="text-[20px] font-semibold text-text-primary">Lehrkräfte-Dashboard · Palstek</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-[14px] font-medium text-emerald-700">
            Live
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {KPIS.map((k) => (
            <div key={k.label} className="rounded-2xl bg-white px-4 py-3 shadow-sm">
              <p className="text-[34px] leading-none font-semibold text-text-primary tabular-nums">{k.value}</p>
              <p className="mt-2 text-[14px] text-text-tertiary">{k.label}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-[15px] font-semibold tracking-wider text-text-tertiary uppercase">
            Erkannte Fehlvorstellungen
          </p>
          <ul className="mt-3 space-y-3">
            {PRECONCEPTS.map((p) => (
              <li key={p.label}>
                <div className="flex justify-between text-[17px] text-text-primary">
                  <span>{p.label}</span>
                  <span className="tabular-nums text-text-secondary">{p.pct} %</span>
                </div>
                <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-black/5">
                  <div className="h-full rounded-full bg-rose-400" style={{ width: `${p.pct}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-[15px] font-semibold tracking-wider text-text-tertiary uppercase">
            Selbstregulation der Gruppe
          </p>
          <div className="mt-3 flex h-4 overflow-hidden rounded-full">
            {SRL.map((s) => (
              <div key={s.label} style={{ width: `${s.pct}%`, background: s.color }} />
            ))}
          </div>
          <div className="mt-2 flex gap-5 text-[15px] text-text-secondary">
            {SRL.map((s) => (
              <span key={s.label} className="flex items-center gap-2">
                <span className="size-3 rounded-sm" style={{ background: s.color }} />
                {s.label} {s.pct} %
              </span>
            ))}
          </div>
        </div>
        <div className="mt-auto rounded-2xl border px-4 py-3" style={{ borderColor: SPARK_AMBER, background: "#fff6e0" }}>
          <p className="text-[14px] font-semibold tracking-wider uppercase" style={{ color: "#8a5a00" }}>
            Empfehlung
          </p>
          <p className="mt-1 text-[17px] leading-snug text-text-primary">
            12 Lernende hängen beim Auge. Kurze Demo am Seil nur für diese Gruppe, der Rest macht weiter.
          </p>
        </div>
        <p className="text-right text-[13px] text-text-tertiary">Beispielwerte zur Veranschaulichung</p>
      </div>
    </StageGrainCard>
  );
}

function DashboardSlide({ active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="grid h-full grid-cols-[760px_1fr] items-center gap-24 px-20 pt-28 pb-20">
        <Stagger index={0} active={active}>
          <DashboardMockup />
        </Stagger>
        <div>
          <SlideHead eyebrow="Die andere Seite des Dialogs" title="Was die Lehrkraft sieht." active={active} />
          <ul className="mt-14 space-y-7">
            {DASHBOARD_POINTS.map((point, i) => (
              <Stagger key={point} index={1 + i} active={active}>
                <li className="flex items-start gap-5 text-[28px] leading-snug text-text-secondary">
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

/* ─── 18 · Was KI kann, was bei der Lehrkraft bleibt ─── */

const AI_CAN = [
  "Tempo und Schrittgröße für jede Person einzeln anpassen",
  "Fehlvorstellungen im Satz erkennen und den nächsten Schritt ändern",
  "Nachfragen statt vorsagen, auch beim dreißigsten Mal geduldig",
  "Die Daten der ganzen Gruppe für die Lehrkraft bündeln",
];

const TEACHER_KEEPS = [
  "Ziel und Inhalt festlegen: Was soll gelernt werden, und warum?",
  "Entscheiden, wie direktiv die KI sein darf",
  "Das Seil in die Hand drücken, hinschauen, ermutigen",
  "Verantwortung für Bewertung und Beziehung",
];

function SplitSlide({ active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col px-20 pt-36 pb-20">
        <SlideHead eyebrow="Arbeitsteilung" title="Was KI kann. Was bei Ihnen bleibt." active={active} />
        <div className="mt-12 grid flex-1 grid-cols-2 gap-10">
          <Stagger index={1} active={active} className="h-full">
            <StageGrainCard gradient="spark" className="h-full">
              <div className="flex items-center gap-4">
                <div className="flex size-16 items-center justify-center rounded-2xl border border-white/30 bg-white/15 backdrop-blur-md">
                  <Sparkles className="size-8 text-white" />
                </div>
                <h3 className="text-[40px] font-semibold text-white">KI kann</h3>
              </div>
              <ul className="mt-10 space-y-7">
                {AI_CAN.map((t) => (
                  <li key={t} className="flex items-start gap-4 text-[30px] leading-snug text-white/95">
                    <GreenDot className="mt-2" />
                    {t}
                  </li>
                ))}
              </ul>
              <StageGlassPanel className="mt-auto">
                <p className="text-[26px] leading-snug text-white">
                  Skaliert auf dreißig Lernende gleichzeitig. Das ist der Punkt.
                </p>
              </StageGlassPanel>
            </StageGrainCard>
          </Stagger>
          <Stagger index={2} active={active} className="h-full">
            <div className="flex h-full flex-col rounded-[40px] border border-border-tertiary bg-white p-10 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-primary-light">
                  <Users className="size-8 text-primary-dark" />
                </div>
                <h3 className="text-[40px] font-semibold text-text-primary">Bleibt bei der Lehrkraft</h3>
              </div>
              <ul className="mt-10 space-y-7">
                {TEACHER_KEEPS.map((t) => (
                  <li key={t} className="flex items-start gap-4 text-[30px] leading-snug text-text-secondary">
                    <GreenDot className="mt-2 border-primary-dark/80 [&>span]:bg-primary-dark" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-auto rounded-3xl bg-primary-light px-8 py-6">
                <p className="text-[26px] leading-snug text-primary-darker">
                  Skaliert nicht. Soll es auch nicht. Dafür ist es jetzt wieder möglich.
                </p>
              </div>
            </div>
          </Stagger>
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── 23 · Danke ─── */

function ThanksSlide({ active }: SlideProps) {
  return (
    <SlideFrame theme="dark">
      <div className="absolute inset-0 [background:linear-gradient(155deg,#3fc9bd_0%,#7b98f3_48%,#c2b2fb_100%)]" />
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
            Das Seil bitte wieder zurückgeben. Das Wissen dürfen Sie behalten :-)
          </p>
        </Stagger>
        <Stagger index={2} active={active}>
          <div className="mt-20 flex items-center gap-10 rounded-full border border-white/30 bg-white/15 px-14 py-6 text-[30px] text-white backdrop-blur-md">
            <span>deepdive-ki.de</span>
            <span className="h-8 w-px bg-white/40" />
            <span>info@deepdive-ki.de</span>
            <span className="h-8 w-px bg-white/40" />
            <span>{shortHost}</span>
          </div>
        </Stagger>
      </div>
    </SlideFrame>
  );
}

/* ─── Deck ─── */

const meta = getDeckMeta("spark")!;

export const sparkDeck: Deck = {
  ...meta,
  slides: [
    {
      id: "titel",
      title: "Titel",
      theme: "dark",
      Component: TitleSlide,
      notes:
        "Seile liegen schon auf den Plätzen (oder werden jetzt verteilt). Kurz stehen lassen.\n\nEinstieg: „Sie haben ein Seil in der Hand. Keine Sorge, Sie brauchen es erst in zwanzig Minuten. Aber behalten Sie es im Blick, es ist heute der wichtigste Gegenstand im Raum.“",
    },
    {
      id: "wer",
      title: "Wer spricht",
      theme: "light",
      Component: SpeakerSlide,
      notes:
        "45 Sekunden. Rolle als Lehrkraft betonen, dann die Forschungsrolle: SPARK ist ein Verbundprojekt, ich baue den Prototyp, den Sie gleich selbst benutzen.",
    },
    {
      id: "ankommen",
      title: "Live: Zuletzt gelernt",
      theme: "light",
      Component: (p) => (
        <LivePollSlide {...p} deck={DECK} activity={L.learned} eyebrow="Ankommen · Handy raus" />
      ),
      notes:
        "Erste Handy-Phase, dient auch als Test, ob WLAN und QR funktionieren.\n\nPointe nach der Auswertung: Vier Antworten, vier Lernwege. Und das bei einer Gruppe von Erwachsenen. In einer 7. Klasse sind es dreißig.",
    },
    {
      id: "ausgangslage",
      title: "Ausgangslage",
      theme: "light",
      steps: 3,
      Component: (p) => (
        <StatementSlide
          {...p}
          eyebrow="Die Ausgangslage"
          title="Ein Tempo für alle."
          lines={[
            "Dreißig Lernende, ein Erklärweg, ein Tempo.",
            "Die einen sind längst fertig, die anderen noch beim ersten Schritt.",
            "Und die Lehrkraft kann nicht dreißigmal gleichzeitig erklären.",
          ]}
        />
      ),
      notes:
        "3× Weiter. Das ist das Grundproblem, für das „individuelle Lernwege“ seit Jahrzehnten die Antwort sein sollen. Bisher scheiterte es an einer Zahl: eine Lehrkraft.",
    },
    {
      id: "fragen",
      title: "Drei Fragen",
      theme: "light",
      Component: (p) => (
        <CardsSlide
          {...p}
          eyebrow="Drei Fragen für heute"
          title="Worüber wir sprechen."
          cards={[
            {
              icon: Route,
              title: "Was ist ein individueller Lernweg?",
              text: "Nicht ein anderes Arbeitsblatt, sondern ein anderer nächster Schritt für jede Person.",
            },
            {
              icon: Sparkles,
              title: "Was kann KI dabei wirklich?",
              text: "Wir probieren es aus, mit Seil in der Hand. Keine Folie, ein Experiment.",
            },
            {
              icon: Users,
              title: "Was bleibt Aufgabe der Lehrkraft?",
              text: "Mehr, als man denkt. Nur anders verteilt.",
            },
          ]}
        />
      ),
      notes: "Agenda in drei Fragen. Frage 2 bekommt die meiste Zeit, das ist das Experiment.",
    },
    {
      id: "spark",
      title: "SPARK",
      theme: "dark",
      Component: SparkIntroSlide,
      notes:
        "SPARK: Sensemaking, Personalized Learning, Agency, Regulation and Teacher Orchestration in AI-supported Knowledge Building.\n\nVerbund: Uni Ulm (Koordination, Tina Seufert, Lernpsychologie), PH Schwäbisch Gmünd (Physikdidaktik Elektrizitätslehre, Climate Literacy), Leuphana (Marc Kleinknecht, didaktisch-technische Entwicklung, mein Teilprojekt).\n\nZiel laut Antrag: eine datenschutzkonforme KI-Forschungsplattform auf Basis eines Open-Source-LLM, Lernmodule, Lehrkräftedashboard, Fortbildungen.",
    },
    {
      id: "module",
      title: "Drei Module",
      theme: "light",
      Component: (p) => (
        <CardsSlide
          {...p}
          eyebrow="Das Rahmenmodell"
          title="Drei Module, ein Dialog."
          cards={[
            {
              icon: BookOpen,
              title: "Inhaltsmodul",
              text: "Fachlich kuratierte Inhalte, typische Fehlvorstellungen, Aufgaben. Beim Palstek: Merkspruch, fünf klassische Fehler.",
            },
            {
              icon: UserRound,
              title: "Lernermodul",
              text: "Vorwissen, kognitive Last, Motivation, erkannte Fehlvorstellungen. Wächst mit jedem Satz.",
            },
            {
              icon: SlidersHorizontal,
              title: "Pädagogisches Modul",
              text: "Die Entscheidungen der Lehrkraft: Wie direktiv? Welches Feedback? Eigener Prompt.",
            },
          ]}
        />
      ),
      notes:
        "Das didaktische Dreieck: Lernende, Lehrkraft, Lerngegenstand. Das LLM sitzt in der Mitte und greift auf alle drei zu. Es antwortet nie „nur“ auf die Frage, sondern auf Frage + Kurs + Lernhistorie + Vorgaben der Lehrkraft.",
    },
    {
      id: "anders",
      title: "Keine Antwortmaschine",
      theme: "light",
      steps: 3,
      Component: (p) => (
        <StatementSlide
          {...p}
          eyebrow="Was SPARK anders macht"
          title="Keine Antwortmaschine."
          lines={[
            "Gibt keine Lösung, sondern stellt die nächste Frage.",
            "Erkennt Fehlvorstellungen nach jedem Satz und passt sich an.",
            "Die Lehrkraft entscheidet, wie direktiv die KI sein darf.",
          ]}
        />
      ),
      notes:
        "3× Weiter. Abgrenzung zu ChatGPT: Dort bekommt man die fertige Antwort. Hier ist die Antwort absichtlich zurückgehalten, außer die Lehrkraft stellt es anders ein. Beim Knoten gleich: Anleiten ist erlaubt, denn Ziel ist das Können.",
    },
    {
      id: "dialog",
      title: "So klingt SPARK",
      theme: "light",
      steps: 2,
      Component: SparkChatSlide,
      notes:
        "Schritt 0: erste SPARK-Nachricht, ein Handgriff, eine Rückfrage.\nSchritt 1 (Weiter): Lernende beschreibt ihr Auge falsch herum, SPARK erkennt die Fehlvorstellung „Auge verkehrt herum“ und ändert den nächsten Schritt.\nSchritt 2 (Weiter): Merkspruch beginnt, Folgefragen-Chips.\n\nDer Dialog ist nachgestellt, aber genau so arbeitet der Kurs: ein Schritt pro Nachricht, Beschreibung einfordern, Diagnostik nach jedem Turn.",
    },
    {
      id: "experiment",
      title: "Das Experiment",
      theme: "dark",
      steps: 4,
      Component: (p) => (
        <StatementSlide
          {...p}
          theme="dark"
          eyebrow="Jetzt wird es praktisch"
          title="Das Experiment."
          lines={[
            "Jede Person hat ein Seil. Ziel: ein Palstek, der hält.",
            "Linke Raumhälfte, Gruppe A: lernt den Knoten mit SPARK.",
            "Rechte Raumhälfte, Gruppe B: bekommt nur einen fertigen Palstek.",
            `${WORK_MINUTES} Minuten. Danach: Zug drauf.`,
          ]}
        />
      ),
      notes:
        "4× Weiter. Raumhälften ggf. an den Saal anpassen (Text in GroupsSlide und hier).\n\nWichtig sagen: Gruppe B ist nicht die „dumme“ Gruppe. Vorlage nachbauen ist, wie die meisten von uns Knoten gelernt haben. Es geht um den Unterschied zwischen Ergebnis und Weg.\n\nHelfer:innen verteilen jetzt die fertigen Palsteks an Gruppe B.",
    },
    {
      id: "gruppen",
      title: "Zwei Gruppen",
      theme: "light",
      Component: GroupsSlide,
      notes:
        "QR-Code steht, bis alle in Gruppe A drin sind. Code vorlesen, laut und zweimal.\n\nVor dem Vortrag: In SPARK den Kurs „Palstek“ öffnen, Lobby starten, Code in die URL der Bühne hängen (?join=CODE) oder in spark.tsx eintragen. Lehrkräfte-Dashboard auf dem Laptop im zweiten Tab offen lassen.",
    },
    {
      id: "arbeit",
      title: "Arbeitsphase",
      theme: "dark",
      Component: WorkSlide,
      notes:
        "Countdown startet beim Betreten der Folie, Klick auf die Zahl startet neu.\n\nWährenddessen: durch den Raum gehen, NICHT helfen, nur beobachten. Zwei, drei Sätze aus Gruppe A merken, die man nachher zitieren kann. Auf dem Laptop das Dashboard beobachten: welche Fehlvorstellung kommt am häufigsten?",
    },
    {
      id: "zugprobe",
      title: "Live: Zugprobe",
      theme: "light",
      Component: (p) => (
        <LivePollSlide {...p} deck={DECK} activity={L.holds} eyebrow="Zugprobe · alle gleichzeitig" />
      ),
      notes:
        "Alle gleichzeitig: Schlaufe über die Hand, am langen Ende ziehen. Hält er? Dann abstimmen, mit Gruppenkennung.\n\nGruppe B hat kein Handy benutzt, hat aber eins: kurz den QR-Code der Mitmach-Seite zeigen (steht links auf der Folie).\n\nErgebnis offen lassen, egal wie es ausgeht. Beide Ergebnisse sind lehrreich.",
    },
    {
      id: "erklaeren",
      title: "Live: Erklären",
      theme: "light",
      Component: (p) => (
        <LivePollSlide {...p} deck={DECK} activity={L.explain} eyebrow="Verstehen statt kopieren" />
      ),
      notes:
        "Das ist die eigentliche Messung. Ein Knoten, der hält, kann kopiert sein. Erklären zu können, warum die Schlaufe sich nicht zuzieht, kann man nicht kopieren.\n\nZwei Personen aufrufen, je eine aus A und B: „Warum zieht sich die Schlaufe nicht zu?“",
    },
    {
      id: "passiert",
      title: "Was passiert ist",
      theme: "light",
      steps: 3,
      Component: (p) => (
        <StatementSlide
          {...p}
          eyebrow="Was gerade passiert ist"
          title="Zwei Wege, ein Knoten."
          lines={[
            "Gruppe B hatte ein Ergebnis zum Kopieren. Gruppe A hatte einen Weg.",
            "Der Weg war für jede Person ein anderer: eigenes Tempo, eigene Rückfragen, eigene Fehler.",
            "Ich stand daneben und habe niemandem den Knoten erklärt.",
          ]}
        />
      ),
      notes:
        "3× Weiter. Hier die beobachteten Sätze aus der Arbeitsphase einbauen.\n\nFalls Gruppe B besser abgeschnitten hat: ehrlich sagen. Die Vorlage ist ein starker Lernweg für Menschen mit viel Vorwissen. SPARK ist nicht für die Schnellen gebaut, sondern für die anderen 20.\n\nSatz 3 ist die Pointe: Die Lehrkraft war frei. Für Beobachtung, für die, die wirklich hängen.",
    },
    {
      id: "dashboard",
      title: "Was die Lehrkraft sieht",
      theme: "light",
      Component: DashboardSlide,
      notes:
        "Hier ggf. auf den echten Dashboard-Tab wechseln und die Live-Werte der letzten acht Minuten zeigen. Die Folie ist der Fallback mit Beispielwerten.\n\nPointe: Die Lehrkraft sieht nicht „Note 3“, sondern „12 Personen hängen beim Auge“. Das ist eine Handlungsinformation.",
    },
    {
      id: "lernweg",
      title: "Was sich anpasst",
      theme: "light",
      Component: (p) => (
        <CardsSlide
          {...p}
          eyebrow="Individueller Lernweg, konkret"
          title="Drei Dinge, die sich anpassen."
          cards={[
            {
              icon: Gauge,
              title: "Das Tempo",
              text: "Ein Schritt pro Nachricht. Wer schnell ist, bekommt den nächsten. Wer hängt, bekommt eine andere Erklärung desselben Schritts.",
            },
            {
              icon: Bug,
              title: "Die Fehler",
              text: "Jede erkannte Fehlvorstellung verändert den Weg. Auge verkehrt herum? Dann kommt jetzt nicht Schritt 3, sondern die Korrektur.",
            },
            {
              icon: MessagesSquare,
              title: "Die Sprache",
              text: "Einfache Sprache, Fachsprache, mehr oder weniger Lob: je nach Vorwissen und Motivation im Lernermodul.",
            },
          ]}
        />
      ),
      notes:
        "Das ist die Antwort auf Frage 1: Ein individueller Lernweg ist kein anderes Arbeitsblatt, sondern ein anderer nächster Schritt. Tempo, Fehler, Sprache.",
    },
    {
      id: "arbeitsteilung",
      title: "Arbeitsteilung",
      theme: "light",
      Component: SplitSlide,
      notes:
        "Antwort auf Frage 2 und 3 zugleich. Links, was die KI übernimmt. Rechts, was bei der Lehrkraft bleibt. Punkt 2 rechts ist der wichtigste: Die Direktivität ist eine pädagogische Entscheidung, keine technische.",
    },
    {
      id: "transfer",
      title: "Vom Seil ins Fach",
      theme: "light",
      Component: (p) => (
        <GridSlide
          {...p}
          eyebrow="Transfer"
          title="Vom Seil ins Fach."
          items={[
            {
              name: "Physik",
              meta: "Der einfache Stromkreis · Sek I",
              text: "Fehlvorstellung „Strom wird verbraucht“: SPARK erkennt sie im Satz und lässt die Lernenden selbst messen.",
              accent: true,
            },
            {
              name: "Klima",
              meta: "Treibhauseffekt · Climate Literacy",
              text: "Sensemaking statt Faktenliste: Phänomen erklären, Modell bauen, Evidenz bewerten.",
            },
            {
              name: "Biologie",
              meta: "Fotosynthese · „Woher kommt das Holz?“",
              text: "Die klassische Frage, an der fast alle scheitern. SPARK hält die Lösung zurück und fragt nach.",
            },
            {
              name: "Geschichte",
              meta: "BRD 1949 bis 1990 · Studienstufe",
              text: "Theorie-Brillen als Widget: Modernisierung, Westernisierung, Liberalisierung. Deutung statt Nacherzählung.",
            },
          ]}
        />
      ),
      notes:
        "Alle vier Kurse existieren im Prototyp. Der Palstek war der Testfall für praktische Fertigkeiten, die Fächer sind das eigentliche Forschungsfeld (Elektrizitätslehre und Climate Literacy laut Antrag).",
    },
    {
      id: "regeln",
      title: "Fünf Regeln",
      theme: "light",
      steps: 5,
      Component: (p) => (
        <StatementSlide
          {...p}
          eyebrow="Gewinnbringend einsetzen"
          title="Fünf Regeln."
          lines={[
            "Ziel vor Tool: erst die Fertigkeit, dann die KI.",
            "Keine Lösung, sondern die nächste Frage.",
            "Fehler sind Daten, keine Defizite.",
            "Die Lehrkraft steuert die Direktivität.",
            "Die Daten bleiben in der Schule: Open-Source-Modell, eigener Server.",
          ]}
        />
      ),
      notes:
        "5× Weiter. Regel 5: SPARK läuft im Forschungsbetrieb auf der GUSE-Infrastruktur mit selbst gehostetem Open-Source-LLM, der Prototyp heute nutzt noch Claude. Das Modell ist per Umschalter austauschbar.",
    },
    {
      id: "forschung",
      title: "Das ist Forschung",
      theme: "light",
      Component: (p) => (
        <CardsSlide
          {...p}
          eyebrow="Ehrlich gesagt · Status Prototyp"
          title="Das ist Forschung, kein Produkt."
          cards={[
            {
              icon: FlaskConical,
              title: "A/B-Studie",
              text: "Anleiten oder zurückhalten? Zwei Direktivitäten, dieselbe Klasse. Wer lernt mehr, wer bleibt länger dran?",
            },
            {
              icon: CircleHelp,
              title: "Diagnostik prüfen",
              text: "Erkennt die KI Fehlvorstellungen so gut wie eine Lehrkraft? Jede Änderung läuft gegen Golden-Dialoge.",
            },
            {
              icon: Anchor,
              title: "In die Schule bringen",
              text: "Partnerschulen, Lehramtsausbildung, Landesinstitute. Fortbildungen wie diese gehören dazu.",
            },
          ]}
        />
      ),
      notes:
        "Erwartungen dämpfen: Das ist ein Prototyp in einem laufenden Forschungsprojekt. Was Sie heute gesehen haben, ist echt, aber noch nicht fertig. Genau deshalb ist Ihr Feedback wertvoll.",
    },
    {
      id: "fertigkeit",
      title: "Live: Ihre Fertigkeit",
      theme: "light",
      Component: (p) => (
        <LiveWordsSlide
          {...p}
          deck={DECK}
          activity={L.skill}
          eyebrow="Zum Schluss"
          title="Was würden Sie morgen unterrichten?"
        />
      ),
      notes:
        "Letzte Handy-Phase. Wortwolke wachsen lassen, zwei, drei Begriffe aufgreifen: „Bruchrechnen, Fahrradschlauch flicken, Präsens-Konjugation.“ Jede Fertigkeit mit typischen Fehlern ist ein SPARK-Kurs.",
    },
    {
      id: "danke",
      title: "Danke",
      theme: "dark",
      Component: ThanksSlide,
      notes: "Seile wieder einsammeln (Helfer:innen mit Korb durch die Reihen). Kontakt steht auf der Folie. Fragen einsammeln.",
    },
  ],
};
