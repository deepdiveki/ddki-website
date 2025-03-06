import { Feature } from "@/types/feature";
import AnimatedNeonRings from "@/components/AnimatedNeonRings";
import WorksheetGeneratorAnimation from "@/components/WorksheetGeneratorAnimation";
import ChatbotToolAnimation from "@/components/ChatbotToolAnimation";
import QRCodeAnimation from "@/components/QRCodeAnimation";
import AssistantAnimation from "@/components/KiAssistentenBuilder";
import PersonaAnimation from "@/components/PersonaKiAnimation";
import PDFChatAnimation from "@/components/ChatMitPdfAnimation";
import { Menu } from "@/types/menu";



const worksheetAnimation = <WorksheetGeneratorAnimation />;
const chatbotAnimation = <ChatbotToolAnimation />;
const qrCodeAnimation = <QRCodeAnimation />;
const assistantAnimation = <AssistantAnimation />;
const personaAnimation = <PersonaAnimation />;
const pdfChatAnimation = <PDFChatAnimation />;


const ddkitools: Feature[] = [
  {
    id: 11,
    title: "Arbeitsblatt Generator",
    description:
      "Verfügbar ab: 04/2025",
    icon: "/images/features/icon-01.svg",
    animationComponent: worksheetAnimation,
    link: "https://www.deepdive-ki.de/ddki-toolbox",
  },
  {
    id: 27,
    title: "KI-Chat",
    description: "Nutze die besten LLM'S für deine Chats. GPT 4o, Llama 3.3, Claude 3.7",
    icon: "/images/features/icon-02.svg",
    animationComponent: chatbotAnimation,
    link: "https://toolbox.deepdive-ki.de/",
  },
  {
    id: 21,
    title: "Persona Chat",
    description:
      "Verfügbar ab: 04/2025",
    icon: "/images/features/icon-03.svg",
    animationComponent: personaAnimation,
    link: "https://www.deepdive-ki.de/ddki-toolbox",
  },
  {
    id: 3,
    title: "Chat mit PDF",
    description:
      "Verfügbar ab: 04/2025",
    icon: "/images/features/icon-04.svg",
    animationComponent: pdfChatAnimation,
    rotate: true,
    link: "https://www.deepdive-ki.de/ddki-toolbox",
  },
  {
    id: 48,
    title: "Simple Share",
    description:
      "Verfügbar ab: 04/2025",
    icon: "/images/features/icon-05.svg",
    animationComponent: qrCodeAnimation,
    rotate: true,
    link: "https://www.deepdive-ki.de/ddki-toolbox",
  },
  {
    id: 88,
    title: "KI-Assistenten erstellen",
    description: "Verfügbar ab: 04/2025",
    icon: "/images/features/icon-06.svg",
    animationComponent: assistantAnimation,
    rotate: true,
    link: "https://www.deepdive-ki.de/ddki-toolbox",
  },
];

export default ddkitools;
