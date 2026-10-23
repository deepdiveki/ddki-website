/**
 * Server-sichere Deck-Liste (ohne React-Komponenten) für Routen, Metadata
 * und generateStaticParams. Die vollständigen Decks mit Folien liegen in
 * ./index.ts und dürfen nur aus Client-Komponenten importiert werden.
 */
export type DeckMeta = {
  id: string;
  title: string;
  subtitle?: string;
  speaker?: string;
};

export const DECK_MANIFEST: DeckMeta[] = [
  {
    id: "keynote",
    title: "KI in der Bildung",
    subtitle: "Keynote-Einstieg",
    speaker: "Björn Isenbiel",
  },
  {
    id: "nerd-intro",
    title: "Keynote DDKI Nerd Intro",
    subtitle: "Team, Was ist KI, LLM-Grundlagen, Quickdraw & Soekia",
    speaker: "DeepDiveKI-Team",
  },
  {
    id: "crash-kurs",
    title: "Crash Kurs KI",
    subtitle: "Zwei Stunden für Lehrkräfte: verstehen, ausprobieren, einsetzen",
    speaker: "DeepDiveKI-Team",
  },
  {
    id: "unterrichtseinheiten",
    title: "Modul I: Unterrichtseinheiten konzipieren mit KI",
    subtitle: "Drei Stunden: Workflow am Modell, Methodenkoffer, Werkstatt für die eigene UE",
    speaker: "Björn Isenbiel & Tim Philipp",
  },
  {
    id: "spark",
    title: "SPARK: Individuelle Lernwege mit KI",
    subtitle: "Keynote mit Live-Experiment: zwei Gruppen, ein Seil, ein Palstek",
    speaker: "Björn Isenbiel",
  },
  {
    id: "plagiate",
    title: "Modul II: Plagiate, Hausaufgaben und Klausuren in Zeiten von KI",
    subtitle: "Drei Stunden: vom Erkennungsproblem zum Aufgabendesign",
    speaker: "DeepDiveKI-Team",
  },
];

export const getDeckMeta = (id: string) => DECK_MANIFEST.find((d) => d.id === id);
