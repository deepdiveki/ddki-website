import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import ScrollProgress from "@/components/ScrollProgress";
import AutoRegressiveGame from "@/components/AutoRegressiveGame";
import ShannonExperiment from "@/components/ShannonExperiment";
import IntroFBQuiz from "@/components/IntroFBQuiz";

export const metadata: Metadata = {
  title: "Intro Fortbildungen | DeepDiveKI",
  description:
    "30-Minuten-Intro zur Vorbereitung auf die DeepDiveKI Fortbildungen.",
};

type Lesson = {
  title: string;
  time: string;
  tag: string;
  tagClass: string;
};

type ModuleGraphic = "zielbild" | "tokens" | "prompt" | "praxis";

type ModuleExercise = {
  title: string;
  time: string;
  description: string;
};

type Module = {
  title: string;
  duration: string;
  lessons: Lesson[];
  summary: string;
  highlights: string[];
  exercise: ModuleExercise;
  graphic: ModuleGraphic;
  visualCaption: string;
};

const curriculum: Module[] = [
  {
    title: "Kapitel 1: Start & Zielbild",
    duration: "5 Min",
    lessons: [
      {
        title: "Warm-up: KI in 90 Sekunden",
        time: "1:30",
        tag: "Video",
        tagClass: "bg-white/10 text-white/70 border-white/10",
      },
      {
        title: "Begriffe: KI, ML, LLM",
        time: "2:00",
        tag: "Video",
        tagClass: "bg-white/10 text-white/70 border-white/10",
      },
      {
        title: "Mini-Aufgabe: Fokus setzen",
        time: "1:30",
        tag: "Aufgabe",
        tagClass: "bg-purple/20 text-purple-light-2 border-purple/30",
      },
    ],
    summary:
      "Wir klaeren die wichtigsten Begriffe und definieren dein Zielbild fuer die Fortbildung. Du weisst danach, wofuer du KI einsetzen willst und was Erfolg bedeutet.",
    highlights: [
      "Begriffe: KI, ML, LLM, Prompt",
      "Zielgruppe und Unterrichtssituation festlegen",
      "Erfolgskriterien in einem Satz",
    ],
    exercise: {
      title: "Zielbild in 2 Saetzen",
      time: "2 Min",
      description:
        "Notiere Fach, Klasse und das Lernziel, das du mit KI erreichen willst.",
    },
    graphic: "zielbild",
    visualCaption: "Von Heute zu Ziel: klare Richtung vor dem Start.",
  },
  {
    title: "Kapitel 2: Die Technologie: Tokens & Wahrscheinlichkeit",
    duration: "8 Min",
    lessons: [
      {
        title: "Token-Flow in Bildern",
        time: "3:00",
        tag: "Video",
        tagClass: "bg-white/10 text-white/70 border-white/10",
      },
      {
        title: "Warum Kontext Zaehler ist",
        time: "3:00",
        tag: "Video",
        tagClass: "bg-white/10 text-white/70 border-white/10",
      },
      {
        title: "Mini-Aufgabe: Satz erweitern",
        time: "2:00",
        tag: "Aufgabe",
        tagClass: "bg-purple/20 text-purple-light-2 border-purple/30",
      },
    ],
    summary:
      "Tokens sind die Bausteine. Du siehst, wie Kontext und Wahrscheinlichkeit zusammenspielen und warum kleine Aenderungen grosse Effekte haben.",
    highlights: [
      "Tokens als kleinste Einheiten",
      "Kontextfenster als Speicher",
      "Wahrscheinlichkeit bestimmt den Output",
    ],
    exercise: {
      title: "Naechstes Token raten",
      time: "3 Min",
      description:
        "Ergaenze einen Satz mit drei moeglichen Tokens und schaetze die Reihenfolge.",
    },
    graphic: "tokens",
    visualCaption: "Token-Leiste plus Wahrscheinlichkeiten.",
  },
  {
    title: "Kapitel 3: Prompting lernen und verbessern",
    duration: "9 Min",
    lessons: [
      {
        title: "Promptstruktur in 3 Schritten",
        time: "3:30",
        tag: "Video",
        tagClass: "bg-white/10 text-white/70 border-white/10",
      },
      {
        title: "Beispiele: Rollen, Format, Ziel",
        time: "3:00",
        tag: "Video",
        tagClass: "bg-white/10 text-white/70 border-white/10",
      },
      {
        title: "Mini-Aufgabe: Prompt skizzieren",
        time: "2:30",
        tag: "Aufgabe",
        tagClass: "bg-purple/20 text-purple-light-2 border-purple/30",
      },
    ],
    summary:
      "Ein guter Prompt ist strukturiert. Rolle, Kontext und Format geben dem Modell klare Leitplanken fuer den Unterricht.",
    highlights: [
      "Rolle definieren (z. B. Lehrkraft)",
      "Kontext: Niveau, Ziel, Ton",
      "Format: Liste, Tabelle, Schritte",
    ],
    exercise: {
      title: "Prompt in 3 Schritten",
      time: "3 Min",
      description: "Schreibe Rolle, Kontext und Format als Stichpunkte.",
    },
    graphic: "prompt",
    visualCaption: "Prompt-Bausteine fuehren zu klarem Output.",
  },
  {
    title: "Kapitel 4: Praxis-Check, Quiz und Vertiefung",
    duration: "8 Min",
    lessons: [
      {
        title: "Risiken und Grenzen im Blick",
        time: "3:00",
        tag: "Video",
        tagClass: "bg-white/10 text-white/70 border-white/10",
      },
      {
        title: "Mini-Case: Unterrichtsbeispiel",
        time: "3:00",
        tag: "Case",
        tagClass: "bg-pink/20 text-pink-light-3 border-pink/30",
      },
      {
        title: "Kurz-Quiz (3 Fragen)",
        time: "2:00",
        tag: "Quiz",
        tagClass: "bg-pink/20 text-pink-light-3 border-pink/30",
      },
    ],
    summary:
      "Praxis-Check fuer Risiken und Grenzen. Du lernst, wie du Ergebnisse pruefst und mit dem Quiz dein Wissen sicherst.",
    highlights: [
      "Risiken: Halluzination, Bias, Datenschutz",
      "Checkliste vor dem Einsatz",
      "Quiz zum Selbsttest",
    ],
    exercise: {
      title: "Risiko plus Massnahme",
      time: "2 Min",
      description: "Notiere ein Risiko und eine konkrete Massnahme.",
    },
    graphic: "praxis",
    visualCaption: "Checkliste plus Quiz-Progress fuer sicheren Einsatz.",
  },
];

const tasks = [
  {
    title: "Mini-Aufgabe: Deine Ausgangsfrage",
    time: "3 Min",
    description:
      "Welche Unterrichtssituation moechtest du mit KI verbessern? Halte ein klares Ziel fest.",
    prompt: "Ich moechte KI nutzen, um ...",
  },
  {
    title: "Mini-Aufgabe: Prompt-Entwurf",
    time: "5 Min",
    description:
      "Formuliere einen ersten Prompt fuer eine konkrete Unterrichtseinheit.",
    prompt: "Schreibe einen Prompt, der ...",
  },
  {
    title: "Mini-Aufgabe: Transfer-Check",
    time: "4 Min",
    description:
      "Notiere einen Vorteil und ein Risiko. So bist du im Kurs sofort startklar.",
    prompt: "Vorteil: ... / Risiko: ...",
  },
];

type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
};

const quizQuestions: QuizQuestion[] = [
  {
    question: "Was beschreibt ein Token in einem LLM?",
    options: [
      "Ein Wortteil oder Zeichen",
      "Eine komplette Seite Text",
      "Ein neues Kapitel im Kurs",
    ],
    correctIndex: 0,
  },
  {
    question: "Warum ist Kontext wichtig fuer LLMs?",
    options: [
      "Er steuert die Wahrscheinlichkeit der naechsten Tokens",
      "Er vergroessert die Schrift im Output",
      "Er ersetzt die Trainingsdaten",
    ],
    correctIndex: 0,
  },
  {
    question: "Welcher Prompt ist am klarsten formuliert?",
    options: [
      "Mach was mit Unterricht.",
      "Erstelle drei Einstiegsfragen zum Thema Klimawandel fuer Klasse 9.",
      "Schreibe irgendwas zum Thema.",
    ],
    correctIndex: 1,
  },
  {
    question: "Welche Angabe hilft einem LLM am meisten bei der Ausgabe?",
    options: [
      "Zielgruppe, Format und Ziel",
      "Die Lieblingsfarbe der Lehrkraft",
      "Eine zufaellige Zahl",
    ],
    correctIndex: 0,
  },
  {
    question: "Was ist eine sinnvolle Check-Frage vor dem Einsatz von KI?",
    options: [
      "Sind Quellen pruefbar und Ergebnisse nachvollziehbar?",
      "Wie gross ist die Datei?",
      "Welche Schriftart nutzt das Modell?",
    ],
    correctIndex: 0,
  },
  {
    question: "Wofuer steht die Abkuerzung LLM?",
    options: [
      "Large Language Model",
      "Long Learning Method",
      "Live Lesson Manager",
    ],
    correctIndex: 0,
  },
  {
    question: "Welche Aufgabe passt am besten zu einem Mini-Task im Kurs?",
    options: [
      "Formuliere ein Lernziel in einem Satz.",
      "Schreibe ein komplettes Lehrbuch.",
      "Erstelle 100 Seiten Material.",
    ],
    correctIndex: 0,
  },
  {
    question: "Welche Aussage beschreibt eine Grenze von LLMs?",
    options: [
      "Sie koennen plausible, aber falsche Antworten erzeugen.",
      "Sie verstehen Inhalte wie Menschen.",
      "Sie haben immer aktuelle Daten.",
    ],
    correctIndex: 0,
  },
  {
    question: "Warum sind Beispiele im Prompt hilfreich?",
    options: [
      "Sie zeigen Ton und Format der gewuenschten Antwort.",
      "Sie machen die Anfrage laenger ohne Nutzen.",
      "Sie ersetzen den Kontext.",
    ],
    correctIndex: 0,
  },
];

const videoLibrary = [
  {
    title: "Video-Platzhalter: Was ist ein LLM?",
    duration: "4:00",
  },
  {
    title: "Video-Platzhalter: Token & Kontext",
    duration: "5:30",
  },
  {
    title: "Video-Platzhalter: Prompting im Unterricht",
    duration: "6:00",
  },
];

const limitationPoints = [
  "Abhaengig von Daten, Kontext und Entwicklung",
  "Werte und Inhalte der Daten werden unhinterfragt uebernommen",
  "Kaum einheitliche Reglementierungen / Gesetze",
  "Intuition, Kreativitaet und emotionale Intelligenz fehlen",
];

const feedbackPoints = [
  "Daten als Grundlage",
  "Weiterentwicklung des neuronalen Netzwerks (z. B. durch Feedback)",
  "Kontinuierliches Lernen",
];

const soekiaHighlights = [
  "Lernende koennen Schritt fuer Schritt nachvollziehen, wie aus Trainings-/Beispieltexten Vorhersagen fuer das naechste Wort entstehen, und dabei Datenbasis und Parameter gezielt veraendern (z. B. um Effekte wie Bias oder \"Halluzinationen\" zu beobachten).",
  "Wichtig: SoekiaGPT ist didaktisch vereinfacht und nicht als Tool fuer hochwertige Alltagstexte gedacht, sondern zum Verstehen der Funktionsweise von Modellen wie ChatGPT.",
];

const qrPattern = [
  "1111111",
  "1000101",
  "1011101",
  "1010101",
  "1011101",
  "1000101",
  "1111111",
];

type AITypeGraphic = "weak" | "strong" | "super";

type AIType = {
  title: string;
  description: string;
  status: string;
  graphic: AITypeGraphic;
};

const aiTypes: AIType[] = [
  {
    title: "Schwache KI (Weak AI)",
    description:
      "KI-Systeme, die auf spezifische Aufgaben spezialisiert sind und keine allgemeine Intelligenz besitzen.",
    status: "Heute im Einsatz",
    graphic: "weak",
  },
  {
    title: "Starke KI (Strong AI)",
    description:
      "Hypothetische KI-Systeme, die ueber eine allgemeine Intelligenz verfuegen, die der menschlichen Intelligenz ebenbuertig oder ueberlegen ist.",
    status: "Status: Forschung",
    graphic: "strong",
  },
  {
    title: "Ueberlegene KI (Superintelligence)",
    description:
      "Eine Form der KI, die in allen Bereichen die menschliche Intelligenz deutlich uebertrifft.",
    status: "Status: Hypothese",
    graphic: "super",
  },
];

const VideoPlaceholder = ({
  title,
  duration,
}: {
  title: string;
  duration?: string;
}) => (
  <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/0 shadow-video">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-dark/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 3.5L16 10L4.5 16.5V3.5Z"
              fill="currentColor"
            />
          </svg>
        </span>
        Video Platzhalter
      </div>
    </div>
    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/70">
      <span className="font-medium">{title}</span>
      {duration ? (
        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
          {duration}
        </span>
      ) : null}
    </div>
  </div>
);

const ChapterGraphic = ({ variant }: { variant: ModuleGraphic }) => {
  if (variant === "zielbild") {
    return (
      <div className="relative min-h-[180px] rounded-xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-4">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/50">
          <span>Standort</span>
          <span>Zielbild</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
            Heute
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <span className="h-2 w-2 rounded-full bg-purple-light motion-safe:animate-pulse"></span>
            <span>&rarr;</span>
            <span className="h-2 w-2 rounded-full bg-pink-light motion-safe:animate-pulse"></span>
          </div>
          <div className="rounded-lg border border-purple/30 bg-purple/10 px-3 py-2 text-xs text-white">
            Ziel
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="h-2 rounded-full bg-white/10"></div>
          <div className="h-2 rounded-full bg-purple/30 motion-safe:animate-pulse"></div>
          <div className="h-2 rounded-full bg-white/10"></div>
        </div>
        <div className="absolute -right-6 -bottom-6 h-20 w-20 rounded-full border border-purple/20"></div>
        <div className="absolute -right-6 -bottom-6 h-20 w-20 rounded-full border border-purple/30 motion-safe:animate-spin"></div>
      </div>
    );
  }

  if (variant === "tokens") {
    const tokens = ["Prompt", "steuert", "den", "Output"];
    const probabilities = [
      { label: "Antwort", value: 68 },
      { label: "Tabelle", value: 22 },
      { label: "Frage", value: 10 },
    ];

    return (
      <div className="relative min-h-[180px] rounded-xl border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-white/5 p-4">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/50">
          <span>Tokens</span>
          <span>Wahrscheinlichkeit</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tokens.map((token, index) => (
            <span
              key={token}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold ${
                index === 3
                  ? "border-purple/40 bg-purple/20 text-purple-light-2 motion-safe:animate-pulse"
                  : "border-white/10 bg-white/5 text-white/70"
              }`}
            >
              {token}
            </span>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          {probabilities.map((row) => (
            <div key={row.label} className="flex items-center gap-2 text-xs text-white/70">
              <span className="w-16">{row.label}</span>
              <div className="h-2 flex-1 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-purple/40"
                  style={{ width: `${row.value}%` }}
                ></div>
              </div>
              <span className="w-10 text-right">{row.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "prompt") {
    return (
      <div className="relative min-h-[180px] rounded-xl border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-white/5 p-4">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/50">
          <span>Prompt</span>
          <span>Output</span>
        </div>
        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="space-y-2">
            {[
              "Rolle: Lehrkraft",
              "Kontext: Klasse 7",
              "Format: 3 Fragen",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70"
              >
                {item}
              </div>
            ))}
          </div>
          <span className="text-white/40 motion-safe:animate-bounce">&rarr;</span>
          <div className="rounded-xl border border-purple/30 bg-purple/10 p-3 text-xs text-white/70">
            Output: Fokusfragen fuer den Einstieg
          </div>
        </div>
      </div>
    );
  }

  const checks = ["Quelle pruefen", "Bias erkennen", "Datenschutz beachten"];

  return (
    <div className="relative min-h-[180px] rounded-xl border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-white/5 p-4">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/50">
        <span>Check</span>
        <span>Quiz</span>
      </div>
      <div className="mt-4 space-y-2">
        {checks.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-pink/20 text-white">
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 5L4 7L8 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-white/60">
          <span>Quiz</span>
          <span>3 Fragen</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-white/10">
          <div className="h-full w-1/3 rounded-full bg-pink/40 motion-safe:animate-pulse"></div>
        </div>
      </div>
      <div className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-pink/40 blur-[2px]"></div>
    </div>
  );
};

const AITypeGraphic = ({ variant }: { variant: AITypeGraphic }) => {
  if (variant === "weak") {
    return (
      <div className="relative h-full w-full">
        <div className="absolute inset-0 grid grid-cols-2 gap-3 p-6">
          {["Texte", "Bilder", "Audio", "Planung"].map((label) => (
            <div
              key={label}
              className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.2em] text-white/60"
            >
              {label}
            </div>
          ))}
        </div>
        <div className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-purple/40 bg-purple/20 text-[10px] uppercase tracking-[0.2em] text-purple-light-2 motion-safe:animate-pulse">
          1
        </div>
        <div className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.2em] text-white/40">
          Fokus auf Aufgaben
        </div>
      </div>
    );
  }

  if (variant === "strong") {
    return (
      <div className="relative h-full w-full">
        <div className="absolute inset-6 rounded-full border border-purple/30 motion-safe:animate-spin"></div>
        <svg
          viewBox="0 0 140 140"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          <circle
            cx="70"
            cy="70"
            r="20"
            className="stroke-purple-light/70"
            strokeWidth="2"
          />
          {[
            [70, 10],
            [120, 35],
            [120, 105],
            [70, 130],
            [20, 105],
            [20, 35],
          ].map(([x, y], index) => (
            <g key={`node-${index}`}>
              <line
                x1="70"
                y1="70"
                x2={x}
                y2={y}
                className="stroke-white/20"
                strokeWidth="1.5"
              />
              <circle
                cx={x}
                cy={y}
                r="6"
                className="fill-white/40"
              />
            </g>
          ))}
        </svg>
        <div className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.2em] text-white/40">
          Allgemeine Faehigkeiten
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-pink-light/40 to-purple-light/40 blur-[6px]"></div>
      </div>
      <svg
        viewBox="0 0 140 140"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <circle
          cx="70"
          cy="70"
          r="26"
          className="stroke-pink-light/60"
          strokeWidth="2"
        />
        {Array.from({ length: 8 }).map((_, index) => {
          const angle = (index * 45 * Math.PI) / 180;
          const x = 70 + Math.cos(angle) * 46;
          const y = 70 + Math.sin(angle) * 46;
          return (
            <line
              key={`ray-${index}`}
              x1="70"
              y1="70"
              x2={x}
              y2={y}
              className="stroke-white/30"
              strokeWidth="1.5"
            />
          );
        })}
      </svg>
      <div className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.2em] text-white/40">
        Hypothetische Spitze
      </div>
    </div>
  );
};

export default function IntroFBPage() {
  return (
    <main className="relative z-10 overflow-hidden">
      <ScrollProgress />
      <section className="relative pb-16 pt-32 md:pt-40">
        <div className="absolute left-0 top-24 -z-1 flex w-full flex-col gap-3 opacity-50">
          <div className="footer-bg-gradient h-[1.24px] w-full"></div>
          <div className="footer-bg-gradient h-[2.47px] w-full"></div>
          <div className="footer-bg-gradient h-[3.71px] w-full"></div>
          <div className="footer-bg-gradient h-[4.99px] w-full"></div>
          <div className="footer-bg-gradient h-[6.19px] w-full"></div>
        </div>
        <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="hero-subtitle-gradient relative mb-5 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
                <Image
                  src="/images/hero/icon-title.svg"
                  alt="icon"
                  width={16}
                  height={16}
                />
                <span className="hero-subtitle-text">
                  Vorbereitung Fortbildungen
                </span>
              </span>

              <h1 className="mb-6 text-3xl font-extrabold text-white sm:text-5xl xl:text-heading-1">
                Dein 30-Minuten-Intro fuer die DeepDiveKI Fortbildung
              </h1>
              <p className="mb-8 max-w-[560px] text-white/70 md:text-lg">
                Ein kompakter Lernpfad: klare Kapitel,
                kurze Videos, kleine Aufgaben und ein Quiz. Damit startest du
                vorbereitet in unsere Fortbildungen.
              </p>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { label: "Dauer", value: "30 Min" },
                  { label: "Kapitel", value: "4" },
                  { label: "Lektionen", value: "12" },
                  { label: "Quiz", value: "1" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
                  >
                    <div className="text-2xl font-semibold text-white">
                      {item.value}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.2em] text-white/50">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#kursinhalt"
                  className="hero-button-gradient inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-button"
                >
                  Kurs starten
                  <svg
                    width="14"
                    height="12"
                    viewBox="0 0 14 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3992 5.60002L8.22422 0.350024C7.99922 0.125024 7.64922 0.125024 7.42422 0.350024C7.19922 0.575024 7.19922 0.925025 7.42422 1.15002L11.6242 5.42503H0.999219C0.699219 5.42503 0.449219 5.67502 0.449219 5.97502C0.449219 6.27502 0.699219 6.55003 0.999219 6.55003H11.6742L7.42422 10.875C7.19922 11.1 7.19922 11.45 7.42422 11.675C7.52422 11.775 7.67422 11.825 7.82422 11.825C7.97422 11.825 8.12422 11.775 8.22422 11.65L13.3992 6.40002C13.6242 6.17502 13.6242 5.82502 13.3992 5.60002Z"
                      fill="white"
                    />
                  </svg>
                </Link>
                <Link
                  href="/fortbildungen"
                  className="button-border-gradient inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
                >
                  Zur Fortbildung
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="features-box-border relative rounded-3xl">
                <div className="box-hover relative overflow-hidden rounded-3xl p-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60">
                    <span>Kursvorschau</span>
                    <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px]">
                      <span className="h-2 w-2 rounded-full bg-purple-light motion-safe:animate-pulse"></span>
                      30 Min
                    </span>
                  </div>

                  <div className="mt-5">
                    <VideoPlaceholder
                      title="Intro: Warum KI im Unterricht?"
                      duration="3:40"
                    />
                  </div>

                  <div className="mt-6 space-y-3 text-sm text-white/70">
                    {[
                      "Kompakter Kursplan mit klaren Lernzielen",
                      "Mini-Aufgaben und Reflexionsfragen",
                      "Quiz zum schnellen Check",
                      "Platzhalter fuer Videos und Materialien",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-light"></span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/50">
                      <span>Fortschritt</span>
                      <span>0%</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white/10">
                      <div className="h-full w-[12%] rounded-full bg-gradient-to-r from-purple-light to-pink-light"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="kursinhalt"
        className="relative scroll-mt-32 pb-16 pt-10"
      >
        <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="mb-10 text-center">
            <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
              <Image
                src="/images/hero/icon-title.svg"
                alt="icon"
                width={16}
                height={16}
              />
              <span className="hero-subtitle-text">Deine Inhalte</span>
            </span>
            <h2 className="mb-4 text-2xl font-extrabold text-white sm:text-4xl xl:text-heading-3">
              Die 4 Kapitel im Detail
            </h2>
            <p className="mx-auto max-w-[680px] text-white/70">
              Kapitel, Lektionen und Aufgaben sind strukturiert. Jedes Kapitel
              enthaelt Erklaerungen, Grafiken, Animationen und eine Mini-Aufgabe.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="space-y-4">
                {curriculum.map((module, index) => (
                  <details
                    key={module.title}
                    className="group rounded-2xl border border-white/10 bg-white/5 p-5"
                    open={index === 0}
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-purple-light"></span>
                        <h3 className="text-base font-semibold text-white">
                          {module.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-white/60">
                        <span>{module.duration}</span>
                        <svg
                          className="h-4 w-4 transition-transform duration-300 group-open:rotate-180"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 7.5L10 12.5L15 7.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </summary>

                    <div className="mt-4 space-y-3">
                      {module.lessons.map((lesson) => (
                        <div
                          key={lesson.title}
                          className="flex items-center justify-between rounded-xl border border-white/10 bg-dark/40 px-3 py-2 text-sm text-white/80"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] ${lesson.tagClass}`}
                            >
                              {lesson.tag}
                            </span>
                            <span>{lesson.title}</span>
                          </div>
                          <span className="text-xs text-white/50">
                            {lesson.time}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 grid gap-4 lg:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-dark/40 p-4">
                        <div className="text-xs uppercase tracking-[0.2em] text-white/50">
                          Erklaerung
                        </div>
                        <p className="mt-3 text-sm text-white/70">
                          {module.summary}
                        </p>
                        <ul className="mt-4 space-y-2 text-sm text-white/70">
                          {module.highlights.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-light"></span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-3">
                          <div>
                            <div className="text-xs uppercase tracking-[0.2em] text-white/50">
                              Mini-Aufgabe
                            </div>
                            <div className="mt-2 text-sm font-semibold text-white">
                              {module.exercise.title}
                            </div>
                            <div className="mt-1 text-xs text-white/60">
                              {module.exercise.description}
                            </div>
                          </div>
                          <span className="rounded-full border border-white/10 bg-dark/70 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-white/50">
                            {module.exercise.time}
                          </span>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-dark/40 p-4">
                        <div className="text-xs uppercase tracking-[0.2em] text-white/50">
                          Grafik + Animation
                        </div>
                        <div className="mt-3">
                          <ChapterGraphic variant={module.graphic} />
                        </div>
                        <p className="mt-3 text-xs text-white/50">
                          {module.visualCaption}
                        </p>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="features-box-border relative rounded-3xl">
                <div className="box-hover relative overflow-hidden rounded-3xl p-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60">
                    <span>Aktuelle Lektion</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px]">
                      03:30
                    </span>
                  </div>

                  <div className="mt-5">
                    <VideoPlaceholder
                      title="Lektion: Promptstruktur in 3 Schritten"
                      duration="3:30"
                    />
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                    <h4 className="mb-2 text-base font-semibold text-white">
                      Lernziele
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Rolle, Ziel und Format klar benennen",
                        "Kontext richtig einfuegen",
                        "Ausgabeform festlegen",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-light"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-dark/40 p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-white/50">
                      Notizen
                    </div>
                    <textarea
                      className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/70 placeholder:text-white/30"
                      rows={4}
                      placeholder="Halte hier deine Erkenntnisse fest..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16">
        <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="mb-10 text-center">
            <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
              <Image
                src="/images/hero/icon-title.svg"
                alt="icon"
                width={16}
                height={16}
              />
              <span className="hero-subtitle-text">Themen in 30 Minuten</span>
            </span>
            <h2 className="mb-4 text-2xl font-extrabold text-white sm:text-4xl xl:text-heading-3">
              Drei Kernideen, die du vorab kennen solltest
            </h2>
            <p className="mx-auto max-w-[660px] text-white/70">
              Kleine Animationen zeigen dir die Logik hinter LLMs, Prompting und
              dem Feedback-Loop.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="features-box-border relative rounded-3xl">
              <div className="box-hover relative overflow-hidden rounded-3xl p-6">
                <h3 className="mb-3 text-lg font-semibold text-white">
                  Token & Wahrscheinlichkeit
                </h3>
                <p className="mb-6 text-sm text-white/70">
                  Worte werden zu Tokens. Das Modell waehlt den naechsten Schritt
                  mit der hoechsten Wahrscheinlichkeit.
                </p>
                <div className="flex items-center gap-2">
                  {["Houston", "wir", "haben", "ein"].map((token, index) => (
                    <span
                      key={token}
                      className={`rounded-lg border px-3 py-2 text-xs font-semibold ${
                        index === 3
                          ? "border-purple/40 bg-purple/20 text-purple-light-2 motion-safe:animate-pulse"
                          : "border-white/10 bg-white/5 text-white/70"
                      }`}
                    >
                      {token}
                    </span>
                  ))}
                  <span className="text-white/40">&rarr;</span>
                  <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/70">
                    Problem
                  </span>
                </div>
              </div>
            </div>

            <div className="features-box-border relative rounded-3xl">
              <div className="box-hover relative overflow-hidden rounded-3xl p-6">
                <h3 className="mb-3 text-lg font-semibold text-white">
                  Prompt + Kontext
                </h3>
                <p className="mb-6 text-sm text-white/70">
                  Kontext ist der Rahmen. Ein klarer Prompt gibt Richtung und
                  Ausgabeformat vor.
                </p>
                <div className="flex items-center gap-4">
                  <div className="space-y-2">
                    <div className="h-10 w-28 rounded-xl border border-white/10 bg-white/5"></div>
                    <div className="h-10 w-28 rounded-xl border border-white/10 bg-white/5"></div>
                  </div>
                  <span className="text-white/40 motion-safe:animate-bounce">
                    &rarr;
                  </span>
                  <div className="h-20 w-32 rounded-2xl border border-purple/30 bg-purple/10"></div>
                </div>
              </div>
            </div>

            <div className="features-box-border relative rounded-3xl">
              <div className="box-hover relative overflow-hidden rounded-3xl p-6">
                <h3 className="mb-3 text-lg font-semibold text-white">
                  Feedback Loop
                </h3>
                <p className="mb-6 text-sm text-white/70">
                  Gute Antworten entstehen durch Iteration. Testen, verfeinern,
                  verbessern.
                </p>
                <div className="relative flex items-center justify-center">
                  <div className="h-24 w-24 rounded-full border border-white/10 bg-white/5"></div>
                  <div className="absolute h-28 w-28 rounded-full border border-purple/30 motion-safe:animate-spin"></div>
                  <span className="absolute text-xs uppercase tracking-[0.2em] text-white/60">
                    Loop
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16">
        <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="mb-10 text-center">
            <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
              <Image
                src="/images/hero/icon-title.svg"
                alt="icon"
                width={16}
                height={16}
              />
              <span className="hero-subtitle-text">Grenzen</span>
            </span>
            <h2 className="mb-4 text-2xl font-extrabold text-white sm:text-4xl xl:text-heading-3">
              Limitationen von KI
            </h2>
            <p className="mx-auto max-w-[640px] text-white/70">
              Diese Punkte helfen, Ergebnisse realistisch einzuordnen und
              Verantwortlichkeiten zu klaeren.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <div className="features-box-border relative rounded-3xl">
                <div className="box-hover relative overflow-hidden rounded-3xl p-6 sm:p-8">
                  <h3 className="mb-6 text-2xl font-semibold text-white">
                    Limitationen
                  </h3>
                  <ul className="space-y-4 text-sm text-white/70">
                    {limitationPoints.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-white/60"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="features-box-border relative rounded-3xl">
                <div className="box-hover relative overflow-hidden rounded-3xl p-6">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="rounded-full border border-white/10 bg-dark/60 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                        Grafik-Platzhalter
                      </span>
                    </div>
                    <div className="absolute left-6 bottom-6 flex items-center gap-2 rounded-full border border-white/10 bg-dark/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/60">
                      <span className="h-2 w-2 rounded-full bg-pink-light motion-safe:animate-pulse"></span>
                      Kuenstliche Intelligenz
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-white/50">
                    Visualisierung der wichtigsten Einschranken als Reminder im
                    Kurs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16">
        <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="mb-10 text-center">
            <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
              <Image
                src="/images/hero/icon-title.svg"
                alt="icon"
                width={16}
                height={16}
              />
              <span className="hero-subtitle-text">Tool</span>
            </span>
            <h2 className="mb-4 text-2xl font-extrabold text-white sm:text-4xl xl:text-heading-3">
              SoekiaGPT
            </h2>
            <p className="mx-auto max-w-[640px] text-white/70">
            SoekiaGPT ist eine webbasierte Lernumgebung bzw. ein didaktischer Textgenerator speziell für den Unterricht. Sie wurde entwickelt, um „unter die Motorhaube“ von Sprachmodellen zu schauen. 
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="features-box-border relative rounded-3xl">
                <div className="box-hover relative overflow-hidden rounded-3xl p-6">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-dark/40">
                    <div className="absolute inset-0 z-0 grid grid-rows-[2fr_1fr] gap-3 p-3">
                      <div className="relative overflow-hidden rounded-xl border border-white/10">
                        <Image
                          src="/images/intro_fb/soekia/soekia1.png"
                          alt="SoekiaGPT Screenshot 1"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative overflow-hidden rounded-xl border border-white/10">
                          <Image
                            src="/images/intro_fb/soekia/soekia2.png"
                            alt="SoekiaGPT Screenshot 2"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="relative overflow-hidden rounded-xl border border-white/10">
                          <Image
                            src="/images/intro_fb/soekia/soekia3.png"
                            alt="SoekiaGPT Screenshot 3"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-dark/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/60">
                      SoekiaGPT UI
                    </div>
                  </div>
                  <div className="mt-5 space-y-3 text-sm text-white/70">
                    {soekiaHighlights.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-light"></span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="features-box-border relative rounded-3xl">
                <div className="box-hover relative overflow-hidden rounded-3xl p-6">
                  <div className="rounded-2xl border border-white/10 bg-white p-4">
                    <div className="relative aspect-square w-full">
                      <Image
                        src="/images/intro_fb/QR-Code%20Soekia.png"
                        alt="QR-Code SoekiaGPT"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between text-xs text-white/60">
                    <span>QR-Code</span>
                    <a
                      href="https://soekia.ch/GPT/"
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/10 bg-dark/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/60"
                    >
                      soekia.ch/GPT/
                    </a>
                  </div>
                  <p className="mt-3 text-xs text-white/50">
                    QR-Code fuehrt direkt zu SoekiaGPT.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <AutoRegressiveGame />
          </div>

          <div className="mt-10">
            <ShannonExperiment />
          </div>
        </div>
      </section>

      <section className="relative py-16">
        <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="mb-10 text-center">
            <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
              <Image
                src="/images/hero/icon-title.svg"
                alt="icon"
                width={16}
                height={16}
              />
              <span className="hero-subtitle-text">Lernprozess</span>
            </span>
            <h2 className="mb-4 text-2xl font-extrabold text-white sm:text-4xl xl:text-heading-3">
              Maschinelles Lernen durch Feedback
            </h2>
            <p className="mx-auto max-w-[640px] text-white/70">
              Ein einfaches Schema zeigt, wie Daten, Feedback und Output
              zusammenwirken.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <div className="features-box-border relative rounded-3xl">
                <div className="box-hover relative overflow-hidden rounded-3xl p-6 sm:p-8">
                  <h3 className="mb-6 text-2xl font-semibold text-white">
                    Maschinelles Lernen
                  </h3>
                  <ul className="space-y-4 text-sm text-white/70">
                    {feedbackPoints.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-white/60"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="features-box-border relative rounded-3xl">
                <div className="box-hover relative overflow-hidden rounded-3xl p-6">
                  <div className="rounded-2xl border border-white/10 bg-dark/40 p-4">
                    <div className="grid gap-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                      <div className="space-y-3">
                        <div className="flex h-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xs uppercase tracking-[0.2em] text-white/60">
                          Katze
                        </div>
                        <div className="flex h-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xs uppercase tracking-[0.2em] text-white/60">
                          Hund
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-3 text-white/40">
                        <span className="text-lg">&rarr;</span>
                        <div className="flex h-28 w-32 items-center justify-center rounded-2xl border border-purple/30 bg-purple/10 text-xs uppercase tracking-[0.2em] text-white/70 motion-safe:animate-pulse">
                          Netzwerk
                        </div>
                        <span className="text-lg">&rarr;</span>
                      </div>
                      <div className="flex flex-col items-center gap-3">
                        <div className="rounded-full border border-white/10 bg-dark/70 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/60">
                          Output: Katze
                        </div>
                        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/50">
                          Feedback
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-white/50">
                    Beispielgrafik fuer den Lernkreislauf.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16">
        <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="mb-10 text-center">
            <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
              <Image
                src="/images/hero/icon-title.svg"
                alt="icon"
                width={16}
                height={16}
              />
              <span className="hero-subtitle-text">Ueberblick</span>
            </span>
            <h2 className="mb-4 text-2xl font-extrabold text-white sm:text-4xl xl:text-heading-3">
              Wofuer eigentlich KI?
            </h2>
            <p className="mx-auto max-w-[680px] text-white/70">
              Von schwacher KI bis zur Superintelligenz: Drei Stufen, die den
              Diskurs praegen.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {aiTypes.map((item) => (
              <div key={item.title} className="features-box-border relative rounded-3xl">
                <div className="box-hover relative overflow-hidden rounded-3xl p-6">
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent">
                    <AITypeGraphic variant={item.graphic} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/70">
                    {item.description}
                  </p>
                  <div className="mt-4 inline-flex rounded-full border border-white/10 bg-dark/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/60">
                    {item.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16">
        <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="mb-10 text-center">
            <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
              <Image
                src="/images/hero/icon-title.svg"
                alt="icon"
                width={16}
                height={16}
              />
              <span className="hero-subtitle-text">Video Bibliothek</span>
            </span>
            <h2 className="mb-4 text-2xl font-extrabold text-white sm:text-4xl xl:text-heading-3">
              Platzhalter fuer eure Kursvideos
            </h2>
            <p className="mx-auto max-w-[640px] text-white/70">
              Hier setzen wir spaeter eure eigenen Videos ein. Die Kacheln sind
              bereits im Kurslayout platziert.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {videoLibrary.map((video) => (
              <VideoPlaceholder
                key={video.title}
                title={video.title}
                duration={video.duration}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="aufgaben" className="relative scroll-mt-32 py-16">
        <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="mb-10 text-center">
            <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
              <Image
                src="/images/hero/icon-title.svg"
                alt="icon"
                width={16}
                height={16}
              />
              <span className="hero-subtitle-text">Mini-Aufgaben</span>
            </span>
            <h2 className="mb-4 text-2xl font-extrabold text-white sm:text-4xl xl:text-heading-3">
              Kleine Aufgaben, die dich aktiv machen
            </h2>
            <p className="mx-auto max-w-[660px] text-white/70">
              Jede Aufgabe ist so klein, dass du sie sofort erledigen kannst.
              Damit bist du im Kurs direkt im Flow.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {tasks.map((task) => (
              <div
                key={task.title}
                className="features-box-border relative rounded-3xl"
              >
                <div className="box-hover relative overflow-hidden rounded-3xl p-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/50">
                    <span>Aufgabe</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px]">
                      {task.time}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {task.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/70">
                    {task.description}
                  </p>
                  <div className="mt-5 rounded-2xl border border-white/10 bg-dark/40 p-4 text-sm text-white/50">
                    {task.prompt}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="quiz"
        className="relative z-[10000] isolate scroll-mt-32 py-16 pointer-events-auto"
      >
        <div className="pointer-events-none absolute inset-0 z-[10001] bg-dark"></div>
        <div className="relative z-[10002] mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="mb-10 text-center">
            <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
              <Image
                src="/images/hero/icon-title.svg"
                alt="icon"
                width={16}
                height={16}
              />
              <span className="hero-subtitle-text">Quiz</span>
            </span>
            <h2 className="mb-4 text-2xl font-extrabold text-white sm:text-4xl xl:text-heading-3">
              Schneller Wissenstest
            </h2>
            <p className="mx-auto max-w-[640px] text-white/70">
              Drei kurze Fragen fuer den Selbstcheck. Die Auswertung folgt im
              Kurs.
            </p>
          </div>

          <IntroFBQuiz questions={quizQuestions} />
        </div>
      </section>

      <section id="vertiefung" className="relative scroll-mt-32 py-16">
        <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="mb-10 text-center">
            <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
              <Image
                src="/images/hero/icon-title.svg"
                alt="icon"
                width={16}
                height={16}
              />
              <span className="hero-subtitle-text">Vertiefung</span>
            </span>
            <h2 className="mb-4 text-2xl font-extrabold text-white sm:text-4xl xl:text-heading-3">
              Vertiefung KI-Assistenten
            </h2>
            <p className="mx-auto max-w-[640px] text-white/70">
              Schon fertig und noch Zeit? Hier folgt ein vertiefendes Video sowie eine Aufgabenstellung.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="features-box-border relative rounded-3xl">
              <div className="box-hover relative overflow-hidden rounded-3xl p-6">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/50">
                  <span>Video</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px]">
                    KI-Assistenten
                  </span>
                </div>
                <div className="mt-5">
                  <div className="relative h-0 overflow-hidden rounded-2xl border border-white/10 pb-[56.25%]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="rounded-full border border-white/10 bg-dark/60 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                        Video-Platzhalter
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="features-box-border relative rounded-3xl">
              <div className="box-hover relative overflow-hidden rounded-3xl p-6">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/50">
                  <span>Aufgabe</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px]">
                    KI-Assistenten
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  KI-Assistenten im Unterricht
                </h3>
                <p className="mt-3 text-sm text-white/70">
                  Schaue das Video-Tutorial und bearbeite die Aufgabe: 
                </p>
                <div className="mt-5 rounded-2xl border border-white/10 bg-dark/40 p-4 text-sm text-white/50">
                  Erstelle einen Lernhelfer in Fach X der deinem Schueler mit
                  Begabtenfoerderung Aufgaben deutlich komplexer gestaltet und
                  dich bei der Differenzierung nach oben unterstuetzt.
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a
                    href="https://chatgpt.com/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="ChatGPT"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/30"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-white/20 to-white/5 text-[11px]">
                      GPT
                    </span>
                    ChatGPT
                  </a>
                  <Link
                    href="/ddki-toolbox"
                    aria-label="DeepChat"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/30"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-light/40 to-pink-light/30 text-[11px]">
                      DC
                    </span>
                    DeepChat
                  </Link>
                  <a
                    href="https://notebooklm.google.com/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="NotebookLM"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/30"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-white/20 to-white/5 text-[11px]">
                      NLM
                    </span>
                    NotebookLM
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-24 pt-10">
        <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="features-box-border relative rounded-3xl">
            <div className="box-hover relative overflow-hidden rounded-3xl p-8 text-center sm:p-10">
              <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
                <Image
                  src="/images/hero/icon-title.svg"
                  alt="icon"
                  width={16}
                  height={16}
                />
                <span className="hero-subtitle-text">Bereit fuer mehr?</span>
              </span>
              <h2 className="mb-4 text-2xl font-extrabold text-white sm:text-4xl">
                Starte deine Fortbildung mit DeepDiveKI
              </h2>
              <p className="mx-auto mb-8 max-w-[640px] text-white/70">
                Dieses Intro ist der Schnellstart. In der Fortbildung gehen wir
                tiefer, praxisnah und mit echten Unterrichtsbeispielen.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/fortbildungen"
                  className="hero-button-gradient inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-button"
                >
                  Fortbildung ansehen
                </Link>
                <Link
                  href="/kontakt"
                  className="button-border-gradient inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
                >
                  Beratung anfragen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
