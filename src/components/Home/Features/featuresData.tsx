import { Feature } from "@/types/feature";

import OpenAIIntegrationAnimation from "@/components/animations/OpenAIIntegrationAnimation";
import NextJsAnimation from "@/components/animations/NextJsAnimation";
import SecurityPrivacyAnimation from "@/components/animations/SicherheitDatenschutzAnimation";
import CuttingEdgeAnimation from "@/components/animations/CuttingedgeTechnologienAnimation";
import AIModelAnimation from "@/components/animations/OptimierteKIModelleAnimation";
import HamburgAbstractAnimation from "@/components/animations/MadeinHamburgAnimation";

const openAIIntegrationAnimation = <OpenAIIntegrationAnimation />;
const nextJsAnimation = <NextJsAnimation />;
const securityPrivacyAnimation = <SecurityPrivacyAnimation />;
const cuttingEdgeAnimation = <CuttingEdgeAnimation />;
const aiModelAnimation = <AIModelAnimation />;
const hamburgAbstractAnimation = <HamburgAbstractAnimation />;

const featuresData: Feature[] = [
  {
    id: 11,
    title: "Günstige und passende API's",
    description:
      "Günstige und datenschutzkonforme Integration von verschiedenen KI-Modellen für optimale Ergebnisse",
    icon: "/images/features/icon-01.svg",
    animationComponent: openAIIntegrationAnimation,

  },
  {
    id: 27,
    title: "Next.js 15, React 19, TS",
    description: "Neuste Full-Stack Website Technologien für gute Performance im Schulalltag",
    icon: "/images/features/icon-02.svg",
    animationComponent: nextJsAnimation,
  },
  {
    id: 21,
    title: "Sicherheit & Datenschutz",
    description:
      "Sicherheit und Datenschutz sind uns wichtig. Wir halten uns an die DSGVO. Hosting in der EU",
    icon: "/images/features/icon-03.svg",
    animationComponent: securityPrivacyAnimation,
  },
  {
    id: 26,
    title: "KI-Werkzeuge für Lehrkräfte",
    description:
      "Erstellung von Arbeitsmaterialien, schnelle Differenzierung der Lernmaterialien und administrative Erleichterung",
    icon: "/images/features/icon-04.svg",
    animationComponent: cuttingEdgeAnimation,
    rotate: true,
  },
  {
    id: 48,
    title: "Konstante Weiterentwicklung",
    description:
      "Stetige Weiterentwicklung der KI Tools und Optimierung der LLM's an Ihre Bedürfnisse",
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
