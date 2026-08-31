import {
  BarChart3,
  Brain,
  Building2,
  Laptop,
  MonitorPlay,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Category = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  courseCount: number;
};

export const categories: Category[] = [
  {
    id: "ki-grundlagen",
    name: "KI-Grundlagen",
    description:
      "Einstieg in KI, Unterrichtsplanung und verantwortungsvoller Umgang mit Künstlicher Intelligenz.",
    icon: Brain,
    courseCount: 4,
  },
  {
    id: "ki-tools-chatbots",
    name: "Tools & Chatbots",
    description:
      "DeepChat, Chatbots und eigene KI-Assistenten praxisnah im Unterricht einsetzen.",
    icon: Laptop,
    courseCount: 3,
  },
  {
    id: "foerderung-inklusion",
    name: "Förderung & Inklusion",
    description:
      "Differenzierung, Inklusion und gezielte Förderung mit KI-Unterstützung gestalten.",
    icon: Users,
    courseCount: 5,
  },
  {
    id: "pruefen-bewerten-feedback",
    name: "Prüfen & Bewerten",
    description:
      "Leistungsbewertung, Prüfungsformate und konstruktives Feedback in Zeiten von KI.",
    icon: BarChart3,
    courseCount: 3,
  },
  {
    id: "schule-zusammenarbeit",
    name: "Schulentwicklung & Kommunikation",
    description:
      "Schulentwicklung, Teamarbeit und Entlastung im pädagogischen Alltag mit KI.",
    icon: Building2,
    courseCount: 3,
  },
  {
    id: "fachunterricht-medien-informatik",
    name: "Fachunterricht & Medien",
    description:
      "Digitale Werkzeuge, Medienkompetenz, fachübergreifende Impulse und Programmieren.",
    icon: MonitorPlay,
    courseCount: 4,
  },
  {
    id: "medien-gesellschaft",
    name: "Medien & Gesellschaft",
    description:
      "Ethik, Datenschutz, Jugendschutz und gesellschaftliche Perspektiven auf KI und Digitalisierung.",
    icon: Shield,
    courseCount: 4,
  },
];
