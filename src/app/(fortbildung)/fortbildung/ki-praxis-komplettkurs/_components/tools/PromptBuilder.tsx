"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Lightbulb, RotateCcw } from "lucide-react";

type FieldKey = "role" | "task" | "context" | "format";

const FIELDS: {
  key: FieldKey;
  index: number;
  label: string;
  hint: string;
  placeholder: string;
  chips: string[];
}[] = [
  {
    key: "role",
    index: 1,
    label: "Rolle",
    hint: "Wer soll die KI sein?",
    placeholder: "z. B. Du bist eine erfahrene Mathematiklehrerin",
    chips: [
      "Du bist eine erfahrene Grundschullehrerin",
      "Du bist Lektor für Schulbücher",
      "Du bist erfahrene Biologielehrkraft",
    ],
  },
  {
    key: "task",
    index: 2,
    label: "Aufgabe",
    hint: "Klar & konkret – was genau?",
    placeholder: "z. B. Erstelle fünf Übungsaufgaben zur Addition von Brüchen",
    chips: [
      "Erstelle fünf Übungsaufgaben zur Addition von Brüchen",
      "Gib mir 5 kreative Stundeneinstiege",
      "Vereinfache diesen Text",
    ],
  },
  {
    key: "context",
    index: 3,
    label: "Kontext",
    hint: "Für wen, in welcher Situation?",
    placeholder: "z. B. Für eine 6. Klasse, eher leistungsschwach, als Hausaufgabe",
    chips: [
      "Für eine 6. Klasse, eher leistungsschwach, als Hausaufgabe",
      "Für eine 9. Klasse im Gymnasium",
      "Für DaZ-Schüler:innen, Niveau A2",
    ],
  },
  {
    key: "format",
    index: 4,
    label: "Format",
    hint: "Wie soll das Ergebnis aussehen?",
    placeholder: "z. B. Nummerierte Liste, steigende Schwierigkeit, Lösungen am Ende",
    chips: [
      "Als Tabelle",
      "In Stichpunkten",
      "Maximal 200 Wörter",
      "Mit Lösungen am Ende",
    ],
  },
];

const trimTrailingPunctuation = (value: string) => value.replace(/[.\s]*$/, "");

export default function PromptBuilder() {
  const [values, setValues] = useState<Record<FieldKey, string>>({
    role: "",
    task: "",
    context: "",
    format: "",
  });
  const [message, setMessage] = useState<string>("");

  const prompt = useMemo(() => {
    const parts: string[] = [];
    if (values.role) parts.push(`${trimTrailingPunctuation(values.role)}.`);
    if (values.task) parts.push(`${trimTrailingPunctuation(values.task)}.`);
    if (values.context) parts.push(`${trimTrailingPunctuation(values.context)}.`);
    if (values.format) parts.push(`Format: ${trimTrailingPunctuation(values.format)}.`);
    return parts.join(" ");
  }, [values]);

  const handleCopy = async () => {
    if (!prompt) {
      setMessage("Erst ein paar Bausteine ausfüllen.");
      return;
    }
    try {
      await navigator.clipboard.writeText(prompt);
      setMessage("✓ Kopiert!");
      setTimeout(() => setMessage(""), 2200);
    } catch {
      setMessage("Kopieren nicht möglich – Text manuell markieren.");
    }
  };

  const handleReset = () => {
    setValues({ role: "", task: "", context: "", format: "" });
    setMessage("");
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-8 lg:py-12">
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-purple">
          Crash-Kurs KI · Tool
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-text-primary md:text-3xl">
          Prompt-Builder
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          Bau deinen Prompt aus vier Bausteinen. Tippe selbst oder nimm einen Vorschlag – unten entsteht der fertige Prompt zum Kopieren.
        </p>
      </header>

      <div className="rounded-2xl border border-border-secondary bg-white p-5 shadow-sm md:p-7">
        {FIELDS.map((field) => (
          <div key={field.key} className="mt-4 first:mt-0">
            <label
              htmlFor={`pb-${field.key}`}
              className="block text-sm font-semibold text-text-primary"
            >
              {field.index} · {field.label}
              <span className="ml-2 font-normal text-text-tertiary">{field.hint}</span>
            </label>
            <input
              id={`pb-${field.key}`}
              type="text"
              value={values[field.key]}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, [field.key]: e.target.value }))
              }
              placeholder={field.placeholder}
              className="mt-2 w-full rounded-lg border-2 border-border-secondary px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-purple focus:outline-none focus:ring-2 focus:ring-purple-light-4"
            />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {field.chips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() =>
                    setValues((prev) => ({ ...prev, [field.key]: chip }))
                  }
                  className="rounded-full border border-border-secondary bg-background-secondary px-3 py-1 text-xs text-text-secondary transition hover:border-purple hover:bg-purple-light-5 hover:text-purple"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-6 rounded-xl border border-dashed border-border-tertiary bg-background-secondary p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary">
            Dein Prompt
          </p>
          <div className="mt-2 whitespace-pre-wrap font-mono text-sm leading-relaxed text-text-primary">
            {prompt || (
              <span className="text-text-tertiary">
                Sobald du etwas eintippst, baut sich dein Prompt hier zusammen …
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-lg bg-purple px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-dark"
          >
            {message === "✓ Kopiert!" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            In Zwischenablage kopieren
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 rounded-lg border-2 border-border-secondary bg-white px-4 py-2.5 text-sm font-semibold text-text-secondary transition hover:border-purple hover:text-purple"
          >
            <RotateCcw className="h-4 w-4" />
            Zurücksetzen
          </button>
          {message && <span className="text-sm text-text-secondary">{message}</span>}
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-xl border border-purple-light-3 bg-purple-light-5 p-4">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-purple" />
          <p className="text-sm text-text-primary">
            <span className="font-semibold">Faustregel:</span> Du musst nicht immer alle vier nutzen. Enttäuscht ein Ergebnis, fehlt fast immer{" "}
            <span className="font-semibold">Kontext</span> oder{" "}
            <span className="font-semibold">Format</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
