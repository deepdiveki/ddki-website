"use client";

import { GRADIENTS } from "@/components/praesentation/blocks";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Copy } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AGENDA,
  FAECHER,
  FACH_THEMEN,
  FORGE_STRIPS,
  MATCH_Q,
  MATCH_RES,
  NIVEAU,
  NIVEAUS,
  PAID_Q,
  QUIZ_TOOLS,
  STATIONS,
  STUDIOS,
  TOOL_COMPARE,
  TOOL_COMPARE_TASKS,
  TOOLS,
  TOTAL_MIN,
  exampleFor,
  paidVerdict,
  promptFor,
  quizPrompt,
  studioPrompt,
  type Fach,
  type Niveau,
  type PaidValue,
  type QuizToolId,
  type StationId,
  type StudioId,
  type ToolId,
} from "./data";

/**
 * „Tim Seite“: interaktive Fortbildungsseite (90 Minuten) im Design der
 * Präsentationsfolien. Nachbau der Vorlage als Website: Niveau- und
 * Fachwahl oben steuern Aufgaben, Beispiele und Prompts auf der ganzen Seite.
 * Zustand liegt im localStorage, damit Teilnehmende nach einem Reload dort
 * weitermachen, wo sie waren.
 */

const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

const LS = {
  niveau: "tim-niveau",
  fach: "tim-fach",
  match: "tim-match",
  paid: "tim-paid",
  thema: "tim-thema",
  tool: "tim-quiz-tool",
  info: "tim-quiz-info",
  count: "tim-quiz-count",
};

function readLS<T>(key: string, fallback: T): T {
  try {
    const v = window.localStorage.getItem(key);
    return v === null ? fallback : (JSON.parse(v) as T);
  } catch {
    return fallback;
  }
}
function writeLS(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* privates Fenster o. ä.: Seite funktioniert trotzdem */
  }
}

/* ─── Design-Bausteine (Folien-Formensprache, responsive) ─── */

function GrainCard({
  gradient = "purple",
  className,
  children,
}: {
  gradient?: keyof typeof GRADIENTS;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-3xl p-6 text-white shadow-xl sm:p-8", className)} style={{ background: GRADIENTS[gradient] }}>
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay" style={{ backgroundImage: `url("${NOISE}")`, backgroundSize: "140px 140px" }} />
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  );
}

function Glass({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-md sm:p-5", className)}>{children}</div>;
}

function Kicker({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-xs font-semibold tracking-[0.18em] text-primary-dark uppercase", className)}>{children}</p>;
}

function CopyButton({ text, label = "Kopieren", className }: { text: string; label?: string; className?: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setDone(true);
    window.setTimeout(() => setDone(false), 1400);
  };
  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
        done ? "bg-emerald-500 text-white" : "bg-text-primary text-white hover:bg-primary-darker",
        className,
      )}
    >
      {done ? <Check className="size-4" /> : <Copy className="size-4" />}
      {done ? "Kopiert" : label}
    </button>
  );
}

function PromptBox({ text, label = "Kopierbarer Auftrag" }: { text: string; label?: string }) {
  return (
    <div className="relative rounded-2xl bg-[#0b0820] p-5 pt-14 text-[15px] leading-relaxed whitespace-pre-wrap text-white/90 sm:p-6 sm:pt-14">
      <div className="absolute top-4 right-4 left-5 flex items-center justify-between gap-3">
        <span className="text-xs font-semibold tracking-[0.18em] text-primary-base uppercase">{label}</span>
        <CopyButton text={text} className="bg-white/15 hover:bg-white/25" />
      </div>
      {text}
    </div>
  );
}

function ChapterHead({ time, title, claim, dark = false }: { time: string; title: string; claim: React.ReactNode; dark?: boolean }) {
  return (
    <header className="max-w-3xl">
      <Kicker className={dark ? "text-primary-base" : undefined}>{time}</Kicker>
      <h2 className={cn("mt-3 text-4xl font-semibold tracking-tight sm:text-5xl", dark ? "text-white" : "text-text-primary")}>{title}</h2>
      <p className={cn("mt-4 text-lg leading-relaxed sm:text-xl", dark ? "text-white/80" : "text-text-secondary")}>{claim}</p>
    </header>
  );
}

function Strip({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-l-4 border-primary-dark bg-white p-5 shadow-sm sm:p-6">
      <p className="text-base font-semibold text-text-primary">{title}</p>
      <div className="mt-2 space-y-3 text-[15px] leading-relaxed text-text-secondary">{children}</div>
    </div>
  );
}

function OptionButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl border border-border-secondary bg-white px-4 py-3 text-left text-[15px] font-medium text-text-primary transition hover:border-primary-dark hover:bg-primary-light"
    >
      {children}
    </button>
  );
}

/* ─── Timer ─── */

let activeTimerStop: (() => void) | null = null;

function chime() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 784;
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.07, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
    osc.start();
    osc.stop(ctx.currentTime + 0.55);
  } catch {
    /* Audio kann blockiert sein; der Timer bleibt sichtbar */
  }
}

function PhaseTimer({ mins, label }: { mins: number; label: string }) {
  const total = mins * 60;
  const [left, setLeft] = useState(total);
  const [running, setRunning] = useState(false);
  const tick = useRef<number>(0);

  const stop = useCallback(() => {
    window.clearInterval(tick.current);
    tick.current = 0;
    setRunning(false);
  }, []);

  const start = () => {
    if (running) return;
    if (activeTimerStop && activeTimerStop !== stop) activeTimerStop();
    activeTimerStop = stop;
    setLeft((l) => (l <= 0 ? total : l));
    setRunning(true);
    tick.current = window.setInterval(() => {
      setLeft((l) => {
        if (l <= 1) {
          window.clearInterval(tick.current);
          setRunning(false);
          chime();
          return 0;
        }
        return l - 1;
      });
    }, 1000);
  };
  useEffect(() => () => window.clearInterval(tick.current), []);

  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  const warn = left <= 60 && left > 0;
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-white px-5 py-4 shadow-sm", warn ? "border-rose-300" : "border-border-tertiary")}>
      <p className="text-xs font-semibold tracking-[0.18em] text-text-tertiary uppercase">{label}</p>
      <div className="flex flex-wrap items-center gap-3">
        <span className={cn("text-4xl font-semibold tracking-tight tabular-nums", left === 0 ? "text-emerald-600" : warn ? "text-rose-600" : "text-text-primary")}>
          {mm}:{ss}
        </span>
        <button type="button" onClick={start} className="rounded-full bg-primary-dark px-4 py-2 text-sm font-semibold text-white hover:bg-primary-darker disabled:opacity-60" disabled={running}>
          {running ? "Läuft" : left < total && left > 0 ? "Weiter" : "Start"}
        </button>
        <button type="button" onClick={stop} className="rounded-full border border-border-secondary px-4 py-2 text-sm font-medium text-text-primary hover:bg-background-secondary">
          Pause
        </button>
        <button
          type="button"
          onClick={() => {
            stop();
            setLeft(total);
          }}
          className="rounded-full border border-border-secondary px-4 py-2 text-sm font-medium text-text-primary hover:bg-background-secondary"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

/* ─── Seite ─── */

export default function TimSeite() {
  const [niveau, setNiveau] = useState<Niveau>("einsteiger");
  const [fach, setFach] = useState<Fach>("grundschule");
  const [match, setMatch] = useState<ToolId[]>([]);
  const [paid, setPaid] = useState<PaidValue[]>([]);
  const [studio, setStudio] = useState<StudioId | null>(null);
  const [station, setStation] = useState<StationId>("vorbereitung");
  const [acc, setAcc] = useState(15);
  const [current, setCurrent] = useState("hero");

  // localStorage lesen (nur Client)
  useEffect(() => {
    setNiveau(readLS<Niveau>(LS.niveau, "einsteiger"));
    setFach(readLS<Fach>(LS.fach, "grundschule"));
    setMatch(readLS<ToolId[]>(LS.match, []));
    setPaid(readLS<PaidValue[]>(LS.paid, []));
  }, []);
  const changeNiveau = (n: Niveau) => {
    setNiveau(n);
    writeLS(LS.niveau, n);
  };
  const changeFach = (f: Fach) => {
    setFach(f);
    writeLS(LS.fach, f);
  };
  const pushMatch = (k: ToolId) => {
    const next = [...match, k];
    setMatch(next);
    writeLS(LS.match, next);
  };
  const resetMatch = () => {
    setMatch([]);
    writeLS(LS.match, []);
  };
  const pushPaid = (v: PaidValue) => {
    const next = [...paid, v];
    setPaid(next);
    writeLS(LS.paid, next);
  };
  const resetPaid = () => {
    setPaid([]);
    writeLS(LS.paid, []);
  };

  // Kapitel-Beobachter für Zeitleiste und Navigation
  useEffect(() => {
    const els = AGENDA.map((a) => document.getElementById(a.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const a = AGENDA.find((x) => x.id === e.target.id);
          if (a) {
            setAcc(a.acc);
            setCurrent(a.id);
          }
        });
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const n = NIVEAU[niveau];

  /* Match-Quiz */
  const verdict = useMemo(() => {
    if (match.length < MATCH_Q.length) return null;
    const scores: Partial<Record<ToolId, number>> = {};
    match.forEach((k) => (scores[k] = (scores[k] ?? 0) + 1));
    const ranked = (Object.entries(scores) as [ToolId, number][]).sort((a, b) => b[1] - a[1]);
    const winner = ranked[0][0];
    const runner = ranked[1]?.[0];
    return { winner, runner: runner && runner !== winner ? runner : null };
  }, [match]);

  const pair = useMemo(() => {
    const suggested = TOOL_COMPARE[fach].tool;
    const a = { id: suggested, name: TOOLS[suggested].name, via: `Vorschlag · ${FAECHER[fach]}` };
    if (!verdict) return { a, b: null as null | { id: ToolId; name: string; via: string } };
    let bId = verdict.winner;
    let via = "Aus dem Quiz";
    if (bId === a.id) {
      bId = verdict.runner ?? (a.id === "gpt" ? "claude" : "gpt");
      via = verdict.runner ? "Plan B aus dem Quiz" : "Zweites Tool";
    }
    return { a, b: { id: bId, name: TOOLS[bId].name, via } };
  }, [fach, verdict]);

  const cmp = TOOL_COMPARE[fach];
  const cmpTask = TOOL_COMPARE_TASKS[niveau];
  const st = STATIONS.find((x) => x.id === station)!;
  const stPrompt = promptFor(station, fach, niveau);
  const stExample = exampleFor(st.examples, fach);
  const stTask = st.tasks[niveau];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background-secondary text-text-primary">
      {/* ─── Leiste ─── */}
      <header className="sticky top-0 z-40 border-b border-border-tertiary bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6">
          <a href="#hero" className="flex items-center gap-2">
            <Image src="/images/ddki-logo.svg" alt="" width={28} height={28} className="size-7" />
            <span className="text-base font-semibold">DeepDiveKI</span>
          </a>
          <span className="text-xs font-semibold tracking-[0.14em] text-text-tertiary uppercase tabular-nums" aria-live="polite">
            {acc} / {TOTAL_MIN} min
          </span>
          <nav className="hidden items-center gap-4 text-xs font-semibold tracking-[0.14em] uppercase lg:flex" aria-label="Agenda">
            {AGENDA.slice(1).map((a) => (
              <a key={a.id} href={`#${a.id}`} className={cn("transition", current === a.id ? "text-primary-dark" : "text-text-secondary hover:text-text-primary")}>
                {a.nav}
              </a>
            ))}
          </nav>
          <div className="flex w-full flex-wrap items-center gap-3 sm:ml-auto sm:w-auto">
            <div className="flex rounded-full border border-border-secondary bg-white p-1" role="group" aria-label="Niveau">
              {NIVEAUS.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => changeNiveau(k)}
                  aria-pressed={niveau === k}
                  className={cn("rounded-full px-3 py-1.5 text-sm font-medium transition", niveau === k ? "bg-text-primary text-white" : "text-text-secondary hover:text-text-primary")}
                >
                  {NIVEAU[k].label}
                </button>
              ))}
            </div>
            <label className="relative">
              <span className="sr-only">Fach</span>
              <select
                value={fach}
                onChange={(e) => changeFach(e.target.value as Fach)}
                className="appearance-none rounded-full border border-border-secondary bg-white py-2 pr-9 pl-4 text-sm font-medium text-text-primary"
              >
                {(Object.keys(FAECHER) as Fach[]).map((f) => (
                  <option key={f} value={f}>
                    {FAECHER[f]}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-text-tertiary" />
            </label>
          </div>
        </div>
        <div className="h-[3px] bg-black/5">
          <div className="h-full bg-primary-dark transition-[width] duration-500" style={{ width: `${(acc / TOTAL_MIN) * 100}%` }} />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* ─── Hero ─── */}
        <section id="hero" className="py-16 sm:py-24">
          <Kicker>{TOTAL_MIN} Minuten</Kicker>
          <p className="mt-4 text-sm font-semibold tracking-[0.2em] text-text-secondary uppercase">KI-Tools Deep Dive</p>
          <h1 className="mt-2 max-w-4xl text-5xl font-semibold tracking-tight text-text-primary sm:text-7xl">
            Das richtige Werkzeug für <em className="font-light text-primary-dark not-italic">diese</em> Aufgabe.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
            Wähle oben <strong className="text-text-primary">Einsteiger, Fortgeschritten oder Profi</strong>: Aufgaben, Prompts und die Quiz-Schmiede wechseln mit. Dort stellst du auch dein Fach ein; die Beispiele folgen.
          </p>
          <a href="#assistenten" className="mt-8 inline-flex rounded-full bg-text-primary px-6 py-3 text-base font-semibold text-white hover:bg-primary-darker">
            Zum ersten Block
          </a>
          <ol className="mt-12 grid grid-cols-2 gap-6 border-t border-border-secondary pt-8 sm:grid-cols-3 lg:grid-cols-6" aria-label="Zeitplan">
            {AGENDA.map((a) => (
              <li key={a.id}>
                <p className="text-3xl font-semibold tabular-nums">{a.min}</p>
                <p className="mt-1 text-sm text-text-secondary">{a.title}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ─── 01 Assistenten ─── */}
        <section id="assistenten" className="border-t border-border-tertiary py-16 sm:py-24">
          <ChapterHead time="01 · 30 Minuten" title="KI-Assistenten" claim="Ein leerer Chat vergisst. Dein Niveau ist eine andere Aufgabe, kein Extra-Schliff. Fachbeispiel, oder dein eigenes." />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {STUDIOS.map((s, i) => {
              const on = studio === s.id;
              const grads: (keyof typeof GRADIENTS)[] = ["aurora", "ocean", "purple", "spark"];
              const task = s.tasks[niveau];
              const ex = exampleFor(s.examples, fach);
              const prompt = studioPrompt(s.id, fach, niveau);
              return (
                <div key={s.id} className={cn(on && "md:col-span-2")}>
                  <button type="button" onClick={() => setStudio(on ? null : s.id)} aria-pressed={on} className="w-full text-left">
                    <GrainCard gradient={grads[i]} className={cn("h-full transition", on && "ring-4 ring-primary-dark/40")}>
                      <p className="text-xs font-semibold tracking-[0.18em] text-white/75 uppercase">{s.title}</p>
                      <h3 className="mt-2 text-2xl font-semibold">{s.claim}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-white/90">{s.text}</p>
                      <div className="mt-5 space-y-1 text-sm">
                        <p>
                          <span className="mr-2 font-semibold tracking-wider text-rose-200 uppercase">Risiko</span>
                          {s.risk}
                        </p>
                        <p>
                          <span className="mr-2 font-semibold tracking-wider text-white/70 uppercase">Grenze</span>
                          {s.limit}
                        </p>
                      </div>
                      <p className="mt-4 text-xs font-semibold tracking-[0.18em] text-white/70 uppercase">{on ? "Schließen" : "Öffnen · Aufgabe & Auftrag"}</p>
                    </GrainCard>
                  </button>
                  {on && (
                    <div className="mt-4 grid gap-5 rounded-3xl border border-border-tertiary bg-white p-5 shadow-sm sm:p-7 lg:grid-cols-[1fr_1fr]">
                      <div>
                        <Kicker>Aufgabe · {n.label}</Kicker>
                        <p className="mt-2 text-[15px] leading-relaxed text-text-primary">{task.lead}</p>
                        <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-text-secondary">
                          {task.steps.map((x) => (
                            <li key={x}>{x}</li>
                          ))}
                        </ol>
                        <div className="mt-5">
                          <CopyButton text={prompt} label="Auftrag kopieren" />
                        </div>
                      </div>
                      <div>
                        <Kicker>{ex?.via === "fach" ? `Beispiel · ${FAECHER[fach]}` : "Beispiel · jedes Fach"}</Kicker>
                        {ex && <p className="mt-2 rounded-2xl bg-primary-light/60 p-4 text-[15px] leading-relaxed text-text-primary">{ex.text}</p>}
                        <Kicker className="mt-5 text-rose-600">Risiken</Kicker>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] text-text-secondary">
                          {s.pitfalls.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                        <Kicker className="mt-5">Grenzen</Kicker>
                        <p className="mt-2 text-[15px] text-text-secondary">{s.where}</p>
                        <details className="mt-5 group">
                          <summary className="cursor-pointer text-sm font-semibold text-primary-dark">Was steht im Auftrag?</summary>
                          <div className="mt-3">
                            <PromptBox text={prompt} />
                          </div>
                        </details>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-8">
            <PhaseTimer mins={30} label="Arbeitsphase · Assistenten" />
          </div>
        </section>

        {/* ─── 02 Werkzeug ─── */}
        <section id="werkzeug" className="border-t border-border-tertiary py-16 sm:py-24">
          <ChapterHead
            time="02 · 5 Minuten"
            title="Welche Aufgabe, welches Werkzeug"
            claim={
              <>
                Die falsche Frage ist <em>welches Tool das beste ist</em>. Dieselbe Fachaufgabe, zwei Chatbots: Behalte den, den du wirklich nutzen würdest.
              </>
            }
          />
          <Kicker className="mt-10">Sechs Werkzeuge</Kicker>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {(Object.keys(TOOLS) as ToolId[]).map((id) => (
              <li key={id} className="rounded-2xl border border-border-tertiary bg-white p-4 text-center shadow-sm">
                <span className="mx-auto flex size-10 items-center justify-center rounded-xl text-base font-bold text-white" style={{ background: TOOLS[id].color }}>
                  {TOOLS[id].letter}
                </span>
                <p className="mt-3 font-semibold">{TOOLS[id].name}</p>
                <p className="mt-1 text-xs leading-snug text-text-secondary">{TOOLS[id].short}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <ol className="space-y-6 border-l-2 border-primary-light pl-6">
              {[
                ["Ziel", "Welches Ergebnis würdest du wirklich nutzen?", "Schreiben · analysieren · recherchieren · gestalten"],
                ["Eingabe", "Welches Tool nimmt, was du hast?", "Prompt · Dateien · lange Dokumente"],
                ["Belege", "Welches erfindet bei diesem Thema weniger?", "Ideen · Fakten · zitierte Quellen"],
                ["Rahmen", "Welches darfst du überhaupt nutzen?", "Microsoft · Google · Schülerdaten"],
              ].map(([t, q, s], i) => (
                <li key={t}>
                  <Kicker>
                    0{i + 1} · {t}
                  </Kicker>
                  <p className="mt-1 text-lg font-medium text-text-primary">{q}</p>
                  <p className="text-sm text-text-tertiary">{s}</p>
                </li>
              ))}
            </ol>
            <GrainCard gradient="purple">
              <p className="text-xs font-semibold tracking-[0.18em] text-white/75 uppercase">Interaktiv</p>
              <h3 className="mt-2 text-2xl font-semibold">Welcher Chatbot passt zu dir?</h3>
              <p className="mt-2 text-[15px] text-white/85">
                Eine Empfehlung für <em>deine</em> Arbeitsweise. Die Vergleichsaufgabe unten nutzt sie als eines der zwei Tools.
              </p>
              <Glass className="mt-5">
                {verdict ? (
                  <div>
                    <p className="text-xs font-semibold tracking-[0.18em] text-white/75 uppercase">Empfehlung</p>
                    <p className="mt-1 text-2xl font-semibold">{MATCH_RES[verdict.winner].name}</p>
                    <p className="mt-2 text-[15px] text-white/90">{MATCH_RES[verdict.winner].blurb}</p>
                    <p className="mt-2 text-[15px]">
                      <b>Plan B:</b> {verdict.runner ? MATCH_RES[verdict.runner].name : "AIS.chat oder dein Tenant-Tool"}
                    </p>
                    <p className="mt-2 text-xs text-white/70">Das ist eine Arbeitsweise, kein Gütesiegel. Die fachliche Prüfung bleibt bei dir.</p>
                    <button type="button" onClick={resetMatch} className="mt-4 rounded-full border border-white/40 px-4 py-2 text-sm font-medium hover:bg-white/15">
                      Zurücksetzen
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-1 gap-1">
                        {MATCH_Q.map((_, i) => (
                          <span key={i} className={cn("h-1.5 flex-1 rounded-full", i <= match.length ? "bg-white" : "bg-white/30")} />
                        ))}
                      </div>
                      <button type="button" onClick={resetMatch} className="text-xs font-semibold tracking-wider text-white/70 uppercase hover:text-white">
                        Reset
                      </button>
                    </div>
                    <p className="mt-4 font-semibold">
                      {match.length + 1} / {MATCH_Q.length}: {MATCH_Q[match.length].q}
                    </p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {MATCH_Q[match.length].opts.map((o) => (
                        <button key={o.t} type="button" onClick={() => pushMatch(o.k)} className="rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-left text-[15px] font-medium hover:bg-white/25">
                          {o.t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </Glass>
            </GrainCard>
          </div>

          <div className="mt-8">
            <Strip title={`Vergleich · ${n.label} · ${FAECHER[fach]}`}>
              <p>{cmpTask.lead}</p>
              <div className="grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
                <div className="rounded-xl bg-primary-light/60 px-4 py-3">
                  <p className="font-semibold text-text-primary">{pair.a.name}</p>
                  <p className="text-xs text-text-tertiary">{pair.a.via}</p>
                </div>
                <span className="text-center text-xl text-primary-dark">×</span>
                <div className={cn("rounded-xl px-4 py-3", pair.b ? "bg-primary-light/60" : "border border-dashed border-border-secondary")}>
                  <p className={cn("font-semibold", pair.b ? "text-text-primary" : "text-text-tertiary italic")}>{pair.b ? pair.b.name : "Dein Quiz-Ergebnis"}</p>
                  <p className="text-xs text-text-tertiary">{pair.b ? pair.b.via : "Erst das Interaktive abschließen"}</p>
                </div>
              </div>
              <ol className="list-decimal space-y-1 pl-5">
                {cmpTask.steps.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ol>
              <details>
                <summary className="cursor-pointer font-semibold text-primary-dark">Beispiel gefällig? Optional · {FAECHER[fach]}</summary>
                <div className="mt-3 space-y-3">
                  <div className="rounded-xl bg-background-secondary p-4">
                    <div className="flex items-center justify-between gap-3">
                      <Kicker>Optionaler Prompt</Kicker>
                      <CopyButton text={cmp.prompt} />
                    </div>
                    <p className="mt-2">{cmp.prompt}</p>
                  </div>
                  {niveau !== "einsteiger" && (
                    <div className="rounded-xl bg-background-secondary p-4">
                      <div className="flex items-center justify-between gap-3">
                        <Kicker>Optionale Falle</Kicker>
                        <CopyButton text={cmp.trap} />
                      </div>
                      <p className="mt-2">{cmp.trap}</p>
                    </div>
                  )}
                  <p className="italic">{cmp.look}</p>
                </div>
              </details>
            </Strip>
          </div>
        </section>
      </main>

      {/* ─── 03 Bezahlt (dunkel) ─── */}
      <section id="bezahlt" className="bg-[#0b0820] py-16 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ChapterHead dark time="03 · 5 Minuten" title="Bezahlt vs. Gratis?" claim="Zahlen ist keine Tugend. Limits um 7:40 Uhr sind eins. Schülerdaten sind eine andere Frage." />
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr_1.2fr]">
            {[
              { k: "Gratis", t: "Skizzen ohne Namen.", items: ["Brainstorm, Umschreiben, Quiz-Gerüst", "Eine Stundenskizze ohne Schülerdaten", "Ein zweites Gratis-Tool vor jedem Abo"] },
              { k: "Bezahlt", t: "Wenn es jeden Tag hakt.", items: ["Limits vor der ersten Stunde", "Lange Dateien oder geteilte Fachschafts-Workflows", "Schulrechnung, nie die private Karte"] },
            ].map((c) => (
              <div key={c.k} className="rounded-3xl border border-white/15 bg-white/5 p-6">
                <p className="text-xs font-semibold tracking-[0.18em] text-primary-base uppercase">{c.k}</p>
                <h3 className="mt-2 text-xl font-semibold">{c.t}</h3>
                <ul className="mt-4 divide-y divide-white/10 text-[15px] text-white/85">
                  {c.items.map((x) => (
                    <li key={x} className="py-2">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <GrainCard gradient="ocean">
              <p className="text-xs font-semibold tracking-[0.18em] text-white/75 uppercase">Interaktiv</p>
              <h3 className="mt-2 text-2xl font-semibold">Brauche ich bezahlt?</h3>
              <Glass className="mt-4">
                {paid.length >= PAID_Q.length ? (
                  (() => {
                    const v = paidVerdict(paid);
                    return (
                      <div>
                        <p className="text-xl font-semibold">{v.title}</p>
                        <p className="mt-2 text-[15px] text-white/90">{v.text}</p>
                        <button type="button" onClick={resetPaid} className="mt-4 rounded-full border border-white/40 px-4 py-2 text-sm font-medium hover:bg-white/15">
                          Noch mal
                        </button>
                      </div>
                    );
                  })()
                ) : (
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-white/70 uppercase">
                      {paid.length + 1} / {PAID_Q.length}
                    </p>
                    <p className="mt-2 font-semibold">{PAID_Q[paid.length].q}</p>
                    <div className="mt-3 grid gap-2">
                      {PAID_Q[paid.length].opts.map((o) => (
                        <button key={o.t} type="button" onClick={() => pushPaid(o.v)} className="rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-[15px] font-medium hover:bg-white/25">
                          {o.t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </Glass>
            </GrainCard>
          </div>
          <p className="mt-8 text-lg font-semibold">Eine Lizenz ist keine Erlaubnis, Schülerdaten zu verarbeiten.</p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* ─── 04 Fachschaften ─── */}
        <section id="fachgruppen" className="py-16 sm:py-24">
          <ChapterHead time="04 · 30 Minuten" title="Fachschafts-Studio" claim="Fünf Arbeitsstationen, eine Fachschaft. Nicht „KI ausprobieren“. Mit Material rausgehen, das am Montag hält." />
          <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-text-secondary">
            Zu zweit oder als Fachschaft arbeiten. Das Fach oben wählen; die Beispiele folgen. <strong className="text-text-primary">1–2 Stationen wählen, nicht alle fünf.</strong> Jede hat einen kopierbaren Auftrag, Stolperfallen und eine Aufgabe, die sich mit deinem Niveau öffnet. Einsteiger bleibt knapp; Fortgeschritten und Profi ergänzen Extras, wenn noch Zeit ist. Nach 30 Minuten: ein Artefakt (Prompt, Arbeitsblatt, Feedback-Rubrik oder Bildserie).
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {STATIONS.map((x) => (
              <button
                key={x.id}
                type="button"
                onClick={() => setStation(x.id)}
                className={cn("rounded-full px-4 py-2 text-sm font-semibold transition", x.id === station ? "bg-text-primary text-white" : "border border-border-secondary bg-white text-text-primary hover:bg-primary-light")}
              >
                {x.title}
              </button>
            ))}
          </div>
          <div className="mt-5 grid gap-6 rounded-3xl border border-border-tertiary bg-white p-5 shadow-sm sm:p-7 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h3 className="text-2xl font-semibold">
                {st.title} · {FAECHER[fach]}
              </h3>
              <p className="mt-2 text-sm font-semibold text-primary-dark">
                Modus {n.label}: {n.flag}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">{st.lead}</p>
              {stExample && (
                <div className="mt-4 rounded-2xl bg-primary-light/60 p-4">
                  <Kicker>{stExample.via === "fach" ? `Beispiel · ${FAECHER[fach]}` : "Beispiel · jedes Fach"}</Kicker>
                  <p className="mt-2 text-[15px] leading-relaxed text-text-primary">{stExample.text}</p>
                </div>
              )}
              <p className="mt-5 font-semibold">Stolperfallen</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] text-text-secondary">
                {st.pitfalls.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <PromptBox text={stPrompt} />
          </div>
          <div className="mt-6 space-y-4">
            <Strip title={`Aufgabe · ${st.title} · ${n.label}`}>
              <p>{stTask.core}</p>
              {stTask.extras.length > 0 && (
                <>
                  <Kicker>Wenn noch Zeit ist</Kicker>
                  <ol className="list-decimal space-y-1 pl-5">
                    {stTask.extras.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ol>
                </>
              )}
            </Strip>
            <PhaseTimer mins={30} label="Arbeitsphase · Fachschaften" />
          </div>
        </section>

        {/* ─── 05 Quizze ─── */}
        <section id="quizze" className="border-t border-border-tertiary py-16 sm:py-24">
          <ChapterHead time="05 · 5 Minuten" title="Quizze, aber schnell" claim="Ein gutes Quiz ist kein Fragenhagel. Es ist Lernziel, Diagnose, Tempo. Die KI liefert die Rohmasse. Du entscheidest, was zählt." />
          <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-text-secondary">
            <strong className="text-text-primary">Eine Kette, die hält:</strong> Assistent erzeugt Items, du streichst Unsinn und Dubletten, das Zieltool importiert. Nicht im Chat „spielen“, was Kahoot längst besser kann. Und nie einen Klassensatz mit echten Namen hochladen, um zu „personalisieren“.
          </p>
          <QuizForge fach={fach} niveau={niveau} />
          <div className="mt-6">
            <Strip title="In den 5 Minuten">
              <p>{FORGE_STRIPS[niveau]}</p>
            </Strip>
          </div>
        </section>

        {/* ─── Coda ─── */}
        <section id="coda" className="border-t border-border-tertiary py-16 sm:py-24">
          <h2 className="text-4xl font-semibold tracking-tight">Was bleiben soll</h2>
          <ol className="mt-6 list-decimal space-y-3 pl-6 text-xl text-text-secondary">
            <li>Die KI wählen, die zur Aufgabe und zu dir passt.</li>
            <li>Ein Standard-Chatbot, ein Plan B. Den Auftrag einmal speichern, nicht neu tippen.</li>
            <li>Bezahlt kauft Tempo und geteilte Workflows. Es lizenziert nie Schülerdaten.</li>
            <li>Die KI entwirft. Du streichst und verantwortest.</li>
          </ol>
          <h2 className="mt-14 text-4xl font-semibold tracking-tight">So eine Seite selbst bauen</h2>
          <ol className="mt-6 list-decimal space-y-3 pl-6 text-xl text-text-secondary">
            <li>Cursor, Codex oder Claude Code: „Baue eine Einseiten-Website zu [dein Thema]. Statisches HTML. Kein Login, kein Server.“</li>
            <li>
              <a href="https://app.netlify.com" target="_blank" rel="noopener noreferrer" className="text-primary-dark underline">
                netlify.com
              </a>{" "}
              öffnen und anmelden (kostenlos; Google reicht).
            </li>
            <li>Add new site → Deploy manually. Den Ordner reinziehen, den der Agent gebaut hat. Du bekommst eine URL.</li>
          </ol>
          <p className="mt-6 max-w-xl text-sm text-text-tertiary">Du beschreibst. Das Tool schreibt die Dateien. Netlify hostet sie. Die Vorlage dieser Seite ist genau so entstanden.</p>
        </section>
      </main>

      <footer className="border-t border-border-secondary py-8 text-sm text-text-tertiary">
        <div className="mx-auto max-w-6xl space-y-1 px-4 sm:px-6">
          <p>KI-Tools Deep Dive · Das richtige Werkzeug für diese Aufgabe · {TOTAL_MIN} Minuten · DeepDiveKI</p>
          <p>Gebaut als interaktive Fortbildungsoberfläche. Inhalt ist pädagogischer Rat, keine Beschaffungsrichtlinie.</p>
        </div>
      </footer>
    </div>
  );
}

/* ─── Quiz-Schmiede ─── */

function QuizForge({ fach, niveau }: { fach: Fach; niveau: Niveau }) {
  const n = NIVEAU[niveau];
  const [tool, setTool] = useState<QuizToolId>("kahoot");
  const [thema, setThema] = useState("");
  const [info, setInfo] = useState("");
  const [count, setCount] = useState<number>(n.quizDefault);
  const [out, setOut] = useState<{ prompt: string; tool: QuizToolId } | null>(null);

  useEffect(() => {
    setTool(readLS<QuizToolId>(LS.tool, "kahoot"));
    setThema(readLS<string>(LS.thema, ""));
    setInfo(readLS<string>(LS.info, ""));
    const c = readLS<number>(LS.count, 0);
    setCount(c && ![4, 6, 8].includes(c) ? c : n.quizDefault);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setCount((c) => ([4, 6, 8].includes(c) || !c ? n.quizDefault : c));
  }, [n.quizDefault]);

  const build = (e: React.FormEvent) => {
    e.preventDefault();
    const t = thema.trim() || FACH_THEMEN[fach];
    const c = Math.min(50, Math.max(1, count || n.quizDefault));
    setCount(c);
    writeLS(LS.thema, thema);
    writeLS(LS.tool, tool);
    writeLS(LS.info, info);
    writeLS(LS.count, c);
    setOut({ prompt: quizPrompt(t, tool, info.trim(), c, fach, niveau), tool });
  };

  const field = "w-full rounded-xl border border-border-secondary bg-white px-4 py-3 text-[15px] text-text-primary";
  return (
    <div className="mt-8 rounded-3xl border border-border-tertiary bg-white p-5 shadow-sm sm:p-7">
      <Kicker>Mini-Formular · nutzt Fach und Niveau von oben</Kicker>
      <h3 className="mt-2 text-2xl font-semibold">Quiz-Schmiede</h3>
      <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-text-secondary">
        Tool wählen, Thema und Zusatzangaben eintragen. Du bekommst einen Prompt: eine Datei im richtigen Format plus Import-Schritte für genau dieses Tool. Prompt in deinen Assistenten, Datei prüfen, dann importieren.
      </p>
      <p className="mt-3 text-sm font-semibold text-primary-dark">
        Prompt-Modus {n.label}: {n.flag}
      </p>
      <form onSubmit={build} className="mt-5 grid gap-4 sm:grid-cols-[1fr_140px_auto]">
        <label className="text-xs font-semibold tracking-[0.14em] text-text-secondary uppercase">
          Tool
          <select value={tool} onChange={(e) => setTool(e.target.value as QuizToolId)} className={cn(field, "mt-1 normal-case tracking-normal")}>
            {(Object.keys(QUIZ_TOOLS) as QuizToolId[]).map((id) => (
              <option key={id} value={id}>
                {QUIZ_TOOLS[id].label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-semibold tracking-[0.14em] text-text-secondary uppercase">
          Anzahl
          <input type="number" min={1} max={50} value={count} onChange={(e) => setCount(parseInt(e.target.value, 10) || 0)} className={cn(field, "mt-1 tracking-normal")} />
        </label>
        <button type="submit" className="self-end rounded-xl bg-primary-dark px-5 py-3 text-[15px] font-semibold text-white hover:bg-primary-darker">
          Prompt bauen
        </button>
        <label className="text-xs font-semibold tracking-[0.14em] text-text-secondary uppercase sm:col-span-3">
          Thema
          <input value={thema} onChange={(e) => setThema(e.target.value)} placeholder={FACH_THEMEN[fach]} className={cn(field, "mt-1 normal-case tracking-normal")} />
        </label>
        <label className="text-xs font-semibold tracking-[0.14em] text-text-secondary uppercase sm:col-span-3">
          Zusatzangaben
          <textarea
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            rows={3}
            placeholder="Lernziel, Klassenstufe, Fehlermuster, was die KI vermeiden soll, Pflichtvokabular …"
            className={cn(field, "mt-1 normal-case tracking-normal")}
          />
        </label>
      </form>
      {out && (
        <div className="mt-6 space-y-4">
          <PromptBox text={out.prompt} label="Quiz-Prompt" />
          <aside className="rounded-2xl bg-background-secondary p-5">
            <h4 className="font-semibold">Import in {QUIZ_TOOLS[out.tool].label}</h4>
            <p className="mt-1 text-sm text-text-tertiary">Steht auch im Prompt. Nachdem du die Datei geprüft hast:</p>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-[15px] text-text-secondary">
              {QUIZ_TOOLS[out.tool].import.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </aside>
          <p className="text-sm text-text-tertiary">Items vor dem Import prüfen. Keine Noten aus diesem Lauf, keine echten Namen im Chat.</p>
        </div>
      )}
    </div>
  );
}
