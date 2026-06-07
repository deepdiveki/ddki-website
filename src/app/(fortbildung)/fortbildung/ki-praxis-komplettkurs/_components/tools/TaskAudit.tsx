"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Circle, ShieldCheck } from "lucide-react";
import ToolShell from "./ToolShell";

type PrincipleKey = "prozess" | "bezug" | "kontext" | "reflexion" | "vielfalt";

const PRINCIPLES: { key: PrincipleKey; name: string; checks: string[]; tip: string }[] = [
  {
    key: "prozess",
    name: "Grundsatz 1 – Prozessorientierung",
    checks: ["Die Aufgabe verlangt Zwischenschritte / Skizzen / Dokumentation", "Es wird nicht nur das Endprodukt bewertet"],
    tip: "Ergänze z.B. einen Reflexions-Absatz, eine Zwischenversion, ein Lerntagebuch-Eintrag.",
  },
  {
    key: "bezug",
    name: "Grundsatz 2 – Persönlicher Bezug",
    checks: ["Die Aufgabe verlangt eine eigene Position oder eigene Beispiele", "SuS müssen sich selbst einbringen — nicht nur referieren"],
    tip: "Frag explizit nach eigener Stellungnahme, persönlichem Beispiel, eigener Erfahrung.",
  },
  {
    key: "kontext",
    name: "Grundsatz 3 – Lokaler und situativer Kontext",
    checks: ["Bezug zur konkreten Klasse / Schule / Region", "Bezug auf aktuelle Unterrichtsstunde oder vorherige Materialien"],
    tip: 'Z.B. "Bezogen auf unseren Stadt-Besuch letzte Woche …" oder "Verglichen mit Lektion 4 unseres Buchs …".',
  },
  {
    key: "reflexion",
    name: "Grundsatz 4 – Reflexion",
    checks: ["Reflexionsfrage am Ende oder zwischendurch", "SuS müssen ihr eigenes Vorgehen / Lernen reflektieren"],
    tip: 'Z.B. "Was war schwierig? Was hat geholfen? Was würdest du beim nächsten Mal anders machen?"',
  },
  {
    key: "vielfalt",
    name: "Grundsatz 5 – Methoden-Vielfalt",
    checks: ["Mehr als nur Schreiben (z.B. Skizze, Audio, Präsentation)", "Aufgabe lässt unterschiedliche Lern-Stile zu"],
    tip: "Erlaube Audio-Aufnahme, Skizze, Mindmap oder Tabelle als Alternative zum Fließtext.",
  },
];

export default function TaskAudit() {
  const [task, setTask] = useState("");
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  const totalChecks = PRINCIPLES.reduce((sum, p) => sum + p.checks.length, 0);
  const completedChecks = Object.values(checks).filter(Boolean).length;
  const score = useMemo(() => Math.round((completedChecks / totalChecks) * 100), [completedChecks, totalChecks]);

  const principleScore = (p: typeof PRINCIPLES[number]) => {
    const total = p.checks.length;
    const done = p.checks.filter((_, i) => checks[`${p.key}-${i}`]).length;
    return done / total;
  };

  const failed = PRINCIPLES.filter((p) => principleScore(p) < 0.5);

  const label = score >= 80 ? "KI-resistent" : score >= 50 ? "teilweise robust" : "KI-vulnerabel";
  const labelColor = score >= 80 ? "text-emerald-700 bg-emerald-50 border-emerald-200" : score >= 50 ? "text-amber-700 bg-amber-50 border-amber-200" : "text-rose-700 bg-rose-50 border-rose-200";

  return (
    <ToolShell title="Aufgaben-Audit: 5 Grundsätze prüfen" description="Trage deine Klausur- oder Hausaufgabe ein und hake die erfüllten Kriterien ab. Am Ende: KI-Resistenz-Score plus konkrete To-Dos für die schwachen Grundsätze.">
      <label className="block text-sm font-semibold text-text-primary">Deine Aufgabe (optional zum Mitschreiben)</label>
      <textarea
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="z.B. „Verfasse einen Aufsatz zu den Ursachen der Französischen Revolution. 800 Wörter."
        rows={3}
        className="mt-2 w-full rounded-lg border-2 border-border-secondary px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-purple focus:outline-none focus:ring-2 focus:ring-purple-light-4"
      />

      <ol className="mt-6 flex flex-col gap-5">
        {PRINCIPLES.map((p) => (
          <li key={p.key} className="rounded-xl border border-border-secondary bg-background-secondary p-4">
            <p className="text-sm font-semibold text-text-primary">{p.name}</p>
            <ul className="mt-3 space-y-2">
              {p.checks.map((c, i) => {
                const key = `${p.key}-${i}`;
                const isChecked = !!checks[key];
                return (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => setChecks((prev) => ({ ...prev, [key]: !prev[key] }))}
                      className="flex w-full items-start gap-3 text-left"
                    >
                      {isChecked ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" /> : <Circle className="mt-0.5 h-5 w-5 shrink-0 text-text-tertiary" />}
                      <span className={`text-sm ${isChecked ? "text-text-primary" : "text-text-secondary"}`}>{c}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-2xl border-2 border-purple bg-purple-light-5 p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple text-white">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-3">
              <p className="text-3xl font-bold text-purple-dark">{score}%</p>
              <p className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${labelColor}`}>{label}</p>
            </div>
            <p className="mt-1 text-sm text-text-secondary">KI-Resistenz-Score auf Basis der 5 Grundsätze</p>
          </div>
        </div>

        {failed.length > 0 && (
          <div className="mt-4 space-y-3">
            <p className="text-sm font-semibold text-text-primary">Konkrete To-Dos:</p>
            {failed.map((p) => (
              <div key={p.key} className="rounded-lg bg-white p-3 text-sm text-text-primary">
                <p className="font-semibold">{p.name}</p>
                <p className="mt-1 text-text-secondary">{p.tip}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolShell>
  );
}
