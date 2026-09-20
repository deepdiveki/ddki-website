"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Compass,
  FlaskConical,
  GraduationCap,
  Landmark,
  MonitorPlay,
  RotateCcw,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";

type Empfehlung = {
  kategorie: string;
  titel: string;
  text: string;
  href: string;
};

type ResultId =
  | "paedtag"
  | "schulbuero"
  | "website"
  | "schule-komplett"
  | "komplettkurs"
  | "fortbildungen"
  | "ausprobieren"
  | "grundlagen"
  | "modul1"
  | "modul2"
  | "modul3";

type NodeId = "start" | "schulleitung" | "lehrkraft" | "institut";

type Option = { label: string } & (
  | { next: NodeId; result?: never }
  | { result: ResultId; next?: never }
);

const NODES: Record<NodeId, { question: string; options: Option[] }> = {
  start: {
    question: "Wer sind Sie?",
    options: [
      { label: "Ich leite eine Schule oder gehöre zur Schulleitung.", next: "schulleitung" },
      { label: "Ich unterrichte als Lehrkraft.", next: "lehrkraft" },
      {
        label: "Ich arbeite an einem Institut, Seminar oder einer Hochschule.",
        next: "institut",
      },
    ],
  },
  schulleitung: {
    question: "Was steht an Ihrer Schule gerade an?",
    options: [
      { label: "Mein Kollegium fit für KI machen.", result: "paedtag" },
      { label: "Sekretariat und Verwaltung entlasten.", result: "schulbuero" },
      { label: "Unseren Webauftritt modernisieren.", result: "website" },
      { label: "Am liebsten alles zusammen.", result: "schule-komplett" },
    ],
  },
  lehrkraft: {
    question: "Wie möchten Sie am liebsten lernen?",
    options: [
      {
        label: "Flexibel per Video, in meinem eigenen Tempo.",
        result: "komplettkurs",
      },
      {
        label: "Live in einer Fortbildung, mit Austausch und Fragen.",
        result: "fortbildungen",
      },
      {
        label: "Erst einmal unverbindlich ausprobieren.",
        result: "ausprobieren",
      },
    ],
  },
  institut: {
    question: "Welches Thema interessiert Sie inhaltlich am meisten?",
    options: [
      { label: "KI-Grundlagen, verständlich vermittelt.", result: "grundlagen" },
      { label: "Unterricht und Lehre mit KI gestalten.", result: "modul1" },
      { label: "Prüfungen, Plagiate und Bewertung.", result: "modul2" },
      {
        label: "Chancen und Risiken von KI in der Gesellschaft.",
        result: "modul3",
      },
    ],
  },
};

const RESULTS: Record<
  ResultId,
  {
    icon: typeof Users;
    title: string;
    text: string;
    empfehlungen: Empfehlung[];
  }
> = {
  paedtag: {
    icon: Users,
    title: "Der Pädagogische Tag",
    text: "Ein ganzer Tag für Ihr Kollegium: Wir kommen an Ihre Schule und holen alle gemeinsam ab, von skeptisch bis technikbegeistert.",
    empfehlungen: [
      {
        kategorie: "Format",
        titel: "Pädagogischer Tag",
        text: "Keynote, Workshops und Hands-on für das ganze Kollegium an einem Tag.",
        href: "/fortbildung/paedagogischer-tag",
      },
      {
        kategorie: "Format",
        titel: "Keynote",
        text: "Der inspirierende Auftakt für Ihre Veranstaltung oder Konferenz.",
        href: "/fortbildung/keynote",
      },
      {
        kategorie: "Fortbildung",
        titel: "KI für Schulleitungen",
        text: "Chancen und Strategien speziell für Führungskräfte an Schulen.",
        href: "/fortbildung/fortbildungen/ki-fuer-schulleitung",
      },
    ],
  },
  schulbuero: {
    icon: Building2,
    title: "Das KI-Schulbüro",
    text: "Anfragen automatisch erfassen, zuordnen und beantworten: Das KI-Schulbüro nimmt Ihrem Sekretariat die Routinearbeit ab.",
    empfehlungen: [
      {
        kategorie: "Software",
        titel: "KI-Schulbüro",
        text: "Der Chatbot für Ihre Schulwebsite, der Eltern und Verwaltung entlastet.",
        href: "/software/chatbot-fuer-ihre-schule",
      },
      {
        kategorie: "Ausprobieren",
        titel: "Playground",
        text: "Testen Sie das KI-Schulbüro live und unverbindlich im Browser.",
        href: "/software/playground",
      },
      {
        kategorie: "Software",
        titel: "Moderne Schulwebsite",
        text: "Der passende Webauftritt, in den sich das Schulbüro direkt integrieren lässt.",
        href: "/software/websites",
      },
    ],
  },
  website: {
    icon: MonitorPlay,
    title: "Die moderne Schulwebsite",
    text: "Ein zeitgemäßer Auftritt, der Ihre Schule gut aussehen lässt und mit dem KI-Schulbüro sogar Anfragen selbst beantwortet.",
    empfehlungen: [
      {
        kategorie: "Software",
        titel: "Moderne Schulwebsite",
        text: "Modernes Webdesign für Schulen, gepflegt und ohne Technikstress.",
        href: "/software/websites",
      },
      {
        kategorie: "Software",
        titel: "KI-Schulbüro",
        text: "Die perfekte Ergänzung: ein Chatbot, der direkt auf Ihrer Website arbeitet.",
        href: "/software/chatbot-fuer-ihre-schule",
      },
      {
        kategorie: "Kontakt",
        titel: "Beratungsgespräch",
        text: "Unverbindlich sprechen: Wir zeigen Ihnen Beispiele und Möglichkeiten.",
        href: "/software/kontakt",
      },
    ],
  },
  "schule-komplett": {
    icon: Landmark,
    title: "Das Rundum-Paket für Ihre Schule",
    text: "Fortbildung, Verwaltung und Außenauftritt aus einer Hand: Genau dafür sind unsere Angebote gemacht, perfekt aufeinander abgestimmt.",
    empfehlungen: [
      {
        kategorie: "Format",
        titel: "Pädagogischer Tag",
        text: "Der gemeinsame Startschuss für Ihr ganzes Kollegium.",
        href: "/fortbildung/paedagogischer-tag",
      },
      {
        kategorie: "Software",
        titel: "KI-Schulbüro",
        text: "Entlastet Sekretariat und Verwaltung vom ersten Tag an.",
        href: "/software/chatbot-fuer-ihre-schule",
      },
      {
        kategorie: "Software",
        titel: "Moderne Schulwebsite",
        text: "Der zeitgemäße Auftritt, der alles zusammenführt.",
        href: "/software/websites",
      },
    ],
  },
  komplettkurs: {
    icon: GraduationCap,
    title: "Der Video-KI-Komplettkurs",
    text: "65 Videos, 14 interaktive Tools und über 60 Materialien: KI verstehen, Unterricht planen und souverän mit Plagiaten umgehen, wann immer Sie Zeit haben.",
    empfehlungen: [
      {
        kategorie: "Videokurs",
        titel: "Video-KI-Komplettkurs",
        text: "Vom Einstieg zur souveränen Praxis, mit Zertifikat nach Abschluss.",
        href: "/fortbildung/video-ki-komplettkurs",
      },
      {
        kategorie: "Fortbildung",
        titel: "Crash Kurs KI",
        text: "Lieber live? Der kompakte Einstieg als Fortbildung mit Austausch.",
        href: "/fortbildung/fortbildungen/crash-kurs-ki",
      },
      {
        kategorie: "Software",
        titel: "DeepChat",
        text: "Der datenschutzkonforme KI-Chat für Unterricht und Vorbereitung.",
        href: "/software/ddki-toolbox",
      },
    ],
  },
  fortbildungen: {
    icon: Compass,
    title: "Unsere Live-Fortbildungen",
    text: "Vom Crash-Kurs bis zum Spezialthema: Über 20 Fortbildungen, online oder in Präsenz, immer mit Raum für Ihre Fragen.",
    empfehlungen: [
      {
        kategorie: "Übersicht",
        titel: "Alle Fortbildungen",
        text: "Stöbern Sie durch das komplette Programm und finden Sie Ihr Thema.",
        href: "/fortbildung/fortbildungen",
      },
      {
        kategorie: "Fortbildung",
        titel: "Crash Kurs KI",
        text: "Der beliebte Einstieg: kompakt, verständlich, sofort umsetzbar.",
        href: "/fortbildung/fortbildungen/crash-kurs-ki",
      },
      {
        kategorie: "Videokurs",
        titel: "Video-KI-Komplettkurs",
        text: "Zum Vertiefen zwischen den Terminen, in Ihrem eigenen Tempo.",
        href: "/fortbildung/video-ki-komplettkurs",
      },
    ],
  },
  ausprobieren: {
    icon: Wrench,
    title: "Einfach mal ausprobieren",
    text: "Der beste Einstieg ist das eigene Erlebnis: Testen Sie unsere Tools direkt im Browser, kostenlos und ohne Anmeldung.",
    empfehlungen: [
      {
        kategorie: "Ausprobieren",
        titel: "Playground",
        text: "Erleben Sie live, wie das KI-Schulbüro Anfragen beantwortet.",
        href: "/software/playground",
      },
      {
        kategorie: "Software",
        titel: "DeepChat",
        text: "Der KI-Chat für Schulen: Unterstützung bei Aufgaben und Materialien.",
        href: "/software/ddki-toolbox",
      },
      {
        kategorie: "Videokurs",
        titel: "Video-KI-Komplettkurs",
        text: "Wenn Sie Blut geleckt haben: der strukturierte Weg zur KI-Praxis.",
        href: "/fortbildung/video-ki-komplettkurs",
      },
    ],
  },
  grundlagen: {
    icon: Sparkles,
    title: "KI-Grundlagen, die hängen bleiben",
    text: "Wie funktionieren Sprachmodelle wirklich? Unsere Grundlagenformate erklären es anschaulich, ohne Vorwissen vorauszusetzen.",
    empfehlungen: [
      {
        kategorie: "Fortbildung",
        titel: "Crash Kurs KI",
        text: "Der kompakte Einstieg in KI für Bildungseinrichtungen.",
        href: "/fortbildung/fortbildungen/crash-kurs-ki",
      },
      {
        kategorie: "Format",
        titel: "Keynote",
        text: "Der inspirierende Impuls für Ihre Tagung oder Ihr Seminar.",
        href: "/fortbildung/keynote",
      },
      {
        kategorie: "Videokurs",
        titel: "Video-KI-Komplettkurs",
        text: "Die Grundlagen zum Nacharbeiten, mit Zertifikat nach Abschluss.",
        href: "/fortbildung/video-ki-komplettkurs",
      },
    ],
  },
  modul1: {
    icon: FlaskConical,
    title: "Modul I: Lehre gestalten mit KI",
    text: "Von der Idee zur fertigen Einheit: Unterricht und Lehrveranstaltungen mit KI konzipieren, Material erstellen und differenzieren.",
    empfehlungen: [
      {
        kategorie: "Fortbildung",
        titel: "Deep Dive Modul I",
        text: "Unterrichtseinheiten konzipieren mit KI-Tools, Schritt für Schritt.",
        href: "/fortbildung/fortbildungen/deep-dive-modul-1",
      },
      {
        kategorie: "Fortbildung",
        titel: "Prompt Engineering",
        text: "KI gezielt und effektiv nutzen: die Kunst der guten Anweisung.",
        href: "/fortbildung/fortbildungen/prompt-engineering-fuer-lehrkraefte",
      },
      {
        kategorie: "Software",
        titel: "DeepChat",
        text: "Das passende Werkzeug, um die Konzepte direkt umzusetzen.",
        href: "/software/ddki-toolbox",
      },
    ],
  },
  modul2: {
    icon: ScrollText,
    title: "Modul II: Prüfungen in Zeiten von KI",
    text: "Plagiate, Hausaufgaben, Klausuren: Souveräne und faire Antworten auf die schwierigsten Fragen der KI-Ära.",
    empfehlungen: [
      {
        kategorie: "Fortbildung",
        titel: "Deep Dive Modul II",
        text: "Plagiate, Hausaufgaben und Klausuren in Zeiten von KI.",
        href: "/fortbildung/fortbildungen/deep-dive-modul-2",
      },
      {
        kategorie: "Fortbildung",
        titel: "Neue Prüfungsformate",
        text: "Aufgaben und Prüfungen neu denken, statt nur zu kontrollieren.",
        href: "/fortbildung/fortbildungen/neue-pruefungsformate-ki",
      },
      {
        kategorie: "Videokurs",
        titel: "Video-KI-Komplettkurs",
        text: "Das komplette Modul II als Videokurs, jederzeit abrufbar.",
        href: "/fortbildung/video-ki-komplettkurs",
      },
    ],
  },
  modul3: {
    icon: ShieldCheck,
    title: "Modul III: KI, Ethik & Gesellschaft",
    text: "Was macht KI mit Bildung und Gesellschaft? Chancen, Risiken und ethische Fragen fundiert einordnen und diskutieren.",
    empfehlungen: [
      {
        kategorie: "Fortbildung",
        titel: "Deep Dive Modul III",
        text: "Chancen und Risiken von KI in Schule und Gesellschaft.",
        href: "/fortbildung/fortbildungen/deep-dive-modul-3",
      },
      {
        kategorie: "Fortbildung",
        titel: "KI-Ethik",
        text: "Ethische Fragen der KI, aufbereitet für die Bildungspraxis.",
        href: "/fortbildung/fortbildungen/KI-Ethik",
      },
      {
        kategorie: "Format",
        titel: "Keynote",
        text: "Der Impulsvortrag zu KI und Gesellschaft für Ihre Veranstaltung.",
        href: "/fortbildung/keynote",
      },
    ],
  },
};

export default function AngebotsFinder() {
  const [nodeId, setNodeId] = useState<NodeId>("start");
  const [history, setHistory] = useState<NodeId[]>([]);
  const [resultId, setResultId] = useState<ResultId | null>(null);

  const result = resultId ? RESULTS[resultId] : null;
  const stepNumber = history.length + 1;

  const choose = (option: Option) => {
    if (option.result) {
      setResultId(option.result);
    } else {
      setHistory([...history, nodeId]);
      setNodeId(option.next);
    }
  };

  const goBack = () => {
    if (resultId) {
      setResultId(null);
      return;
    }
    const prev = history[history.length - 1];
    if (prev) {
      setHistory(history.slice(0, -1));
      setNodeId(prev);
    }
  };

  const restart = () => {
    setResultId(null);
    setHistory([]);
    setNodeId("start");
  };

  return (
    <div className="relative isolate mx-auto max-w-4xl overflow-hidden rounded-[32px] px-5 py-8 [background:linear-gradient(155deg,#8b5cf6_0%,#a78bfa_38%,#d68cfa_72%,#f0bdfa_100%)] sm:px-8 md:px-12 md:py-12">
      {/* Grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "140px 140px",
        }}
      />

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key={`frage-${nodeId}`}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -32 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative"
          >
            {/* Progress */}
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="text-sm font-medium tracking-[0.1em] text-white/80 uppercase">
                Frage {stepNumber} von 2
              </p>
              {history.length > 0 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  <ArrowLeft className="size-4" />
                  Zurück
                </button>
              )}
            </div>
            <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
              <motion.div
                className="h-full rounded-full bg-white"
                initial={false}
                animate={{ width: `${(stepNumber / 2) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>

            <h3 className="text-xl font-semibold text-white md:text-2xl">
              {NODES[nodeId].question}
            </h3>

            <div className="mt-6 flex flex-col gap-3">
              {NODES[nodeId].options.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => choose(option)}
                  className="group cursor-pointer rounded-2xl border border-white/25 bg-white/10 px-5 py-4 text-left text-sm font-medium text-white backdrop-blur-md transition-all duration-200 hover:border-white/60 hover:bg-white/20 hover:pl-6 md:text-md"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`ergebnis-${resultId}`}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
                delay: 0.15,
              }}
              className="mx-auto flex size-20 items-center justify-center rounded-full border-[3px] border-white/60 bg-white/15 shadow-lg backdrop-blur-md"
            >
              <result.icon className="size-9 text-white" />
            </motion.div>

            <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium tracking-[0.14em] text-white/80 uppercase">
              <Sparkles className="size-4" />
              Unsere Empfehlung
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
              {result.title}
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-sm font-light leading-relaxed text-white/85 md:text-md">
              {result.text}
            </p>

            <div className="mt-7 grid grid-cols-1 gap-3 text-left md:grid-cols-3">
              {result.empfehlungen.map((emp, i) => (
                <motion.div
                  key={emp.titel}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + i * 0.12,
                    ease: "easeOut",
                  }}
                >
                  <Link
                    href={emp.href}
                    className="group flex h-full flex-col rounded-2xl border border-white/25 bg-white/10 p-4.5 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-white/60 hover:bg-white/20"
                  >
                    <p className="text-xs font-medium tracking-[0.12em] text-white/70 uppercase">
                      {emp.kategorie}
                    </p>
                    <h4 className="mt-1.5 text-md font-semibold leading-snug text-white">
                      {emp.titel}
                    </h4>
                    <p className="mt-1.5 flex-1 text-sm font-light leading-relaxed text-white/80">
                      {emp.text}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white">
                      Mehr erfahren
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={goBack}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
              >
                <ArrowLeft className="size-4" />
                Andere Antwort wählen
              </button>
              <button
                type="button"
                onClick={restart}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
              >
                <RotateCcw className="size-4" />
                Von vorn beginnen
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
