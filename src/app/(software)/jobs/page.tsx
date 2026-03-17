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
            <span className="relative mb-5 inline-flex items-center gap-2 rounded-full sw-glass border border-white/10 px-6 py-3 text-sm font-medium text-primary-light">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1C12 1 12.7 5.3 14.7 7.3C16.7 9.3 21 10 21 10C21 10 16.7 10.7 14.7 12.7C12.7 14.7 12 19 12 19C12 19 11.3 14.7 9.3 12.7C7.3 10.7 3 10 3 10C3 10 7.3 9.3 9.3 7.3C11.3 5.3 12 1 12 1Z"/><path d="M19 15C19 15 19.4 17.1 20.1 17.9C20.9 18.6 23 19 23 19C23 19 20.9 19.4 20.1 20.1C19.4 20.9 19 23 19 23C19 23 18.6 20.9 17.9 20.1C17.1 19.4 15 19 15 19C15 19 17.1 18.6 17.9 17.9C18.6 17.1 19 15 19 15Z" opacity="0.7"/><circle cx="20" cy="5" r="1" opacity="0.5"/></svg>
              Karriere
            </span>
            <h1 className="mb-6 text-display-sm font-bold -tracking-[1.2px] text-white lg:text-display-lg xl:text-display-xl">
              Jobs bei DeepDiveKI
            </h1>
            <p className="mx-auto mb-9 max-w-[620px] text-md font-light text-white/70">
              Gestalte mit uns KI-Produkte, die Schulen entlasten und echte
              Lernzeit schaffen. Wir suchen Menschen, die Bildung nachhaltig
              verbessern wollen.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#jobs"
                className="inline-flex items-center gap-2 rounded-lg bg-purple px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-light"
              >
                Offene Positionen
              </a>
              <Link
                href="/jobs/initiativ"
                className="rounded-lg sw-glass border border-purple-500/20 px-5 py-2.5 text-sm text-white/70 transition hover:border-primary-base hover:text-white"
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
                className="sw-card-glow rounded-2xl border border-purple-500/20 bg-white/5 p-4 text-center shadow-xs backdrop-blur-sm"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-purple-light">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-white">
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
              <div className="sw-card-glow rounded-3xl border border-purple-500/20 bg-white/5 p-6 shadow-sm backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-white">Warum DeepDiveKI?</h2>
                <p className="mt-3 text-sm text-white/70">
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
                      className="rounded-2xl border border-purple-500/20 bg-white/5 p-4 text-sm"
                    >
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="mt-2 text-white/70">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="sw-card-glow rounded-3xl border border-purple-500/20 bg-white/5 p-6 shadow-sm backdrop-blur-sm">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-light">
                  Benefits
                </h3>
                <ul className="mt-4 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
                  {benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="rounded-2xl border border-purple-500/20 bg-white/5 px-4 py-3"
                    >
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="sw-card-glow rounded-3xl border border-purple-500/20 bg-white/5 p-6 shadow-sm backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white">
                  Bewerbungsprozess
                </h3>
                <div className="mt-4 space-y-4">
                  {process.map((step) => (
                    <div key={step.title} className="border-l-2 border-primary-base pl-4">
                      <p className="font-semibold text-white">{step.title}</p>
                      <p className="mt-1 text-sm text-white/70">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="sw-card-glow rounded-3xl border border-purple-500/20 bg-white/5 p-6 shadow-sm backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white">FAQ</h3>
                <div className="mt-4 space-y-4 text-sm text-white/70">
                  {faqs.map((item) => (
                    <div key={item.question} className="rounded-2xl border border-purple-500/20 bg-white/5 p-4">
                      <p className="font-semibold text-white">
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
            <h2 className="text-2xl font-semibold text-white">
              Offene Positionen
            </h2>
            <p className="mt-3 max-w-[620px] text-sm text-white/70">
              Wir suchen Menschen, die Verantwortung übernehmen und unsere
              Mission im Bildungsbereich voranbringen.
            </p>
          </div>
          <div className="grid gap-6">
            {roles.map((role) => (
              <div
                key={role.title}
                className="sw-card-glow rounded-3xl border border-purple-500/20 bg-white/5 p-6 shadow-sm backdrop-blur-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {role.title}
                    </h3>
                    <p className="mt-1 text-sm text-purple-light">{role.team}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-purple-500/20 bg-white/5 px-3 py-1 text-xs text-white/70">
                      {role.type}
                    </span>
                    <span className="rounded-full border border-purple-500/20 bg-white/5 px-3 py-1 text-xs text-white/70">
                      {role.location}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-white/70">{role.summary}</p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-purple-500/20 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-white">Aufgaben</p>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/70">
                      {role.responsibilities.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-purple-500/20 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-white">Profil</p>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/70">
                      {role.requirements.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={role.applyLink}
                    className="inline-flex items-center gap-2 rounded-lg bg-purple px-4.5 py-2 text-sm font-medium text-white transition hover:bg-purple-light"
                  >
                    Jetzt bewerben
                  </a>
                  <span className="text-xs text-white/50">
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
          <div className="rounded-3xl border border-purple-500/20 bg-white/5 p-8 text-center shadow-sm backdrop-blur-sm">
            <h3 className="text-2xl font-semibold text-white">
              Lust, die Bildung von morgen zu gestalten?
            </h3>
            <p className="mt-3 text-sm text-white/70">
              Schick uns ein paar Zeilen, deinen Lebenslauf oder ein Projekt,
              auf das du stolz bist. Wir freuen uns auf dich.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="mailto:info@deepdive-ki.de?subject=Bewerbung%20DeepDiveKI"
                className="inline-flex items-center gap-2 rounded-lg bg-purple px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-light"
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
