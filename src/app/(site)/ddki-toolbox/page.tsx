import AboutSection from "@/components/About/AboutSection";
import Team from "@/components/About/Team";
import Breadcrumb from "@/components/Breadcrumb";
import CallToAction from "@/components/CallToAction";
import Features from "@/components/DDKI-Toolbox/Tools";
import { Metadata } from "next";
import Clients from "@/components/About/Kunden";
import Uebersicht from "@/components/DDKI-Toolbox/Uebersicht";
import Pricing from "@/components/DDKI-Toolbox/Pricing";
import DDKICHAT from "@/components/DDKI-Toolbox/DDKICHAT";
import Produktvorschau from "@/components/About/Produktvorschau";
import HeroStaticDeepChat from "@/components/HeroStaticDeepChat";
import JsonLd from "@/components/JsonLd";

const deepChatJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "DeepChat",
  description:
    "All-in-One KI-Chat für Unterricht und schulische Organisation. Planen Sie Unterricht, erstellen Sie Material und nutzen Sie KI-Unterstützung.",
  brand: {
    "@type": "Organization",
    name: "DeepDiveKI",
  },
  url: "https://www.deepdive-ki.de/ddki-toolbox",
  category: "Bildungssoftware",
};

export const metadata: Metadata = {
  title: "DeepChat – KI-Chat für Unterricht und Schulorganisation",
  description:
    "DeepChat ist Ihr All-in-One KI-Chat für Unterricht und schulische Organisation. Planen Sie Unterricht, erstellen Sie Material und nutzen Sie KI-Unterstützung – alles in einem Chat.",
};

const ddki_toolbox = () => {
  return (
    <>
      <JsonLd data={deepChatJsonLd} />
      <HeroStaticDeepChat />
      <DDKICHAT />
      <Produktvorschau />
      <Features />
      <Pricing />
      <CallToAction />
    </>
  );
};

export default ddki_toolbox;
