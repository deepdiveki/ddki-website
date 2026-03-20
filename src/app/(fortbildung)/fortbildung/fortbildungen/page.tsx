import CourseList from "@/components/fortbildungen/CourseList";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alle Fortbildungen im Überblick",
  description:
    "Entdecken Sie unser vielfältiges Angebot an Fortbildungen in den Bereichen KI, Digitalisierung, Pädagogik, Management und Gesundheit.",
  openGraph: {
    title: "Alle Fortbildungen im Überblick | DeepDive Fortbildungen",
    description:
      "Vielfältige Fortbildungen in KI, Digitalisierung, Pädagogik und mehr – filtern Sie nach Kategorie und Format.",
  },
};

export default function FortbildungenPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-[linear-gradient(180deg,#DDD7FE_0%,#FFF_100%)] pt-31.5 pb-10 lg:pt-38 lg:pb-14">
        <div className="bg-[url('/images/bg-gradient.svg')] bg-cover bg-center">
        <div className="mx-auto max-w-304 px-4 text-center xl:px-0">
          <h1 className="text-display-sm font-light -tracking-[0.96px] text-text-primary lg:text-display-lg">
            Unsere Fortbildungen
          </h1>
          <p className="mx-auto mt-3 max-w-130 text-md font-light text-text-secondary">
            Finden Sie die passende Fortbildung für Ihre berufliche
            Weiterentwicklung. Filtern Sie nach Kategorie oder Format.
          </p>
        </div>
        </div>
      </section>

      <section className="bg-background-secondary py-10 md:py-14 lg:py-20">
        <div className="mx-auto max-w-304 px-4 xl:px-0">
          <Suspense>
            <CourseList />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
