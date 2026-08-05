import CalendlySection from "@/components/Kontakt/CalendlySection";
import ContactFormSection from "@/components/Kontakt/ContactFormSection";
import CtaCard from "@/components/shared/CtaCard";
import FAQSection from "@/components/shared/FaqSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/fortbildung/kontakt",
  },
  title: "Kontakt",
  description:
    "Kontaktieren Sie uns für Fragen zu unseren Fortbildungsangeboten. Wir beraten Sie gerne persönlich.",
  openGraph: {
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "DeepDiveKI – KI-Fortbildungen & Software für Schulen",
      },
    ],
    title: "Kontakt | DeepDive Fortbildungen",
    description:
      "Fragen zu Fortbildungen, Keynotes oder dem pädagogischen Tag? Wir beraten Sie gerne.",
  },
};

export default function KontaktPage() {
  return (
    <div className="min-h-screen">
      <ContactFormSection />
      <CalendlySection />
      <FAQSection />
      <CtaCard />
    </div>
  );
}
