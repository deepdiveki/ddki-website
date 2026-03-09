import CtaCard from "@/components/shared/CtaCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keynote – KI in der Bildung",
  description:
    "Inspirierende Keynotes rund um Künstliche Intelligenz in der Bildung – für Konferenzen, Schulveranstaltungen und pädagogische Tage.",
  openGraph: {
    title: "Keynote – KI in der Bildung | DDKI Fortbildungen",
    description:
      "Inspirierende Vorträge zu KI im Klassenzimmer, Zukunft der Bildung und Datenschutz – individuell für Ihre Veranstaltung.",
  },
};

export default function KeynotePage() {
  return (
    <div className="min-h-screen">
      <section className="bg-[linear-gradient(180deg,#DDD7FE_0%,#FFF_100%)] pt-31.5 pb-10 lg:pt-38 lg:pb-14">
        <div className="bg-[url('/images/bg-gradient.svg')] bg-cover bg-center">
          <div className="mx-auto max-w-304 px-4 text-center xl:px-0">
            <h1 className="text-display-sm font-light -tracking-[0.96px] text-text-primary lg:text-display-lg">
              Keynote
            </h1>
            <p className="mx-auto mt-3 max-w-150 text-md font-light text-text-secondary">
              Inspirierende Vorträge zu KI in der Bildung – für Konferenzen,
              Schulveranstaltungen und pädagogische Tage.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-10 md:py-14 lg:py-20 xl:px-0">
        <div className="mx-auto max-w-304">
          <h2 className="text-display-xs font-light -tracking-[0.96px] text-text-primary lg:text-display-md">
            Unsere Keynotes
          </h2>
          <p className="mt-4 max-w-180 text-md font-light text-text-secondary">
            Unsere Keynotes verbinden aktuelle Forschung mit praxisnahen
            Einblicken. Wir zeigen, wie Künstliche Intelligenz den Schulalltag
            bereichern kann – verständlich, motivierend und mit konkreten
            Beispielen.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-border-tertiary p-6">
              <h3 className="text-lg font-medium text-text-primary">
                KI im Klassenzimmer
              </h3>
              <p className="mt-2 text-sm font-light text-text-secondary">
                Wie Künstliche Intelligenz den Unterricht verändert und welche
                Chancen sich für Lehrkräfte und Lernende ergeben.
              </p>
            </div>
            <div className="rounded-2xl border border-border-tertiary p-6">
              <h3 className="text-lg font-medium text-text-primary">
                Zukunft der Bildung
              </h3>
              <p className="mt-2 text-sm font-light text-text-secondary">
                Ein Blick auf die Trends und Entwicklungen, die das
                Bildungssystem in den kommenden Jahren prägen werden.
              </p>
            </div>
            <div className="rounded-2xl border border-border-tertiary p-6">
              <h3 className="text-lg font-medium text-text-primary">
                Datenschutz & Ethik
              </h3>
              <p className="mt-2 text-sm font-light text-text-secondary">
                Verantwortungsvoller Umgang mit KI-Werkzeugen im schulischen
                Kontext – was erlaubt ist und worauf man achten sollte.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background-secondary px-4 py-10 md:py-14 lg:py-20 xl:px-0">
        <div className="mx-auto max-w-304">
          <h2 className="text-display-xs font-light -tracking-[0.96px] text-text-primary lg:text-display-md">
            Warum eine Keynote buchen?
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border-tertiary bg-white p-6">
              <h3 className="text-lg font-medium text-text-primary">
                Impulse setzen
              </h3>
              <p className="mt-2 text-sm font-light text-text-secondary">
                Eröffnen Sie Ihre Veranstaltung mit einem inspirierenden
                Vortrag, der zum Nachdenken und Handeln anregt.
              </p>
            </div>
            <div className="rounded-2xl border border-border-tertiary bg-white p-6">
              <h3 className="text-lg font-medium text-text-primary">
                Wissen vermitteln
              </h3>
              <p className="mt-2 text-sm font-light text-text-secondary">
                Komplexe Themen rund um KI werden verständlich und anschaulich
                aufbereitet – auch für Einsteiger.
              </p>
            </div>
            <div className="rounded-2xl border border-border-tertiary bg-white p-6">
              <h3 className="text-lg font-medium text-text-primary">
                Flexibel & individuell
              </h3>
              <p className="mt-2 text-sm font-light text-text-secondary">
                Jede Keynote wird auf Ihr Publikum und Ihre Veranstaltung
                zugeschnitten – vor Ort oder digital.
              </p>
            </div>
            <div className="rounded-2xl border border-border-tertiary bg-white p-6">
              <h3 className="text-lg font-medium text-text-primary">
                Erfahrene Referenten
              </h3>
              <p className="mt-2 text-sm font-light text-text-secondary">
                Unsere Referenten bringen fundiertes Fachwissen und jahrelange
                Praxiserfahrung aus dem Bildungsbereich mit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaCard />
    </div>
  );
}
