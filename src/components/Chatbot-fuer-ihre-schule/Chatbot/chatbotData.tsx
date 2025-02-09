import { Feature } from "@/types/feature";
import IconFeature from '../../../../public/images/features/icon-02.svg';

import AwsBedrockAnimation from "@/components/AWSBedrockIntegrationChatBotAnimation";
import FullStackTechAnimation from "@/components/NextJsChatBotAnimation"
import SecurityPrivacyAnimation from "@/components/SicherheitChatBotAnimation"
import DataTransmissionAnimation from "@/components/DatenübertragungChatbotAnimation"
import OptimizedModelsAnimation from "@/components/OptimierteKIChatbotAnimation"
import MadeInHamburgChatbotAnimation from "@/components/MadeinHamburgChatbotAnimation"
import CitySkylineAnimation from "@/components/MadeinHamburgAnimation"

const awsBedrockAnimation = <AwsBedrockAnimation />;
const fullStackTechAnimation = <FullStackTechAnimation />;
const securityPrivacyAnimation = <SecurityPrivacyAnimation/>;
const dataTransmissionAnimation = <DataTransmissionAnimation/>;
const optimizedModelsAnimation = <OptimizedModelsAnimation/>; 
const citySkylineAnimationchatbot = <CitySkylineAnimation/>;

const featuresDatachatbot: Feature[] = [
  {
    id: 11,
    title: "OpenAI/AWS Bedrock Integration",
    description:
      "Datenschutzkonforme Integration für sichere und geschützte Ergebnisse",
    icon: "/images/features/icon-01.svg",
    animationComponent: awsBedrockAnimation,
  },
  {
    id: 27,
    title: "Next.js 13, React 18, TS",
    description: "Neuste Full-Stack Technologien für beste Performance",
    icon: "/images/features/icon-02.svg",
    animationComponent: fullStackTechAnimation,
  },
  {
    id: 21,
    title: "Sicherheit & Datenschutz",
    description:
      "Sicherheit und Datenschutz sind uns wichtig. Wir halten uns an die DSGVO. Hosting in Europa.",
    icon: "/images/features/icon-03.svg",
    animationComponent: securityPrivacyAnimation,
  },
  {
    id: 3,
    title: "Datenübertragung und Ausgabenkontrolle",
    description:
      "C5-Framework und Aggegierte Datenübertragung für beste Performance und Nutzererfahrung",
    icon: "/images/features/icon-04.svg",
    animationComponent: dataTransmissionAnimation,
    rotate: true,
  },
  {
    id: 48,
    title: "Optimierte KI Modelle",
    description:
      "KI Modelle für optimale Ergebnisse und beste Nutzererfahrung",
    icon: "/images/features/icon-05.svg",
    animationComponent: optimizedModelsAnimation,
    rotate: true,
  },
  {
    id: 33,
    title: "Made in Hamburg",
    description: "Von uns für euch - Made in Hamburg",
    icon: "/images/features/icon-06.svg",
    animationComponent: citySkylineAnimationchatbot,
    rotate: true,
  },
];

export default featuresDatachatbot;
