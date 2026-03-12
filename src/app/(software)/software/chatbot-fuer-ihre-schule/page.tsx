import AboutSection from "@/components/About/AboutSection";
import Pricing from "@/components/Chatbot-fuer-ihre-schule/Pricing";
// removed Breadcrumb to avoid duplicate large page title
import CallToAction from "@/components/CallToAction";
import Chatbot from "@/components/Chatbot-fuer-ihre-schule/Chatbot";
import Features from "@/components/Chatbot-fuer-ihre-schule/Chatbot";
import HeroChatbot from "@/components/Chatbot-fuer-ihre-schule/Hero";
import Hero from "@/components/Home/Hero";
import { Metadata } from "next";
import Usecases from "@/components/Chatbot-fuer-ihre-schule/Usecases";
import HeroStaticSchulbuero from "@/components/HeroStaticSchulbuero";
import JsonLd from "@/components/JsonLd";

const schulbueroJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "KI-Schulbüro",
  description:
    "KI-Chatbot für Schulwebsites, der Fragen rund um Schule und Organisation beantwortet – z.B. Termine, Anmeldungen und Kontaktinformationen.",
  brand: {
    "@type": "Organization",
    name: "DeepDiveKI",
  },
  url: "https://www.deepdive-ki.de/software/chatbot-fuer-ihre-schule",
  category: "Bildungssoftware",
};

export const metadata: Metadata = {
  title: "KI-Schulbüro – Chatbot für Ihre Schulwebsite",
  description:
    "Unser KI-Chatbot für Schulwebsites beantwortet Fragen rund um Schule und Organisation (z.B. Termine, Anmeldungen). Entlasten Sie Ihr Schulbüro und bieten Ihrer Schulgemeinschaft einen modernen Service.",
  alternates: {
    canonical: "https://www.deepdive-ki.de/software/chatbot-fuer-ihre-schule",
  },
};

const AboutPage = () => {
  return (
    <>
      <JsonLd data={schulbueroJsonLd} />
      <HeroStaticSchulbuero />
      <HeroChatbot />
      <Usecases />
      <Chatbot />
      <Pricing />
      <CallToAction />
    </>
  );
};

export default AboutPage;
