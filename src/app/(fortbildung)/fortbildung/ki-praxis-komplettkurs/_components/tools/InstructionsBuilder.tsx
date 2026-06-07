"use client";

import { useMemo, useState } from "react";
import { Check, Copy, RotateCcw } from "lucide-react";
import ToolShell from "./ToolShell";

type Key = "rolle" | "aufgabe" | "vorgehen" | "stil" | "quellen" | "donts";

const FIELDS: { key: Key; label: string; hint: string; placeholder: string }[] = [
  { key: "rolle", label: "1 · Rolle", hint: "Je präziser, desto besser. Nicht „KI-Assistent“, sondern „Erfahrene Geschichtslehrkraft Sek II Hamburg“.", placeholder: "Du bist eine erfahrene Geschichtslehrkraft an einem deutschen Gymnasium mit 15 Jahren Berufserfahrung, Schwerpunkt Sek II." },
  { key: "aufgabe", label: "2 · Aufgabe", hint: "Was soll der Assistent konkret tun?", placeholder: "Deine Aufgabe ist es, anderen Lehrkräften bei der Konzeption von Unterrichtseinheiten zu helfen — Strukturen vorschlagen, methodische Optionen geben, Differenzierung mitdenken." },
  { key: "vorgehen", label: "3 · Vorgehensweise", hint: "Schrittfolge — wie geht der Assistent typische Anfragen an?", placeholder: "Du arbeitest in drei Schritten: (1) Du klärst durch Rückfragen die Eckdaten. (2) Du machst drei bis fünf konkrete Vorschläge. (3) Wenn der User wählt, gehst du in Detail." },
  { key: "stil", label: "4 · Format und Stil", hint: "Tonalität, Antwortlänge, Strukturierung.", placeholder: "Du antwortest in kurzen Absätzen, nicht in langen Texten. Du verwendest Aufzählungen für Optionen. Du sprichst die User per „Sie“ an, mit kollegialer Wärme." },
  { key: "quellen", label: "5 · Quellen und Wissensbasis", hint: "Wie soll der Assistent mit Quellen umgehen?", placeholder: "Du beziehst dich primär auf die hochgeladenen Lehrplan-Dokumente. Du nennst Quellen nur, wenn du sie aus dem Material zitieren kannst." },
  { key: "donts", label: "6 · Don'ts und Grenzen", hint: "Was darf der Assistent nie tun? Schützt vor heiklen Situationen.", placeholder: "Du gibst niemals fertige Klausuren — nur Strukturen. Du nennst keine echten Schüler:innen-Namen. Du gibst keine Noten und keine politischen Empfehlungen." },
];

export default function InstructionsBuilder() {
  const [values, setValues] = useState<Record<Key, string>>({ rolle: "", aufgabe: "", vorgehen: "", stil: "", quellen: "", donts: "" });
  const [copied, setCopied] = useState(false);

  const instructions = useMemo(() => {
    const blocks: string[] = [];
    if (values.rolle) blocks.push(`# Rolle\n${values.rolle.trim()}`);
    if (values.aufgabe) blocks.push(`# Aufgabe\n${values.aufgabe.trim()}`);
    if (values.vorgehen) blocks.push(`# Vorgehensweise\n${values.vorgehen.trim()}`);
    if (values.stil) blocks.push(`# Format und Stil\n${values.stil.trim()}`);
    if (values.quellen) blocks.push(`# Quellen und Wissensbasis\n${values.quellen.trim()}`);
    if (values.donts) blocks.push(`# Don'ts\n${values.donts.trim()}`);
    return blocks.join("\n\n");
  }, [values]);

  const wordCount = instructions.split(/\s+/).filter(Boolean).length;
  const lengthHint = wordCount === 0 ? null : wordCount < 200 ? "noch zu kurz — Instructions wirken oft vage" : wordCount > 900 ? "schon recht lang — Assistent verliert sich evtl." : "im idealen Bereich (300–800 Wörter)";

  const handleCopy = async () => {
    if (!instructions) return;
    await navigator.clipboard.writeText(instructions);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolShell title="6-Block-Instructions-Builder" description="Bau deine Custom-GPT- / Claude-Project- / Gemini-Gem-Instructions Block für Block. Am Ende: fertig zum Einfügen, mit Längen-Hinweis.">
      {FIELDS.map((f) => (
        <div key={f.key} className="mt-4 first:mt-0">
          <label className="block text-sm font-semibold text-text-primary">{f.label}</label>
          <p className="mt-1 text-xs text-text-tertiary">{f.hint}</p>
          <textarea
            value={values[f.key]}
            onChange={(e) => setValues((p) => ({ ...p, [f.key]: e.target.value }))}
            placeholder={f.placeholder}
            rows={3}
            className="mt-2 w-full rounded-lg border-2 border-border-secondary px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-purple focus:outline-none focus:ring-2 focus:ring-purple-light-4"
          />
        </div>
      ))}

      <div className="mt-6 rounded-xl border border-dashed border-border-tertiary bg-background-secondary p-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary">Deine Instructions</p>
          {lengthHint && (
            <p className="text-xs text-text-secondary">{wordCount} Wörter — {lengthHint}</p>
          )}
        </div>
        <pre className="mt-2 whitespace-pre-wrap font-mono text-sm leading-relaxed text-text-primary">
          {instructions || <span className="text-text-tertiary">Sobald du Blöcke ausfüllst, baut sich dein Instructions-Text hier zusammen …</span>}
        </pre>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" onClick={handleCopy} disabled={!instructions} className="flex items-center gap-2 rounded-lg bg-purple px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-dark disabled:cursor-not-allowed disabled:opacity-40">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Kopiert!" : "In Zwischenablage kopieren"}
        </button>
        <button type="button" onClick={() => setValues({ rolle: "", aufgabe: "", vorgehen: "", stil: "", quellen: "", donts: "" })} className="flex items-center gap-2 rounded-lg border-2 border-border-secondary bg-white px-4 py-2.5 text-sm font-semibold text-text-secondary transition hover:border-purple hover:text-purple">
          <RotateCcw className="h-4 w-4" />
          Zurücksetzen
        </button>
      </div>
    </ToolShell>
  );
}
