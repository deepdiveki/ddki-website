"use client";

import { useState } from "react";
import { CheckCircle2, Circle, ShieldAlert, ShieldCheck } from "lucide-react";
import ToolShell from "./ToolShell";

const LEITPLANKEN = [
  { key: "bias", name: "1. Bias-Bewusstsein", description: 'Hast du absichtliche Bias-Test-Fragen durchgespielt? (z.B. "Welche Berufe für Mädchen?")', todo: "Teste mindestens 3 typische Bias-Fragen und schärfe deine Instructions entsprechend nach." },
  { key: "datenschutz", name: "2. Datenschutz strukturell", description: "In Instructions verboten: nach Namen, Adressen, persönlichen Daten fragen? Nur nötige Capabilities aktiviert?", todo: 'Ergänze Instructions um: "Frag nie nach Namen, Adressen oder persönlichen Daten." Deaktiviere nicht-benötigte Tools.' },
  { key: "transparenz", name: "3. Transparenz über KI-Nutzung", description: "Antwortet der Assistent ehrlich, wenn er gefragt wird, ob er KI ist?", todo: 'Füge in Instructions ein: "Wenn du gefragt wirst, ob du KI bist, antworte ehrlich: Ja, ich bin ein KI-Assistent."' },
  { key: "notausgang", name: "4. Notausgang-Prinzip", description: "Bei Krisen-Indikatoren wird konsequent an Beratungsstellen weitergeleitet? (Nummer gegen Kummer, Telefonseelsorge)", todo: 'Klausel hinzufügen: "Bei Anzeichen von emotionaler Krise leitest du immer an Nummer gegen Kummer (116 111) und Telefonseelsorge (0800-1110111) weiter."' },
  { key: "verantwortung", name: "5. Verantwortungs-Klärung", description: "Du bist als Erstellerin identifizierbar? Schul-internes Register?", todo: 'Im Footer/Beschreibung: "Erstellt von [Name], Schule X. Rückfragen an …". Im Schul-Register eintragen.' },
  { key: "reversibility", name: "6. Reversibility", description: "Jederzeit abschaltbar? Du hast Admin-Rechte? Nicht in Systeme eingebettet, die du nicht kontrollierst?", todo: "Behalte volle Admin-Rechte. Dokumentiere Nutzung. Bei Problemen sofort deaktivieren/anpassen können." },
];

export default function EthicsChecklist() {
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const done = LEITPLANKEN.filter((l) => checks[l.key]).length;
  const score = Math.round((done / LEITPLANKEN.length) * 100);
  const failed = LEITPLANKEN.filter((l) => !checks[l.key]);
  const ready = done === LEITPLANKEN.length;

  return (
    <ToolShell title="Pre-Share-Ethik-Check" description="Sechs Leitplanken vor jedem Sharing eines KI-Assistenten. Hake ab, was erfüllt ist — dein Reifegrad-Score zeigt dir, was noch fehlt.">
      <ol className="flex flex-col gap-3">
        {LEITPLANKEN.map((l) => {
          const checked = !!checks[l.key];
          return (
            <li key={l.key}>
              <button
                type="button"
                onClick={() => setChecks((p) => ({ ...p, [l.key]: !p[l.key] }))}
                className={`flex w-full items-start gap-3 rounded-xl border-2 px-4 py-3 text-left transition ${
                  checked ? "border-emerald-200 bg-emerald-50" : "border-border-secondary bg-white hover:border-purple"
                }`}
              >
                {checked ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" /> : <Circle className="mt-0.5 h-5 w-5 shrink-0 text-text-tertiary" />}
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${checked ? "text-emerald-900" : "text-text-primary"}`}>{l.name}</p>
                  <p className={`mt-1 text-xs ${checked ? "text-emerald-800" : "text-text-secondary"}`}>{l.description}</p>
                </div>
              </button>
            </li>
          );
        })}
      </ol>

      <div className={`mt-6 rounded-2xl border-2 p-5 ${ready ? "border-emerald-500 bg-emerald-50" : "border-purple bg-purple-light-5"}`}>
        <div className="flex items-start gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white ${ready ? "bg-emerald-500" : "bg-purple"}`}>
            {ready ? <ShieldCheck className="h-6 w-6" /> : <ShieldAlert className="h-6 w-6" />}
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-3">
              <p className={`text-3xl font-bold ${ready ? "text-emerald-700" : "text-purple-dark"}`}>{score}%</p>
              <p className={`text-xs font-semibold ${ready ? "text-emerald-700" : "text-purple-dark"}`}>
                {ready ? "Bereit zum Teilen" : `${done}/${LEITPLANKEN.length} Leitplanken erfüllt`}
              </p>
            </div>
            <p className="mt-1 text-sm text-text-secondary">
              {ready
                ? "Alle sechs Leitplanken sind erfüllt. Du kannst den Assistenten verantwortungsvoll teilen."
                : "Im Zweifel lieber zwei Wochen länger testen als einen kritischen Vorfall riskieren."}
            </p>
          </div>
        </div>

        {failed.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-semibold text-text-primary">Offene To-Dos:</p>
            {failed.map((l) => (
              <div key={l.key} className="rounded-lg bg-white p-3 text-sm">
                <p className="font-semibold text-text-primary">{l.name}</p>
                <p className="mt-1 text-text-secondary">{l.todo}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolShell>
  );
}
