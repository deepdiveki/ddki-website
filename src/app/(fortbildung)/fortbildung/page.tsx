import CategoriesSection from "@/components/homepage/CategoriesSection";
import CertificatePreviewSection from "@/components/homepage/CertificatePreviewSection";
import FeaturedCoursesSection from "@/components/homepage/FeaturedCoursesSection";
import HeroSection from "@/components/homepage/HeroSection";
import KomplettkursSection from "@/components/homepage/KomplettkursSection";
import CtaCard from "@/components/shared/CtaCard";
import FAQSection from "@/components/shared/FaqSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fortbildungen für Lehrkräfte – KI, Digitalisierung & Pädagogik",
  description:
    "Entdecken Sie praxisnahe Fortbildungen in KI, Digitalisierung und Pädagogik. Kategorien, empfohlene Kurse und zertifizierte Abschlüsse für Lehrkräfte.",
  openGraph: {
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "DeepDiveKI – KI-Fortbildungen & Software für Schulen",
      },
    ],
    title: "Fortbildungen für Lehrkräfte – KI, Digitalisierung & Pädagogik",
    description:
      "Praxisnahe Fortbildungen in KI, Digitalisierung und Pädagogik. Zertifizierte Abschlüsse für Lehrkräfte.",
  },
  alternates: {
    canonical: "https://www.deepdive-ki.de/fortbildung",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoriesSection />
      <FeaturedCoursesSection />
      <KomplettkursSection />
      <CertificatePreviewSection />
      <FAQSection />
      <CtaCard />
    </div>
  );
}
