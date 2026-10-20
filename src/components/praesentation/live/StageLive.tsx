"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Eyebrow, GreenDot, Headline, QrCode, Reveal, SlideFrame, Brand, StageGlassPanel, StageGrainCard, Stagger } from "../blocks";
import { useInstant } from "../motion";
import type { SlideProps } from "../types";
import type { LiveActivity, QuizTypeKey } from "./activities";
import { useStageActivity } from "./useLive";

/**
 * Bühnenfolien für Live-Aktivitäten. Zweispalten-Muster der Keynote:
 * links die Mitmach-Karte mit QR-Code, rechts die Live-Auswertung.
 */

function useLiveUrl(deck: string) {
  const [url, setUrl] = useState(`https://www.deepdive-ki.de/praesentation/${deck}/live`);
  useEffect(() => {
    setUrl(`${window.location.origin}/praesentation/${deck}/live`);
  }, [deck]);
  return url;
}

function JoinCard({
  deck,
  count,
  label,
  active,
  gradient = "purple",
  compact = false,
}: {
  deck: string;
  count: number;
  label: string;
  active: boolean;
  gradient?: "purple" | "aurora" | "ocean";
  compact?: boolean;
}) {
  const url = useLiveUrl(deck);
  const shortUrl = url.replace(/^https?:\/\/(www\.)?/, "");
  return (
    <Stagger index={0} active={active}>
      <StageGrainCard gradient={gradient} className="h-[780px]">
        <StageGlassPanel>
          <div className="flex items-start gap-3">
            <GreenDot />
            <p className="text-[24px] leading-snug font-medium text-white">{label}</p>
          </div>
        </StageGlassPanel>
        <div className="mt-6 flex flex-1 items-center justify-center">
          <QrCode value={url} size={compact ? 320 : 380} />
        </div>
        <p className="mt-4 truncate text-center text-[20px] text-white/85">{shortUrl}</p>
        <StageGlassPanel className="mt-4 flex items-center justify-between py-4">
          <span className="text-[22px] text-white/80">Antworten</span>
          <span className="text-[40px] font-semibold text-white tabular-nums">{count}</span>
        </StageGlassPanel>
      </StageGrainCard>
    </Stagger>
  );
}

function ResetButton({ onReset }: { onReset: () => void }) {
  const [armed, setArmed] = useState(false);
  return (
    <button
      type="button"
      data-interactive
      onClick={() => {
        if (armed) {
          onReset();
          setArmed(false);
        } else {
          setArmed(true);
          window.setTimeout(() => setArmed(false), 3000);
        }
      }}
      className={cn(
        "mt-auto w-fit rounded-full border px-5 py-2 text-[18px] transition",
        armed
          ? "border-rose-400 bg-rose-50 text-rose-700"
          : "border-border-secondary text-text-tertiary hover:text-text-secondary",
      )}
    >
      {armed ? "Wirklich alle Antworten löschen?" : "Antworten zurücksetzen"}
    </button>
  );
}

type LiveSlideProps = SlideProps & { deck: string };

/* ─── Wortwolke ─── */

export function LiveWordsSlide({
  deck,
  activity,
  active,
  eyebrow,
  title,
}: LiveSlideProps & { activity: Extract<LiveActivity, { type: "words" }>; eyebrow: string; title: string }) {
  const { values, reset } = useStageActivity<string>(deck, activity.id, active);
  const counts = new Map<string, { label: string; n: number }>();
  for (const v of values) {
    if (typeof v !== "string") continue;
    const key = v.trim().toLowerCase();
    if (!key) continue;
    const e = counts.get(key);
    if (e) e.n += 1;
    else counts.set(key, { label: v.trim(), n: 1 });
  }
  const words = Array.from(counts.values()).sort((a, b) => b.n - a.n || a.label.localeCompare(b.label)).slice(0, 40);
  const max = words[0]?.n ?? 1;

  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="grid h-full grid-cols-[640px_1fr] items-center gap-20 px-20 pt-28 pb-20">
        <JoinCard deck={deck} count={values.length} label={activity.prompt} active={active} />
        <div className="flex h-[780px] flex-col">
          <Stagger index={1} active={active}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <Headline size="md" className="mt-6">
              {title}
            </Headline>
          </Stagger>
          <div className="mt-10 flex flex-1 flex-wrap content-start gap-4">
            {words.length === 0 && (
              <p className="text-[28px] text-text-tertiary">Die ersten Begriffe erscheinen hier.</p>
            )}
            {words.map((w) => {
              const size = 24 + Math.round((w.n / max) * 40);
              return (
                <motion.span
                  key={w.label.toLowerCase()}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={cn(
                    "rounded-full border px-6 py-2 leading-none font-medium",
                    w.n > 1
                      ? "border-primary-dark bg-primary-light text-primary-darker"
                      : "border-border-tertiary bg-white text-text-primary",
                  )}
                  style={{ fontSize: size }}
                >
                  {w.label}
                  {w.n > 1 && <span className="ml-2 text-[0.6em] text-primary-dark">×{w.n}</span>}
                </motion.span>
              );
            })}
          </div>
          <ResetButton onReset={() => void reset()} />
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── Umfrage ─── */

export function LivePollSlide({
  deck,
  activity,
  active,
  eyebrow,
}: LiveSlideProps & { activity: Extract<LiveActivity, { type: "poll" }>; eyebrow: string }) {
  const { values, reset } = useStageActivity<number>(deck, activity.id, active);
  const instant = useInstant();
  const counts = activity.options.map((_, i) => values.filter((v) => v === i).length);
  const total = values.length;
  const max = Math.max(1, ...counts);

  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="grid h-full grid-cols-[640px_1fr] items-center gap-20 px-20 pt-28 pb-20">
        <JoinCard deck={deck} count={total} label={activity.question} active={active} gradient="aurora" />
        <div className="flex h-[780px] flex-col">
          <Stagger index={1} active={active}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <Headline size="md" className="mt-6">
              {activity.question}
            </Headline>
          </Stagger>
          <ul className="mt-12 space-y-6">
            {activity.options.map((opt, i) => {
              const pct = total ? Math.round((counts[i] / total) * 100) : 0;
              return (
                <li key={opt}>
                  <div className="flex items-baseline justify-between text-[30px]">
                    <span className="font-medium text-text-primary">{opt}</span>
                    <span className="text-text-secondary tabular-nums">
                      {pct} %<span className="ml-3 text-[22px] text-text-tertiary">{counts[i]}</span>
                    </span>
                  </div>
                  <div className="mt-2 h-6 overflow-hidden rounded-full bg-black/5">
                    <motion.div
                      className="h-full rounded-full bg-primary-dark"
                      animate={{ width: `${(counts[i] / max) * 100}%` }}
                      transition={{ duration: instant ? 0 : 0.5 }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
          <ResetButton onReset={() => void reset()} />
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── Ranking (Publikum vs. Studie) ─── */

export function LiveRankingSlide({
  deck,
  activity,
  active,
  step,
  eyebrow,
}: LiveSlideProps & { activity: Extract<LiveActivity, { type: "ranking" }>; eyebrow: string }) {
  const { values, reset } = useStageActivity<string[]>(deck, activity.id, active);
  const valid = values.filter((v) => Array.isArray(v));
  const avg = activity.items.map((item) => {
    const positions = valid.map((o) => o.indexOf(item.key)).filter((p) => p >= 0);
    const mean = positions.length ? positions.reduce((a, b) => a + b, 0) / positions.length + 1 : null;
    return { ...item, mean };
  });
  const crowd = [...avg].sort((a, b) => (a.mean ?? 99) - (b.mean ?? 99));
  const truth = [...activity.items].sort((a, b) => b.value - a.value);

  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="grid h-full grid-cols-[520px_1fr] items-center gap-16 px-20 pt-28 pb-20">
        <JoinCard deck={deck} count={valid.length} label={activity.question} active={active} gradient="ocean" compact />
        <div className="flex h-[780px] flex-col">
          <Stagger index={1} active={active}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <Headline size="md" className="mt-6">
              Wofür nutzen Menschen ChatGPT?
            </Headline>
          </Stagger>
          <div className="mt-10 grid grid-cols-2 gap-10">
            <div>
              <p className="text-[20px] font-semibold tracking-[0.14em] text-text-tertiary uppercase">
                Das Publikum
              </p>
              <ol className="mt-4 space-y-3">
                {crowd.map((item, i) => (
                  <li
                    key={item.key}
                    className="flex items-center gap-4 rounded-2xl border border-border-tertiary bg-white px-5 py-3 text-[24px]"
                  >
                    <span className="w-8 font-semibold text-primary-dark tabular-nums">{i + 1}</span>
                    <span className="flex-1 leading-tight text-text-primary">{item.label}</span>
                    {item.mean && (
                      <span className="text-[18px] text-text-tertiary tabular-nums">Ø {item.mean.toFixed(1)}</span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
            <Reveal when={1} step={step}>
              <p className="text-[20px] font-semibold tracking-[0.14em] text-text-tertiary uppercase">
                Die Studie
              </p>
              <ol className="mt-4 space-y-3">
                {truth.map((item, i) => {
                  const hit = crowd[i]?.key === item.key && crowd[i]?.mean !== null;
                  return (
                    <li
                      key={item.key}
                      className={cn(
                        "flex items-center gap-4 rounded-2xl border px-5 py-3 text-[24px]",
                        hit ? "border-emerald-400 bg-emerald-50" : "border-primary-dark bg-primary-light",
                      )}
                    >
                      <span className="w-8 font-semibold text-primary-darker tabular-nums">{i + 1}</span>
                      <span className="flex-1 leading-tight text-text-primary">{item.label}</span>
                      <span className="text-[20px] font-medium text-primary-darker tabular-nums">
                        {item.value.toLocaleString("de-DE")} %
                      </span>
                    </li>
                  );
                })}
              </ol>
              <p className="mt-4 text-[17px] leading-snug text-text-tertiary">{activity.source}</p>
            </Reveal>
          </div>
          <ResetButton onReset={() => void reset()} />
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── Quiz: Welcher KI-Typ bist du? ─── */

export function LiveQuizSlide({
  deck,
  activity,
  active,
  eyebrow,
}: LiveSlideProps & { activity: Extract<LiveActivity, { type: "quiz" }>; eyebrow: string }) {
  const { values, reset } = useStageActivity<QuizTypeKey>(deck, activity.id, active);
  const instant = useInstant();
  const keys = Object.keys(activity.types) as QuizTypeKey[];
  const counts = keys.map((k) => values.filter((v) => v === k).length);
  const total = values.length;
  const max = Math.max(1, ...counts);
  const gradients = ["purple", "aurora", "ocean", "purple"] as const;

  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="grid h-full grid-cols-[520px_1fr] items-center gap-16 px-20 pt-28 pb-20">
        <JoinCard deck={deck} count={total} label="Fünf Fragen. Am Ende kennst du deinen KI-Typ." active={active} compact />
        <div className="flex h-[780px] flex-col">
          <Stagger index={1} active={active}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <Headline size="md" className="mt-6">
              {activity.title}
            </Headline>
          </Stagger>
          <div className="mt-10 grid grid-cols-2 gap-6">
            {keys.map((k, i) => {
              const t = activity.types[k];
              const pct = total ? Math.round((counts[i] / total) * 100) : 0;
              return (
                <StageGrainCard key={k} gradient={gradients[i]} className="p-7">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-[34px] font-semibold text-white">{t.name}</h3>
                    <span className="text-[40px] font-semibold text-white tabular-nums">{pct} %</span>
                  </div>
                  <p className="mt-1 text-[20px] text-white/80">{t.tagline}</p>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/25">
                    <motion.div
                      className="h-full rounded-full bg-white"
                      animate={{ width: `${(counts[i] / max) * 100}%` }}
                      transition={{ duration: instant ? 0 : 0.5 }}
                    />
                  </div>
                </StageGrainCard>
              );
            })}
          </div>
          <ResetButton onReset={() => void reset()} />
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── Schätzfrage (Histogramm + Auflösung) ─── */

export function LiveEstimateSlide({
  deck,
  activity,
  active,
  step,
  eyebrow,
}: LiveSlideProps & { activity: Extract<LiveActivity, { type: "estimate" }>; eyebrow: string }) {
  const { values, reset } = useStageActivity<number>(deck, activity.id, active);
  const instant = useInstant();
  const nums = values.filter((v): v is number => typeof v === "number" && v >= 0 && v <= 100);
  const buckets = Array.from({ length: 10 }, (_, i) => nums.filter((n) => n >= i * 10 && (i === 9 ? n <= 100 : n < i * 10 + 10)).length);
  const max = Math.max(1, ...buckets);
  const avg = nums.length ? Math.round(nums.reduce((a, b) => a + b, 0) / nums.length) : null;
  const answerBucket = Math.min(9, Math.floor(activity.answer / 10));

  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="grid h-full grid-cols-[520px_1fr] items-center gap-16 px-20 pt-28 pb-20">
        <JoinCard deck={deck} count={nums.length} label={activity.question} active={active} gradient="aurora" compact />
        <div className="flex h-[780px] flex-col">
          <Stagger index={1} active={active}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <Headline size="md" className="mt-6">
              {activity.question}
            </Headline>
          </Stagger>
          <div className="mt-10 flex items-end gap-10">
            <div className="flex flex-1 items-end gap-3" style={{ height: 300 }}>
              {buckets.map((n, i) => (
                <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <span className="text-[20px] text-text-tertiary tabular-nums">{n || ""}</span>
                  <motion.div
                    className={cn(
                      "w-full rounded-t-2xl",
                      step >= 1 && i === answerBucket ? "bg-emerald-400" : "bg-primary-dark/80",
                    )}
                    animate={{ height: `${(n / max) * 100}%` }}
                    transition={{ duration: instant ? 0 : 0.5 }}
                    style={{ minHeight: n ? 8 : 0 }}
                  />
                  <span className="text-[18px] text-text-tertiary tabular-nums">{i * 10}</span>
                </div>
              ))}
            </div>
            <div className="w-[300px] shrink-0 space-y-4">
              <div className="rounded-3xl border border-border-tertiary bg-white p-6">
                <p className="text-[18px] font-semibold tracking-wider text-text-tertiary uppercase">Publikum Ø</p>
                <p className="mt-1 text-[64px] leading-none font-semibold text-text-primary tabular-nums">
                  {avg === null ? "–" : `${avg} ${activity.unit}`}
                </p>
              </div>
              <Reveal when={1} step={step}>
                <div className="rounded-3xl border border-emerald-400 bg-emerald-50 p-6">
                  <p className="text-[18px] font-semibold tracking-wider text-emerald-700 uppercase">Studie</p>
                  <p className="mt-1 text-[64px] leading-none font-semibold text-emerald-800 tabular-nums">
                    {activity.answer} {activity.unit}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
          <Reveal when={1} step={step}>
            <p className="mt-6 text-[18px] text-text-tertiary">{activity.source}</p>
          </Reveal>
          <ResetButton onReset={() => void reset()} />
        </div>
      </div>
    </SlideFrame>
  );
}

/* ─── Urteilsübung (drei Szenarien, gestapelte Balken + Auflösung) ─── */

const JUDGE_TONES = ["bg-emerald-400", "bg-amber-400", "bg-rose-400"];
const JUDGE_TEXT = ["text-emerald-700", "text-amber-700", "text-rose-700"];
const NEUTRAL_TONES = ["bg-violet-500", "bg-sky-500", "bg-pink-500"];
const NEUTRAL_TEXT = ["text-violet-700", "text-sky-700", "text-pink-700"];

export function LiveJudgeSlide({
  deck,
  activity,
  active,
  step,
  eyebrow,
}: LiveSlideProps & { activity: Extract<LiveActivity, { type: "judge" }>; eyebrow: string }) {
  const { values, reset } = useStageActivity<number[]>(deck, activity.id, active);
  const instant = useInstant();
  const valid = values.filter((v) => Array.isArray(v) && v.length === activity.scenarios.length);
  const TONES = activity.neutral ? NEUTRAL_TONES : JUDGE_TONES;
  const TEXT = activity.neutral ? NEUTRAL_TEXT : JUDGE_TEXT;

  return (
    <SlideFrame theme="light">
      <Brand />
      <div className="grid h-full grid-cols-[520px_1fr] items-center gap-16 px-20 pt-28 pb-20">
        <JoinCard deck={deck} count={valid.length} label={activity.intro} active={active} gradient="ocean" compact />
        <div className="flex h-[780px] flex-col">
          <Stagger index={1} active={active}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <Headline size="md" className="mt-6">
              {activity.neutral ? activity.title : "Erlaubt, grenzwertig, geht nicht?"}
            </Headline>
          </Stagger>
          <div className="mt-5 flex items-center gap-6 text-[18px] text-text-tertiary">
            {activity.options.map((o, i) => (
              <span key={o} className="flex items-center gap-2">
                <span className={cn("size-4 rounded-full", TONES[i])} /> {o}
              </span>
            ))}
          </div>
          <ol className="mt-4 space-y-3">
            {activity.scenarios.map((sc, i) => {
              const counts = [0, 1, 2].map((o) => valid.filter((v) => v[i] === o).length);
              const total = counts.reduce((a, b) => a + b, 0) || 1;
              return (
                <li key={i} className="rounded-3xl border border-border-tertiary bg-white px-5 py-4">
                  <div className="flex items-start gap-4">
                    <span className="w-8 shrink-0 text-[24px] font-semibold text-primary-dark tabular-nums">{i + 1}</span>
                    <p className="flex-1 text-[22px] leading-snug text-text-primary">{sc.text}</p>
                  </div>
                  <div className="mt-3 ml-12 flex h-6 overflow-hidden rounded-full bg-black/5">
                    {counts.map((n, o) => (
                      <motion.div
                        key={o}
                        className={cn("flex h-full items-center justify-center text-[16px] font-semibold text-white", TONES[o])}
                        animate={{ width: `${(n / total) * 100}%` }}
                        transition={{ duration: instant ? 0 : 0.5 }}
                      >
                        {n > 0 && n}
                      </motion.div>
                    ))}
                  </div>
                  <Reveal when={i + 1} step={step} keepSpace={false}>
                    <p className="mt-2 ml-12 text-[18px] leading-snug text-text-secondary">
                      <span className={cn("mr-2 font-semibold", TEXT[sc.verdict])}>{activity.options[sc.verdict]}.</span>
                      {sc.why}
                    </p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
          <ResetButton onReset={() => void reset()} />
        </div>
      </div>
    </SlideFrame>
  );
}
