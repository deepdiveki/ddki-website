"use client";

import Link from "next/link";
import { decks } from "./decks";

export default function DeckIndex() {
  return (
    <ul className="mt-10 space-y-4">
      {decks.map((deck) => (
        <li
          key={deck.id}
          className="flex items-center justify-between rounded-2xl border border-border-tertiary bg-white p-6 shadow-sm"
        >
          <div>
            <p className="text-lg font-semibold text-text-primary">{deck.title}</p>
            <p className="text-sm text-text-secondary">
              {deck.subtitle}
              {deck.speaker ? ` · ${deck.speaker}` : ""} · {deck.slides.length} Folien
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/praesentation/${deck.id}/presenter`}
              className="rounded-lg border border-border-secondary px-4 py-2 text-sm font-medium text-text-primary hover:bg-background-secondary"
            >
              Presenter
            </Link>
            <Link
              href={`/praesentation/${deck.id}`}
              className="rounded-lg bg-text-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-darker"
            >
              Starten
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
