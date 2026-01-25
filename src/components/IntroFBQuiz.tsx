"use client";

import { useEffect, useMemo, useState } from "react";

type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
};

type IntroFBQuizProps = {
  questions: QuizQuestion[];
};

const getFeedback = (percentage: number) => {
  if (percentage >= 80) {
    return "Stark! Du bist bereit für den Praxistransfer.";
  }
  if (percentage >= 60) {
    return "Gute Basis. Wiederhole die Schwerpunkte, um sicherer zu werden.";
  }
  return "Guter Start. Schau dir die Kapitel noch einmal an und probiere die Mini-Aufgaben.";
};

export default function IntroFBQuiz({ questions }: IntroFBQuizProps) {
  const [answers, setAnswers] = useState<Array<number | null>>(() =>
    Array.from({ length: questions.length }, () => null),
  );
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setAnswers(Array.from({ length: questions.length }, () => null));
    setShowResult(false);
  }, [questions.length]);

  const answeredCount = useMemo(
    () => answers.filter((answer) => answer !== null).length,
    [answers],
  );
  const allAnswered = answeredCount === questions.length;

  const score = useMemo(
    () =>
      answers.reduce<number>((acc, answer, index) => {
        if (answer === questions[index]?.correctIndex) {
          return acc + 1;
        }
        return acc;
      }, 0),
    [answers, questions],
  );
  const percentage = useMemo(() => {
    if (!questions.length) {
      return 0;
    }
    return Math.round((score / questions.length) * 100);
  }, [score, questions.length]);

  useEffect(() => {
    if (allAnswered) {
      setShowResult(true);
    }
  }, [allAnswered]);

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = optionIndex;
      return next;
    });
  };

  return (
    <div className="relative z-[10003] pointer-events-auto">
      <div className="grid gap-6 lg:grid-cols-3">
        {questions.map((item, questionIndex) => (
          <fieldset
            key={item.question}
            className="relative rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <legend className="text-xs uppercase tracking-[0.2em] text-white/50">
              Frage {questionIndex + 1}
            </legend>
            <p className="mt-3 text-base font-semibold text-white">
              {item.question}
            </p>
            <div className="mt-4 space-y-2">
              {item.options.map((option, optionIndex) => {
                const id = `q${questionIndex}-o${optionIndex}`;
                const isSelected = answers[questionIndex] === optionIndex;
                return (
                  <label
                    key={id}
                    htmlFor={id}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-dark/40 px-3 py-2 text-sm text-white/70 transition ${
                      isSelected ? "border-purple-light/60 text-white" : ""
                    }`}
                  >
                    <input
                      id={id}
                      type="radio"
                      name={`question-${questionIndex}`}
                      className="h-4 w-4 cursor-pointer accent-purple-light"
                      checked={isSelected}
                      onChange={() => handleSelect(questionIndex, optionIndex)}
                    />
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={() => setShowResult(true)}
          disabled={!allAnswered}
          className="button-border-gradient inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Antworten jetzt prüfen
        </button>
        {!allAnswered ? (
          <p className="text-xs text-white/60">
            Bitte beantworte alle Fragen, um die Auswertung zu sehen.
          </p>
        ) : null}
        {showResult && allAnswered ? (
          <div className="w-full max-w-[720px] rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <div className="text-xs uppercase tracking-[0.2em] text-white/50">
              Ergebnis
            </div>
            <div className="mt-3 text-xl font-semibold text-white">
              {score} von {questions.length} richtig ({percentage}%)
            </div>
            <p className="mt-2 text-sm text-white/70">
              {getFeedback(percentage)}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
