// Kopie von spark/src/components/spark-mark.tsx (Farben über CSS-Variablen --spark, --spark-deep, --spark-core, --sky).
"use client";
import { useId } from "react";

/**
 * Das SPARK-Mark: die Sonne aus der SPARK-Animation – kleiner heller Kern,
 * satte, deckende Amber-Arme von ungleicher Länge (wie das Claude-Symbol),
 * feine Streifen dazwischen, ausgefranste Kanten und Filmkorn, dahinter ein
 * Hauch Himmelblau. Steht frei auf der Fläche, ohne Chip. Farben kommen aus
 * den Skin-Tokens (`--spark`, `--spark-deep`, `--spark-core`, `--sky`),
 * damit der Apple-Skin blau färbt.
 *
 * `thinking` lässt das Mark langsam rotieren und unregelmäßig aufglühen:
 * Arme und Streifen liegen in Gruppen mit je eigenem Takt, eigener Amplitude
 * und eigener Kurve (weiches Atmen oder kurzes Aufflackern mit langem
 * Abklingen); die Takte teilen keinen gemeinsamen Nenner, darum wiederholt
 * sich das Muster nicht sichtbar. Die Deckkraft bleibt dabei hoch – sonst
 * mischt sich Amber mit dem Blau dahinter zu einem grauen Schleier.
 * Keyframes in globals.css unter `.spark-mark`; bei prefers-reduced-motion
 * bleibt es still.
 *
 * Die Pfade sind deterministisch vorberechnet (kein Zufall zur Laufzeit),
 * damit Server und Client dasselbe SVG rendern. Erzeugt mit einem kleinen
 * Generator (verschränkt auf Gruppen verteilt, nach Deckkraft gebündelt);
 * von Hand nicht editieren.
 */

type Bundle = { op: string; d: string };
/** Blütenarme, 4 Gruppen */
const ARM_GROUPS: Bundle[][] = [
  [
    { op: "1", d: "M34.3 35.4Q49.7 33.4 62.0 29.6L61.9 28.9Q49.3 29.8 33.7 28.3ZM28.9 34.2Q30.7 43.9 33.2 51.6L33.8 51.6Q33.9 43.6 35.4 33.7ZM28.4 29.5Q19.1 37.6 10.7 42.8L11.1 43.4Q20.9 41.1 32.0 36.4ZM33.7 28.6Q22.7 16.1 15.2 4.9L14.6 5.2Q19.9 17.8 28.2 32.1ZM35.4 33.3Q46.7 23.2 56.2 15.3L55.9 14.8Q45.0 20.7 31.9 28.4Z" },
  ],
  [
    { op: "1", d: "M33.4 35.3Q48.4 35.5 60.3 37.8L60.4 37.2Q49.0 32.5 34.5 29.4ZM29.4 33.7Q28.8 44.1 29.1 52.8L29.6 52.8Q31.2 44.4 34.1 34.3ZM30.1 29.1Q14.5 29.7 1.6 30.6L1.6 31.2Q14.4 32.5 29.9 34.7ZM34.9 29.2Q29.1 14.6 24.5 2.7L23.9 2.8Q25.8 15.5 28.1 31.0ZM34.9 34.6Q48.2 28.7 59.1 23.9L58.9 23.3Q47.2 25.5 32.9 28.2Z" },
  ],
  [
    { op: "1", d: "M31.4 36.7Q46.5 43.5 58.8 48.8L59.2 48.1Q48.7 39.8 36.0 29.3ZM28.7 32.1Q23.7 39.6 20.8 46.7L21.2 47.0Q25.8 41.2 32.9 35.2ZM31.1 28.2Q22.5 27.0 15.3 26.5L15.1 27.2Q21.5 30.2 29.1 34.6ZM34.7 30.2Q33.1 20.2 33.5 12.1L33.0 12.0Q30.5 20.0 29.5 29.8Z" },
  ],
  [
    { op: "1", d: "M30.0 35.5Q36.8 44.5 43.2 51.3L43.8 51.0Q39.8 42.7 36.1 31.9ZM28.3 31.3Q23.2 40.4 18.0 46.8L18.5 47.3Q25.5 42.5 33.0 35.6ZM32.8 27.5Q26.1 24.9 20.4 23.0L19.9 23.7Q23.7 28.3 28.0 34.1ZM35.2 31.7Q41.8 19.8 47.1 9.9L46.7 9.6Q39.7 18.4 31.0 28.9Z" },
  ],
];
/** feine Streifen, 3 Gruppen */
const HAIR_GROUPS: Bundle[][] = [
  [
    { op: "0.7", d: "M35.0 33.1L48.0 31.5L48.0 31.2L34.9 30.7ZM28.8 31.9L12.6 38.2L12.7 38.5L29.5 34.0ZM29.1 31.0L16.2 29.3L16.2 29.5L29.0 32.0ZM30.0 29.6L13.6 17.6L13.5 17.7L29.2 30.7ZM31.4 28.9L16.3 5.9L16.1 6.0L29.5 30.0ZM32.7 29.0L30.9 9.0L30.7 9.0L31.0 29.0ZM34.8 30.7L43.7 24.2L43.6 24.1L34.2 29.9ZM35.1 32.8L60.2 29.9L60.1 29.6L34.9 30.7Z" },
    { op: "0.88", d: "M34.5 33.8L53.1 42.5L53.2 42.3L34.9 32.8ZM33.3 34.8L44.4 47.0L44.5 46.8L34.5 33.8ZM34.1 29.7L46.1 4.8L45.9 4.7L32.6 28.9Z" },
    { op: "1", d: "M32.0 35.0L36.7 57.3L36.8 57.3L33.1 34.8ZM29.8 34.4L21.2 58.0L21.5 58.1L31.9 35.2ZM29.3 33.5L8.4 52.1L8.5 52.2L30.1 34.4Z" },
  ],
  [
    { op: "0.7", d: "M30.1 34.4L21.4 53.8L21.6 53.8L31.3 35.0ZM29.4 30.2L5.9 22.8L5.8 23.0L28.9 31.8ZM30.5 29.3L16.7 14.8L16.6 14.9L29.5 30.2ZM32.2 28.8L24.9 9.0L24.7 9.1L30.0 29.5ZM33.3 29.1L36.0 -0.3L35.8 -0.4L31.4 28.9ZM34.5 30.0L40.7 19.1L40.4 18.9L32.8 28.9Z" },
    { op: "0.88", d: "M34.2 34.1L51.9 44.6L51.9 44.5L34.8 33.1ZM32.4 35.1L43.6 57.3L43.8 57.2L34.1 34.3ZM28.8 31.5L-0.1 38.8L-0.0 39.1L29.3 33.8Z" },
    { op: "1", d: "M34.9 33.1L53.4 35.1L53.5 34.9L35.1 31.8ZM30.9 34.9L31.1 47.9L31.3 48.0L32.8 35.0ZM29.0 32.9L17.1 43.0L17.3 43.2L30.3 34.7ZM34.9 31.0L51.2 20.7L51.2 20.6L34.3 29.9Z" },
  ],
  [
    { op: "0.7", d: "M30.6 34.8L29.1 49.3L29.3 49.3L32.5 35.1ZM29.5 34.0L18.1 53.6L18.4 53.7L31.3 35.1ZM29.0 31.0L13.3 31.2L13.3 31.4L29.0 32.8ZM31.2 28.9L24.5 21.1L24.2 21.2L29.4 30.2ZM33.7 29.4L41.2 3.2L41.0 3.2L32.2 28.9ZM35.1 31.9L48.4 27.7L48.4 27.6L34.7 30.6Z" },
    { op: "0.88", d: "M28.9 32.5L16.4 40.8L16.6 41.0L29.9 34.4ZM29.6 29.9L4.7 20.5L4.6 20.7L28.8 31.8ZM32.5 28.9L29.8 16.3L29.6 16.3L30.6 29.2ZM34.6 30.4L48.6 17.0L48.5 16.9L33.9 29.6Z" },
    { op: "1", d: "M34.6 33.8L47.6 36.1L47.7 35.9L35.2 31.7ZM33.4 34.7L49.9 51.4L50.0 51.3L34.6 33.7ZM32.3 35.1L43.3 60.1L43.5 60.0L34.0 34.4Z" },
  ],
];

/**
 * Scharfe Variante: nur Arme, gleichmäßiger verteilt, ohne Filter – reine
 * Vektorkanten. 4 Gruppen, dieselbe Animation.
 */
const SHARP_ARM_GROUPS: string[] = [
  "M34.1 34.4Q44.3 32.4 52.6 31.5L52.6 31.3Q44.2 30.0 33.9 29.5ZM27.5 34.0Q29.9 45.5 31.7 54.9L32.1 54.9Q34.5 45.5 36.5 34.0ZM30.2 27.8Q17.1 28.9 6.3 30.5L6.3 30.9Q16.9 33.0 29.8 36.0ZM35.5 30.1Q34.4 15.9 33.3 4.2L33.1 4.2Q31.0 15.7 28.7 29.9Z",
  "M32.6 36.0Q44.7 39.2 54.9 41.3L55.0 41.0Q46.0 35.9 35.2 29.5ZM28.1 32.4Q26.0 41.9 23.8 49.5L24.1 49.6Q29.1 43.4 34.2 35.2ZM31.9 27.5Q24.7 26.5 18.8 25.6L18.7 25.9Q23.0 30.2 28.5 34.8ZM36.1 31.5Q40.2 17.2 43.2 5.3L43.0 5.2Q36.8 15.8 29.4 28.8Z",
  "M31.3 35.5Q38.5 41.4 45.1 45.6L45.3 45.4Q40.6 39.4 35.5 31.4ZM28.6 31.5Q20.7 40.9 15.0 49.2L15.1 49.4Q22.7 42.8 32.6 35.4ZM32.6 28.4Q21.0 20.1 11.4 13.5L11.2 13.7Q18.9 22.4 28.5 33.0ZM36.3 33.1Q40.7 24.8 44.5 18.2L44.3 18.0Q37.7 22.2 30.4 27.9Z",
  "M29.1 35.5Q35.2 43.3 39.7 50.0L40.0 49.8Q38.9 41.7 36.5 32.2ZM28.8 29.9Q18.4 35.9 10.4 41.8L10.5 42.0Q19.8 38.9 31.5 35.8ZM35.1 28.4Q29.8 21.9 25.4 16.6L25.1 16.7Q25.8 23.6 27.3 31.9ZM34.8 33.9Q45.6 28.3 54.6 24.1L54.5 23.9Q44.7 25.8 33.0 28.8Z",
];

export function SparkMark({
  className,
  thinking = false,
  title,
  variant = "sharp",
}: {
  className?: string;
  /**
   * "sharp" (Standard): klare Vektorkanten ohne Filter, nur Arme.
   * "soft": ausgefranst, weich, mit Filmkorn – wie die Animation.
   */
  variant?: "soft" | "sharp";
  /** Langsame Rotation + unregelmäßiges Aufglühen: SPARK arbeitet gerade. */
  thinking?: boolean;
  /** Optionaler zugänglicher Name; ohne Titel ist das Mark dekorativ. */
  title?: string;
}) {
  // Eindeutige IDs, weil mehrere Marks auf einer Seite liegen – sonst
  // referenzieren alle den ersten Gradienten/Filter im DOM.
  const id = useId();
  const grad = `${id}-g`;
  const core = `${id}-c`;
  const sky = `${id}-s`;
  const glow = `${id}-f`;
  const sharp = variant === "sharp";

  return (
    <svg
      viewBox="0 0 64 64"
      className={["spark-mark", className].filter(Boolean).join(" ")}
      data-thinking={thinking ? "" : undefined}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <defs>
        {/* satt und deckend bis weit nach außen, erst die Spitzen laufen aus */}
        <radialGradient id={grad} cx="32" cy="32" r="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--spark)" }} />
          <stop offset="0.5" style={{ stopColor: "var(--spark)" }} />
          {sharp ? (
            <stop offset="1" style={{ stopColor: "var(--spark-deep)" }} />
          ) : (
            <>
              <stop offset="0.82" style={{ stopColor: "var(--spark-deep)", stopOpacity: 0.8 }} />
              <stop offset="1" style={{ stopColor: "var(--spark-deep)", stopOpacity: 0 }} />
            </>
          )}
        </radialGradient>
        {/* kleiner heller Kern mit weichem Saum */}
        <radialGradient id={core} cx="32" cy="32" r="5.2" gradientUnits="userSpaceOnUse">
          <stop offset="0.59" style={{ stopColor: "var(--spark-core)" }} />
          <stop
            offset="0.69"
            style={{ stopColor: "var(--spark-core)", stopOpacity: sharp ? 0.5 : 0.85 }}
          />
          <stop offset="1" style={{ stopColor: "var(--spark-core)", stopOpacity: 0 }} />
        </radialGradient>
        {/* Himmelblau-Schimmer wie der Grund der Animation */}
        <radialGradient id={sky} cx="32" cy="32" r="32" gradientUnits="userSpaceOnUse">
          <stop offset="0.25" style={{ stopColor: "var(--sky)", stopOpacity: 0.3 }} />
          <stop offset="0.7" style={{ stopColor: "var(--sky)", stopOpacity: 0.15 }} />
          <stop offset="1" style={{ stopColor: "var(--sky)", stopOpacity: 0 }} />
        </radialGradient>
        {/* Ausfransen (Rauschen verschiebt die Kanten), Weichzeichnen und
            Filmkorn – dieselbe Anmutung wie die Animation. */}
        {!sharp && (
        <filter id={glow} x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation="0.6" result="soft" />
          <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" seed="3" result="gn" />
          <feColorMatrix
            in="gn"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1.37 -0.21"
            result="ga"
          />
          <feComposite in="soft" in2="ga" operator="in" result="grainy" />
          <feComponentTransfer in="soft" result="base">
            <feFuncA type="linear" slope="0.88" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="base" />
            <feMergeNode in="grainy" />
          </feMerge>
        </filter>
        )}
      </defs>
      <circle className="spark-mark__sky" cx="32" cy="32" r="32" fill={`url(#${sky})`} />
      <g filter={sharp ? undefined : `url(#${glow})`} fill={`url(#${grad})`}>
        <circle className="spark-mark__halo" cx="32" cy="32" r="10" />
        {!sharp && HAIR_GROUPS.map((bundles, i) => (
          <g key={i} className={`spark-mark__hairs spark-mark__hairs--${i + 1}`}>
            {bundles.map((b) => (
              <path key={b.op} d={b.d} opacity={b.op} />
            ))}
          </g>
        ))}
        {sharp
          ? SHARP_ARM_GROUPS.map((d, i) => (
              <g key={i} className={`spark-mark__arms spark-mark__arms--${i + 1}`}>
                <path d={d} />
              </g>
            ))
          : ARM_GROUPS.map((bundles, i) => (
              <g key={i} className={`spark-mark__arms spark-mark__arms--${i + 1}`}>
                {bundles.map((b) => (
                  <path key={b.op} d={b.d} opacity={b.op} />
                ))}
              </g>
            ))}
      </g>
      <circle className="spark-mark__core" cx="32" cy="32" r="5.2" fill={`url(#${core})`} />
    </svg>
  );
}
