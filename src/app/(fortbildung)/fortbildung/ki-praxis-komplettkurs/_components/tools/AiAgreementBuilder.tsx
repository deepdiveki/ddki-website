"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import ToolShell from "./ToolShell";

type Section = {
  key: string;
  heading: string;
  options: { id: string; label: string; text: string }[];
};

const SECTIONS: Section[] = [
  {
    key: "ziel",
    heading: "1. Unser Ziel",
    options: [
      { id: "a", label: "KI als Werkzeug verstehen, nicht als Ersatz", text: "Wir nutzen KI als Werkzeug, das unser Denken unterstützt — nicht ersetzt. Wir lernen, KI verantwortungsvoll, kritisch und transparent einzusetzen." },
      { id: "b", label: "Eigenständiges Denken stärken", text: "Im Mittelpunkt steht unser eigenes Denken. KI hilft uns dort, wo sie sinnvoll entlastet — Routine, Übersetzung, Strukturierung. Die Bewertung und das Lernen bleiben bei uns." },
    ],
  },
  {
    key: "transparenz",
    heading: "2. Transparenz-Regel",
    options: [
      { id: "a", label: "Standard-Variante: Offenlegen", text: "Wer KI für eine Aufgabe nutzt, gibt das offen an — mit kurzem Hinweis am Anfang oder Ende der Abgabe: welches Tool, wofür genau, in welchem Umfang." },
      { id: "b", label: "Strenger: Mit Prompt-Dokumentation", text: "Wer KI nutzt, dokumentiert die verwendeten Prompts und die KI-Antworten in einem kurzen Anhang zur Abgabe. So bleibt der eigene Anteil sichtbar." },
    ],
  },
  {
    key: "erlaubt",
    heading: "3. Was ist erlaubt?",
    options: [
      { id: "a", label: "Erlaubt: Recherche, Brainstorming, Korrektur", text: "Erlaubt ist KI für Recherche, Brainstorming, Rechtschreib- und Grammatikkorrektur sowie für Strukturierungs-Hilfen. Verboten ist die Übernahme ganzer KI-Texte als eigene Leistung." },
      { id: "b", label: "Restriktiver: Nur Korrektur", text: "Erlaubt ist KI ausschließlich für Rechtschreib- und Grammatikkorrektur. Inhaltliche KI-Hilfe ist nicht erlaubt. Hausaufgaben werden eigenständig erbracht." },
      { id: "c", label: "Offener: Open-AI für definierte Aufgaben", text: "Bestimmte Aufgaben sind explizit KI-offen — z.B. Recherche, längere Texte, kreative Anfangsphasen. Bei Klausuren und Tests gilt strikte KI-Sperre." },
    ],
  },
  {
    key: "verboten",
    heading: "4. Was ist nicht erlaubt?",
    options: [
      { id: "a", label: "Standard-Verbote", text: "Verboten ist: KI-Texte ohne Kennzeichnung als eigene Leistung abgeben; KI während Klausuren nutzen; persönliche Daten von Mitschüler:innen oder Lehrkräften in KI eingeben." },
      { id: "b", label: "Erweiterte Verbote", text: "Zusätzlich verboten: Verwendung von KI zur Generierung falscher oder beleidigender Inhalte über Mitschüler:innen oder Lehrkräfte; Nutzung von KI-Detektor-Umgehungstools wie undetectable.ai." },
    ],
  },
  {
    key: "konsequenzen",
    heading: "5. Konsequenzen & Überprüfung",
    options: [
      { id: "a", label: "Pädagogisch-kommunikativ", text: "Bei Unklarheiten suchen wir das Gespräch — kein Detektor entscheidet, ob ein Text KI ist. Wir bewerten anhand mündlicher Erklärung und Kenntnis der Lerngruppe. Diese Vereinbarung wird halbjährlich gemeinsam überprüft." },
      { id: "b", label: "Mit klaren Stufen", text: "Erstverstoß: Gespräch und Aufforderung zur Überarbeitung. Wiederholt: Note 6 für die Abgabe und Eintrag im Klassenbuch. Diese Vereinbarung wird halbjährlich gemeinsam überprüft." },
    ],
  },
];

export default function AiAgreementBuilder() {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const agreement = useMemo(() => {
    const blocks: string[] = ["# KI-Vereinbarung unserer Klasse\n"];
    for (const section of SECTIONS) {
      const selId = selections[section.key];
      const opt = section.options.find((o) => o.id === selId);
      if (opt) {
        blocks.push(`## ${section.heading}\n${opt.text}`);
      }
    }
    return blocks.join("\n\n");
  }, [selections]);

  const allDone = SECTIONS.every((s) => selections[s.key]);

  const handleCopy = async () => {
    if (!agreement) return;
    await navigator.clipboard.writeText(agreement);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolShell title="KI-Vereinbarungs-Builder" description="Wähle für jeden der fünf Abschnitte eine Variante — und du bekommst eine fertige KI-Vereinbarung für deine Klasse zum Kopieren oder Drucken.">
      {SECTIONS.map((section) => (
        <div key={section.key} className="mt-5 first:mt-0">
          <p className="text-sm font-semibold text-text-primary">{section.heading}</p>
          <div className="mt-2 flex flex-col gap-2">
            {section.options.map((opt) => {
              const isSelected = selections[section.key] === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelections((p) => ({ ...p, [section.key]: opt.id }))}
                  className={`rounded-xl border-2 px-4 py-3 text-left text-sm transition ${
                    isSelected ? "border-purple bg-purple-light-5" : "border-border-secondary bg-white hover:border-purple"
                  } text-text-primary`}
                >
                  <p className="font-semibold">{opt.label}</p>
                  <p className="mt-1 text-xs text-text-secondary">{opt.text}</p>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="mt-6 rounded-xl border border-dashed border-border-tertiary bg-background-secondary p-4">
        <p className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary">Deine KI-Vereinbarung</p>
        <pre className="mt-2 whitespace-pre-wrap font-sans text-sm leading-relaxed text-text-primary">
          {allDone ? agreement : <span className="text-text-tertiary">Wähle für jeden Abschnitt eine Variante — dann erscheint hier die fertige Vereinbarung.</span>}
        </pre>
      </div>

      <button type="button" onClick={handleCopy} disabled={!allDone} className="mt-4 flex items-center gap-2 rounded-lg bg-purple px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-dark disabled:cursor-not-allowed disabled:opacity-40">
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Kopiert!" : "Vereinbarung kopieren"}
      </button>
    </ToolShell>
  );
}
