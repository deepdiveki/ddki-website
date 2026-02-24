import AboutSection from "@/components/About/AboutSection";
import Team from "@/components/About/Team";
import Breadcrumb from "@/components/Breadcrumb";
import CallToAction from "@/components/CallToAction";
import Features from "@/components/Home/Features";
import { Metadata } from "next";
import Clients from "@/components/About/Kunden";
import Kontakt from "@/components/KontaktChatbot";
import CookieBanner from "@/components/CookieBanner";


export const metadata: Metadata = {
  title: "Kontakt-Chatbot – Fragen Sie unseren KI-Assistenten",
  description:
    "Stellen Sie Ihre Fragen direkt an unseren KI-Chatbot. Erhalten Sie sofortige Antworten zu DeepDiveKI-Produkten, Preisen und Funktionen.",
};

const KontaktPage = () => {
  return (
    <>
      <Kontakt />
    </>
  );
};

export default KontaktPage;
