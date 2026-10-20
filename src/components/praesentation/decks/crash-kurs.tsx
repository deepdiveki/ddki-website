"use client";

import AnimationErrorBoundary from "@/components/shared/AnimationErrorBoundary";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Bus,
  Cat,
  ClipboardCheck,
  Coffee,
  Dog,
  FileText,
  Image as ImageIcon,
  Laptop,
  type LucideIcon,
  Mail,
  Monitor,
  Music,
  Smartphone,
  Trophy,
  Users,
  Video,
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
import { CRASH_KURS_LIVE } from "../live/activities";
import {
  LiveEstimateSlide,
  LiveJudgeSlide,
  LivePollSlide,
  LiveQuizSlide,
  LiveRankingSlide,
  LiveWordsSlide,
} from "../live/StageLive";
import type { Deck, SlideProps } from "../types";
import { getDeckMeta } from "./manifest";
import {
  AdoptionSlide,
  ChatGptSlide,
  FalschLiegenSlide,
  HiSlide,
  LlmSlide,
  PipelineSlide,
  QuickdrawSlide,
  SlideHead,
  StagesSlide,
  TEAM,
  TimelineSlide,
  WasIstKiSlide,
} from "./nerd-intro";

const DECK = "crash-kurs";

const HeadlineShaderBackground = dynamic(
  () => import("@/components/chooser/HeadlineShaderBackground"),
  { ssr: false },
);

export type Gradient = "purple" | "aurora" | "ocean";
export const G: Gradient[] = ["aurora", "purple", "ocean", "purple", "aurora", "ocean", "purple", "aurora"];

/* ─── Wiederverwendbare Folienmuster (Keynote-Formensprache) ─── */

/** Nummerierte Enthüllungszeilen unter einer großen Headline. */
export function StatementSlide({
  eyebrow,
  title,
  lines,
  step,
  active,
  theme = "light",
}: SlideProps & { eyebrow: string; title: string; lines: string[]; theme?: "light" | "dark" }) {
  return (
    <SlideFrame theme={theme}>
      <Brand theme={theme} />
      <div className="flex h-full flex-col justify-center px-20">
        <Stagger index={0} active={active}>
          <Eyebrow className={theme === "dark" ? "text-primary-base" : undefined}>{eyebrow}</Eyebrow>
        </Stagger>
        <Stagger index={1} active={active}>
          <Headline size="lg" className={cn("mt-8", theme === "dark" && "text-white")}>
            {title}
          </Headline>
        </Stagger>
        <div className="mt-16 space-y-6">
          {lines.map((line, i) => (
            <Reveal key={line} when={i + 1} step={step}>
              <p
                className={cn(
                  "text-[50px] leading-tight font-light tracking-[-0.02em]",
                  theme === "dark" ? "text-white/85" : "text-text-secondary",
                )}
              >
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

/** Raster aus 3 oder 4 Grain-Karten, optional schrittweise. */
export function CardsSlide({
  eyebrow,
  title,
  cards,
  step,
  active,
  stepwise = false,
}: SlideProps & {
  eyebrow: string;
  title: string;
  stepwise?: boolean;
  cards: { icon?: LucideIcon; label?: string; title: string; text: string }[];
}) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col px-20 pt-36 pb-20">
        <SlideHead eyebrow={eyebrow} title={title} active={active} />
        <div className={cn("mt-14 grid flex-1 gap-8", cards.length === 4 ? "grid-cols-4" : "grid-cols-3")}>
          {cards.map((c, i) => {
            const body = (
              <StageGrainCard gradient={G[i]} className="h-full">
                {c.icon && (
                  <div className="flex size-20 items-center justify-center rounded-2xl border border-white/30 bg-white/15 backdrop-blur-md">
                    <c.icon className="size-10 text-white" />
                  </div>
                )}
                <p className="mt-auto text-[24px] font-medium tracking-wider text-white/70 uppercase">
                  {c.label ?? `0${i + 1}`}
                </p>
                <h3 className="mt-2 text-[40px] leading-tight font-semibold text-white">{c.title}</h3>
                <StageGlassPanel className="mt-6">
                  <p className="text-[24px] leading-snug text-white/95">{c.text}</p>
                </StageGlassPanel>
              </StageGrainCard>
            );
            return stepwise ? (
              <Reveal key={c.title} when={i} step={step} className="h-full">
                {body}
              </Reveal>
            ) : (
              <Stagger key={c.title} index={1 + i} active={active} className="h-full">
                {body}
              </Stagger>
            );
          })}
        </div>
      </div>
    </SlideFrame>
  );
}

/** Weiße Lift-Karten im Raster (für Tool- und Modellübersichten). */
export function GridSlide({
  eyebrow,
  title,
  items,
  active,
  cols = 4,
}: SlideProps & {
  eyebrow: string;
  title: string;
  cols?: 3 | 4;
  items: { name: string; meta: string; text: string; accent?: boolean }[];
}) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col px-20 pt-36 pb-20">
        <SlideHead eyebrow={eyebrow} title={title} active={active} />
        <div className={cn("mt-12 grid flex-1 gap-6", cols === 4 ? "grid-cols-4" : "grid-cols-3")}>
          {items.map((item, i) => (
            <Stagger key={item.name} index={1 + i} active={active} className="h-full">
              <div
                className={cn(
                  "flex h-full flex-col rounded-[32px] border p-8 shadow-md",
                  item.accent
                    ? "border-primary-dark bg-primary-light"
                    : "border-border-tertiary bg-white",
                )}
              >
                <p className="text-[34px] leading-tight font-semibold text-text-primary">{item.name}</p>
                <p className="mt-1 text-[20px] font-medium text-primary-dark">{item.meta}</p>
                <p className="mt-auto pt-6 text-[22px] leading-snug text-text-secondary">{item.text}</p>
              </div>
            </Stagger>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

/** Zweispalter: links Grain-Karte mit Aufgabe/Prompt, rechts Headline und Schritte. */
export function TaskSlide({
  eyebrow,
  title,
  icon: Icon,
  gradient,
  minutes,
  prompt,
  steps,
  active,
  tool = "toolbox.deepdive-ki.de",
}: SlideProps & {
  eyebrow: string;
  title: string;
  icon: LucideIcon;
  gradient: Gradient;
  minutes: number;
  prompt: string;
  steps: string[];
  tool?: string;
}) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="grid h-full grid-cols-[760px_1fr] items-center gap-24 px-20 pt-28 pb-20">
        <Stagger index={0} active={active}>
          <StageGrainCard gradient={gradient} className="h-[780px]">
            <div className="flex items-center justify-between">
              <div className="flex size-20 items-center justify-center rounded-2xl border border-white/30 bg-white/15 backdrop-blur-md">
                <Icon className="size-10 text-white" />
              </div>
              <span className="rounded-full border border-white/30 bg-white/15 px-5 py-2 text-[22px] font-medium text-white backdrop-blur-md">
                {minutes} Minuten
              </span>
            </div>
            <p className="mt-8 text-[22px] font-medium tracking-wider text-white/70 uppercase">
              Prompt-Vorlage
            </p>
            <StageGlassPanel className="mt-3 flex-1">
              <p className="text-[24px] leading-relaxed text-white/95">„{prompt}“</p>
            </StageGlassPanel>
            <p className="mt-4 text-[20px] text-white/80">Ausprobieren in: {tool}</p>
          </StageGrainCard>
        </Stagger>
        <div>
          <SlideHead eyebrow={eyebrow} title={title} active={active} />
          <ul className="mt-12 space-y-6">
            {steps.map((s, i) => (
              <Stagger key={s} index={1 + i} active={active}>
                <li className="flex items-start gap-5 text-[28px] leading-snug text-text-secondary">
                  <GreenDot className="border-primary-dark/80 [&>span]:bg-primary-dark" />
                  {s}
                </li>
              </Stagger>
            ))}
          </ul>
        </div>
      </div>
    </SlideFrame>
  );
}

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
            <Eyebrow className="text-white/80">DeepDiveKI · Fortbildung</Eyebrow>
          </Stagger>
          <Stagger index={1} active={active}>
            <Headline size="xl" className="mt-6 text-white">
              Crash Kurs KI.
            </Headline>
          </Stagger>
          <Stagger index={2} active={active}>
            <p className="mt-10 max-w-[1000px] text-[40px] leading-[1.3] font-light text-white/85">
              Zwei Stunden für Lehrkräfte: verstehen, ausprobieren, im Unterricht einsetzen.
            </p>
          </Stagger>
        </div>
        <Stagger index={3} active={active} className="shrink-0">
          <div className="flex items-center gap-5 rounded-full border border-white/20 bg-white/10 py-3 pr-9 pl-4 backdrop-blur-md">
            <div className="flex -space-x-6">
              {TEAM.map((p) => (
                <div key={p.name} className="relative size-20 overflow-hidden rounded-full border-4 border-[#0b0820] bg-[#DDD7FE]">
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

/* ─── Fahrplan ─── */

function AgendaSlide(p: SlideProps) {
  return (
    <CardsSlide
      {...p}
      eyebrow="Fahrplan · 120 Minuten"
      title="Was heute passiert."
      cards={[
        { label: "25 Min", title: "Verstehen", text: "Was KI ist, wie ein Sprachmodell arbeitet, wo sie lügt." },
        { label: "25 Min", title: "KIs, Tools & Schüler", text: "Die großen Modelle, Schulplattformen, und was Ihre Klasse längst macht." },
        { label: "40 Min", title: "Prompten & Ausprobieren", text: "Nach der Pause: Klassenreise, Arbeitsblatt, Korrektur, Bundesjugendspiele." },
        { label: "30 Min", title: "Im Unterricht", text: "Prüfungen, Urteilsübung, Settings, Leitplanken und Ihre 30-Tage-Challenge." },
      ]}
    />
  );
}

/* ─── Maschinelles Lernen durch Feedback ─── */

function MachineLearningSlide({ active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="grid h-full grid-cols-[760px_1fr] items-center gap-24 px-20 pt-28 pb-20">
        <Stagger index={0} active={active}>
          <StageGrainCard gradient="ocean" className="h-[700px] justify-center">
            <div className="grid grid-cols-[1fr_auto_1.3fr_auto_1fr] items-center gap-4">
              <div className="flex flex-col gap-4">
                <StageGlassPanel className="flex flex-col items-center p-5">
                  <Cat className="size-16 text-white" strokeWidth={1.4} />
                  <span className="mt-2 text-[18px] text-white/80">Katze</span>
                </StageGlassPanel>
                <StageGlassPanel className="flex flex-col items-center p-5">
                  <Dog className="size-16 text-white" strokeWidth={1.4} />
                  <span className="mt-2 text-[18px] text-white/80">Hund</span>
                </StageGlassPanel>
              </div>
              <ArrowRight className="size-10 text-white/70" />
              <StageGlassPanel className="p-5">
                <p className="text-center text-[16px] font-semibold tracking-wider text-white/80 uppercase">
                  Neuronales Netz
                </p>
                <div className="mt-4 grid grid-cols-4 gap-x-6 gap-y-3">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <span
                      key={i}
                      className={cn("mx-auto size-4 rounded-full", i % 5 === 0 ? "bg-white" : "bg-white/40")}
                    />
                  ))}
                </div>
              </StageGlassPanel>
              <ArrowRight className="size-10 text-white/70" />
              <StageGlassPanel className="p-5 text-center">
                <p className="text-[16px] font-semibold tracking-wider text-white/80 uppercase">Output</p>
                <p className="mt-2 text-[34px] font-semibold text-white">Katze</p>
                <p className="mt-1 text-[18px] text-emerald-200">richtig ✓</p>
              </StageGlassPanel>
            </div>
            <StageGlassPanel className="mt-8 text-center">
              <p className="text-[22px] text-white/95">
                Falsch geraten? Dann werden die Verbindungen nachjustiert. Millionenfach.
              </p>
            </StageGlassPanel>
          </StageGrainCard>
        </Stagger>
        <div>
          <SlideHead eyebrow="Maschinelles Lernen" title="Lernen durch Feedback." active={active} />
          <ul className="mt-12 space-y-7">
            {[
              "Daten sind die Grundlage: Millionen Beispiele, nicht Regeln.",
              "Das Netz wird durch Rückmeldung weiterentwickelt, nicht programmiert.",
              "Kontinuierliches Lernen: Jede Korrektur verschiebt Gewichte ein kleines Stück.",
            ].map((t, i) => (
              <Stagger key={t} index={1 + i} active={active}>
                <li className="flex items-start gap-5 text-[30px] leading-snug text-text-secondary">
                  <GreenDot className="border-primary-dark/80 [&>span]:bg-primary-dark" />
                  {t}
                </li>
              </Stagger>
            ))}
          </ul>
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── Studie: Wie Menschen ChatGPT nutzen ─── */

function StudySlide({ active }: SlideProps) {
  const stats = [
    { big: "73 %", small: "privat", text: "Im Juni 2025 waren fast drei Viertel aller Nachrichten privat. Ein Jahr zuvor: 53 %." },
    { big: "49 / 40 / 11", small: "Fragen · Erledigen · Ausdrücken", text: "Die Hälfte will Rat und Information. 40 % lassen etwas erledigen. 11 % wollen sich ausdrücken." },
    { big: "52 %", small: "Nutzerinnen", text: "Anfang 2023 hatten 18 % der Nutzenden typisch weibliche Vornamen, Mitte 2025 waren es über die Hälfte." },
  ];
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col px-20 pt-36 pb-20">
        <SlideHead eyebrow="Wie Menschen KI nutzen" title="Drei Zahlen aus der Studie." active={active} />
        <div className="mt-14 grid flex-1 grid-cols-3 gap-10">
          {stats.map((s, i) => (
            <Stagger key={s.big} index={1 + i} active={active} className="h-full">
              <StageGrainCard gradient={G[i]} className="h-full">
                <p className="text-[72px] leading-none font-semibold tracking-tight text-white">{s.big}</p>
                <p className="mt-3 text-[24px] font-medium tracking-wider text-white/75 uppercase">{s.small}</p>
                <StageGlassPanel className="mt-auto">
                  <p className="text-[24px] leading-snug text-white/95">{s.text}</p>
                </StageGlassPanel>
              </StageGrainCard>
            </Stagger>
          ))}
        </div>
        <Stagger index={4} active={active}>
          <p className="mt-6 text-[18px] text-text-tertiary">
            Quelle: OpenAI / NBER, „How People Use ChatGPT“, September 2025. Rund 2,6 Milliarden Nachrichten täglich.
          </p>
        </Stagger>
      </div>
    </SlideFrame>
  );
}

/* ─── Prompting ─── */

const PROMPT_PARTS = [
  ["Aufgabenkontext", "Du bist ein Biologielehrer, der Material für die 8. Klasse erstellt."],
  ["Tonalität", "Sprich klar, didaktisch und freundlich."],
  ["Hintergrund", "Thema Photosynthese. Fachbegriffe: Chloroplasten, Glucose, Sauerstoff."],
  ["Aufgabe & Regeln", "Lückentext mit 8–10 Sätzen, genau 5 Lücken, Lösungen am Ende."],
  ["Beispiel", "„Die Photosynthese findet in den ___ statt.“ → Chloroplasten"],
  ["Gesprächsverlauf", "Passt der Entwurf nicht, biete zwei Alternativen an."],
  ["Konkrete Anweisung", "Formuliere jetzt den kompletten Lückentext."],
  ["Schritt für Schritt", "Überlege zuerst die Stationen der Photosynthese, dann der Text."],
  ["Ausgabeformat", "Teil 1: Lückentext nummeriert. Teil 2: Lösungen als Liste."],
  ["Notausgang", "Bist du unsicher, schreibe: „Dazu liegen mir keine sicheren Informationen vor.“"],
];

function PromptStructureSlide({ active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col px-20 pt-36 pb-20">
        <SlideHead eyebrow="Prompting 101" title="Zehn Bausteine für einen guten Prompt." active={active} />
        <div className="mt-12 grid flex-1 grid-cols-2 gap-x-16 gap-y-4">
          {PROMPT_PARTS.map(([name, example], i) => (
            <Stagger key={name} index={1 + i} active={active}>
              <div className="flex items-start gap-5 rounded-2xl border border-border-tertiary bg-white px-6 py-4">
                <span className="w-10 shrink-0 text-[28px] font-semibold text-primary-dark tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-[26px] leading-tight font-semibold text-text-primary">{name}</p>
                  <p className="mt-1 text-[20px] leading-snug text-text-secondary">{example}</p>
                </div>
              </div>
            </Stagger>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

function PromptExampleSlide({ active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="grid h-full grid-cols-[900px_1fr] items-center gap-20 px-20 pt-28 pb-20">
        <Stagger index={0} active={active}>
          <StageGrainCard gradient="purple" className="h-[800px] p-6">
            <StageGlassPanel className="flex-1 overflow-hidden p-7">
              <p className="text-[18px] font-semibold tracking-wider text-white/70 uppercase">Der fertige Prompt</p>
              <div className="mt-4 space-y-3">
                {PROMPT_PARTS.map(([name, example], i) => (
                  <p key={name} className="text-[19px] leading-snug text-white/95">
                    <span className="mr-2 rounded-md bg-white/20 px-2 py-0.5 text-[15px] font-semibold text-white">
                      {i + 1}
                    </span>
                    {example}
                  </p>
                ))}
              </div>
            </StageGlassPanel>
          </StageGrainCard>
        </Stagger>
        <div>
          <SlideHead eyebrow="Prompting 101" title="So liest sich das am Stück." active={active} />
          <ul className="mt-12 space-y-7">
            {[
              "Nicht alle zehn Bausteine sind immer nötig. Rolle, Aufgabe und Format reichen oft.",
              "Je konkreter die Regeln, desto weniger Nacharbeit.",
              "Der Notausgang verhindert erfundene Fakten.",
            ].map((t, i) => (
              <Stagger key={t} index={1 + i} active={active}>
                <li className="flex items-start gap-5 text-[28px] leading-snug text-text-secondary">
                  <GreenDot className="border-primary-dark/80 [&>span]:bg-primary-dark" />
                  {t}
                </li>
              </Stagger>
            ))}
          </ul>
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── Mitmach-Block Übersicht ─── */

function PracticeOverviewSlide({ active }: SlideProps) {
  const tasks = [
    { icon: Bus, title: "Klassenreise planen", text: "Programm, Tagesplan, Elternbrief." },
    { icon: FileText, title: "Arbeitsblatt in zwei Niveaus", text: "B1 und Muttersprache, als Word-Datei." },
    { icon: ClipboardCheck, title: "Schülertext korrigieren", text: "Feedback nach Kriterienraster, anonymisiert." },
    { icon: Trophy, title: "Bundesjugendspiele organisieren", text: "Zeitplan, Riegen, Helfer, Excel." },
  ];
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="grid h-full grid-cols-[640px_1fr] items-center gap-20 px-20 pt-28 pb-20">
        <Stagger index={0} active={active}>
          <StageGrainCard gradient="aurora" className="h-[780px]">
            <StageGlassPanel>
              <div className="flex items-start gap-3">
                <GreenDot />
                <p className="text-[24px] leading-snug font-medium text-white">
                  DeepChat öffnen und loslegen. Vier Aufgaben, je sieben Minuten.
                </p>
              </div>
            </StageGlassPanel>
            <div className="mt-6 flex flex-1 items-center justify-center">
              <QrCode value="https://toolbox.deepdive-ki.de/" size={400} />
            </div>
            <p className="mt-4 text-center text-[24px] text-white/90">toolbox.deepdive-ki.de</p>
          </StageGrainCard>
        </Stagger>
        <div>
          <SlideHead eyebrow="Ausprobieren · 30 Minuten" title="Jetzt sind Sie dran." active={active} />
          <div className="mt-10 space-y-4">
            {tasks.map((t, i) => (
              <Stagger key={t.title} index={1 + i} active={active}>
                <div className="flex items-center gap-6 rounded-[28px] border border-border-tertiary bg-white px-7 py-4">
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary-light">
                    <t.icon className="size-8 text-primary-darker" />
                  </div>
                  <div>
                    <p className="text-[30px] leading-tight font-semibold text-text-primary">{t.title}</p>
                    <p className="mt-1 text-[22px] text-text-secondary">{t.text}</p>
                  </div>
                </div>
              </Stagger>
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── Unterrichtssettings ─── */

function SettingsSlide({ active }: SlideProps) {
  const settings = [
    { icon: Laptop, title: "Single Terminal", meta: "Jede:r braucht ein Gerät", text: "Einzelarbeit: Ein „Gespräch“ mit Robespierre über die Terrorherrschaft der Jakobiner." },
    { icon: Users, title: "Group Terminal", meta: "Ein Gerät pro Gruppe", text: "Gruppenarbeit: Eine Person bedient die KI und holt Antworten für die Gruppe, z. B. Java vs. Python." },
    { icon: Monitor, title: "Teacher Terminal", meta: "Nur die Lehrkraft", text: "Plenum: Ein typischer Syntaxfehler wird live reproduziert und von der KI erklärt." },
    { icon: Smartphone, title: "Mobile Terminal", meta: "Ein Handy pro Paar", text: "Partnerarbeit: 15 Pflanzen in der Umgebung scannen und bestimmen." },
  ];
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col px-20 pt-36 pb-20">
        <SlideHead eyebrow="Integration von KI" title="Vier Settings für den Unterricht." active={active} />
        <div className="mt-12 grid flex-1 grid-cols-4 gap-6">
          {settings.map((s, i) => (
            <Stagger key={s.title} index={1 + i} active={active} className="h-full">
              <StageGrainCard gradient={G[i]} className="h-full p-8">
                <div className="flex size-20 items-center justify-center rounded-2xl border border-white/30 bg-white/15 backdrop-blur-md">
                  <s.icon className="size-10 text-white" />
                </div>
                <p className="mt-auto text-[20px] font-medium tracking-wider text-white/70 uppercase">{s.meta}</p>
                <h3 className="mt-2 text-[36px] leading-tight font-semibold text-white">{s.title}</h3>
                <StageGlassPanel className="mt-5 p-6">
                  <p className="text-[21px] leading-snug text-white/95">{s.text}</p>
                </StageGlassPanel>
              </StageGrainCard>
            </Stagger>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── Differenzierung ─── */

function DifferenzierungSlide({ active }: SlideProps) {
  const knobs = ["Schwierigkeit", "Lerntempo", "Hilfestellung", "Übungspensum", "Lernweg", "Bezugsnorm", "Rückmeldung"];
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col px-20 pt-36 pb-20">
        <SlideHead eyebrow="Differenzierung + KI" title="Sieben Stellschrauben. KI dreht an allen." active={active} />
        <div className="mt-14 grid flex-1 grid-cols-4 gap-6">
          {knobs.map((k, i) => (
            <Stagger key={k} index={1 + i} active={active} className="h-full">
              <div className="flex h-full items-center justify-center rounded-[32px] border border-border-tertiary bg-white p-8 text-center shadow-md">
                <p className="text-[38px] leading-tight font-semibold text-text-primary">{k}</p>
              </div>
            </Stagger>
          ))}
          <Stagger index={8} active={active} className="h-full">
            <StageGrainCard gradient="purple" className="h-full justify-center p-8 text-center">
              <p className="text-[24px] leading-snug text-white/95">
                Was vorher für 28 Kinder gleichzeitig unmöglich war, ist jetzt ein Prompt.
              </p>
            </StageGrainCard>
          </Stagger>
        </div>
      </div>
    </SlideFrame>
  );
}


/* ─── Halluzination live (Chat-Mockup mit Enthüllung) ─── */

function HallucinationSlide({ step, active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="grid h-full grid-cols-[900px_1fr] items-center gap-20 px-20 pt-28 pb-20">
        <Stagger index={0} active={active}>
          <StageGrainCard gradient="purple" className="h-[800px] p-6">
            <div className="ml-auto max-w-[620px] rounded-2xl rounded-tr-md border border-white/25 bg-white/15 px-5 py-3 text-[20px] leading-snug text-white backdrop-blur-md">
              Nenne mir drei Studien, die belegen, dass Hausaufgaben in der Grundschule die Leistung verbessern. Mit Autor, Jahr und Zeitschrift.
            </div>
            <StageGlassPanel className="mt-4 p-6">
              <div className="flex items-start gap-4">
                <GreenDot />
                <div className="space-y-3 text-[19px] leading-snug text-white/95">
                  <p>Gerne. Drei zentrale Studien:</p>
                  <p>1. <strong>Müller &amp; Hartmann (2017)</strong>, „Hausaufgaben und Lernerfolg in der Primarstufe“, <em>Zeitschrift für Pädagogik</em>, 63(4), 512–531.</p>
                  <p>2. <strong>Cooper, Robinson &amp; Patall (2006)</strong>, „Does Homework Improve Academic Achievement?“, <em>Review of Educational Research</em>, 76(1), 1–62.</p>
                  <p>3. <strong>Schneider (2020)</strong>, „Effekte täglicher Übungsaufgaben in Klasse 3“, <em>Unterrichtswissenschaft</em>, 48(2), 201–219.</p>
                </div>
              </div>
            </StageGlassPanel>
            <Reveal when={1} step={step}>
              <div className="mt-4 ml-auto max-w-[520px] rounded-2xl rounded-tr-md border border-white/25 bg-white/15 px-5 py-3 text-[20px] leading-snug text-white backdrop-blur-md">
                Woher weißt du das? Existieren Studie 1 und 3 wirklich?
              </div>
            </Reveal>
            <Reveal when={2} step={step}>
              <StageGlassPanel className="mt-4 border-rose-200/60 p-6">
                <div className="flex items-start gap-4">
                  <GreenDot className="border-rose-200 [&>span]:bg-rose-200" />
                  <p className="text-[19px] leading-snug text-white/95">
                    Sie haben recht, ich kann die Studien 1 und 3 nicht belegen. Ich habe plausible Titel und Autoren erzeugt. Nur Cooper et al. (2006) ist eine reale Metaanalyse. Ich bitte um Entschuldigung.
                  </p>
                </div>
              </StageGlassPanel>
            </Reveal>
          </StageGrainCard>
        </Stagger>
        <div>
          <SlideHead eyebrow="Limitationen live" title="Wenn die KI lügt, klingt es gut." active={active} />
          <ul className="mt-12 space-y-7">
            {[
              "Zwei von drei Quellen sind erfunden. Titel, Zeitschrift, Seitenzahlen: alles plausibel, alles falsch.",
              "Die Kontrollfrage „Woher weißt du das?“ gehört in jeden Prompt mit Fakten.",
              "Regel für die Schule: Quellen immer selbst nachschlagen. Niemals ungeprüft ins Gutachten.",
            ].map((t, i) => (
              <Stagger key={t} index={1 + i} active={active}>
                <li className="flex items-start gap-5 text-[28px] leading-snug text-text-secondary">
                  <GreenDot className="border-primary-dark/80 [&>span]:bg-primary-dark" />
                  {t}
                </li>
              </Stagger>
            ))}
          </ul>
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── Schüler:innen und KI ─── */

function StudentsSlide({ active }: SlideProps) {
  const stats = [
    { big: "57 %", small: "der 12- bis 19-Jährigen", text: "nutzen ChatGPT zumindest selten. Bei den 16- bis 19-Jährigen deutlich mehr.", source: "JIM-Studie 2024" },
    { big: "74 %", small: "der Schüler:innen", text: "setzen KI für die Schule ein: Hausaufgaben, Referate, Lernen für Tests.", source: "Vodafone Stiftung 2024" },
    { big: "Snapchat", small: "My AI · Character.ai", text: "Viele Jugendliche chatten täglich mit KI-Freunden. Die Lehrkraft erfährt es zuletzt.", source: "Beobachtung aus Fortbildungen" },
  ];
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col px-20 pt-36 pb-20">
        <SlideHead eyebrow="Der Blick der Schüler:innen" title="Ihre Klasse ist längst weiter." active={active} />
        <div className="mt-14 grid flex-1 grid-cols-3 gap-10">
          {stats.map((s, i) => (
            <Stagger key={s.big} index={1 + i} active={active} className="h-full">
              <StageGrainCard gradient={G[i]} className="h-full">
                <p className="text-[64px] leading-none font-semibold tracking-tight text-white">{s.big}</p>
                <p className="mt-3 text-[22px] font-medium tracking-wider text-white/75 uppercase">{s.small}</p>
                <StageGlassPanel className="mt-auto">
                  <p className="text-[24px] leading-snug text-white/95">{s.text}</p>
                  <p className="mt-3 text-[17px] text-white/60">{s.source}</p>
                </StageGlassPanel>
              </StageGrainCard>
            </Stagger>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── Pause mit Countdown ─── */

export function PauseSlide({ active }: SlideProps) {
  const TOTAL = 10 * 60;
  const [left, setLeft] = useState(TOTAL);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  useEffect(() => {
    if (!active) {
      setStartedAt(null);
      setLeft(TOTAL);
      return;
    }
    const start = Date.now();
    setStartedAt(start);
    const id = window.setInterval(() => setLeft(Math.max(0, TOTAL - Math.floor((Date.now() - start) / 1000))), 500);
    return () => window.clearInterval(id);
  }, [active, TOTAL]);
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  return (
    <SlideFrame theme="dark">
      <div className="absolute inset-0 [background:linear-gradient(155deg,#5ee0d0_0%,#6f8dff_42%,#a78bfa_74%,#c6bdfa_100%)]" />
      <Brand theme="dark" />
      <div className="relative grid h-full grid-cols-[1fr_640px] items-center gap-20 px-20 pt-28 pb-20">
        <div>
          <Stagger index={0} active={active}>
            <Eyebrow className="text-white/80">Pause</Eyebrow>
          </Stagger>
          <Stagger index={1} active={active}>
            <Headline size="lg" className="mt-6 text-white">
              Zehn Minuten.
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
              {startedAt && left === 0 ? "Weiter geht es." : "Kaffee holen, Handy laden, DeepChat anmelden."}
            </p>
          </Stagger>
        </div>
        <Stagger index={3} active={active}>
          <StageGlassPanel className="flex flex-col items-center p-10">
            <Coffee className="size-14 text-white" strokeWidth={1.4} />
            <p className="mt-4 text-center text-[26px] font-medium text-white">
              Jetzt schon anmelden, dann geht es nach der Pause sofort los.
            </p>
            <div className="mt-8">
              <QrCode value="https://toolbox.deepdive-ki.de/" size={360} />
            </div>
            <p className="mt-5 text-[24px] text-white/90">toolbox.deepdive-ki.de</p>
          </StageGlassPanel>
        </Stagger>
      </div>
    </SlideFrame>
  );
}

/* ─── Fünf-Minuten-Gewinne ─── */

const QuickWinsSlide = (p: SlideProps) => (
  <CardsSlide
    {...p}
    eyebrow="Fünf-Minuten-Gewinne"
    title="Vier Dinge, die Sie morgen schon abgeben können."
    cards={[
      { icon: Mail, label: "Elternbrief", title: "Wandertag", text: "„Schreibe einen freundlichen Elternbrief: Wandertag am 14.5., Treffpunkt 8 Uhr, Rückkehr 14 Uhr, 5 Euro Fahrtkosten, Rückmeldung bis 7.5.“" },
      { icon: FileText, label: "Zeugnis", title: "Kommentare", text: "„Formuliere drei wertschätzende Zeugnisformulierungen für: arbeitet sorgfältig, aber langsam; stört häufig; hilft Mitschülern.“ Keine Namen!" },
      { icon: BookOpen, label: "Vertretung", title: "Stunde in 5 Minuten", text: "„Ich habe in 10 Minuten eine Vertretungsstunde Deutsch, Klasse 7, ohne Material. Gib mir einen 45-Minuten-Plan mit einer Schreibaufgabe.“" },
      { icon: Users, label: "Elternabend", title: "Agenda & Folien", text: "„Erstelle eine Tagesordnung für den Elternabend Klasse 5 mit Zeitplan, fünf Punkten und einer Folie Stichworte zu KI in der Schule.“" },
    ]}
  />
);

/* ─── Bild, Audio, Video ─── */

const MediaSlide = (p: SlideProps) => (
  <CardsSlide
    {...p}
    eyebrow="Live-Demo · Nicht nur Text"
    title="Bild, Ton und Film in zwei Minuten."
    cards={[
      { icon: ImageIcon, label: "Bild", title: "Erklärbild", text: "„Ein freundliches Comic-Bild, das den Wasserkreislauf für Klasse 4 zeigt, mit Beschriftungen auf Deutsch.“ In DeepChat oder Canva." },
      { icon: Music, label: "Audio", title: "Lernlied", text: "„Ein Lied im Stil von Pop, Refrain nennt die vier Phasen der Mitose.“ Mit Suno. Die Klasse vergisst es nicht mehr." },
      { icon: Video, label: "Video", title: "Erklärclip", text: "„20 Sekunden: Ein Vulkan bricht aus, Sicht aus der Luft, ruhiger Erzähler.“ Mit Sora oder Veo. Heute Spielerei, bald Alltag." },
    ]}
  />
);

/* ─── Prüfungen und Hausaufgaben ─── */

const DetectorSlide = (p: SlideProps) => (
  <StatementSlide
    {...p}
    eyebrow="Die Frage, die immer kommt"
    title="„Wie merke ich, ob das KI war?“"
    lines={[
      "Gar nicht. Zuverlässig jedenfalls nicht.",
      "KI-Detektoren liegen oft falsch, besonders bei Nicht-Muttersprachlern.",
      "Also: nicht fahnden, sondern Aufgaben ändern.",
    ]}
  />
);

const PrinciplesSlide = (p: SlideProps) => (
  <StatementSlide
    {...p}
    eyebrow="Prüfungen & Hausaufgaben · Fünf Grundsätze"
    title="Was dann stattdessen gilt."
    lines={[
      "Prozess statt Produkt: Schreibplan, Skizzen, Notizen. Der Weg zählt.",
      "Persönlicher Bezug: „Was überzeugt dich persönlich, und warum?“",
      "Lokaler Kontext: eure Stunde, euer Tafelbild, eure Diskussion.",
      "Reflexion statt Reproduktion: bewerten, begründen, entscheiden.",
      "Methoden-Vielfalt: mündlich, visuell, performativ, handwerklich.",
    ]}
  />
);

/* ─── KI-Kompetenzrahmen ─── */

function CompetenceSlide({ active }: SlideProps) {
  const levels = [
    { level: "Verstehen", text: "Wissen, was ein Sprachmodell ist, was es kann und wo es scheitert." },
    { level: "Anwenden", text: "Prompten, Ergebnisse prüfen, Werkzeuge für den eigenen Unterricht wählen." },
    { level: "Reflektieren", text: "Datenschutz, Urheberrecht, Bias und Verantwortung einschätzen." },
    { level: "Gestalten", text: "Lernsettings mit KI entwerfen und Schüler:innen zum kritischen Umgang befähigen." },
  ];
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="grid h-full grid-cols-[640px_1fr] items-center gap-20 px-20 pt-28 pb-20">
        <Stagger index={0} active={active}>
          <StageGrainCard gradient="ocean" className="h-[780px]">
            <StageGlassPanel>
              <div className="flex items-start gap-3">
                <GreenDot />
                <p className="text-[24px] leading-snug font-medium text-white">
                  KI-Leitfaden und Kompetenzrahmen zum Nachlesen.
                </p>
              </div>
            </StageGlassPanel>
            <div className="mt-6 flex flex-1 items-center justify-center">
              <QrCode value={LEITFADEN_URL} size={380} />
            </div>
            <p className="mt-4 text-center text-[22px] text-white/85">{LEITFADEN_URL.replace(/^https?:\/\/(www\.)?/, "")}</p>
          </StageGrainCard>
        </Stagger>
        <div>
          <SlideHead eyebrow="KI-Kompetenzen für Lehrende" title="Vier Stufen, kein Sprint." active={active} />
          <ol className="mt-10 space-y-4">
            {levels.map((l, i) => (
              <Stagger key={l.level} index={1 + i} active={active}>
                <li className="flex items-start gap-5 rounded-2xl border border-border-tertiary bg-white px-6 py-4">
                  <span className="w-10 shrink-0 text-[28px] font-semibold text-primary-dark tabular-nums">{i + 1}</span>
                  <div>
                    <p className="text-[28px] leading-tight font-semibold text-text-primary">{l.level}</p>
                    <p className="mt-1 text-[21px] leading-snug text-text-secondary">{l.text}</p>
                  </div>
                </li>
              </Stagger>
            ))}
          </ol>
        </div>
      </div>
    </SlideFrame>
  );
}

/** Ziel des Leitfaden-QR-Codes. Bitte durch den echten Link ersetzen (siehe altes Deck, Folie 45). */
const LEITFADEN_URL = "https://www.deepdive-ki.de/fortbildung/fortbildungen";

/* ─── Korrektur-Use-Case ─── */

const FeedbackSlide = (p: SlideProps) => (
  <TaskSlide
    {...p}
    icon={ClipboardCheck}
    gradient="aurora"
    minutes={7}
    eyebrow="Use Case 3 · Korrektur"
    title="Feedback zu einem Schülertext."
    prompt="Du bist Deutschlehrerin in Klasse 8. Bewerte den folgenden Text nach diesen Kriterien: Aufbau (1–5), sprachliche Richtigkeit (1–5), Argumentation (1–5). Gib zu jedem Kriterium zwei konkrete Hinweise, was gut ist und was der Schüler als Nächstes üben sollte. Ton: ermutigend. Text: [anonymisierten Text einfügen]"
    steps={[
      "Nur anonymisierte Texte und nur in DSGVO-konformen Tools (DeepChat).",
      "Eigenes Kriterienraster einsetzen, die KI hält sich daran.",
      "Das Feedback bleibt Ihre Entscheidung: lesen, kürzen, unterschreiben.",
    ]}
  />
);

/* ─── Challenge-Folie (Live, mit Verbindlichkeit) ─── */

const LiveChallenge = (p: SlideProps) => (
  <LiveWordsSlide {...p} deck={DECK} activity={L.challenge} eyebrow="30-Tage-Challenge" title="Ein Tool. Ein Use Case. Ein Termin." />
);

/* ─── Danke ─── */

function ThanksSlide({ active }: SlideProps) {
  return (
    <SlideFrame theme="dark">
      <div className="absolute inset-0 [background:linear-gradient(155deg,#8b5cf6_0%,#a78bfa_38%,#d68cfa_72%,#f0bdfa_100%)]" />
      <Brand theme="dark" />
      <div className="relative flex h-full flex-col items-center justify-center text-center">
        <Stagger index={0} active={active}>
          <Headline size="xl" className="text-white">
            Danke.
          </Headline>
        </Stagger>
        <Stagger index={1} active={active}>
          <p className="mt-10 text-[44px] font-light text-white/90">Alle Folien, Prompts und Links bleiben online.</p>
        </Stagger>
        <Stagger index={2} active={active}>
          <div className="mt-20 flex items-center gap-10 rounded-full border border-white/30 bg-white/15 px-14 py-6 text-[30px] text-white backdrop-blur-md">
            <span>deepdive-ki.de/fortbildung</span>
            <span className="h-8 w-px bg-white/40" />
            <span>info@deepdive-ki.de</span>
          </div>
        </Stagger>
      </div>
    </SlideFrame>
  );
}

/* ─── Live-Folien (Deck-gebunden) ─── */

const L = CRASH_KURS_LIVE;
const LiveWordsStart = (p: SlideProps) => (
  <LiveWordsSlide {...p} deck={DECK} activity={L.wordsStart} eyebrow="Ankommen" title="Was verbinden Sie mit KI?" />
);
const LiveUsage = (p: SlideProps) => <LivePollSlide {...p} deck={DECK} activity={L.usage} eyebrow="Kurze Umfrage" />;
const LiveRanking = (p: SlideProps) => <LiveRankingSlide {...p} deck={DECK} activity={L.ranking} eyebrow="Ranking · Ihr Tipp gegen die Studie" />;
const LiveQuiz = (p: SlideProps) => <LiveQuizSlide {...p} deck={DECK} activity={L.quiz} eyebrow="Mitmachen" />;
const LiveFeedback = (p: SlideProps) => <LivePollSlide {...p} deck={DECK} activity={L.feedback} eyebrow="Feedback" />;
const LiveStudents = (p: SlideProps) => <LiveEstimateSlide {...p} deck={DECK} activity={L.students} eyebrow="Schätzfrage · Ihre Klasse" />;
const LiveJudge = (p: SlideProps) => <LiveJudgeSlide {...p} deck={DECK} activity={L.judge} eyebrow="Urteilsübung" />;

/* ─── Inhaltsfolien aus Mustern ─── */

const LimitationsSlide = (p: SlideProps) => (
  <StatementSlide
    {...p}
    eyebrow="Limitationen"
    title="Was KI nicht kann."
    lines={[
      "Sie hängt von Daten, Kontext und Entwicklungsstand ab.",
      "Werte und Inhalte der Daten übernimmt sie unhinterfragt.",
      "Es gibt kaum einheitliche Regeln und Gesetze.",
      "Intuition, Kreativität und emotionale Intelligenz fehlen ihr.",
    ]}
  />
);

const ModelsSlide = (p: SlideProps) => (
  <GridSlide
    {...p}
    eyebrow="Die großen KIs"
    title="Wer spielt mit?"
    items={[
      { name: "ChatGPT", meta: "OpenAI · USA", text: "Der Allrounder und Marktführer. Setzt die Maßstäbe, die alle anderen jagen." },
      { name: "Gemini", meta: "Google · USA", text: "Tief in Google-Dienste integriert: Docs, Gmail, Android, Suche." },
      { name: "Claude", meta: "Anthropic · USA", text: "Stark bei langen Texten, sorgfältigem Schreiben und Code." },
      { name: "Copilot", meta: "Microsoft · USA", text: "Steckt in Word, Excel, Teams. Oft schon über die Schul-Lizenz da." },
      { name: "Perplexity", meta: "USA", text: "Recherche mit Quellenangaben statt Chat ohne Belege." },
      { name: "DeepSeek", meta: "China", text: "Der Open-Source-Schock 2025: fast so gut, deutlich billiger." },
      { name: "Le Chat", meta: "Mistral · Frankreich", text: "Die europäische Antwort. Modelle offen, Server in der EU." },
      { name: "Llama", meta: "Meta · USA", text: "Offenes Modell, läuft auch lokal. Basis vieler Schul-Tools." },
    ]}
  />
);

const PlatformsSlide = (p: SlideProps) => (
  <GridSlide
    {...p}
    eyebrow="Plattformen für Schulen"
    title="Was davon in die Schule darf."
    cols={3}
    items={[
      { name: "DeepChat", meta: "DeepDiveKI · Hamburg", text: "DSGVO-konform, Server in Deutschland, Assistenten und Arbeitsblatt-Generator für Lehrkräfte und Klassen.", accent: true },
      { name: "AIS Chat", meta: "Landesangebot", text: "Von Ländern bereitgestellter KI-Chat für Schulen. Datenschutz geklärt, Funktionsumfang schlank." },
      { name: "telli", meta: "Länder · FWU", text: "Gemeinsamer KI-Assistent mehrerer Bundesländer für Lehrkräfte und Lernende." },
      { name: "fobizz", meta: "Deutschland", text: "Fortbildungsplattform mit KI-Werkzeugen, Datenschutzfiltern und Klassenräumen." },
      { name: "Magic School", meta: "USA", text: "Dutzende Lehrer-Tools von Elternbrief bis Rubric. Ohne Schülerdaten nutzbar." },
      { name: "Eduaide", meta: "USA", text: "Unterrichtsplanung, Material, Feedback. Gut für Ideen, nichts für Schülerdaten." },
    ]}
  />
);

const ToolsSlide = (p: SlideProps) => (
  <GridSlide
    {...p}
    eyebrow="Spezialwerkzeuge"
    title="Für eine Sache richtig gut."
    cols={3}
    items={[
      { name: "Perplexity", meta: "Recherche", text: "Antwortet mit Quellen. Für die Vorbereitung und für Schüler:innen, die belegen sollen." },
      { name: "DeepL Write", meta: "Schreiben", text: "Verbessert Texte, ohne sie neu zu erfinden. Elternbrief, Gutachten, Zeugnis." },
      { name: "NotebookLM", meta: "Eigene Dokumente", text: "Lädt Ihre PDFs und beantwortet Fragen nur daraus. Silowissen wird nutzbar." },
      { name: "Canva", meta: "Bild & Layout", text: "Bildgenerierung und Gestaltung in einem. Arbeitsblätter sehen plötzlich gut aus." },
      { name: "Sora & Veo", meta: "Video", text: "Text wird Film. Noch Spielerei, aber in zwei Jahren Unterrichtsalltag." },
      { name: "Suno", meta: "Musik", text: "Ein Lernlied zur Photosynthese in 40 Sekunden. Die Klasse wird es nicht vergessen." },
    ]}
  />
);

const PrivacyRulesSlide = (p: SlideProps) => (
  <StatementSlide
    {...p}
    eyebrow="Anmeldung & Datenschutz"
    title="Drei Regeln, die immer gelten."
    lines={[
      "Keine Schülerdaten in US-Tools. Keine Namen, keine Noten, keine Texte.",
      "Dienstlicher Account statt privater. Die Schule entscheidet, nicht der Zufall.",
      "Mit der Klasse nur auf einer DSGVO-konformen Plattform arbeiten.",
    ]}
  />
);

const FormulaSlide = (p: SlideProps) => (
  <StatementSlide
    {...p}
    eyebrow="Prompting · Die Kurzformel"
    title="Rolle. Kontext. Aufgabe. Format."
    lines={[
      "Rolle: Wer soll die KI sein? „Du bist Grundschullehrerin.“",
      "Kontext: Für wen, warum, mit welchem Material?",
      "Aufgabe: Was genau, mit welchen Regeln?",
      "Format: Liste, Tabelle, Word-Datei, Länge.",
    ]}
  />
);

const StufenSlide = (p: SlideProps) => (
  <StatementSlide
    {...p}
    eyebrow="Individualisierter Unterricht"
    title="Fünf Stufen bis zur Königsdisziplin."
    lines={[
      "Lernklima und pädagogische Strukturen sichern.",
      "Klassen effizient führen und Methoden variieren.",
      "Schüler:innen motivieren, aktives Lernen ermöglichen.",
      "Differenzieren, wirkungs- und kompetenzorientiert fördern.",
      "Individualisierter Unterricht mit KI.",
    ]}
  />
);

const GuardrailsSlide = (p: SlideProps) => (
  <StatementSlide
    {...p}
    eyebrow="Leitplanken für die Schule"
    title="Vier Dinge, die Sie klären sollten."
    lines={[
      "Transparenz: KI-Nutzung wird gekennzeichnet, von allen.",
      "Eine KI-Vereinbarung mit jeder Klasse, gemeinsam formuliert.",
      "Prüfungsformate anpassen statt Hausaufgaben verbieten.",
      "Datenschutz als Teamaufgabe: Schulleitung, DSB, Kollegium.",
    ]}
  />
);

const AssistantSlide = (p: SlideProps) => (
  <CardsSlide
    {...p}
    stepwise
    eyebrow="Bonus · KI-Assistenten bauen"
    title="Ein Assistent, der bleibt."
    cards={[
      { icon: Bot, label: "Aufgabe 0", title: "Problem finden", text: "Welches wiederkehrende Problem könnte ein Assistent für Sie lösen?" },
      { icon: BookOpen, label: "Aufgabe 1", title: "Lernhelfer", text: "Ein Assistent für Fach X, der begabte Schüler:innen mit komplexeren Aufgaben nach oben differenziert." },
      { icon: Users, label: "Aufgabe 2", title: "Prüfungscoach", text: "Bereitet auf mündliche Prüfungen vor, kennt das Curriculum und liefert Erwartungshorizonte." },
    ]}
  />
);

/* ─── Use Cases ─── */

const TripSlide = (p: SlideProps) => (
  <TaskSlide
    {...p}
    icon={Bus}
    gradient="aurora"
    minutes={7}
    eyebrow="Use Case 1 · Organisation"
    title="Eine Klassenreise planen."
    prompt="Plane eine viertägige Klassenreise nach Berlin für eine 9. Klasse mit 28 Schüler:innen und drei Begleitpersonen, Budget 350 Euro pro Person. Ich brauche einen Tagesplan mit Bildungsanteil, eine Packliste und einen Elternbrief mit allen Terminen."
    steps={[
      "Ziel, Klassenstufe und Budget an Ihre Schule anpassen.",
      "Nachfragen: Was tun bei Regen? Günstigere Alternative zum Hostel?",
      "Zum Schluss den Elternbrief separat ausgeben lassen.",
    ]}
  />
);

const WorksheetSlide = (p: SlideProps) => (
  <TaskSlide
    {...p}
    icon={FileText}
    gradient="purple"
    minutes={7}
    eyebrow="Use Case 2 · Unterricht"
    title="Ein Arbeitsblatt in zwei Niveaus."
    prompt="Erstelle ein Arbeitsblatt zum Thema „Ritter im Mittelalter“ in zwei Schwierigkeitsstufen: einmal auf Sprachniveau B1, einmal auf Muttersprachniveau. Je acht Aufgaben, Lösungen am Ende. Gib beides als Word-Datei aus."
    steps={[
      "Eigenes Thema und eigene Klassenstufe einsetzen.",
      "Eine Aufgabe als Lückentext umformulieren lassen.",
      "Word-Export testen und das Blatt im Original öffnen.",
    ]}
  />
);

const SportsSlide = (p: SlideProps) => (
  <TaskSlide
    {...p}
    icon={Trophy}
    gradient="ocean"
    minutes={7}
    eyebrow="Use Case 4 · Schulorganisation"
    title="Bundesjugendspiele organisieren."
    prompt="Organisiere die Bundesjugendspiele für 420 Schüler:innen der Klassen 5 bis 10 an sechs Stationen von 8 bis 13 Uhr. Erstelle einen Zeitplan, eine Riegeneinteilung, eine Helferliste für zwölf Kolleg:innen und eine Excel-Tabelle für die Ergebnisse."
    steps={[
      "Zahlen Ihrer Schule einsetzen: Klassen, Stationen, Helfer.",
      "Engpässe suchen lassen: Wo stauen sich Riegen?",
      "Die Excel-Tabelle herunterladen und Formeln prüfen.",
    ]}
  />
);

/* ─── Deck ─── */

const meta = getDeckMeta(DECK)!;

export const crashKursDeck: Deck = {
  ...meta,
  slides: [
    // ── Ankommen ──
    { id: "titel", title: "Titel", theme: "dark", Component: TitleSlide, notes: "Ankommen lassen. WLAN-Zugang nennen. Der Live-Link kommt auf Folie 3." },
    { id: "hi", title: "Hi!", theme: "light", Component: HiSlide, notes: "Kurz vorstellen, wer im Raum ist." },
    { id: "wort", title: "Live · Ein Wort", theme: "light", Component: LiveWordsStart, notes: "Alle scannen den QR-Code. Seite offen lassen, sie wird den ganzen Kurs über gebraucht. Begriffe laut vorlesen, zwei, drei kommentieren." },
    { id: "fahrplan", title: "Fahrplan", theme: "light", Component: AgendaSlide, notes: "Fünf Blöcke inkl. Pause, 120 Minuten. Timeline und KI-Stufen liegen im Anhang, falls Zeit bleibt." },
    { id: "nutzung", title: "Live · Wie oft nutzt du KI?", theme: "light", Component: LiveUsage, notes: "Ergebnis kurz einordnen: Wer täglich nutzt, hilft nachher den anderen." },

    // ── Verstehen (25) ──
    { id: "falsch", title: "Man kann schnell falsch liegen", theme: "light", steps: 3, Component: FalschLiegenSlide, notes: "Drei Zitate, drei Schritte." },
    { id: "adoption", title: "100 Millionen User", theme: "dark", Component: AdoptionSlide, notes: "Nicht maßstäblich. ChatGPT: 5 Tage bezieht sich auf 1 Mio., 100 Mio. nach ca. 2 Monaten." },
    { id: "was-ist-ki", title: "Was ist K.I.?", theme: "dark", Component: WasIstKiSlide, notes: "Offene Frage ins Publikum." },
    { id: "quickdraw", title: "Quickdraw", theme: "light", Component: QuickdrawSlide, notes: "Mitmachen, 2 Minuten. Überleitung: Woher weiß das Netz, was eine Pizza ist?" },
    { id: "pipeline", title: "Wofür eigentlich KI?", theme: "light", steps: 2, Component: PipelineSlide, notes: "Daten → Muster → Entscheidung." },
    { id: "ml", title: "Lernen durch Feedback", theme: "light", Component: MachineLearningSlide, notes: "Katze oder Hund: Das Netz rät, bekommt Feedback, justiert nach. Das ist Training." },
    { id: "llm", title: "Aufgabe eines LLM", theme: "light", steps: 2, Component: LlmSlide, notes: "Drei Zustände. Kernsatz: Es rechnet Wahrscheinlichkeiten, es versteht nichts." },
    { id: "chatgpt", title: "Ausgabe bei ChatGPT", theme: "light", Component: ChatGptSlide, notes: "Token-Stream laufen lassen." },
    { id: "limits", title: "Limitationen", theme: "light", steps: 4, Component: LimitationsSlide, notes: "Vier Schritte. Überleitung: Das sehen wir uns jetzt live an." },
    { id: "halluzination", title: "Wenn die KI lügt", theme: "light", steps: 2, Component: HallucinationSlide, notes: "Mockup mit zwei Schritten: Weiter = Kontrollfrage, Weiter = Eingeständnis.\n\nBesser noch: live in ChatGPT dieselbe Frage stellen (zweiter Tab vorbereiten). Cooper et al. 2006 ist echt, die anderen beiden sind erfunden." },

    // ── KIs, Tools & Schüler (25) ──
    { id: "ranking", title: "Live · Ranking", theme: "light", steps: 1, Component: LiveRanking, notes: "Erst raten lassen (2 Minuten), dann Weiter: Studie einblenden. Grüne Karten = Publikum lag richtig." },
    { id: "studie", title: "Drei Zahlen aus der Studie", theme: "light", Component: StudySlide, notes: "Privat schlägt Arbeit. Frauenanteil hat sich verdreifacht." },
    { id: "schaetzung", title: "Live · Schätzfrage Schüler", theme: "light", steps: 1, Component: LiveStudents, notes: "Schieberegler auf dem Handy. Weiter = Auflösung (74 %, Vodafone Stiftung 2024). Zahl vor dem Vortrag prüfen." },
    { id: "schueler", title: "Ihre Klasse ist längst weiter", theme: "light", Component: StudentsSlide, notes: "JIM 2024 und Vodafone Stiftung 2024 vorher gegenprüfen. Character.ai/Snapchat My AI: Wer kennt das? Hand hoch." },
    { id: "modelle", title: "Die großen KIs", theme: "light", Component: ModelsSlide, notes: "Acht Namen, die man kennen sollte." },
    { id: "plattformen", title: "Plattformen für Schulen", theme: "light", Component: PlatformsSlide, notes: "DeepChat ist unser Produkt, das sagen wir offen. AIS Chat und telli je nach Bundesland." },
    { id: "tools", title: "Spezialwerkzeuge", theme: "light", Component: ToolsSlide, notes: "Je ein Satz pro Tool." },
    { id: "medien", title: "Bild, Ton, Film", theme: "light", Component: MediaSlide, notes: "LIVE-DEMO: Eines der drei wirklich erzeugen, Suno-Lied dauert ca. 40 Sekunden. Vorher Account prüfen." },
    { id: "datenschutz", title: "Drei Regeln", theme: "light", steps: 3, Component: PrivacyRulesSlide, notes: "Drei Schritte. Dann Pause." },
    { id: "pause", title: "Pause", theme: "dark", Component: PauseSlide, notes: "Countdown startet beim Betreten (10:00). Klick auf die Zahl startet neu. QR führt zur Toolbox, damit alle angemeldet zurückkommen." },

    // ── Prompten & Ausprobieren (40) ──
    { id: "prompting", title: "Prompting 101", theme: "light", Component: PromptStructureSlide, notes: "Zehn Bausteine, am Beispiel Photosynthese-Lückentext." },
    { id: "prompt-beispiel", title: "Der fertige Prompt", theme: "light", Component: PromptExampleSlide, notes: "Live in DeepChat eingeben und Ergebnis zeigen." },
    { id: "formel", title: "Die Kurzformel", theme: "light", steps: 4, Component: FormulaSlide, notes: "Vier Schritte. Das reicht für 80 % aller Fälle." },
    { id: "quickwins", title: "Fünf-Minuten-Gewinne", theme: "light", Component: QuickWinsSlide, notes: "Vier Alltagsprompts. Bei Zeugnis und Elternbrief betonen: keine Namen in den Prompt." },
    { id: "praxis", title: "Jetzt sind Sie dran", theme: "light", Component: PracticeOverviewSlide, notes: "QR zur Toolbox. Vier Aufgaben à 7 Minuten, wir gehen rum. Wer schnell ist: Bonus KI-Assistent." },
    { id: "uc-reise", title: "Use Case · Klassenreise", theme: "light", Component: TripSlide, notes: "7 Minuten. Timer im Presenter starten." },
    { id: "uc-arbeitsblatt", title: "Use Case · Arbeitsblatt", theme: "light", Component: WorksheetSlide, notes: "7 Minuten." },
    { id: "uc-korrektur", title: "Use Case · Korrektur", theme: "light", Component: FeedbackSlide, notes: "7 Minuten. Anonymisierten Beispieltext bereithalten (im Padlet oder ausgedruckt). Das ist der Use Case mit der größten Zeitersparnis." },
    { id: "uc-bjs", title: "Use Case · Bundesjugendspiele", theme: "light", Component: SportsSlide, notes: "7 Minuten. Excel-Export zeigen." },
    { id: "assistent", title: "Bonus · KI-Assistenten", theme: "light", steps: 2, Component: AssistantSlide, notes: "Für Schnelle." },

    // ── Im Unterricht (30) ──
    { id: "ki-typ", title: "Live · Welcher KI-Typ bist du?", theme: "light", Component: LiveQuiz, notes: "3 Minuten. Verteilung kommentieren: Jede Schule braucht alle vier Typen." },
    { id: "detektor", title: "Wie merke ich, ob das KI war?", theme: "light", steps: 3, Component: DetectorSlide, notes: "Drei Schritte. Die ehrliche Antwort: gar nicht. Detektoren benachteiligen Nicht-Muttersprachler nachweislich." },
    { id: "grundsaetze", title: "Fünf Grundsätze", theme: "light", steps: 5, Component: PrinciplesSlide, notes: "Fünf Schritte. Bogen zum Video-Komplettkurs Modul II (Plagiate & Klausuren). Formulierungen mit Modul II abgleichen." },
    { id: "urteil", title: "Live · Urteilsübung", theme: "light", steps: 3, Component: LiveJudge, notes: "Drei Szenarien auf dem Handy. Danach je Weiter = Auflösung eines Szenarios. Diskussion zulassen, besonders bei Szenario 3." },
    { id: "stufen", title: "Fünf Stufen", theme: "light", steps: 5, Component: StufenSlide, notes: "Fünf Schritte. Differenzierung ist anspruchsvoll, für alle Beteiligten." },
    { id: "differenzierung", title: "Sieben Stellschrauben", theme: "light", Component: DifferenzierungSlide, notes: "Jede Stellschraube ist ein Prompt-Parameter." },
    { id: "settings", title: "Vier Settings", theme: "light", Component: SettingsSlide, notes: "Welches Setting passt zu Ihrer Ausstattung?" },
    { id: "kompetenzen", title: "KI-Kompetenzen", theme: "light", Component: CompetenceSlide, notes: "QR zum Leitfaden. ACHTUNG: LEITFADEN_URL in crash-kurs.tsx noch durch den echten Link ersetzen." },
    { id: "leitplanken", title: "Leitplanken", theme: "light", steps: 4, Component: GuardrailsSlide, notes: "Vier Schritte." },

    // ── Abschluss ──
    { id: "challenge", title: "Live · 30-Tage-Challenge", theme: "light", Component: LiveChallenge, notes: "Jede:r schreibt ein Tool + einen Use Case. Ankündigen: In vier Wochen kommt eine Mail mit der Frage, wie es lief (E-Mail-Adressen über Padlet/Formular einsammeln). Guter Anlass für DeepChat-Testzugang." },
    { id: "feedback", title: "Live · Feedback", theme: "light", Component: LiveFeedback, notes: "1 Minute." },
    { id: "danke", title: "Danke", theme: "dark", Component: ThanksSlide, notes: "Folien bleiben online, Link auf der Folie." },

    // ── Anhang (bei Zeit) ──
    { id: "timeline", title: "Anhang · Transformationsgeschwindigkeit", theme: "light", Component: TimelineSlide, notes: "ANHANG. Nur zeigen, wenn Zeit bleibt. GPT-4-Parameterzahl ist nicht bestätigt." },
    { id: "stufen-ki", title: "Anhang · Entwicklung der KI", theme: "light", steps: 2, Component: StagesSlide, notes: "ANHANG. Schwache, starke, überlegene KI." },
  ],
};
