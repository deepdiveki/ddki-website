import CallToAction from "@/components/CallToAction";
import Features from "@/components/Home/Features";
import FeaturesList from "@/components/Home/FeaturesList";
import Hero from "@/components/Home/Hero";
import SchulFeedback from "@/components/Home/SchulFeedback";
import { Metadata } from "next";
import CookieBanner from "@/components/CookieBanner";
import Kontakt from "@/components/Kontakt";
import JsonLd from "@/components/JsonLd";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DeepDiveKI",
  url: "https://www.deepdive-ki.de",
  logo: "https://www.deepdive-ki.de/images/logo/deepdiveki-logo.svg",
  description:
    "DeepDiveKI bietet Schulen innovative KI-Tools: DeepChat, KI-Schulbüro und praxisnahe Fortbildungen für Lehrkräfte.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: "https://www.deepdive-ki.de/software/kontakt",
    availableLanguage: "German",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DeepDiveKI",
  url: "https://www.deepdive-ki.de",
};

export const metadata: Metadata = {
  title: "DeepChat, KI-Schulbüro und KI-Fortbildungen für Schulen",
  description:
    "DeepDiveKI bietet Schulen innovative KI-Tools: DeepChat für den Unterricht, KI-Schulbüro für die Schulwebsite und praxisnahe Fortbildungen für Lehrkräfte.",
};

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <Hero />

      <Features />
      <SchulFeedback />
      <Kontakt />
      <CallToAction />
    </>
  );
}
