import { Feature } from "@/types/feature";
import AnimatedNeonRings from "@/components/AnimatedNeonRings";
import WorksheetGeneratorAnimation from "@/components/WorksheetGeneratorAnimation";
import ChatbotToolAnimation from "@/components/ChatbotToolAnimation";
import QRCodeAnimation from "@/components/QRCodeAnimation";
import AssistantAnimation from "@/components/KiAssistentenBuilder";
import PersonaAnimation from "@/components/PersonaKiAnimation";
import PDFChatAnimation from "@/components/ChatMitPdfAnimation";


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
      "In Entwicklung",
    icon: "/images/features/icon-01.svg",
    animationComponent: worksheetAnimation,
  },
  {
    id: 27,
    title: "KI Chatbot",
    description: "Entwickelt",
    icon: "/images/features/icon-02.svg",
    animationComponent: chatbotAnimation,
  },
  {
    id: 21,
    title: "Persona Chat",
    description:
      "In Entwicklung",
    icon: "/images/features/icon-03.svg",
    animationComponent: personaAnimation,
  },
  {
    id: 3,
    title: "Chat mit PDF",
    description:
      "In Entwicklung",
    icon: "/images/features/icon-04.svg",
    animationComponent: pdfChatAnimation,
    rotate: true,
  },
  {
    id: 48,
    title: "QR Code Generator",
    description:
      "Entwickelt",
    icon: "/images/features/icon-05.svg",
    animationComponent: qrCodeAnimation,
    rotate: true,
  },
  {
    id: 88,
    title: "KI-Assistenten erstellen",
    description: "In Entwicklung",
    icon: "/images/features/icon-06.svg",
    animationComponent: assistantAnimation,
    rotate: true,
  },
];

export default ddkitools;
