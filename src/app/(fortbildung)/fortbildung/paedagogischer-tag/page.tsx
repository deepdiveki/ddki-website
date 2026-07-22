import ImageSlideshow from "@/components/paedagogischer-tag/ImageSlideshow";
import PaedagogischerTagContent from "@/components/paedagogischer-tag/PaedagogischerTagContent";
import CtaCard from "@/components/shared/CtaCard";
import LogoSlider from "@/components/shared/LogoSlider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/fortbildung/paedagogischer-tag",
  },
  title: "Pädagogischer Tag: Maßgeschneidert für Ihre Schule",
  description:
    "Gestalten Sie Ihren pädagogischen Tag mit maßgeschneiderten Fortbildungen rund um KI im Schulalltag – praxisnah, interaktiv und individuell.",
  openGraph: {
    title: "Pädagogischer Tag | DeepDive Fortbildungen",
    description:
      "Maßgeschneiderte KI-Fortbildungen für Ihr gesamtes Kollegium – von der Planung bis zur Nachbereitung.",
  },
};

export default function PaedagogischerTagPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-[linear-gradient(180deg,#DDD7FE_0%,#FFF_100%)] pt-31.5 pb-10 lg:pt-38 lg:pb-14">
        <div className="bg-[url('/images/bg-gradient.svg')] bg-cover bg-center">
          <div className="mx-auto max-w-304 px-4 text-center xl:px-0">
            <h1 className="text-display-sm font-light -tracking-[0.96px] text-text-primary lg:text-display-lg">
              Pädagogischer Tag
            </h1>
            <p className="mx-auto mt-3 max-w-150 text-md font-light text-text-secondary">
              Wir gestalten Ihren pädagogischen Tag praxisnah, interaktiv und
              individuell auf Ihre Schule zugeschnitten.
            </p>
          </div>
        </div>
      </section>

      <ImageSlideshow />
      <PaedagogischerTagContent />
      <LogoSlider />
      <CtaCard />
    </div>
  );
}
