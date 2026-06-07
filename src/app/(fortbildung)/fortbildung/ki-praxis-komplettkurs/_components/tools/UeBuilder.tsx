"use client";

import { useMemo, useState } from "react";
import { Check, Copy, RotateCcw } from "lucide-react";
import ToolShell from "./ToolShell";

type Key = "rolle" | "aufgabe" | "rahmen" | "schwerpunkt" | "leitfragen" | "format";

const FIELDS: { key: Key; label: string; hint: string; placeholder: string; chips: string[] }[] = [
  { key: "rolle", label: "1 · Rolle", hint: "Wer soll die KI sein?", placeholder: "Du bist erfahrene Geschichtslehrkraft an einem deutschen Gymnasium", chips: ["Du bist erfahrene Geschichtslehrkraft", "Du bist Mathematiklehrkraft Sek I", "Du bist Grundschullehrkraft"] },
  { key: "aufgabe", label: "2 · Aufgabe", hint: "Was genau soll erstellt werden?", placeholder: "Erstelle eine Unterrichtseinheit zur Französischen Revolution", chips: ["Erstelle eine UE zu …", "Plane 6 Sitzungen zu …", "Konzipiere eine Reihe zu …"] },
  { key: "rahmen", label: "3 · Rahmen", hint: "Stundenanzahl, Dauer, Schulform, Klassenstufe", placeholder: "10 Sitzungen à 2 Stunden, Studienstufe Klasse 12, Leistungskurs", chips: ["6 Sitzungen à 90 Min, 9. Klasse Gymnasium", "10 Sitzungen à 45 Min, 7. Klasse Realschule", "5 Sitzungen à 45 Min, 3. Klasse Grundschule"] },
  { key: "schwerpunkt", label: "4 · Schwerpunkt", hint: "Inhaltlicher Fokus", placeholder: "Politisch-sozialer Zugang mit kulturellen Einschüben", chips: ["Politisch-sozialer Zugang", "Anwendungsorientierte Modellierung", "Quellenkritische Analyse"] },
  { key: "leitfragen", label: "5 · Leitfragen", hint: "3–5 zentrale Fragen, die durch die UE leiten", placeholder: "Wie verteilt sich Macht zwischen Ständen? Welche Rolle spielen ökonomische Faktoren? …", chips: ["3 zentrale Leitfragen, die alle Sitzungen tragen", "5 Leitfragen mit historischer und aktueller Relevanz"] },
  { key: "format", label: "6 · Output-Format", hint: "Wie soll die Antwort strukturiert sein?", placeholder: "Pro Sitzung: Thema, Lernziele, Phasen mit Methode, Material, Hausaufgabe", chips: ["Pro Sitzung: Thema, Lernziele, Phasen, Material, HA", "Als Markdown-Tabelle", "Mit Differenzierungs-Hinweisen für 3 Niveaus"] },
];

const trim = (v: string) => v.replace(/[.\s]*$/, "");

export default function UeBuilder() {
  const [values, setValues] = useState<Record<Key, string>>({ rolle: "", aufgabe: "", rahmen: "", schwerpunkt: "", leitfragen: "", format: "" });
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(() => {
    const parts: string[] = [];
    if (values.rolle) parts.push(`${trim(values.rolle)}.`);
    if (values.aufgabe) parts.push(`${trim(values.aufgabe)}.`);
    if (values.rahmen) parts.push(`Rahmen: ${trim(values.rahmen)}.`);
    if (values.schwerpunkt) parts.push(`Schwerpunkt: ${trim(values.schwerpunkt)}.`);
    if (values.leitfragen) parts.push(`Leitfragen: ${trim(values.leitfragen)}.`);
    if (values.format) parts.push(`Output-Format: ${trim(values.format)}.`);
    return parts.join(" ");
  }, [values]);

  const handleCopy = async () => {
    if (!prompt) return;
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolShell title="6-Bausteine UE-Builder" description="Bau deinen UE-Erstprompt aus allen sechs Bausteinen — fertig zum Kopieren in ChatGPT, Claude oder Gemini.">
      {FIELDS.map((f) => (
        <div key={f.key} className="mt-4 first:mt-0">
          <label className="block text-sm font-semibold text-text-primary">
            {f.label} <span className="ml-2 font-normal text-text-tertiary">{f.hint}</span>
          </label>
          <textarea
            value={values[f.key]}
            onChange={(e) => setValues((p) => ({ ...p, [f.key]: e.target.value }))}
            placeholder={f.placeholder}
            rows={2}
            className="mt-2 w-full rounded-lg border-2 border-border-secondary px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-purple focus:outline-none focus:ring-2 focus:ring-purple-light-4"
          />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {f.chips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setValues((p) => ({ ...p, [f.key]: chip }))}
                className="rounded-full border border-border-secondary bg-background-secondary px-3 py-1 text-xs text-text-secondary transition hover:border-purple hover:bg-purple-light-5 hover:text-purple"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-6 rounded-xl border border-dashed border-border-tertiary bg-background-secondary p-4">
        <p className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary">Dein UE-Prompt</p>
        <div className="mt-2 whitespace-pre-wrap font-mono text-sm leading-relaxed text-text-primary">
          {prompt || <span className="text-text-tertiary">Sobald du Bausteine ausfüllst, baut sich dein Prompt hier zusammen …</span>}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" onClick={handleCopy} className="flex items-center gap-2 rounded-lg bg-purple px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-dark">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Kopiert!" : "In Zwischenablage kopieren"}
        </button>
        <button
          type="button"
          onClick={() => setValues({ rolle: "", aufgabe: "", rahmen: "", schwerpunkt: "", leitfragen: "", format: "" })}
          className="flex items-center gap-2 rounded-lg border-2 border-border-secondary bg-white px-4 py-2.5 text-sm font-semibold text-text-secondary transition hover:border-purple hover:text-purple"
        >
          <RotateCcw className="h-4 w-4" />
          Zurücksetzen
        </button>
      </div>
    </ToolShell>
  );
}
