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
      "Im DeepDiveChat können Sie Arbeitsblätter erstellen und bearbeiten. Diese können Sie dann digital teilen oder als PDF/Docx herunterladen",
    icon: "/images/features/icon-01.svg",
    animationComponent: worksheetAnimation,
    link: "https://toolbox.deepdive-ki.de/",
  },
  {
    id: 27,
    title: "DeepDiveChat Performance",
    description: "Besten LLM's für Ihre Chats. GPT o3, Gemini 2.0, Sonar. Mit unserer DDKI Auto-Select & Prompt-Arcitektur Technologie wählt der DeepDiveChat automatisch die besten Modelle für Ihre Chats.",
    icon: "/images/features/icon-02.svg",
    animationComponent: chatbotAnimation,
    link: "https://toolbox.deepdive-ki.de/",
  },
  {
    id: 21,
    title: "Persona Chat",
    description: "Chatten Sie im DeepDiveChat mit berühmten oder historischen Persönlichkeiten",
    icon: "/images/features/icon-03.svg",
    animationComponent: personaAnimation,
    link: "https://toolbox.deepdive-ki.de/",
  },
  {
    id: 3,
    title: "Chat Assistenten",
    description:
      "Erstellen Sie einen Chat-Assistenten, den Sie mit eigenen Informationen erweitern können – für individuelle Lernwege oder zur Automatisierung wiederkehrender Aufgaben.",
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
    title: "Dein DeepDiveChat",
    description: "Sie können Ihre Fächer und Unterrichtsthemen eingeben, damit wir Ihnen maßgeschneiderte und individuelle Ergebnisse bereitstellen können.",
    icon: "/images/features/icon-06.svg",
    animationComponent: assistantAnimation,
    rotate: true,
    link: "https://toolbox.deepdive-ki.de/",
  },
];

export default ddkitools;
