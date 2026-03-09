// components/TilesGrid.tsx
"use client";
import React from "react";

type Tile = {
  tag: string;
  title: string;
  text: string;
  href: string;
};

const tiles: Tile[] = [
  { tag: "KI-Chat", title: "DeepChat",
    text: "Datenschutzkonformer Chatbot für Lehrkräfte und Schüler.",
    href: "https://www.deepdive-ki.de/software/ddki-toolbox" },
  { tag: "Schulbüro 3.0", title: "KI-Schulbüro",
    text: "Automatisierte Prozesse, Dokumentenverwaltung & Kommunikation.",
    href: "https://www.deepdive-ki.de/software/chatbot-fuer-ihre-schule" },
  { tag: "Workshops", title: "Fortbildungen",
    text: "Modulare KI-Weiterbildung für Pädagog:innen.",
    href: "https://www.deepdive-ki.de/software/fortbildungen" },
  { tag: "Online Auftritt", title: "Websites für Schulen",
    text: "Moderne Schulwebsites mit CMS & responsivem Design.",
    href: "#" },
];

export default function TilesGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {tiles.map((t, i) => (
        <div
          key={i}
          className="rounded-xl p-6 bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-purple-500/30 shadow-2xl"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px, 20px 20px",
            backgroundPosition: "-1px -1px, -1px -1px",
          }}
        >
          <div className="flex items-center mb-3">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-400 rounded-full mr-3" />
            <span className="text-purple-300 font-bold text-xs tracking-wider">{t.tag}</span>
          </div>
          <h3 className="text-white font-bold text-lg mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            {t.title}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">{t.text}</p>
          <div className="text-left">
            <a
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-purple-500 hover:to-purple-400 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              Mehr erfahren
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}