import type { ComponentType } from "react";

/** Eine Folie wird auf einer festen 1920×1080-Bühne gerendert und skaliert. */
export type SlideProps = {
  /** Aktueller Enthüllungsschritt (0 = Ausgangszustand). */
  step: number;
  /** true, wenn die Folie gerade auf der Hauptbühne sichtbar ist. */
  active: boolean;
};

export type Slide = {
  id: string;
  /** Kurztitel für Presenter-View und Folienliste. */
  title: string;
  /** Sprechernotizen (nur in der Presenter-View sichtbar). */
  notes?: string;
  /** Anzahl der Enthüllungsschritte (Fragmente) nach dem Ausgangszustand. */
  steps?: number;
  /** Hintergrund des Letterbox-Bereichs um die Bühne. */
  theme: "light" | "dark";
  Component: ComponentType<SlideProps>;
};

export type Deck = {
  id: string;
  title: string;
  subtitle?: string;
  speaker?: string;
  slides: Slide[];
};

export const STAGE_WIDTH = 1920;
export const STAGE_HEIGHT = 1080;
