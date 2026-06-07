"use client";

import { useMemo, useState } from "react";
import { Shield } from "lucide-react";
import ToolShell from "./ToolShell";

const CRITERIA = [
  { key: "physical", label: "Physische Präsenz nötig", description: "Beruf braucht Anwesenheit vor Ort, körperliche Tätigkeit, Hand- oder Werkarbeit" },
  { key: "complexity", label: "Hohe Komplexität / Verantwortung", description: "Entscheidungen mit hoher Tragweite, Spezialwissen, Haftung" },
  { key: "creativity", label: "Kreativität / Vision", description: "Neuartige Ideen, künstlerisches Schaffen, strategisches Gestalten" },
  { key: "human", label: "Zwischenmenschliche Arbeit", description: "Empathie, Beziehung, Vertrauen, Pflege, Betreuung, Therapie" },
];

export default function CareerResilience() {
  const [career, setCareer] = useState("");
  const [scores, setScores] = useState<Record<string, number>>({});

  const total = useMemo(() => CRITERIA.reduce((sum, c) => sum + (scores[c.key] ?? 0), 0), [scores]);
  const max = CRITERIA.length * 3;
  const pct = Math.round((total / max) * 100);
  const label = pct >= 70 ? "Stark resilient" : pct >= 40 ? "Teilweise resilient" : "Hochgradig automatisierbar";
  const labelColor = pct >= 70 ? "bg-emerald-100 text-emerald-800" : pct >= 40 ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800";
  const explanation = pct >= 70
    ? "Der Beruf hat mehrere KI-resiliente Eigenschaften. Veränderung kommt, aber als Erweiterung — nicht als Ersatz."
    : pct >= 40
      ? "Manche Anteile sind KI-vulnerabel, andere nicht. Tätigkeitsprofil wird sich verschieben."
      : "Hohes Risiko: Die typischen Tätigkeiten sind genau das, was KI 2025/26 schon gut beherrscht. Berufsbild wird sich grundlegend wandeln.";

  return (
    <ToolShell title="Beruf-Resilienz-Check" description="Trag einen Beruf ein und bewerte ihn anhand von vier Kriterien. Das Ergebnis ist ein KI-Resilienz-Score plus Einordnung.">
      <label className="block text-sm font-semibold text-text-primary">Beruf</label>
      <input
        type="text"
        value={career}
        onChange={(e) => setCareer(e.target.value)}
        placeholder="z.B. Physiotherapie, Marketing-Texter:in, Programmiererin, Pflegekraft"
        className="mt-2 w-full rounded-lg border-2 border-border-secondary px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-purple focus:outline-none focus:ring-2 focus:ring-purple-light-4"
      />

      <div className="mt-6 flex flex-col gap-4">
        {CRITERIA.map((c) => {
          const value = scores[c.key] ?? 0;
          return (
            <div key={c.key}>
              <p className="text-sm font-semibold text-text-primary">{c.label}</p>
              <p className="mt-1 text-xs text-text-tertiary">{c.description}</p>
              <div className="mt-2 flex gap-2">
                {[0, 1, 2, 3].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setScores((p) => ({ ...p, [c.key]: v }))}
                    className={`flex h-10 flex-1 items-center justify-center rounded-lg border-2 text-sm font-semibold transition ${
                      value === v
                        ? "border-purple bg-purple text-white"
                        : "border-border-secondary bg-white text-text-secondary hover:border-purple hover:text-purple"
                    }`}
                  >
                    {["gar nicht", "wenig", "mittel", "stark"][v]}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {Object.keys(scores).length > 0 && (
        <div className="mt-6 rounded-2xl border-2 border-purple bg-purple-light-5 p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple text-white">
              <Shield className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-3">
                <p className="text-3xl font-bold text-purple-dark">{pct}%</p>
                <p className={`rounded-full px-3 py-0.5 text-xs font-semibold ${labelColor}`}>{label}</p>
              </div>
              <p className="mt-1 text-sm text-text-secondary">KI-Resilienz-Score{career.trim() ? ` für „${career}"` : ""}</p>
              <p className="mt-3 text-sm text-text-primary">{explanation}</p>
            </div>
          </div>
        </div>
      )}
    </ToolShell>
  );
}
