"use client";

import { useState } from "react";
import { ArrowRight, Workflow } from "lucide-react";
import ToolShell from "./ToolShell";

type TaskKey = "ue-brainstorm" | "essay-feedback" | "research-sources" | "image-gen" | "email" | "data-analysis";

const TASKS: { key: TaskKey; label: string; steps: { tool: string; why: string }[] }[] = [
  {
    key: "ue-brainstorm",
    label: "UE-Brainstorming + Vertiefung",
    steps: [
      { tool: "ChatGPT", why: "Schnelles Brainstorming, viele Ideen in kurzer Zeit" },
      { tool: "Claude", why: "Auswahl vertiefen, lange ausformulierte UE-Strukturen" },
      { tool: "Perplexity", why: "Aktuelle Quellen mit Links für die UE-Materialien" },
      { tool: "Gemini", why: "Endprodukt direkt in Google Docs / Drive ablegen" },
    ],
  },
  {
    key: "essay-feedback",
    label: "Aufsatz-Feedback (Erstanalyse)",
    steps: [
      { tool: "Claude (Project)", why: "Beste Sprachqualität für strukturierte Erstanalyse, großer Kontext für lange Texte" },
      { tool: "ChatGPT", why: "Optional: Zweite Meinung, Vergleichs-Analyse" },
    ],
  },
  {
    key: "research-sources",
    label: "Recherche mit verifizierbaren Quellen",
    steps: [
      { tool: "Perplexity", why: "Liefert klickbare Quellen-Links — bestes Mittel gegen Halluzinationen" },
      { tool: "ChatGPT / Claude", why: "Synthese der Quellen, Aufbereitung für den Unterricht" },
    ],
  },
  {
    key: "image-gen",
    label: "Bildgenerierung für Materialien",
    steps: [
      { tool: "ChatGPT (DALL-E)", why: "Standard für Schaubilder, Karikaturen, Illustrationen — gut + verfügbar" },
      { tool: "Midjourney", why: "Für künstlerisch hochwertige Bilder (Kunst, Kreativunterricht)" },
    ],
  },
  {
    key: "email",
    label: "E-Mail-Drafting (Eltern, Kollegium)",
    steps: [
      { tool: "Gemini", why: "Direkt im Workspace, kann auf Gmail-Kontext zugreifen" },
      { tool: "Claude", why: "Optional: Sprachlicher Feinschliff, wertschätzender Ton" },
    ],
  },
  {
    key: "data-analysis",
    label: "Datenanalyse (z.B. Klassen-Statistik, anonymisiert)",
    steps: [
      { tool: "ChatGPT (Code Interpreter)", why: "Kann Excel/CSV lesen, Berechnungen ausführen, Grafiken erzeugen" },
      { tool: "Claude", why: "Optional: Interpretation der Ergebnisse, pädagogische Einordnung" },
    ],
  },
];

export default function WorkflowRouting() {
  const [selected, setSelected] = useState<TaskKey | null>(null);
  const task = TASKS.find((t) => t.key === selected);

  return (
    <ToolShell title="Workflow-Routing: Welches Tool wann?" description="Wähle eine typische Aufgabe — und ich zeige dir, mit welcher Tool-Reihenfolge du am effizientesten zum Ziel kommst.">
      <p className="text-sm font-semibold text-text-primary">Was willst du tun?</p>
      <div className="mt-3 flex flex-col gap-2">
        {TASKS.map((t) => {
          const isSelected = selected === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setSelected(t.key)}
              className={`rounded-xl border-2 px-4 py-3 text-left text-sm transition ${
                isSelected ? "border-purple bg-purple-light-5" : "border-border-secondary bg-white hover:border-purple"
              } text-text-primary`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {task && (
        <div className="mt-6 rounded-2xl border-2 border-purple bg-purple-light-5 p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple text-white">
              <Workflow className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-dark">Empfohlene Tool-Reihenfolge</p>
              <p className="text-base font-semibold text-text-primary">{task.label}</p>
            </div>
          </div>

          <ol className="mt-4 space-y-3">
            {task.steps.map((s, i) => (
              <li key={i} className="flex items-start gap-3 rounded-lg bg-white p-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple text-xs font-bold text-white">{i + 1}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-text-primary">{s.tool}</p>
                  <p className="text-xs text-text-secondary">{s.why}</p>
                </div>
                {i < task.steps.length - 1 && <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-text-tertiary" />}
              </li>
            ))}
          </ol>

          <p className="mt-4 text-xs text-text-secondary">
            <strong>Tool-Switching</strong> kostet Sekunden — aber spart Stunden, weil jedes Tool seine Stärken hat. Nicht aus Loyalität bei einem bleiben.
          </p>
        </div>
      )}
    </ToolShell>
  );
}
