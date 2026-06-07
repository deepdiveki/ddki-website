"use client";

import { useState } from "react";
import { ExternalLink, GraduationCap } from "lucide-react";
import ToolShell from "./ToolShell";

type Stage = "grundschule" | "unterstufe" | "mittelstufe" | "oberstufe";

type Material = { name: string; link?: string; description: string };

const STAGES: { key: Stage; name: string; goal: string; activities: string[]; materials: Material[] }[] = [
  {
    key: "grundschule",
    name: "Grundschule (1.–4. Klasse)",
    goal: "KI als Phänomen kennenlernen — ohne technisch zu werden",
    activities: [
      'Quickdraw spielen — KI "zeichnet mit"',
      'Sprachassistenten ausprobieren ("Hey Siri, was ist…?")',
      "KI-Geschichten lesen (Picture Books über Roboter)",
      'Diskussion: "Was ist anders bei KI als bei meinem Spielzeug?"',
    ],
    materials: [
      { name: "KI_Campus Datenkompetenz", link: "https://ki-campus.org", description: "BMBF-gefördertes Modul, altersgerecht, kostenlos" },
      { name: "Quickdraw", link: "https://quickdraw.withgoogle.com", description: "Browser-Spiel: KI rät, was du zeichnest" },
    ],
  },
  {
    key: "unterstufe",
    name: "Unterstufe (5.–7. Klasse)",
    goal: "Funktionsweise verstehen, erste eigene Anwendungen",
    activities: [
      "SoekiaGPT als Mechanik-Demo (zeigt schrittweise, wie LLMs Tokens zusammensetzen)",
      "Erste eigene Prompts schreiben",
      "Diskussion: Warum macht KI Fehler?",
      "Mini-Projekt: KI-generierte Geschichte schreiben + korrigieren",
    ],
    materials: [
      { name: 'RAAbits "Was ist KI?"', description: "Unterrichtseinheit für Klasse 5–7, RAAbits-Reihe (kostenpflichtig, in vielen Schulen lizenziert)" },
      { name: "SoekiaGPT", link: "https://soekia.de", description: "Browser-Demo eines Mini-Sprachmodells, ideal um Mechanik sichtbar zu machen" },
    ],
  },
  {
    key: "mittelstufe",
    name: "Mittelstufe (8.–10. Klasse)",
    goal: "Ethische Fragen und Bias begreifen",
    activities: [
      "Moral Machine (MIT) — Dilemma selbst-fahrender Autos",
      "AI Unplugged — KI-Mechanik ohne Computer, mit Stift und Papier",
      "Bias-Experiment: Barbie-Bilder selbst generieren und Stereotype analysieren",
      "Diskussion: Wer haftet, wenn KI Fehler macht?",
    ],
    materials: [
      { name: "Moral Machine", link: "https://www.moralmachine.net", description: "MIT-Plattform für ethische Dilemma-Experimente" },
      { name: "AI Unplugged", description: "Sammlung von Aktivitäten ohne Computer (Algorithmen-Sortieren, Klassifikation mit Karten)" },
    ],
  },
  {
    key: "oberstufe",
    name: "Oberstufe (11.–13. Klasse)",
    goal: "Tiefe Reflexion, eigene Forschung, politische Einordnung",
    activities: [
      "KI-Studie: Output-Qualität von ChatGPT/Claude vergleichen und dokumentieren",
      'Debatte: "KI im Wahlkampf — verbieten oder kennzeichnen?"',
      "Vergleich: Natürliche vs. Künstliche Intelligenz (RAAbits NI vs. KI)",
      "Politisch: EU AI Act analysieren",
    ],
    materials: [
      { name: "KI-Campus", link: "https://ki-campus.org", description: "Kostenlose Online-Kurse zu KI-Grundlagen, für Selbstlerner:innen geeignet" },
      { name: "RAAbits Natürliche vs. Künstliche Intelligenz", description: "Vergleichendes Material für die Oberstufe" },
      { name: "EU AI Act", link: "https://artificialintelligenceact.eu", description: "Offizielle Plattform mit Volltext, Analysen, FAQ" },
    ],
  },
];

export default function SchoolStageFinder() {
  const [stage, setStage] = useState<Stage>("unterstufe");
  const current = STAGES.find((s) => s.key === stage)!;

  return (
    <ToolShell title="Schulstufen-Material-Finder" description="Wähle eine Klassenstufe — du siehst passende KI-Aktivitäten und konkrete Materialien mit Direkt-Links.">
      <div className="flex flex-wrap gap-2">
        {STAGES.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setStage(s.key)}
            className={`flex-1 min-w-32 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition ${
              stage === s.key ? "border-purple bg-purple text-white" : "border-border-secondary bg-white text-text-primary hover:border-purple"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border-2 border-purple bg-purple-light-5 p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple text-white">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-purple-dark">Ziel dieser Stufe</p>
            <p className="text-base font-semibold text-text-primary">{current.goal}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold text-text-primary">Konkrete Aktivitäten</p>
        <ul className="mt-2 space-y-2">
          {current.activities.map((a) => (
            <li key={a} className="flex items-start gap-2 rounded-lg border border-border-secondary bg-white p-3 text-sm text-text-primary">
              <span className="text-purple">•</span> {a}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold text-text-primary">Materialien & Tools</p>
        <ul className="mt-2 space-y-2">
          {current.materials.map((m) => (
            <li key={m.name} className="rounded-xl border border-border-secondary bg-background-secondary p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-text-primary">{m.name}</p>
                {m.link && (
                  <a href={m.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-semibold text-purple hover:underline">
                    Öffnen <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
              <p className="mt-1 text-xs text-text-secondary">{m.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </ToolShell>
  );
}
