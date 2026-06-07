"use client";

import { useState } from "react";
import { Info, Sparkles } from "lucide-react";

type PlatformKey = "chatgpt" | "claude" | "gemini";

type Platform = {
  key: PlatformKey;
  name: string;
  vendor: string;
  strength: string;
  goodFor: string;
  pickWhy: string;
  pickHook: string;
};

const PLATFORMS: Platform[] = [
  {
    key: "chatgpt",
    name: "ChatGPT",
    vendor: "OpenAI",
    strength: "Standardwerkzeug, sehr ausgereift, großes Ökosystem",
    goodFor: "du nur einen Account willst – ein sicherer Start",
    pickHook: "Ich will einfach einen sicheren Start und nur einen Account anlegen.",
    pickWhy:
      "Das „Standardwerkzeug“ von OpenAI: sehr ausgereift, riesiges Ökosystem, viele Zusatzfunktionen. Ein sicherer Start, wenn du nur einen Account anlegen willst.",
  },
  {
    key: "claude",
    name: "Claude",
    vendor: "Anthropic",
    strength: "Stark beim Schreiben, langen Texten, sorgfältigen Antworten",
    goodFor: "du viel formulierst & korrigierst",
    pickHook: "Ich schreibe und korrigiere viel und arbeite oft mit langen Texten.",
    pickWhy:
      "Von Anthropic: stark beim Schreiben, beim Umgang mit langen Texten und bei sorgfältigen, durchdachten Antworten. Viele Lehrkräfte mögen Claude für Formulierungs- und Korrekturaufgaben.",
  },
  {
    key: "gemini",
    name: "Gemini",
    vendor: "Google",
    strength: "Tief in die Google-Welt integriert",
    goodFor: "deine Schule Google Workspace nutzt",
    pickHook: "Meine Schule arbeitet mit Google Workspace (Docs, Gmail, Drive).",
    pickWhy:
      "Von Google: tief in Docs, Gmail und Drive integriert. Naheliegend, wenn deine Schule mit Google Workspace arbeitet.",
  },
];

export default function PlatformFinder() {
  const [pick, setPick] = useState<PlatformKey | null>(null);
  const recommendation = pick ? PLATFORMS.find((p) => p.key === pick) : null;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-8 lg:py-12">
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-purple">
          Crash-Kurs KI · Tool
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-text-primary md:text-3xl">
          Plattform-Finder
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          Alle drei taugen – wichtiger als die Wahl ist, dass du anfängst. Was ist dir am wichtigsten?
        </p>
      </header>

      <div className="rounded-2xl border border-border-secondary bg-white p-5 shadow-sm md:p-7">
        <p className="text-sm font-semibold text-text-primary">
          Was beschreibt dich am besten?
        </p>

        <div className="mt-3 flex flex-col gap-2">
          {PLATFORMS.map((platform) => {
            const isSelected = pick === platform.key;
            return (
              <button
                key={platform.key}
                type="button"
                onClick={() => setPick(platform.key)}
                className={`rounded-xl border-2 px-4 py-3 text-left text-sm transition ${
                  isSelected
                    ? "border-purple bg-purple-light-5 text-text-primary"
                    : "border-border-secondary bg-white text-text-primary hover:border-purple hover:bg-purple-light-5"
                }`}
              >
                {platform.pickHook}
              </button>
            );
          })}
        </div>

        {recommendation && (
          <div className="mt-6">
            <div className="flex items-start gap-4 rounded-2xl border-2 border-purple bg-purple-light-5 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-purple-dark">
                  Empfehlung
                </p>
                <p className="text-xl font-bold text-purple-dark">
                  {recommendation.name}
                </p>
                <p className="mt-2 text-sm text-text-primary">{recommendation.pickWhy}</p>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-xl border border-purple-light-3 bg-purple-light-5 p-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-purple" />
              <p className="text-sm text-text-primary">
                <span className="font-semibold">Egal wie du wählst:</span> Für diesen Kurs zeige ich die meisten Demos in{" "}
                <span className="font-semibold">ChatGPT</span>. Alle drei haben kostenlose Versionen, die fürs Erste völlig reichen.
              </p>
            </div>
          </div>
        )}

        <div className="mt-7 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border-secondary">
                <th className="py-2.5 pr-3 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                  Plattform
                </th>
                <th className="px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                  Stärke
                </th>
                <th className="px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                  Gut, wenn …
                </th>
              </tr>
            </thead>
            <tbody>
              {PLATFORMS.map((platform) => (
                <tr key={platform.key} className="border-b border-border-secondary last:border-b-0">
                  <td className="py-3 pr-3 align-top">
                    <div className="font-bold text-text-primary">{platform.name}</div>
                    <div className="text-xs text-text-tertiary">{platform.vendor}</div>
                  </td>
                  <td className="px-3 py-3 align-top text-text-secondary">
                    {platform.strength}
                  </td>
                  <td className="px-3 py-3 align-top text-text-secondary">
                    {platform.goodFor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
