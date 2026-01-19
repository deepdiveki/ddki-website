import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs bei DeepDiveKI | KI für Bildung mitgestalten",
  description:
    "Werde Teil von DeepDiveKI und entwickle KI-Lösungen für Schulen und Hochschulen. Entdecke offene Stellen, Benefits und unseren Bewerbungsprozess.",
};

const highlights = [
  {
    label: "Arbeitsmodell",
    value: "Remote-first in DACH",
  },
  {
    label: "Impact",
    value: "KI für Schulen & Hochschulen",
  },
  {
    label: "Teamfokus",
    value: "Produkt, Bildung, Erfolg",
  },
];

const benefits = [
  "Flexible Arbeitszeiten und Remote-Setup",
  "Persönliches Lernbudget & Konferenzen",
  "Sinnstiftende Mission im Bildungsbereich",
  "Schnelle Verantwortung und kurze Wege",
  "Moderne Tools und klare Prozesse",
  "Regelmäßige Team-Retreats in Deutschland",
];

const roles = [
  {
    title: "Dozent:in (m/w/d) Fokus: Datenschutz",
    team: "Education & Training",
    type: "Vollzeit",
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
    type: "Vollzeit / Teilzeit",
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
    description:
      "Wir sprechen über Motivation, Rolle und Erwartungen.",
  },
  {
    title: "2. Fachlicher Deep-Dive",
    description:
      "Case oder Portfolio-Review mit dem Team.",
  },
  {
    title: "3. Team-Fit & Vision",
    description:
      "Gemeinsamer Blick auf Zusammenarbeit und Mission.",
  },
  {
    title: "4. Angebot & Start",
    description:
      "Schnelle Entscheidung und klarer Startplan.",
  },
];

const faqs = [
  {
    question: "Kann ich komplett remote arbeiten?",
    answer:
      "Ja, wir sind remote-first. Für Teamtage und Retreats treffen wir uns regelmäßig vor Ort.",
  },
  {
    question: "Wie schnell erhalte ich Feedback?",
    answer:
      "Wir melden uns in der Regel innerhalb von 7 Werktagen.",
  },
  {
    question: "Kann ich mich initiativ bewerben?",
    answer:
      "Unbedingt. Wir freuen uns über klare Ideen, wie du unser Team verstärken willst.",
  },
];

export default function JobsPage() {
  return (
    <main className="min-h-screen bg-[#070511] text-white">
      <section className="relative z-10 overflow-visible pt-35 md:pt-40 xl:pt-45 pb-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(134,70,244,0.18),_transparent_60%)]" />
        <div className="relative mx-auto max-w-[900px] px-4 sm:px-8 xl:px-0">
          <div className="text-center">
            <span className="hero-subtitle-gradient hover:hero-subtitle-hover relative mb-5 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
              <Image
                src="/images/hero/icon-title.svg"
                alt="icon"
                width={16}
                height={16}
              />
              <span className="hero-subtitle-text">Karriere</span>
            </span>
            <h1 className="mb-6 text-3xl font-extrabold text-white sm:text-5xl xl:text-heading-1">
              Jobs bei DeepDiveKI
            </h1>
            <p className="mx-auto mb-9 max-w-[620px] font-medium md:text-lg text-white">
              Gestalte mit uns KI-Produkte, die Schulen entlasten und echte
              Lernzeit schaffen. Wir suchen Menschen, die Bildung nachhaltig
              verbessern wollen.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#jobs"
                className="button-border-gradient hover:button-gradient-hover relative inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm text-white shadow-button hover:shadow-none"
              >
                Offene Positionen
              </a>
              <a
                href="/jobs/initiativ"
                className="rounded-lg border border-purple-700/50 bg-[#16122b] px-5 py-2.5 text-sm text-purple-100 hover:border-purple-400 hover:text-white transition"
              >
                Initiativ bewerben
              </a>
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
                className="rounded-2xl border border-purple-900/40 bg-[#141126] p-4 text-center"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-purple-300">
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
              <div className="rounded-3xl border border-purple-900/60 bg-[#0b071a] p-6 shadow-[0_0_40px_rgba(134,70,244,0.15)]">
                <h2 className="text-xl font-semibold">Warum DeepDiveKI?</h2>
                <p className="mt-3 text-sm text-slate-300">
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
                        "Kurze Wege, schnelle Entscheidungen, echte Ownership.",
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
                      className="rounded-2xl border border-purple-900/40 bg-[#141126] p-4 text-sm"
                    >
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="mt-2 text-slate-300">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-purple-900/60 bg-[#0b071a] p-6">
                <h3 className="text-sm font-semibold text-purple-300 uppercase tracking-[0.2em]">
                  Benefits
                </h3>
                <ul className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                  {benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="rounded-2xl border border-purple-900/40 bg-[#141126] px-4 py-3"
                    >
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-purple-900/60 bg-[#0b071a] p-6">
                <h3 className="text-xl font-semibold text-white">
                  Bewerbungsprozess
                </h3>
                <div className="mt-4 space-y-4">
                  {process.map((step) => (
                    <div key={step.title} className="border-l-2 border-purple-400/70 pl-4">
                      <p className="text-white font-semibold">{step.title}</p>
                      <p className="text-sm text-slate-300 mt-1">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-purple-900/60 bg-[#0b071a] p-6">
                <h3 className="text-xl font-semibold text-white">FAQ</h3>
                <div className="mt-4 space-y-4 text-sm text-slate-300">
                  {faqs.map((item) => (
                    <div key={item.question} className="rounded-2xl border border-purple-900/40 bg-[#141126] p-4">
                      <p className="text-white font-semibold">
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
            <p className="mt-3 text-sm text-slate-300 max-w-[620px]">
              Wir suchen Menschen, die Verantwortung übernehmen und unsere
              Mission im Bildungsbereich voranbringen.
            </p>
          </div>
          <div className="grid gap-6">
            {roles.map((role) => (
              <div
                key={role.title}
                className="rounded-3xl border border-purple-900/60 bg-[#0b071a] p-6 shadow-[0_0_40px_rgba(134,70,244,0.12)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {role.title}
                    </h3>
                    <p className="text-sm text-purple-300 mt-1">{role.team}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-purple-700/50 bg-[#16122b] px-3 py-1 text-xs text-purple-100">
                      {role.type}
                    </span>
                    <span className="rounded-full border border-purple-700/50 bg-[#16122b] px-3 py-1 text-xs text-purple-100">
                      {role.location}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-300">{role.summary}</p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-purple-900/40 bg-[#141126] p-4">
                    <p className="text-sm font-semibold text-white">Aufgaben</p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-300 list-disc pl-5">
                      {role.responsibilities.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-purple-900/40 bg-[#141126] p-4">
                    <p className="text-sm font-semibold text-white">Profil</p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-300 list-disc pl-5">
                      {role.requirements.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={role.applyLink}
                    className="button-border-gradient hover:button-gradient-hover relative inline-flex items-center gap-2 rounded-lg px-4.5 py-2 text-sm text-white shadow-button hover:shadow-none"
                  >
                    Jetzt bewerben
                  </a>
                  <span className="text-xs text-slate-400">
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
          <div className="rounded-3xl border border-purple-900/60 bg-[#0b071a] p-8 text-center shadow-[0_0_45px_rgba(134,70,244,0.2)]">
            <h3 className="text-2xl font-semibold text-white">
              Lust, die Bildung von morgen zu gestalten?
            </h3>
            <p className="mt-3 text-sm text-slate-300">
              Schick uns ein paar Zeilen, deinen Lebenslauf oder ein Projekt,
              auf das du stolz bist. Wir freuen uns auf dich.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="mailto:info@deepdive-ki.de?subject=Bewerbung%20DeepDiveKI"
                className="button-border-gradient hover:button-gradient-hover relative inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm text-white shadow-button hover:shadow-none"
              >
                Bewerbung senden
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
