import ContactFormSection from "@/components/Kontakt/ContactFormSection";
import NiedersachsenVisitNotifier from "@/components/niedersachsen/NiedersachsenVisitNotifier";
import NlcTrainingOverview from "@/components/niedersachsen/NlcTrainingOverview";
import PaedagogischerTagContent from "@/components/paedagogischer-tag/PaedagogischerTagContent";
import CtaCard from "@/components/shared/CtaCard";
import type { Metadata } from "next";


export const metadata: Metadata = {
  alternates: {
    canonical: "/fortbildung/niedersachsen",
  },
  title: "Fortbildungen",
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
    title: "Fortbildungen | DeepDive",
    description:
      "Fragen zu Fortbildungen, Keynotes oder dem pädagogischen Tag? Wir beraten Sie gerne.",
  },
};

export default function NiedersachsenPage() {
  return (
    <div className="min-h-screen">
      <NiedersachsenVisitNotifier />
      <section className="bg-[linear-gradient(180deg,#DDD7FE_0%,#FFF_100%)] hero-offset pb-10 lg:pb-14">
        <div className="bg-[url('/images/bg-gradient.svg')] bg-cover bg-center">
          <div className="mx-auto max-w-304 px-4 text-center xl:px-0">
            <h1 className="text-display-sm font-semibold -tracking-[0.96px] text-text-primary lg:text-display-lg">
              Fortbildungen von DeepDiveKI
            </h1>
            <p className="mx-auto mt-3 max-w-150 text-md font-light text-text-secondary">
              Wir unterstützen Schulen mit praxisnahen Lehrerfortbildungen sowohl als Online-Fortbildung im
              NLC als auch als pädagogischer Tag.
            </p>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-304">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-12">
          <div className="min-w-0 lg:border-r lg:border-border-tertiary lg:pr-10 xl:pr-12">
            <PaedagogischerTagContent pageVariant="niedersachsen" part="main" />
          </div>
          <aside
            aria-label="NLC-Termine"
            className="border-t border-border-tertiary px-4 py-10 md:py-14 lg:sticky lg:top-28 lg:self-start lg:border-t-0 lg:px-0 lg:pt-10 lg:pb-14 xl:pt-14 xl:pb-20"
          >
            <NlcTrainingOverview variant="sidebar" />
          </aside>
        </div>
        <PaedagogischerTagContent pageVariant="niedersachsen" part="schedule" />
      </div>
      <ContactFormSection />
      <CtaCard />
    </div>
  );
}
