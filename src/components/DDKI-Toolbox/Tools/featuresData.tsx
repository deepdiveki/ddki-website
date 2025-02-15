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
      "In Entwicklung",
    icon: "/images/features/icon-01.svg",
    animationComponent: worksheetAnimation,
    link: "https://toolbox.deepdive-ki.de/arbeitsblatt-generator",
  },
  {
    id: 27,
    title: "KI-Chat",
    description: "Nutze die besten LMS für deine Chats. GPT 4o, Llama 3.1, Claude 3 Opus",
    icon: "/images/features/icon-02.svg",
    animationComponent: chatbotAnimation,
    link: "https://toolbox.deepdive-ki.de/ki-chat",
  },
  {
    id: 21,
    title: "Persona Chat",
    description:
      "In Entwicklung",
    icon: "/images/features/icon-03.svg",
    animationComponent: personaAnimation,
    link: "https://toolbox.deepdive-ki.de/personachat",
  },
  {
    id: 3,
    title: "Chat mit PDF",
    description:
      "In Entwicklung",
    icon: "/images/features/icon-04.svg",
    animationComponent: pdfChatAnimation,
    rotate: true,
    link: "https://toolbox.deepdive-ki.de/chat-mit-pdf",
  },
  {
    id: 48,
    title: "QR Code Generator",
    description:
      "Erstelle QR Codes für deine Lerninhalte",
    icon: "/images/features/icon-05.svg",
    animationComponent: qrCodeAnimation,
    rotate: true,
    link: "https://toolbox.deepdive-ki.de/qrcode-generator",
  },
  {
    id: 88,
    title: "KI-Assistenten erstellen",
    description: "In Entwicklung",
    icon: "/images/features/icon-06.svg",
    animationComponent: assistantAnimation,
    rotate: true,
    link: "https://toolbox.deepdive-ki.de/ki-assistent",
  },
];

export default ddkitools;
