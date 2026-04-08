import {
  IconBook,
  IconRobot,
  IconShieldCheck,
  IconUsers,
  IconBrain,
  IconSparkles,
} from "@tabler/icons-react";
import type { Character, WeltkarteDownload, DimensionId } from "../_lib/types";

export const DIMENSION_ACCESS_CODES: Record<DimensionId, string> = {
  ueber: "470913",
  durch: "582604",
  mit: "736185",
  // trotz: "249357",
};

export const CHARACTERS: Character[] = [
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
  // {
  //   id: "trotz",
  //   name: "Archivarin Analog",
  //   title: "Lernen trotz KI",
  //   role: "Die Wächterin",
  //   focus: "Kritikfähigkeit, Resilienz, Offline-Kompetenz",
  //   key: "Resilienz-Schlüssel",
  //   accent: "from-rose-400 via-pink-300 to-rose-200",
  //   badge: "bg-rose-300/90",
  //   icon: <IconShieldCheck className="h-6 w-6" />,
  // },
];

export const WELTKARTE_DOWNLOADS: WeltkarteDownload[] = [
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
  // {
  //   id: "trotz",
  //   title: "Lernen trotz KI",
  //   description:
  //     "Materialien zu Urteilskraft, Tiefenstruktur-Analyse, Prüfungsvalidität und professioneller Haltung.",
  //   pdfPath: "/downloads/ddki-trotz.pdf",
  //   accent: "border-rose-500 bg-rose-100/70",
  //   icon: <IconShieldCheck className="h-6 w-6" />,
  // },
];
