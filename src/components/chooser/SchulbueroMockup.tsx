"use client";

import { Mail, Send } from "lucide-react";

const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

const STEPS = [
  "Schülerin erkannt: L. Mustermann (7b)",
  "Abwesenheit im System erfasst",
  "Klassenlehrkraft benachrichtigt",
  "Entschuldigung rechtssicher archiviert",
];

function GreenDot() {
  return (
    <span className="mt-1.5 flex size-3 shrink-0 items-center justify-center rounded-full border-2 border-emerald-300/90">
      <span className="size-1 rounded-full bg-emerald-300" />
    </span>
  );
}

export default function SchulbueroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[32px] p-4 shadow-2xl [background:linear-gradient(155deg,#5ee0d0_0%,#6f8dff_42%,#a78bfa_74%,#c6bdfa_100%)] sm:p-5">
      {/* Coarse grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
        style={{
          backgroundImage: `url("${NOISE}")`,
          backgroundSize: "140px 140px",
        }}
      />

      <div className="relative flex flex-col gap-3">
        {/* Workflow panel */}
        <div className="rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-md">
          <div className="flex items-start gap-3">
            <GreenDot />
            <p className="text-sm font-medium text-white">
              Neue E-Mail: Krankmeldung
            </p>
          </div>

          {/* Email chip */}
          <div className="mt-3 ml-6 inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/15 px-3 py-2">
            <span className="flex size-6 items-center justify-center rounded-md bg-primary-darker">
              <Mail className="size-3.5 text-white" />
            </span>
            <span className="text-sm font-medium text-white">
              Von: familie.mustermann@…
            </span>
          </div>

          <div className="my-3 h-px w-full bg-white/20" />

          <div className="flex flex-col gap-2.5">
            {STEPS.map((step) => (
              <div key={step} className="flex items-start gap-3">
                <GreenDot />
                <p className="text-sm text-white/95">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Assistant question */}
        <div className="rounded-2xl border border-white/25 bg-white/10 p-4 text-sm text-white backdrop-blur-md">
          Soll ich den Eltern eine Empfangsbestätigung senden?
        </div>

        {/* Reply input */}
        <div className="flex items-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-4 py-3 backdrop-blur-md">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/85 text-xs font-semibold text-primary-darker">
            S
          </span>
          <span className="text-sm text-white/60">Antworten…</span>
          <Send className="ml-auto size-5 text-white/60" />
        </div>
      </div>
    </div>
  );
}
