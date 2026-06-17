import ContactFormSection from "@/components/Kontakt/ContactFormSection";
import NiedersachsenVisitNotifier from "@/components/niedersachsen/NiedersachsenVisitNotifier";
import NlcTrainingOverview from "@/components/niedersachsen/NlcTrainingOverview";
import PaedagogischerTagContent from "@/components/paedagogischer-tag/PaedagogischerTagContent";
import CtaCard from "@/components/shared/CtaCard";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Fortbildungen",
  description:
    "Kontaktieren Sie uns für Fragen zu unseren Fortbildungsangeboten. Wir beraten Sie gerne persönlich.",
  openGraph: {
    title: "Fortbildungen | DeepDive",
    description:
      "Fragen zu Fortbildungen, Keynotes oder dem pädagogischen Tag? Wir beraten Sie gerne.",
  },
};

export default function NiedersachsenPage() {
  return (
    <div className="min-h-screen">
      <NiedersachsenVisitNotifier />
      <section className="bg-[linear-gradient(180deg,#DDD7FE_0%,#FFF_100%)] pt-31.5 pb-10 lg:pt-38 lg:pb-14">
        <div className="bg-[url('/images/bg-gradient.svg')] bg-cover bg-center">
          <div className="mx-auto max-w-304 px-4 text-center xl:px-0">
            <h1 className="text-display-sm font-light -tracking-[0.96px] text-text-primary lg:text-display-lg">
              Fortbildungen von DeepDiveKI
            </h1>
            <p className="mx-auto mt-3 max-w-150 text-md font-light text-text-secondary">
              Wir unterstützen Schulen mit praxisnahen Lehrerfortbildungen sowohl als Online-Fortbildung im
              NLC als auch als pädagogischer Tag.
            </p>
          </div>
        </div>
      </section>
      <NlcTrainingOverview />
      <PaedagogischerTagContent />
      <ContactFormSection />
      <CtaCard />
    </div>
  );
}
