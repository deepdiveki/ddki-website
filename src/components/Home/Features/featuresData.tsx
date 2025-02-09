import { Feature } from "@/types/feature";

import OpenAIIntegrationAnimation from "@/components/OpenAIIntegrationAnimation";
import NextJsAnimation from "@/components/NextJsAnimation";
import SecurityPrivacyAnimation from "@/components/SicherheitDatenschutzAnimation";
import CuttingEdgeAnimation from "@/components/CuttingedgeTechnologienAnimation";
import AIModelAnimation from "@/components/OptimierteKIModelleAnimation";
import HamburgAbstractAnimation from "@/components/MadeinHamburgAnimation";

const openAIIntegrationAnimation = <OpenAIIntegrationAnimation />;
const nextJsAnimation = <NextJsAnimation />;
const securityPrivacyAnimation = <SecurityPrivacyAnimation />;
const cuttingEdgeAnimation = <CuttingEdgeAnimation />;
const aiModelAnimation = <AIModelAnimation />;
const hamburgAbstractAnimation = <HamburgAbstractAnimation />;

const featuresData: Feature[] = [
  {
    id: 11,
    title: "OpenAI Integration",
    description:
      "Datenschutzkonforme Integration für optimale Ergebnisse",
    icon: "/images/features/icon-01.svg",
    animationComponent: openAIIntegrationAnimation,

  },
  {
    id: 27,
    title: "Next.js 13, React 18, TS",
    description: "Neuste Full-Stack Technologien für beste Performance",
    icon: "/images/features/icon-02.svg",
    animationComponent: nextJsAnimation,
  },
  {
    id: 21,
    title: "Sicherheit & Datenschutz",
    description:
      "Sicherheit und Datenschutz sind uns wichtig. Wir halten uns an die DSGVO",
    icon: "/images/features/icon-03.svg",
    animationComponent: securityPrivacyAnimation,
  },
  {
    id: 3,
    title: "Cutting-edge Technologien",
    description:
      "Moderne Technologien für beste Performance und Nutzererfahrung",
    icon: "/images/features/icon-04.svg",
    animationComponent: cuttingEdgeAnimation,
    rotate: true,
  },
  {
    id: 48,
    title: "Optimierte KI Modelle",
    description:
      "KI Modelle für optimale Ergebnisse und beste Nutzererfahrung",
    icon: "/images/features/icon-05.svg",
    animationComponent: aiModelAnimation,
    rotate: true,
  },
  {
    id: 3,
    title: "Made in Hamburg",
    description: "Von uns für euch - Made in Hamburg",
    icon: "/images/features/icon-06.svg",
    animationComponent: hamburgAbstractAnimation,
    rotate: true,
  },
];

export default featuresData;
