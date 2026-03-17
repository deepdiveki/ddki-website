import CalendlySection from "@/components/Kontakt/CalendlySection";
import ContactFormSection from "@/components/Kontakt/ContactFormSection";
import CtaCard from "@/components/shared/CtaCard";
import FAQSection from "@/components/shared/FaqSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktieren Sie uns für Fragen zu unseren Fortbildungsangeboten. Wir beraten Sie gerne persönlich.",
  openGraph: {
    title: "Kontakt | DDKI Fortbildungen",
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
