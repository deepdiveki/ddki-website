"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import ToolShell from "./ToolShell";

type Platform = "chatgpt" | "claude" | "gemini";

const QUESTIONS = [
  {
    key: "main",
    text: "Was ist der Haupt-Use-Case deines Assistenten?",
    options: [
      { id: "writing", label: "Längere Texte schreiben / korrigieren / analysieren", weight: { chatgpt: 1, claude: 3, gemini: 1 } },
      { id: "variety", label: "Viele unterschiedliche kleine Aufgaben", weight: { chatgpt: 3, claude: 1, gemini: 1 } },
      { id: "workspace", label: "Workflows mit Docs / Mails / Drive", weight: { chatgpt: 0, claude: 1, gemini: 3 } },
      { id: "interactive", label: "Interaktive Materialien (HTML, kleine Apps)", weight: { chatgpt: 1, claude: 3, gemini: 1 } },
    ],
  },
  {
    key: "sharing",
    text: "Wie willst du den Assistenten teilen?",
    options: [
      { id: "link", label: "Per Link an Kolleg:innen oder Klassen", weight: { chatgpt: 3, claude: 1, gemini: 0 } },
      { id: "workspace", label: "Im Google Workspace meiner Schule", weight: { chatgpt: 0, claude: 0, gemini: 3 } },
      { id: "private", label: "Nur für mich", weight: { chatgpt: 2, claude: 2, gemini: 2 } },
    ],
  },
  {
    key: "budget",
    text: "Welche Plattform hast du schon?",
    options: [
      { id: "chatgpt", label: "ChatGPT Plus", weight: { chatgpt: 4, claude: 0, gemini: 0 } },
      { id: "claude", label: "Claude Pro", weight: { chatgpt: 0, claude: 4, gemini: 0 } },
      { id: "gemini", label: "Google Workspace mit Gemini", weight: { chatgpt: 0, claude: 0, gemini: 4 } },
      { id: "none", label: "Noch keine — bereit, eine anzuschaffen", weight: { chatgpt: 2, claude: 2, gemini: 1 } },
    ],
  },
] as const;

const PLATFORMS: Record<Platform, { name: string; why: string }> = {
  chatgpt: {
    name: "Custom GPT (ChatGPT)",
    why: "Größtes Ökosystem, sehr einfaches Sharing per Link, viele eingebaute Capabilities (DALL-E, Web Browsing, Code Interpreter). Sicherster Allrounder.",
  },
  claude: {
    name: "Claude Project (Anthropic)",
    why: "Stark bei langen Texten, sprachlich nuanciert, Artifacts erzeugen interaktive Materialien direkt im Chat. Beste Wahl für Sprach- und Schreibarbeit.",
  },
  gemini: {
    name: "Gemini Gem (Google)",
    why: "Tief in Workspace (Docs, Gmail, Drive) integriert. Oft schon in der Schul-Lizenz enthalten — naheliegend, wenn deine Schule mit Google arbeitet.",
  },
};

export default function AssistantPlatformWizard() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const allAnswered = QUESTIONS.every((q) => answers[q.key]);

  const scores = QUESTIONS.reduce(
    (acc, q) => {
      const sel = answers[q.key];
      const opt = q.options.find((o) => o.id === sel);
      if (!opt) return acc;
      acc.chatgpt += opt.weight.chatgpt;
      acc.claude += opt.weight.claude;
      acc.gemini += opt.weight.gemini;
      return acc;
    },
    { chatgpt: 0, claude: 0, gemini: 0 } as Record<Platform, number>,
  );
  const winner: Platform = (Object.entries(scores) as [Platform, number][]).sort((a, b) => b[1] - a[1])[0][0];
  const result = allAnswered ? PLATFORMS[winner] : null;

  return (
    <ToolShell title="Assistenten-Plattform-Wizard" description="Drei Fragen — und ich sage dir, ob Custom GPT, Claude Project oder Gemini Gem für deinen Assistenten am besten passt.">
      <ol className="flex flex-col gap-6">
        {QUESTIONS.map((q, i) => (
          <li key={q.key}>
            <p className="text-sm font-semibold text-text-primary">{i + 1}. {q.text}</p>
            <div className="mt-2 flex flex-col gap-2">
              {q.options.map((opt) => {
                const isSelected = answers[q.key] === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setAnswers((prev) => ({ ...prev, [q.key]: opt.id }))}
                    className={`rounded-xl border-2 px-4 py-3 text-left text-sm transition ${
                      isSelected ? "border-purple bg-purple-light-5" : "border-border-secondary bg-white hover:border-purple"
                    } text-text-primary`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>

      {result && (
        <div className="mt-6 rounded-2xl border-2 border-purple bg-purple-light-5 p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-dark">Empfehlung</p>
              <p className="text-xl font-bold text-purple-dark">{result.name}</p>
              <p className="mt-2 text-sm text-text-primary">{result.why}</p>
            </div>
          </div>
        </div>
      )}
    </ToolShell>
  );
}
