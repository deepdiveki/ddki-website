"use client";

import { useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, RotateCcw, Trophy, X } from "lucide-react";
import type { QuizQuestion } from "../_data/courseContent";

type Props = {
  title: string;
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
};

export default function Quiz({ title, questions, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const selectedOption = answers[currentQuestion.id];
  const isSubmitted = submitted[currentQuestion.id];
  const isLast = currentIndex === questions.length - 1;
  const isFirst = currentIndex === 0;

  const score = useMemo(
    () =>
      questions.reduce((acc, q) => {
        const sel = answers[q.id];
        const correct = q.options.find((o) => o.correct)?.id;
        return acc + (sel && sel === correct ? 1 : 0);
      }, 0),
    [questions, answers],
  );

  const handleSelect = (optionId: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setSubmitted((prev) => ({ ...prev, [currentQuestion.id]: true }));
  };

  const handleNext = () => {
    if (isLast) {
      setFinished(true);
      onComplete?.(score, questions.length);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) setCurrentIndex((i) => i - 1);
  };

  const handleRestart = () => {
    setAnswers({});
    setSubmitted({});
    setCurrentIndex(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <QuizResults
        title={title}
        questions={questions}
        answers={answers}
        score={score}
        onRestart={handleRestart}
        onReview={(index) => {
          setFinished(false);
          setCurrentIndex(index);
        }}
      />
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col px-4 py-8 sm:px-8 lg:py-12">
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm font-medium text-text-secondary">
          <span>{title}</span>
          <span>
            Frage {currentIndex + 1} von {questions.length}
          </span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-background-secondary">
          <div
            className="h-full rounded-full bg-purple transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold leading-snug text-text-primary md:text-2xl">
        {currentQuestion.question}
      </h2>

      <ul className="mt-6 flex flex-col gap-3">
        {currentQuestion.options.map((option) => {
          const isSelected = selectedOption === option.id;
          const isCorrect = option.correct === true;
          const showResult = isSubmitted;

          let stateClass =
            "border-border-secondary hover:border-purple-light hover:bg-purple-light-5";
          if (showResult && isCorrect) {
            stateClass = "border-emerald-500 bg-emerald-50";
          } else if (showResult && isSelected && !isCorrect) {
            stateClass = "border-rose-500 bg-rose-50";
          } else if (isSelected) {
            stateClass = "border-purple bg-purple-light-5";
          }

          return (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => handleSelect(option.id)}
                disabled={isSubmitted}
                className={`group flex w-full items-start gap-4 rounded-xl border-2 px-4 py-3.5 text-left transition disabled:cursor-default ${stateClass}`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 text-sm font-semibold transition ${
                    showResult && isCorrect
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : showResult && isSelected && !isCorrect
                        ? "border-rose-500 bg-rose-500 text-white"
                        : isSelected
                          ? "border-purple bg-purple text-white"
                          : "border-border-tertiary bg-white text-text-secondary group-hover:border-purple group-hover:text-purple"
                  }`}
                >
                  {showResult && isCorrect ? (
                    <Check className="h-4 w-4" />
                  ) : showResult && isSelected && !isCorrect ? (
                    <X className="h-4 w-4" />
                  ) : (
                    option.id
                  )}
                </span>
                <span className="flex-1 text-sm leading-snug text-text-primary md:text-base">
                  {option.text}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {isSubmitted && (
        <div
          className={`mt-5 rounded-xl border px-4 py-3 text-sm font-medium ${
            selectedOption === currentQuestion.options.find((o) => o.correct)?.id
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-rose-200 bg-rose-50 text-rose-800"
          }`}
        >
          {selectedOption === currentQuestion.options.find((o) => o.correct)?.id
            ? "Richtig! Gut gemacht."
            : `Leider falsch. Korrekt wäre: ${currentQuestion.options.find((o) => o.correct)?.id}.`}
        </div>
      )}

      <div className="mt-8 flex items-center justify-between border-t border-border-secondary pt-5">
        <button
          type="button"
          onClick={handlePrev}
          disabled={isFirst}
          className="flex items-center gap-1.5 text-sm font-semibold text-text-secondary transition hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Zurück
        </button>

        {!isSubmitted ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedOption}
            className="rounded-lg bg-purple px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            Antwort prüfen
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-1.5 rounded-lg bg-purple px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-dark"
          >
            {isLast ? "Quiz beenden" : "Nächste Frage"}
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function QuizResults({
  title,
  questions,
  answers,
  score,
  onRestart,
  onReview,
}: {
  title: string;
  questions: QuizQuestion[];
  answers: Record<string, string>;
  score: number;
  onRestart: () => void;
  onReview: (index: number) => void;
}) {
  const total = questions.length;
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 75;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col px-4 py-8 sm:px-8 lg:py-12">
      <div
        className={`flex items-start gap-5 rounded-2xl border-2 p-6 ${
          passed ? "border-emerald-200 bg-emerald-50" : "border-purple-light-3 bg-purple-light-5"
        }`}
      >
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${
            passed ? "bg-emerald-500 text-white" : "bg-purple text-white"
          }`}
        >
          <Trophy className="h-7 w-7" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-text-primary md:text-2xl">
            {passed ? "Stark gemacht!" : "Quiz abgeschlossen"}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">{title}</p>
          <p className="mt-3 text-text-primary">
            Du hast <span className="font-semibold">{score} von {total}</span> Fragen richtig beantwortet ({percentage}%).
          </p>
        </div>
      </div>

      <h3 className="mt-8 text-base font-semibold text-text-primary">
        Deine Antworten im Überblick
      </h3>
      <ul className="mt-3 flex flex-col gap-2">
        {questions.map((q, index) => {
          const sel = answers[q.id];
          const correct = q.options.find((o) => o.correct)?.id;
          const isCorrect = sel === correct;
          return (
            <li key={q.id}>
              <button
                type="button"
                onClick={() => onReview(index)}
                className="flex w-full items-start gap-3 rounded-xl border border-border-secondary bg-white px-4 py-3 text-left transition hover:border-purple"
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white ${
                    isCorrect ? "bg-emerald-500" : "bg-rose-500"
                  }`}
                >
                  {isCorrect ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                </span>
                <div className="flex-1">
                  <div className="text-xs font-medium text-text-tertiary">
                    Frage {index + 1}
                  </div>
                  <div className="text-sm leading-snug text-text-primary">
                    {q.question}
                  </div>
                </div>
                <ChevronRight className="mt-1 h-4 w-4 text-text-tertiary" />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-8">
        <button
          type="button"
          onClick={onRestart}
          className="flex items-center gap-2 rounded-lg border-2 border-purple px-5 py-2.5 text-sm font-semibold text-purple transition hover:bg-purple hover:text-white"
        >
          <RotateCcw className="h-4 w-4" />
          Quiz wiederholen
        </button>
      </div>
    </div>
  );
}
