"use client";

import AnimationErrorBoundary from "@/components/shared/AnimationErrorBoundary";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  ArrowRight,
  Brain,
  Camera,
  Check,
  Gauge,
  Glasses,
  Hand,
  Heart,
  Lightbulb,
  Lock,
  Pencil,
  Repeat,
  Scale,
  Search,
  ShieldAlert,
  Smartphone,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
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
import { PLAGIATE_LIVE } from "../live/activities";
import { LiveEstimateSlide, LiveJudgeSlide, LivePollSlide, LiveWordsSlide } from "../live/StageLive";
import type { Deck, SlideProps } from "../types";
import { CardsSlide, G, GridSlide, PauseSlide, StatementSlide, TaskSlide } from "./crash-kurs";
import { getDeckMeta } from "./manifest";
import { HiSlide, SlideHead, TEAM } from "./nerd-intro";
import { ChatCard, PhaseSlide, SplitSlide, StatsSlide } from "./unterrichtseinheiten";

const DECK = "plagiate";

const HeadlineShaderBackground = dynamic(
  () => import("@/components/chooser/HeadlineShaderBackground"),
  { ssr: false },
);

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
            <Eyebrow className="text-white/80">DeepDiveKI · Modul II</Eyebrow>
          </Stagger>
          <Stagger index={1} active={active}>
            <Headline size="md" className="mt-6 text-white">
              Plagiate, Hausaufgaben und Klausuren in Zeiten von KI.
            </Headline>
          </Stagger>
          <Stagger index={2} active={active}>
            <p className="mt-10 max-w-[1000px] text-[40px] leading-[1.3] font-light text-white/85">
              Vom Erkennungsproblem zum Aufgabendesign. Drei Stunden.
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

const AgendaSlide = (p: SlideProps) => (
  <CardsSlide
    {...p}
    eyebrow="Fahrplan · 180 Minuten"
    title="Was heute passiert."
    cards={[
      { label: "30 Min", title: "Die neue Realität", text: "Was Schüler:innen tun. Selbsttest: SuS oder KI? Und Sie selbst in der Schülerrolle." },
      { label: "30 Min", title: "Erkennen", text: "Detektoren live, die Zahlen dahinter, die Handschrift-Illusion und was im Verdachtsfall gilt." },
      { label: "45 Min", title: "Umbauen", text: "Nach der Pause: Reverse Engineering, die Fünf Grundsätze, drei Aufgaben vorher und nachher." },
      { label: "50 Min", title: "Prüfen, bewerten, vereinbaren", text: "Alternative Formate, KI als Bewertungshilfe mit allen Gefahren, Ihre KI-Vereinbarung." },
    ]}
  />
);

/* ─── A · Die neue Realität ─── */

const RealitySlide = (p: SlideProps) => (
  <StatsSlide
    {...p}
    eyebrow="Die neue Realität"
    title="Die Schüler:innen sind längst dort."
    stats={[
      { big: "74 %", small: "der Schüler:innen", text: "nutzen KI für die Schule: Hausaufgaben, Referate, Lernen für Tests." },
      { big: "34 / 38", small: "dafür / dagegen", text: "So gespalten ist Deutschland bei der Frage, ob KI an Schulen verboten werden soll. Ein Drittel unentschieden." },
      { big: "0", small: "zuverlässige Detektoren", text: "Kein Tool erkennt KI-Texte verlässlich. Das ist keine Meinung, das ist Studienlage." },
    ]}
    footnote="Quellen: Vodafone Stiftung 2024 · Umfrage zum KI-Verbot (vor Vortrag prüfen) · Weber-Wulff et al. 2023"
  />
);

const FoerdernSlide = (p: SlideProps) => (
  <CardsSlide
    {...p}
    eyebrow="Statt verbieten"
    title="Menschliche Intelligenz fördern."
    cards={[
      { icon: Brain, label: "Verstehen", title: "Echtes Verstehen & Transfer", text: "Wissen auf eine neue Situation anwenden, die in keinem Trainingsdatensatz steht." },
      { icon: Lightbulb, label: "Denken", title: "Kritisch & kreativ", text: "Urteilen, argumentieren, spontan reagieren. Eine eigene Perspektive haben und begründen." },
      { icon: Heart, label: "Fühlen", title: "Empathie & Verantwortung", text: "Soziale Intelligenz, Urteilsfähigkeit, Verantwortung übernehmen. Das kann kein Modell simulieren." },
      { icon: Hand, label: "Durchhalten", title: "Selbstorganisation & Identität", text: "Dranbleiben, sich selbst organisieren, authentisch sein. Die Frage: Wie messen wir das?" },
    ]}
  />
);

const KernthesenSlide = (p: SlideProps) => (
  <StatementSlide
    {...p}
    theme="dark"
    eyebrow="Die Kernthese des Tages"
    title="Kein Erkennungsproblem. Ein Didaktikproblem."
    lines={[
      "KI schreibt oft besser als Schüler:innen.",
      "Aber sie denkt nicht besser.",
      "Also prüfen wir das Denken, nicht das Schreiben.",
    ]}
  />
);

/* ─── SuS oder KI? Rate-Texte ─── */

type Trio = { label: string; task: string; texts: [string, string, string]; ki: 0 | 1 | 2; who: [string, string, string] };

const TRIOS: Trio[] = [
  {
    label: "Aufgabe 1 · Klasse 9",
    task: "Nenne drei Folgen des Klimawandels und erkläre sie kurz.",
    texts: [
      "Der Klimawandel hat weitreichende Folgen. Erstens schmelzen die Gletscher und das Meereis, wodurch der Meeresspiegel ansteigt und Inselstaaten bedroht. Zweitens werden Wetterextreme häufiger: Dürren in einigen Regionen, Überschwemmungen in anderen. Drittens leidet die Artenvielfalt, da viele Tier- und Pflanzenarten sich nicht schnell genug anpassen können.",
      "Mehr Hitze und der Klimawandel sind echt krass. Eine Folge ist, dass die Eiskappen schmelzen, was zum Meeresspiegelanstieg führt. Eine weitere Folge sind extreme Wetter, also Stürme und Trockenheit. Außerdem sterben viele Tiere aus, weil ihre Lebensräume verschwinden. Das alles ist gefährlich für uns und kommende Generationen.",
      "Klimawandel bedeutet viele Probleme. Eisberge schmelzen, das ist schlecht. Es gibt mehr Stürme und das Wetter ist verrückt. Tiere und Pflanzen sterben aus, weil es zu warm wird. Das ist alles sehr ernst und wir müssen etwas tun.",
    ],
    ki: 0,
    who: ["KI", "Schülerin", "schwächere Schülerin"],
  },
  {
    label: "Aufgabe 2 · Klasse 11",
    task: "Analysiere die Wirkung der Sprache im „Erlkönig“. Gehe auf Angst und Bedrohung ein.",
    texts: [
      "Goethe baut die Angst über den Dialog auf. Der Sohn fragt dreimal, der Vater beruhigt dreimal, und jedes Mal klingt die Beruhigung schwächer. Ich finde, die Stelle „Mein Vater, mein Vater“ wirkt wie ein Schrei, weil sie sich wiederholt. Der Erlkönig spricht dagegen fast zärtlich, das macht ihn gruseliger als ein Monster.",
      "Goethes „Erlkönig“ erzeugt Bedrohung durch sprachliche Mittel. Die Anaphern und Repetitionen im Dialog zwischen Vater und Sohn intensivieren die Spannung. Die direkte Rede des Erlkönigs wirkt verführerisch und zugleich bedrohlich, was die innere Zerrissenheit des Kindes verstärkt. Der Rhythmus des Gedichts imitiert den Galopp des Pferdes und treibt die Handlung unaufhaltsam dem Tod entgegen.",
      "Die Sprache ist alt und schwer. Der Erlkönig will das Kind haben und sagt nette Sachen, aber eigentlich ist er böse. Der Vater merkt nichts. Am Ende ist das Kind tot. Das macht Angst, weil",
    ],
    ki: 1,
    who: ["Schülerin (eigener Lesezugang)", "KI", "abgebrochen"],
  },
  {
    label: "Aufgabe 3 · Klasse 7",
    task: "12 km in 30 Minuten. Durchschnittsgeschwindigkeit in km/h? Strecke bei gleicher Geschwindigkeit in 2 Stunden?",
    texts: [
      "30 min = 0,5 h. 12 : 0,5 = 24 km/h. In 2 h: 24 · 2 = 48 km.",
      "12 km in 30 min, also in 60 min das Doppelte: 6 km/h. In 2 Stunden dann 12 km.",
      "Schritt 1: Zeit umrechnen. 30 Minuten = 0,5 Stunden.\nSchritt 2: Geschwindigkeit v = s / t = 12 km / 0,5 h = 24 km/h.\nSchritt 3: Strecke in 2 Stunden: s = v · t = 24 km/h · 2 h = 48 km.\nAntwort: 24 km/h und 48 km.",
    ],
    ki: 2,
    who: ["Schüler (knapp, richtig)", "Schüler (Flüchtigkeitsfehler)", "KI"],
  },
];

function TrioSlide({ trio, step, active }: SlideProps & { trio: Trio }) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col px-20 pt-36 pb-20">
        <SlideHead eyebrow={`SuS oder KI? · ${trio.label}`} title={trio.task} active={active} />
        <div className="mt-10 grid flex-1 grid-cols-3 gap-8">
          {trio.texts.map((t, i) => {
            const isKi = i === trio.ki;
            return (
              <Stagger key={i} index={1 + i} active={active} className="h-full">
                <div
                  className={cn(
                    "flex h-full flex-col rounded-[32px] border p-8 shadow-md transition",
                    step >= 1 && isKi ? "border-primary-dark bg-primary-light" : "border-border-tertiary bg-white",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[32px] font-semibold text-primary-dark">Text {["A", "B", "C"][i]}</span>
                    <Reveal when={1} step={step} keepSpace={false}>
                      <span
                        className={cn(
                          "rounded-full px-4 py-1.5 text-[18px] font-semibold",
                          isKi ? "bg-primary-dark text-white" : "bg-background-secondary text-text-secondary",
                        )}
                      >
                        {trio.who[i]}
                      </span>
                    </Reveal>
                  </div>
                  <p className="mt-5 text-[21px] leading-snug whitespace-pre-line text-text-primary">{t}</p>
                </div>
              </Stagger>
            );
          })}
        </div>
      </div>
    </SlideFrame>
  );
}

const Trio1 = (p: SlideProps) => <TrioSlide {...p} trio={TRIOS[0]} />;
const Trio2 = (p: SlideProps) => <TrioSlide {...p} trio={TRIOS[1]} />;
const Trio3 = (p: SlideProps) => <TrioSlide {...p} trio={TRIOS[2]} />;

const IndizienSlide = (p: SlideProps) => (
  <StatementSlide
    {...p}
    eyebrow="SuS oder KI? · Was uns verraten hat"
    title="Die KI ist zu glatt."
    lines={[
      "Zu strukturiert: „Erstens, zweitens, drittens“, Schritt 1, 2, 3.",
      "Zu vollständig: jeder Fachbegriff sitzt, kein Lesefehler, kein Abbruch.",
      "Zu reibungslos: keine persönliche Sprache, kein „echt krass“, kein eigener Zugang.",
      "Und trotzdem: Mit einem Satz „Schreib wie ein 15-Jähriger“ sind alle drei Indizien weg.",
    ]}
  />
);

const ToolsSuSSlide = (p: SlideProps) => (
  <GridSlide
    {...p}
    eyebrow="Welche Tools Schüler:innen wirklich nutzen"
    title="Nicht nur ChatGPT."
    items={[
      { name: "ChatGPT", meta: "Der Standard", text: "Kostenlos, auf jedem Handy, mit Foto-Eingabe. Arbeitsblatt fotografieren, Lösung lesen." },
      { name: "Gemini", meta: "Im Google-Konto", text: "Steckt in Android und in der Google-Suche. Viele merken nicht, dass sie es benutzen." },
      { name: "KI-Bots auf Discord", meta: "Unsichtbar für Erwachsene", text: "Im Gaming-Chat, wo ohnehin alle sind. Hausaufgaben als Nebenbei-Nachricht." },
      { name: "Snapchat My AI", meta: "Ab Klasse 5", text: "Der Chat-Freund, der auch Mathe kann. Für viele Jüngere der erste KI-Kontakt." },
      { name: "PhotoMath & Co.", meta: "Fachspezifisch", text: "Aufgabe scannen, Rechenweg bekommen. Seit Jahren da, jetzt mit Sprachmodell dahinter." },
      { name: "telli / Landestools", meta: "Wenn die Schule es anbietet", text: "DSGVO-konform, aber nur so attraktiv wie der Unterricht, der sie einsetzt." },
    ]}
    cols={3}
  />
);

const SchuelerrolleSlide = (p: SlideProps) => (
  <CardsSlide
    {...p}
    eyebrow="Mitmachen · 10 Minuten · Sie sind jetzt Schüler:in"
    title="Vier Hausaufgaben. Zwei Tools. Drei lösen."
    cards={[
      { label: "Kunst", title: "Bildbeschreibung", text: "Erstelle eine Bildbeschreibung für die Mona Lisa von Leonardo da Vinci." },
      { label: "Mathematik", title: "Kurvendiskussion", text: "Führe eine Kurvendiskussion für f(x) = 2x³ − 3x² − 12x + 5 durch." },
      { label: "Biologie", title: "Zellteilung", text: "Erkläre die zwei Arten der Zellteilung und hebe die Unterschiede hervor." },
      { label: "Fremdsprache", title: "Dialog", text: "Schreibe einen Dialog, in dem du dich mit einer Freundin zum Kino verabredest." },
    ]}
  />
);

const ReflexionSlide = (p: SlideProps) => (
  <StatementSlide
    {...p}
    eyebrow="Reflexion · Was ist Ihnen aufgefallen?"
    title="Vier Fragen."
    lines={[
      "Wie lange hat die beste Lösung gedauert?",
      "Wofür war die KI hilfreich, wofür nicht?",
      "Hätten Sie die Lösung als Lehrkraft erkannt?",
      "Was haben Sie dabei gelernt? Und was hätte ein:e Schüler:in gelernt?",
    ]}
  />
);

/* ─── B · Erkennen ─── */

const DreiStepsSlide = (p: SlideProps) => (
  <CardsSlide
    {...p}
    stepwise
    eyebrow="Das Drei-Step-Modell"
    title="Awareness. Detektoren. Weiterentwicklung."
    cards={[
      { icon: Search, label: "Step 1", title: "Awareness", text: "Wissen, was möglich ist. Entwicklungen verfolgen. Mit Kolleg:innen reden. Schülertexte realistisch einschätzen." },
      { icon: Gauge, label: "Step 2", title: "Detektoren", text: "Verstehen, wie sie arbeiten und warum sie scheitern. Als Entscheidungshilfe höchstens, als Beweis nie." },
      { icon: Repeat, label: "Step 3", title: "Weiterentwicklung", text: "Aufgaben und Prüfungen so bauen, dass KI-Nutzung entweder sinnlos oder ausdrücklich Teil der Aufgabe ist." },
    ]}
  />
);

const DetektorMechanikSlide = (p: SlideProps) => (
  <SplitSlide
    {...p}
    gradient="ocean"
    eyebrow="Step 2 · Wie Detektoren arbeiten"
    title="Sie messen Langeweile."
    points={[
      "Perplexität: Wie vorhersehbar ist das nächste Wort? KI-Text ist vorhersehbar, weil er genau so entstanden ist.",
      "Burstiness: Wie stark schwanken Satzlänge und Rhythmus? Menschen schreiben ungleichmäßig, Modelle gleichmäßig.",
      "Das Problem: Auch geübte Schreiber:innen, Nicht-Muttersprachler und Sachtexte sind „vorhersehbar“. Sie werden mitverurteilt.",
    ]}
    card={
      <>
        <p className="text-[18px] font-semibold tracking-wider text-white/70 uppercase">Nächstes-Wort-Maschine, rückwärts gelesen</p>
        <StageGlassPanel className="mt-4">
          <p className="text-[20px] text-white/70">Satz:</p>
          <p className="mt-1 text-[24px] leading-snug text-white">Der Klimawandel hat weitreichende <span className="rounded bg-white/30 px-1">Folgen</span>.</p>
          <p className="mt-4 text-[20px] text-white/70">Wahrscheinlichkeit für „Folgen“ an dieser Stelle:</p>
          <div className="mt-2 h-4 overflow-hidden rounded-full bg-white/20"><div className="h-full w-[92%] rounded-full bg-white" /></div>
          <p className="mt-1 text-right text-[22px] font-semibold text-white">92 %</p>
        </StageGlassPanel>
        <StageGlassPanel className="mt-4">
          <p className="text-[20px] text-white/70">Satz:</p>
          <p className="mt-1 text-[24px] leading-snug text-white">Mehr Hitze und der Klimawandel sind echt <span className="rounded bg-white/30 px-1">krass</span>.</p>
          <p className="mt-4 text-[20px] text-white/70">Wahrscheinlichkeit für „krass“:</p>
          <div className="mt-2 h-4 overflow-hidden rounded-full bg-white/20"><div className="h-full w-[7%] rounded-full bg-white" /></div>
          <p className="mt-1 text-right text-[22px] font-semibold text-white">7 %</p>
        </StageGlassPanel>
        <StageGlassPanel className="mt-auto">
          <p className="text-[22px] leading-snug text-white/95">Viele hohe Wahrscheinlichkeiten hintereinander = „wahrscheinlich KI“. Das ist die ganze Magie.</p>
        </StageGlassPanel>
      </>
    }
  />
);

function DetektorLiveSlide({ step, active }: SlideProps) {
  const score = step >= 1 ? 32 : 100;
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="grid h-full grid-cols-[760px_1fr] items-center gap-24 px-20 pt-28 pb-20">
        <Stagger index={0} active={active}>
          <StageGrainCard gradient="purple" className="h-[780px]">
            <div className="flex items-center justify-between">
              <p className="text-[20px] font-semibold tracking-wider text-white/70 uppercase">GPTZero · Ergebnis</p>
              <span className="rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-[18px] text-white">
                {step >= 1 ? "nach undetectable.ai" : "Original ChatGPT-Text"}
              </span>
            </div>
            <StageGlassPanel className="mt-6 flex flex-col items-center py-10">
              <p className="text-[150px] leading-none font-semibold text-white tabular-nums">{score} %</p>
              <p className="mt-3 text-[26px] text-white/85">wahrscheinlich KI-generiert</p>
              <div className="mt-6 h-5 w-full overflow-hidden rounded-full bg-white/20">
                <div className={cn("h-full rounded-full transition-all duration-700", score > 50 ? "bg-rose-300" : "bg-emerald-300")} style={{ width: `${score}%` }} />
              </div>
            </StageGlassPanel>
            <StageGlassPanel className="mt-4">
              <p className="text-[20px] text-white/70">Der Text (Auszug):</p>
              <p className="mt-2 text-[20px] leading-snug text-white/95">
                {step >= 1
                  ? "KI bringt ziemlich viele Vorteile mit, die man im Alltag überall merkt. In der Medizin etwa hilft sie Ärzten, Krankheiten früher zu finden, weil sie riesige Datenmengen durchgeht …"
                  : "Künstliche Intelligenz (KI) bietet eine Vielzahl von Vorteilen, die sich auf verschiedene Bereiche unseres täglichen Lebens auswirken. In der Medizin ermöglicht KI fortschrittliche Diagnosen …"}
              </p>
            </StageGlassPanel>
            <p className="mt-auto text-[20px] text-white/70">Weiter = denselben Text einmal durch undetectable.ai schicken.</p>
          </StageGrainCard>
        </Stagger>
        <div>
          <SlideHead eyebrow="Step 2 · Live" title="Hundert Prozent. Dann 32." active={active} />
          <ul className="mt-12 space-y-7">
            {[
              "Ein ChatGPT-Text, unverändert: GPTZero sagt 100 % KI. Beeindruckend.",
              "Derselbe Text, 20 Sekunden durch undetectable.ai: 32 %. Also „wahrscheinlich Mensch“.",
              "Das ist das Wettrüsten. Jedes Erkennungstool hat ein Umgehungstool. Schüler:innen kennen beide.",
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

const DetektorToolsSlide = (p: SlideProps) => (
  <GridSlide
    {...p}
    eyebrow="Step 2 · Die Tools"
    title="Vier Detektoren, ein Umgehungstool, ein Mythos."
    items={[
      { name: "GPTZero", meta: "Der bekannteste", text: "Prozentwert plus Satz-Markierung. Gut zu bedienen, schlecht bei kurzen und bearbeiteten Texten." },
      { name: "CopyLeaks", meta: "Plagiat + KI", text: "Kombiniert klassische Plagiatssuche mit KI-Erkennung. Schulbuch-Texte lösen Alarm aus." },
      { name: "Pangram", meta: "Aktuell am treffsichersten", text: "Stand 2026 der beste Detektor im Test. Trotzdem: Indiz, kein Beweis." },
      { name: "undetectable.ai", meta: "Die Gegenseite", text: "Macht aus KI-Text „menschlichen“ Text. 20 Sekunden, kostenlos. Schüler:innen kennen es." },
      { name: "ChatGPT als Detektor", meta: "Der Mythos", text: "„Hast du das geschrieben?“ ChatGPT rät. OpenAI hat den eigenen Detektor 2023 wegen Unbrauchbarkeit eingestellt." },
      { name: "Ihr Bauchgefühl", meta: "Besser als gedacht", text: "Wer die Klasse kennt, merkt Stilbrüche. Aber auch das ist kein Beweis, sondern ein Gesprächsanlass.", accent: true },
    ]}
    cols={3}
  />
);

const ZahlenSlide = (p: SlideProps) => (
  <StatsSlide
    {...p}
    eyebrow="Step 2 · Die Studienlage"
    title="Fast die Hälfte falsch."
    stats={[
      { big: "15–38 %", small: "False Positive", text: "So viele echte Schülertexte werden als KI markiert. Bei vielen Tools stabil über 20 %." },
      { big: "> 40 %", small: "False Negative", text: "So viele KI-Texte werden nicht erkannt, sobald sie leicht bearbeitet wurden." },
      { big: "× 2", small: "Nicht-Muttersprachler", text: "Texte von Nicht-Muttersprachlern werden doppelt so oft fälschlich als KI markiert. Ein systematischer Bias." },
    ]}
    footnote="Weber-Wulff et al. 2023 · Perkins et al. 2024 · Liang et al. 2023 (Stanford). Links im Material."
  />
);

const HandschriftSlide = (p: SlideProps) => (
  <CardsSlide
    {...p}
    stepwise
    eyebrow="„Dann eben alles handschriftlich“"
    title="Die Illusion in drei Bildern."
    cards={[
      { icon: Smartphone, label: "Unter dem Tisch", title: "Das Smartphone", text: "Aufgabe fotografieren, Antwort lesen, handschriftlich abschreiben. Sieht aus wie Nachdenken." },
      { icon: Glasses, label: "Im Gesicht", title: "Ray-Ban Meta", text: "Kamera und KI in der Brille. Die Aufgabe wird vorgelesen, die Antwort ins Ohr geflüstert. Smartwatch, AI Pin, Smart Glasses: die Liste wächst." },
      { icon: Camera, label: "Zu Hause", title: "OCR", text: "Handschrift wird in Sekunden zu Text. Der handgeschriebene Aufsatz kann aus der KI stammen, wie jeder andere." },
    ]}
  />
);

const VerdachtSlide = (p: SlideProps) => (
  <StatementSlide
    {...p}
    eyebrow="Step 2 · Im Verdachtsfall"
    title="Was rechtlich gilt."
    lines={[
      "Ein Detektor-Ergebnis ist kein Beweismittel. Keine Note darauf stützen.",
      "Gleiche Vorgehensweise wie bei jedem anderen Täuschungsverdacht: Gespräch, Prozess erfragen, Nachweis einfordern.",
      "Fragen, die helfen: „Erklär mir deinen Gedankengang.“ „Zeig mir deine Notizen.“ „Was würdest du anders machen?“",
      "Wer den Prozess nicht erklären kann, hat ein Problem. Unabhängig davon, welches Tool er benutzt hat.",
    ]}
  />
);

const MitmachDetektorSlide = (p: SlideProps) => (
  <TaskSlide
    {...p}
    icon={Gauge}
    gradient="ocean"
    minutes={6}
    tool="gptzero.me · copyleaks.com · pangram.com"
    eyebrow="Mitmachen · Step 2"
    title="Testen Sie die Detektoren selbst."
    prompt="Drei Texte prüfen: 1. Ihre eigene KI-Lösung aus der Schülerrolle. 2. Einen Absatz, den Sie selbst schreiben (3 Sätze zu Ihrem letzten Wochenende). 3. Ihre KI-Lösung nach dem Prompt „Schreib das wie ein 15-Jähriger, mit zwei kleinen Fehlern.“"
    steps={[
      "Alle drei Texte durch denselben Detektor. Werte notieren.",
      "Besonders spannend: Wird Ihr eigener Absatz als KI markiert?",
      "Dann wissen Sie, wie sich ein falsch beschuldigter Schüler fühlt.",
    ]}
  />
);

/* ─── C · Umbauen ─── */

const ResistentSlide = (p: SlideProps) => (
  <CardsSlide
    {...p}
    eyebrow="Step 3 · Existieren KI-resistente Aufgaben?"
    title="Was nicht hilft. Und was hilft."
    cards={[
      { icon: X, label: "Hilft nicht", title: "Analoge Quellen", text: "„Nur das Schulbuch.“ Arbeitsblätter und Buchseiten sind in zehn Sekunden fotografiert und eingelesen." },
      { icon: X, label: "Hilft nicht", title: "Sehr aktuelle Themen", text: "„Bezug auf den Zeitungsartikel von gestern.“ Die KI hat Internetzugang. Der Artikel ist drin." },
      { icon: Check, label: "Hilft", title: "Mündlich, persönlich, spontan", text: "Debatte, Präsentation, Dialog. Eigene Erfahrung, eigene Meinung. Eine Situation improvisieren, vorgegebene Wörter einbauen." },
    ]}
  />
);

const ReverseSlide = (p: SlideProps) => (
  <SplitSlide
    {...p}
    cardWidth={900}
    gradient="purple"
    eyebrow="Step 3 · Reverse Engineering"
    title="Geben Sie Ihre Aufgabe der KI. Vorher."
    points={[
      "Schritt 1: Eine Aufgabe nehmen, die Sie demnächst wirklich stellen.",
      "Schritt 2: Wörtlich in ChatGPT eingeben, als wären Sie Schüler:in.",
      "Schritt 3: Output benoten. Bekommt er eine 1 oder 2, muss die Aufgabe umgebaut werden.",
    ]}
    card={
      <ChatCard
        prompt="Schreibe eine 300-Wörter-Erörterung zur Frage: Sollte das Wahlalter auf 16 herabgesetzt werden? Strukturiere mit Einleitung, Hauptteil mit Argumenten Pro und Contra, Fazit."
        answer={
          <>
            <p><strong>Einleitung.</strong> Die Frage, ob das Wahlalter auf 16 Jahre gesenkt werden sollte, wird seit Jahren kontrovers diskutiert. Befürworter sehen darin eine Stärkung der Demokratie, Kritiker zweifeln an der politischen Reife Jugendlicher.</p>
            <p><strong>Pro.</strong> Erstens tragen 16-Jährige bereits Verantwortung: Sie dürfen arbeiten, Steuern zahlen und sind strafmündig. Zweitens betreffen politische Entscheidungen, etwa zum Klimaschutz, vor allem ihre Zukunft. Drittens …</p>
            <p className="text-white/60">… 300 Wörter, saubere Gliederung, abwägendes Fazit. Note: 2+. Die Aufgabe ist tot.</p>
          </>
        }
      />
    }
  />
);

const MitmachReverseSlide = (p: SlideProps) => (
  <TaskSlide
    {...p}
    icon={Repeat}
    gradient="purple"
    minutes={8}
    eyebrow="Mitmachen · Step 3"
    title="Ihre nächste Aufgabe, rückwärts."
    prompt="[Ihre nächste Hausaufgabe oder Klausuraufgabe, wörtlich so, wie sie auf dem Arbeitsblatt steht.]"
    steps={[
      "Die Aufgabe exakt eingeben. Nichts erklären, nichts dazuschreiben.",
      "Output lesen und ehrlich benoten. Welche Note hätte das bei Ihnen?",
      "Note auf dem Handy eintragen. Dann sehen wir, wie KI-anfällig unsere Aufgaben sind.",
    ]}
  />
);

/* ─── Fünf Grundsätze (Signatur) ─── */

const GRUNDSAETZE = [
  { name: "Prozess statt Produkt", sub: "Schreibplan, Skizzen, Notizen. Der Weg zählt.", color: "bg-violet-500", how: "Schreibplan vor der Reinschrift. Skizze vor der Lösung. Versionsverlauf bei digitalem Schreiben." },
  { name: "Persönlicher Bezug", sub: "„Was überzeugt dich persönlich, und warum?“", color: "bg-pink-500", how: "Eigene Erfahrung, eigene Position, eigene Erinnerung. Die KI hat keine." },
  { name: "Lokaler Kontext", sub: "Eure Stunde, euer Tafelbild, eure Diskussion.", color: "bg-amber-500", how: "„Im Dialog aus Sitzung 5 sagte Robespierre …“ Die KI war nicht dabei." },
  { name: "Reflexion statt Reproduktion", sub: "Bewerten, begründen, entscheiden.", color: "bg-teal-500", how: "Nicht „Erkläre X“, sondern „Welche von drei Erklärungen passt zu unserem Fall, und warum?“" },
  { name: "Methoden-Vielfalt", sub: "Mündlich, visuell, performativ, handwerklich.", color: "bg-sky-500", how: "Standbild, Skizze, Streitgespräch, Modell bauen. Je mehr Formate, desto weniger Text zum Generieren." },
];

function GrundsaetzeSlide({ step, active }: SlideProps) {
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col px-20 pt-36 pb-20">
        <SlideHead eyebrow="Step 3 · Die Fünf Grundsätze" title="KI-resistente Aufgaben. Fünf Hebel." active={active} />
        <ol className="mt-10 space-y-4">
          {GRUNDSAETZE.map((g, i) => (
            <Reveal key={g.name} when={i + 1} step={step}>
              <li className="grid grid-cols-[72px_520px_1fr] items-center gap-6 rounded-2xl border border-border-tertiary bg-white px-6 py-4">
                <span className={cn("flex size-14 items-center justify-center rounded-xl text-[26px] font-semibold text-white", g.color)}>{i + 1}</span>
                <div>
                  <p className="text-[30px] leading-tight font-semibold text-text-primary">{g.name}</p>
                  <p className="mt-1 text-[19px] text-text-tertiary">{g.sub}</p>
                </div>
                <p className="text-[22px] leading-snug text-text-secondary">{g.how}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </SlideFrame>
  );
}

/* ─── Aufgabenumbau Vorher / Nachher ─── */

type Umbau = { fach: string; alt: string; neu: string; checks: boolean[] };

const UMBAUTEN: Umbau[] = [
  {
    fach: "Deutsch · Klasse 9",
    alt: "Schreibe eine dialektische Erörterung zum Thema: Sollte die Nutzung von Smartphones an Schulen verboten werden? Nutze das Schema aus dem Unterricht, handschriftlich, 90 Minuten, einzeln, ohne Hilfsmittel.",
    neu: "Wir haben am Montag in der Klasse über das Handyverbot abgestimmt: 14 zu 11. Schreibe eine Erörterung, die beide Lager aus unserer Diskussion aufgreift. Gib vorher einen Schreibplan ab (Stichworte, 10 Min). Schluss: Welche Position hat dich in der Diskussion am meisten überrascht, und warum?",
    checks: [true, true, true, true, false],
  },
  {
    fach: "Mathematik · Klasse 8",
    alt: "Löse die Aufgaben 1–6 im Arbeitsblatt zu linearen Gleichungssystemen. Rechne alle Aufgaben vollständig schriftlich vor, ohne Taschenrechner, 45 Minuten, wird benotet.",
    neu: "Aufgabe 4 hat gestern die halbe Klasse falsch gelöst. Finde den typischen Fehler (Tafelbild von gestern) und erkläre deinem Sitznachbarn in zwei Sätzen, warum er passiert. Dann: Erfinde eine Aufgabe aus eurem Alltag (Handyvertrag, Taschengeld, Fahrkarte), die auf ein Gleichungssystem führt, und löse sie als Skizze mit Rechenweg.",
    checks: [true, true, true, true, true],
  },
  {
    fach: "Deutsch · Klasse 7",
    alt: "Schreibe eine Zusammenfassung zu einem im Unterricht behandelten Sachtext zum Thema Soziale Medien und ihre Auswirkungen auf Jugendliche. Nutze nur deine Notizen, handschriftlich.",
    neu: "Nimm den Sachtext und deine eigene Bildschirmzeit der letzten Woche (Screenshot). Welche zwei Aussagen des Textes treffen auf dich zu, welche nicht? Bereite ein 90-Sekunden-Statement vor, das du morgen vor der Klasse hältst, mit einer Frage an die Klasse am Ende.",
    checks: [true, true, false, true, true],
  },
];

function UmbauSlide({ umbau, step, active }: SlideProps & { umbau: Umbau }) {
  const score = umbau.checks.filter(Boolean).length;
  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="flex h-full flex-col px-20 pt-36 pb-20">
        <SlideHead eyebrow={`Aufgabenumbau · ${umbau.fach}`} title="Vorher. Nachher." active={active} />
        <div className="mt-10 grid flex-1 grid-cols-[1fr_80px_1fr] items-stretch gap-6">
          <Stagger index={1} active={active} className="h-full">
            <div className="flex h-full flex-col rounded-[32px] border border-border-tertiary bg-white p-8">
              <div className="flex items-center justify-between">
                <span className="text-[20px] font-semibold tracking-wider text-text-tertiary uppercase">Vorher</span>
                <span className="rounded-full bg-rose-100 px-4 py-1 text-[18px] font-semibold text-rose-700">ChatGPT: Note 2</span>
              </div>
              <p className="mt-5 text-[24px] leading-snug text-text-primary">{umbau.alt}</p>
              <div className="mt-auto flex gap-2 pt-6">
                {GRUNDSAETZE.map((g) => (
                  <span key={g.name} className="flex size-10 items-center justify-center rounded-lg bg-background-tertiary text-[16px] text-text-tertiary">
                    <X className="size-5" />
                  </span>
                ))}
                <span className="ml-auto text-[22px] font-semibold text-text-tertiary">0 / 5</span>
              </div>
            </div>
          </Stagger>
          <div className="flex items-center justify-center">
            <Reveal when={1} step={step}>
              <ArrowRight className="size-14 text-primary-dark" strokeWidth={2} />
            </Reveal>
          </div>
          <Reveal when={1} step={step} className="h-full">
            <div className="flex h-full flex-col rounded-[32px] border border-primary-dark bg-primary-light p-8">
              <div className="flex items-center justify-between">
                <span className="text-[20px] font-semibold tracking-wider text-primary-darker uppercase">Nachher</span>
                <span className="rounded-full bg-emerald-100 px-4 py-1 text-[18px] font-semibold text-emerald-700">ChatGPT: scheitert</span>
              </div>
              <p className="mt-5 text-[24px] leading-snug text-text-primary">{umbau.neu}</p>
              <div className="mt-auto flex gap-2 pt-6">
                {GRUNDSAETZE.map((g, i) => (
                  <span
                    key={g.name}
                    title={g.name}
                    className={cn(
                      "flex size-10 items-center justify-center rounded-lg text-white",
                      umbau.checks[i] ? g.color : "bg-white/60 text-text-tertiary",
                    )}
                  >
                    {umbau.checks[i] ? <Check className="size-5" /> : <X className="size-5" />}
                  </span>
                ))}
                <span className="ml-auto text-[22px] font-semibold text-primary-darker">{score} / 5</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </SlideFrame>
  );
}

const Umbau1 = (p: SlideProps) => <UmbauSlide {...p} umbau={UMBAUTEN[0]} />;
const Umbau2 = (p: SlideProps) => <UmbauSlide {...p} umbau={UMBAUTEN[1]} />;
const Umbau3 = (p: SlideProps) => <UmbauSlide {...p} umbau={UMBAUTEN[2]} />;

const FlippedSlide = (p: SlideProps) => (
  <SplitSlide
    {...p}
    gradient="aurora"
    eyebrow="Step 3 · Flipped Classroom mit KI"
    title="Wissen zu Hause, Denken im Raum."
    points={[
      "Das Wissen holen sich die Schüler:innen zu Hause: Erklärtext, Mini-Quiz, Reflexionsfrage. Mit KI in fünf Minuten erstellt.",
      "Im Unterricht passiert, was KI nicht kann: diskutieren, anwenden, streiten, präsentieren.",
      "Hausaufgaben werden damit KI-egal: Ob die Vorbereitung mit KI war, zeigt sich in der Debatte.",
    ]}
    card={
      <>
        <p className="text-[18px] font-semibold tracking-wider text-white/70 uppercase">Beispiel · Klasse 10 PGW</p>
        <StageGlassPanel className="mt-4">
          <p className="text-[18px] text-white/70">Zu Hause (20 Min)</p>
          <p className="mt-1 text-[22px] leading-snug text-white">Erklärtext „Wie funktioniert die Schuldenbremse?“ (KI-erstellt, von mir geprüft), 5 Quizfragen, eine Frage: „Welches Argument leuchtet dir am wenigsten ein?“</p>
        </StageGlassPanel>
        <StageGlassPanel className="mt-4">
          <p className="text-[18px] text-white/70">Im Unterricht (45 Min)</p>
          <p className="mt-1 text-[22px] leading-snug text-white">Fishbowl-Debatte: Investieren oder sparen? Jede:r bringt das „am wenigsten einleuchtende“ Argument mit und muss es verteidigen.</p>
        </StageGlassPanel>
        <StageGlassPanel className="mt-auto">
          <p className="text-[22px] leading-snug text-white/95">Bewertet wird die Debatte. Die Hausaufgabe ist Eintrittskarte, nicht Leistung.</p>
        </StageGlassPanel>
      </>
    }
  />
);

const MitmachUmbauSlide = (p: SlideProps) => (
  <TaskSlide
    {...p}
    icon={Pencil}
    gradient="aurora"
    minutes={10}
    eyebrow="Mitmachen · Step 3"
    title="Zwei Aufgaben umbauen."
    prompt="Nimm die Aufgabe aus dem Reverse Engineering (oder eine der drei von eben). Baue sie so um, dass mindestens drei der Fünf Grundsätze erfüllt sind. Dann: Die neue Aufgabe wieder in ChatGPT. Scheitert sie? Wenn nicht, einen Grundsatz nachlegen."
    steps={[
      "Audit zuerst: Welche der fünf erfüllt die alte Aufgabe? Meist 0 von 5.",
      "Umbauen. KI darf dabei helfen: „Schlage drei Varianten vor, die lokalen Kontext einbauen.“",
      "Gegenprobe in ChatGPT. Ziel: Die KI liefert etwas Generisches, das sofort auffällt.",
    ]}
  />
);

/* ─── D · Prüfen & Bewerten ─── */

const PruefungskulturSlide = (p: SlideProps) => (
  <StatementSlide
    {...p}
    eyebrow="Prüfungskultur · nach Thomas Weidmann, LI Hamburg"
    title="Was prüfen wir eigentlich?"
    lines={[
      "Reproduktion lässt sich nicht mehr prüfen, sobald ein Handy im Raum ist.",
      "Also prüfen wir Prozess, Transfer, Urteil und Kommunikation.",
      "Das ist nicht neu. KI zwingt uns nur, es endlich zu tun.",
    ]}
  />
);

const FormateSlide = (p: SlideProps) => (
  <GridSlide
    {...p}
    eyebrow="Jenseits der Klausur · Fünf Formate"
    title="KI-resistenter und oft lernwirksamer."
    items={[
      { name: "Lernportfolio", meta: "Entwicklung statt Momentaufnahme", text: "Sechs bis zehn Arbeiten über ein Halbjahr plus Abschlussreflexion. Stilbrüche durch KI fallen über die Zeit auf." },
      { name: "Open-Book mit KI-Erlaubnis", meta: "KI ist Teil der Aufgabe", text: "Die Schüler:innen dürfen KI nutzen und müssen zeigen, wie: Prompts dokumentieren, Output bewerten, korrigieren." },
      { name: "Mündliche Verteidigung", meta: "Abgesprochen, nicht überfallen", text: "Die schriftliche Arbeit ist Grundlage, die Note entsteht im Gespräch: „Erklär mir Absatz 3.“" },
      { name: "Projekt & Performance", meta: "Etwas herstellen", text: "Podcast, Ausstellung, Modell, Theaterszene. Das Produkt ist analog, der Prozess sichtbar." },
      { name: "Prozessklausur", meta: "Der Weg wird benotet", text: "Gliederung, Entwurf, Reinschrift in drei Phasen abgeben. Jede Phase zählt." },
      { name: "Die klassische Klausur", meta: "Bleibt, für das, wofür sie gut ist", text: "Handyfrei, beaufsichtigt, kurz. Für Reproduktion und Grundfertigkeiten. Nicht für alles.", accent: true },
    ]}
    cols={3}
  />
);

const DimensionenSlide = (p: SlideProps) => (
  <GridSlide
    {...p}
    eyebrow="KI im Unterricht · Fünf Dimensionen"
    title="Über, mit, durch, trotz, ohne."
    items={[
      { name: "Lernen über KI", meta: "KI-Detektive", text: "Wie funktioniert sie, welche Daten braucht sie, wo sind die Grenzen? Infoplakate zu ethischen Fragen." },
      { name: "Lernen mit KI", meta: "Chatbot-Strategien", text: "Die Klasse entwickelt Regeln, wann KI bei Hausaufgaben hilft und wann sie schadet." },
      { name: "Lernen durch KI", meta: "Adaptive Software im Test", text: "Lernplattformen vergleichen: Feedback, Individualisierung, eigener Lernzuwachs." },
      { name: "Lernen trotz KI", meta: "Wettlauf gegen die Maschine", text: "Schreibwettbewerb Mensch gegen KI. Danach: Was macht menschliche Texte einzigartig?" },
      { name: "Lernen ohne KI", meta: "Offline-Kreativtag", text: "Ein Tag ohne Geräte: Collagen, Theater, Geschichten. Kreativität ohne Technik erleben." },
      { name: "Vier Niveaus", meta: "Verstehen · Anwenden · Reflektieren · Mitgestalten", text: "Vom Lernplakat „Wie funktioniert KI?“ bis zum Mini-Konzept „KI für unsere Schule“.", accent: true },
    ]}
    cols={3}
  />
);

const TaeuschungSlide = (p: SlideProps) => (
  <StatementSlide
    {...p}
    eyebrow="Täuschungsversuche mit KI"
    title="Wie bei jedem anderen Täuschungsversuch."
    lines={[
      "Gleiche Vorgehensweise wie bei Spickzettel oder Abschreiben. Keine Sonderregeln, kein Panikmodus.",
      "Wo KI erlaubt ist: klare Trennung zwischen Eigenleistung und KI-Anteil.",
      "Betroffene Passagen kennzeichnen, verwendete Prompts auflisten. Das ist die Transparenzregel.",
      "Im Klausurraum: Gadgets im Blick. Smartphone, Smartwatch, Brille. Die Liste wird länger, nicht kürzer.",
    ]}
  />
);

const BewertungGefahrenSlide = (p: SlideProps) => (
  <CardsSlide
    {...p}
    stepwise
    eyebrow="KI als Bewertungshilfe · Ein ehrlicher Blick"
    title="Vier Gefahren, bevor wir über Tools reden."
    cards={[
      { icon: Scale, label: "Gefahr 1", title: "Die Rechtslage", text: "Die Note ist ein Verwaltungsakt. Sie muss von Ihnen kommen, begründet und verantwortet. Eine erkennbar KI-basierte Note ist angreifbar. DSGVO und KI-Verordnung regulieren die Bewertung von Menschen besonders streng." },
      { icon: Lock, label: "Gefahr 2", title: "Die Daten", text: "Eine Klassenarbeit ist ein personenbezogenes Dokument Minderjähriger. Unanonymisiert in ein US-Tool: Datenschutzverstoß. Und Namen raus reicht nicht, wenn der Aufsatz von der eigenen Familie handelt." },
      { icon: AlertTriangle, label: "Gefahr 3", title: "Bias & Fehler", text: "Sprachliche Glätte wird belohnt, Inhalt übersehen. Nicht-Muttersprachler werden unterschätzt. Kreative Antworten schneiden schlechter ab. Die KI erklärt ihre Verzerrung nicht." },
      { icon: ShieldAlert, label: "Gefahr 4", title: "Verantwortungs-Illusion", text: "„Die KI hat gesagt …“ Wer sich auf das Tool verlässt, hört auf, selbst zu lesen. Die Verantwortung bleibt trotzdem bei Ihnen." },
    ]}
  />
);

const CCCSlide = (p: SlideProps) => (
  <SplitSlide
    {...p}
    cardWidth={900}
    gradient="ocean"
    eyebrow="Ein Blick von außen · 38C3, Dezember 2024"
    title="„Noten quasi ausgewürfelt.“"
    points={[
      "Forschende der Uni Paderborn haben die KI-Korrekturhilfe von fobizz getestet, eines der verbreitetsten Tools an deutschen Schulen.",
      "Ergebnis: Noten schwankten bei gleicher Arbeit, Korrekturen waren teils falsch, und ChatGPT-Texte schnitten am besten ab.",
      "Das ist kein Argument gegen fobizz. Es ist ein Argument gegen blindes Vertrauen in jedes Bewertungs-Tool.",
    ]}
    card={
      <>
        <p className="text-[18px] font-semibold tracking-wider text-white/70 uppercase">Chaos Communication Congress · „Chatbots im Schulunterricht“</p>
        <StageGlassPanel className="mt-4 flex-1">
          <p className="text-[26px] leading-snug text-white">„Die Noten, die das System vergibt, sind nicht nachvollziehbar. Gleiche Arbeit, unterschiedliche Noten. Falsche Korrekturen werden als richtig markiert. Und Texte, die mit ChatGPT geschrieben wurden, bekommen die besten Bewertungen.“</p>
          <p className="mt-6 text-[20px] text-white/70">Rainer Mühlhoff & Marte Henningsen, sinngemäß zusammengefasst. Vortrag und Paper im Material: media.ccc.de · arxiv.org/abs/2412.06651</p>
        </StageGlassPanel>
        <StageGlassPanel className="mt-4">
          <p className="text-[22px] leading-snug text-white/95">Pointe für den Unterricht: Wer KI bewerten lässt, bewertet am Ende, wie gut jemand KI benutzt hat.</p>
        </StageGlassPanel>
      </>
    }
  />
);

const BewertungGehtSlide = (p: SlideProps) => (
  <StatementSlide
    {...p}
    eyebrow="KI als Bewertungshilfe · Was geht"
    title="Drei Leitplanken. Dann ja."
    lines={[
      "Anonymisiert und DSGVO-konform: Platzhalter statt Namen, DeepChat oder Landestool statt ChatGPT.",
      "Mit Rubrik: KI bewertet zuverlässiger, wenn Kriterien vorliegen. Bei offenen, kreativen Aufgaben sinkt die Genauigkeit deutlich.",
      "Als Zweitmeinung: Rechtschreib-Mechanik, Strukturhinweise, Feedback-Entwurf. Die finale Bewertung ist immer Ihre.",
    ]}
  />
);

const BewertungToolsSlide = (p: SlideProps) => (
  <GridSlide
    {...p}
    eyebrow="Bewertungs-Tools · Nur mit den drei Leitplanken"
    title="Was es gibt."
    items={[
      { name: "DeepChat", meta: "DSGVO-konform · Rubrik einfügen", text: "Eigenes Raster rein, anonymisierter Text rein, Feedback-Entwurf raus. Server in Deutschland.", accent: true },
      { name: "MagicSchool", meta: "Rubric Generator + Grader", text: "Raster erstellen und anwenden. Formulare statt Prompts. Ohne Schülerdaten gut nutzbar." },
      { name: "EssayGrader", meta: "Zweitmeinung für Essays", text: "Ausführliche Analyse nach Kriterien. Englischlastig, Daten gehen in die USA." },
      { name: "fobizz / telli", meta: "Deutsche Plattformen", text: "Korrekturhilfe mit Datenschutzfilter. Siehe CCC: Ergebnisse prüfen, nicht übernehmen." },
    ]}
  />
);

const MitmachBewertungSlide = (p: SlideProps) => (
  <TaskSlide
    {...p}
    icon={Scale}
    gradient="ocean"
    minutes={6}
    eyebrow="Mitmachen · Bewertung"
    title="Werther, zweimal bewertet."
    prompt="Aufgabe: „Schreibe eine Personenbeschreibung über die Hauptperson aus ‚Die Leiden des jungen Werther‘.“ Abgabe: [Werther-Text aus dem Material]. Bewerte nach: Aufbau (1–5), sprachliche Richtigkeit (1–5), inhaltliche Tiefe (1–5). Zu jedem Kriterium ein Satz Begründung. Vorschlag für eine Note."
    steps={[
      "Erst selbst bewerten, 2 Minuten. Note notieren.",
      "Dann die KI mit derselben Rubrik. Vergleichen: Wo weicht sie ab, und warum?",
      "Zusatzfrage: Ist der Werther-Text selbst von KI? Der Stil sagt viel.",
    ]}
  />
);

/* ─── E · KI-Vereinbarung ─── */

const VereinbarungSlide = (p: SlideProps) => (
  <GridSlide
    {...p}
    eyebrow="Zum Mitnehmen · Die KI-Vereinbarung"
    title="Eine Seite. Mit der Klasse ausgehandelt."
    items={[
      { name: "1 · Was ist erlaubt", meta: "Die Klasse sammelt mit", text: "Brainstorming, Tippfehler, Übersetzungshilfe, Erklärtool bei Verständnisproblemen." },
      { name: "2 · Was nicht", meta: "Die roten Linien", text: "Ganze Texte abgeben, in Klassenarbeiten, ohne Kennzeichnung, mit Namen von Mitschüler:innen." },
      { name: "3 · Wie kennzeichnen", meta: "Die Transparenzregel", text: "KI-Anteil markieren, Prompts auflisten, Tool nennen. Ein Satz am Ende reicht." },
      { name: "4 · Was bei Verstoß", meta: "Vorher geklärt", text: "Gespräch, Nachweis, Konsequenz wie bei jedem Täuschungsversuch. Keine Überraschungen." },
      { name: "5 · Wann wir sie ändern", meta: "Lebendes Dokument", text: "Nach jedem Halbjahr gemeinsam prüfen. Die Tools ändern sich, die Vereinbarung auch." },
      { name: "Vorlage", meta: "Download im Material", text: "Word-Vorlage mit allen fünf Abschnitten, in 20 Minuten mit der Klasse ausgefüllt. Löst 80 % der späteren Probleme im Keim.", accent: true },
    ]}
    cols={3}
  />
);

function ThanksSlide({ active }: SlideProps) {
  return (
    <SlideFrame theme="dark">
      <div className="absolute inset-0 [background:linear-gradient(155deg,#8b5cf6_0%,#a78bfa_38%,#d68cfa_72%,#f0bdfa_100%)]" />
      <Brand theme="dark" />
      <div className="relative flex h-full flex-col items-center justify-center text-center">
        <Stagger index={0} active={active}>
          <Headline size="xl" className="text-white">Danke.</Headline>
        </Stagger>
        <Stagger index={1} active={active}>
          <p className="mt-10 text-[44px] font-light text-white/90">Folien, Vorlagen und Studien bleiben online.</p>
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

const L = PLAGIATE_LIVE;
const LiveGefuehl = (p: SlideProps) => <LiveWordsSlide {...p} deck={DECK} activity={L.wordsStart} eyebrow="Ankommen" title="Hausaufgabe + KI. Ein Wort." />;
const LiveVeraendert = (p: SlideProps) => <LivePollSlide {...p} deck={DECK} activity={L.veraendert} eyebrow="Kurze Umfrage" />;
const LiveSuSKI = (p: SlideProps) => <LiveJudgeSlide {...p} deck={DECK} activity={L.susOderKi} eyebrow="Selbsttest · Ihre Tipps" />;
const LiveTools = (p: SlideProps) => <LivePollSlide {...p} deck={DECK} activity={L.tools} eyebrow="Kurze Umfrage" />;
const LiveFP = (p: SlideProps) => <LiveEstimateSlide {...p} deck={DECK} activity={L.fpRate} eyebrow="Schätzfrage · Detektoren" />;
const LiveNote = (p: SlideProps) => <LivePollSlide {...p} deck={DECK} activity={L.note} eyebrow="Reverse Engineering · Ergebnis" />;
const LiveBewertung = (p: SlideProps) => <LiveJudgeSlide {...p} deck={DECK} activity={L.bewertung} eyebrow="Urteilsübung · Bewertung" />;
const LiveChallenge = (p: SlideProps) => <LiveWordsSlide {...p} deck={DECK} activity={L.challenge} eyebrow="30-Tage-Challenge" title="Welche Aufgabe bauen Sie zuerst um?" />;
const LiveFeedback = (p: SlideProps) => <LivePollSlide {...p} deck={DECK} activity={L.feedback} eyebrow="Feedback" />;

const StepA = (p: SlideProps) => <PhaseSlide {...p} n="A" title="Die neue Realität." question="Was tun Schüler:innen längst?" />;
const StepB = (p: SlideProps) => <PhaseSlide {...p} n="B" title="Erkennen." question="Kann ich es überhaupt sehen?" />;
const StepC = (p: SlideProps) => <PhaseSlide {...p} n="C" title="Umbauen." question="Was stelle ich stattdessen?" />;
const StepD = (p: SlideProps) => <PhaseSlide {...p} n="D" title="Prüfen und bewerten." question="Was will ich wirklich wissen?" />;

/* ─── Deck ─── */

const meta = getDeckMeta(DECK)!;

export const plagiateDeck: Deck = {
  ...meta,
  slides: [
    // Ankommen (15)
    { id: "titel", title: "Titel", theme: "dark", Component: TitleSlide, notes: "Ankommen lassen." },
    { id: "hi", title: "Hi!", theme: "light", Component: HiSlide, notes: "Kurz vorstellen. Nora und Antonius ergänzen je nach Besetzung." },
    { id: "gefuehl", title: "Live · Ein Wort", theme: "light", Component: LiveGefuehl, notes: "QR scannen, Seite offen lassen. Begriffe vorlesen: Angst, Betrug, Chance, Überforderung … Wir kommen am Ende darauf zurück." },
    { id: "fahrplan", title: "Fahrplan", theme: "light", Component: AgendaSlide, notes: "Vier Blöcke plus Pause. Fünf Mitmach-Phasen. Betonen: Heute wird viel selbst gemacht." },
    { id: "veraendert", title: "Live · Prüfungen verändert?", theme: "light", Component: LiveVeraendert, notes: "Ausgangslage im Raum. Meistens „ein wenig“. Das ist okay, dafür sind wir hier." },

    // A Die neue Realität (30)
    { id: "step-a", title: "A", theme: "dark", Component: StepA, notes: "" },
    { id: "realitaet", title: "Die neue Realität", theme: "light", Component: RealitySlide, notes: "74 % Vodafone Stiftung 2024, 34/38 aus Umfrage (Quelle vor Vortrag prüfen). Pointe: Verbieten ist keine Option, die Mehrheit nutzt es schon." },
    { id: "foerdern", title: "Menschliche Intelligenz fördern", theme: "light", Component: FoerdernSlide, notes: "Statt „KI verbieten?“ die Frage: Was wollen wir eigentlich fördern? Acht Kompetenzen auf vier Karten. Frage ans Publikum: Welche davon prüfen Ihre Klausuren?" },
    { id: "trio1", title: "SuS oder KI? · 1", theme: "light", steps: 1, Component: Trio1, notes: "Drei Texte stehen. Publikum tippt auf dem Handy (nächste Folie läuft parallel). Weiter = Auflösung. Texte aus dem Videokurs (s4-3)." },
    { id: "trio2", title: "SuS oder KI? · 2", theme: "light", steps: 1, Component: Trio2, notes: "Erlkönig. Texte sind neu formuliert, nicht aus dem Videokurs. Bei Bedarf gegen s4.ts tauschen." },
    { id: "trio3", title: "SuS oder KI? · 3", theme: "light", steps: 1, Component: Trio3, notes: "Mathe. Hier ist die KI an der Form erkennbar (Schritt 1/2/3 mit Einheiten), nicht am Ergebnis." },
    { id: "sus-ki-live", title: "Live · Ihre Tipps", theme: "light", steps: 3, Component: LiveSuSKI, notes: "Zeigt die Verteilung der Tipps pro Aufgabe. Je Weiter eine Auflösung mit Indizien. Meist liegen 60–70 % richtig, und das ist die Pointe: Wir erkennen es manchmal, aber nicht zuverlässig." },
    { id: "indizien", title: "Was uns verraten hat", theme: "light", steps: 4, Component: IndizienSlide, notes: "Vier Schritte. Der vierte ist der wichtige: Ein Satz im Prompt, und die Indizien sind weg." },
    { id: "kernthese", title: "Die Kernthese", theme: "dark", steps: 3, Component: KernthesenSlide, notes: "Die Folie des Tages. Drei Schritte, langsam. „KI schreibt besser, denkt nicht besser.“ Alles Weitere folgt daraus." },
    { id: "tools-sus", title: "Welche Tools Schüler:innen nutzen", theme: "light", Component: ToolsSuSSlide, notes: "Discord-Bots und Snapchat überraschen Lehrkräfte am meisten." },
    { id: "tools-live", title: "Live · Welche Tools kennen Sie?", theme: "light", Component: LiveTools, notes: "Kurz. Überleitung: Jetzt probieren Sie es selbst, als Schüler:in." },
    { id: "schuelerrolle", title: "Mitmachen · Schülerrolle", theme: "light", Component: SchuelerrolleSlide, notes: "10 Minuten. Zwei Tools, drei Aufgaben. Timer im Presenter. Ergebnisse aufheben, die brauchen wir für den Detektor-Test." },
    { id: "reflexion-a", title: "Reflexion", theme: "light", steps: 4, Component: ReflexionSlide, notes: "Vier Schritte. Drei, vier Stimmen einsammeln. Meist: „Die Kurvendiskussion war in 20 Sekunden fertig.“" },

    // B Erkennen (30)
    { id: "step-b", title: "B", theme: "dark", Component: StepB, notes: "" },
    { id: "drei-steps", title: "Drei-Step-Modell", theme: "light", steps: 2, Component: DreiStepsSlide, notes: "Das Rückgrat. Zwei Schritte. Step 1 kurz, Step 2 jetzt, Step 3 nach der Pause." },
    { id: "mechanik", title: "Wie Detektoren arbeiten", theme: "light", Component: DetektorMechanikSlide, notes: "Rückbezug Crash Kurs: Nächstes-Wort-Maschine. Detektoren lesen sie rückwärts. Perplexität und Burstiness einmal erklären, dann nie wieder." },
    { id: "detektor-live", title: "Detektor live · 100 → 32", theme: "light", steps: 1, Component: DetektorLiveSlide, notes: "LIVE wenn möglich: ChatGPT-Text in GPTZero, dann durch undetectable.ai, wieder GPTZero. Backup ist das Mockup auf der Folie (Weiter = 32 %)." },
    { id: "fp-live", title: "Live · Schätzfrage", theme: "light", steps: 1, Component: LiveFP, notes: "Schieberegler. Weiter = 25 % (Mittel aus 15–38 %). Reaktion abwarten." },
    { id: "zahlen", title: "Die Studienlage", theme: "light", Component: ZahlenSlide, notes: "Drei Zahlen. Die dritte ist die ethische: Nicht-Muttersprachler ×2. Studien verlinkt." },
    { id: "detektor-tools", title: "Die Tools", theme: "light", Component: DetektorToolsSlide, notes: "Sechs Karten, je ein Satz. Pangram als derzeit bester, trotzdem Indiz. ChatGPT-als-Detektor ist der Mythos, der am hartnäckigsten hält." },
    { id: "handschrift", title: "Handschrift-Illusion", theme: "light", steps: 2, Component: HandschriftSlide, notes: "Drei Karten, zwei Schritte. Ray-Ban Meta vorführen, wenn eine da ist. Sonst Video." },
    { id: "verdacht", title: "Im Verdachtsfall", theme: "light", steps: 4, Component: VerdachtSlide, notes: "Vier Schritte. Gesprächsleitfaden als Download. Kernsatz: Prozess erfragen, nicht beschuldigen." },
    { id: "mitmach-detektor", title: "Mitmachen · Detektoren testen", theme: "light", Component: MitmachDetektorSlide, notes: "6 Minuten. Der eigene Wochenend-Absatz ist der Moment: Wer als KI markiert wird, versteht die False-Positive-Rate körperlich." },
    { id: "pause", title: "Pause", theme: "dark", Component: PauseSlide, notes: "10 Minuten." },

    // C Umbauen (45)
    { id: "step-c", title: "C", theme: "dark", Component: StepC, notes: "" },
    { id: "resistent", title: "KI-resistente Aufgaben?", theme: "light", Component: ResistentSlide, notes: "Zwei Irrtümer, eine Antwort. Mündlich, persönlich, spontan. Daraus werden gleich die Fünf Grundsätze." },
    { id: "reverse", title: "Reverse Engineering", theme: "light", Component: ReverseSlide, notes: "LIVE: Die Wahlalter-Erörterung wirklich in ChatGPT tippen. 25 Sekunden, Note 2+. „Die Aufgabe ist tot.“" },
    { id: "mitmach-reverse", title: "Mitmachen · Reverse Engineering", theme: "light", Component: MitmachReverseSlide, notes: "8 Minuten. Eigene nächste Aufgabe. Note auf dem Handy eintragen (nächste Folie)." },
    { id: "note-live", title: "Live · Welche Note?", theme: "light", Component: LiveNote, notes: "Meist 60–80 % bei „1 oder 2“. Das ist der Schock, den wir brauchen, bevor die Grundsätze kommen." },
    { id: "grundsaetze", title: "Die Fünf Grundsätze", theme: "light", steps: 5, Component: GrundsaetzeSlide, notes: "SIGNATUR-FOLIE. Fünf Schritte, je ein Grundsatz mit Umsetzung. Identisch mit Videokurs und Crash Kurs. Langsam." },
    { id: "umbau1", title: "Umbau · Deutsch 9", theme: "light", steps: 1, Component: Umbau1, notes: "Vorher: 0/5, ChatGPT Note 2. Weiter = Nachher mit Audit 4/5. Die bunten Kästchen sind die fünf Grundsätze." },
    { id: "umbau2", title: "Umbau · Mathe 8", theme: "light", steps: 1, Component: Umbau2, notes: "Mathe geht auch. Lokaler Kontext (Tafelbild von gestern) plus eigene Aufgabe erfinden. 5/5." },
    { id: "umbau3", title: "Umbau · Deutsch 7", theme: "light", steps: 1, Component: Umbau3, notes: "Persönliche Bildschirmzeit plus mündliches Statement. 4/5. Methoden-Vielfalt über das Mündliche." },
    { id: "flipped", title: "Flipped Classroom", theme: "light", Component: FlippedSlide, notes: "Die Hausaufgabe wird KI-egal, weil sie nur Eintrittskarte ist. Bewertet wird im Raum." },
    { id: "mitmach-umbau", title: "Mitmachen · Zwei Aufgaben umbauen", theme: "light", Component: MitmachUmbauSlide, notes: "10 Minuten. Audit → Umbau → Gegenprobe. Wir gehen rum. Zwei Teilnehmende stellen ihren Umbau vor (freiwillig)." },

    // D Prüfen & Bewerten (35)
    { id: "step-d", title: "D", theme: "dark", Component: StepD, notes: "" },
    { id: "pruefungskultur", title: "Prüfungskultur", theme: "light", steps: 3, Component: PruefungskulturSlide, notes: "Drei Schritte. Quelle pruefungskultur.de (Weidmann, LI Hamburg). Rückbezug auf „Menschliche Intelligenz fördern“." },
    { id: "formate", title: "Fünf Formate", theme: "light", Component: FormateSlide, notes: "Sechs Karten, die sechste ist die klassische Klausur: Sie bleibt, aber nicht für alles. Open-Book mit KI-Erlaubnis löst die meisten Fragen aus." },
    { id: "dimensionen", title: "KI im Unterricht · Fünf Dimensionen", theme: "light", Component: DimensionenSlide, notes: "Über, mit, durch, trotz, ohne. Plus vier Niveaus. Noras Teil im alten Deck, hier verdichtet." },
    { id: "taeuschung", title: "Täuschungsversuche", theme: "light", steps: 4, Component: TaeuschungSlide, notes: "Vier Schritte. Kernsatz: Keine Sonderregeln. Transparenzregel ist die Brücke zur Vereinbarung." },
    { id: "gefahren", title: "Bewertung · Vier Gefahren", theme: "light", steps: 3, Component: BewertungGefahrenSlide, notes: "Vier Karten, drei Schritte. Bewusst VOR den Tools. Die Note ist ein Verwaltungsakt." },
    { id: "ccc", title: "CCC · Noten ausgewürfelt", theme: "light", Component: CCCSlide, notes: "38C3 „Chatbots im Schulunterricht“, Mühlhoff & Henningsen, Uni Paderborn. Zitat ist sinngemäß zusammengefasst, nicht wörtlich. Paper arxiv 2412.06651." },
    { id: "bewertung-geht", title: "Was geht", theme: "light", steps: 3, Component: BewertungGehtSlide, notes: "Drei Leitplanken. Erst dann Tools." },
    { id: "bewertung-tools", title: "Bewertungs-Tools", theme: "light", Component: BewertungToolsSlide, notes: "Vier Karten. DeepChat zuerst, das sagen wir offen." },
    { id: "bewertung-live", title: "Live · Urteilsübung", theme: "light", steps: 3, Component: LiveBewertung, notes: "Drei Szenarien auf dem Handy, je Weiter eine Auflösung. Szenario 3 (80 % KI, gekennzeichnet) löst die beste Diskussion aus." },
    { id: "mitmach-bewertung", title: "Mitmachen · Werther", theme: "light", Component: MitmachBewertungSlide, notes: "6 Minuten. Werther-Text im Material. Zusatzpointe: Der Text ist selbst KI-typisch glatt." },

    // E Abschluss (15)
    { id: "vereinbarung", title: "Die KI-Vereinbarung", theme: "light", Component: VereinbarungSlide, notes: "Das Werkzeug zum Mitnehmen. Fünf Abschnitte, Word-Vorlage im Material. „Löst 80 % der späteren Probleme im Keim.“" },
    { id: "challenge", title: "Live · 30-Tage-Challenge", theme: "light", Component: LiveChallenge, notes: "Fach + Aufgabe. Mail in vier Wochen ankündigen. Rückblick auf die Wortwolke vom Anfang: Hat sich das Gefühl verändert?" },
    { id: "feedback", title: "Live · Feedback", theme: "light", Component: LiveFeedback, notes: "1 Minute." },
    { id: "danke", title: "Danke", theme: "dark", Component: ThanksSlide, notes: "Folien, Vorlagen, Studien bleiben online." },
  ],
};
