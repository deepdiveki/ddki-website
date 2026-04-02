import { Feature } from "@/types/feature";
import AnimatedNeonRings from "@/components/animations/AnimatedNeonRings";
import WorksheetGeneratorAnimation from "@/components/animations/WorksheetGeneratorAnimation";
import ChatbotToolAnimation from "@/components/animations/ChatbotToolAnimation";
import QRCodeAnimation from "@/components/animations/QRCodeAnimation";
import AssistantAnimation from "@/components/animations/KiAssistentenBuilder";
import PersonaAnimation from "@/components/animations/PersonaKiAnimation";
import PDFChatAnimation from "@/components/animations/ChatMitPdfAnimation";
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
      "Im DeepChat können Sie Arbeitsblätter erstellen und bearbeiten. Diese können Sie dann digital teilen oder als PDF/Docx herunterladen",
    icon: "/images/features/icon-01.svg",
    animationComponent: worksheetAnimation,
    link: "https://toolbox.deepdive-ki.de/",
  },
  {
    id: 27,
    title: "DeepChat Performance",
    description: "Besten LLM's für Ihre Chats. Mit unserer DDKI Auto-Select & Prompt-Architecture Technologie wählt der DeepChat automatisch die besten Modelle für Ihre Chats.",
    icon: "/images/features/icon-02.svg",
    animationComponent: chatbotAnimation,
    link: "https://toolbox.deepdive-ki.de/",
  },
  {
    id: 21,
    title: "Persona Chat",
    description: "Chatten Sie im DeepChat mit berühmten oder historischen Persönlichkeiten",
    icon: "/images/features/icon-03.svg",
    animationComponent: personaAnimation,
    link: "https://toolbox.deepdive-ki.de/",
  },
  {
    id: 23,
    title: "Chat Assistenten",
    description:
      "Erstellen Sie einen Chat-Assistenten, den Sie mit eigenen Informationen erweitern können, für individuelle Lernwege oder zur Automatisierung wiederkehrender Aufgaben.",
    icon: "/images/features/icon-04.svg",
    animationComponent: pdfChatAnimation,
    rotate: true,
    link: "https://toolbox.deepdive-ki.de/",
  },
  {
    id: 48,
    title: "Simple Share",
    description:
      "Erstellen Sie QR-Codes und Links und teilen Sie diese mit Ihren Schülern",
    icon: "/images/features/icon-05.svg",
    animationComponent: qrCodeAnimation,
    rotate: true,
    link: "https://toolbox.deepdive-ki.de/",
  },
  {
    id: 88,
    title: "Dein DeepChat",
    description: "Sie können Ihre Fächer und Unterrichtsthemen eingeben, damit wir Ihnen maßgeschneiderte und individuelle Ergebnisse bereitstellen können.",
    icon: "/images/features/icon-06.svg",
    animationComponent: assistantAnimation,
    rotate: true,
    link: "https://toolbox.deepdive-ki.de/",
  },
];

export default ddkitools;
