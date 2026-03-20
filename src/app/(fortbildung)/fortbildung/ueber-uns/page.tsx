import TeamSection from "@/components/ueber-uns/TeamSection";
import TestimonialsSection, { SchulFeedbackSection } from "@/components/ueber-uns/TestimonialsSection";
import CtaCard from "@/components/shared/CtaCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns – Das Team hinter DDKI",
  description:
    "Lernen Sie Björn Isenbiel und Tim Philipp kennen – das Team hinter DeepDive Fortbildungen. KI-Lösungen und Fortbildungen für Schulen aus Hamburg.",
  openGraph: {
    title: "Über uns | DeepDive Fortbildungen",
    description:
      "Ein junges Team aus Hamburg mit Leidenschaft für KI und Bildung. Lernen Sie uns kennen.",
  },
};

export default function UeberUnsPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-[linear-gradient(180deg,#DDD7FE_0%,#FFF_100%)] pt-31.5 pb-10 lg:pt-38 lg:pb-14">
        <div className="bg-[url('/images/bg-gradient.svg')] bg-cover bg-center">
        <div className="mx-auto max-w-304 px-4 text-center xl:px-0">
          <h1 className="text-display-sm font-light -tracking-[0.96px] text-text-primary lg:text-display-lg">
            Über uns
          </h1>
          <p className="mx-auto mt-3 max-w-150 text-md font-light text-text-secondary">
            Wir entwickeln KI-Lösungen und Fortbildungen für Schulen –
            praxisnah, datenschutzkonform und mit Fokus auf Mehrwert im
            Schulalltag.
          </p>
        </div>
        </div>
      </section>

      <TeamSection />
      <TestimonialsSection />
      <SchulFeedbackSection />
      <CtaCard />
    </div>
  );
}
