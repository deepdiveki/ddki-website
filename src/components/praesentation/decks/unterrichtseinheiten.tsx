"use client";

import AnimationErrorBoundary from "@/components/shared/AnimationErrorBoundary";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BookOpen,
  Check,
  ClipboardCheck,
  FileText,
  Image as ImageIcon,
  Layers,
  ListChecks,
  type LucideIcon,
  Mail,
  MessageSquare,
  Mic,
  Search,
  Sparkles,
  Table,
  Target,
  User,
  Users,
  X,
  Eye,
  GitBranch,
  Globe,
  MousePointerClick,
  PenLine,
  Timer,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { Fragment } from "react";
import { useInstant } from "../motion";
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
import { UE_LIVE } from "../live/activities";
import {
  LiveEstimateSlide,
  LiveJudgeSlide,
  LivePollSlide,
  LiveWordsSlide,
} from "../live/StageLive";
import type { Deck, SlideProps } from "../types";
import { CardsSlide, G, GridSlide, PauseSlide, StatementSlide, TaskSlide } from "./crash-kurs";
import { getDeckMeta } from "./manifest";
import { HiSlide, SlideHead, TEAM } from "./nerd-intro";

const DECK = "unterrichtseinheiten";

const HeadlineShaderBackground = dynamic(
  () => import("@/components/chooser/HeadlineShaderBackground"),
  { ssr: false },
);

/* ─── Lokale Muster ─── */

/** Zweispalter: links Grain-Karte mit beliebigem Inhalt, rechts Kopf + Bullets. */
export function SplitSlide({
  eyebrow,
  title,
  points,
  card,
  gradient = "purple",
  active,
  cardWidth = 760,
}: SlideProps & {
  eyebrow: string;
  title: React.ReactNode;
  points: string[];
  card: React.ReactNode;
  gradient?: "purple" | "aurora" | "ocean";
  cardWidth?: 760 | 900;
}) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div
        className={cn(
          "grid h-full items-center gap-20 px-20 pt-28 pb-20",
          cardWidth === 900 ? "grid-cols-[900px_1fr]" : "grid-cols-[760px_1fr]",
        )}
      >
        <Stagger index={0} active={active}>
          <StageGrainCard gradient={gradient} className="h-[800px] p-6">
            {card}
          </StageGrainCard>
        </Stagger>
        <div>
          <SlideHead eyebrow={eyebrow} title={title} active={active} />
          <ul className="mt-12 space-y-7">
            {points.map((t, i) => (
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

/** Drei Kennzahlen-Karten (wie StudySlide im Crash Kurs). */
export function StatsSlide({
  eyebrow,
  title,
  stats,
  footnote,
  active,
}: SlideProps & {
  eyebrow: string;
  title: string;
  stats: { big: string; small: string; text: string }[];
  footnote?: string;
}) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col px-20 pt-36 pb-20">
        <SlideHead eyebrow={eyebrow} title={title} active={active} />
        <div className="mt-14 grid flex-1 grid-cols-3 gap-10">
          {stats.map((s, i) => (
            <Stagger key={s.big} index={1 + i} active={active} className="h-full">
              <StageGrainCard gradient={G[i]} className="h-full">
                <p className="text-[64px] leading-none font-semibold tracking-tight text-white">{s.big}</p>
                <p className="mt-3 text-[22px] font-medium tracking-wider text-white/75 uppercase">{s.small}</p>
                <StageGlassPanel className="mt-auto">
                  <p className="text-[24px] leading-snug text-white/95">{s.text}</p>
                </StageGlassPanel>
              </StageGrainCard>
            </Stagger>
          ))}
        </div>
        {footnote && (
          <Stagger index={4} active={active}>
            <p className="mt-6 text-[18px] text-text-tertiary">{footnote}</p>
          </Stagger>
        )}
      </div>
    </SlideFrame>
  );
}

/** Chat-Mockup in einer Grain-Karte (Prompt rechts, Antwort links). */
export function ChatCard({
  prompt,
  answer,
  figure,
}: {
  prompt: string;
  answer: React.ReactNode;
  figure?: string;
}) {
  return (
    <>
      <div className="ml-auto max-w-[600px] rounded-2xl rounded-tr-md border border-white/25 bg-white/15 px-5 py-3 text-[19px] leading-snug text-white backdrop-blur-md">
        {prompt}
      </div>
      <StageGlassPanel className="mt-4 flex-1 overflow-hidden p-6">
        {figure && (
          <p className="mb-3 text-[16px] font-semibold tracking-wider text-white/70 uppercase">{figure}</p>
        )}
        <div className="flex items-start gap-4">
          <GreenDot />
          <div className="space-y-3 text-[19px] leading-snug text-white/95">{answer}</div>
        </div>
      </StageGlassPanel>
    </>
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
        <div className="max-w-[1150px]">
          <Stagger index={0} active={active}>
            <Eyebrow className="text-white/80">DeepDiveKI · Modul I</Eyebrow>
          </Stagger>
          <Stagger index={1} active={active}>
            <Headline size="md" className="mt-6 text-white">
              Unterrichtseinheiten konzipieren mit KI.
            </Headline>
          </Stagger>
          <Stagger index={2} active={active}>
            <p className="mt-10 max-w-[1000px] text-[40px] leading-[1.3] font-light text-white/85">
              Drei Stunden. Am Ende steht das Grundgerüst Ihrer nächsten Reihe.
            </p>
          </Stagger>
        </div>
        <Stagger index={3} active={active} className="shrink-0">
          <div className="flex items-center gap-5 rounded-full border border-white/20 bg-white/10 py-3 pr-9 pl-4 backdrop-blur-md">
            <div className="flex -space-x-6">
              {TEAM.slice(0, 2).map((p) => (
                <div key={p.name} className="relative size-20 overflow-hidden rounded-full border-4 border-[#0b0820] bg-[#DDD7FE]">
                  <Image src={p.image} alt="" fill sizes="80px" className="object-cover object-top" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-[30px] font-semibold text-white">Björn Isenbiel & Tim Philipp</p>
              <p className="text-[22px] text-white/70">Lehrkräfte · DeepDiveKI</p>
            </div>
          </div>
        </Stagger>
      </div>
    </SlideFrame>
  );
}

/* ─── Fahrplan ─── */

const AgendaSlide = (p: SlideProps) => (
  <CardsSlide
    {...p}
    eyebrow="Fahrplan · 180 Minuten"
    title="Was heute passiert."
    cards={[
      { label: "20 Min", title: "Haltung", text: "Warum neue Reihen selten sind. Didaktik vor Technik. Drei Ebenen, ein Planungsraster." },
      { label: "50 Min", title: "Workflow am Modell", text: "Blick über die Schulter: Fachschafts-Mail, fünf Phasen, Deep Research. Sie prompten mit." },
      { label: "45 Min", title: "Methodenkoffer & Artefakte", text: "Nach der Pause: acht KI-Methoden für einzelne Sitzungen, dazu interaktives Material ohne Code." },
      { label: "50 Min", title: "Werkstatt & Abschluss", text: "Sechs Schritte zur eigenen UE. Wir beraten. Dann Qualitätscheck und Challenge." },
    ]}
  />
);

/* ─── Haltung ─── */

const WhySlide = (p: SlideProps) => (
  <StatsSlide
    {...p}
    eyebrow="Warum wir hier sind"
    title="Neue Reihen sind teuer. Deshalb gibt es so wenige."
    stats={[
      { big: "10–20 Std.", small: "pro neuer Reihe", text: "So lange dauert eine Unterrichtseinheit von null. Deshalb wird recycelt, aus Schulbuch und Fundus." },
      { big: "3 Min", small: "statt 3 Stunden", text: "Ein Elternbrief, ein Feedback, eine Tabelle. KI nimmt die Reibung aus jedem Schritt." },
      { big: "1 UE", small: "nehmen Sie heute mit", text: "Nicht als Idee, sondern als Grundgerüst mit Sitzungen, Methoden und Material." },
    ]}
  />
);

const HaltungSlide = (p: SlideProps) => (
  <StatementSlide
    {...p}
    eyebrow="Die wichtigste Regel"
    title="Didaktik vor Technik."
    lines={[
      "Der Workflow beginnt beim Bildungsplan, nicht beim Prompt.",
      "Lernziele, Kompetenzen und Prüfung bleiben Ihre Entscheidung.",
      "KI liefert Optionen, nicht Lösungen. Sie ist Sparringspartner.",
      "Was die KI liefert, ist gelesen, gekürzt und geprüft, bevor es in die Klasse geht.",
    ]}
  />
);

const EbenenSlide = (p: SlideProps) => (
  <CardsSlide
    {...p}
    stepwise
    eyebrow="Wo dockt KI an?"
    title="Drei Ebenen."
    cards={[
      { icon: User, label: "Ebene 1", title: "KI für Sie", text: "Vorbereitung, Material, Differenzierung, Feedback. Schüler:innen sehen das Ergebnis, nicht die KI. Einfachster Einstieg, größte Zeitersparnis. Heute unser Schwerpunkt." },
      { icon: Users, label: "Ebene 2", title: "KI für Schüler:innen", text: "Tutor, Recherche-Begleiter, Übungsgenerator. Pädagogisch komplexer: Aufgaben, Bewertung und Datenschutz klären. Heute in zwei Sitzungsmethoden." },
      { icon: Layers, label: "Ebene 3", title: "KI als Thema", text: "Wie funktioniert sie, wo liegen ihre Grenzen? Gehört in jedes Fach. Heute als Reflexionsstelle in jeder UE." },
    ]}
  />
);

/* ─── Workflow-Übersicht ─── */

const PHASES = [
  { n: "1", title: "Themenfindung", q: "Was unterrichten wir eigentlich?" },
  { n: "2", title: "Erstprompt", q: "Wie bekomme ich das Grundgerüst?" },
  { n: "3", title: "Iteration", q: "Wie wird es meins?" },
  { n: "4", title: "Verifikation", q: "Was davon stimmt?" },
  { n: "5", title: "Material", q: "Was brauche ich am Montag?" },
];

function WorkflowSlide({ step, active, highlight }: SlideProps & { highlight?: number }) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col px-20 pt-36 pb-20">
        <SlideHead eyebrow="Der Workflow" title="Fünf Phasen. Immer dieselben." active={active} />
        <div className="mt-16 grid flex-1 grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-5">
          {PHASES.map((ph, i) => {
            const on = highlight === undefined || highlight === i;
            const body = (
              <div
                className={cn(
                  "flex h-[460px] flex-col rounded-[32px] border p-8 shadow-md transition",
                  on ? "border-primary-dark bg-primary-light" : "border-border-tertiary bg-white opacity-60",
                )}
              >
                <span className="text-[56px] leading-none font-semibold text-primary-darker tabular-nums">{ph.n}</span>
                <p className="mt-auto text-[34px] leading-tight font-semibold text-text-primary">{ph.title}</p>
                <p className="mt-3 text-[22px] leading-snug text-text-secondary">{ph.q}</p>
              </div>
            );
            return (
              <Fragment key={ph.n}>
                {i > 0 && (
                  <Reveal when={highlight === undefined ? i : 0} step={step}>
                    <ArrowRight className="size-12 text-text-tertiary" strokeWidth={1.5} />
                  </Reveal>
                )}
                <Reveal when={highlight === undefined ? i : 0} step={step}>
                  {body}
                </Reveal>
              </Fragment>
            );
          })}
        </div>
      </div>
    </SlideFrame>
  );
}

/** Kurze Phasen-Trennfolie: dunkel, Nummer groß. */
export function PhaseSlide({ n, title, question, active }: SlideProps & { n: string; title: string; question: string }) {
  return (
    <SlideFrame theme="dark">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(140,113,246,0.3)_0%,transparent_60%)]" />
      <Brand theme="dark" />
      <div className="flex h-full flex-col justify-center px-20">
        <Stagger index={0} active={active}>
          <Eyebrow className="text-primary-base">Phase {n} von 5</Eyebrow>
        </Stagger>
        <Stagger index={1} active={active}>
          <Headline size="xl" className="mt-6 text-white">
            {title}
          </Headline>
        </Stagger>
        <Stagger index={2} active={active}>
          <p className="mt-10 text-[44px] font-light text-white/80">{question}</p>
        </Stagger>
      </div>
    </SlideFrame>
  );
}

/* ─── Phase 1: Themenfindung ─── */

const ThemenfindungSlide = (p: SlideProps) => (
  <SplitSlide
    {...p}
    cardWidth={900}
    gradient="aurora"
    eyebrow="Phase 1 · Themenfindung"
    title="Der Bildungsplan ist Material."
    points={[
      "Den Bildungsplan-Auszug in den Prompt kopieren. Er ist die beste Kontextquelle, die Sie haben.",
      "Fünf Zugänge statt eines: politisch, sozial, kulturell, ökonomisch, biographisch.",
      "Sie wählen. Die KI hat Optionen gezeigt, die Sie allein nicht gehabt hätten.",
    ]}
    card={
      <ChatCard
        prompt="Du bist Geschichtslehrer für die Sek II. Hier ist ein Auszug aus dem Hamburger Bildungsplan zum Themenfeld Französische Revolution. Schlage mir fünf inhaltlich unterschiedliche Zugänge zu einer neunstündigen Unterrichtseinheit vor, die jeweils einen anderen Schwerpunkt setzen."
        answer={
          <>
            <p><strong>1 Politisch:</strong> Konstitutionelle Monarchie, Erklärung der Menschen- und Bürgerrechte, Übergang zur Republik.</p>
            <p><strong>2 Sozial:</strong> Ständegesellschaft, Hunger, der Dritte Stand als Akteur.</p>
            <p><strong>3 Kulturell:</strong> Symbole, Feste, Propaganda, neue Zeitrechnung.</p>
            <p><strong>4 Ökonomisch:</strong> Staatsschulden, Steuerprivilegien, Brotpreise.</p>
            <p><strong>5 Biographisch:</strong> Ludwig XVI., Robespierre, Olympe de Gouges, Napoleon.</p>
          </>
        }
      />
    }
  />
);

const MitmachThemaSlide = (p: SlideProps) => (
  <TaskSlide
    {...p}
    icon={Target}
    gradient="aurora"
    minutes={5}
    eyebrow="Mitmachen · Phase 1"
    title="Fünf Zugänge zu Ihrem Thema."
    prompt="Du bist [Fach]-Lehrkraft an [Schulform]. Hier ist der Auszug aus dem Bildungsplan zu [Thema]: [einfügen]. Schlage mir fünf inhaltlich unterschiedliche Zugänge zu einer [N]-stündigen Unterrichtseinheit vor, jeder mit einem anderen Schwerpunkt und einer Leitfrage."
    steps={[
      "Bildungsplan-Auszug einfügen. Ohne ihn rät die KI.",
      "Lesen, einen Zugang wählen, zwei verwerfen.",
      "Die Leitfrage des gewählten Zugangs notieren. Die brauchen Sie gleich.",
    ]}
  />
);

/* ─── Phase 2: Sechs Bausteine ─── */

const BAUSTEINE = [
  { key: "Rolle", color: "bg-violet-500", text: "Du bist erfahrene Geschichtslehrkraft an einem deutschen Gymnasium." },
  { key: "Aufgabe", color: "bg-pink-500", text: "Erstelle eine Unterrichtseinheit zur Französischen Revolution." },
  { key: "Rahmen", color: "bg-amber-500", text: "9 Sitzungen à 90 Minuten, Studienstufe Klasse 12, Leistungskurs, Hamburger Bildungsplan." },
  { key: "Schwerpunkt", color: "bg-amber-600", text: "Politisch-sozialer Zugang mit kulturellen Einschüben." },
  { key: "Leitfragen", color: "bg-amber-700", text: "Wie verteilt sich Macht zwischen den Ständen? Welche Rolle spielen ökonomische Faktoren? Wie wirkt die Revolution auf Demokratien heute?" },
  { key: "Output-Format", color: "bg-teal-500", text: "Pro Sitzung: Thema, Lernziele, Phasen mit Methode, Material, Hausaufgabe." },
];

function BausteineSlide({ step, active }: SlideProps) {
  const instant = useInstant();
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="grid h-full grid-cols-[1fr_640px] items-start gap-16 px-20 pt-36 pb-20">
        <div>
          <SlideHead eyebrow="Phase 2 · Erstprompt" title="Die ganze UE in einem Prompt. Sechs Bausteine." active={active} />
          <Stagger index={1} active={active}>
            <div className="mt-10 rounded-[32px] border border-border-tertiary bg-white p-8 shadow-md">
              <div className="text-[20px] leading-[1.6] text-text-primary">
                {BAUSTEINE.map(
                  (b, i) =>
                    step >= i + 1 && (
                      <motion.span
                        key={b.key}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: instant ? 0 : 0.4 }}
                      >
                        <span className={cn("mr-2 rounded-md px-2 py-0.5 text-[15px] font-semibold text-white", b.color)}>
                          {i + 1}
                        </span>
                        <span className="mr-3">{b.text}</span>
                      </motion.span>
                    ),
                )}
                {step === 0 && <span className="text-text-tertiary">Der Prompt baut sich Baustein für Baustein auf.</span>}
              </div>
            </div>
          </Stagger>
        </div>
        <ol className="mt-4 space-y-3">
          {BAUSTEINE.map((b, i) => (
            <Reveal key={b.key} when={i + 1} step={step}>
              <li className="flex items-center gap-4 rounded-2xl border border-border-tertiary bg-white px-5 py-4">
                <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl text-[22px] font-semibold text-white", b.color)}>
                  {i + 1}
                </span>
                <div>
                  <p className="text-[26px] leading-tight font-semibold text-text-primary">{b.key}</p>
                  <p className="text-[17px] text-text-tertiary">
                    {["Wer soll die KI sein?", "Was genau soll entstehen?", "Stunden, Dauer, Schulform, Stufe", "Inhaltlicher Fokus", "3–5 Fragen, die die Reihe tragen", "Wie soll die Antwort aussehen?"][i]}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </SlideFrame>
  );
}

const ErstpromptOutputSlide = (p: SlideProps) => (
  <SplitSlide
    {...p}
    cardWidth={900}
    eyebrow="Phase 2 · Der erste Output"
    title="Nicht perfekt. Aber ein Grundgerüst."
    points={[
      "Neun Sitzungen in 40 Sekunden, jede mit Thema, Zielen, Phasen, Material, Hausaufgabe.",
      "Was gut ist: Struktur, Vollständigkeit, Tempo.",
      "Was fehlt: Ihre Lerngruppe, Ihre Schwerpunkte, Ihre Prüfung. Das kommt in Phase 3.",
    ]}
    card={
      <ChatCard
        prompt="[Der Sechs-Bausteine-Prompt]"
        answer={
          <>
            <p><strong>Sitzung 5 · Tugend und Terror.</strong> Lernziele: Die Logik der Schreckensherrschaft erklären, Robespierres Rede von 1794 analysieren.</p>
            <p><strong>Phasen:</strong> Einstieg (10 Min) Bildimpuls Guillotine · Erarbeitung (40 Min) Redeanalyse in Partnerarbeit · Sicherung (25 Min) Streitgespräch · Reflexion (15 Min).</p>
            <p><strong>Material:</strong> Rede-Auszug, Analyseraster, Rollenkarten.</p>
            <p><strong>Hausaufgabe:</strong> Gegenrede aus Sicht eines Girondisten (eine Seite).</p>
            <p className="text-white/60">… und acht weitere Sitzungen.</p>
          </>
        }
      />
    }
  />
);

const MitmachErstpromptSlide = (p: SlideProps) => (
  <TaskSlide
    {...p}
    icon={Sparkles}
    gradient="purple"
    minutes={7}
    eyebrow="Mitmachen · Phase 2"
    title="Ihr Erstprompt."
    prompt="1 Du bist [Rolle]. 2 Erstelle eine Unterrichtseinheit zu [Thema]. 3 [N] Sitzungen à [Minuten], [Schulform], [Klassenstufe], [Bundesland]. 4 Schwerpunkt: [gewählter Zugang]. 5 Leitfragen: [aus Phase 1]. 6 Pro Sitzung: Thema, Lernziele, Phasen mit Methode, Material, Hausaufgabe."
    steps={[
      "Alle sechs Bausteine füllen. Leerlassen ist erlaubt, aber dann rät die KI.",
      "Output einmal komplett lesen. Nicht sofort nachbessern.",
      "Drei Dinge notieren, die nicht zu Ihrer Lerngruppe passen.",
    ]}
  />
);

/* ─── Phase 3: Iteration ─── */

const IterationSlide = (p: SlideProps) => (
  <CardsSlide
    {...p}
    stepwise
    eyebrow="Phase 3 · Iteration"
    title="Drei Runden, dann passt es."
    cards={[
      { icon: Target, label: "Runde 1", title: "Inhaltlich schärfen", text: "„Politische Ideen, Quellenanalyse, Rollenspiele und Klausur sollen jeweils mindestens zweimal vorkommen. Überarbeite die UE entsprechend.“" },
      { icon: Layers, label: "Runde 2", title: "Methodisch variieren", text: "„Sitzung 3 und 6 haben dieselbe Methode. Ersetze eine durch ein kooperatives Format mit Produkt.“" },
      { icon: Users, label: "Runde 3", title: "Differenzieren", text: "„Ergänze für Sitzung 2 und 5 je eine Variante für schnelle Lernende und eine mit Sprachhilfen (B1).“" },
    ]}
  />
);

const IterationsregelnSlide = (p: SlideProps) => (
  <StatementSlide
    {...p}
    eyebrow="Phase 3 · Drei Prinzipien"
    title="So iteriert man, ohne sich zu verlaufen."
    lines={[
      "Eine Änderung pro Runde. Sonst wissen Sie nicht, was gewirkt hat.",
      "Konkret statt vage: „Sitzung 3 kürzer“ bringt nichts, „Sitzung 3 auf 45 Minuten, Phase 2 streichen“ schon.",
      "Optionen mitgeben: „Schlage drei Alternativen für den Einstieg vor“ statt „mach es besser“.",
    ]}
  />
);

/* ─── Phase 4: Verifikation ─── */

function VerifikationSlide({ active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="grid h-full grid-cols-[760px_1fr] items-center gap-24 px-20 pt-28 pb-20">
        <Stagger index={0} active={active}>
          <StageGrainCard gradient="ocean" className="h-[780px]">
            <p className="text-[20px] font-semibold tracking-wider text-white/70 uppercase">Derselbe Prompt, zwei Modelle</p>
            <StageGlassPanel className="mt-4 border-rose-200/60">
              <div className="flex items-start gap-3">
                <X className="mt-1 size-7 shrink-0 text-rose-200" />
                <div>
                  <p className="text-[18px] text-white/70">ChatGPT schlägt als Literatur vor:</p>
                  <p className="mt-1 text-[22px] leading-snug text-white">Schmidt, K. (2019): <em>Robespierre und die Logik des Terrors.</em> Göttingen.</p>
                  <p className="mt-2 text-[18px] text-rose-100">Existiert nicht. Plausibler Titel, erfundener Autor.</p>
                </div>
              </div>
            </StageGlassPanel>
            <StageGlassPanel className="mt-4 border-emerald-200/60">
              <div className="flex items-start gap-3">
                <Check className="mt-1 size-7 shrink-0 text-emerald-200" />
                <div>
                  <p className="text-[18px] text-white/70">Claude schlägt vor:</p>
                  <p className="mt-1 text-[22px] leading-snug text-white">Furet, F. (1980): <em>1789 – Vom Ereignis zum Gegenstand der Geschichtswissenschaft.</em></p>
                  <p className="mt-2 text-[18px] text-emerald-100">Existiert. Trotzdem prüfen.</p>
                </div>
              </div>
            </StageGlassPanel>
            <StageGlassPanel className="mt-auto">
              <p className="text-[22px] leading-snug text-white/95">
                „Bist du sicher?“ funktioniert nicht. Die KI bestätigt gern. Prüfen Sie außerhalb der KI.
              </p>
            </StageGlassPanel>
          </StageGrainCard>
        </Stagger>
        <div>
          <SlideHead eyebrow="Phase 4 · Verifikation" title="Was davon stimmt?" active={active} />
          <ul className="mt-12 space-y-7">
            {[
              "Faktencheck: Daten, Namen, Zitate gegen Lexikon oder Schulbuch.",
              "Quellen-Check: Perplexity liefert Links. Jeden Link öffnen.",
              "Kreuz-Validierung: Denselben Prompt in ein zweites Modell. Wo sie sich widersprechen, liegt Arbeit.",
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

/* ─── Phase 5: Material ─── */

const ROWS = [
  ["1", "Ancien Régime", "Ständegesellschaft erklären", "Bildanalyse, Gruppenpuzzle", "Rigaud-Porträt, Karikatur", "Vortrag vorbereiten"],
  ["2", "Aufklärung", "Volkssouveränität verstehen", "Textarbeit, Rousseau-Brief", "Contrat social, Auszug", "Brief an Ludwig XVI."],
  ["3", "1789", "Menschenrechte bewerten", "MC-Test, Diskussion", "Erklärung, Grundgesetz", "Vergleich Art. 1"],
  ["4", "Tugend & Terror", "Rede analysieren", "Dialog mit Robespierre", "Rede 1794, Arbeitsblatt", "Gegenrede"],
  ["5", "Napoleon", "Bilanz ziehen", "Bildgenerierung, Vergleich", "David vs. Rigaud", "Reflexion"],
];

function TabelleSlide({ active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col px-20 pt-36 pb-20">
        <SlideHead eyebrow="Phase 5 · Material" title="Drei Seiten Text liest keiner. Eine Tabelle schon." active={active} />
        <Stagger index={1} active={active} className="mt-10">
          <div className="overflow-hidden rounded-[32px] border border-border-tertiary bg-white shadow-md">
            <table className="w-full text-left text-[21px]">
              <thead className="bg-background-secondary text-[17px] tracking-wider text-text-tertiary uppercase">
                <tr>
                  {["Sitzung", "Thema", "Lernziel", "Methode", "Material", "Hausaufgabe"].map((h) => (
                    <th key={h} className="px-6 py-4 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border-tertiary text-text-primary">
                {ROWS.map((r) => (
                  <tr key={r[0]}>
                    {r.map((c, j) => (
                      <td key={j} className={cn("px-6 py-4 leading-snug", j === 0 && "font-semibold text-primary-dark", j === 3 && "text-primary-darker")}>{c}</td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td colSpan={6} className="px-6 py-3 text-[18px] text-text-tertiary">… Sitzungen 6 bis 9</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Stagger>
        <Stagger index={2} active={active}>
          <p className="mt-6 text-[24px] text-text-secondary">
            Prompt: „Fasse die UE als Tabelle zusammen: Sitzung, Thema, Lernziel, Methode, Material, Hausaufgabe. Als CSV für Excel.“
          </p>
        </Stagger>
      </div>
    </SlideFrame>
  );
}

/* ─── Methodenkoffer ─── */

const SITZUNGEN = [
  { name: "Sitzung 1", meta: "Schülervorträge + Brief", text: "Fünf Vorträge entlang der Leitfrage, personalisiert pro Schüler:in. Brief an Ludwig XVI. als Perspektivwechsel." },
  { name: "Sitzung 2", meta: "Feedback mit KI", text: "Stichworte zum Vortrag werden zu konstruktivem Feedback in drei Teilen. Die Bewertung bleibt bei Ihnen." },
  { name: "Sitzung 3 + 4", meta: "MC-Test", text: "Zehn Fragen mit plausiblen Distraktoren, dann allein, Partner, Gruppe, Diskussion, Auflösung." },
  { name: "Sitzung 5", meta: "Dialog + Arbeitsblatt", text: "Gespräch mit „Robespierre“, Mai 1794. Danach Arbeitsblatt mit Vergleich KI gegen echte Quelle." },
  { name: "Sitzung 6", meta: "Einfache Sprache", text: "Erklärung der Menschenrechte auf A2, maximal sechs Artikel. Inklusion ohne Extra-Aufwand." },
  { name: "Sitzung 7", meta: "Bildgenerierung", text: "Karikatur 1789 gegen moderne Werbung zum selben Motiv. Stil verändert Botschaft." },
  { name: "Sitzung 8", meta: "Reflexions-Assistent", text: "Ein Assistent, der nur Fragen stellt. 25 individuelle Dialoge statt einem Plenumsgespräch." },
  { name: "Sitzung 9", meta: "Klausur", text: "Drei Anforderungsbereiche, Erwartungshorizont, Bewertungsraster. Gegen das Curriculum geprüft.", accent: true },
];

const SitzungsplanSlide = (p: SlideProps) => (
  <GridSlide {...p} eyebrow="Methodenkoffer · Die Modell-UE" title="Neun Sitzungen, je eine KI-Methode." items={SITZUNGEN} />
);

function RollenDialogSlide({ active }: SlideProps) {
  return (
    <SplitSlide
      {...p0(active)}
      cardWidth={900}
      eyebrow="Methode · Rollendialog"
      title="Ein Gespräch mit Robespierre."
      points={[
        "Prompt: Rolle, Datum (Mai 1794), Wissensgrenze: Er weiß nichts über die Zukunft.",
        "Drei Regeln: Vorgespräch zur Figur, Quellen-Check danach, Reflexion: Was war Konstruktion?",
        "Drei Caveats: keine Opfer als Figuren, Mehrstimmigkeit sichern, eine Lerngrenze setzen.",
      ]}
      card={
        <ChatCard
          figure="Maximilien de Robespierre · Mai 1794"
          prompt="Warum lasst ihr eure eigenen Freunde verhaften? Danton war doch einer von euch."
          answer={
            <>
              <p>Danton <em>war</em> einer von uns. Genau deshalb wiegt sein Verrat schwerer. Die Republik ist jung und umzingelt, von außen durch die Koalition, von innen durch jene, die Milde predigen, während die Feinde rüsten.</p>
              <p>Tugend ohne Schrecken ist ohnmächtig. Schrecken ohne Tugend ist Verbrechen. Ich habe das im Februar vor dem Konvent gesagt, und ich stehe dazu.</p>
              <p>Du fragst nach Freundschaft. Ich frage nach Frankreich.</p>
            </>
          }
        />
      }
    />
  );
}
const p0 = (active: boolean): SlideProps => ({ active, step: 0 });

const ArbeitsblattSlide = (p: SlideProps) => (
  <CardsSlide
    {...p}
    eyebrow="Methode · Arbeitsblatt zum Dialog"
    title="Drei Blöcke, der dritte ist der wichtigste."
    cards={[
      { icon: BookOpen, label: "Block 1", title: "Verständnis", text: "Was sagt die Figur? Drei Kernaussagen in eigenen Worten wiedergeben." },
      { icon: ClipboardCheck, label: "Block 2", title: "Bewertung", text: "Welche Argumente überzeugen, welche nicht? Begründen mit dem Wissen aus Sitzung 1 bis 4." },
      { icon: Search, label: "Block 3", title: "Vergleich KI gegen Quelle", text: "Die echte Rede vom Februar 1794 daneben legen. Wo stimmt die KI, wo erfindet sie? Das trainiert Quellenkritik und KI-Kritik in einem Schritt." },
    ]}
  />
);

const DistraktorenSlide = (p: SlideProps) => (
  <StatementSlide
    {...p}
    eyebrow="Methode · Multiple-Choice mit KI"
    title="Fünf Regeln für gute Distraktoren."
    lines={[
      "Plausibel: Jede falsche Antwort muss jemand ernsthaft wählen können.",
      "Gleich lang: Die längste Antwort ist sonst immer die richtige.",
      "Keine Verneinungen in der Frage.",
      "Kein „Alle“ und kein „Keine der genannten“.",
      "Genau eine richtige Antwort. Die KI schummelt hier gern, prüfen.",
    ]}
  />
);

const FeedbackMethodeSlide = (p: SlideProps) => (
  <SplitSlide
    {...p}
    gradient="aurora"
    eyebrow="Methode · Feedback mit KI"
    title="Beschleuniger, nicht Geber."
    points={[
      "Ihre Stichworte, Ihre Beobachtung. Die KI formuliert aus, in drei Teilen: Stärken, Entwicklung, nächster Schritt.",
      "25 Vorträge × 10 Minuten = 4 Stunden. Mit KI: 30 Minuten.",
      "Was die KI nicht darf: Note, Persönlichkeit, Heikles. Und: anonymisieren, Platzhalter statt Namen.",
    ]}
    card={
      <ChatCard
        prompt="Du bist Geschichtslehrkraft. Hier meine Notizen zu einem Vortrag über „Tugend und Terror“: inhaltlich solide, drei Phasen erkennbar, Sprache stockend, Folien überladen, Schluss zu abrupt. Formuliere ein konstruktives Feedback in drei Teilen, ermutigend, für Schüler A."
        answer={
          <>
            <p><strong>Was gelungen ist:</strong> Du hast die drei Phasen der Schreckensherrschaft klar getrennt und die Rede von 1794 richtig eingeordnet. Das ist der Kern, und der sitzt.</p>
            <p><strong>Woran du arbeiten kannst:</strong> Weniger Text auf den Folien, mehr freie Rede. Ein Stichwort pro Folie reicht dir, der Rest ist in deinem Kopf.</p>
            <p><strong>Nächster Schritt:</strong> Übe den Schluss separat: ein Satz, der die Leitfrage beantwortet.</p>
          </>
        }
      />
    }
  />
);

const EinfacheSpracheSlide = (p: SlideProps) => (
  <SplitSlide
    {...p}
    gradient="ocean"
    eyebrow="Methode · Einfache Sprache"
    title="Inklusion ohne Extra-Aufwand."
    points={[
      "Prompt: „Übertrage Artikel 1 bis 6 in Einfache Sprache, Niveau A2, kurze Sätze, ein Gedanke pro Satz.“",
      "Niveau-Treppe: A1 für Neuzugewanderte, A2 für DaZ, B1 für die Mehrheit. Dasselbe Material, drei Stufen.",
      "Einfache Sprache ist nicht Leichte Sprache. Leichte Sprache hat Regeln und Prüfgruppen, das kann die KI nicht ersetzen.",
    ]}
    card={
      <>
        <p className="text-[18px] font-semibold tracking-wider text-white/70 uppercase">Vorher · Original 1789</p>
        <StageGlassPanel className="mt-3">
          <p className="text-[21px] leading-snug text-white/95">
            Art. 1. Die Menschen werden frei und gleich an Rechten geboren und bleiben es. Die gesellschaftlichen Unterschiede können nur im gemeinen Nutzen begründet sein.
          </p>
        </StageGlassPanel>
        <p className="mt-6 text-[18px] font-semibold tracking-wider text-white/70 uppercase">Nachher · A2</p>
        <StageGlassPanel className="mt-3">
          <p className="text-[21px] leading-snug text-white/95">
            Alle Menschen sind frei. Alle Menschen haben die gleichen Rechte. Das gilt von Geburt an. Unterschiede zwischen Menschen sind nur erlaubt, wenn sie allen nützen.
          </p>
        </StageGlassPanel>
        <div className="mt-auto grid grid-cols-3 gap-3">
          {["A1", "A2", "B1"].map((n, i) => (
            <div key={n} className={cn("rounded-2xl border border-white/25 py-4 text-center text-[28px] font-semibold text-white", i === 1 ? "bg-white/30" : "bg-white/10")}>
              {n}
            </div>
          ))}
        </div>
      </>
    }
  />
);

const BildgenerierungSlide = (p: SlideProps) => (
  <CardsSlide
    {...p}
    eyebrow="Methode · Bildgenerierung"
    title="Stil verändert Botschaft."
    cards={[
      { icon: ImageIcon, label: "Ablauf", title: "Fünf Schritte", text: "Konventionen historischer Propaganda → Schüler:innen wählen ein Thema von heute → Bilder in mehreren Stilen generieren → Wirkung vergleichen → Bezug auf 1789." },
      { icon: MessageSquare, label: "Reflexion", title: "Drei Fragen", text: "Welche Mittel nutzt das Bild? Wen spricht es an, wen schließt es aus? Was bleibt gleich zwischen 1789 und heute?" },
      { icon: X, label: "Caveats", title: "Drei Grenzen", text: "Urheberrecht und Stile lebender Künstler. Sensible Themen nicht als Spiel. Ziel ist Analyse, nicht Manipulation lernen." },
    ]}
  />
);

function ReflexionsAssistentSlide({ active }: SlideProps) {
  return (
    <SplitSlide
      {...p0(active)}
      cardWidth={900}
      gradient="purple"
      eyebrow="Methode · Reflexions-Assistent"
      title="Ein Assistent, der nur fragt."
      points={[
        "Drei Bau-Anweisungen: Fragen statt Antworten. Bezug zur UE. Ziel: drei eigene Erkenntnisse.",
        "25 individuelle Dialoge statt einem Plenumsgespräch, in dem vier reden.",
        "Ebene 2 in Reinform: Die KI gehört den Schüler:innen, die Lehrkraft setzt den Rahmen.",
      ]}
      card={
        <ChatCard
          figure="Histo-Reflektor · Sitzung 8"
          prompt="Ich finde, die Revolution war am Ende gescheitert, weil Napoleon alles rückgängig gemacht hat."
          answer={
            <>
              <p>Interessante These. Was genau meinst du mit „alles“? Nenne mir zwei Dinge, die Napoleon rückgängig gemacht hat, und zwei, die er beibehalten hat.</p>
              <p>Und noch eine Frage dazu: Woran würdest du messen, ob eine Revolution „gescheitert“ ist? An ihren Zielen von 1789 oder an dem, was 1815 übrig blieb?</p>
            </>
          }
        />
      }
    />
  );
}

const TransferSlide = (p: SlideProps) => (
  <GridSlide
    {...p}
    eyebrow="Transfer · Dieselben Methoden, Ihr Fach"
    title="Die Bausteine bleiben. Nur die Inhalte ändern sich."
    items={[
      { name: "Mathematik", meta: "8. Klasse · Lineare Funktionen", text: "UE mit realweltlichen Anwendungen: Mobilfunktarife vergleichen, Stationenlernen, Pair-Programming am Tablet." },
      { name: "Englisch", meta: "10. Klasse · Short Stories", text: "Flash Fiction schreiben, Pre-Reading-Aktivitäten, Vokabel-Inseln für DaZ. Brief-Methode: Letter to Juliet." },
      { name: "Sachunterricht", meta: "3. Klasse · Wasserkreislauf", text: "Handlungsorientiert: Wassertropfen-Geschichte, Experiment mit Glasdose, Forschertagebuch, Theaterstück." },
      { name: "Biologie", meta: "9. Klasse · Evolution", text: "Dialog mit Darwin an Bord der Beagle. MC-Test gestaffelt nach Reproduktion, Verständnis, Anwendung." },
      { name: "Religion / Ethik", meta: "7. Klasse · Gewissen", text: "Brief des Petrus an die Gemeinde. Reflexions-Assistent mit sokratischen Rückfragen." },
      { name: "Deutsch", meta: "11. Klasse · Werther", text: "Werther schreibt an Lotte, Schüler:innen antworten. Einfache Sprache für den Einstieg, Original für die Analyse." },
    ]}
    cols={3}
  />
);

/* ─── Werkstatt ─── */

const STEPS = [
  { t: "Thema aus dem Bildungsplan wählen", m: 3 },
  { t: "Themenfindungs-Prompt: fünf Zugänge, einen wählen", m: 6 },
  { t: "Sechs-Bausteine-Prompt: das Grundgerüst", m: 8 },
  { t: "Zwei Iterationen: eine inhaltlich, eine Differenzierung", m: 8 },
  { t: "Tabelle generieren, eine Zahl oder Quelle prüfen", m: 6 },
  { t: "Zwei Methoden aus dem Koffer einbauen, eine davon als Artefakt", m: 9 },
];

function WerkstattSlide({ active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="grid h-full grid-cols-[640px_1fr] items-center gap-20 px-20 pt-28 pb-20">
        <Stagger index={0} active={active}>
          <StageGrainCard gradient="purple" className="h-[780px]">
            <StageGlassPanel>
              <div className="flex items-start gap-3">
                <GreenDot />
                <p className="text-[24px] leading-snug font-medium text-white">
                  DeepChat öffnen. Sechs Schritte, 40 Minuten. Wir gehen rum.
                </p>
              </div>
            </StageGlassPanel>
            <div className="mt-6 flex flex-1 items-center justify-center">
              <QrCode value="https://toolbox.deepdive-ki.de/" size={380} />
            </div>
            <p className="mt-4 text-center text-[24px] text-white/90">toolbox.deepdive-ki.de</p>
          </StageGrainCard>
        </Stagger>
        <div>
          <SlideHead eyebrow="Werkstatt · 40 Minuten" title="Ihre eigene Unterrichtseinheit." active={active} />
          <ol className="mt-10 space-y-3">
            {STEPS.map((s, i) => (
              <Stagger key={s.t} index={1 + i} active={active}>
                <li className="flex items-center gap-5 rounded-2xl border border-border-tertiary bg-white px-6 py-4">
                  <span className="w-10 shrink-0 text-[28px] font-semibold text-primary-dark tabular-nums">{i + 1}</span>
                  <span className="flex-1 text-[26px] leading-tight text-text-primary">{s.t}</span>
                  <span className="rounded-full bg-primary-light px-4 py-1 text-[20px] font-medium text-primary-darker">{s.m} Min</span>
                </li>
              </Stagger>
            ))}
          </ol>
        </div>
      </div>
    </SlideFrame>
  );
}

const ErgebnisCheckSlide = (p: SlideProps) => (
  <StatementSlide
    {...p}
    eyebrow="Werkstatt · Ergebnis-Check"
    title="Was jetzt fertig sein sollte."
    lines={[
      "Ein Thema mit Leitfrage, rückführbar auf den Bildungsplan.",
      "Ein Grundgerüst mit allen Sitzungen als Tabelle.",
      "Zwei Sitzungen mit konkreter KI-Methode und Material.",
      "Eine Stelle, an der Schüler:innen KI-Output gegen eine Quelle prüfen.",
    ]}
  />
);

const QualitaetSlide = (p: SlideProps) => (
  <StatementSlide
    {...p}
    eyebrow="Abschluss · Fünf Qualitätskriterien"
    title="Woran Sie eine gute UE mit KI erkennen."
    lines={[
      "Curriculum-Bindung: Jede Sitzung lässt sich auf den Bildungsplan zurückführen.",
      "Übertragbarkeit: Der Workflow funktioniert für die nächste Reihe ohne uns.",
      "KI-Reflexion: Mindestens eine Stelle, an der Schüler:innen KI prüfen.",
      "Differenzierung: Mindestens ein Material in zwei Niveaus.",
      "Materialqualität: Alles gelesen, gekürzt, geprüft.",
    ]}
  />
);

const HelferSlide = (p: SlideProps) => (
  <GridSlide
    {...p}
    eyebrow="Vier Helfer für den Alltag"
    title="Nicht alles ist KI. Aber alles macht Sie schneller."
    items={[
      { name: "KI-Assistenten", meta: "DeepChat · ChatGPT · Gems", text: "Einmal Rolle, Rahmen und Ton festlegen, dann nie wieder den Kontext tippen. Ihr Fach-Assistent." },
      { name: "Perplexity", meta: "Recherche", text: "Antworten mit Links. Für Phase 4, wenn Sie prüfen, was die KI behauptet." },
      { name: "Superwhisper", meta: "Diktat", text: "Prompts sprechen statt tippen. Ein Erstprompt mit sechs Bausteinen in 40 Sekunden." },
      { name: "Shottr", meta: "Screenshot + Texterkennung", text: "Bildungsplan als PDF-Bild? Screenshot, Text erkennen, in den Prompt. Fertig." },
    ]}
  />
);

const VorabSlide = (p: SlideProps) => (
  <StatementSlide
    {...p}
    eyebrow="Für die Werkstatt"
    title="Drei Dinge, die Sie heute brauchen."
    lines={[
      "Ein konkretes Thema aus Ihrem Bildungsplan, das Sie demnächst unterrichten.",
      "Den Bildungsplan-Auszug dazu, als Text oder Screenshot.",
      "Einen Zugang zu DeepChat. Der QR-Code kommt in der Pause.",
    ]}
  />
);


/* ─── Planungsraster: Inhalt · Methode · KI-Tool ─── */

const RasterSlide = (p: SlideProps) => (
  <CardsSlide
    {...p}
    stepwise
    eyebrow="Integration von KI · Das Planungsraster"
    title="Drei Fragen pro Sitzung. In dieser Reihenfolge."
    cards={[
      { icon: BookOpen, label: "1 · Inhalt", title: "Was sollen sie lernen?", text: "Das Lernziel aus dem Bildungsplan. Ohne KI formuliert. Wenn hier nichts steht, hilft auch kein Tool." },
      { icon: Users, label: "2 · Methode", title: "Wie lernen sie es?", text: "Vortrag, Dialog, Test, Brief, Bild, Diskussion. Die Methode entscheidet, ob KI überhaupt gebraucht wird." },
      { icon: Sparkles, label: "3 · KI-Tool", title: "Was macht die KI dabei?", text: "Material erzeugen, Rolle spielen, Feedback geben, differenzieren. Erst jetzt kommt das Werkzeug ins Spiel." },
    ]}
  />
);

/* ─── Phase 0: Kolleg:innen ins Boot (E-Mail-Kollaboration) ─── */

const KollabSlide = (p: SlideProps) => (
  <SplitSlide
    {...p}
    cardWidth={900}
    gradient="aurora"
    eyebrow="Blick über die Schulter · Bevor es losgeht"
    title="Erst die Fachschaft, dann der Prompt."
    points={[
      "Eine neue Reihe mit KI-Elementen ist eine Fachschaftsangelegenheit. Drei Sätze, 20 Sekunden.",
      "Die Mail ist die erste Zeitersparnis des Tages: 20 Minuten Formulieren werden zu 3.",
      "Nebeneffekt: Wer ankündigt, zieht es durch. Und Kolleg:innen melden sich mit Material.",
    ]}
    card={
      <ChatCard
        prompt="Schreibe mir eine kurze E-Mail an meine Geschichtskolleg:innen. Ich erstelle eine neue Unterrichtseinheit zur Französischen Revolution für den LK 12, die mit KI-Elementen und -Methoden ausgestattet sein wird. Ich lade zum Mitmachen ein und bitte um vorhandenes Material. Ton: kollegial, kurz."
        answer={
          <>
            <p><strong>Betreff:</strong> Neue UE Französische Revolution (LK 12) mit KI-Methoden</p>
            <p>Liebe Kolleg:innen,</p>
            <p>ich baue gerade eine neue Reihe zur Französischen Revolution für den LK 12 und probiere dabei einige KI-gestützte Methoden aus (Rollendialoge, differenzierte Materialien, KI-generierte Tests zum Prüfen).</p>
            <p>Falls ihr Material, Quellen oder Klausuraufgaben habt, die ihr teilen mögt: sehr gern. Und wer Lust hat, einzelne Sitzungen mitzuentwickeln oder zu hospitieren, sagt kurz Bescheid.</p>
            <p>Viele Grüße<br />Björn</p>
          </>
        }
      />
    }
  />
);

/* ─── Phase 2 Alternative: Deep Research ─── */

function DeepResearchSlide({ active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col px-20 pt-36 pb-20">
        <SlideHead eyebrow="Blick über die Schulter · Zwei Wege zum Grundgerüst" title="Schneller Chat oder Deep Research?" active={active} />
        <div className="mt-14 grid flex-1 grid-cols-2 gap-10">
          <Stagger index={1} active={active} className="h-full">
            <StageGrainCard gradient="purple" className="h-full">
              <div className="flex items-center justify-between">
                <div className="flex size-20 items-center justify-center rounded-2xl border border-white/30 bg-white/15 backdrop-blur-md">
                  <Timer className="size-10 text-white" />
                </div>
                <span className="rounded-full border border-white/30 bg-white/15 px-5 py-2 text-[22px] font-medium text-white backdrop-blur-md">40 Sekunden</span>
              </div>
              <h3 className="mt-auto text-[44px] leading-tight font-semibold text-white">Der Chat</h3>
              <StageGlassPanel className="mt-6">
                <p className="text-[24px] leading-snug text-white/95">Sechs-Bausteine-Prompt, sofortige Antwort. Gut für das Grundgerüst, das Sie ohnehin umbauen. Quellen: keine oder erfundene.</p>
              </StageGlassPanel>
            </StageGrainCard>
          </Stagger>
          <Stagger index={2} active={active} className="h-full">
            <StageGrainCard gradient="ocean" className="h-full">
              <div className="flex items-center justify-between">
                <div className="flex size-20 items-center justify-center rounded-2xl border border-white/30 bg-white/15 backdrop-blur-md">
                  <Search className="size-10 text-white" />
                </div>
                <span className="rounded-full border border-white/30 bg-white/15 px-5 py-2 text-[22px] font-medium text-white backdrop-blur-md">10–20 Minuten</span>
              </div>
              <h3 className="mt-auto text-[44px] leading-tight font-semibold text-white">Deep Research</h3>
              <StageGlassPanel className="mt-6">
                <p className="text-[24px] leading-snug text-white/95">Derselbe Prompt, aber die KI recherchiert erst, stellt Rückfragen, liest Dutzende Seiten und liefert mit Fußnoten. Beim Arbeiten zusehen: Sie sehen, welche Quellen sie wählt und welche nicht.</p>
              </StageGlassPanel>
            </StageGrainCard>
          </Stagger>
        </div>
        <Stagger index={3} active={active}>
          <p className="mt-6 text-[24px] text-text-secondary">
            Unsere Praxis: Chat für die Struktur, Deep Research für eine Sitzung, bei der es auf Fakten ankommt. Und auch dort: jede Fußnote öffnen.
          </p>
        </Stagger>
      </div>
    </SlideFrame>
  );
}

/* ─── Brief-Methode (Sitzung 1b) ─── */

const BriefSlide = (p: SlideProps) => (
  <SplitSlide
    {...p}
    cardWidth={900}
    gradient="purple"
    eyebrow="Methode · Der Brief"
    title="Zwei Schülerinnen, ein Brief aus 1789."
    points={[
      "Perspektivwechsel: Die KI schreibt einen Brief zwischen zwei Figuren, die Schülerinnen antworten darauf in der Rolle.",
      "Platzhalter im Prompt: „Schülerin A und B“. Echte Namen erst im fertigen Dokument. Das ist die Datenschutzregel, die immer gilt.",
      "Drei Varianten in einer Minute: Bäuerin an Schwester, Adlige an Hofdame, Zeitungsjunge an Mutter. Jede Schülerin eine andere Stimme.",
    ]}
    card={
      <ChatCard
        prompt="Schreibe einen Brief aus dem Juli 1789 zwischen zwei jungen Frauen in Paris, Schülerin A (Tochter eines Bäckers) an Schülerin B (Tochter eines Advokaten). Thema: die Nachricht vom Sturm auf die Bastille. 200 Wörter, zeitgemäße Sprache, keine Fakten erfinden, die erst später bekannt wurden."
        answer={
          <>
            <p>Paris, den 16. Juli 1789</p>
            <p>Liebe [Schülerin B],</p>
            <p>Du wirst es nicht glauben, aber die Bastille ist gefallen. Mein Vater kam gestern Abend ohne Brot nach Hause, dafür mit einem Stein in der Tasche, den er von der Mauer gebrochen hat. Er sagt, das Volk hat sich die Waffen geholt, die der König ihm verweigert.</p>
            <p>Dein Vater wird sagen, das sei Aufruhr. Meiner sagt, es sei der Anfang. Schreib mir, was man in Deinem Viertel redet …</p>
          </>
        }
      />
    }
  />
);

/* ─── MC-Test aus einer echten Quelle (Sitzung 3+4) ─── */

const QuellenTestSlide = (p: SlideProps) => (
  <SplitSlide
    {...p}
    cardWidth={900}
    gradient="ocean"
    eyebrow="Methode · MC-Test aus einer echten Quelle"
    title="Erst die Quelle, dann der Test."
    points={[
      "Die Erklärung der Menschen- und Bürgerrechte von 1789 als Originaltext in den Prompt. Der Test entsteht aus der Quelle, nicht aus dem Gedächtnis der KI.",
      "Zehn Fragen, jede mit Artikelnummer als Beleg. So prüfen Sie in zwei Minuten, ob die Frage stimmt.",
      "Ablauf in der Klasse: allein, dann zu zweit, dann Gruppe, dann Diskussion, dann Auflösung. Der Test ist der Anlass, nicht das Ziel.",
    ]}
    card={
      <ChatCard
        prompt="Hier ist der Originaltext der Erklärung der Menschen- und Bürgerrechte vom 26. August 1789 [eingefügt]. Erstelle zehn Multiple-Choice-Fragen für den LK 12. Pro Frage vier Antworten, genau eine richtig, Distraktoren plausibel und gleich lang. Nenne zu jeder Frage den Artikel, auf den sie sich bezieht."
        answer={
          <>
            <p><strong>Frage 3 (Art. 6):</strong> Was ist laut Erklärung die Quelle des Gesetzes?</p>
            <p>a) Der Wille des Königs<br />b) Der allgemeine Wille der Bürger<br />c) Die Beschlüsse der Nationalversammlung<br />d) Das Naturrecht der Aufklärung</p>
            <p className="text-white/70">Richtig: b. Art. 6: „Das Gesetz ist der Ausdruck des allgemeinen Willens.“</p>
            <p className="text-white/60">… neun weitere Fragen.</p>
          </>
        }
      />
    }
  />
);

/* ─── Claude-Artefakte: Interaktives Material ohne Code ─── */

const ArtefakteIntroSlide = (p: SlideProps) => (
  <StatementSlide
    {...p}
    eyebrow="Neu · Interaktives Material ohne Code"
    title="Ein Prompt. Eine kleine App."
    lines={[
      "Claude baut aus einer Beschreibung eine lauffähige Mini-Anwendung: Quiz, Zeitleiste, Simulation.",
      "Kein Programmieren. Sie beschreiben, was die Schüler:innen tun sollen, Claude baut die Oberfläche.",
      "Ein Link, und die Klasse arbeitet damit. Auf Handy, Tablet, Laptop.",
    ]}
  />
);

const ArtefakteIdeenSlide = (p: SlideProps) => (
  <CardsSlide
    {...p}
    eyebrow="Claude-Artefakte · Vier Ideen für die Modell-UE"
    title="Was wir damit gebaut haben."
    cards={[
      { icon: GitBranch, label: "Sitzung 7", title: "Was wäre wenn?", text: "Entscheidungsgeschichte: Ludwig XVI. flieht 1791 erfolgreich. Schüler:innen treffen an fünf Stellen Entscheidungen und sehen die Folgen. Ersetzt Twine komplett." },
      { icon: Timer, label: "Einstieg", title: "Interaktive Zeitleiste", text: "1789 bis 1815, zum Scrollen und Antippen. Jedes Ereignis mit Quelle, Bild und Leitfrage. Baut sich aus der UE-Tabelle von Phase 5." },
      { icon: Users, label: "Sitzung 3", title: "Stände-Abstimmung", text: "Simulation: Die Klasse stimmt nach Ständen ab, dann nach Köpfen. Das Ergebnis erklärt den 17. Juni 1789 besser als jeder Text." },
      { icon: ListChecks, label: "Jede Sitzung", title: "Selbsttest mit Feedback", text: "Quiz-App aus dem MC-Test: sofortige Rückmeldung, Erklärung pro Antwort, Fortschrittsbalken. Schüler:innen üben zu Hause." },
    ]}
  />
);

function ArtefaktDemoSlide({ active }: SlideProps) {
  const choices = [
    { t: "Er flieht nach Varennes und wird erkannt.", hist: true },
    { t: "Er bleibt in Paris und unterschreibt die Verfassung.", hist: false },
    { t: "Er flieht erfolgreich zu den österreichischen Truppen.", hist: false },
  ];
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="grid h-full grid-cols-[900px_1fr] items-center gap-20 px-20 pt-28 pb-20">
        <Stagger index={0} active={active}>
          <StageGrainCard gradient="purple" className="h-[800px] p-6">
            <div className="ml-auto max-w-[640px] rounded-2xl rounded-tr-md border border-white/25 bg-white/15 px-5 py-3 text-[18px] leading-snug text-white backdrop-blur-md">
              Baue eine interaktive Entscheidungsgeschichte für den Geschichts-LK: „Was wäre, wenn Ludwig XVI. 1791 nicht in Varennes erkannt worden wäre?“ Fünf Entscheidungspunkte, je drei Optionen, eine davon der historische Verlauf. Nach jeder Wahl ein Absatz Folgen und ein Hinweis, was tatsächlich geschah. Am Ende: Reflexionsfrage.
            </div>
            <StageGlassPanel className="mt-4 flex-1 bg-white/90 p-0 text-text-primary">
              <div className="flex items-center justify-between rounded-t-3xl border-b border-border-tertiary px-6 py-3 text-[16px] text-text-tertiary">
                <span className="font-semibold text-text-primary">Juni 1791 · Entscheidung 1 von 5</span>
                <span>Claude-Artefakt</span>
              </div>
              <div className="px-6 py-5">
                <p className="text-[20px] leading-snug text-text-primary">
                  Die Nacht vom 20. auf den 21. Juni. Die königliche Familie sitzt verkleidet in einer Kutsche Richtung Montmédy. In Sainte-Menehould erkennt der Postmeister Drouet das Gesicht des Königs von einer Banknote.
                </p>
                <p className="mt-4 text-[18px] font-semibold text-primary-dark">Was geschieht?</p>
                <div className="mt-3 space-y-2">
                  {choices.map((c) => (
                    <div
                      key={c.t}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border px-4 py-3 text-[18px]",
                        c.hist ? "border-primary-dark bg-primary-light" : "border-border-tertiary bg-white",
                      )}
                    >
                      <MousePointerClick className="size-5 shrink-0 text-primary-dark" />
                      <span>{c.t}</span>
                      {c.hist && <span className="ml-auto rounded-full bg-primary-dark px-3 py-0.5 text-[14px] text-white">historisch</span>}
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/5">
                  <div className="h-full w-1/5 rounded-full bg-primary-dark" />
                </div>
              </div>
            </StageGlassPanel>
          </StageGrainCard>
        </Stagger>
        <div>
          <SlideHead eyebrow="Claude-Artefakte · Live" title="„Was wäre wenn?“ in vier Minuten." active={active} />
          <ul className="mt-12 space-y-7">
            {[
              "Der Prompt beschreibt Didaktik, nicht Technik: Entscheidungspunkte, Optionen, historischer Verlauf, Reflexion.",
              "Claude baut die App, Sie testen sie einmal durch, korrigieren Fakten, teilen den Link.",
              "Kontrafaktisches Denken trainiert Kausalität: Die Schüler:innen merken, welche Entscheidung die Revolution kippt.",
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

const ArtefaktTransferSlide = (p: SlideProps) => (
  <GridSlide
    {...p}
    eyebrow="Claude-Artefakte · Transfer"
    title="Was in Ihrem Fach daraus wird."
    cols={3}
    items={[
      { name: "Mathematik", meta: "Funktionsplotter", text: "Schieberegler für m und b, der Graph bewegt sich live. „Baue eine App, in der Schüler:innen eine lineare Funktion durch Ziehen verändern.“" },
      { name: "Sprachen", meta: "Vokabeltrainer mit Spaced Repetition", text: "Eigene Wortliste rein, Karten mit Audio-Aussprache und Wiederholungslogik raus." },
      { name: "Naturwissenschaften", meta: "Simulation", text: "Räuber-Beute-Modell, Wasserkreislauf, Pendel. Parameter verändern, Verlauf beobachten." },
      { name: "Deutsch", meta: "Textwerkstatt", text: "Ein Gedicht Zeile für Zeile aufdecken, Stilmittel antippen, eigene Strophe ergänzen." },
      { name: "Grundschule", meta: "Rechenspiel", text: "Einmaleins mit Punkten, Levels und Belohnung. Die Kinder merken nicht, dass sie üben." },
      { name: "Alle Fächer", meta: "Klassenwerkzeuge", text: "Zufallsgruppen, Countdown, Lärmampel, Sitzplan-Loser. Die kleinen Dinge, für die man sonst drei Apps braucht." },
    ]}
  />
);

const ArtefaktRegelnSlide = (p: SlideProps) => (
  <StatementSlide
    {...p}
    eyebrow="Claude-Artefakte · Vier Regeln"
    title="Damit es im Unterricht hält."
    lines={[
      "Didaktik in den Prompt: Lernziel, Zielgruppe, was die Schüler:innen tun sollen. Nicht „mach eine App“.",
      "Einmal komplett durchspielen. Fakten prüfen wie jeden anderen KI-Output.",
      "Keine Schülerdaten eingeben lassen. Das Artefakt speichert nichts, aber die Regel bleibt.",
      "Link teilen, nicht Account. Schüler:innen brauchen kein Claude-Konto, um ein Artefakt zu nutzen.",
    ]}
  />
);

const MitmachArtefaktSlide = (p: SlideProps) => (
  <TaskSlide
    {...p}
    icon={Sparkles}
    gradient="ocean"
    minutes={6}
    tool="claude.ai"
    eyebrow="Mitmachen · Ihr erstes Artefakt"
    title="Ein interaktives Material für Ihre UE."
    prompt="Baue eine interaktive Übung für [Fach, Klassenstufe] zum Thema [Thema aus Ihrer UE]. Lernziel: [aus Phase 1]. Die Schüler:innen sollen [Tätigkeit: entscheiden / sortieren / ausprobieren / beantworten]. Gib nach jeder Aktion eine kurze Rückmeldung. Deutsch, große Schrift, funktioniert auf dem Handy."
    steps={[
      "Beschreiben, was die Schüler:innen tun. Claude wählt die Technik.",
      "Einmal durchspielen, eine Sache ändern lassen („Mach die dritte Frage schwerer“).",
      "Link kopieren. Das ist Ihr Material für Sitzung X.",
    ]}
  />
);

/* ─── Was uns erstaunt hat (nur Neues gegenüber Crash Kurs) ─── */

const ErstaunenSlide = (p: SlideProps) => (
  <CardsSlide
    {...p}
    eyebrow="Was uns erstaunt hat"
    title="Vier Dinge, die vor einem Jahr nicht gingen."
    cards={[
      { icon: PenLine, label: "Canvas", title: "Differenzieren im Dokument", text: "Text markieren, „einfacher“ oder „anspruchsvoller“ wählen. Drei Niveaus eines Arbeitsblatts in zwei Minuten." },
      { icon: Eye, label: "Seeing AI", title: "Die Kamera beschreibt", text: "Für sehbehinderte Schüler:innen: Text vorlesen, Personen erkennen, Szenen beschreiben. Kostenlos, im Handy." },
      { icon: FileText, label: "NotebookLM", title: "Silowissen nutzbar", text: "Zwanzig Jahre Fachschafts-PDFs hochladen, Fragen stellen, Antworten nur aus diesen Quellen." },
      { icon: Globe, label: "Headshot Pro", title: "Ein Beruf verschwindet", text: "Bewerbungsfotos aus zwölf Selfies, kein Studio. Für die Klasse: Welche Berufe ändern sich gerade, und wie schnell?" },
    ]}
  />
);

const WerkstattToolsSlide = (p: SlideProps) => (
  <GridSlide
    {...p}
    eyebrow="Werkzeuge für die Werkstatt"
    title="Vier Wege zum Material. Nehmen Sie einen."
    items={[
      { name: "DeepChat", meta: "DeepDiveKI · DSGVO-konform", text: "Für die ganze UE: Prompten, iterieren, Tabelle, Arbeitsblatt als Word. Unser Standardweg heute.", accent: true },
      { name: "Claude", meta: "Artefakte", text: "Für ein interaktives Material: Quiz, Zeitleiste, Entscheidungsgeschichte, Simulation." },
      { name: "Questionwell", meta: "Fragen-Generator", text: "Aus Text oder Thema werden Fragen in Dutzenden Formaten, direkt nach Kahoot, Quizizz oder Forms exportierbar." },
      { name: "MagicSchool", meta: "70+ Lehrer-Tools", text: "Rubrics, Elternbriefe, IEP-Ziele, Lückentexte. Formulare statt Prompts. Ohne Schülerdaten gut nutzbar." },
    ]}
  />
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
          <p className="mt-10 text-[44px] font-light text-white/90">Folien, Prompts und Ergebnis-Check bleiben online.</p>
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

/* ─── Live ─── */

const L = UE_LIVE;
const LiveZeitfresser = (p: SlideProps) => (
  <LiveWordsSlide {...p} deck={DECK} activity={L.wordsStart} eyebrow="Ankommen" title="Was kostet die meiste Zeit?" />
);
const LiveEbene = (p: SlideProps) => <LivePollSlide {...p} deck={DECK} activity={L.ebene} eyebrow="Kurze Umfrage · Drei Ebenen" />;
const LiveStunden = (p: SlideProps) => <LiveEstimateSlide {...p} deck={DECK} activity={L.stunden} eyebrow="Schätzfrage" />;
const LiveUrteil = (p: SlideProps) => <LiveJudgeSlide {...p} deck={DECK} activity={L.judge} eyebrow="Urteilsübung · Didaktik" />;
const LiveFeedback = (p: SlideProps) => <LivePollSlide {...p} deck={DECK} activity={L.feedback} eyebrow="Feedback" />;
const LiveChallenge = (p: SlideProps) => (
  <LiveWordsSlide {...p} deck={DECK} activity={L.challenge} eyebrow="30-Tage-Challenge" title="Welche UE planen Sie als Nächstes?" />
);

/* ─── Phasen-Trenner ─── */
const Phase1 = (p: SlideProps) => <PhaseSlide {...p} n="1" title="Themenfindung." question="Was unterrichten wir eigentlich?" />;
const Phase2 = (p: SlideProps) => <PhaseSlide {...p} n="2" title="Erstprompt." question="Wie bekomme ich das Grundgerüst?" />;
const Phase3 = (p: SlideProps) => <PhaseSlide {...p} n="3" title="Iteration." question="Wie wird es meins?" />;
const Phase4 = (p: SlideProps) => <PhaseSlide {...p} n="4" title="Verifikation." question="Was davon stimmt?" />;
const Phase5 = (p: SlideProps) => <PhaseSlide {...p} n="5" title="Material." question="Was brauche ich am Montag?" />;
const WorkflowIntro = (p: SlideProps) => <WorkflowSlide {...p} />;
const WorkflowRecap = (p: SlideProps) => <WorkflowSlide {...p} step={4} highlight={undefined} />;

/* ─── Deck ─── */

const meta = getDeckMeta(DECK)!;

export const ueDeck: Deck = {
  ...meta,
  slides: [
    // Ankommen (15)
    { id: "titel", title: "Titel", theme: "dark", Component: TitleSlide, notes: "Ankommen lassen. WLAN nennen." },
    { id: "hi", title: "Hi!", theme: "light", Component: HiSlide, notes: "Kurz vorstellen. Betonen: Wir unterrichten selbst, die Modell-UE läuft bei Björn im LK." },
    { id: "zeitfresser", title: "Live · Zeitfresser", theme: "light", Component: LiveZeitfresser, notes: "QR scannen, Seite offen lassen. Begriffe vorlesen: Material suchen, Differenzierung, Korrektur … Genau da setzen wir an." },
    { id: "fahrplan", title: "Fahrplan", theme: "light", Component: AgendaSlide, notes: "Vier Blöcke plus Pause. Werkstatt ist der Kern, 40 Minuten, nicht kürzen." },
    { id: "vorab", title: "Was Sie heute brauchen", theme: "light", steps: 3, Component: VorabSlide, notes: "Wer kein Thema hat, wählt jetzt eines. Bildungsplan-Links für die häufigsten Länder im Padlet/Handout." },

    // A Haltung (20)
    { id: "warum", title: "Warum wir hier sind", theme: "light", Component: WhySlide, notes: "Die 10–20 Stunden sind Erfahrungswerte aus Fortbildungen, keine Studie. Pointe: Nicht schlechter, sondern alter Unterricht." },
    { id: "stunden", title: "Live · Schätzfrage Stunden", theme: "light", steps: 1, Component: LiveStunden, notes: "Schieberegler. Weiter = unser Ziel (3 Std.). Ehrlich sagen: Erfahrungswert, keine Studie." },
    { id: "haltung", title: "Didaktik vor Technik", theme: "light", steps: 4, Component: HaltungSlide, notes: "Die wichtigste Folie des Tages. Vier Schritte. Wiederholen wir in jeder Phase." },
    { id: "ebenen", title: "Drei Ebenen", theme: "light", steps: 2, Component: EbenenSlide, notes: "Drei Karten, zwei Schritte. Heute Schwerpunkt Ebene 1, Ebene 2 in zwei Methoden, Ebene 3 als Reflexionsstelle." },
    { id: "ebene-umfrage", title: "Live · Wo setzen Sie KI ein?", theme: "light", Component: LiveEbene, notes: "Ergebnis einordnen: Die meisten auf Ebene 1 oder noch gar nicht. Das ist normal." },
    { id: "raster", title: "Das Planungsraster", theme: "light", steps: 2, Component: RasterSlide, notes: "Drei Karten, zwei Schritte: Inhalt → Methode → KI-Tool. Die Reihenfolge ist die Botschaft. Wer beim Tool anfängt, baut Spielzeug." },
    { id: "helfer", title: "Vier Helfer", theme: "light", Component: HelferSlide, notes: "Je ein Satz. Superwhisper und Shottr live zeigen, dauert 60 Sekunden." },

    // B Workflow am Modell (45)
    { id: "workflow", title: "Der Workflow", theme: "light", steps: 4, Component: WorkflowIntro, notes: "Fünf Phasen schrittweise aufbauen. Das ist das Rückgrat. Alles Weitere ordnet sich hier ein." },
    { id: "kollab", title: "Schulter · Fachschafts-Mail", theme: "light", Component: KollabSlide, notes: "Blick über die Schulter beginnt hier. LIVE: Mail in DeepChat erzeugen, 20 Sekunden. Erste Zeitersparnis des Tages." },
    { id: "p1", title: "Phase 1", theme: "dark", Component: Phase1, notes: "Trennfolie, 5 Sekunden." },
    { id: "themenfindung", title: "Der Bildungsplan ist Material", theme: "light", Component: ThemenfindungSlide, notes: "LIVE-DEMO: Prompt in DeepChat eingeben, Bildungsplan-Auszug einfügen. Fünf Zugänge zeigen." },
    { id: "mitmach-thema", title: "Mitmachen · Fünf Zugänge", theme: "light", Component: MitmachThemaSlide, notes: "5 Minuten. Timer im Presenter. Wer keinen Bildungsplan hat: Schulbuch-Inhaltsverzeichnis fotografieren." },
    { id: "p2", title: "Phase 2", theme: "dark", Component: Phase2, notes: "" },
    { id: "bausteine", title: "Sechs Bausteine", theme: "light", steps: 6, Component: BausteineSlide, notes: "Sechs Schritte, pro Baustein einer. Die Crash-Kurs-Formel (Rolle, Kontext, Aufgabe, Format) fächert hier auf: Kontext wird zu Rahmen, Schwerpunkt, Leitfragen." },
    { id: "erstprompt-output", title: "Der erste Output", theme: "light", Component: ErstpromptOutputSlide, notes: "LIVE-DEMO: Prompt abschicken, Output scrollen. Sitzung 5 zeigen." },
    { id: "deep-research", title: "Schulter · Deep Research", theme: "light", Component: DeepResearchSlide, notes: "LIVE: Deep Research mit demselben Prompt starten und im Hintergrund laufen lassen. In Phase 4 kommen wir zum Ergebnis zurück und prüfen die Fußnoten. Beim Arbeiten zusehen: Welche Quellen nimmt sie?" },
    { id: "mitmach-erstprompt", title: "Mitmachen · Erstprompt", theme: "light", Component: MitmachErstpromptSlide, notes: "7 Minuten. Rumgehen. Häufigster Fehler: Baustein 6 (Output-Format) vergessen." },
    { id: "p3", title: "Phase 3", theme: "dark", Component: Phase3, notes: "" },
    { id: "iteration", title: "Drei Runden", theme: "light", steps: 2, Component: IterationSlide, notes: "Drei Karten, zwei Schritte. LIVE: Runde 1 wirklich abschicken und zeigen, wie die UE sich verändert." },
    { id: "iterationsregeln", title: "Drei Prinzipien", theme: "light", steps: 3, Component: IterationsregelnSlide, notes: "Drei Schritte." },
    { id: "p4", title: "Phase 4", theme: "dark", Component: Phase4, notes: "" },
    { id: "verifikation", title: "Was davon stimmt?", theme: "light", Component: VerifikationSlide, notes: "Die Literaturangaben im Mockup sind Beispiele, vor dem Vortrag einmal selbst reproduzieren. Kernsatz: Prüfen außerhalb der KI." },
    { id: "p5", title: "Phase 5", theme: "dark", Component: Phase5, notes: "" },
    { id: "tabelle", title: "Die Tabelle", theme: "light", Component: TabelleSlide, notes: "LIVE: Tabellen-Prompt abschicken, CSV in Excel öffnen. Drei Tricks: Format vorgeben, CSV, Filter-Spalte." },
    { id: "workflow-recap", title: "Workflow · Rückblick", theme: "light", Component: WorkflowRecap, notes: "Alle fünf Phasen noch einmal. Dann Pause." },
    { id: "pause", title: "Pause", theme: "dark", Component: PauseSlide, notes: "10 Minuten. QR zur Toolbox, wer noch keinen Zugang hat." },

    // C Methodenkoffer (35)
    { id: "sitzungsplan", title: "Die Modell-UE", theme: "light", Component: SitzungsplanSlide, notes: "Neun Sitzungen, je eine Methode. Wir nehmen sechs davon genauer." },
    { id: "rollendialog", title: "Methode · Rollendialog", theme: "light", Component: RollenDialogSlide, notes: "Kernsatz: KI ist Konstruktion, nicht Person. Die Methode steht und fällt mit dem Quellen-Vergleich." },
    { id: "arbeitsblatt", title: "Methode · Arbeitsblatt", theme: "light", Component: ArbeitsblattSlide, notes: "Block 3 ist Ebene 3: KI als Thema. Quellenkritik und KI-Kritik in einem Schritt." },
    { id: "brief", title: "Methode · Der Brief", theme: "light", Component: BriefSlide, notes: "Platzhalter „Schülerin A/B“ zeigen. Im Original stand hier „Zeynep und Julia“, genau das machen wir nicht mehr. Drei Varianten live erzeugen, wenn Zeit." },
    { id: "feedback-methode", title: "Methode · Feedback", theme: "light", Component: FeedbackMethodeSlide, notes: "Platzhalter „Schüler A“ im Prompt zeigen. Datenschutz-Rückbezug Crash Kurs." },
    { id: "quellen-test", title: "Methode · MC-Test aus Quelle", theme: "light", Component: QuellenTestSlide, notes: "Originaltext: conseil-constitutionnel.fr (deutsche Fassung der Erklärung von 1789). Quelle in den Prompt, Artikelnummer als Beleg je Frage. So wird Verifikation zur Routine." },
    { id: "distraktoren", title: "Methode · MC-Test", theme: "light", steps: 5, Component: DistraktorenSlide, notes: "Fünf Schritte. Tims Regeln. Dann Ablauf: allein, Partner, Gruppe, Diskussion, Auflösung." },
    { id: "einfache-sprache", title: "Methode · Einfache Sprache", theme: "light", Component: EinfacheSpracheSlide, notes: "Vorher/Nachher vorlesen. Niveau-Treppe zeigen." },
    { id: "bildgenerierung", title: "Methode · Bildgenerierung", theme: "light", Component: BildgenerierungSlide, notes: "Wenn Zeit: ein Bild live generieren (Karikatur 1789, Dritter Stand trägt Adel und Klerus)." },
    { id: "reflexion", title: "Methode · Reflexions-Assistent", theme: "light", Component: ReflexionsAssistentSlide, notes: "Vorschau auf Modul IV (eigene Assistenten)." },
    { id: "artefakte-intro", title: "Artefakte · Ein Prompt, eine App", theme: "light", steps: 3, Component: ArtefakteIntroSlide, notes: "Neuer Block. Drei Schritte. Claude-Artefakte: aus einer Beschreibung wird eine lauffähige Mini-App, teilbar per Link." },
    { id: "artefakte-ideen", title: "Artefakte · Vier Ideen", theme: "light", Component: ArtefakteIdeenSlide, notes: "Vier Beispiele aus der Modell-UE. „Was wäre wenn“ ersetzt das frühere Twine (Sitzung 7 im alten Deck)." },
    { id: "artefakt-demo", title: "Artefakte · Live-Demo", theme: "light", Component: ArtefaktDemoSlide, notes: "LIVE: Den Prompt in Claude eingeben, Artefakt bauen lassen (ca. 2–4 Minuten). Währenddessen die drei Punkte rechts besprechen. Fertiges Artefakt als Backup-Link bereithalten (Datei: artefakt-varennes)." },
    { id: "artefakt-transfer", title: "Artefakte · Transfer", theme: "light", Component: ArtefaktTransferSlide, notes: "Sechs Fächer. Funktionsplotter und Vokabeltrainer sind die beiden, die am meisten „Aha“ auslösen." },
    { id: "artefakt-regeln", title: "Artefakte · Vier Regeln", theme: "light", steps: 4, Component: ArtefaktRegelnSlide, notes: "Vier Schritte. Regel 4 wichtig: Artefakt-Links funktionieren ohne Claude-Konto." },
    { id: "mitmach-artefakt", title: "Mitmachen · Erstes Artefakt", theme: "light", Component: MitmachArtefaktSlide, notes: "6 Minuten. Wer keinen Claude-Zugang hat, arbeitet zu zweit. Erwartung: Ein funktionierendes Material, nicht ein perfektes." },
    { id: "transfer", title: "Transfer in Ihr Fach", theme: "light", Component: TransferSlide, notes: "Sechs Fächer. Botschaft: Bausteine gleich, Inhalte anders. Wer sein Fach nicht sieht: Welche Methode passt trotzdem?" },
    { id: "urteil", title: "Live · Urteilsübung", theme: "light", steps: 3, Component: LiveUrteil, notes: "Drei didaktische Szenarien auf dem Handy. Je Weiter eine Auflösung. Szenario 1 wird diskutiert, das ist gewollt." },

    // D Werkstatt (40)
    { id: "werkstatt-tools", title: "Werkzeuge für die Werkstatt", theme: "light", Component: WerkstattToolsSlide, notes: "Vier Wege, einen nehmen. DeepChat ist der Standardweg, Claude für ein interaktives Material, Questionwell/MagicSchool für Schnelle." },
    { id: "werkstatt", title: "Werkstatt", theme: "light", Component: WerkstattSlide, notes: "Sechs Schritte, 40 Minuten, Timer im Presenter. Wir gehen rum. Diese Folie bleibt stehen." },
    { id: "ergebnis-check", title: "Ergebnis-Check", theme: "light", steps: 4, Component: ErgebnisCheckSlide, notes: "Nach 40 Minuten. Wer drei von vier hat, ist gut. Zwei Teilnehmende zeigen ihre Tabelle (freiwillig)." },

    // E Abschluss (15)
    { id: "qualitaet", title: "Fünf Qualitätskriterien", theme: "light", steps: 5, Component: QualitaetSlide, notes: "Fünf Schritte. Das ist die Checkliste für die nächste UE ohne uns." },
    { id: "challenge", title: "Live · 30-Tage-Challenge", theme: "light", Component: LiveChallenge, notes: "Fach + Thema. Ankündigen: Mail in vier Wochen." },
    { id: "feedback", title: "Live · Feedback", theme: "light", Component: LiveFeedback, notes: "1 Minute." },
    { id: "danke", title: "Danke", theme: "dark", Component: ThanksSlide, notes: "Folien bleiben online." },

    // Anhang
    { id: "erstaunen", title: "Anhang · Was uns erstaunt hat", theme: "light", Component: ErstaunenSlide, notes: "ANHANG, bei Zeit oder als Einstieg nach der Pause. Canvas live zeigen lohnt sich (2 Minuten)." },
  ],
};
