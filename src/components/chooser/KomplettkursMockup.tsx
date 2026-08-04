"use client";

import { GraduationCap, Play } from "lucide-react";

const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

const STEPS = [
  "Crash-Kurs: mentales KI-Modell aufgebaut",
  "Modul I: Unterrichtseinheit mit KI geplant",
  "Aufgabe per Reverse-Engineering geprüft",
  "KI-Vereinbarung mit der Klasse erstellt",
];

function GreenDot() {
  return (
    <span className="mt-1.5 flex size-3 shrink-0 items-center justify-center rounded-full border-2 border-emerald-300/90">
      <span className="size-1 rounded-full bg-emerald-300" />
    </span>
  );
}

export default function KomplettkursMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[32px] p-4 shadow-2xl [background:linear-gradient(155deg,#8b5cf6_0%,#a78bfa_38%,#d68cfa_72%,#f0bdfa_100%)] sm:p-5">
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
        {/* Player panel */}
        <div className="rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-md">
          <div className="flex items-start gap-3">
            <GreenDot />
            <p className="text-sm font-medium text-white">
              Modul II: Plagiate, Hausaufgaben &amp; Klausuren
            </p>
          </div>

          {/* Lesson chip with progress */}
          <div className="mt-3 ml-6 rounded-xl border border-white/25 bg-white/15 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary-darker">
                <Play className="size-3.5 text-white" />
              </span>
              <span className="text-sm font-medium text-white">
                Lektion: KI-resistente Aufgaben gestalten
              </span>
            </div>
            <div className="mt-2 ml-8 h-1 overflow-hidden rounded-full bg-white/25">
              <span className="block h-full w-2/3 rounded-full bg-white/90" />
            </div>
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

        {/* Course stats */}
        <div className="flex items-center justify-between gap-2 rounded-2xl border border-white/25 bg-white/10 p-3 text-center backdrop-blur-md">
          {[
            ["65", "Videos"],
            ["14", "Tools"],
            ["60+", "Materialien"],
          ].map(([value, label]) => (
            <div key={label} className="flex-1">
              <p className="text-lg font-semibold text-white">{value}</p>
              <p className="text-xs text-white/70">{label}</p>
            </div>
          ))}
        </div>

        {/* Certificate row */}
        <div className="flex items-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-4 py-3 backdrop-blur-md">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/85">
            <GraduationCap className="size-4 text-primary-darker" />
          </span>
          <span className="text-sm text-white/90">
            Zertifikat nach Abschluss inklusive
          </span>
        </div>
      </div>
    </div>
  );
}
