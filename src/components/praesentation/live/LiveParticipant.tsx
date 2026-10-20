"use client";

import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, Check } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { LiveActivity, QuizTypeKey } from "./activities";
import { postLive, useClientId, useLiveState } from "./useLive";

/**
 * Teilnehmer-Seite fürs Handy. Zeigt genau die Aktivität, die auf der Bühne
 * gerade aktiv ist, und sendet Antworten an die Live-API.
 */
export default function LiveParticipant({
  deck,
  title,
  activities,
}: {
  deck: string;
  title: string;
  activities: LiveActivity[];
}) {
  const clientId = useClientId();
  const { state, error } = useLiveState(deck, 3000);
  const current = activities.find((a) => a.id === state.current) ?? null;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pt-6 pb-16 font-inter">
      <header className="flex items-center gap-3">
        <Image src="/images/ddki-logo.svg" alt="" width={32} height={32} className="size-8" />
        <div>
          <p className="text-base font-semibold text-text-primary">DeepDiveKI</p>
          <p className="text-xs text-text-tertiary">{title} · Mitmachen</p>
        </div>
      </header>

      <div className="mt-8 flex-1">
        {error && (
          <p className="mb-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Verbindung hakt gerade. Wir versuchen es automatisch weiter.
          </p>
        )}
        {!current ? (
          <Waiting />
        ) : (
          <Activity key={current.id} deck={deck} clientId={clientId} activity={current} />
        )}
      </div>

      <p className="mt-10 text-center text-xs text-text-tertiary">
        Anonym. Es werden keine Namen oder Geräte gespeichert.
      </p>
    </main>
  );
}

function Waiting() {
  return (
    <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary-light">
        <span className="size-3 animate-pulse rounded-full bg-primary-dark" />
      </span>
      <h1 className="mt-5 text-xl font-semibold text-text-primary">Gleich geht es los.</h1>
      <p className="mt-2 text-sm text-text-secondary">
        Lass die Seite offen. Sobald auf der Bühne eine Frage kommt, erscheint sie hier.
      </p>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-3xl bg-white p-6 shadow-sm">{children}</div>;
}

function Button({
  children,
  onClick,
  disabled,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "ghost";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full rounded-xl px-4 py-3 text-base font-medium transition disabled:opacity-40",
        variant === "primary"
          ? "bg-text-primary text-white hover:bg-primary-darker"
          : "border border-border-secondary bg-white text-text-primary hover:bg-background-secondary",
      )}
    >
      {children}
    </button>
  );
}

function Done({ text, onAgain }: { text: string; onAgain: () => void }) {
  return (
    <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
      <span className="flex items-center gap-2">
        <Check className="size-4" /> {text}
      </span>
      <button type="button" onClick={onAgain} className="underline underline-offset-2">
        Ändern
      </button>
    </div>
  );
}

function Activity({
  deck,
  clientId,
  activity,
}: {
  deck: string;
  clientId: string;
  activity: LiveActivity;
}) {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const submit = async (value: unknown) => {
    if (!clientId) return;
    setBusy(true);
    try {
      await postLive(deck, { action: "vote", activity: activity.id, clientId, value });
      setDone(true);
    } finally {
      setBusy(false);
    }
  };

  switch (activity.type) {
    case "words":
      return <Words activity={activity} done={done} busy={busy} submit={submit} again={() => setDone(false)} />;
    case "poll":
      return <Poll activity={activity} done={done} busy={busy} submit={submit} again={() => setDone(false)} />;
    case "ranking":
      return <Ranking activity={activity} done={done} busy={busy} submit={submit} again={() => setDone(false)} />;
    case "quiz":
      return <Quiz activity={activity} done={done} submit={submit} again={() => setDone(false)} />;
    case "estimate":
      return <Estimate activity={activity} done={done} busy={busy} submit={submit} again={() => setDone(false)} />;
    case "judge":
      return <Judge activity={activity} done={done} busy={busy} submit={submit} again={() => setDone(false)} />;
  }
}

type Common<A> = {
  activity: A;
  done: boolean;
  busy?: boolean;
  submit: (v: unknown) => Promise<void>;
  again: () => void;
};

function Words({ activity, done, busy, submit, again }: Common<Extract<LiveActivity, { type: "words" }>>) {
  const [text, setText] = useState("");
  const max = activity.maxChars ?? 30;
  return (
    <Card>
      <p className="text-xs font-semibold tracking-[0.14em] text-primary-dark uppercase">{activity.title}</p>
      <h1 className="mt-2 text-xl font-semibold text-text-primary">{activity.prompt}</h1>
      <form
        className="mt-5 flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          const v = text.trim();
          if (v) void submit(v);
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, max))}
          placeholder="Dein Begriff"
          className="rounded-xl border border-border-secondary px-4 py-3 text-lg text-text-primary outline-none focus:border-primary-dark"
          autoComplete="off"
          enterKeyHint="send"
        />
        <Button disabled={busy || !text.trim()}>{done ? "Erneut senden" : "Senden"}</Button>
      </form>
      {done && <Done text="Gesendet. Schau auf die Leinwand." onAgain={again} />}
    </Card>
  );
}

function Poll({ activity, done, busy, submit, again }: Common<Extract<LiveActivity, { type: "poll" }>>) {
  const [choice, setChoice] = useState<number | null>(null);
  return (
    <Card>
      <p className="text-xs font-semibold tracking-[0.14em] text-primary-dark uppercase">{activity.title}</p>
      <h1 className="mt-2 text-xl font-semibold text-text-primary">{activity.question}</h1>
      <div className="mt-5 flex flex-col gap-2">
        {activity.options.map((opt, i) => (
          <button
            key={opt}
            type="button"
            disabled={busy || done}
            onClick={() => {
              setChoice(i);
              void submit(i);
            }}
            className={cn(
              "rounded-xl border px-4 py-3 text-left text-base transition",
              choice === i
                ? "border-primary-dark bg-primary-light text-primary-darker"
                : "border-border-secondary bg-white text-text-primary hover:bg-background-secondary",
            )}
          >
            {opt}
          </button>
        ))}
      </div>
      {done && <Done text="Danke, gezählt." onAgain={again} />}
    </Card>
  );
}

function Ranking({ activity, done, busy, submit, again }: Common<Extract<LiveActivity, { type: "ranking" }>>) {
  const [order, setOrder] = useState(() => activity.items.map((i) => i.key));
  const labels = useMemo(() => Object.fromEntries(activity.items.map((i) => [i.key, i.label])), [activity]);
  const move = (idx: number, dir: -1 | 1) => {
    setOrder((o) => {
      const j = idx + dir;
      if (j < 0 || j >= o.length) return o;
      const n = [...o];
      [n[idx], n[j]] = [n[j], n[idx]];
      return n;
    });
  };
  return (
    <Card>
      <p className="text-xs font-semibold tracking-[0.14em] text-primary-dark uppercase">{activity.title}</p>
      <h1 className="mt-2 text-xl font-semibold text-text-primary">{activity.question}</h1>
      <ol className="mt-5 flex flex-col gap-2">
        {order.map((key, i) => (
          <li key={key} className="flex items-center gap-3 rounded-xl border border-border-secondary bg-white px-3 py-2">
            <span className="w-6 text-center text-sm font-semibold text-primary-dark tabular-nums">{i + 1}</span>
            <span className="flex-1 text-sm text-text-primary">{labels[key]}</span>
            <button type="button" aria-label="nach oben" disabled={done || i === 0} onClick={() => move(i, -1)} className="rounded-lg p-2 text-text-secondary hover:bg-background-secondary disabled:opacity-30">
              <ArrowUp className="size-4" />
            </button>
            <button type="button" aria-label="nach unten" disabled={done || i === order.length - 1} onClick={() => move(i, 1)} className="rounded-lg p-2 text-text-secondary hover:bg-background-secondary disabled:opacity-30">
              <ArrowDown className="size-4" />
            </button>
          </li>
        ))}
      </ol>
      <div className="mt-5">
        <Button disabled={busy || done} onClick={() => void submit(order)}>
          Ranking absenden
        </Button>
      </div>
      {done && <Done text="Dein Ranking ist drin." onAgain={again} />}
    </Card>
  );
}

function Quiz({ activity, done, submit, again }: Common<Extract<LiveActivity, { type: "quiz" }>>) {
  const [answers, setAnswers] = useState<QuizTypeKey[]>([]);
  const idx = answers.length;
  const finished = idx >= activity.questions.length;
  const result = useMemo<QuizTypeKey | null>(() => {
    if (!finished) return null;
    const counts: Record<string, number> = {};
    for (const a of answers) counts[a] = (counts[a] ?? 0) + 1;
    return (Object.keys(activity.types) as QuizTypeKey[]).reduce((best, k) =>
      (counts[k] ?? 0) > (counts[best] ?? 0) ? k : best,
    );
  }, [answers, finished, activity.types]);

  useEffect(() => {
    if (result && !done) void submit(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  if (finished && result) {
    const t = activity.types[result];
    return (
      <Card>
        <p className="text-xs font-semibold tracking-[0.14em] text-primary-dark uppercase">Dein KI-Typ</p>
        <h1 className="mt-2 text-3xl font-semibold text-text-primary">{t.name}</h1>
        <p className="mt-1 text-base font-medium text-primary-dark">{t.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-text-secondary">{t.description}</p>
        {done && (
          <Done
            text="Auf der Leinwand siehst du die Verteilung."
            onAgain={() => {
              setAnswers([]);
              again();
            }}
          />
        )}
      </Card>
    );
  }

  const q = activity.questions[idx];
  return (
    <Card>
      <p className="text-xs font-semibold tracking-[0.14em] text-primary-dark uppercase">
        {activity.title} · {idx + 1} / {activity.questions.length}
      </p>
      {idx === 0 && <p className="mt-2 text-sm text-text-secondary">{activity.intro}</p>}
      <h1 className="mt-3 text-xl font-semibold text-text-primary">{q.q}</h1>
      <div className="mt-5 flex flex-col gap-2">
        {q.options.map((o) => (
          <button
            key={o.text}
            type="button"
            onClick={() => setAnswers((a) => [...a, o.type])}
            className="rounded-xl border border-border-secondary bg-white px-4 py-3 text-left text-base text-text-primary transition hover:bg-background-secondary"
          >
            {o.text}
          </button>
        ))}
      </div>
    </Card>
  );
}

function Estimate({ activity, done, busy, submit, again }: Common<Extract<LiveActivity, { type: "estimate" }>>) {
  const [value, setValue] = useState(50);
  return (
    <Card>
      <p className="text-xs font-semibold tracking-[0.14em] text-primary-dark uppercase">{activity.title}</p>
      <h1 className="mt-2 text-xl font-semibold text-text-primary">{activity.question}</h1>
      <p className="mt-6 text-center text-6xl font-semibold text-primary-darker tabular-nums">
        {value}
        <span className="ml-1 text-3xl text-text-tertiary">{activity.unit}</span>
      </p>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        disabled={done}
        onChange={(e) => setValue(Number(e.target.value))}
        className="mt-4 w-full accent-primary-dark"
        aria-label="Schätzung"
      />
      <div className="mt-1 flex justify-between text-xs text-text-tertiary">
        <span>0 {activity.unit}</span>
        <span>100 {activity.unit}</span>
      </div>
      <div className="mt-5">
        <Button disabled={busy || done} onClick={() => void submit(value)}>
          Schätzung absenden
        </Button>
      </div>
      {done && <Done text="Danke. Die Auflösung kommt auf der Leinwand." onAgain={again} />}
    </Card>
  );
}

function Judge({ activity, done, busy, submit, again }: Common<Extract<LiveActivity, { type: "judge" }>>) {
  const [answers, setAnswers] = useState<number[]>([]);
  const idx = answers.length;
  const finished = idx >= activity.scenarios.length;
  const tone = activity.neutral
    ? ["bg-violet-100 text-violet-900 border-violet-300", "bg-sky-100 text-sky-900 border-sky-300", "bg-pink-100 text-pink-900 border-pink-300"]
    : ["bg-emerald-100 text-emerald-900 border-emerald-300", "bg-amber-100 text-amber-900 border-amber-300", "bg-rose-100 text-rose-900 border-rose-300"];

  useEffect(() => {
    if (finished && !done && !busy) void submit(answers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  if (finished) {
    return (
      <Card>
        <p className="text-xs font-semibold tracking-[0.14em] text-primary-dark uppercase">{activity.title}</p>
        <h1 className="mt-2 text-xl font-semibold text-text-primary">Ihre drei Urteile</h1>
        <ol className="mt-4 space-y-3">
          {activity.scenarios.map((sc, i) => (
            <li key={i} className="rounded-xl border border-border-tertiary bg-background-secondary p-3 text-sm">
              <p className="text-text-secondary">{sc.text}</p>
              <span className={cn("mt-2 inline-block rounded-full border px-3 py-1 text-xs font-semibold", tone[answers[i]])}>
                {activity.options[answers[i]]}
              </span>
            </li>
          ))}
        </ol>
        {done && (
          <Done
            text="Gezählt. Die Auflösung kommt auf der Leinwand."
            onAgain={() => {
              setAnswers([]);
              again();
            }}
          />
        )}
      </Card>
    );
  }

  const sc = activity.scenarios[idx];
  return (
    <Card>
      <p className="text-xs font-semibold tracking-[0.14em] text-primary-dark uppercase">
        {activity.title} · {idx + 1} / {activity.scenarios.length}
      </p>
      {idx === 0 && <p className="mt-2 text-sm text-text-secondary">{activity.intro}</p>}
      <h1 className="mt-3 text-lg leading-snug font-semibold text-text-primary">{sc.text}</h1>
      <div className="mt-5 flex flex-col gap-2">
        {activity.options.map((o, i) => (
          <button
            key={o}
            type="button"
            onClick={() => setAnswers((a) => [...a, i])}
            className={cn("rounded-xl border px-4 py-3 text-left text-base font-medium transition", tone[i])}
          >
            {o}
          </button>
        ))}
      </div>
    </Card>
  );
}
