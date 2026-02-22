"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ComponentType,
  type ReactNode,
} from "react";
import {
  IconBook,
  IconBolt,
  IconBrain,
  IconClock,
  IconFlag3,
  IconKey,
  IconMap2,
  IconPuzzle,
  IconRobot,
  IconShieldCheck,
  IconSparkles,
  IconTrophy,
  IconUsers,
  IconVolume,
  IconVolumeOff,
} from "@tabler/icons-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Bungee, Press_Start_2P, Space_Mono } from "next/font/google";
import { VISUAL_KEYFRAMES, ANIM, DIMENSION_COLORS } from "./_lib/visual-constants";
import { LANDING_DURATION_MS } from "./_lib/player-animation";
import {
  updateParticles,
  getParticleCap,
  spawnDust,
  spawnRunDust,
  spawnSparkle,
  spawnBurst,
  spawnHitParticles,
  spawnAmbient,
  type Particle,
} from "./_lib/particle-engine";
import ParallaxBackground from "./_components/ParallaxBackground";
import PlayerSprite from "./_components/PlayerSprite";
import ParticleSystem from "./_components/ParticleSystem";

const pixelFont = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
});

const displayFont = Bungee({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const bodyFont = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
});

const DIMENSION_ACCESS_CODES: Record<DimensionId, string> = {
  ueber: "470913",
  durch: "582604",
  mit: "736185",
  trotz: "249357",
};

const ACCESS_CODE_STORAGE_KEY = "ddki_escape_access_codes_v1";

type DimensionId = "ueber" | "durch" | "mit" | "trotz";

type Character = {
  id: DimensionId;
  name: string;
  title: string;
  role: string;
  focus: string;
  key: string;
  accent: string;
  badge: string;
  icon: ReactNode;
};

type WeltkarteDownload = {
  id: DimensionId;
  title: string;
  description: string;
  pdfPath: string;
  accent: string;
  icon: ReactNode;
};

type QuizOption = {
  id: string;
  label: string;
  correct: boolean;
};

type JumpRunStation = {
  id: string;
  mapLabel: string;
  title: string;
  learning: string;
  question: string;
  options: QuizOption[];
  reward: string;
};

type JumpRunDanger = {
  id: string;
  title: string;
  description: string;
  tip: string;
};

type JumpRunPlatform = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

type JumpRunZone = {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

type JumpRunMovingPattern = {
  axis: "x" | "y";
  min: number;
  max: number;
  speed: number;
  startDirection?: 1 | -1;
};

type JumpRunHazardZone = JumpRunZone & {
  dangerId: string;
  moving?: JumpRunMovingPattern;
};

type JumpRunCollectible = {
  id: string;
  label: string;
  x: number;
  y: number;
  size: number;
  points: number;
};

type JumpRunQuestionBlock = {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  powerupId: string;
};

type JumpRunPowerup = {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  extraLives: number;
  spawnedByBlockId?: string;
};

type JumpRunChapterId = "ueber" | "mit" | "durch" | "trotz";

type JumpRunMapId =
  | "ueber-citadel"
  | "mit-archipelago"
  | "durch-lab"
  | "trotz-fortress";

type JumpRunDifficultyId = "easy" | "normal" | "hard";

type JumpRunChapterConfig = {
  id: JumpRunChapterId;
  title: string;
  mission: string;
  leitfragen: string[];
  stations: JumpRunStation[];
  dangers: JumpRunDanger[];
};

type JumpRunMapTheme = {
  skyTop: string;
  skyMid: string;
  horizonTop: string;
  horizonBottom: string;
  gridColor: string;
  cloudColor: string;
  cloudShadow: string;
  auraColor: string;
  groundColor: string;
  groundShadow: string;
  platformColor: string;
  platformShadow: string;
};

type JumpRunMapConfig = {
  id: JumpRunMapId;
  chapterId: JumpRunChapterId;
  label: string;
  theme: JumpRunMapTheme;
  world: {
    width: number;
    height: number;
  };
  start: {
    x: number;
    y: number;
  };
  platforms: JumpRunPlatform[];
  stationZones: JumpRunZone[];
  hazardZones: JumpRunHazardZone[];
  collectibles: JumpRunCollectible[];
  questionBlocks: JumpRunQuestionBlock[];
  powerups: JumpRunPowerup[];
  finishZone: JumpRunZone;
  backgroundClass: string;
};

type JumpRunDifficultyConfig = {
  id: JumpRunDifficultyId;
  label: string;
  lives: number;
  speedMultiplier: number;
  gravityMultiplier: number;
  jumpMultiplier: number;
  hazardSpeedMultiplier: number;
  hardExtraHazards: JumpRunHazardZone[];
};

type RuntimeHazard = JumpRunHazardZone & {
  baseX: number;
  baseY: number;
  direction: 1 | -1;
};

type JumpRunHazardVariant = "banana" | "ghost" | "piranha";

type JumpRunHazardVisual = {
  shellColor: string;
  mainColor: string;
  secondaryColor: string;
  accentColor: string;
  minimapColor: string;
  cardColor: string;
  tipColor: string;
  sigil: string;
};

type RuntimePowerupMotion = {
  phase: "rising" | "walking";
  targetY: number;
  vx: number;
  remainingWalkMs: number;
};

type PendingRespawn = {
  until: number;
  startX: number;
  startY: number;
  knockbackDirection: 1 | -1;
  message: string;
  checkpoint: {
    x: number;
    y: number;
  };
};

/* ─── Pixel-art crew faces ─── */
const PixelFaceAda = () => (
  <div className="relative h-full w-full">
    {/* Hair — auburn bob */}
    <div className="absolute left-[12%] top-0 h-[38%] w-[76%] rounded-t-[6px] border-2 border-black bg-amber-700" />
    <div className="absolute left-[6%] top-[18%] h-[22%] w-[18%] rounded-l-[3px] border-2 border-black bg-amber-700" />
    <div className="absolute right-[6%] top-[18%] h-[22%] w-[18%] rounded-r-[3px] border-2 border-black bg-amber-700" />
    {/* Face */}
    <div className="absolute left-[16%] top-[28%] h-[46%] w-[68%] rounded-[4px] border-2 border-black bg-[#ffd8b0]" />
    {/* Glasses */}
    <div className="absolute left-[20%] top-[38%] h-[14%] w-[22%] rounded-[2px] border-2 border-black bg-white/60" />
    <div className="absolute right-[20%] top-[38%] h-[14%] w-[22%] rounded-[2px] border-2 border-black bg-white/60" />
    <div className="absolute left-[42%] top-[42%] h-[2px] w-[16%] bg-black" />
    {/* Eyes */}
    <div className="absolute left-[27%] top-[42%] h-[6%] w-[6%] rounded-full bg-black" />
    <div className="absolute right-[27%] top-[42%] h-[6%] w-[6%] rounded-full bg-black" />
    {/* Smile */}
    <div className="absolute left-[32%] top-[58%] h-[4%] w-[36%] rounded-full border-b-2 border-black" />
    {/* Collar / blouse */}
    <div className="absolute left-[20%] top-[74%] h-[22%] w-[60%] rounded-t-[4px] border-2 border-black bg-amber-100" />
    <div className="absolute left-[38%] top-[76%] h-[6%] w-[24%] rounded-[1px] bg-amber-400" />
  </div>
);

const PixelFaceNova = () => (
  <div className="relative h-full w-full">
    {/* Hair — short neon-green techie cut */}
    <div className="absolute left-[14%] top-0 h-[30%] w-[72%] rounded-t-[6px] border-2 border-black bg-emerald-500" />
    <div className="absolute left-[10%] top-[8%] h-[12%] w-[14%] border-2 border-black bg-emerald-600" />
    {/* Headband / visor */}
    <div className="absolute left-[10%] top-[22%] h-[10%] w-[80%] border-2 border-black bg-lime-300" />
    <div className="absolute right-[12%] top-[23%] h-[8%] w-[8%] rounded-[1px] bg-cyan-400" />
    {/* Face */}
    <div className="absolute left-[16%] top-[30%] h-[44%] w-[68%] rounded-[4px] border-2 border-black bg-[#ffe0c0]" />
    {/* Eyes — slightly angular, confident */}
    <div className="absolute left-[26%] top-[42%] h-[7%] w-[10%] rounded-[1px] bg-black" />
    <div className="absolute right-[26%] top-[42%] h-[7%] w-[10%] rounded-[1px] bg-black" />
    {/* Eye shine */}
    <div className="absolute left-[28%] top-[42%] h-[3%] w-[3%] rounded-full bg-white" />
    <div className="absolute right-[28%] top-[42%] h-[3%] w-[3%] rounded-full bg-white" />
    {/* Grin */}
    <div className="absolute left-[30%] top-[58%] h-[5%] w-[40%] rounded-b-[3px] border-2 border-black bg-white" />
    {/* Jacket */}
    <div className="absolute left-[14%] top-[74%] h-[22%] w-[72%] rounded-t-[3px] border-2 border-black bg-emerald-700" />
    <div className="absolute left-[44%] top-[76%] h-[18%] w-[3px] bg-lime-300" />
  </div>
);

const PixelFaceCoLab = () => (
  <div className="relative h-full w-full">
    {/* Hair — curly blue top */}
    <div className="absolute left-[18%] top-0 h-[26%] w-[64%] rounded-t-[8px] border-2 border-black bg-sky-600" />
    <div className="absolute left-[22%] top-[-4%] h-[14%] w-[16%] rounded-full border-2 border-black bg-sky-500" />
    <div className="absolute left-[42%] top-[-6%] h-[16%] w-[16%] rounded-full border-2 border-black bg-sky-500" />
    <div className="absolute right-[22%] top-[-4%] h-[14%] w-[16%] rounded-full border-2 border-black bg-sky-500" />
    {/* Face */}
    <div className="absolute left-[18%] top-[22%] h-[48%] w-[64%] rounded-[5px] border-2 border-black bg-[#c68642]" />
    {/* Eyes — warm, open */}
    <div className="absolute left-[28%] top-[38%] h-[8%] w-[10%] rounded-full bg-black" />
    <div className="absolute right-[28%] top-[38%] h-[8%] w-[10%] rounded-full bg-black" />
    <div className="absolute left-[30%] top-[38%] h-[4%] w-[4%] rounded-full bg-white" />
    <div className="absolute right-[30%] top-[38%] h-[4%] w-[4%] rounded-full bg-white" />
    {/* Big friendly smile */}
    <div className="absolute left-[28%] top-[54%] h-[8%] w-[44%] rounded-b-[6px] border-2 border-black bg-white" />
    {/* Scarf / bandana */}
    <div className="absolute left-[14%] top-[68%] h-[10%] w-[72%] border-2 border-black bg-cyan-300" />
    {/* Shirt */}
    <div className="absolute left-[18%] top-[76%] h-[20%] w-[64%] rounded-t-[3px] border-2 border-black bg-sky-100" />
    <div className="absolute left-[40%] top-[80%] h-[8%] w-[8%] rounded-full border border-black bg-sky-400" />
  </div>
);

const PixelFaceAnalog = () => (
  <div className="relative h-full w-full">
    {/* Hair — neat bun on top */}
    <div className="absolute left-[30%] top-[-4%] h-[20%] w-[40%] rounded-full border-2 border-black bg-rose-900" />
    <div className="absolute left-[16%] top-[10%] h-[28%] w-[68%] rounded-t-[5px] border-2 border-black bg-rose-900" />
    {/* Hair pin */}
    <div className="absolute right-[24%] top-[2%] h-[12%] w-[3px] bg-rose-300" />
    <div className="absolute right-[22%] top-[0%] h-[4%] w-[8%] rounded-full bg-rose-300" />
    {/* Face */}
    <div className="absolute left-[18%] top-[28%] h-[44%] w-[64%] rounded-[4px] border-2 border-black bg-[#ffd8b0]" />
    {/* Eyes — focused, slightly stern */}
    <div className="absolute left-[26%] top-[38%] h-[3%] w-[14%] bg-black" />
    <div className="absolute right-[26%] top-[38%] h-[3%] w-[14%] bg-black" />
    <div className="absolute left-[28%] top-[42%] h-[7%] w-[8%] rounded-full bg-black" />
    <div className="absolute right-[28%] top-[42%] h-[7%] w-[8%] rounded-full bg-black" />
    {/* Thin mouth — determined */}
    <div className="absolute left-[34%] top-[58%] h-[3%] w-[32%] rounded-[1px] bg-rose-800" />
    {/* High-collar jacket */}
    <div className="absolute left-[14%] top-[72%] h-[6%] w-[72%] border-2 border-black bg-rose-200" />
    <div className="absolute left-[16%] top-[76%] h-[20%] w-[68%] rounded-t-[2px] border-2 border-black bg-rose-700" />
    <div className="absolute left-[44%] top-[78%] h-[4%] w-[12%] rounded-[1px] bg-rose-300" />
  </div>
);

const CREW_FACES: Record<string, () => ReactNode> = {
  ueber: PixelFaceAda,
  durch: PixelFaceNova,
  mit: PixelFaceCoLab,
  trotz: PixelFaceAnalog,
};

const CHARACTERS: Character[] = [
  {
    id: "ueber",
    name: "Prof. Ada Pixel",
    title: "Lernen über KI",
    role: "Die Erklärerin",
    focus: "Begriffe, Funktionsweise, Grenzen",
    key: "Wissens-Schlüssel",
    accent: "from-amber-400 via-orange-400 to-amber-200",
    badge: "bg-amber-300/90",
    icon: <IconBook className="h-6 w-6" />,
  },
  {
    id: "durch",
    name: "Nova Build",
    title: "Lernen durch KI",
    role: "Die Co-Creatorin",
    focus: "KI als Tutor, Generator und Lernbeschleuniger",
    key: "Werkzeug-Schlüssel",
    accent: "from-emerald-400 via-lime-400 to-emerald-200",
    badge: "bg-emerald-300/90",
    icon: <IconRobot className="h-6 w-6" />,
  },
  {
    id: "mit",
    name: "Captain CoLab",
    title: "Lernen mit KI",
    role: "Der Team-Guide",
    focus: "Kooperation Mensch-KI, Rollen, Prompt-Staffel",
    key: "Koop-Schlüssel",
    accent: "from-sky-400 via-cyan-300 to-sky-200",
    badge: "bg-sky-300/90",
    icon: <IconUsers className="h-6 w-6" />,
  },
  {
    id: "trotz",
    name: "Archivarin Analog",
    title: "Lernen trotz KI",
    role: "Die Wächterin",
    focus: "Kritikfähigkeit, Resilienz, Offline-Kompetenz",
    key: "Resilienz-Schlüssel",
    accent: "from-rose-400 via-pink-300 to-rose-200",
    badge: "bg-rose-300/90",
    icon: <IconShieldCheck className="h-6 w-6" />,
  },
];

const WELTKARTE_DOWNLOADS: WeltkarteDownload[] = [
  {
    id: "ueber",
    title: "Lernen über KI",
    description:
      "Materialien zu Systemverständnis, Mustererkennung, Bias und Halluzination — Grundlagen für den professionellen KI-Einsatz.",
    pdfPath: "/downloads/ddki-ueber.pdf",
    accent: "border-amber-500 bg-amber-100/70",
    icon: <IconBrain className="h-6 w-6" />,
  },
  {
    id: "durch",
    title: "Lernen durch KI",
    description:
      "Materialien zu KI-Feedback, adaptiven Lernsystemen und menschlicher Steuerungsverantwortung.",
    pdfPath: "/downloads/ddki-durch.pdf",
    accent: "border-emerald-500 bg-emerald-100/70",
    icon: <IconSparkles className="h-6 w-6" />,
  },
  {
    id: "mit",
    title: "Lernen mit KI",
    description:
      "Materialien zu Ko-Kreation, Prompt-Iteration, Transparenz und Governance-Regeln.",
    pdfPath: "/downloads/ddki-mit.pdf",
    accent: "border-sky-500 bg-sky-100/70",
    icon: <IconUsers className="h-6 w-6" />,
  },
  {
    id: "trotz",
    title: "Lernen trotz KI",
    description:
      "Materialien zu Urteilskraft, Tiefenstruktur-Analyse, Prüfungsvalidität und professioneller Haltung.",
    pdfPath: "/downloads/ddki-trotz.pdf",
    accent: "border-rose-500 bg-rose-100/70",
    icon: <IconShieldCheck className="h-6 w-6" />,
  },
];



const JUMP_RUN_CHAPTERS: Record<JumpRunChapterId, JumpRunChapterConfig> = {
  ueber: {
    id: "ueber",
    title: "Lernen über KI",
    mission:
      "In dieser Welt fehlt das Systemverständnis. Rekonstruiert, wie KI funktioniert, wo sie irrt und welche Verantwortung daraus folgt.",
    leitfragen: [
      "Wie entscheidet KI und woran erkennt man Muster?",
      "Wo liegt die Grenze zwischen Sprachmuster und Verstehen?",
      "Wie entstehen Bias, Halluzination und Manipulation?",
      "Welche pädagogische Konsequenz muss verbindlich sein?",
    ],
    stations: [
      {
        id: "daten-depot",
        mapLabel: "Quick-Draw",
        title: "Level 1: Mustererkennung (Quick Draw)",
        learning:
          "KI ordnet Muster aus Trainingsdaten. Sie kann klassifizieren, versteht aber nicht wie Menschen.",
        question: "Welche Aussage trifft Mustererkennung in KI am besten?",
        options: [
          {
            id: "muster",
            label: "KI bildet Wahrscheinlichkeiten aus Datenmustern.",
            correct: true,
          },
          {
            id: "mensch",
            label: "KI versteht Begriffe wie ein Mensch.",
            correct: false,
          },
          {
            id: "frei",
            label: "KI arbeitet ohne Trainingsdaten.",
            correct: false,
          },
        ],
        reward: "Muster-Log",
      },
      {
        id: "prompt-parkour",
        mapLabel: "Papagei",
        title: "Level 2: Stochastischer Papagei",
        learning:
          "Modelle erzeugen wahrscheinliche Sprachfolgen. Sie klingen überzeugend, ohne echtes Weltverstehen.",
        question: "Wo liegt laut 'stochastischem Papagei' die Grenze?",
        options: [
          {
            id: "sprache",
            label: "Sprachmuster ja, echtes Verstehen nein.",
            correct: true,
          },
          {
            id: "wahrheit",
            label: "Wenn der Satz plausibel klingt, ist er sicher wahr.",
            correct: false,
          },
          {
            id: "bewusst",
            label: "Das Modell hat immer ein bewusstes Ziel.",
            correct: false,
          },
        ],
        reward: "Papagei-Kompass",
      },
      {
        id: "modell-motor",
        mapLabel: "Bias-Lab",
        title: "Level 3: Bias und Manipulation",
        learning:
          "Verzerrte Daten und manipulative Inhalte erzeugen Schieflagen. Professionelles Handeln braucht kritische Prüfung.",
        question: "Was ist ein professioneller Schritt nach einer KI-Ausgabe?",
        options: [
          {
            id: "biascheck",
            label: "Bias prüfen, Quellen klären, Verantwortung benennen.",
            correct: true,
          },
          {
            id: "vertrauen",
            label: "Direkt übernehmen, wenn die Antwort schnell kam.",
            correct: false,
          },
          {
            id: "tempo",
            label: "Tempo ist wichtiger als Prüfung.",
            correct: false,
          },
        ],
        reward: "Bias-Detektor",
      },
      {
        id: "ethik-endboss",
        mapLabel: "BNE-Matrix",
        title: "Level 4: KI, BNE und Gesellschaft",
        learning:
          "Die Black-Box-Perspektive verbindet Technik mit gesellschaftlicher Wirkung und pädagogischer Konsequenz.",
        question: "Welche vier Felder bilden die Black-Box-Matrix?",
        options: [
          {
            id: "matrix",
            label:
              "Funktionsprinzip, erkenntnistheoretische Grenze, gesellschaftliche Wirkung, pädagogische Konsequenz",
            correct: true,
          },
          {
            id: "technik",
            label: "Nur Geschwindigkeit, Skalierung, Motivation, Gamification",
            correct: false,
          },
          {
            id: "didaktik",
            label: "Nur Methodenwahl, Material, Tafelbild, Zeitplan",
            correct: false,
          },
        ],
        reward: "Black-Box-Siegel",
      },
    ],
    dangers: [
      {
        id: "bias-banane",
        title: "Bias-Banane",
        description: "Rutschig: schiefe Datensätze verzerren das Ergebnis.",
        tip: "Tipp: Prüfe Perspektiven, Datenlücken und Gegenbeispiele.",
      },
      {
        id: "halluzinations-hologramm",
        title: "Halluzinations-Hologramm",
        description: "Klingt präzise, aber ohne belastbare Quelle.",
        tip: "Tipp: Fakten prüfen, Quellen vergleichen, Rückfragen stellen.",
      },
      {
        id: "prompt-piranhas",
        title: "Papagei-Piranhas",
        description: "Produzieren Sprachmuster, aber kein echtes Verstehen.",
        tip: "Tipp: Präzise formulieren und Bedeutung kritisch prüfen.",
      },
    ],
  },
  mit: {
    id: "mit",
    title: "Lernen mit KI",
    mission:
      "In dieser Dimension geht es um Kooperation statt Delegation. Testet KI als Partner und formuliert klare Transparenz- und Governance-Regeln.",
    leitfragen: [
      "Wo entsteht Erkenntnis in der Kooperation Mensch-KI?",
      "Wo kippt Kooperation in blinde Delegation?",
      "Wie macht ihr Prompt-Iterationen transparent?",
      "Welche verbindliche 3-Satz-Empfehlung braucht das LI?",
    ],
    stations: [
      {
        id: "daten-depot",
        mapLabel: "Würfel",
        title: "Level 1: Digitaler Würfel",
        learning:
          "Programmiert den KI-Würfel und dokumentiert Iterationen. Nicht nur Output zählt, sondern der Prozess.",
        question: "Was muss im Logbuch bei jeder Iteration stehen?",
        options: [
          {
            id: "prozess",
            label: "Prompt, Entscheidung und Reflexion.",
            correct: true,
          },
          {
            id: "nuroutput",
            label: "Nur das Endergebnis.",
            correct: false,
          },
          {
            id: "blind",
            label: "Keine Doku, Hauptsache schnell.",
            correct: false,
          },
        ],
        reward: "Würfel-Protokoll",
      },
      {
        id: "prompt-parkour",
        mapLabel: "Transfer",
        title: "Level 2: Insel Generative Transformation",
        learning:
          "Ihr erstellt mit einem KI-Tool eine visuelle Umsetzung und trennt Eigenleistung von Tool-Leistung.",
        question: "Welche Reflexion ist professionell?",
        options: [
          {
            id: "eigen",
            label: "Anteil von Eigenleistung, Grenzen und Ethik klar benennen.",
            correct: true,
          },
          {
            id: "wow",
            label: "Nur Wirkung bewerten: sieht gut aus.",
            correct: false,
          },
          {
            id: "tool",
            label: "Alles als KI-Leistung deklarieren.",
            correct: false,
          },
        ],
        reward: "Transformations-Karte",
      },
      {
        id: "modell-motor",
        mapLabel: "Podcast",
        title: "Level 3: Insel Wissensverdichtung",
        learning:
          "Lange Texte in kompakte Formate überführen braucht Struktur und Qualitätskontrolle.",
        question: "Was ist der zentrale Qualitätscheck?",
        options: [
          {
            id: "verkuerzung",
            label: "Prüfen, ob durch Verdichtung Inhalte verzerrt wurden.",
            correct: true,
          },
          {
            id: "tempo",
            label: "Nur auf Geschwindigkeit achten.",
            correct: false,
          },
          {
            id: "stil",
            label: "Nur auf Tonalität achten.",
            correct: false,
          },
        ],
        reward: "Verdichtungs-Siegel",
      },
      {
        id: "ethik-endboss",
        mapLabel: "Governance",
        title: "Level 4: Governance-Ebene",
        learning:
          "Nach allen Inseln formuliert ihr verbindliche Steuerungsfragen für professionelle KI-Kooperation.",
        question: "Welche Frage gehört in die Governance-Ebene?",
        options: [
          {
            id: "transparenz",
            label: "Welche Transparenzregeln braucht das Referendariat?",
            correct: true,
          },
          {
            id: "likes",
            label: "Wie bekommt man mehr Likes für KI-Outputs?",
            correct: false,
          },
          {
            id: "effekte",
            label: "Welche Effekte wirken am coolsten im Unterricht?",
            correct: false,
          },
        ],
        reward: "Governance-Siegel",
      },
    ],
    dangers: [
      {
        id: "bias-banane",
        title: "Delegations-Banane",
        description: "Ihr rutscht aus, wenn KI ungeprüft ganze Entscheidungen übernimmt.",
        tip: "Tipp: Trenne Kooperation, Kontrolle und Verantwortung sichtbar.",
      },
      {
        id: "halluzinations-hologramm",
        title: "Tool-Glitzer",
        description: "Beeindruckender Output verdeckt fehlende Dokumentation.",
        tip: "Tipp: Jede Iteration mit Prompt und Entscheidungsgrund notieren.",
      },
      {
        id: "prompt-piranhas",
        title: "Prompt-Piranhas",
        description: "Unklare Prompts zerpflücken Ziele und Rollen.",
        tip: "Tipp: Rolle, Aufgabe, Kriterien und Grenzen explizit setzen.",
      },
    ],
  },
  durch: {
    id: "durch",
    title: "Lernen durch KI",
    mission:
      "Hier wird KI selbst zum lernsteuernden Akteur. Analysiert Feedbacksysteme, adaptive Logik und menschliche Steuerungsverantwortung.",
    leitfragen: [
      "Wie spezifisch und adaptiv ist KI-Feedback wirklich?",
      "Wer definiert Lernziele und misst Fortschritt?",
      "Wo übernimmt KI Struktur statt Lernende zu aktivieren?",
      "Welche Steuerungsmatrix braucht verbindliche Regeln?",
    ],
    stations: [
      {
        id: "daten-depot",
        mapLabel: "Feedback",
        title: "Level 1: KI-Feedback erleben",
        learning:
          "KI-Feedback kann schnell helfen, bleibt aber oft generisch. Didaktische Steuerung bleibt menschliche Aufgabe.",
        question: "Woran erkennt ihr professionelles KI-Feedback?",
        options: [
          {
            id: "spezifisch",
            label: "Es ist kriterial, spezifisch und nachvollziehbar.",
            correct: true,
          },
          {
            id: "freundlich",
            label: "Es klingt motivierend, egal wie konkret.",
            correct: false,
          },
          {
            id: "lang",
            label: "Es ist möglichst lang und detailliert.",
            correct: false,
          },
        ],
        reward: "Feedback-Lupe",
      },
      {
        id: "prompt-parkour",
        mapLabel: "Adaptiv",
        title: "Level 2: Adaptives Lernsystem",
        learning:
          "Adaptive Systeme wählen Aufgaben und Feedback nach Datenlogik. Prüft Diagnosemodell, Lernziele und blinde Flecken.",
        question: "Welche Analysefrage ist zentral?",
        options: [
          {
            id: "diagnose",
            label: "Welche Logik der Leistungsdiagnose steckt dahinter?",
            correct: true,
          },
          {
            id: "farbe",
            label: "Welche Farben nutzt das Interface?",
            correct: false,
          },
          {
            id: "icon",
            label: "Wie viele Icons sind im Dashboard?",
            correct: false,
          },
        ],
        reward: "System-Scanner",
      },
      {
        id: "modell-motor",
        mapLabel: "Tutor",
        title: "Level 3: Tutor durch Mega-Prompt",
        learning:
          "Ihr baut einen KI-Tutor mit Rolle, Feedbackmodus und Schwierigkeitsanpassung und prüft Transparenz im Steuerungsprozess.",
        question: "Was gehört in einen professionellen Mega-Prompt?",
        options: [
          {
            id: "rolle",
            label: "Rolle, Kriterien, Grenzen, Rückfragen und Adaptionsregeln.",
            correct: true,
          },
          {
            id: "einzeiler",
            label: "Nur ein kurzer Einzeiler ohne Kriterien.",
            correct: false,
          },
          {
            id: "copy",
            label: "Nur Copy-Paste aus fremden Prompts.",
            correct: false,
          },
        ],
        reward: "Tutor-Blueprint",
      },
      {
        id: "ethik-endboss",
        mapLabel: "Steuerung",
        title: "Level 4: Steuerungsmatrix",
        learning:
          "Ordnet Beispiele in die 2x2-Matrix aus menschlicher und algorithmischer Steuerung ein.",
        question: "Wozu dient die Steuerungsmatrix im Kern?",
        options: [
          {
            id: "ordnung",
            label: "Zur klaren Abgrenzung von Verantwortung und Steuerung.",
            correct: true,
          },
          {
            id: "show",
            label: "Zur Show ohne Konsequenzen.",
            correct: false,
          },
          {
            id: "tempo",
            label: "Zur Beschleunigung um jeden Preis.",
            correct: false,
          },
        ],
        reward: "Steuerungs-Siegel",
      },
    ],
    dangers: [
      {
        id: "bias-banane",
        title: "Autopilot-Banane",
        description: "Systeme wirken adaptiv, bleiben aber in festen Diagnosemustern stecken.",
        tip: "Tipp: Frage nach Lernziel-Logik, nicht nur nach Effizienz.",
      },
      {
        id: "halluzinations-hologramm",
        title: "Feedback-Fata-Morgana",
        description: "Klingt differenziert, bleibt aber generisch.",
        tip: "Tipp: Prüfe Spezifität, Bezug zum Text und Folgeaufgaben.",
      },
      {
        id: "prompt-piranhas",
        title: "Tutor-Piranhas",
        description: "Unklare Rollen im Prompt fressen die didaktische Steuerung auf.",
        tip: "Tipp: Definiere Rolle, Rubrik und Abbruchkriterien.",
      },
    ],
  },
  trotz: {
    id: "trotz",
    title: "Lernen trotz KI",
    mission:
      "In der Welt der perfekten Entwürfe planen Menschen nicht mehr selbst. Baut eine professionelle Warum-Begründung gegen blinde Delegation.",
    leitfragen: [
      "Wo fehlt Urteilskraft im KI-Entwurf?",
      "Wo verschwindet Verantwortung?",
      "Welche normativen Leerstellen bleiben unsichtbar?",
      "Welche 3-Satz-Position ist für das LI verbindlich?",
    ],
    stations: [
      {
        id: "daten-depot",
        mapLabel: "Diagnose",
        title: "Level 1: Diagnose KI-Entwurf",
        learning:
          "Analysiert Oberfläche, didaktische Tiefenstruktur und Situationsbezug statt nur Stil und Tempo.",
        question: "Welcher Befund zeigt eine didaktische Leerstelle?",
        options: [
          {
            id: "anschluss",
            label: "Ziele, Aufgaben und Sicherung sind nicht aufeinander abgestimmt.",
            correct: true,
          },
          {
            id: "layout",
            label: "Die Schriftgröße ist nicht optimal.",
            correct: false,
          },
          {
            id: "emoji",
            label: "Es fehlen dekorative Emojis.",
            correct: false,
          },
        ],
        reward: "Diagnose-Raster",
      },
      {
        id: "prompt-parkour",
        mapLabel: "Failure",
        title: "Level 2: Failure-Modes bündeln",
        learning:
          "Verdichtet Befunde in klare Problembereiche wie Generalisierung, Pseudobegründung und normative Blindstellen.",
        question: "Welcher Punkt ist ein typischer Failure-Mode?",
        options: [
          {
            id: "pseudo",
            label: "Pseudobegründungen ohne professionelle Kriterien.",
            correct: true,
          },
          {
            id: "lang",
            label: "Der Text ist kurz und knapp.",
            correct: false,
          },
          {
            id: "tabelle",
            label: "Es wurde eine Tabelle verwendet.",
            correct: false,
          },
        ],
        reward: "Failure-Matrix",
      },
      {
        id: "modell-motor",
        mapLabel: "Leitfragen",
        title: "Level 3: Leitfragen für das LI",
        learning:
          "Formuliert Leitfragen zu Ausbildungszielen, Prüfungsvalidität und Governance-Transparenz.",
        question: "Welche Leitfrage ist professionell?",
        options: [
          {
            id: "valid",
            label: "Wie sichern Prüfungsformate Eigenleistung trotz KI?",
            correct: true,
          },
          {
            id: "hype",
            label: "Wie wirkt der Unterricht maximal futuristisch?",
            correct: false,
          },
          {
            id: "trend",
            label: "Welches Tool ist gerade am trendigsten?",
            correct: false,
          },
        ],
        reward: "Leitfragen-Set",
      },
      {
        id: "ethik-endboss",
        mapLabel: "Warum",
        title: "Level 4: Professionelle Warum-Begründung",
        learning:
          "Formuliert Professionalisierung, Erkenntnisargument und Prüfungsargument als verbindliche Position.",
        question: "Welche Dreifach-Begründung stabilisiert die Welt?",
        options: [
          {
            id: "dreifach",
            label: "Urteilskraft, Denkprozess, Validität und Eigenleistung.",
            correct: true,
          },
          {
            id: "technik",
            label: "Nur Effizienz und Tool-Komfort.",
            correct: false,
          },
          {
            id: "tempo",
            label: "Nur Beschleunigung der Vorbereitung.",
            correct: false,
          },
        ],
        reward: "Warum-Siegel",
      },
    ],
    dangers: [
      {
        id: "bias-banane",
        title: "Delegations-Banane",
        description: "Wenn KI den Entwurf liefert, rutscht Verantwortung weg.",
        tip: "Tipp: Frage immer nach Urteilskraft und professioneller Begründung.",
      },
      {
        id: "halluzinations-hologramm",
        title: "Perfekt-Entwurf-Hologramm",
        description: "Formal stark, didaktisch dünn.",
        tip: "Tipp: Prüfe Tiefenstruktur, Situationsbezug und Zielklarheit.",
      },
      {
        id: "prompt-piranhas",
        title: "Normen-Piranhas",
        description: "Normative Fragen verschwinden hinter glatten Formulierungen.",
        tip: "Tipp: Benenne Verantwortung, Prüfung und Governance explizit.",
      },
    ],
  },
};

const JUMP_RUN_WORLD_UEBER = {
  width: 3000,
  height: 360,
};

const JUMP_RUN_WORLD_MIT = {
  width: 3200,
  height: 360,
};

const JUMP_RUN_WORLD_DURCH = {
  width: 3400,
  height: 360,
};

const JUMP_RUN_WORLD_TROTZ = {
  width: 3100,
  height: 360,
};

const JUMP_RUN_GROUND_HEIGHT = 40;

const JUMP_RUN_PLAYER = {
  width: 26,
  height: 32,
};

const JUMP_RUN_PHYSICS = {
  gravity: 1600,
  moveSpeed: 260,
  jumpVelocity: -520,
};

const JUMP_RUN_POWERUP_MOTION = {
  riseSpeed: 180,
  walkSpeed: 95,
  walkDurationMs: 850,
};

const JUMP_RUN_HIT_EFFECT = {
  flashMs: 320,
  knockbackMs: 220,
  knockbackDistance: 42,
  knockbackArcHeight: 18,
};

const JUMP_RUN_PLAYER_POWER_EFFECT = {
  baseScale: 1.22,
  pulseScale: 1.32,
  pulseMs: 260,
};

const JUMP_RUN_MAX_LIVES = 6;

const createGroundPlatform = (world: { width: number; height: number }): JumpRunPlatform => ({
  id: "ground",
  x: 0,
  y: world.height - JUMP_RUN_GROUND_HEIGHT,
  width: world.width,
  height: JUMP_RUN_GROUND_HEIGHT,
});

const JUMP_RUN_THEMES: Record<JumpRunChapterId, JumpRunMapTheme> = {
  ueber: {
    skyTop: "#dbeafe",
    skyMid: "#93c5fd",
    horizonTop: "#bfdbfe",
    horizonBottom: "#86efac",
    gridColor: "rgba(30, 64, 175, 0.18)",
    cloudColor: "rgba(255,255,255,0.82)",
    cloudShadow: "rgba(30, 41, 59, 0.2)",
    auraColor: "rgba(255,255,255,0.66)",
    groundColor: "#d97706",
    groundShadow: "rgba(120, 53, 15, 0.45)",
    platformColor: "#a7f3d0",
    platformShadow: "#0f172a",
  },
  mit: {
    skyTop: "#fef3c7",
    skyMid: "#fca5a5",
    horizonTop: "#fbcfe8",
    horizonBottom: "#a5f3fc",
    gridColor: "rgba(124, 45, 18, 0.2)",
    cloudColor: "rgba(255, 247, 237, 0.85)",
    cloudShadow: "rgba(127, 29, 29, 0.22)",
    auraColor: "rgba(255, 237, 213, 0.68)",
    groundColor: "#92400e",
    groundShadow: "rgba(68, 64, 60, 0.4)",
    platformColor: "#fde68a",
    platformShadow: "#3f3f46",
  },
  durch: {
    skyTop: "#1e1b4b",
    skyMid: "#312e81",
    horizonTop: "#4338ca",
    horizonBottom: "#14b8a6",
    gridColor: "rgba(129, 140, 248, 0.28)",
    cloudColor: "rgba(191, 219, 254, 0.42)",
    cloudShadow: "rgba(15, 23, 42, 0.5)",
    auraColor: "rgba(129, 140, 248, 0.35)",
    groundColor: "#1f2937",
    groundShadow: "rgba(2, 6, 23, 0.55)",
    platformColor: "#67e8f9",
    platformShadow: "#0f172a",
  },
  trotz: {
    skyTop: "#fee2e2",
    skyMid: "#fda4af",
    horizonTop: "#fecdd3",
    horizonBottom: "#e2e8f0",
    gridColor: "rgba(159, 18, 57, 0.2)",
    cloudColor: "rgba(255, 241, 242, 0.82)",
    cloudShadow: "rgba(136, 19, 55, 0.25)",
    auraColor: "rgba(254, 226, 226, 0.7)",
    groundColor: "#7f1d1d",
    groundShadow: "rgba(69, 10, 10, 0.48)",
    platformColor: "#fecdd3",
    platformShadow: "#3f3f46",
  },
};

const JUMP_RUN_MAPS: Record<JumpRunMapId, JumpRunMapConfig> = {
  "ueber-citadel": {
    id: "ueber-citadel",
    chapterId: "ueber",
    label: "Map Ueber: Erkenntnis-Zitadelle",
    theme: JUMP_RUN_THEMES.ueber,
    world: JUMP_RUN_WORLD_UEBER,
    start: {
      x: 40,
      y: JUMP_RUN_WORLD_UEBER.height - JUMP_RUN_GROUND_HEIGHT - JUMP_RUN_PLAYER.height,
    },
    platforms: [
      createGroundPlatform(JUMP_RUN_WORLD_UEBER),
      { id: "u-p1", x: 180, y: 258, width: 180, height: 16 },
      { id: "u-p2", x: 430, y: 228, width: 170, height: 16 },
      { id: "u-p3", x: 690, y: 206, width: 185, height: 16 },
      { id: "u-p4", x: 970, y: 244, width: 165, height: 16 },
      { id: "u-p5", x: 1230, y: 218, width: 180, height: 16 },
      { id: "u-p6", x: 1510, y: 190, width: 175, height: 16 },
      { id: "u-p7", x: 1790, y: 236, width: 170, height: 16 },
      { id: "u-p8", x: 2060, y: 205, width: 180, height: 16 },
      { id: "u-p9", x: 2320, y: 174, width: 170, height: 16 },
      { id: "u-p10", x: 2580, y: 230, width: 185, height: 16 },
    ],
    stationZones: [
      { id: "daten-depot", label: "Station 1", x: 220, y: 222, width: 110, height: 36 },
      { id: "prompt-parkour", label: "Station 2", x: 1010, y: 208, width: 110, height: 36 },
      { id: "modell-motor", label: "Station 3", x: 1820, y: 200, width: 110, height: 36 },
      { id: "ethik-endboss", label: "Station 4", x: 2350, y: 138, width: 120, height: 36 },
    ],
    hazardZones: [
      {
        id: "u-h1",
        label: "Bias-Bahn",
        dangerId: "bias-banane",
        x: 520,
        y: 300,
        width: 60,
        height: 20,
        moving: {
          axis: "x",
          min: 470,
          max: 700,
          speed: 78,
          startDirection: 1,
        },
      },
      {
        id: "u-h2",
        label: "Hallu-Drift",
        dangerId: "halluzinations-hologramm",
        x: 1360,
        y: 300,
        width: 62,
        height: 20,
        moving: {
          axis: "x",
          min: 1300,
          max: 1510,
          speed: 84,
          startDirection: -1,
        },
      },
      {
        id: "u-h3",
        label: "Prompt-Schwarm",
        dangerId: "prompt-piranhas",
        x: 2140,
        y: 300,
        width: 65,
        height: 20,
        moving: {
          axis: "x",
          min: 2070,
          max: 2280,
          speed: 90,
          startDirection: 1,
        },
      },
      {
        id: "u-h4",
        label: "Hallu-Orb",
        dangerId: "halluzinations-hologramm",
        x: 2460,
        y: 146,
        width: 58,
        height: 20,
        moving: {
          axis: "y",
          min: 130,
          max: 245,
          speed: 58,
          startDirection: 1,
        },
      },
    ],
    collectibles: [
      { id: "u-bit-1", label: "Datenbit 1", x: 120, y: 286, size: 14, points: 25 },
      { id: "u-bit-2", label: "Datenbit 2", x: 240, y: 236, size: 14, points: 25 },
      { id: "u-bit-3", label: "Datenbit 3", x: 470, y: 202, size: 14, points: 25 },
      { id: "u-bit-4", label: "Datenbit 4", x: 740, y: 180, size: 14, points: 25 },
      { id: "u-bit-5", label: "Datenbit 5", x: 1020, y: 218, size: 14, points: 25 },
      { id: "u-bit-6", label: "Datenbit 6", x: 1260, y: 190, size: 14, points: 25 },
      { id: "u-bit-7", label: "Datenbit 7", x: 1550, y: 162, size: 14, points: 25 },
      { id: "u-bit-8", label: "Datenbit 8", x: 1820, y: 210, size: 14, points: 25 },
      { id: "u-bit-9", label: "Datenbit 9", x: 1980, y: 286, size: 14, points: 25 },
      { id: "u-bit-10", label: "Datenbit 10", x: 2080, y: 173, size: 14, points: 25 },
      { id: "u-bit-11", label: "Datenbit 11", x: 2360, y: 140, size: 14, points: 25 },
      { id: "u-bit-12", label: "Datenbit 12", x: 2500, y: 286, size: 14, points: 25 },
      { id: "u-bit-13", label: "Datenbit 13", x: 2700, y: 214, size: 14, points: 25 },
      { id: "u-bit-14", label: "Datenbit 14", x: 2860, y: 286, size: 14, points: 25 },
    ],
    questionBlocks: [
      { id: "u-q-1", label: "?-Block 1", x: 610, y: 176, width: 30, height: 30, powerupId: "u-m-1" },
      { id: "u-q-2", label: "?-Block 2", x: 1680, y: 160, width: 30, height: 30, powerupId: "u-m-2" },
      { id: "u-q-3", label: "?-Block 3", x: 2450, y: 144, width: 30, height: 30, powerupId: "u-m-3" },
      { id: "u-q-4", label: "?-Block 4", x: 2860, y: 248, width: 30, height: 30, powerupId: "u-m-4" },
    ],
    powerups: [
      {
        id: "u-m-1",
        label: "Super-Pilz 1",
        x: 611,
        y: 146,
        width: 28,
        height: 30,
        extraLives: 1,
        spawnedByBlockId: "u-q-1",
      },
      {
        id: "u-m-2",
        label: "Super-Pilz 2",
        x: 1681,
        y: 130,
        width: 28,
        height: 30,
        extraLives: 1,
        spawnedByBlockId: "u-q-2",
      },
      {
        id: "u-m-3",
        label: "Super-Pilz 3",
        x: 2451,
        y: 114,
        width: 28,
        height: 30,
        extraLives: 1,
        spawnedByBlockId: "u-q-3",
      },
      {
        id: "u-m-4",
        label: "Super-Pilz 4",
        x: 2861,
        y: 218,
        width: 28,
        height: 30,
        extraLives: 1,
        spawnedByBlockId: "u-q-4",
      },
    ],
    finishZone: {
      id: "finish",
      label: "Ziel",
      x: 2920,
      y: 236,
      width: 52,
      height: 84,
    },
    backgroundClass: "bg-sky-100",
  },
  "mit-archipelago": {
    id: "mit-archipelago",
    chapterId: "mit",
    label: "Map Mit: Kooperations-Archipel",
    theme: JUMP_RUN_THEMES.mit,
    world: JUMP_RUN_WORLD_MIT,
    start: {
      x: 36,
      y: JUMP_RUN_WORLD_MIT.height - JUMP_RUN_GROUND_HEIGHT - JUMP_RUN_PLAYER.height,
    },
    platforms: [
      createGroundPlatform(JUMP_RUN_WORLD_MIT),
      { id: "m-p1", x: 150, y: 252, width: 170, height: 16 },
      { id: "m-p2", x: 390, y: 220, width: 165, height: 16 },
      { id: "m-p3", x: 650, y: 250, width: 170, height: 16 },
      { id: "m-p4", x: 900, y: 208, width: 175, height: 16 },
      { id: "m-p5", x: 1180, y: 176, width: 165, height: 16 },
      { id: "m-p6", x: 1440, y: 226, width: 170, height: 16 },
      { id: "m-p7", x: 1700, y: 194, width: 160, height: 16 },
      { id: "m-p8", x: 1960, y: 242, width: 170, height: 16 },
      { id: "m-p9", x: 2220, y: 212, width: 170, height: 16 },
      { id: "m-p10", x: 2480, y: 178, width: 160, height: 16 },
      { id: "m-p11", x: 2740, y: 232, width: 180, height: 16 },
    ],
    stationZones: [
      { id: "daten-depot", label: "Station 1", x: 180, y: 216, width: 110, height: 36 },
      { id: "prompt-parkour", label: "Station 2", x: 930, y: 172, width: 110, height: 36 },
      { id: "modell-motor", label: "Station 3", x: 1730, y: 158, width: 110, height: 36 },
      { id: "ethik-endboss", label: "Station 4", x: 2505, y: 142, width: 120, height: 36 },
    ],
    hazardZones: [
      {
        id: "m-h1",
        label: "Koop-Banane",
        dangerId: "bias-banane",
        x: 540,
        y: 300,
        width: 60,
        height: 20,
        moving: {
          axis: "x",
          min: 480,
          max: 720,
          speed: 82,
          startDirection: 1,
        },
      },
      {
        id: "m-h2",
        label: "Glitzer-Orb",
        dangerId: "halluzinations-hologramm",
        x: 1280,
        y: 144,
        width: 58,
        height: 20,
        moving: {
          axis: "y",
          min: 130,
          max: 250,
          speed: 54,
          startDirection: 1,
        },
      },
      {
        id: "m-h3",
        label: "Prompt-Schwarm",
        dangerId: "prompt-piranhas",
        x: 2060,
        y: 300,
        width: 66,
        height: 20,
        moving: {
          axis: "x",
          min: 1980,
          max: 2230,
          speed: 92,
          startDirection: -1,
        },
      },
      {
        id: "m-h4",
        label: "Delegations-Rutsch",
        dangerId: "bias-banane",
        x: 2840,
        y: 300,
        width: 64,
        height: 20,
        moving: {
          axis: "x",
          min: 2780,
          max: 3030,
          speed: 96,
          startDirection: 1,
        },
      },
    ],
    collectibles: [
      { id: "m-bit-1", label: "Datenbit 1", x: 110, y: 286, size: 14, points: 25 },
      { id: "m-bit-2", label: "Datenbit 2", x: 230, y: 232, size: 14, points: 25 },
      { id: "m-bit-3", label: "Datenbit 3", x: 430, y: 194, size: 14, points: 25 },
      { id: "m-bit-4", label: "Datenbit 4", x: 690, y: 230, size: 14, points: 25 },
      { id: "m-bit-5", label: "Datenbit 5", x: 940, y: 170, size: 14, points: 25 },
      { id: "m-bit-6", label: "Datenbit 6", x: 1200, y: 142, size: 14, points: 25 },
      { id: "m-bit-7", label: "Datenbit 7", x: 1470, y: 202, size: 14, points: 25 },
      { id: "m-bit-8", label: "Datenbit 8", x: 1750, y: 166, size: 14, points: 25 },
      { id: "m-bit-9", label: "Datenbit 9", x: 1990, y: 228, size: 14, points: 25 },
      { id: "m-bit-10", label: "Datenbit 10", x: 2250, y: 198, size: 14, points: 25 },
      { id: "m-bit-11", label: "Datenbit 11", x: 2510, y: 164, size: 14, points: 25 },
      { id: "m-bit-12", label: "Datenbit 12", x: 2770, y: 218, size: 14, points: 25 },
      { id: "m-bit-13", label: "Datenbit 13", x: 2950, y: 286, size: 14, points: 25 },
      { id: "m-bit-14", label: "Datenbit 14", x: 3070, y: 286, size: 14, points: 25 },
    ],
    questionBlocks: [
      { id: "m-q-1", label: "?-Block 1", x: 730, y: 186, width: 30, height: 30, powerupId: "m-m-1" },
      { id: "m-q-2", label: "?-Block 2", x: 1540, y: 192, width: 30, height: 30, powerupId: "m-m-2" },
      { id: "m-q-3", label: "?-Block 3", x: 2330, y: 178, width: 30, height: 30, powerupId: "m-m-3" },
      { id: "m-q-4", label: "?-Block 4", x: 3010, y: 248, width: 30, height: 30, powerupId: "m-m-4" },
    ],
    powerups: [
      {
        id: "m-m-1",
        label: "Super-Pilz 1",
        x: 731,
        y: 156,
        width: 28,
        height: 30,
        extraLives: 1,
        spawnedByBlockId: "m-q-1",
      },
      {
        id: "m-m-2",
        label: "Super-Pilz 2",
        x: 1541,
        y: 162,
        width: 28,
        height: 30,
        extraLives: 1,
        spawnedByBlockId: "m-q-2",
      },
      {
        id: "m-m-3",
        label: "Super-Pilz 3",
        x: 2331,
        y: 148,
        width: 28,
        height: 30,
        extraLives: 1,
        spawnedByBlockId: "m-q-3",
      },
      {
        id: "m-m-4",
        label: "Super-Pilz 4",
        x: 3011,
        y: 218,
        width: 28,
        height: 30,
        extraLives: 1,
        spawnedByBlockId: "m-q-4",
      },
    ],
    finishZone: {
      id: "finish",
      label: "Ziel",
      x: 3138,
      y: 238,
      width: 48,
      height: 82,
    },
    backgroundClass: "bg-cyan-100",
  },
  "durch-lab": {
    id: "durch-lab",
    chapterId: "durch",
    label: "Map Durch: Steuerungs-Labor",
    theme: JUMP_RUN_THEMES.durch,
    world: JUMP_RUN_WORLD_DURCH,
    start: {
      x: 34,
      y: JUMP_RUN_WORLD_DURCH.height - JUMP_RUN_GROUND_HEIGHT - JUMP_RUN_PLAYER.height,
    },
    platforms: [
      createGroundPlatform(JUMP_RUN_WORLD_DURCH),
      { id: "dr-p1", x: 140, y: 260, width: 170, height: 16 },
      { id: "dr-p2", x: 380, y: 232, width: 170, height: 16 },
      { id: "dr-p3", x: 620, y: 206, width: 175, height: 16 },
      { id: "dr-p4", x: 870, y: 240, width: 170, height: 16 },
      { id: "dr-p5", x: 1120, y: 210, width: 175, height: 16 },
      { id: "dr-p6", x: 1380, y: 182, width: 170, height: 16 },
      { id: "dr-p7", x: 1650, y: 226, width: 170, height: 16 },
      { id: "dr-p8", x: 1910, y: 196, width: 170, height: 16 },
      { id: "dr-p9", x: 2170, y: 168, width: 170, height: 16 },
      { id: "dr-p10", x: 2430, y: 222, width: 170, height: 16 },
      { id: "dr-p11", x: 2700, y: 192, width: 170, height: 16 },
      { id: "dr-p12", x: 2980, y: 162, width: 170, height: 16 },
      { id: "dr-p13", x: 3220, y: 230, width: 170, height: 16 },
    ],
    stationZones: [
      { id: "daten-depot", label: "Station 1", x: 170, y: 224, width: 110, height: 36 },
      { id: "prompt-parkour", label: "Station 2", x: 1150, y: 174, width: 110, height: 36 },
      { id: "modell-motor", label: "Station 3", x: 1935, y: 160, width: 110, height: 36 },
      { id: "ethik-endboss", label: "Station 4", x: 3005, y: 126, width: 120, height: 36 },
    ],
    hazardZones: [
      {
        id: "dr-h1",
        label: "Autopilot-Rutsch",
        dangerId: "bias-banane",
        x: 500,
        y: 300,
        width: 60,
        height: 20,
        moving: {
          axis: "x",
          min: 460,
          max: 690,
          speed: 80,
          startDirection: 1,
        },
      },
      {
        id: "dr-h2",
        label: "Feedback-Orb",
        dangerId: "halluzinations-hologramm",
        x: 1460,
        y: 142,
        width: 60,
        height: 20,
        moving: {
          axis: "y",
          min: 126,
          max: 238,
          speed: 60,
          startDirection: -1,
        },
      },
      {
        id: "dr-h3",
        label: "Tutor-Schwarm",
        dangerId: "prompt-piranhas",
        x: 2280,
        y: 300,
        width: 68,
        height: 20,
        moving: {
          axis: "x",
          min: 2200,
          max: 2450,
          speed: 96,
          startDirection: 1,
        },
      },
      {
        id: "dr-h4",
        label: "Diagnose-Orb",
        dangerId: "halluzinations-hologramm",
        x: 3090,
        y: 132,
        width: 58,
        height: 20,
        moving: {
          axis: "y",
          min: 118,
          max: 232,
          speed: 62,
          startDirection: 1,
        },
      },
    ],
    collectibles: [
      { id: "dr-bit-1", label: "Datenbit 1", x: 120, y: 286, size: 14, points: 25 },
      { id: "dr-bit-2", label: "Datenbit 2", x: 250, y: 238, size: 14, points: 25 },
      { id: "dr-bit-3", label: "Datenbit 3", x: 440, y: 204, size: 14, points: 25 },
      { id: "dr-bit-4", label: "Datenbit 4", x: 690, y: 182, size: 14, points: 25 },
      { id: "dr-bit-5", label: "Datenbit 5", x: 920, y: 208, size: 14, points: 25 },
      { id: "dr-bit-6", label: "Datenbit 6", x: 1140, y: 176, size: 14, points: 25 },
      { id: "dr-bit-7", label: "Datenbit 7", x: 1410, y: 148, size: 14, points: 25 },
      { id: "dr-bit-8", label: "Datenbit 8", x: 1680, y: 192, size: 14, points: 25 },
      { id: "dr-bit-9", label: "Datenbit 9", x: 1940, y: 160, size: 14, points: 25 },
      { id: "dr-bit-10", label: "Datenbit 10", x: 2200, y: 136, size: 14, points: 25 },
      { id: "dr-bit-11", label: "Datenbit 11", x: 2460, y: 188, size: 14, points: 25 },
      { id: "dr-bit-12", label: "Datenbit 12", x: 2720, y: 158, size: 14, points: 25 },
      { id: "dr-bit-13", label: "Datenbit 13", x: 3000, y: 126, size: 14, points: 25 },
      { id: "dr-bit-14", label: "Datenbit 14", x: 3160, y: 210, size: 14, points: 25 },
      { id: "dr-bit-15", label: "Datenbit 15", x: 3290, y: 286, size: 14, points: 25 },
      { id: "dr-bit-16", label: "Datenbit 16", x: 3360, y: 286, size: 14, points: 25 },
    ],
    questionBlocks: [
      { id: "dr-q-1", label: "?-Block 1", x: 760, y: 176, width: 30, height: 30, powerupId: "dr-m-1" },
      { id: "dr-q-2", label: "?-Block 2", x: 1750, y: 160, width: 30, height: 30, powerupId: "dr-m-2" },
      { id: "dr-q-3", label: "?-Block 3", x: 2520, y: 186, width: 30, height: 30, powerupId: "dr-m-3" },
      { id: "dr-q-4", label: "?-Block 4", x: 3260, y: 248, width: 30, height: 30, powerupId: "dr-m-4" },
    ],
    powerups: [
      {
        id: "dr-m-1",
        label: "Super-Pilz 1",
        x: 761,
        y: 146,
        width: 28,
        height: 30,
        extraLives: 1,
        spawnedByBlockId: "dr-q-1",
      },
      {
        id: "dr-m-2",
        label: "Super-Pilz 2",
        x: 1751,
        y: 130,
        width: 28,
        height: 30,
        extraLives: 1,
        spawnedByBlockId: "dr-q-2",
      },
      {
        id: "dr-m-3",
        label: "Super-Pilz 3",
        x: 2521,
        y: 156,
        width: 28,
        height: 30,
        extraLives: 1,
        spawnedByBlockId: "dr-q-3",
      },
      {
        id: "dr-m-4",
        label: "Super-Pilz 4",
        x: 3261,
        y: 218,
        width: 28,
        height: 30,
        extraLives: 1,
        spawnedByBlockId: "dr-q-4",
      },
    ],
    finishZone: {
      id: "finish",
      label: "Ziel",
      x: 3340,
      y: 236,
      width: 50,
      height: 84,
    },
    backgroundClass: "bg-indigo-100",
  },
  "trotz-fortress": {
    id: "trotz-fortress",
    chapterId: "trotz",
    label: "Map Trotz: Resilienz-Festung",
    theme: JUMP_RUN_THEMES.trotz,
    world: JUMP_RUN_WORLD_TROTZ,
    start: {
      x: 38,
      y: JUMP_RUN_WORLD_TROTZ.height - JUMP_RUN_GROUND_HEIGHT - JUMP_RUN_PLAYER.height,
    },
    platforms: [
      createGroundPlatform(JUMP_RUN_WORLD_TROTZ),
      { id: "t-p1", x: 160, y: 254, width: 170, height: 16 },
      { id: "t-p2", x: 420, y: 226, width: 170, height: 16 },
      { id: "t-p3", x: 680, y: 198, width: 170, height: 16 },
      { id: "t-p4", x: 940, y: 238, width: 170, height: 16 },
      { id: "t-p5", x: 1190, y: 206, width: 170, height: 16 },
      { id: "t-p6", x: 1460, y: 176, width: 170, height: 16 },
      { id: "t-p7", x: 1710, y: 220, width: 170, height: 16 },
      { id: "t-p8", x: 1980, y: 188, width: 170, height: 16 },
      { id: "t-p9", x: 2240, y: 160, width: 170, height: 16 },
      { id: "t-p10", x: 2510, y: 214, width: 170, height: 16 },
      { id: "t-p11", x: 2780, y: 184, width: 170, height: 16 },
    ],
    stationZones: [
      { id: "daten-depot", label: "Station 1", x: 190, y: 218, width: 110, height: 36 },
      { id: "prompt-parkour", label: "Station 2", x: 970, y: 202, width: 110, height: 36 },
      { id: "modell-motor", label: "Station 3", x: 1740, y: 184, width: 110, height: 36 },
      { id: "ethik-endboss", label: "Station 4", x: 2270, y: 124, width: 120, height: 36 },
    ],
    hazardZones: [
      {
        id: "t-h1",
        label: "Kritik-Rutsch",
        dangerId: "bias-banane",
        x: 560,
        y: 300,
        width: 60,
        height: 20,
        moving: {
          axis: "x",
          min: 510,
          max: 740,
          speed: 80,
          startDirection: 1,
        },
      },
      {
        id: "t-h2",
        label: "Perfekt-Orb",
        dangerId: "halluzinations-hologramm",
        x: 1320,
        y: 138,
        width: 58,
        height: 20,
        moving: {
          axis: "y",
          min: 122,
          max: 236,
          speed: 57,
          startDirection: 1,
        },
      },
      {
        id: "t-h3",
        label: "Normen-Schwarm",
        dangerId: "prompt-piranhas",
        x: 2100,
        y: 300,
        width: 66,
        height: 20,
        moving: {
          axis: "x",
          min: 2020,
          max: 2290,
          speed: 92,
          startDirection: -1,
        },
      },
      {
        id: "t-h4",
        label: "Delegations-Rutsch",
        dangerId: "bias-banane",
        x: 2860,
        y: 300,
        width: 64,
        height: 20,
        moving: {
          axis: "x",
          min: 2790,
          max: 3010,
          speed: 100,
          startDirection: 1,
        },
      },
    ],
    collectibles: [
      { id: "t-bit-1", label: "Datenbit 1", x: 120, y: 286, size: 14, points: 25 },
      { id: "t-bit-2", label: "Datenbit 2", x: 240, y: 234, size: 14, points: 25 },
      { id: "t-bit-3", label: "Datenbit 3", x: 470, y: 198, size: 14, points: 25 },
      { id: "t-bit-4", label: "Datenbit 4", x: 730, y: 170, size: 14, points: 25 },
      { id: "t-bit-5", label: "Datenbit 5", x: 980, y: 202, size: 14, points: 25 },
      { id: "t-bit-6", label: "Datenbit 6", x: 1210, y: 170, size: 14, points: 25 },
      { id: "t-bit-7", label: "Datenbit 7", x: 1480, y: 142, size: 14, points: 25 },
      { id: "t-bit-8", label: "Datenbit 8", x: 1730, y: 186, size: 14, points: 25 },
      { id: "t-bit-9", label: "Datenbit 9", x: 2000, y: 154, size: 14, points: 25 },
      { id: "t-bit-10", label: "Datenbit 10", x: 2260, y: 122, size: 14, points: 25 },
      { id: "t-bit-11", label: "Datenbit 11", x: 2520, y: 178, size: 14, points: 25 },
      { id: "t-bit-12", label: "Datenbit 12", x: 2790, y: 150, size: 14, points: 25 },
      { id: "t-bit-13", label: "Datenbit 13", x: 2950, y: 286, size: 14, points: 25 },
      { id: "t-bit-14", label: "Datenbit 14", x: 3040, y: 286, size: 14, points: 25 },
    ],
    questionBlocks: [
      { id: "t-q-1", label: "?-Block 1", x: 770, y: 168, width: 30, height: 30, powerupId: "t-m-1" },
      { id: "t-q-2", label: "?-Block 2", x: 1540, y: 154, width: 30, height: 30, powerupId: "t-m-2" },
      { id: "t-q-3", label: "?-Block 3", x: 2360, y: 150, width: 30, height: 30, powerupId: "t-m-3" },
      { id: "t-q-4", label: "?-Block 4", x: 2980, y: 248, width: 30, height: 30, powerupId: "t-m-4" },
    ],
    powerups: [
      {
        id: "t-m-1",
        label: "Super-Pilz 1",
        x: 771,
        y: 138,
        width: 28,
        height: 30,
        extraLives: 1,
        spawnedByBlockId: "t-q-1",
      },
      {
        id: "t-m-2",
        label: "Super-Pilz 2",
        x: 1541,
        y: 124,
        width: 28,
        height: 30,
        extraLives: 1,
        spawnedByBlockId: "t-q-2",
      },
      {
        id: "t-m-3",
        label: "Super-Pilz 3",
        x: 2361,
        y: 120,
        width: 28,
        height: 30,
        extraLives: 1,
        spawnedByBlockId: "t-q-3",
      },
      {
        id: "t-m-4",
        label: "Super-Pilz 4",
        x: 2981,
        y: 218,
        width: 28,
        height: 30,
        extraLives: 1,
        spawnedByBlockId: "t-q-4",
      },
    ],
    finishZone: {
      id: "finish",
      label: "Ziel",
      x: 3048,
      y: 236,
      width: 46,
      height: 84,
    },
    backgroundClass: "bg-rose-100",
  },
};

const JUMP_RUN_CHAPTER_MAP: Record<JumpRunChapterId, JumpRunMapId> = {
  ueber: "ueber-citadel",
  mit: "mit-archipelago",
  durch: "durch-lab",
  trotz: "trotz-fortress",
};

const JUMP_RUN_DIFFICULTIES: Record<JumpRunDifficultyId, JumpRunDifficultyConfig> = {
  easy: {
    id: "easy",
    label: "Easy",
    lives: 4,
    speedMultiplier: 0.93,
    gravityMultiplier: 0.94,
    jumpMultiplier: 1.08,
    hazardSpeedMultiplier: 0.75,
    hardExtraHazards: [],
  },
  normal: {
    id: "normal",
    label: "Normal",
    lives: 3,
    speedMultiplier: 1,
    gravityMultiplier: 1,
    jumpMultiplier: 1,
    hazardSpeedMultiplier: 1,
    hardExtraHazards: [],
  },
  hard: {
    id: "hard",
    label: "Hard",
    lives: 2,
    speedMultiplier: 1.1,
    gravityMultiplier: 1.1,
    jumpMultiplier: 0.95,
    hazardSpeedMultiplier: 1.3,
    hardExtraHazards: [
      {
        id: "hard-hazard-1",
        label: "Turbo-Hologramm",
        dangerId: "halluzinations-hologramm",
        x: 860,
        y: 300,
        width: 50,
        height: 20,
        moving: {
          axis: "x",
          min: 820,
          max: 990,
          speed: 95,
          startDirection: 1,
        },
      },
      {
        id: "hard-hazard-2",
        label: "Mega-Piranhas",
        dangerId: "prompt-piranhas",
        x: 1960,
        y: 300,
        width: 60,
        height: 20,
        moving: {
          axis: "x",
          min: 1880,
          max: 2080,
          speed: 104,
          startDirection: -1,
        },
      },
    ],
  },
};

const DEFAULT_CHAPTER_ID: JumpRunChapterId = "ueber";
const DEFAULT_MAP_ID: JumpRunMapId = JUMP_RUN_CHAPTER_MAP[DEFAULT_CHAPTER_ID];
const DEFAULT_DIFFICULTY_ID: JumpRunDifficultyId = "normal";

type JumpRunStationVisual = {
  icon: ComponentType<{ className?: string }>;
  bubbleClass: string;
  accentClass: string;
};

const JUMP_RUN_STATION_DEFAULT_VISUAL: JumpRunStationVisual = {
  icon: IconBook,
  bubbleClass: "bg-white",
  accentClass: "text-slate-700",
};

const JUMP_RUN_STATION_VISUALS: Record<string, JumpRunStationVisual> = {
  "daten-depot": {
    icon: IconBrain,
    bubbleClass: "bg-sky-100",
    accentClass: "text-sky-900",
  },
  "prompt-parkour": {
    icon: IconPuzzle,
    bubbleClass: "bg-amber-100",
    accentClass: "text-amber-900",
  },
  "modell-motor": {
    icon: IconRobot,
    bubbleClass: "bg-cyan-100",
    accentClass: "text-cyan-900",
  },
  "ethik-endboss": {
    icon: IconShieldCheck,
    bubbleClass: "bg-emerald-100",
    accentClass: "text-emerald-900",
  },
};

const hazardVariantFromDangerId = (dangerId: string): JumpRunHazardVariant =>
  dangerId === "prompt-piranhas"
    ? "piranha"
    : dangerId === "halluzinations-hologramm"
    ? "ghost"
    : "banana";

const JUMP_RUN_HAZARD_VISUALS: Record<
  JumpRunChapterId,
  Record<JumpRunHazardVariant, JumpRunHazardVisual>
> = {
  ueber: {
    banana: {
      shellColor: "#fef3c7",
      mainColor: "#facc15",
      secondaryColor: "#f59e0b",
      accentColor: "#1e3a8a",
      minimapColor: "#f59e0b",
      cardColor: "#fffbeb",
      tipColor: "#92400e",
      sigil: "U",
    },
    ghost: {
      shellColor: "#dbeafe",
      mainColor: "#bfdbfe",
      secondaryColor: "#93c5fd",
      accentColor: "#1e40af",
      minimapColor: "#60a5fa",
      cardColor: "#eff6ff",
      tipColor: "#1d4ed8",
      sigil: "U",
    },
    piranha: {
      shellColor: "#c7d2fe",
      mainColor: "#6366f1",
      secondaryColor: "#4338ca",
      accentColor: "#e0e7ff",
      minimapColor: "#6366f1",
      cardColor: "#eef2ff",
      tipColor: "#4338ca",
      sigil: "U",
    },
  },
  mit: {
    banana: {
      shellColor: "#fef3c7",
      mainColor: "#f59e0b",
      secondaryColor: "#ea580c",
      accentColor: "#7c2d12",
      minimapColor: "#ea580c",
      cardColor: "#fff7ed",
      tipColor: "#9a3412",
      sigil: "M",
    },
    ghost: {
      shellColor: "#ffedd5",
      mainColor: "#fdba74",
      secondaryColor: "#fb7185",
      accentColor: "#7f1d1d",
      minimapColor: "#fb923c",
      cardColor: "#fff1f2",
      tipColor: "#be123c",
      sigil: "M",
    },
    piranha: {
      shellColor: "#fed7aa",
      mainColor: "#fb923c",
      secondaryColor: "#ea580c",
      accentColor: "#7c2d12",
      minimapColor: "#f97316",
      cardColor: "#ffedd5",
      tipColor: "#c2410c",
      sigil: "M",
    },
  },
  durch: {
    banana: {
      shellColor: "#ccfbf1",
      mainColor: "#14b8a6",
      secondaryColor: "#0d9488",
      accentColor: "#042f2e",
      minimapColor: "#14b8a6",
      cardColor: "#ecfeff",
      tipColor: "#0f766e",
      sigil: "D",
    },
    ghost: {
      shellColor: "#c7d2fe",
      mainColor: "#818cf8",
      secondaryColor: "#6366f1",
      accentColor: "#312e81",
      minimapColor: "#6366f1",
      cardColor: "#eef2ff",
      tipColor: "#4338ca",
      sigil: "D",
    },
    piranha: {
      shellColor: "#a5f3fc",
      mainColor: "#06b6d4",
      secondaryColor: "#0e7490",
      accentColor: "#083344",
      minimapColor: "#06b6d4",
      cardColor: "#ecfeff",
      tipColor: "#0e7490",
      sigil: "D",
    },
  },
  trotz: {
    banana: {
      shellColor: "#ffe4e6",
      mainColor: "#fb7185",
      secondaryColor: "#e11d48",
      accentColor: "#881337",
      minimapColor: "#e11d48",
      cardColor: "#fff1f2",
      tipColor: "#be123c",
      sigil: "T",
    },
    ghost: {
      shellColor: "#fecdd3",
      mainColor: "#fda4af",
      secondaryColor: "#fb7185",
      accentColor: "#9f1239",
      minimapColor: "#fb7185",
      cardColor: "#ffe4e6",
      tipColor: "#be185d",
      sigil: "T",
    },
    piranha: {
      shellColor: "#fbcfe8",
      mainColor: "#ec4899",
      secondaryColor: "#be185d",
      accentColor: "#831843",
      minimapColor: "#db2777",
      cardColor: "#fdf2f8",
      tipColor: "#be185d",
      sigil: "T",
    },
  },
};

const JUMP_RUN_BEST_TIME_STORAGE_KEY = "ddki_jump_run_best_times_v2";

const buildPlayfieldStyle = (theme: JumpRunMapTheme): CSSProperties => ({
  backgroundImage: `linear-gradient(180deg, ${theme.skyTop} 0%, ${theme.skyMid} 42%, ${theme.horizonTop} 42%, ${theme.horizonBottom} 100%), linear-gradient(${theme.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${theme.gridColor} 1px, transparent 1px)`,
  backgroundSize: "100% 100%, 28px 28px, 28px 28px",
  backgroundPosition: "0 0, 0 0, 0 0",
});


const formatTime = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  const centiseconds = Math.floor((milliseconds % 1000) / 10)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}.${centiseconds}`;
};

const bestTimeKey = (
  chapterId: JumpRunChapterId,
  mapId: JumpRunMapId,
  difficultyId: JumpRunDifficultyId
) => `${chapterId}:${mapId}:${difficultyId}`;

const buildRuntimeHazards = (
  map: JumpRunMapConfig,
  difficulty: JumpRunDifficultyConfig
): RuntimeHazard[] => {
  const mapHazards = map.hazardZones.map((hazard) => ({
    ...hazard,
    baseX: hazard.x,
    baseY: hazard.y,
    direction: hazard.moving?.startDirection ?? 1,
  }));
  const extraHazards =
    difficulty.id === "hard"
      ? difficulty.hardExtraHazards.map((hazard) => ({
          ...hazard,
          id: `${map.id}-${hazard.id}`,
          baseX: hazard.x,
          baseY: hazard.y,
          direction: hazard.moving?.startDirection ?? 1,
        }))
      : [];
  return [...mapHazards, ...extraHazards];
};

const buildInitialPowerupPositions = (map: JumpRunMapConfig) =>
  map.powerups.reduce((acc, powerup) => {
    acc[powerup.id] = { x: powerup.x, y: powerup.y };
    return acc;
  }, {} as Record<string, { x: number; y: number }>);

const buildInitialRevealedPowerups = (map: JumpRunMapConfig) =>
  map.powerups.reduce((acc, powerup) => {
    if (!powerup.spawnedByBlockId) {
      acc[powerup.id] = true;
    }
    return acc;
  }, {} as Record<string, boolean>);

export default function EscapeGamePage() {
  const searchParams = useSearchParams();
  const chapterParam = searchParams.get("chapter");
  const isChallengeMode = searchParams.get("mode") === "challenge";
  const [enteredCodes, setEnteredCodes] = useState<Record<DimensionId, string>>(() =>
    CHARACTERS.reduce((acc, character) => {
      acc[character.id] = "";
      return acc;
    }, {} as Record<DimensionId, string>)
  );
  const [earnedCodes, setEarnedCodes] = useState<Partial<Record<DimensionId, string>>>({});
  const [recentlyEarnedCode, setRecentlyEarnedCode] = useState<string | null>(null);
  const [selectedChapterId, setSelectedChapterId] =
    useState<JumpRunChapterId>(DEFAULT_CHAPTER_ID);
  const activeChapter = JUMP_RUN_CHAPTERS[selectedChapterId];
  const activeStations = activeChapter.stations;
  const activeDangers = activeChapter.dangers;
  const [selectedMapId, setSelectedMapId] = useState<JumpRunMapId>(DEFAULT_MAP_ID);
  const [difficultyId, setDifficultyId] = useState<JumpRunDifficultyId>(
    DEFAULT_DIFFICULTY_ID
  );
  useEffect(() => {
    if (!chapterParam) return;
    if (chapterParam in JUMP_RUN_CHAPTERS) {
      setSelectedChapterId(chapterParam as JumpRunChapterId);
    }
  }, [chapterParam]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(ACCESS_CODE_STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as {
        entered?: Partial<Record<DimensionId, string>>;
        earned?: Partial<Record<DimensionId, string>>;
      };
      if (parsed.entered) {
        setEnteredCodes((prev) => ({ ...prev, ...parsed.entered }));
      }
      if (parsed.earned) {
        setEarnedCodes(parsed.earned);
      }
    } catch {
      // ignore malformed local storage
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      ACCESS_CODE_STORAGE_KEY,
      JSON.stringify({
        entered: enteredCodes,
        earned: earnedCodes,
      })
    );
  }, [enteredCodes, earnedCodes]);

  useEffect(() => {
    const chapterMapId = JUMP_RUN_CHAPTER_MAP[selectedChapterId];
    if (selectedMapId !== chapterMapId) {
      setSelectedMapId(chapterMapId);
    }
  }, [selectedChapterId, selectedMapId]);

  const activeMap = JUMP_RUN_MAPS[selectedMapId];
  const difficultyConfig = JUMP_RUN_DIFFICULTIES[difficultyId];
  const [player, setPlayer] = useState(() => ({
    x: JUMP_RUN_MAPS[DEFAULT_MAP_ID].start.x,
    y: JUMP_RUN_MAPS[DEFAULT_MAP_ID].start.y,
    vx: 0,
    vy: 0,
    onGround: false,
    facing: "right",
  }));
  const [runtimeHazards, setRuntimeHazards] = useState<RuntimeHazard[]>(() =>
    buildRuntimeHazards(
      JUMP_RUN_MAPS[DEFAULT_MAP_ID],
      JUMP_RUN_DIFFICULTIES[DEFAULT_DIFFICULTY_ID]
    )
  );
  const [runnerLives, setRunnerLives] = useState(
    JUMP_RUN_DIFFICULTIES[DEFAULT_DIFFICULTY_ID].lives
  );
  const [runnerMessage, setRunnerMessage] = useState<string | null>(null);
  const [runnerFinished, setRunnerFinished] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [stationAnswers, setStationAnswers] = useState<Record<string, string>>({});
  const [stationSolved, setStationSolved] = useState<Record<string, boolean>>({});
  const [collectedBits, setCollectedBits] = useState<Record<string, boolean>>({});
  const [collectedPowerups, setCollectedPowerups] = useState<Record<string, boolean>>({});
  const [powerupPositions, setPowerupPositions] = useState<
    Record<string, { x: number; y: number }>
  >(() => buildInitialPowerupPositions(JUMP_RUN_MAPS[DEFAULT_MAP_ID]));
  const [revealedPowerups, setRevealedPowerups] = useState<Record<string, boolean>>(() =>
    buildInitialRevealedPowerups(JUMP_RUN_MAPS[DEFAULT_MAP_ID])
  );
  const [usedQuestionBlocks, setUsedQuestionBlocks] = useState<Record<string, boolean>>({});
  const [stationFeedback, setStationFeedback] = useState<string | null>(null);
  const [activeStationId, setActiveStationId] = useState<string | null>(null);
  const [runElapsedMs, setRunElapsedMs] = useState(0);
  const [bestTimes, setBestTimes] = useState<Record<string, number>>({});
  const [cameraX, setCameraX] = useState(0);
  const [hitFlashActive, setHitFlashActive] = useState(false);
  const [hitFlashDirection, setHitFlashDirection] = useState<1 | -1>(1);
  const [playerPoweredUp, setPlayerPoweredUp] = useState(false);
  const [playerGrowPulse, setPlayerGrowPulse] = useState(false);
  const [playfieldShakeX, setPlayfieldShakeX] = useState(0);
  const [hitImpact, setHitImpact] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [touchState, setTouchState] = useState({
    left: false,
    right: false,
    jump: false,
  });
  const playfieldViewportRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef(player);
  const keysRef = useRef({ left: false, right: false });
  const virtualKeysRef = useRef({ left: false, right: false });
  const jumpQueuedRef = useRef(false);
  const jumpLockRef = useRef(false);
  const checkpointRef = useRef({ x: activeMap.start.x, y: activeMap.start.y });
  const invulnerableUntilRef = useRef(0);
  const lastFrameRef = useRef<number | null>(null);
  const viewportWidthRef = useRef(900);
  const cameraXRef = useRef(0);
  const runStartRef = useRef<number | null>(null);
  const runnerLivesRef = useRef(runnerLives);
  const runnerFinishedRef = useRef(runnerFinished);
  const playerPoweredUpRef = useRef(playerPoweredUp);
  const pendingRespawnRef = useRef<PendingRespawn | null>(null);
  const allStationsSolvedRef = useRef(false);
  const activeStationRef = useRef<string | null>(null);
  const collectedBitsRef = useRef(collectedBits);
  const collectedPowerupsRef = useRef(collectedPowerups);
  const powerupPositionsRef = useRef(powerupPositions);
  const powerupMotionsRef = useRef<Record<string, RuntimePowerupMotion>>({});
  const revealedPowerupsRef = useRef(revealedPowerups);
  const usedQuestionBlocksRef = useRef(usedQuestionBlocks);
  const runtimeHazardsRef = useRef(runtimeHazards);
  const bestTimesRef = useRef(bestTimes);
  const soundEnabledRef = useRef(soundEnabled);
  const audioContextRef = useRef<AudioContext | null>(null);
  const hitFlashTimeoutRef = useRef<number | null>(null);
  const hitImpactTimeoutRef = useRef<number | null>(null);
  const playerGrowPulseTimeoutRef = useRef<number | null>(null);
  const shakeTimeoutsRef = useRef<number[]>([]);
  const prevOnGroundRef = useRef(true);
  const landingUntilRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const [particleSnapshot, setParticleSnapshot] = useState<Particle[]>([]);
  const particleFrameCounter = useRef(0);
  const lastRunDustRef = useRef(0);
  const lastAmbientRef = useRef(0);
  const [nowTimestamp, setNowTimestamp] = useState(0);

  const enteredCodeByDimension = useMemo(
    () =>
      Object.entries(enteredCodes).reduce((acc, [dimensionId, value]) => {
        acc[dimensionId as DimensionId] = value.trim();
        return acc;
      }, {} as Record<DimensionId, string>),
    [enteredCodes]
  );
  const acceptedCodeByDimension = useMemo(
    () =>
      CHARACTERS.reduce((acc, character) => {
        acc[character.id] =
          enteredCodeByDimension[character.id] === DIMENSION_ACCESS_CODES[character.id];
        return acc;
      }, {} as Record<DimensionId, boolean>),
    [enteredCodeByDimension]
  );
  const acceptedCodeCount = useMemo(
    () => Object.values(acceptedCodeByDimension).filter(Boolean).length,
    [acceptedCodeByDimension]
  );
  const allCodesAccepted = acceptedCodeCount === CHARACTERS.length;
  const accessProgress = (acceptedCodeCount / CHARACTERS.length) * 100;


  const completedStations = useMemo(
    () => Object.values(stationSolved).filter(Boolean).length,
    [stationSolved]
  );
  const activeStationMap = useMemo(
    () =>
      activeStations.reduce((acc, station) => {
        acc[station.id] = station;
        return acc;
      }, {} as Record<string, JumpRunStation>),
    [activeStations]
  );
  const activeDangerMap = useMemo(
    () =>
      activeDangers.reduce((acc, danger) => {
        acc[danger.id] = danger;
        return acc;
      }, {} as Record<string, JumpRunDanger>),
    [activeDangers]
  );
  const activeStationLabelMap = useMemo(
    () =>
      activeStations.reduce((acc, station) => {
        acc[station.id] = station.mapLabel;
        return acc;
      }, {} as Record<string, string>),
    [activeStations]
  );
  const allStationsSolved = completedStations === activeStations.length;
  const chapterProgress = (completedStations / Math.max(activeStations.length, 1)) * 100;
  const runnerAlive = runnerLives > 0;
  const runnerProgress =
    (player.x / Math.max(activeMap.world.width - JUMP_RUN_PLAYER.width, 1)) * 100;
  const playerScale = playerGrowPulse
    ? JUMP_RUN_PLAYER_POWER_EFFECT.pulseScale
    : playerPoweredUp
    ? JUMP_RUN_PLAYER_POWER_EFFECT.baseScale
    : 1;
  const activeStation = activeStationId ? activeStationMap[activeStationId] : null;
  const activeStationVisual = activeStation
    ? JUMP_RUN_STATION_VISUALS[activeStation.id] ?? JUMP_RUN_STATION_DEFAULT_VISUAL
    : JUMP_RUN_STATION_DEFAULT_VISUAL;
  const activeStationSolved = activeStation ? stationSolved[activeStation.id] : false;
  const activeStationAnswer = activeStation ? stationAnswers[activeStation.id] ?? "" : "";
  const activeStationZoneMap = useMemo(
    () =>
      activeMap.stationZones.reduce((acc, zone) => {
        acc[zone.id] = zone;
        return acc;
      }, {} as Record<string, JumpRunZone>),
    [activeMap]
  );
  const activePowerupMap = useMemo(
    () =>
      activeMap.powerups.reduce((acc, powerup) => {
        acc[powerup.id] = powerup;
        return acc;
      }, {} as Record<string, JumpRunPowerup>),
    [activeMap]
  );
  const activePlayfieldStyle = useMemo(
    () => buildPlayfieldStyle(activeMap.theme),
    [activeMap]
  );
  const activeHazardVisuals = useMemo(
    () => JUMP_RUN_HAZARD_VISUALS[activeMap.chapterId],
    [activeMap.chapterId]
  );

  useEffect(() => {
    playerRef.current = player;
  }, [player]);

  useEffect(() => {
    runnerLivesRef.current = runnerLives;
  }, [runnerLives]);

  useEffect(() => {
    runnerFinishedRef.current = runnerFinished;
  }, [runnerFinished]);

  useEffect(() => {
    playerPoweredUpRef.current = playerPoweredUp;
  }, [playerPoweredUp]);

  useEffect(() => {
    allStationsSolvedRef.current = allStationsSolved;
  }, [allStationsSolved]);

  useEffect(() => {
    collectedBitsRef.current = collectedBits;
  }, [collectedBits]);

  useEffect(() => {
    collectedPowerupsRef.current = collectedPowerups;
  }, [collectedPowerups]);

  useEffect(() => {
    powerupPositionsRef.current = powerupPositions;
  }, [powerupPositions]);

  useEffect(() => {
    revealedPowerupsRef.current = revealedPowerups;
  }, [revealedPowerups]);

  useEffect(() => {
    usedQuestionBlocksRef.current = usedQuestionBlocks;
  }, [usedQuestionBlocks]);

  useEffect(() => {
    runtimeHazardsRef.current = runtimeHazards;
  }, [runtimeHazards]);

  useEffect(() => {
    cameraXRef.current = cameraX;
  }, [cameraX]);

  useEffect(() => {
    bestTimesRef.current = bestTimes;
  }, [bestTimes]);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(JUMP_RUN_BEST_TIME_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Record<string, number>;
      setBestTimes(parsed);
      bestTimesRef.current = parsed;
    } catch {
      setBestTimes({});
      bestTimesRef.current = {};
    }
  }, []);

  useEffect(() => {
    const updateViewportWidth = () => {
      if (!playfieldViewportRef.current) return;
      viewportWidthRef.current = playfieldViewportRef.current.clientWidth;
    };
    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, [activeMap]);

  const handleCodeInput = (id: DimensionId, value: string) => {
    const sanitized = value.replace(/\D/g, "").slice(0, 6);
    setEnteredCodes((prev) => ({ ...prev, [id]: sanitized }));
  };


  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const clearShakeTimeouts = () => {
    for (const timeoutId of shakeTimeoutsRef.current) {
      window.clearTimeout(timeoutId);
    }
    shakeTimeoutsRef.current = [];
  };

  const clearHitEffectTimers = () => {
    if (hitFlashTimeoutRef.current !== null) {
      window.clearTimeout(hitFlashTimeoutRef.current);
      hitFlashTimeoutRef.current = null;
    }
    if (hitImpactTimeoutRef.current !== null) {
      window.clearTimeout(hitImpactTimeoutRef.current);
      hitImpactTimeoutRef.current = null;
    }
    clearShakeTimeouts();
  };

  const clearPlayerPowerTimers = () => {
    if (playerGrowPulseTimeoutRef.current !== null) {
      window.clearTimeout(playerGrowPulseTimeoutRef.current);
      playerGrowPulseTimeoutRef.current = null;
    }
  };

  const disablePlayerPowerMode = () => {
    clearPlayerPowerTimers();
    playerPoweredUpRef.current = false;
    setPlayerPoweredUp(false);
    setPlayerGrowPulse(false);
  };

  const triggerPlayerGrowEffect = () => {
    clearPlayerPowerTimers();
    playerPoweredUpRef.current = true;
    setPlayerPoweredUp(true);
    setPlayerGrowPulse(true);
    playerGrowPulseTimeoutRef.current = window.setTimeout(() => {
      setPlayerGrowPulse(false);
      playerGrowPulseTimeoutRef.current = null;
    }, JUMP_RUN_PLAYER_POWER_EFFECT.pulseMs);
  };

  const triggerHitEffects = (direction: 1 | -1, impactX: number, impactY: number) => {
    clearHitEffectTimers();
    setHitFlashDirection(direction);
    setHitFlashActive(true);
    setHitImpact({ x: impactX, y: impactY });

    hitFlashTimeoutRef.current = window.setTimeout(() => {
      setHitFlashActive(false);
      hitFlashTimeoutRef.current = null;
    }, JUMP_RUN_HIT_EFFECT.flashMs);

    hitImpactTimeoutRef.current = window.setTimeout(() => {
      setHitImpact(null);
      hitImpactTimeoutRef.current = null;
    }, JUMP_RUN_HIT_EFFECT.flashMs);

    const shakeSequence = [-8, 6, -4, 2, 0].map((step) => step * -direction);
    shakeSequence.forEach((offset, index) => {
      const timeoutId = window.setTimeout(() => {
        setPlayfieldShakeX(offset);
      }, index * 38);
      shakeTimeoutsRef.current.push(timeoutId);
    });
  };

  useEffect(() => {
    return () => {
      clearHitEffectTimers();
      clearPlayerPowerTimers();
      if (audioContextRef.current) {
        void audioContextRef.current.close();
      }
    };
  }, []);

  const setVirtualDirection = (direction: "left" | "right", active: boolean) => {
    virtualKeysRef.current[direction] = active;
    setTouchState((prev) => ({ ...prev, [direction]: active }));
  };

  const triggerVirtualMove = (direction: "left" | "right") => {
    setVirtualDirection(direction, true);
    window.setTimeout(() => setVirtualDirection(direction, false), 170);
  };

  const triggerVirtualJump = () => {
    if (jumpLockRef.current) return;
    jumpQueuedRef.current = true;
    jumpLockRef.current = true;
    setTouchState((prev) => ({ ...prev, jump: true }));
    window.setTimeout(() => {
      jumpLockRef.current = false;
      setTouchState((prev) => ({ ...prev, jump: false }));
    }, 200);
  };

  const onTouchMoveStart = (direction: "left" | "right") => {
    setVirtualDirection(direction, true);
  };

  const onTouchMoveEnd = (direction: "left" | "right") => {
    setVirtualDirection(direction, false);
  };


  const playSfx = (kind: "jump" | "collect" | "hit" | "finish" | "station") => {
    if (!soundEnabledRef.current) return;
    const context = audioContextRef.current;
    if (!context) return;

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;

    const config =
      kind === "jump"
        ? { start: 520, end: 680, duration: 0.08, volume: 0.05, type: "square" as const }
        : kind === "collect"
        ? { start: 760, end: 980, duration: 0.1, volume: 0.06, type: "triangle" as const }
        : kind === "hit"
        ? { start: 220, end: 130, duration: 0.14, volume: 0.08, type: "sawtooth" as const }
        : kind === "finish"
        ? { start: 640, end: 1120, duration: 0.2, volume: 0.07, type: "triangle" as const }
        : { start: 420, end: 520, duration: 0.1, volume: 0.045, type: "square" as const };

    oscillator.type = config.type;
    oscillator.frequency.setValueAtTime(config.start, now);
    oscillator.frequency.exponentialRampToValueAtTime(config.end, now + config.duration);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(config.volume, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + config.duration);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + config.duration + 0.02);
  };

  const toggleSound = async () => {
    if (soundEnabledRef.current) {
      setSoundEnabled(false);
      setRunnerMessage("Sound deaktiviert.");
      return;
    }

    const AudioConstructor =
      typeof window !== "undefined"
        ? window.AudioContext ||
          (window as Window & { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext
        : undefined;

    if (!AudioConstructor) {
      setRunnerMessage("Audio wird in diesem Browser nicht unterstützt.");
      return;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioConstructor();
    }

    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }

    setSoundEnabled(true);
    setRunnerMessage("Sound aktiviert.");
  };

  const handleStationSelect = (stationId: string, optionId: string) => {
    setStationAnswers((prev) => ({ ...prev, [stationId]: optionId }));
    setStationFeedback(null);
  };

  const handleStationCheck = (stationId: string) => {
    const station = activeStationMap[stationId];
    if (!station) {
      setStationFeedback("Station nicht gefunden.");
      return;
    }
    const answerId = stationAnswers[stationId];
    if (!answerId) {
      setStationFeedback("Bitte wähle eine Antwort.");
      return;
    }
    const isCorrect = station.options.find((option) => option.id === answerId)?.correct;
    if (isCorrect) {
      setStationSolved((prev) => ({ ...prev, [stationId]: true }));
      const zone = activeStationZoneMap[stationId];
      if (zone) {
        checkpointRef.current = {
          x: zone.x + zone.width / 2 - JUMP_RUN_PLAYER.width / 2,
          y: zone.y - JUMP_RUN_PLAYER.height - 4,
        };
      }
      playSfx("collect");
      setStationFeedback(`Richtig! ${station.reward} eingesammelt.`);
      setRunnerMessage(`Lernstern erhalten: ${station.reward}.`);
    } else {
      setStationFeedback("Noch nicht. Schau dir den Lernhinweis oben an.");
    }
  };

  const resetJumpRun = () => {
    clearHitEffectTimers();
    disablePlayerPowerMode();
    const initialPowerupPositions = buildInitialPowerupPositions(activeMap);
    const initialRevealedPowerups = buildInitialRevealedPowerups(activeMap);
    const nextPlayer = {
      ...playerRef.current,
      x: activeMap.start.x,
      y: activeMap.start.y,
      vx: 0,
      vy: 0,
      onGround: false,
    };
    playerRef.current = nextPlayer;
    const nextHazards = buildRuntimeHazards(activeMap, difficultyConfig);
    runtimeHazardsRef.current = nextHazards;
    setRuntimeHazards(nextHazards);
    setPlayer(nextPlayer);
    setRunnerLives(difficultyConfig.lives);
    setRunnerMessage(null);
    setRunnerFinished(false);
    setRecentlyEarnedCode(null);
    setRunElapsedMs(0);
    setStationAnswers({});
    setStationSolved({});
    setCollectedBits({});
    setCollectedPowerups({});
    setPowerupPositions(initialPowerupPositions);
    setRevealedPowerups(initialRevealedPowerups);
    setUsedQuestionBlocks({});
    setStationFeedback(null);
    setActiveStationId(null);
    setCameraX(0);
    setPlayfieldShakeX(0);
    setHitFlashActive(false);
    setHitFlashDirection(1);
    setHitImpact(null);
    setTouchState({ left: false, right: false, jump: false });
    checkpointRef.current = { x: activeMap.start.x, y: activeMap.start.y };
    keysRef.current = { left: false, right: false };
    virtualKeysRef.current = { left: false, right: false };
    jumpQueuedRef.current = false;
    jumpLockRef.current = false;
    runStartRef.current = null;
    invulnerableUntilRef.current = 0;
    runnerLivesRef.current = difficultyConfig.lives;
    runnerFinishedRef.current = false;
    pendingRespawnRef.current = null;
    collectedBitsRef.current = {};
    collectedPowerupsRef.current = {};
    powerupPositionsRef.current = initialPowerupPositions;
    powerupMotionsRef.current = {};
    revealedPowerupsRef.current = initialRevealedPowerups;
    usedQuestionBlocksRef.current = {};
    cameraXRef.current = 0;
    activeStationRef.current = null;
    lastFrameRef.current = null;
    particlesRef.current = [];
    setParticleSnapshot([]);
    prevOnGroundRef.current = true;
    landingUntilRef.current = 0;
    lastRunDustRef.current = 0;
    lastAmbientRef.current = 0;
  };

  useEffect(() => {
    resetJumpRun();
    setRunnerMessage(
      `Chapter: ${activeChapter.title} | Map: ${activeMap.label} | Schwierigkeit: ${difficultyConfig.label}`
    );
  }, [selectedChapterId, selectedMapId, difficultyId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
        if (target.isContentEditable) return;
      }

      const key = event.key;
      if (["ArrowRight", "ArrowLeft", "ArrowUp", " "].includes(key)) {
        event.preventDefault();
      }

      if (key === "ArrowRight") {
        keysRef.current.right = true;
        return;
      }
      if (key === "ArrowLeft") {
        keysRef.current.left = true;
        return;
      }
      if (key === "ArrowUp" || key === " ") {
        if (!jumpLockRef.current) {
          jumpQueuedRef.current = true;
          jumpLockRef.current = true;
        }
        return;
      }
      if (key.toLowerCase() === "r") {
        resetJumpRun();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key;
      if (key === "ArrowRight") {
        keysRef.current.right = false;
      }
      if (key === "ArrowLeft") {
        keysRef.current.left = false;
      }
      if (key === "ArrowUp" || key === " ") {
        jumpLockRef.current = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    let animationFrame = 0;

    const applyDamage = (message: string, now: number, sourceX?: number) => {
      if (now < invulnerableUntilRef.current) return;
      playSfx("hit");
      const playerCenter = playerRef.current.x + JUMP_RUN_PLAYER.width / 2;
      const impactSourceX =
        sourceX ?? playerCenter + (playerRef.current.facing === "right" ? 30 : -30);
      const knockbackDirection: 1 | -1 = playerCenter < impactSourceX ? -1 : 1;
      triggerHitEffects(
        knockbackDirection,
        playerCenter,
        playerRef.current.y + JUMP_RUN_PLAYER.height / 2
      );
      // Hit particles
      const capNow = getParticleCap(viewportWidthRef.current);
      particlesRef.current = [
        ...particlesRef.current,
        ...spawnHitParticles(playerCenter, playerRef.current.y + JUMP_RUN_PLAYER.height / 2, 5),
      ].slice(-capNow);
      if (playerPoweredUpRef.current) {
        disablePlayerPowerMode();
      }

      const nextLives = Math.max(runnerLivesRef.current - 1, 0);
      runnerLivesRef.current = nextLives;
      setRunnerLives(nextLives);
      const invulnerabilityMs =
        difficultyConfig.id === "easy" ? 1200 : difficultyConfig.id === "hard" ? 650 : 900;
      invulnerableUntilRef.current = now + invulnerabilityMs;
      if (nextLives === 0) {
        pendingRespawnRef.current = null;
        const gameOverPlayer = {
          ...playerRef.current,
          x: clamp(
            playerRef.current.x + knockbackDirection * 16,
            0,
            activeMap.world.width - JUMP_RUN_PLAYER.width
          ),
          y: Math.max(0, playerRef.current.y - 8),
          vx: 0,
          vy: 0,
          onGround: false,
          facing: knockbackDirection < 0 ? "left" : "right",
        };
        playerRef.current = gameOverPlayer;
        setPlayer(gameOverPlayer);
        setRunnerMessage("Game Over! Neustart mit R.");
        return;
      }

      pendingRespawnRef.current = {
        until: now + JUMP_RUN_HIT_EFFECT.knockbackMs,
        startX: playerRef.current.x,
        startY: playerRef.current.y,
        knockbackDirection,
        message,
        checkpoint: checkpointRef.current,
      };
      setStationFeedback(null);
    };

    const maybeUpdateBestTime = (finalTimeMs: number) => {
      const key = bestTimeKey(selectedChapterId, selectedMapId, difficultyId);
      const currentBest = bestTimesRef.current[key];
      const isNewBest = currentBest === undefined || finalTimeMs < currentBest;
      if (!isNewBest) return false;

      const updatedBestTimes = { ...bestTimesRef.current, [key]: finalTimeMs };
      bestTimesRef.current = updatedBestTimes;
      setBestTimes(updatedBestTimes);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          JUMP_RUN_BEST_TIME_STORAGE_KEY,
          JSON.stringify(updatedBestTimes)
        );
      }
      return true;
    };

    const loop = (timestamp: number) => {
      if (lastFrameRef.current === null) {
        lastFrameRef.current = timestamp;
        animationFrame = window.requestAnimationFrame(loop);
        return;
      }

      const dt = Math.min((timestamp - lastFrameRef.current) / 1000, 0.033);
      lastFrameRef.current = timestamp;

      if (runnerLivesRef.current <= 0 || runnerFinishedRef.current) {
        animationFrame = window.requestAnimationFrame(loop);
        return;
      }

      const pendingRespawn = pendingRespawnRef.current;
      if (pendingRespawn) {
        if (runStartRef.current !== null) {
          setRunElapsedMs(Math.max(0, timestamp - runStartRef.current));
        }

        const remainingMs = pendingRespawn.until - timestamp;
        if (remainingMs <= 0) {
          pendingRespawnRef.current = null;
          const checkpoint = pendingRespawn.checkpoint;
          const respawnPlayer = {
            ...playerRef.current,
            x: checkpoint.x,
            y: checkpoint.y,
            vx: 0,
            vy: 0,
            onGround: false,
            facing: pendingRespawn.knockbackDirection < 0 ? "left" : "right",
          };
          const viewportWidth = Math.max(320, viewportWidthRef.current);
          const maxCamera = Math.max(activeMap.world.width - viewportWidth, 0);
          const nextCameraX = clamp(
            checkpoint.x + JUMP_RUN_PLAYER.width / 2 - viewportWidth * 0.35,
            0,
            maxCamera
          );
          cameraXRef.current = nextCameraX;
          setCameraX(nextCameraX);
          playerRef.current = respawnPlayer;
          setPlayer(respawnPlayer);
          setRunnerMessage(pendingRespawn.message);
          animationFrame = window.requestAnimationFrame(loop);
          return;
        }

        const progress =
          1 - remainingMs / Math.max(JUMP_RUN_HIT_EFFECT.knockbackMs, 1);
        const eased = 1 - (1 - progress) * (1 - progress);
        const knockbackX = clamp(
          pendingRespawn.startX +
            pendingRespawn.knockbackDirection * JUMP_RUN_HIT_EFFECT.knockbackDistance * eased,
          0,
          activeMap.world.width - JUMP_RUN_PLAYER.width
        );
        const knockbackY = Math.max(
          0,
          pendingRespawn.startY -
            Math.sin(progress * Math.PI) * JUMP_RUN_HIT_EFFECT.knockbackArcHeight
        );
        const knockbackPlayer = {
          ...playerRef.current,
          x: knockbackX,
          y: knockbackY,
          vx: pendingRespawn.knockbackDirection * 120 * (1 - progress),
          vy: -150 * (1 - progress),
          onGround: false,
          facing: pendingRespawn.knockbackDirection < 0 ? "left" : "right",
        };
        playerRef.current = knockbackPlayer;
        setPlayer(knockbackPlayer);
        animationFrame = window.requestAnimationFrame(loop);
        return;
      }

      const inputLeft = keysRef.current.left || virtualKeysRef.current.left;
      const inputRight = keysRef.current.right || virtualKeysRef.current.right;
      const moveDirection = (inputRight ? 1 : 0) - (inputLeft ? 1 : 0);

      const current = playerRef.current;
      const moveSpeed = JUMP_RUN_PHYSICS.moveSpeed * difficultyConfig.speedMultiplier;
      const gravity = JUMP_RUN_PHYSICS.gravity * difficultyConfig.gravityMultiplier;
      const jumpVelocity = JUMP_RUN_PHYSICS.jumpVelocity * difficultyConfig.jumpMultiplier;
      let vx = moveDirection * moveSpeed;
      let vy = current.vy;
      if (jumpQueuedRef.current && current.onGround) {
        vy = jumpVelocity;
        playSfx("jump");
        jumpQueuedRef.current = false;
      }
      vy += gravity * dt;

      if (runStartRef.current === null && (moveDirection !== 0 || jumpQueuedRef.current)) {
        runStartRef.current = timestamp;
        setRunElapsedMs(0);
      } else if (runStartRef.current !== null) {
        setRunElapsedMs(Math.max(0, timestamp - runStartRef.current));
      }

      let nextX = clamp(
        current.x + vx * dt,
        0,
        activeMap.world.width - JUMP_RUN_PLAYER.width
      );
      let nextY = current.y + vy * dt;
      let onGround = false;

      const prevBottom = current.y + JUMP_RUN_PLAYER.height;
      const nextBottom = nextY + JUMP_RUN_PLAYER.height;
      const prevTop = current.y;
      const nextTop = nextY;
      const triggeredQuestionBlocks: JumpRunQuestionBlock[] = [];

      const solidSurfaces: Array<JumpRunPlatform | JumpRunQuestionBlock> = [
        ...activeMap.platforms,
        ...activeMap.questionBlocks,
      ];

      for (const surface of solidSurfaces) {
        const overlapsX =
          nextX + JUMP_RUN_PLAYER.width > surface.x &&
          nextX < surface.x + surface.width;
        if (!overlapsX) continue;

        if (vy >= 0 && prevBottom <= surface.y && nextBottom >= surface.y) {
          nextY = surface.y - JUMP_RUN_PLAYER.height;
          vy = 0;
          onGround = true;
          break;
        }

        if (
          vy < 0 &&
          prevTop >= surface.y + surface.height &&
          nextTop <= surface.y + surface.height
        ) {
          nextY = surface.y + surface.height;
          vy = 0;
          if (
            "powerupId" in surface &&
            !usedQuestionBlocksRef.current[surface.id]
          ) {
            triggeredQuestionBlocks.push(surface);
          }
        }
      }

      if (nextY > activeMap.world.height + 120) {
        applyDamage(
          "Abgestürzt! Zurück zum Checkpoint.",
          timestamp,
          playerRef.current.x + JUMP_RUN_PLAYER.width / 2
        );
        animationFrame = window.requestAnimationFrame(loop);
        return;
      }

      if (triggeredQuestionBlocks.length > 0) {
        const newlyUsedBlocks = triggeredQuestionBlocks.filter(
          (block) => !usedQuestionBlocksRef.current[block.id]
        );
        if (newlyUsedBlocks.length > 0) {
          const nextUsedQuestionBlocks = { ...usedQuestionBlocksRef.current };
          for (const block of newlyUsedBlocks) {
            nextUsedQuestionBlocks[block.id] = true;
          }
          usedQuestionBlocksRef.current = nextUsedQuestionBlocks;
          setUsedQuestionBlocks(nextUsedQuestionBlocks);

          const nextRevealedPowerups = { ...revealedPowerupsRef.current };
          const newlyRevealedPowerups: string[] = [];
          const nextPowerupPositions = { ...powerupPositionsRef.current };
          const nextPowerupMotions = { ...powerupMotionsRef.current };
          let powerupSpawned = false;
          for (const block of newlyUsedBlocks) {
            const powerup = activePowerupMap[block.powerupId];
            if (
              powerup &&
              !nextRevealedPowerups[block.powerupId] &&
              !collectedPowerupsRef.current[block.powerupId]
            ) {
              nextRevealedPowerups[block.powerupId] = true;
              newlyRevealedPowerups.push(block.powerupId);
              const spawnX = clamp(
                block.x + (block.width - powerup.width) / 2,
                0,
                activeMap.world.width - powerup.width
              );
              const spawnStartY = block.y + block.height - powerup.height;
              const playerCenter = nextX + JUMP_RUN_PLAYER.width / 2;
              const blockCenter = block.x + block.width / 2;
              const walkDirection: 1 | -1 = playerCenter <= blockCenter ? 1 : -1;
              nextPowerupPositions[powerup.id] = {
                x: spawnX,
                y: spawnStartY,
              };
              nextPowerupMotions[powerup.id] = {
                phase: "rising",
                targetY: powerup.y,
                vx: walkDirection * JUMP_RUN_POWERUP_MOTION.walkSpeed,
                remainingWalkMs: JUMP_RUN_POWERUP_MOTION.walkDurationMs,
              };
              powerupSpawned = true;
            }
          }
          revealedPowerupsRef.current = nextRevealedPowerups;
          setRevealedPowerups(nextRevealedPowerups);
          if (powerupSpawned) {
            powerupPositionsRef.current = nextPowerupPositions;
            setPowerupPositions(nextPowerupPositions);
            powerupMotionsRef.current = nextPowerupMotions;
          }

          if (newlyRevealedPowerups.length > 0) {
            playSfx("collect");
            setRunnerMessage(
              newlyRevealedPowerups.length > 1
                ? `${newlyRevealedPowerups.length} Super-Pilze freigeschaltet!`
                : "?-Block getroffen! Super-Pilz freigeschaltet."
            );
          } else {
            setRunnerMessage("?-Block ist leer.");
          }
        }
      }

      const powerupMotionEntries = Object.entries(powerupMotionsRef.current);
      if (powerupMotionEntries.length > 0) {
        const nextPowerupPositions = { ...powerupPositionsRef.current };
        const nextPowerupMotions = {} as Record<string, RuntimePowerupMotion>;
        let positionsChanged = false;
        let motionsChanged = false;

        for (const [powerupId, motion] of powerupMotionEntries) {
          const powerup = activePowerupMap[powerupId];
          if (!powerup || collectedPowerupsRef.current[powerupId]) {
            motionsChanged = true;
            continue;
          }

          const currentPosition = nextPowerupPositions[powerupId] ?? {
            x: powerup.x,
            y: powerup.y,
          };

          if (motion.phase === "rising") {
            const nextRiseY = Math.max(
              currentPosition.y - JUMP_RUN_POWERUP_MOTION.riseSpeed * dt,
              motion.targetY
            );
            if (Math.abs(nextRiseY - currentPosition.y) > 0.001) {
              nextPowerupPositions[powerupId] = {
                x: currentPosition.x,
                y: nextRiseY,
              };
              positionsChanged = true;
            }

            if (nextRiseY <= motion.targetY + 0.001) {
              nextPowerupMotions[powerupId] = {
                ...motion,
                phase: "walking",
              };
              motionsChanged = true;
            } else {
              nextPowerupMotions[powerupId] = motion;
            }
            continue;
          }

          const worldMaxX = activeMap.world.width - powerup.width;
          let nextWalkX = currentPosition.x + motion.vx * dt;
          let nextWalkVx = motion.vx;
          if (nextWalkX <= 0) {
            nextWalkX = 0;
            nextWalkVx = Math.abs(nextWalkVx);
          } else if (nextWalkX >= worldMaxX) {
            nextWalkX = worldMaxX;
            nextWalkVx = -Math.abs(nextWalkVx);
          }
          if (Math.abs(nextWalkX - currentPosition.x) > 0.001) {
            nextPowerupPositions[powerupId] = {
              x: nextWalkX,
              y: currentPosition.y,
            };
            positionsChanged = true;
          }

          const nextWalkMs = motion.remainingWalkMs - dt * 1000;
          if (nextWalkMs <= 0) {
            motionsChanged = true;
            continue;
          }

          nextPowerupMotions[powerupId] = {
            ...motion,
            vx: nextWalkVx,
            remainingWalkMs: nextWalkMs,
          };
          motionsChanged = true;
        }

        if (positionsChanged) {
          powerupPositionsRef.current = nextPowerupPositions;
          setPowerupPositions(nextPowerupPositions);
        }
        if (
          motionsChanged ||
          Object.keys(nextPowerupMotions).length !== powerupMotionEntries.length
        ) {
          powerupMotionsRef.current = nextPowerupMotions;
        }
      }

      const playerBox = {
        x: nextX,
        y: nextY,
        width: JUMP_RUN_PLAYER.width,
        height: JUMP_RUN_PLAYER.height,
      };

      let nextRuntimeHazards = runtimeHazardsRef.current;
      let hazardsMoved = false;
      for (let index = 0; index < nextRuntimeHazards.length; index += 1) {
        const hazard = nextRuntimeHazards[index];
        if (!hazard.moving) continue;
        const movement = hazard.moving;
        const speed = movement.speed * difficultyConfig.hazardSpeedMultiplier;
        const currentPos = movement.axis === "x" ? hazard.x : hazard.y;
        let nextPos = currentPos + hazard.direction * speed * dt;
        let nextDirection = hazard.direction;
        if (nextPos <= movement.min) {
          nextPos = movement.min;
          nextDirection = 1;
        } else if (nextPos >= movement.max) {
          nextPos = movement.max;
          nextDirection = -1;
        }

        if (!hazardsMoved) {
          nextRuntimeHazards = [...nextRuntimeHazards];
          hazardsMoved = true;
        }
        nextRuntimeHazards[index] =
          movement.axis === "x"
            ? { ...hazard, x: nextPos, direction: nextDirection }
            : { ...hazard, y: nextPos, direction: nextDirection };
      }

      if (hazardsMoved) {
        runtimeHazardsRef.current = nextRuntimeHazards;
        setRuntimeHazards(nextRuntimeHazards);
      }

      for (const hazard of runtimeHazardsRef.current) {
        const overlaps =
          playerBox.x < hazard.x + hazard.width &&
          playerBox.x + playerBox.width > hazard.x &&
          playerBox.y < hazard.y + hazard.height &&
          playerBox.y + playerBox.height > hazard.y;
        if (overlaps) {
          const danger = activeDangerMap[hazard.dangerId];
          const message = danger
            ? `Autsch! ${danger.title}. ${danger.description}`
            : "Autsch! Gefahr getroffen.";
          applyDamage(message, timestamp, hazard.x + hazard.width / 2);
          animationFrame = window.requestAnimationFrame(loop);
          return;
        }
      }

      const collectedThisFrame: string[] = [];
      for (const collectible of activeMap.collectibles) {
        if (collectedBitsRef.current[collectible.id]) continue;
        const overlaps =
          playerBox.x < collectible.x + collectible.size &&
          playerBox.x + playerBox.width > collectible.x &&
          playerBox.y < collectible.y + collectible.size &&
          playerBox.y + playerBox.height > collectible.y;
        if (overlaps) {
          collectedThisFrame.push(collectible.id);
        }
      }
      if (collectedThisFrame.length > 0) {
        setCollectedBits((prev) => {
          const next = { ...prev };
          for (const id of collectedThisFrame) {
            next[id] = true;
          }
          collectedBitsRef.current = next;
          return next;
        });
        playSfx("collect");
        setRunnerMessage(
          collectedThisFrame.length > 1
            ? `${collectedThisFrame.length} Datenbits eingesammelt!`
            : "Datenbit eingesammelt!"
        );
        // Collect sparkle particles
        for (const id of collectedThisFrame) {
          const col = activeMap.collectibles.find((c) => c.id === id);
          if (col) {
            const capNow = getParticleCap(viewportWidthRef.current);
            particlesRef.current = [
              ...particlesRef.current,
              ...spawnSparkle(col.x + col.size / 2, col.y + col.size / 2, 7),
            ].slice(-capNow);
          }
        }
      }

      const collectedPowerupsThisFrame: JumpRunPowerup[] = [];
      for (const powerup of activeMap.powerups) {
        if (collectedPowerupsRef.current[powerup.id]) continue;
        if (!revealedPowerupsRef.current[powerup.id]) continue;
        const powerupPosition = powerupPositionsRef.current[powerup.id] ?? {
          x: powerup.x,
          y: powerup.y,
        };
        const overlaps =
          playerBox.x < powerupPosition.x + powerup.width &&
          playerBox.x + playerBox.width > powerupPosition.x &&
          playerBox.y < powerupPosition.y + powerup.height &&
          playerBox.y + playerBox.height > powerupPosition.y;
        if (overlaps) {
          collectedPowerupsThisFrame.push(powerup);
        }
      }
      if (collectedPowerupsThisFrame.length > 0) {
        setCollectedPowerups((prev) => {
          const next = { ...prev };
          for (const powerup of collectedPowerupsThisFrame) {
            next[powerup.id] = true;
          }
          collectedPowerupsRef.current = next;
          return next;
        });
        const extraLives = collectedPowerupsThisFrame.reduce(
          (sum, powerup) => sum + powerup.extraLives,
          0
        );
        if (extraLives > 0) {
          const nextLives = Math.min(runnerLivesRef.current + extraLives, JUMP_RUN_MAX_LIVES);
          runnerLivesRef.current = nextLives;
          setRunnerLives(nextLives);
          invulnerableUntilRef.current = Math.max(invulnerableUntilRef.current, timestamp + 700);
        }
        const nextPowerupMotions = { ...powerupMotionsRef.current };
        let powerupMotionRemoved = false;
        for (const powerup of collectedPowerupsThisFrame) {
          if (nextPowerupMotions[powerup.id]) {
            delete nextPowerupMotions[powerup.id];
            powerupMotionRemoved = true;
          }
        }
        if (powerupMotionRemoved) {
          powerupMotionsRef.current = nextPowerupMotions;
        }
        triggerPlayerGrowEffect();
        playSfx("collect");
        setRunnerMessage(
          extraLives > 0
            ? `Super-Pilz! +${extraLives} Leben. Figur wächst!`
            : "Super-Pilz eingesammelt! Figur wächst!"
        );
        // Powerup burst particles
        for (const powerup of collectedPowerupsThisFrame) {
          const pPos = powerupPositionsRef.current[powerup.id] ?? { x: powerup.x, y: powerup.y };
          const capNow = getParticleCap(viewportWidthRef.current);
          particlesRef.current = [
            ...particlesRef.current,
            ...spawnBurst(pPos.x + powerup.width / 2, pPos.y + powerup.height / 2, 11),
          ].slice(-capNow);
        }
      }

      let stationId: string | null = null;
      for (const zone of activeMap.stationZones) {
        const overlaps =
          playerBox.x < zone.x + zone.width &&
          playerBox.x + playerBox.width > zone.x &&
          playerBox.y < zone.y + zone.height &&
          playerBox.y + playerBox.height > zone.y;
        if (overlaps) {
          stationId = zone.id;
          break;
        }
      }
      if (stationId !== activeStationRef.current) {
        activeStationRef.current = stationId;
        setActiveStationId(stationId);
        if (stationId) {
          const station = activeStationMap[stationId];
          playSfx("station");
          setRunnerMessage(
            station ? `Station erreicht: ${station.title}.` : "Station erreicht."
          );
        }
      }

      const finishOverlap =
        playerBox.x < activeMap.finishZone.x + activeMap.finishZone.width &&
        playerBox.x + playerBox.width > activeMap.finishZone.x &&
        playerBox.y < activeMap.finishZone.y + activeMap.finishZone.height &&
        playerBox.y + playerBox.height > activeMap.finishZone.y;

      if (finishOverlap) {
        if (allStationsSolvedRef.current) {
          const finalTimeMs =
            runStartRef.current === null ? 0 : Math.max(0, timestamp - runStartRef.current);
          const accessCode = DIMENSION_ACCESS_CODES[selectedChapterId];
          runnerFinishedRef.current = true;
          setRunnerFinished(true);
          setRunElapsedMs(finalTimeMs);
          setRecentlyEarnedCode(accessCode);
          setEarnedCodes((prev) => ({ ...prev, [selectedChapterId]: accessCode }));
          const hasNewBest = maybeUpdateBestTime(finalTimeMs);
          playSfx("finish");
          setRunnerMessage(
            hasNewBest
              ? `Neue Bestzeit! Ziel erreicht in ${formatTime(finalTimeMs)}. Code: ${accessCode}`
              : `Ziel erreicht in ${formatTime(finalTimeMs)}. Code: ${accessCode}`
          );
        } else {
          setRunnerMessage("Das Ziel bleibt verriegelt. Sammle alle Lernsterne.");
        }
      }

      const nextPlayer = {
        x: nextX,
        y: nextY,
        vx,
        vy,
        onGround,
        facing:
          moveDirection < 0
            ? "left"
            : moveDirection > 0
            ? "right"
            : current.facing,
      };

      const viewportWidth = Math.max(320, viewportWidthRef.current);
      const maxCamera = Math.max(activeMap.world.width - viewportWidth, 0);
      const desiredCameraX = clamp(
        nextPlayer.x + JUMP_RUN_PLAYER.width / 2 - viewportWidth * 0.35,
        0,
        maxCamera
      );
      if (Math.abs(desiredCameraX - cameraXRef.current) > 0.5) {
        cameraXRef.current = desiredCameraX;
        setCameraX(desiredCameraX);
      }

      // ── Particle system updates ──
      const playerFeetX = nextPlayer.x + JUMP_RUN_PLAYER.width / 2;
      const playerFeetY = nextPlayer.y + JUMP_RUN_PLAYER.height;
      const cap = getParticleCap(viewportWidthRef.current);

      // Landing detection → dust + squash
      const wasAirborne = !prevOnGroundRef.current;
      if (onGround && wasAirborne) {
        landingUntilRef.current = timestamp + LANDING_DURATION_MS;
        particlesRef.current = [
          ...particlesRef.current,
          ...spawnDust(playerFeetX, playerFeetY, 4),
        ].slice(-cap);
      }
      prevOnGroundRef.current = onGround;

      // Running trail
      if (onGround && Math.abs(vx) > 35 && timestamp - lastRunDustRef.current > 80) {
        lastRunDustRef.current = timestamp;
        particlesRef.current = [
          ...particlesRef.current,
          ...spawnRunDust(playerFeetX, playerFeetY),
        ].slice(-cap);
      }

      // Ambient particles (every 2s)
      if (timestamp - lastAmbientRef.current > 2000) {
        lastAmbientRef.current = timestamp;
        const dimColors = DIMENSION_COLORS[activeMap.chapterId as keyof typeof DIMENSION_COLORS];
        const ambientColor = dimColors?.glow ?? "rgba(245,158,11,0.3)";
        particlesRef.current = [
          ...particlesRef.current,
          ...spawnAmbient(cameraXRef.current, viewportWidthRef.current, activeMap.world.height, ambientColor, 3),
        ].slice(-cap);
      }

      // Update particle physics
      particlesRef.current = updateParticles(particlesRef.current, dt);

      // Throttle snapshot to every 2nd frame
      particleFrameCounter.current++;
      if (particleFrameCounter.current % 2 === 0) {
        setParticleSnapshot(particlesRef.current);
      }

      setNowTimestamp(timestamp);

      playerRef.current = nextPlayer;
      setPlayer(nextPlayer);
      animationFrame = window.requestAnimationFrame(loop);
    };

    animationFrame = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [
    activeDangerMap,
    activeMap,
    activePowerupMap,
    activeStationMap,
    difficultyConfig,
    difficultyId,
    selectedChapterId,
    selectedMapId,
  ]);


  return (
    <main
      className={`${bodyFont.className} min-h-screen bg-[var(--sky)] text-slate-900`}
      style={{
        "--sky": "#7dd3fc",
        "--grass": "#22c55e",
        "--earth": "#9a5a1e",
        "--block": "#f59e0b",
        "--shadow": "#1b1b1b",
      } as CSSProperties}
    >
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-6 top-10 h-14 w-32 rounded-full bg-white/80 shadow-[6px_6px_0_rgba(0,0,0,0.15)]" />
          <div className="absolute right-16 top-20 h-20 w-44 rounded-full bg-white/80 shadow-[6px_6px_0_rgba(0,0,0,0.15)]" />
          <div className="absolute left-1/3 top-6 h-10 w-24 rounded-full bg-white/70 shadow-[6px_6px_0_rgba(0,0,0,0.12)]" />
          <div className="absolute -bottom-24 left-[-10%] h-64 w-[28rem] rounded-[50%] bg-[var(--grass)] opacity-80" />
          <div className="absolute -bottom-28 right-[-5%] h-72 w-[32rem] rounded-[50%] bg-[var(--grass)] opacity-70" />
          <div className="absolute bottom-0 h-20 w-full bg-[var(--earth)] shadow-[0_-6px_0_rgba(0,0,0,0.2)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-28 pt-28">
          <div className="inline-flex items-center gap-3 border-4 border-black bg-white px-4 py-2 text-xs uppercase tracking-[0.3em] shadow-[4px_4px_0_#000]">
            <IconMap2 className="h-4 w-4" />
            LI Hamburg - Hauptseminarleitungsklausur
          </div>

          <h1
            className={`${pixelFont.className} mt-6 text-3xl leading-tight sm:text-4xl lg:text-5xl`}
          >
            Escape-Game: KI-Kompetenz-Quest
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg">
            Vier spielbare Chapter. Zwei Stunden Spielzeit. Eine klare Mission:
            die Kompetenzen{" "}
            <span className="font-bold">
              Lernen über, durch, mit und trotz KI
            </span>{" "}
            spielerisch erschließen und in handfeste Ergebnisse übersetzen.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: <IconClock className="h-5 w-5" />,
                title: "2 Stunden",
                text: "Escape-Game mit vier spielbaren Chaptern",
              },
              {
                icon: <IconFlag3 className="h-5 w-5" />,
                title: "1 Stunde",
                text: "Vorstellung der Ergebnisse im Plenum",
              },
              {
                icon: <IconUsers className="h-5 w-5" />,
                title: "1 Stunde",
                text: "Diskussion, Transfer, nächste Schritte",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="animate__animated animate__fadeInUp border-4 border-black bg-white px-5 py-4 shadow-[6px_6px_0_#000]"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex items-center gap-3 text-sm font-semibold">
                  {item.icon}
                  {item.title}
                </div>
                <p className="mt-2 text-sm text-slate-700">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#crew"
              className="inline-flex items-center gap-2 border-4 border-black bg-[var(--block)] px-5 py-3 text-xs uppercase tracking-[0.25em] shadow-[6px_6px_0_#000] transition hover:-translate-y-1"
            >
              <IconKey className="h-4 w-4" />
              Crew treffen
            </a>
            <a
              href="#map"
              className="inline-flex items-center gap-2 border-4 border-black bg-white px-5 py-3 text-xs uppercase tracking-[0.25em] shadow-[6px_6px_0_#000] transition hover:-translate-y-1"
            >
              <IconFlag3 className="h-4 w-4" />
              Weltkarte
            </a>
          </div>
        </div>
      </section>

      <section id="crew" className="relative bg-[#fef9c3]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className={`${displayFont.className} text-2xl`}>Die Crew</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-700">
                Wählt ein Crew-Mitglied und startet das passende Tutorial. Nach dem
                erfolgreichen Jump-&-Run erhaltet ihr einen 6-stelligen Missions-Code.
              </p>
            </div>

            <div className="border-4 border-black bg-white px-4 py-3 text-xs uppercase tracking-[0.2em] shadow-[4px_4px_0_#000]">
              <div className="flex items-center gap-2">
                <IconKey className="h-4 w-4" />
                Code-Portal
              </div>
              <div className="mt-3 h-3 w-48 border-2 border-black bg-black/10">
                <div
                  className="h-full bg-[var(--block)] transition-all"
                  style={{ width: `${accessProgress}%` }}
                />
              </div>
              <div className="mt-2 text-[11px] text-slate-700">
                {acceptedCodeCount} von {CHARACTERS.length} Codes akzeptiert
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {CHARACTERS.map((character, index) => {
              const hasAcceptedCode = acceptedCodeByDimension[character.id];
              const hasEarnedCode = Boolean(earnedCodes[character.id]);
              return (
                <div
                  key={character.id}
                  className="animate__animated animate__fadeInUp border-4 border-black bg-white p-5 shadow-[6px_6px_0_#000]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`relative h-16 w-16 overflow-hidden rounded-none border-4 border-black bg-gradient-to-br ${character.accent}`}
                  >
                    {(() => {
                      const Face = CREW_FACES[character.id];
                      return Face ? <Face /> : character.icon;
                    })()}
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 border-2 border-black px-2 py-1 text-[10px] uppercase tracking-[0.25em]">
                    {character.title}
                  </div>
                  <h3 className="mt-3 text-lg font-bold">{character.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{character.role}</p>
                  <p className="mt-3 text-sm">{character.focus}</p>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold">{character.key}</span>
                    <Link
                      href={`/escape-game/tutorial/${character.id}`}
                      className="border-2 border-black bg-white px-3 py-1 text-[10px] uppercase tracking-[0.2em] shadow-[3px_3px_0_#000] transition hover:-translate-y-0.5"
                    >
                      Tutorial
                    </Link>
                  </div>
                  <div className="mt-4 space-y-2">
                    <label className="flex items-center justify-between gap-2 border-2 border-black bg-white px-2 py-2 text-xs">
                      <span>Code eingeben</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={enteredCodes[character.id]}
                        onChange={(event) =>
                          handleCodeInput(character.id, event.target.value)
                        }
                        placeholder="000000"
                        className="w-24 border-2 border-black px-2 py-1 text-right font-bold tracking-[0.2em]"
                      />
                    </label>
                    {hasAcceptedCode ? (
                      <div className="flex items-center gap-2 border-2 border-black bg-emerald-100 px-3 py-2 text-xs">
                        <IconKey className="h-4 w-4" />
                        Code akzeptiert
                      </div>
                    ) : hasEarnedCode ? (
                      <div className="flex items-center gap-2 border-2 border-black bg-amber-100 px-3 py-2 text-xs">
                        <IconSparkles className="h-4 w-4" />
                        Code erhalten - bitte eintragen
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 border-2 border-black bg-slate-100 px-3 py-2 text-xs">
                        <IconPuzzle className="h-4 w-4" />
                        Tutorial + Challenge abschließen
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="map" className="relative bg-[#f8fafc]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className={`${displayFont.className} text-2xl`}>Weltkarte</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-700">
                Sobald alle vier Missions-Codes korrekt eingetragen sind, werden die
                Materialien zu allen vier Dimensionen als PDF-Download freigeschaltet.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 border-4 border-black bg-white px-4 py-2 text-xs uppercase tracking-[0.2em] shadow-[4px_4px_0_#000]">
              <IconFlag3 className="h-4 w-4" />
              {allCodesAccepted ? "Downloads freigeschaltet" : "Noch gesperrt"}
            </div>
          </div>

          <div className="relative mt-10 border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
            <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-slate-600">
              <span className="flex items-center gap-2">
                <IconMap2 className="h-4 w-4" />
                Materialien
              </span>
            </div>

            <div
              className={`mt-6 grid gap-6 md:grid-cols-2 ${
                allCodesAccepted ? "opacity-100" : "opacity-50"
              }`}
            >
              {WELTKARTE_DOWNLOADS.map((download, index) => (
                <div
                  key={download.id}
                  className={`animate__animated animate__fadeInUp border-4 border-black p-5 shadow-[5px_5px_0_#000] ${download.accent}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center border-2 border-black bg-white">
                      {download.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{download.title}</h3>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-700">{download.description}</p>
                  <a
                    href={download.pdfPath}
                    download
                    className={`mt-4 inline-flex items-center gap-2 border-2 border-black px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] shadow-[3px_3px_0_#000] transition hover:-translate-y-0.5 ${
                      allCodesAccepted
                        ? "bg-[var(--block)] text-black"
                        : "pointer-events-none bg-slate-200 text-slate-500"
                    }`}
                  >
                    <IconBook className="h-4 w-4" />
                    PDF herunterladen
                  </a>
                </div>
              ))}
            </div>

            {!allCodesAccepted && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
                <div className="border-4 border-black bg-white px-6 py-4 text-center text-xs uppercase tracking-[0.3em] shadow-[6px_6px_0_#000]">
                  Tragt alle vier Missions-Codes ein, um die Downloads freizuschalten
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="ueber-quest" className="relative bg-[#fefce8]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className={`${displayFont.className} text-2xl`}>
                {isChallengeMode
                  ? `Challenge-Modus: ${activeChapter.title}`
                  : "SoekiaGPT Quest: KI-Multiversum (Jump & Run)"}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-700">
                {isChallengeMode
                  ? "Schließe diese Challenge erfolgreich ab, um deinen 6-stelligen Missions-Code zu erhalten."
                  : "Wähle ein Chapter, laufe durch die 2D-Welt und löse die passenden Lernstationen aus dem Mission Scroll."}
              </p>
            </div>
            <div className="border-4 border-black bg-white px-4 py-3 text-xs uppercase tracking-[0.2em] shadow-[4px_4px_0_#000]">
              <div className="flex items-center gap-2">
                <IconKey className="h-4 w-4" />
                Fortschritt
              </div>
              <div className="mt-3 h-3 w-48 border-2 border-black bg-black/10">
                <div
                  className="h-full bg-[var(--block)] transition-all"
                  style={{ width: `${chapterProgress}%` }}
                />
              </div>
              <div className="mt-2 text-[11px] text-slate-700">
                {activeChapter.title}: {completedStations} von {activeStations.length} Leveln
              </div>
            </div>
          </div>

          {isChallengeMode && (
            <Link
              href={`/escape-game/tutorial/${selectedChapterId}`}
              className="mb-4 inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-2 text-xs uppercase tracking-[0.2em] shadow-[3px_3px_0_#000] hover:bg-slate-50"
            >
              <IconBolt className="h-4 w-4" />
              Zurück zum Tutorial
            </Link>
          )}

          <div className="mt-4 grid items-start gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="self-start border-4 border-black bg-white p-5 shadow-[6px_6px_0_#000]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-600">
                  <IconPuzzle className="h-4 w-4" />
                  {activeChapter.title}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="border-2 border-black bg-red-100 px-2 py-1 text-[10px] uppercase tracking-[0.25em]">
                    Leben {runnerLives}
                  </span>
                  <span className="border-2 border-black bg-sky-100 px-2 py-1 text-[10px] uppercase tracking-[0.25em]">
                    Zeit {formatTime(runElapsedMs)}
                  </span>
                  <span className="border-2 border-black bg-amber-100 px-2 py-1 text-[10px] uppercase tracking-[0.25em]">
                    Stationen {completedStations}/{activeStations.length}
                  </span>
                  <button
                    type="button"
                    onClick={toggleSound}
                    className="inline-flex items-center gap-1 border-2 border-black bg-white px-2 py-1 text-[10px] uppercase tracking-[0.25em] shadow-[2px_2px_0_#000] hover:-translate-y-0.5"
                  >
                    {soundEnabled ? (
                      <IconVolume className="h-3 w-3" />
                    ) : (
                      <IconVolumeOff className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </div>

              <style dangerouslySetInnerHTML={{ __html: VISUAL_KEYFRAMES }} />
              <div
                ref={playfieldViewportRef}
                className={`relative mt-4 overflow-hidden rounded border-2 border-black ${activeMap.backgroundClass}`}
                style={{
                  ...activePlayfieldStyle,
                  height: `${activeMap.world.height}px`,
                  transform: `translateX(${playfieldShakeX}px)`,
                  transition: "transform 80ms linear",
                }}
              >
                <ParallaxBackground chapterId={activeMap.chapterId} cameraX={cameraX} />
                <div
                  className="absolute inset-0"
                  style={{ transform: `translateX(-${Math.round(cameraX)}px)` }}
                >
                  <div
                    className="relative h-full"
                    style={{ width: `${activeMap.world.width}px` }}
                  >
                    {activeMap.platforms.map((platform) => {
                      const isGround = platform.id === "ground";
                      const tufts = !isGround ? Math.max(2, Math.floor(platform.width / 40)) : 0;
                      const tuffColor = activeMap.chapterId === "durch"
                        ? "rgba(6,182,212,0.5)"
                        : activeMap.chapterId === "trotz"
                        ? "rgba(248,113,113,0.4)"
                        : activeMap.chapterId === "mit"
                        ? "rgba(234,179,8,0.5)"
                        : "rgba(34,197,94,0.5)";
                      return (
                        <div
                          key={platform.id}
                          className="absolute border-2 border-black"
                          style={{
                            left: `${platform.x}px`,
                            top: `${platform.y}px`,
                            width: `${platform.width}px`,
                            height: `${platform.height}px`,
                            backgroundColor: isGround
                              ? activeMap.theme.groundColor
                              : activeMap.theme.platformColor,
                            boxShadow: isGround
                              ? `0 -4px 0 ${activeMap.theme.groundShadow}`
                              : `3px 3px 0 ${activeMap.theme.platformShadow}`,
                          }}
                        >
                          {Array.from({ length: tufts }).map((_, i) => (
                            <div
                              key={i}
                              className="absolute"
                              style={{
                                left: `${((i + 0.5) / tufts) * 100}%`,
                                top: "-4px",
                                width: activeMap.chapterId === "durch" ? "4px" : "6px",
                                height: "5px",
                                backgroundColor: tuffColor,
                                borderRadius: activeMap.chapterId === "durch" ? "1px" : "50% 50% 0 0",
                                transform: "translateX(-50%)",
                              }}
                            />
                          ))}
                        </div>
                      );
                    })}

                    {activeMap.questionBlocks.map((block) => {
                      const used = usedQuestionBlocks[block.id];
                      return (
                        <div
                          key={block.id}
                          className={`anim-shimmer absolute flex items-center justify-center border-2 border-black text-sm font-bold shadow-[2px_2px_0_#000] ${
                            used ? "bg-amber-800 text-amber-200" : "bg-amber-300 text-black"
                          }`}
                          style={{
                            left: `${block.x}px`,
                            top: `${block.y}px`,
                            width: `${block.width}px`,
                            height: `${block.height}px`,
                            animation: !used ? ANIM.shimmer : undefined,
                          }}
                          title={used ? `${block.label} (leer)` : block.label}
                        >
                          {used ? "·" : "?"}
                        </div>
                      );
                    })}

                    {runtimeHazards.map((hazard) => {
                      const variant = hazardVariantFromDangerId(hazard.dangerId);
                      const hazardVisual = activeHazardVisuals[variant];
                      const hazardCenterX = hazard.x + hazard.width / 2;
                      const eyeShift = Math.max(-1.5, Math.min(1.5, (player.x - hazardCenterX) / 80));
                      return (
                        <div
                          key={hazard.id}
                          className="anim-bob absolute border-2 border-black shadow-[2px_2px_0_#000]"
                          style={{
                            left: `${hazard.x}px`,
                            top: `${hazard.y}px`,
                            width: `${hazard.width}px`,
                            height: `${hazard.height}px`,
                            backgroundColor: hazardVisual.shellColor,
                            animation: ANIM.bob,
                            animationDelay: `${(hazard.x % 500) / 500}s`,
                          }}
                        >
                          <div className="relative h-full w-full overflow-hidden">
                            {variant === "piranha" && (
                              <>
                                <div
                                  className="absolute inset-x-0 top-0 h-[58%] border-b-2 border-black"
                                  style={{ backgroundColor: hazardVisual.mainColor }}
                                />
                                <div
                                  className="absolute inset-x-0 bottom-0 h-[42%]"
                                  style={{ backgroundColor: hazardVisual.secondaryColor }}
                                />
                                <div className="absolute left-[14%] top-[20%] h-1.5 w-1.5 rounded-full border border-black bg-white">
                                  <div className="absolute rounded-full bg-black" style={{ width: 3, height: 3, top: 1, left: 1 + eyeShift }} />
                                </div>
                                <div className="absolute right-[14%] top-[20%] h-1.5 w-1.5 rounded-full border border-black bg-white">
                                  <div className="absolute rounded-full bg-black" style={{ width: 3, height: 3, top: 1, left: 1 + eyeShift }} />
                                </div>
                                <div className="absolute left-[35%] top-[55%] h-1.5 w-1.5 rotate-45 border-r-2 border-t-2 border-white" />
                                <div className="absolute left-1/2 top-[55%] h-1.5 w-1.5 -translate-x-1/2 rotate-45 border-r-2 border-t-2 border-white" />
                                <div className="absolute right-[35%] top-[55%] h-1.5 w-1.5 rotate-45 border-r-2 border-t-2 border-white" />
                              </>
                            )}
                            {variant === "ghost" && (
                              <>
                                <div
                                  className="absolute left-[16%] top-[8%] h-[74%] w-[68%] rounded-t-[8px] border-2 border-black"
                                  style={{ backgroundColor: hazardVisual.mainColor }}
                                />
                                <div className="absolute left-[32%] top-[34%] h-1.5 w-1.5 rounded-full bg-white">
                                  <div className="absolute rounded-full bg-black" style={{ width: 3, height: 3, top: 0, left: 1 + eyeShift }} />
                                </div>
                                <div className="absolute right-[32%] top-[34%] h-1.5 w-1.5 rounded-full bg-white">
                                  <div className="absolute rounded-full bg-black" style={{ width: 3, height: 3, top: 0, left: 1 + eyeShift }} />
                                </div>
                                <div className="absolute left-[26%] bottom-[8%] h-1.5 w-1.5 rounded-full border border-black bg-white" />
                                <div className="absolute left-[46%] bottom-[4%] h-1.5 w-1.5 rounded-full border border-black bg-white" />
                                <div className="absolute left-[66%] bottom-[8%] h-1.5 w-1.5 rounded-full border border-black bg-white" />
                              </>
                            )}
                            {variant === "banana" && (
                              <>
                                <div
                                  className="absolute left-[20%] top-[20%] h-[60%] w-[64%] -rotate-12 rounded-[999px] border-2 border-black"
                                  style={{ backgroundColor: hazardVisual.mainColor }}
                                />
                                <div className="absolute left-[16%] top-[44%] h-2 w-2 rounded-full bg-white">
                                  <div className="absolute rounded-full bg-black" style={{ width: 3, height: 3, top: 1, left: 2 + eyeShift }} />
                                </div>
                                <div className="absolute right-[22%] top-[34%] h-2 w-2 rounded-full bg-white">
                                  <div className="absolute rounded-full bg-black" style={{ width: 3, height: 3, top: 1, left: 2 + eyeShift }} />
                                </div>
                                <div className="absolute right-[16%] bottom-[22%] h-1 w-2 rounded-full bg-black/30" />
                              </>
                            )}
                            <span
                              className="absolute right-[8%] top-[8%] text-[7px] font-bold uppercase tracking-[0.08em]"
                              style={{ color: hazardVisual.accentColor }}
                            >
                              {hazardVisual.sigil}
                            </span>
                          </div>
                        </div>
                      );
                    })}

                    {activeMap.collectibles.map((collectible) => {
                      const collected = collectedBits[collectible.id];
                      return (
                        <div
                          key={collectible.id}
                          className={`anim-bob absolute flex items-center justify-center rounded-full border-2 border-black text-[8px] ${
                            collected ? "bg-slate-300 opacity-60 shadow-[2px_2px_0_#000]" : "bg-yellow-200"
                          }`}
                          style={{
                            left: `${collectible.x}px`,
                            top: `${collectible.y}px`,
                            width: `${collectible.size}px`,
                            height: `${collectible.size}px`,
                            animation: !collected ? ANIM.bob : undefined,
                            animationDelay: `${(collectible.x % 400) / 400}s`,
                            boxShadow: !collected
                              ? "2px 2px 0 #000, 0 0 8px 2px rgba(250,204,21,0.4)"
                              : undefined,
                          }}
                          title={collectible.label}
                        >
                          <IconSparkles className="h-3 w-3" />
                        </div>
                      );
                    })}

                    {activeMap.powerups.map((powerup) => {
                      const revealed = revealedPowerups[powerup.id];
                      const collected = collectedPowerups[powerup.id];
                      if (!revealed && !collected) return null;
                      const powerupPosition = powerupPositions[powerup.id] ?? {
                        x: powerup.x,
                        y: powerup.y,
                      };
                      return (
                        <div
                          key={powerup.id}
                          className={`absolute ${collected ? "opacity-40" : ""}`}
                          style={{
                            left: `${powerupPosition.x}px`,
                            top: `${powerupPosition.y}px`,
                            width: `${powerup.width}px`,
                            height: `${powerup.height}px`,
                          }}
                          title={`${powerup.label}: +${powerup.extraLives} Leben`}
                        >
                          <div className="relative h-full w-full">
                            <div className="absolute left-0 top-0 h-[58%] w-full rounded-t-full border-2 border-black bg-red-500" />
                            <div className="absolute left-[10%] top-[8%] h-1.5 w-1.5 rounded-full bg-white" />
                            <div className="absolute left-[44%] top-[6%] h-1.5 w-1.5 rounded-full bg-white" />
                            <div className="absolute left-[72%] top-[11%] h-1.5 w-1.5 rounded-full bg-white" />
                            <div className="absolute bottom-0 left-[18%] h-[52%] w-[64%] rounded-t-[6px] border-2 border-black bg-[#fef7d3]" />
                            <div className="absolute bottom-[14%] left-[34%] h-1.5 w-1.5 rounded-full bg-black" />
                            <div className="absolute bottom-[14%] right-[34%] h-1.5 w-1.5 rounded-full bg-black" />
                          </div>
                        </div>
                      );
                    })}

                    {activeMap.stationZones.map((zone) => {
                      const solved = stationSolved[zone.id];
                      const stationVisual =
                        JUMP_RUN_STATION_VISUALS[zone.id] ?? JUMP_RUN_STATION_DEFAULT_VISUAL;
                      const StationIcon = stationVisual.icon;
                      const bubbleClass = solved ? "bg-emerald-100" : stationVisual.bubbleClass;
                      return (
                        <div
                          key={zone.id}
                          className="absolute"
                          style={{
                            left: `${zone.x}px`,
                            top: `${zone.y}px`,
                            width: `${zone.width}px`,
                            height: `${zone.height}px`,
                          }}
                        >
                          {!solved && (
                            <div
                              className="anim-ring pointer-events-none absolute inset-[-6px] rounded-[14px] border-2"
                              style={{
                                borderColor: DIMENSION_COLORS[activeMap.chapterId as keyof typeof DIMENSION_COLORS]?.accent ?? "#f59e0b",
                                animation: ANIM.ring,
                              }}
                            />
                          )}
                          <div
                            className={`anim-pulse relative flex h-full w-full items-center gap-1 rounded-[8px] border-2 border-black px-1.5 shadow-[2px_2px_0_#000] ${bubbleClass} ${
                              solved ? "text-emerald-900" : stationVisual.accentClass
                            }`}
                            style={{
                              animation: !solved ? ANIM.pulse : undefined,
                            }}
                          >
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-black bg-white">
                              <StationIcon className="h-2.5 w-2.5" />
                            </span>
                            <span className="truncate text-[8px] font-bold uppercase tracking-[0.16em]">
                              {activeStationLabelMap[zone.id] ?? zone.label}
                            </span>
                            <span
                              className={`absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-black ${bubbleClass}`}
                            />
                            {solved && (
                              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-black bg-emerald-200 text-emerald-800">
                                <IconSparkles className="h-2.5 w-2.5" />
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    <div
                      className={`anim-glow absolute flex items-center justify-center gap-1 border-2 border-black text-[9px] uppercase tracking-[0.2em] ${
                        allStationsSolved ? "bg-emerald-200" : "bg-slate-200 shadow-[2px_2px_0_#000]"
                      }`}
                      style={{
                        left: `${activeMap.finishZone.x}px`,
                        top: `${activeMap.finishZone.y}px`,
                        width: `${activeMap.finishZone.width}px`,
                        height: `${activeMap.finishZone.height}px`,
                        animation: allStationsSolved ? ANIM.glow : undefined,
                      }}
                    >
                      <span style={{ display: "inline-flex", animation: allStationsSolved ? ANIM.trophyBounce : undefined }}>
                        <IconTrophy className="h-3 w-3" />
                      </span>
                      Ziel
                    </div>

                    {hitImpact && (
                      <div
                        className="pointer-events-none absolute z-20"
                        style={{
                          left: `${hitImpact.x - 15}px`,
                          top: `${hitImpact.y - 15}px`,
                          width: "30px",
                          height: "30px",
                        }}
                      >
                        <div className="absolute inset-0 rounded-full border-2 border-rose-500/80 animate-ping" />
                        <div className="absolute inset-[32%] rounded-full bg-rose-500/80" />
                      </div>
                    )}

                    <PlayerSprite
                      x={player.x}
                      y={player.y}
                      width={JUMP_RUN_PLAYER.width}
                      height={JUMP_RUN_PLAYER.height}
                      vx={player.vx}
                      vy={player.vy}
                      onGround={player.onGround}
                      facing={player.facing as "left" | "right"}
                      hitFlashActive={hitFlashActive}
                      hitFlashDirection={hitFlashDirection}
                      playerPoweredUp={playerPoweredUp}
                      playerScale={playerScale}
                      now={nowTimestamp}
                      landingUntil={landingUntilRef.current}
                    />
                    <ParticleSystem particles={particleSnapshot} />
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto]">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-slate-600">
                    <IconShieldCheck className="h-4 w-4" />
                    Leben
                    <div className="ml-2 flex gap-1">
                      {Array.from({ length: JUMP_RUN_MAX_LIVES }).map((_, index) => (
                        <span
                          key={`life-${index}`}
                          className={`h-2 w-4 border-2 border-black ${
                            index < runnerLives ? "bg-emerald-300" : "bg-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="h-2 border-2 border-black bg-black/10">
                    <div
                      className="h-full bg-[var(--block)] transition-all"
                      style={{ width: `${runnerProgress}%` }}
                    />
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-slate-600">
                    Fortschritt {Math.round(runnerProgress)}%
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => triggerVirtualMove("left")}
                    onTouchStart={(event) => {
                      event.preventDefault();
                      onTouchMoveStart("left");
                    }}
                    onTouchEnd={(event) => {
                      event.preventDefault();
                      onTouchMoveEnd("left");
                    }}
                    onTouchCancel={(event) => {
                      event.preventDefault();
                      onTouchMoveEnd("left");
                    }}
                    disabled={!runnerAlive || runnerFinished}
                    className={`border-2 border-black px-3 py-1 text-[10px] uppercase tracking-[0.2em] shadow-[2px_2px_0_#000] ${
                      !runnerAlive || runnerFinished
                        ? "cursor-not-allowed bg-slate-200"
                        : touchState.left
                        ? "bg-sky-200"
                        : "bg-white hover:-translate-y-0.5"
                    }`}
                  >
                    Links
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerVirtualMove("right")}
                    onTouchStart={(event) => {
                      event.preventDefault();
                      onTouchMoveStart("right");
                    }}
                    onTouchEnd={(event) => {
                      event.preventDefault();
                      onTouchMoveEnd("right");
                    }}
                    onTouchCancel={(event) => {
                      event.preventDefault();
                      onTouchMoveEnd("right");
                    }}
                    disabled={!runnerAlive || runnerFinished}
                    className={`border-2 border-black px-3 py-1 text-[10px] uppercase tracking-[0.2em] shadow-[2px_2px_0_#000] ${
                      !runnerAlive || runnerFinished
                        ? "cursor-not-allowed bg-slate-200"
                        : touchState.right
                        ? "bg-sky-200"
                        : "bg-white hover:-translate-y-0.5"
                    }`}
                  >
                    Rechts
                  </button>
                  <button
                    type="button"
                    onClick={triggerVirtualJump}
                    onTouchStart={(event) => {
                      event.preventDefault();
                      triggerVirtualJump();
                    }}
                    disabled={!runnerAlive || runnerFinished}
                    className={`border-2 border-black px-3 py-1 text-[10px] uppercase tracking-[0.2em] shadow-[2px_2px_0_#000] ${
                      !runnerAlive || runnerFinished
                        ? "cursor-not-allowed bg-slate-200"
                        : touchState.jump
                        ? "bg-amber-300"
                        : "bg-[var(--block)] hover:-translate-y-0.5"
                    }`}
                  >
                    Springen
                  </button>
                  <button
                    type="button"
                    onClick={resetJumpRun}
                    className="border-2 border-black bg-white px-3 py-1 text-[10px] uppercase tracking-[0.2em] shadow-[2px_2px_0_#000] hover:-translate-y-0.5"
                  >
                    Neustart
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 sm:hidden">
                <button
                  type="button"
                  onTouchStart={(event) => {
                    event.preventDefault();
                    onTouchMoveStart("left");
                  }}
                  onTouchEnd={(event) => {
                    event.preventDefault();
                    onTouchMoveEnd("left");
                  }}
                  onTouchCancel={(event) => {
                    event.preventDefault();
                    onTouchMoveEnd("left");
                  }}
                  onMouseDown={() => onTouchMoveStart("left")}
                  onMouseUp={() => onTouchMoveEnd("left")}
                  onMouseLeave={() => onTouchMoveEnd("left")}
                  disabled={!runnerAlive || runnerFinished}
                  className={`border-2 border-black px-3 py-3 text-[11px] uppercase tracking-[0.2em] shadow-[2px_2px_0_#000] ${
                    !runnerAlive || runnerFinished
                      ? "cursor-not-allowed bg-slate-200"
                      : touchState.left
                      ? "bg-sky-200"
                      : "bg-white"
                  }`}
                >
                  ←
                </button>
                <button
                  type="button"
                  onTouchStart={(event) => {
                    event.preventDefault();
                    triggerVirtualJump();
                  }}
                  onMouseDown={triggerVirtualJump}
                  disabled={!runnerAlive || runnerFinished}
                  className={`border-2 border-black px-3 py-3 text-[11px] uppercase tracking-[0.2em] shadow-[2px_2px_0_#000] ${
                    !runnerAlive || runnerFinished
                      ? "cursor-not-allowed bg-slate-200"
                      : touchState.jump
                      ? "bg-amber-300"
                      : "bg-[var(--block)]"
                  }`}
                >
                  ↑
                </button>
                <button
                  type="button"
                  onTouchStart={(event) => {
                    event.preventDefault();
                    onTouchMoveStart("right");
                  }}
                  onTouchEnd={(event) => {
                    event.preventDefault();
                    onTouchMoveEnd("right");
                  }}
                  onTouchCancel={(event) => {
                    event.preventDefault();
                    onTouchMoveEnd("right");
                  }}
                  onMouseDown={() => onTouchMoveStart("right")}
                  onMouseUp={() => onTouchMoveEnd("right")}
                  onMouseLeave={() => onTouchMoveEnd("right")}
                  disabled={!runnerAlive || runnerFinished}
                  className={`border-2 border-black px-3 py-3 text-[11px] uppercase tracking-[0.2em] shadow-[2px_2px_0_#000] ${
                    !runnerAlive || runnerFinished
                      ? "cursor-not-allowed bg-slate-200"
                      : touchState.right
                      ? "bg-sky-200"
                      : "bg-white"
                  }`}
                >
                  →
                </button>
              </div>

              {runnerMessage && (
                <div className="mt-4 border-2 border-black bg-amber-100 px-3 py-2 text-xs">
                  {runnerMessage}
                </div>
              )}
              {recentlyEarnedCode && runnerFinished && (
                <div className="mt-3 border-2 border-black bg-emerald-100 px-3 py-2 text-xs">
                  Mission-Code freigeschaltet:{" "}
                  <span className="font-bold tracking-[0.2em]">{recentlyEarnedCode}</span>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="border-4 border-black bg-white p-5 shadow-[6px_6px_0_#000]">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-slate-600">
                  <IconBook className="h-4 w-4" />
                  Aktuelle Lernstation
                </div>
                {activeStation ? (
                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] border-2 border-black ${activeStationVisual.bubbleClass} ${activeStationVisual.accentClass}`}
                      >
                        <activeStationVisual.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="text-base font-bold">{activeStation.title}</div>
                        <p className="mt-2 text-sm text-slate-700">
                          {activeStation.learning}
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <div
                        className={`relative rounded-[10px] border-2 border-black px-3 py-2 text-xs shadow-[2px_2px_0_#000] ${activeStationVisual.bubbleClass}`}
                      >
                        <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                          <IconBook className="h-3 w-3" />
                          Mini-Quest
                        </div>
                        {activeStation.question}
                      </div>
                      <span
                        className={`absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 border-b-2 border-r-2 border-black ${activeStationVisual.bubbleClass}`}
                      />
                    </div>

                    <div className="space-y-2">
                      {activeStation.options.map((option) => {
                        const isSelected = activeStationAnswer === option.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            disabled={!runnerAlive || activeStationSolved}
                            onClick={() =>
                              handleStationSelect(activeStation.id, option.id)
                            }
                            className={`w-full border-2 border-black px-3 py-2 text-left text-xs shadow-[2px_2px_0_#000] transition ${
                              !runnerAlive || activeStationSolved
                                ? "cursor-not-allowed bg-slate-200"
                                : isSelected
                                ? "bg-emerald-200"
                                : "bg-white hover:-translate-y-0.5"
                            }`}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleStationCheck(activeStation.id)}
                        disabled={!runnerAlive || activeStationSolved}
                        className={`border-2 border-black px-3 py-1 text-[10px] uppercase tracking-[0.2em] shadow-[2px_2px_0_#000] ${
                          !runnerAlive || activeStationSolved
                            ? "cursor-not-allowed bg-slate-200"
                            : "bg-[var(--block)]"
                        }`}
                      >
                        Prüfen
                      </button>
                      {activeStationSolved && (
                        <span className="flex items-center gap-1 border-2 border-black bg-emerald-100 px-2 py-1 text-[10px] uppercase tracking-[0.2em]">
                          <IconSparkles className="h-3 w-3" />
                          {activeStation.reward}
                        </span>
                      )}
                    </div>
                    {stationFeedback && (
                      <div className="border-2 border-black bg-amber-100 px-3 py-2 text-xs">
                        {stationFeedback}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-slate-700">
                    Laufe zur nächsten Lernstation, um eine Mini-Aufgabe zu lösen.
                  </p>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>
{/* REMOVED: Mini-Map, Timer & Bestzeit, Lern-Logbuch panels — decluttered in redesign */}

    </main>
  );
}
