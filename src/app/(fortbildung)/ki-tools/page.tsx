import {
  KI_CHATS,
  KI_TOOLS_UPDATED,
  SCHOOL_TOOLS,
  type KiTool,
} from "@/data/ki-tools";
import { ArrowUpRight, Eye, ShieldCheck, UserRoundX } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/ki-tools" },
  title: "KI-Tools im Überblick: alle großen KI-Chats mit Login",
  description:
    "Neutrale Übersicht der großen KI-Chats (ChatGPT, Claude, Gemini, Copilot, Le Chat, Perplexity und mehr) und der Zugänge für Schulen, jeweils mit Link zur Anmeldung.",
  openGraph: {
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "DeepDiveKI – KI-Fortbildungen & Software für Schulen",
      },
    ],
    title: "KI-Tools im Überblick | DeepDive Fortbildungen",
    description:
      "Alle großen KI-Chats und Schul-Zugänge auf einer Seite, mit Link zur Anmeldung. Produktunabhängig.",
  },
};

const RULES = [
  {
    icon: UserRoundX,
    title: "Keine personenbezogenen Daten",
    text: "Keine Namen, Noten oder Fotos von Schülerinnen und Schülern. Texte nur anonymisiert einfügen.",
  },
  {
    icon: ShieldCheck,
    title: "Freigabe der Schule beachten",
    text: "Welche Tools im Unterricht erlaubt sind, entscheiden Schulleitung und Land. Die Fortbildung ersetzt diese Entscheidung nicht.",
  },
  {
    icon: Eye,
    title: "Ergebnisse prüfen",
    text: "KI-Antworten können falsch sein. Zahlen, Quellen und Fachbegriffe immer gegenlesen.",
  },
];

function ToolCard({ tool }: { tool: KiTool }) {
  const host = tool.url.replace(/^https?:\/\/(www\.)?/, "");
  return (
    <li className="flex flex-col rounded-3xl border border-border-tertiary bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-text-primary">{tool.name}</h3>
          <p className="mt-1 text-sm text-text-tertiary">
            {tool.vendor} · {tool.country}
          </p>
        </div>
        {tool.eu && (
          <span className="shrink-0 rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary-darker">
            EU-Anbieter
          </span>
        )}
      </div>
      <p className="mt-4 text-md leading-relaxed text-text-secondary">{tool.text}</p>
      <p className="mt-2 text-sm text-text-tertiary">{tool.note}</p>
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center justify-between gap-3 rounded-2xl bg-text-primary px-5 py-3.5 text-md font-medium text-white transition hover:bg-primary-dark"
      >
        <span className="whitespace-nowrap">Anmelden / Login</span>
        <span className="flex min-w-0 items-center gap-1 text-sm font-normal text-white/70">
          <span className="truncate">{host}</span>
          <ArrowUpRight className="size-4 shrink-0" />
        </span>
      </a>
    </li>
  );
}

export default function KiToolsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-32 pb-20 sm:px-6 lg:pt-40">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold tracking-[0.18em] text-primary-dark uppercase">
          Fortbildung · Zugänge
        </p>
        <h1 className="mt-4 text-display-sm font-semibold tracking-tight text-text-primary sm:text-display-md">
          KI-Tools im Überblick.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-text-secondary">
          Alle großen KI-Chats mit Link zur Anmeldung, dazu die Zugänge für Schulen. Diese
          Seite ist bewusst neutral: Welches Werkzeug Sie nutzen, entscheiden Sie und Ihre
          Schule. Für die Fortbildung reicht ein kostenloses Konto bei einem der Anbieter.
        </p>
      </header>

      <section className="mt-14" aria-labelledby="chats">
        <h2 id="chats" className="text-2xl font-semibold text-text-primary">
          Die großen KI-Chats
        </h2>
        <p className="mt-2 text-md text-text-tertiary">
          Alphabetisch wäre fair, praktisch ist die Reihenfolge nach Verbreitung.
        </p>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {KI_CHATS.map((t) => (
            <ToolCard key={t.name} tool={t} />
          ))}
        </ul>
      </section>

      <section className="mt-16" aria-labelledby="schule">
        <h2 id="schule" className="text-2xl font-semibold text-text-primary">
          Zugänge für Schulen
        </h2>
        <p className="mt-2 max-w-3xl text-md text-text-tertiary">
          Datenschutzrechtlich geprüfte Angebote, die über Land, Schulträger oder Schule
          lizenziert werden. Fragen Sie nach, was an Ihrer Schule bereits freigeschaltet ist.
        </p>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SCHOOL_TOOLS.map((t) => (
            <ToolCard key={t.name} tool={t} />
          ))}
        </ul>
      </section>

      <section className="mt-16 rounded-3xl bg-text-primary p-6 text-white sm:p-10" aria-labelledby="regeln">
        <h2 id="regeln" className="text-2xl font-semibold">
          Drei Regeln für die Fortbildung
        </h2>
        <ul className="mt-8 grid gap-8 md:grid-cols-3">
          {RULES.map((r) => (
            <li key={r.title} className="flex flex-col gap-3">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-white/10">
                <r.icon className="size-6" />
              </span>
              <h3 className="text-lg font-semibold">{r.title}</h3>
              <p className="text-md leading-relaxed text-white/75">{r.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 text-sm text-text-tertiary">
        Stand {KI_TOOLS_UPDATED}. Die Liste wird vor jeder Fortbildung geprüft. Fehlt ein
        Tool oder stimmt ein Link nicht mehr? Kurze Mail an info@deepdive-ki.de.
      </p>
    </div>
  );
}
