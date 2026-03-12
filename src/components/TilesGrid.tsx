// components/TilesGrid.tsx
"use client";
import React from "react";
import Link from "next/link";

type Tile = {
  tag: string;
  title: string;
  text: string;
  href: string;
};

const tiles: Tile[] = [
  { tag: "KI-Chat", title: "DeepChat",
    text: "Datenschutzkonformer Chatbot für Lehrkräfte und Schüler.",
    href: "/software/ddki-toolbox" },
  { tag: "Schulbüro 3.0", title: "KI-Schulbüro",
    text: "Automatisierte Prozesse, Dokumentenverwaltung & Kommunikation.",
    href: "/software/chatbot-fuer-ihre-schule" },
  { tag: "Workshops", title: "Fortbildungen",
    text: "Modulare KI-Weiterbildung für Pädagog:innen.",
    href: "/fortbildung/fortbildungen" },
  { tag: "Online Auftritt", title: "Websites für Schulen",
    text: "Moderne Schulwebsites mit CMS & responsivem Design.",
    href: "/software/websites" },
];

export default function TilesGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {tiles.map((t, i) => (
        <Link
          key={i}
          href={t.href}
          className="sw-card-glow sw-glass-card rounded-xl p-6 transition"
        >
          <div className="flex items-center mb-3">
            <div className="w-3 h-3 bg-gradient-to-r from-primary-dark to-primary-base rounded-full mr-3" />
            <span className="text-primary-dark font-semibold text-xs tracking-wider">{t.tag}</span>
          </div>
          <h3 className="font-semibold text-lg mb-2 text-text-primary">
            {t.title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-4">{t.text}</p>
          <div className="text-left">
            <span className="inline-block bg-primary-darker text-white px-4 py-2 rounded-lg text-sm font-semibold transition hover:bg-primary-dark">
              Mehr erfahren
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
