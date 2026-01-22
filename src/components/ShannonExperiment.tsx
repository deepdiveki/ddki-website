"use client";

import { useMemo, useState } from "react";

const spaceToken = "LEER";
const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), ".", spaceToken];

const sentencesByLanguage: Record<string, string[]> = {
  Deutsch: [
    "KI HILFT IM UNTERRICHT.",
    "GUTE PROMPTS LIEFERN KLARE ANTWORTEN.",
    "DATEN UND KONTEXT STEUERN ERGEBNISSE.",
    "LEHRKRAEFTE PLANEN MIT KI.",
  ],
  Englisch: [
    "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.",
    "LEARNING AI IS FUN.",
    "PROMPTS GUIDE OUTPUTS.",
    "THE STUDENT ASKS ABOUT AI.",
    "GOOD CONTEXT MAKES BETTER ANSWERS.",
  ],
};

const sanitizeSentence = (value: string) => {
  const cleaned = value
    .toUpperCase()
    .replace(/[^A-Z .]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned.length > 0 ? cleaned : "";
};

const pickSentence = (language: string) => {
  const list = sentencesByLanguage[language] || sentencesByLanguage.English;
  return list[Math.floor(Math.random() * list.length)];
};

const formatChar = (char: string) => (char === " " ? spaceToken : char);

const ShannonExperiment = () => {
  const [language, setLanguage] = useState("Deutsch");
  const [sentence, setSentence] = useState(() => pickSentence("Deutsch"));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentGuesses, setCurrentGuesses] = useState(0);
  const [guessCounts, setGuessCounts] = useState<number[]>([]);
  const [usedGuesses, setUsedGuesses] = useState<string[]>([]);
  const [showStats, setShowStats] = useState(true);
  const [customOpen, setCustomOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");

  const sentenceChars = useMemo(() => sentence.split(""), [sentence]);
  const revealedChars = sentenceChars.slice(0, currentIndex);
  const revealedCounts = guessCounts.slice(0, currentIndex);

  const completedGuesses = useMemo(
    () => revealedCounts.reduce((sum, count) => sum + count, 0),
    [revealedCounts]
  );

  const avgLogGuesses = useMemo(() => {
    if (revealedCounts.length === 0) return 0;
    const total = revealedCounts.reduce(
      (sum, count) => sum + Math.log2(Math.max(count, 1)),
      0
    );
    return total / revealedCounts.length;
  }, [revealedCounts]);

  const alphabetSize = alphabet.length;
  const upperBound = Math.log2(alphabetSize);
  const lowerBound = Math.max(0, upperBound - avgLogGuesses);

  const guessTotals = useMemo(() => {
    const maxBucket = 28;
    const totals = Array.from({ length: maxBucket }, () => 0);
    revealedCounts.forEach((count) => {
      if (count > 0 && count <= maxBucket) totals[count - 1] += 1;
    });
    return totals;
  }, [revealedCounts]);

  const guessesForEachChar = revealedChars.map((char, index) => ({
    label: formatChar(char),
    value: revealedCounts[index] || 0,
  }));

  const maxGuessForChar = Math.max(
    1,
    ...guessesForEachChar.map((item) => item.value)
  );
  const maxGuessTotal = Math.max(1, ...guessTotals);

  const handleNewSentence = (nextLanguage?: string) => {
    const lang = nextLanguage || language;
    const next = pickSentence(lang);
    setSentence(next);
    setCurrentIndex(0);
    setCurrentGuesses(0);
    setGuessCounts([]);
    setUsedGuesses([]);
  };

  const handleLanguageChange = (nextLanguage: string) => {
    setLanguage(nextLanguage);
    setCustomInput("");
    handleNewSentence(nextLanguage);
  };

  const handleGuess = (token: string) => {
    if (currentIndex >= sentenceChars.length) return;
    const target = sentenceChars[currentIndex];
    const guess = token === spaceToken ? " " : token;
    if (usedGuesses.includes(token)) return;
    const nextGuesses = currentGuesses + 1;
    setUsedGuesses((prev) => [...prev, token]);

    if (guess === target) {
      const nextCounts = [...guessCounts];
      nextCounts[currentIndex] = nextGuesses;
      setGuessCounts(nextCounts);
      setCurrentIndex((prev) => prev + 1);
      setCurrentGuesses(0);
      setUsedGuesses([]);
    } else {
      setCurrentGuesses(nextGuesses);
    }
  };

  const applyCustomSentence = () => {
    const cleaned = sanitizeSentence(customInput);
    if (!cleaned) return;
    setSentence(cleaned);
    setCurrentIndex(0);
    setCurrentGuesses(0);
    setGuessCounts([]);
    setUsedGuesses([]);
  };

  const isComplete = currentIndex >= sentenceChars.length;

  return (
    <div className="features-box-border relative rounded-3xl">
      <div className="box-hover relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="relative z-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/50">
                Shannon Experiment
              </div>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                Shannons Vorhersage und Entropie von gedrucktem Text
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
              <label className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                  Textsprache:
                </span>
                <select
                  value={language}
                  onChange={(event) =>
                    handleLanguageChange(event.target.value)
                  }
                  className="rounded-lg border border-white/10 bg-dark/70 px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/70"
                >
                  {Object.keys(sentencesByLanguage).map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                onClick={() => handleNewSentence()}
                className="rounded-lg border border-white/10 bg-purple/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80"
              >
                Neuer Satz
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-lg font-semibold text-white">
              Verfuegbares Alphabet
            </h4>
            <p className="mt-2 text-sm text-white/60">
              Klicke das Zeichen, das du als naechstes im Satz erwartest.
            </p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
              Tipp: Das Zeichen {spaceToken} steht fuer das Leerzeichen zwischen
              Woertern.
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {alphabet.map((token) => (
                <button
                  key={token}
                  type="button"
                  onClick={() => handleGuess(token)}
                  disabled={isComplete || usedGuesses.includes(token)}
                  className="h-10 min-w-[40px] rounded-lg border border-white/10 bg-white/5 px-3 text-sm font-semibold text-white/80 transition hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {token}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h4 className="text-lg font-semibold text-white">Satz</h4>
            <div className="mt-4 flex flex-wrap gap-4">
              {revealedChars.map((char, index) => (
                <div key={`char-${index}`} className="text-center">
                  <div className="h-12 w-12 rounded-xl border border-white/10 bg-white/5 text-lg font-semibold text-white/90">
                    <div className="flex h-full items-center justify-center">
                      {formatChar(char)}
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-white/60">
                    {revealedCounts[index] || 0}
                  </div>
                </div>
              ))}
              {!isComplete && (
                <div className="text-center">
                  <div className="h-12 w-12 rounded-xl border border-purple/30 bg-purple/10 text-lg font-semibold text-white/90">
                    <div className="flex h-full items-center justify-center">
                      ?
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-white/60">
                    {currentGuesses}
                  </div>
                </div>
              )}
            </div>
            {isComplete ? (
              <div className="mt-4 text-sm text-white/70">
                Satz abgeschlossen. Klicke auf &quot;Neuer Satz&quot;, um erneut
                zu starten.
              </div>
            ) : null}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setCustomOpen((prev) => !prev)}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70"
            >
              Eigenes Experiment erstellen
            </button>
            <button
              type="button"
              onClick={() => setShowStats((prev) => !prev)}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70"
            >
              {showStats ? "Statistiken ausblenden" : "Statistiken anzeigen"}
            </button>
          </div>

          {customOpen ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-dark/40 p-4">
              <label className="text-xs uppercase tracking-[0.2em] text-white/50">
                Eigener Satz (A-Z, Leerzeichen, .)
              </label>
              <div className="mt-3 flex flex-wrap gap-3">
                <input
                  value={customInput}
                  onChange={(event) => setCustomInput(event.target.value)}
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 placeholder:text-white/30"
                  placeholder="Eigenen Satz eingeben..."
                />
                <button
                  type="button"
                  onClick={applyCustomSentence}
                  className="rounded-lg border border-white/10 bg-purple/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80"
                >
                  Satz uebernehmen
                </button>
              </div>
            </div>
          ) : null}

          {showStats ? (
            <div className="mt-10">
              <h4 className="text-lg font-semibold text-white">Statistiken</h4>
              <p className="mt-2 text-sm text-white/60">
                Statistiken werden nach jedem korrekt geratenen Zeichen
                aktualisiert.
              </p>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-center text-sm font-semibold text-white/80">
                    Versuche pro Zeichen
                  </div>
                  <div className="mt-4 h-48">
                    <div className="relative h-full">
                      <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-white/30">
                        {[5, 4, 3, 2, 1, 0].map((tick) => (
                          <div key={tick} className="flex items-center gap-2">
                            <span className="w-6 text-right">
                              {Math.round((tick / 5) * maxGuessForChar)}
                            </span>
                            <span className="h-px flex-1 bg-white/10"></span>
                          </div>
                        ))}
                      </div>
                      <div className="absolute inset-x-8 bottom-4 top-4 flex items-end gap-3">
                        {guessesForEachChar.length === 0 ? (
                          <div className="text-xs text-white/40">
                            Noch keine Daten
                          </div>
                        ) : (
                          guessesForEachChar.map((item) => (
                            <div
                              key={item.label}
                              className="flex flex-1 flex-col items-center gap-2"
                            >
                              <div className="flex h-full items-end">
                                <div
                                  className="w-10 rounded-t-lg bg-sky-400/80"
                                  style={{
                                    height: `${(item.value / maxGuessForChar) * 100}%`,
                                    minHeight: item.value > 0 ? "6px" : "0",
                                  }}
                                ></div>
                              </div>
                              <div className="text-[10px] uppercase text-white/50">
                                {item.label}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-white/40">
                    Zeichen im Satz
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-center text-sm font-semibold text-white/80">
                    Gesamtversuche
                  </div>
                  <div className="mt-4 h-48">
                    <div className="relative h-full">
                      <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-white/30">
                        {[5, 4, 3, 2, 1, 0].map((tick) => (
                          <div key={tick} className="flex items-center gap-2">
                            <span className="w-6 text-right">
                              {Math.round((tick / 5) * maxGuessTotal)}
                            </span>
                            <span className="h-px flex-1 bg-white/10"></span>
                          </div>
                        ))}
                      </div>
                      <div className="absolute inset-x-8 bottom-4 top-4 flex items-end gap-1">
                        {guessTotals.map((value, index) => (
                          <div
                            key={`guess-${index}`}
                            className="flex flex-1 flex-col items-center"
                          >
                            <div
                              className="w-full rounded-t bg-sky-400/80"
                              style={{
                                height: `${(value / maxGuessTotal) * 100}%`,
                                minHeight: value > 0 ? "6px" : "0",
                              }}
                            ></div>
                            <div className="mt-2 text-[10px] text-white/40">
                              {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-white/40">
                    Anzahl der Versuche bis ein Zeichen korrekt geraten wurde
                  </div>
                </div>
              </div>

              <div className="mt-6 text-sm text-white/70">
                Gesamtversuche: {completedGuesses}
              </div>
              <div className="mt-1 text-sm text-white/70">
                Approx. Schranke Bits pro Zeichen: {upperBound.toFixed(4)} -{" "}
                {lowerBound.toFixed(4)}
              </div>
              <div className="mt-4 text-xs text-white/50">
                Beispiel: Du hast 0 Zeichen beim 1. Versuch geraten.
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ShannonExperiment;
