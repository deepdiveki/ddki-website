"use client";

import { useId, useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import ToolShell from "./ToolShell";

const SUBJECTS = ["Mathematik", "Deutsch", "Englisch", "Geschichte", "Biologie", "Physik", "Chemie", "Sachunterricht", "Religion", "Ethik", "Sport", "Musik", "Kunst", "PGW / Politik"];
const STAGES = ["Grundschule (1.–4. Klasse)", "Sek I (5.–10. Klasse)", "Sek II (11.–13. Klasse)"];
const FOCI = ["Realweltliche Anwendung", "Quellenkritische Analyse", "Kreativ-experimentell", "Problemlösendes Denken", "Diskussion und Reflexion", "Handlungsorientiertes Experimentieren"];

export default function SubjectTransfer() {
  const baseId = useId();
  const subjectId = `${baseId}-subject`;
  const stageId = `${baseId}-stage`;
  const topicId = `${baseId}-topic`;
  const sessionsId = `${baseId}-sessions`;
  const durationId = `${baseId}-duration`;
  const focusId = `${baseId}-focus`;
  const [subject, setSubject] = useState("Mathematik");
  const [stage, setStage] = useState("Sek I (5.–10. Klasse)");
  const [topic, setTopic] = useState("");
  const [sessions, setSessions] = useState("6");
  const [duration, setDuration] = useState("90");
  const [focus, setFocus] = useState("Realweltliche Anwendung");
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(() => {
    if (!topic.trim()) return "";
    return `Du bist erfahrene ${subject}-Lehrkraft. Erstelle eine Unterrichtseinheit zu „${topic.trim()}“ für die ${stage}. Rahmen: ${sessions} Sitzungen à ${duration} Minuten. Schwerpunkt: ${focus}. Pro Sitzung gib bitte: Thema, Lernziele, Phasen mit Methode, vorgeschlagenes Material, Hausaufgabe. Berücksichtige Differenzierung in drei Niveau-Stufen und nutze mindestens eine ungewöhnliche Methode.`;
  }, [subject, stage, topic, sessions, duration, focus]);

  const handleCopy = async () => {
    if (!prompt) return;
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fieldClass = "mt-2 w-full rounded-lg border-2 border-border-secondary px-3 py-2.5 text-sm text-text-primary focus:border-purple focus:outline-none focus:ring-2 focus:ring-purple-light-4";

  return (
    <ToolShell title="Fach-Transfer-Prompt-Generator" description="Wähle Fach, Klassenstufe und Thema — und du bekommst einen fertigen UE-Erstprompt, der die 6-Bausteine-Logik auf dein Fach überträgt.">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor={subjectId} className="block text-sm font-semibold text-text-primary">Fach</label>
          <select id={subjectId} value={subject} onChange={(e) => setSubject(e.target.value)} className={fieldClass}>
            {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={stageId} className="block text-sm font-semibold text-text-primary">Schulform / Stufe</label>
          <select id={stageId} value={stage} onChange={(e) => setStage(e.target.value)} className={fieldClass}>
            {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor={topicId} className="block text-sm font-semibold text-text-primary">Thema</label>
        <input id={topicId} type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="z.B. Lineare Funktionen, Reading Comprehension, Wasserkreislauf" className={fieldClass} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor={sessionsId} className="block text-sm font-semibold text-text-primary">Anzahl Sitzungen</label>
          <input id={sessionsId} type="number" min="1" max="20" value={sessions} onChange={(e) => setSessions(e.target.value)} className={fieldClass} />
        </div>
        <div>
          <label htmlFor={durationId} className="block text-sm font-semibold text-text-primary">Dauer pro Sitzung (Min)</label>
          <input id={durationId} type="number" min="30" max="180" value={duration} onChange={(e) => setDuration(e.target.value)} className={fieldClass} />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor={focusId} className="block text-sm font-semibold text-text-primary">Schwerpunkt</label>
        <select id={focusId} value={focus} onChange={(e) => setFocus(e.target.value)} className={fieldClass}>
          {FOCI.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>

      <div className="mt-6 rounded-xl border border-dashed border-border-tertiary bg-background-secondary p-4" aria-live="polite">
        <p className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary">Dein Fach-Transfer-Prompt</p>
        <p className="mt-2 whitespace-pre-wrap font-mono text-sm leading-relaxed text-text-primary">
          {prompt || <span className="text-text-tertiary">Trag ein Thema ein, dann wird hier dein Prompt sichtbar.</span>}
        </p>
      </div>

      <button type="button" onClick={handleCopy} disabled={!prompt} className="mt-4 flex items-center gap-2 rounded-lg bg-purple px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-dark disabled:cursor-not-allowed disabled:opacity-40">
        {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        {copied ? "Kopiert!" : "In Zwischenablage kopieren"}
      </button>
      <span className="sr-only" role="status" aria-live="polite">{copied ? "Kopiert!" : ""}</span>
    </ToolShell>
  );
}
