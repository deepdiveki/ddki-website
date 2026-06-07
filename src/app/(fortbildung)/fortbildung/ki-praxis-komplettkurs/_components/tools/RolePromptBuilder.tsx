"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Check, Copy } from "lucide-react";
import ToolShell from "./ToolShell";

const STYLE_PRESETS = ["ernsthaft, oft pathetisch", "humorvoll, mit Alltagsanalogien", "gebildet, distanziert, philosophisch", "leidenschaftlich, idealistisch", "sachlich-präzise, wissenschaftlich"];

export default function RolePromptBuilder() {
  const [figure, setFigure] = useState("");
  const [year, setYear] = useState("");
  const [audience, setAudience] = useState("deutsche Schüler:innen der 12. Klasse");
  const [style, setStyle] = useState("");
  const [knowledgeLimit, setKnowledgeLimit] = useState(true);
  const [shortAnswers, setShortAnswers] = useState(true);
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(() => {
    if (!figure.trim() || !year.trim()) return "";
    const parts: string[] = [];
    parts.push(`Du übernimmst die Rolle von ${figure.trim()}, im Jahr ${year.trim()}.`);
    parts.push(`Du sprichst mit ${audience.trim()}.`);
    if (knowledgeLimit) {
      parts.push(`Du antwortest aus deiner damaligen Perspektive — du weißt nichts über Ereignisse nach diesem Zeitpunkt.`);
    }
    if (style.trim()) {
      parts.push(`Stil: ${style.trim()}.`);
    }
    if (shortAnswers) {
      parts.push(`Antworten max. 4 Sätze.`);
    }
    return parts.join(" ");
  }, [figure, year, audience, knowledgeLimit, style, shortAnswers]);

  const handleCopy = async () => {
    if (!prompt) return;
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fieldClass = "mt-2 w-full rounded-lg border-2 border-border-secondary px-3 py-2.5 text-sm text-text-primary focus:border-purple focus:outline-none focus:ring-2 focus:ring-purple-light-4";

  return (
    <ToolShell title="Rollen-Prompt-Builder" description="Bau einen Rollen-Dialog mit einer historischen Figur. Die Vorlage baut Caveats automatisch ein — und am Ende erinnern wir dich an die drei didaktischen Regeln.">
      <div>
        <label className="block text-sm font-semibold text-text-primary">Historische Figur</label>
        <input type="text" value={figure} onChange={(e) => setFigure(e.target.value)} placeholder="z.B. Maximilien de Robespierre, Goethe, Marie Curie" className={fieldClass} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-text-primary">Jahr / Zeitpunkt</label>
          <input type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="z.B. 1794, Mai" className={fieldClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text-primary">Gesprächspartner:innen</label>
          <input type="text" value={audience} onChange={(e) => setAudience(e.target.value)} className={fieldClass} />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-semibold text-text-primary">Stil</label>
        <input type="text" value={style} onChange={(e) => setStyle(e.target.value)} placeholder="z.B. ernsthaft, oft pathetisch, mit Verweisen auf Tugend" className={fieldClass} />
        <div className="mt-2 flex flex-wrap gap-1.5">
          {STYLE_PRESETS.map((s) => (
            <button key={s} type="button" onClick={() => setStyle(s)} className="rounded-full border border-border-secondary bg-background-secondary px-3 py-1 text-xs text-text-secondary transition hover:border-purple hover:text-purple">
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <label className="flex items-center gap-2 text-sm text-text-primary">
          <input type="checkbox" checked={knowledgeLimit} onChange={(e) => setKnowledgeLimit(e.target.checked)} className="h-4 w-4 accent-purple" />
          Wissensgrenze einbauen (KI weiß nichts über spätere Ereignisse)
        </label>
        <label className="flex items-center gap-2 text-sm text-text-primary">
          <input type="checkbox" checked={shortAnswers} onChange={(e) => setShortAnswers(e.target.checked)} className="h-4 w-4 accent-purple" />
          Antworten auf max. 4 Sätze begrenzen
        </label>
      </div>

      <div className="mt-6 rounded-xl border border-dashed border-border-tertiary bg-background-secondary p-4">
        <p className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary">Dein Rollen-Prompt</p>
        <p className="mt-2 whitespace-pre-wrap font-mono text-sm leading-relaxed text-text-primary">
          {prompt || <span className="text-text-tertiary">Trage Figur und Jahr ein, dann wird hier dein Prompt sichtbar.</span>}
        </p>
      </div>

      <button type="button" onClick={handleCopy} disabled={!prompt} className="mt-4 flex items-center gap-2 rounded-lg bg-purple px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-dark disabled:cursor-not-allowed disabled:opacity-40">
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Kopiert!" : "In Zwischenablage kopieren"}
      </button>

      <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
        <div className="text-sm text-amber-900">
          <p className="font-semibold">Drei didaktische Regeln vor dem Einsatz:</p>
          <ol className="mt-2 list-decimal pl-4">
            <li>Vor dem Dialog mit den SuS über die Methodik sprechen („Das ist eine Simulation, nicht eine Person").</li>
            <li>Echte Quellen zum Vergleich bereithalten.</li>
            <li>Reflexionsphase am Ende — was haben wir über die Figur, und was über KI gelernt?</li>
          </ol>
          <p className="mt-2"><strong>Bei sensiblen Figuren</strong> (Anne Frank, Adolf Hitler, kürzlich Verstorbene) lieber komplett verzichten.</p>
        </div>
      </div>
    </ToolShell>
  );
}
