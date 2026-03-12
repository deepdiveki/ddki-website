import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Jobs bei DeepDiveKI | KI für Bildung mitgestalten",
  description:
    "Werde Teil von DeepDiveKI und entwickle KI-Lösungen für Schulen und Hochschulen. Entdecke offene Stellen, Benefits und unseren Bewerbungsprozess.",
};

const highlights = [
  { label: "Arbeitsmodell", value: "Remote-first in DACH" },
  { label: "Impact", value: "KI für Schulen & Hochschulen" },
  { label: "Teamfokus", value: "Produkt, Bildung, Erfolg" },
];

const benefits = [
  "Flexible Arbeitszeiten und Remote-Setup",
  "Sinnstiftende Mission im Bildungsbereich",
  "Schnelle Verantwortung und kurze Wege",
  "Moderne Tools und klare Prozesse",
];

const roles = [
  {
    title: "Dozent:in (m/w/d) Fokus: Datenschutz",
    team: "Education & Training",
    type: "Honorartätigkeit",
    location: "Remote oder Hamburg",
    summary:
      "Vermittle Datenschutzkompetenz in praxisnahen Workshops für Schulen und Hochschulen.",
    responsibilities: [
      "Workshops und Fortbildungen zu Datenschutz im Bildungsbereich durchführen",
      "Materialien und Fallbeispiele entwickeln und aktualisieren",
      "Teilnehmende beraten und Fragen verständlich klären",
      "Inhalte gemeinsam mit dem Team weiterentwickeln",
    ],
    requirements: [
      "Fundierte Erfahrung in Datenschutz/DSGVO, ideal im Bildungsumfeld",
      "Didaktisches Geschick und Präsentationsstärke",
      "Strukturierte, eigenständige Arbeitsweise",
      "Freude an Wissensvermittlung und Zusammenarbeit",
    ],
    applyLink:
      "mailto:info@deepdive-ki.de?subject=Bewerbung%20Dozent%20Datenschutz",
  },
  {
    title: "Dozent:in (m/w/d) Fokus: KI und Unterricht",
    team: "Education & Training",
    type: "Honorartätigkeit",
    location: "DACH, hybrid",
    summary:
      "Vermittle Lehrkräften praxisnahe KI-Kompetenzen für Unterricht und Schulentwicklung.",
    responsibilities: [
      "Workshops und Fortbildungen zu KI im Unterricht konzipieren und durchführen",
      "Unterrichtsnahe Beispiele und Materialien erstellen",
      "Teilnehmende beim Transfer in den Schulalltag begleiten",
      "Feedback aufnehmen und Inhalte kontinuierlich verbessern",
    ],
    requirements: [
      "Erfahrung mit KI-Tools im Bildungsbereich",
      "Didaktische Erfahrung in Training oder Unterricht",
      "Sicheres Auftreten und klare Kommunikation",
      "Neugier auf neue Technologien und deren Anwendung",
    ],
    applyLink:
      "mailto:info@deepdive-ki.de?subject=Bewerbung%20Dozent%20KI%20Unterricht",
  },
  {
    title: "Initiativbewerbung (m/w/d)",
    team: "Alle Teams",
    type: "Flexibel",
    location: "Remote",
    summary:
      "Du passt zu unserer Mission, aber findest dich in keiner Rolle? Schreib uns, wo du Impact schaffen kannst.",
    responsibilities: [
      "Deinen Schwerpunkt und Wunschbereich beschreiben",
      "Ideen für Mehrwert im Schulkontext skizzieren",
      "Erste Arbeitsproben oder Projekte teilen",
    ],
    requirements: [
      "Motivation für Bildung und KI",
      "Eigeninitiative und Verantwortung",
      "Freude an Zusammenarbeit",
    ],
    applyLink: "/jobs/initiativ",
  },
];

const process = [
  {
    title: "1. Kurzes Kennenlernen",
    description: "Wir sprechen über Motivation, Rolle und Erwartungen.",
  },
  {
    title: "2. Fachlicher Deep-Dive",
    description: "Case oder Portfolio-Review mit dem Team.",
  },
  {
    title: "3. Team-Fit & Vision",
    description: "Gemeinsamer Blick auf Zusammenarbeit und Mission.",
  },
  {
    title: "4. Angebot & Start",
    description: "Schnelle Entscheidung und klarer Startplan.",
  },
];

const faqs = [
  {
    question: "Kann ich komplett remote arbeiten?",
    answer:
      "Ja, wir sind remote-first. Einsätze in Deutschland sind möglich, wenn gewünscht.",
  },
  {
    question: "Wie schnell erhalte ich Feedback?",
    answer: "Wir melden uns in der Regel innerhalb von 7 Werktagen.",
  },
  {
    question: "Kann ich mich initiativ bewerben?",
    answer:
      "Unbedingt. Wir freuen uns über klare Ideen, wie du unser Team verstärken willst.",
  },
];

export default function JobsPage() {
  return (
    <>
      <section className="relative z-10 overflow-visible pb-0 pt-35 md:pt-40 xl:pt-45">
        <div className="relative mx-auto max-w-[900px] px-4 sm:px-8 xl:px-0">
          <div className="text-center">
            <span className="relative mb-5 inline-flex items-center gap-2 rounded-full sw-glass border border-border-tertiary px-4.5 py-2 text-sm font-medium text-primary-darker shadow-sm">
              Karriere
            </span>
            <h1 className="mb-6 text-display-sm font-light -tracking-[1.2px] text-text-primary lg:text-display-lg xl:text-display-xl">
              Jobs bei DeepDiveKI
            </h1>
            <p className="mx-auto mb-9 max-w-[620px] text-md font-light text-text-secondary">
              Gestalte mit uns KI-Produkte, die Schulen entlasten und echte
              Lernzeit schaffen. Wir suchen Menschen, die Bildung nachhaltig
              verbessern wollen.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#jobs"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-darker px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-dark"
              >
                Offene Positionen
              </a>
              <Link
                href="/jobs/initiativ"
                className="rounded-lg sw-glass border border-border-secondary px-5 py-2.5 text-sm text-text-secondary transition hover:border-primary-base hover:text-text-primary"
              >
                Initiativ bewerben
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-16 pt-10">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="sw-card-glow rounded-2xl border border-border-tertiary bg-white/65 p-4 text-center shadow-xs backdrop-blur-sm"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-primary-dark">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-text-primary">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div className="sw-card-glow rounded-3xl border border-border-tertiary bg-white/65 p-6 shadow-sm backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-text-primary">Warum DeepDiveKI?</h2>
                <p className="mt-3 text-sm text-text-secondary">
                  Wir bauen Produkte, die Lehrkräfte entlasten und Schulen
                  wirklich helfen. Unser Fokus liegt auf klarer Umsetzung,
                  ehrlichem Feedback und sichtbarem Impact.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: "Bildungsimpact",
                      description:
                        "KI-Tools für den Alltag von Schulen und Hochschulen.",
                    },
                    {
                      title: "Tempo & Verantwortung",
                      description:
                        "Kurze Wege, schnelle Entscheidungen, real Ownership.",
                    },
                    {
                      title: "Kundennähe",
                      description:
                        "Direkter Austausch mit Lehrkräften und Schulleitungen.",
                    },
                    {
                      title: "Qualität",
                      description:
                        "Hohe Standards für UX, Datenschutz und Verlässlichkeit.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-border-tertiary bg-background-secondary p-4 text-sm"
                    >
                      <p className="font-semibold text-text-primary">{item.title}</p>
                      <p className="mt-2 text-text-secondary">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="sw-card-glow rounded-3xl border border-border-tertiary bg-white/65 p-6 shadow-sm backdrop-blur-sm">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-dark">
                  Benefits
                </h3>
                <ul className="mt-4 grid gap-3 text-sm text-text-secondary sm:grid-cols-2">
                  {benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="rounded-2xl border border-border-tertiary bg-background-secondary px-4 py-3"
                    >
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="sw-card-glow rounded-3xl border border-border-tertiary bg-white/65 p-6 shadow-sm backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-text-primary">
                  Bewerbungsprozess
                </h3>
                <div className="mt-4 space-y-4">
                  {process.map((step) => (
                    <div key={step.title} className="border-l-2 border-primary-base pl-4">
                      <p className="font-semibold text-text-primary">{step.title}</p>
                      <p className="mt-1 text-sm text-text-secondary">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="sw-card-glow rounded-3xl border border-border-tertiary bg-white/65 p-6 shadow-sm backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-text-primary">FAQ</h3>
                <div className="mt-4 space-y-4 text-sm text-text-secondary">
                  {faqs.map((item) => (
                    <div key={item.question} className="rounded-2xl border border-border-tertiary bg-background-secondary p-4">
                      <p className="font-semibold text-text-primary">
                        {item.question}
                      </p>
                      <p className="mt-2">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="jobs" className="relative pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary">
              Offene Positionen
            </h2>
            <p className="mt-3 max-w-[620px] text-sm text-text-secondary">
              Wir suchen Menschen, die Verantwortung übernehmen und unsere
              Mission im Bildungsbereich voranbringen.
            </p>
          </div>
          <div className="grid gap-6">
            {roles.map((role) => (
              <div
                key={role.title}
                className="sw-card-glow rounded-3xl border border-border-tertiary bg-white/65 p-6 shadow-sm backdrop-blur-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary">
                      {role.title}
                    </h3>
                    <p className="mt-1 text-sm text-primary-dark">{role.team}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-border-tertiary bg-background-secondary px-3 py-1 text-xs text-text-secondary">
                      {role.type}
                    </span>
                    <span className="rounded-full border border-border-tertiary bg-background-secondary px-3 py-1 text-xs text-text-secondary">
                      {role.location}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-text-secondary">{role.summary}</p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-border-tertiary bg-background-secondary p-4">
                    <p className="text-sm font-semibold text-text-primary">Aufgaben</p>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-text-secondary">
                      {role.responsibilities.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-border-tertiary bg-background-secondary p-4">
                    <p className="text-sm font-semibold text-text-primary">Profil</p>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-text-secondary">
                      {role.requirements.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={role.applyLink}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary-darker px-4.5 py-2 text-sm font-medium text-white transition hover:bg-primary-dark"
                  >
                    Jetzt bewerben
                  </a>
                  <span className="text-xs text-text-tertiary">
                    Antwortzeit: ca. 7 Werktage
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-3xl border border-border-tertiary bg-white p-8 text-center shadow-sm">
            <h3 className="text-2xl font-semibold text-text-primary">
              Lust, die Bildung von morgen zu gestalten?
            </h3>
            <p className="mt-3 text-sm text-text-secondary">
              Schick uns ein paar Zeilen, deinen Lebenslauf oder ein Projekt,
              auf das du stolz bist. Wir freuen uns auf dich.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="mailto:info@deepdive-ki.de?subject=Bewerbung%20DeepDiveKI"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-darker px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-dark"
              >
                Bewerbung senden
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
