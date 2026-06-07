"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import ToolShell from "./ToolShell";

type Option = { id: "A" | "B" | "C" | "D"; text: string; correct: boolean };

const RULES: { key: string; check: (opts: Option[]) => boolean; pass: string; fail: string }[] = [
  {
    key: "single-correct",
    check: (opts) => opts.filter((o) => o.correct).length === 1,
    pass: "Genau eine richtige Antwort markiert ✓",
    fail: "Mehrere oder keine richtige Antwort markiert. Bei MC muss genau eine richtig sein.",
  },
  {
    key: "length-similar",
    check: (opts) => {
      const lengths = opts.map((o) => o.text.length).filter((l) => l > 0);
      if (lengths.length < 4) return false;
      const min = Math.min(...lengths);
      const max = Math.max(...lengths);
      return max <= min * 2.2;
    },
    pass: "Antwortlängen sind ähnlich ✓",
    fail: 'Antwortlängen sind sehr unterschiedlich. Klassiker-Hack: "längere Antwort = richtig". Optionen sprachlich angleichen.',
  },
  {
    key: "no-all-none",
    check: (opts) => !opts.some((o) => /alle der oben|keine der oben|alles davon|keine davon|alle stimmen|alle richtig/i.test(o.text)),
    pass: 'Keine "Alle/Keine der oben"-Optionen ✓',
    fail: '"Alle/Keine der oben" gefunden. Didaktisch schwach — vermeiden.',
  },
  {
    key: "no-negation",
    check: (opts) => !/[Ww]as.*\b(?:nicht|kein|niemals)\b/.test((document.title ?? "") + ""),
    pass: "Frage enthält keine Verneinung ✓",
    fail: 'Verneinungen ("Welches steht NICHT?") verwirren. Frage positiv formulieren.',
  },
  {
    key: "all-filled",
    check: (opts) => opts.every((o) => o.text.trim().length > 5),
    pass: "Alle 4 Optionen sind ausgefüllt ✓",
    fail: "Eine oder mehrere Optionen sind leer oder zu kurz. Distraktoren müssen plausibel sein.",
  },
];

export default function DistractorChecker() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<Option[]>([
    { id: "A", text: "", correct: false },
    { id: "B", text: "", correct: false },
    { id: "C", text: "", correct: false },
    { id: "D", text: "", correct: false },
  ]);

  const updateOption = (id: Option["id"], updates: Partial<Option>) =>
    setOptions((prev) => prev.map((o) => (o.id === id ? { ...o, ...updates } : o)));

  // Stand-alone negation check on the question text
  const hasNegationInQuestion = useMemo(
    () => /\b(nicht|kein|niemals|außer)\b/i.test(question),
    [question],
  );

  const results = useMemo(() => {
    return RULES.map((rule) => {
      let passed: boolean;
      if (rule.key === "no-negation") {
        passed = !hasNegationInQuestion;
      } else {
        passed = rule.check(options);
      }
      return { ...rule, passed };
    });
  }, [options, hasNegationInQuestion]);

  const passedCount = results.filter((r) => r.passed).length;
  const allEmpty = !question.trim() && options.every((o) => !o.text.trim());

  return (
    <ToolShell title="Distraktor-Checker" description="Trag deine MC-Frage und 4 Antworten ein. Wir prüfen sie gegen Tims 5 Distraktor-Regeln und zeigen, wo sie schwächeln.">
      <label className="block text-sm font-semibold text-text-primary">Frage</label>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="z.B. „Welches Prinzip steht im Zentrum von Artikel 1 der Erklärung der Menschen- und Bürgerrechte?"
        rows={2}
        className="mt-2 w-full rounded-lg border-2 border-border-secondary px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-purple focus:outline-none focus:ring-2 focus:ring-purple-light-4"
      />

      <div className="mt-5 flex flex-col gap-3">
        {options.map((opt) => (
          <div key={opt.id} className="flex items-start gap-3 rounded-xl border border-border-secondary bg-background-secondary p-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple text-sm font-bold text-white">{opt.id}</span>
            <textarea
              value={opt.text}
              onChange={(e) => updateOption(opt.id, { text: e.target.value })}
              placeholder={`Antwortoption ${opt.id}`}
              rows={2}
              className="flex-1 rounded-lg border-2 border-border-secondary bg-white px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-purple focus:outline-none focus:ring-2 focus:ring-purple-light-4"
            />
            <label className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary">
              <input
                type="checkbox"
                checked={opt.correct}
                onChange={(e) => updateOption(opt.id, { correct: e.target.checked })}
                className="h-4 w-4 accent-purple"
              />
              richtig
            </label>
          </div>
        ))}
      </div>

      {!allEmpty && (
        <div className="mt-6 rounded-2xl border-2 border-purple bg-purple-light-5 p-5">
          <div className="flex items-baseline gap-3">
            <p className="text-3xl font-bold text-purple-dark">{passedCount}/{RULES.length}</p>
            <p className="text-xs font-semibold text-purple-dark">Distraktor-Regeln erfüllt</p>
          </div>
          <ul className="mt-4 space-y-2">
            {results.map((r) => (
              <li key={r.key} className="flex items-start gap-2 text-sm">
                {r.passed
                  ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  : <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />}
                <span className={r.passed ? "text-emerald-900" : "text-amber-900"}>
                  {r.passed ? r.pass : r.fail}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </ToolShell>
  );
}
