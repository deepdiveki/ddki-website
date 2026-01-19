import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentoring Simulator | DeepDiveKI",
  description:
    "Trainieren Sie Ihre Gesprächsführung als Mentor:in mit realistischen Szenarien.",
};

const scenarios = [
  {
    title: "Szenario Björn",
    description:
      "Gespräch mit Björn, einem passiven, schwer greifbaren Studenten, über eine Deutschstunde zum Thema Kreatives Schreiben. Eine besondere Herausforderung für Ihre Gesprächsführung.",
    image: "/images/cover/cover-04.jpg",
    href: "/scenarios/scenario-bjoern",
  },
  {
    title: "Szenario Marc",
    description:
      "Gespräch mit Marc, einem pragmatischen, zeiteffizienten Studenten, über eine Englischstunde zum Thema \"Future Plans\". Hilfreiche Übung für den Umgang mit pragmatischen Persönlichkeiten.",
    image: "/images/cover/cover-05.jpg",
    href: "/scenarios/scenario-marc",
  },
  {
    title: "Szenario Tim",
    description:
      "Gespräch mit Tim, einem pragmatischen Sportstudenten, über eine Lektion mit zu wenig Differenzierung. Trainieren Sie klare, umsetzbare Verbesserungen.",
    image: "/images/cover/cover-06.png",
    href: "/scenarios/scenario-tim",
  },
  {
    title: "Szenario Antonia",
    description:
      "Gespräch mit Antonia, einer extrovertierten Englischstudentin, über eine sehr lehrerzentrierte Stunde. Fokus auf mehr Aktivierung und Sprechzeit.",
    image: "/images/cover/cover-07.png",
    href: "/scenarios/scenario-antonia",
  },
];

export default function MentoringPage() {
  return (
    <main className="min-h-screen bg-[#070511] text-white">
      <section className="relative z-10 overflow-visible pt-35 md:pt-40 xl:pt-45 pb-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(134,70,244,0.18),_transparent_60%)]" />
        <div className="relative mx-auto max-w-[900px] px-4 sm:px-8 xl:px-0">
          <div className="text-center max-w-[900px] mx-auto">
            <span className="hero-subtitle-gradient hover:hero-subtitle-hover relative mb-5 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
              <Image
                src="/images/hero/icon-title.svg"
                alt="icon"
                width={16}
                height={16}
              />
              <span className="hero-subtitle-text">Mentoring</span>
            </span>
            <h1 className="mb-6 text-3xl font-extrabold text-white sm:text-5xl xl:text-heading-1">
              Mentoring Simulator
            </h1>
            <p className="mx-auto mb-9 max-w-[600px] font-medium md:text-lg text-white">
              Wählen Sie ein Szenario aus, um Ihre Gesprächsführung als Mentor:in
              zu üben. Jedes Szenario bietet eine einzigartige Herausforderung
              und Gelegenheit, verschiedene Mentoring-Kompetenzen zu trainieren.
            </p>
          </div>
        </div>
      </section>

      <section className="relative pb-20 pt-4">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {scenarios.map((scenario) => {
              const needsZoomOut =
                scenario.image.includes("cover-06") ||
                scenario.image.includes("cover-07");

              return (
                <article
                  key={scenario.title}
                  className="group overflow-hidden rounded-3xl border border-purple-900/50 bg-[#0b071a] shadow-[0_0_45px_rgba(134,70,244,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(134,70,244,0.25)]"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b071a] via-transparent to-transparent" />
                  </div>
                  <div className="flex h-full flex-col gap-6 p-8">
                    <div>
                      <h2 className="text-2xl font-semibold text-white transition-colors group-hover:text-purple-300">
                        {scenario.title}
                      </h2>
                      <p className="mt-4 text-sm leading-relaxed text-slate-300">
                        {scenario.description}
                      </p>
                    </div>
                    <a
                      href={scenario.href}
                      className="button-border-gradient hover:button-gradient-hover relative inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm text-white shadow-button hover:shadow-none"
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
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
