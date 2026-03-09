import {
  BarChart3,
  Brain,
  Building2,
  Code,
  Globe,
  Handshake,
  HeartPulse,
  Laptop,
  MonitorPlay,
  PenTool,
  Rocket,
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
    id: "inklusion",
    name: "Inklusion, Differenzierung & Sprachbildung",
    description:
      "Heterogene Lerngruppen fördern und sprachsensiblen Unterricht gestalten.",
    icon: Users,
    courseCount: 3,
  },
  {
    id: "gesundheit",
    name: "Gesundheit & Professionalisierung",
    description:
      "Gesundheitsförderung und professionelle Weiterentwicklung für Lehrkräfte.",
    icon: HeartPulse,
    courseCount: 3,
  },
  {
    id: "leistung",
    name: "Leistung, Feedback & Lernstand",
    description:
      "Lernstände erfassen, konstruktives Feedback geben und Leistung fair bewerten.",
    icon: BarChart3,
    courseCount: 3,
  },
  {
    id: "medienkompetenz",
    name: "Medienkompetenz & Medienkritik",
    description:
      "Medienkompetenz vermitteln und kritischen Umgang mit Medien fördern.",
    icon: MonitorPlay,
    courseCount: 3,
  },
  {
    id: "didaktik",
    name: "Didaktik & Unterrichtsdesign",
    description:
      "Innovative Lehr- und Lernmethoden für zeitgemäßen Unterricht entwickeln.",
    icon: PenTool,
    courseCount: 3,
  },
  {
    id: "team",
    name: "Team- und Beziehungsarbeit",
    description:
      "Zusammenarbeit im Kollegium stärken und Beziehungen zu Lernenden gestalten.",
    icon: Handshake,
    courseCount: 3,
  },
  {
    id: "schulentwicklung",
    name: "Schulentwicklung & Leadership",
    description:
      "Schulen zukunftsfähig gestalten und Führungskompetenzen ausbauen.",
    icon: Building2,
    courseCount: 3,
  },
  {
    id: "ki",
    name: "Künstliche Intelligenz",
    description:
      "Grundlagen und Anwendungen von KI im schulischen Alltag verstehen und nutzen.",
    icon: Brain,
    courseCount: 6,
  },
  {
    id: "digitale-tools",
    name: "Digitale Tools & Anwendungen",
    description:
      "Digitale Werkzeuge kennenlernen und effektiv im Unterricht einsetzen.",
    icon: Laptop,
    courseCount: 3,
  },
  {
    id: "schuelerwelten",
    name: "Schülerinnenwelten & Gesellschaft",
    description:
      "Lebenswelten von Schüler:innen verstehen und gesellschaftliche Themen aufgreifen.",
    icon: Globe,
    courseCount: 3,
  },
  {
    id: "startchancen",
    name: "Startchancen",
    description:
      "Chancengerechtigkeit fördern und Bildungsbenachteiligung abbauen.",
    icon: Rocket,
    courseCount: 3,
  },
  {
    id: "programmieren",
    name: "Programmieren & Informatik",
    description:
      "Grundlagen der Informatik und Programmierung praxisnah vermitteln.",
    icon: Code,
    courseCount: 3,
  },
];
