import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentoring Simulator",
  description:
    "Trainieren Sie Ihre Gesprächsführung als Mentor:in mit realistischen Szenarien.",
};

const scenarios = [
  {
    title: "Szenario Björn",
    description:
      "Gespräch mit Björn, einem passiven, schwer greifbaren Studenten, über eine Deutschstunde zum Thema Kreatives Schreiben. Eine besondere Herausforderung für Ihre Gesprächsführung.",
    image: "/images/cover/cover-04.jpg",
    href: "/software/scenarios/scenario-bjoern",
  },
  {
    title: "Szenario Marc",
    description:
      "Gespräch mit Marc, einem pragmatischen, zeiteffizienten Studenten, über eine Englischstunde zum Thema \"Future Plans\". Hilfreiche Übung für den Umgang mit pragmatischen Persönlichkeiten.",
    image: "/images/cover/cover-05.jpg",
    href: "/software/scenarios/scenario-marc",
  },
  {
    title: "Szenario Tim",
    description:
      "Gespräch mit Tim, einem pragmatischen Sportstudenten, über eine Lektion mit zu wenig Differenzierung. Trainieren Sie klare, umsetzbare Verbesserungen.",
    image: "/images/cover/cover-06.png",
    href: "/software/scenarios/scenario-tim",
  },
  {
    title: "Szenario Antonia",
    description:
      "Gespräch mit Antonia, einer extrovertierten Englischstudentin, über eine sehr lehrerzentrierte Stunde. Fokus auf mehr Aktivierung und Sprechzeit.",
    image: "/images/cover/cover-07.png",
    href: "/software/scenarios/scenario-antonia",
  },
];

export default function MentoringPage() {
  return (
    <>
      <section className="relative z-10 overflow-visible pb-0 pt-35 md:pt-40 xl:pt-45">
        <div className="relative mx-auto max-w-[900px] px-4 sm:px-8 xl:px-0">
          <div className="mx-auto max-w-[900px] text-center">
            <span className="relative mb-5 inline-flex items-center gap-2 rounded-full sw-glass border border-border-tertiary px-4.5 py-2 text-sm font-medium text-primary-darker shadow-sm">
              Mentoring
            </span>
            <h1 className="mb-6 text-display-sm font-light -tracking-[1.2px] text-text-primary lg:text-display-lg xl:text-display-xl">
              Mentoring Simulator
            </h1>
            <p className="mx-auto mb-9 max-w-[600px] text-md font-light text-text-secondary">
              Wählen Sie ein Szenario aus, um Ihre Gesprächsführung als Mentor:in
              zu üben. Jedes Szenario bietet eine einzigartige Herausforderung
              und Gelegenheit, verschiedene Mentoring-Kompetenzen zu trainieren.
            </p>
          </div>
        </div>
      </section>

      <section className="relative pb-20 pt-4">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {scenarios.map((scenario) => {
              const needsZoomOut =
                scenario.image.includes("cover-06") ||
                scenario.image.includes("cover-07");

              return (
                <article
                  key={scenario.title}
                  className="group sw-card-glow overflow-hidden rounded-3xl border border-border-tertiary bg-white/65 shadow-sm backdrop-blur-sm transition-all duration-300"
                >
                  <div
                    className={`relative h-56 md:h-64 ${
                      needsZoomOut ? "bg-[#f6e9ff]" : ""
                    }`}
                  >
                    <Image
                      src={scenario.image}
                      alt={scenario.title}
                      fill
                      className={`object-cover ${
                        needsZoomOut ? "scale-85" : ""
                      }`}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      unoptimized={scenario.image.endsWith(".svg")}
                    />
                  </div>
                  <div className="flex h-full flex-col gap-6 p-8">
                    <div>
                      <h2 className="text-2xl font-semibold text-text-primary transition-colors group-hover:text-primary-dark">
                        {scenario.title}
                      </h2>
                      <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                        {scenario.description}
                      </p>
                    </div>
                    <Link
                      href={scenario.href}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary-darker px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-dark"
                    >
                      Szenario starten
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
