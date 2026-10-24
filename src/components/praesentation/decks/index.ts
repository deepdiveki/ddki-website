"use client";

import type { Deck } from "../types";
import { keynoteDeck } from "./keynote";
import { crashKursDeck } from "./crash-kurs";
import { nerdIntroDeck } from "./nerd-intro";
import { botsDeck } from "./bots";
import { plagiateDeck } from "./plagiate";
import { sparkDeck } from "./spark";
import { ueDeck } from "./unterrichtseinheiten";

/**
 * Alle Decks mit Folien. Neue Vorträge hier UND in ./manifest.ts eintragen.
 * Nur aus Client-Komponenten importieren (enthält React-Komponenten).
 */
export const decks: Deck[] = [keynoteDeck, nerdIntroDeck, sparkDeck, crashKursDeck, ueDeck, plagiateDeck, botsDeck];

export const getDeck = (id: string) => decks.find((d) => d.id === id);
