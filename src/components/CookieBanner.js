"use client"; // Client Component

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookies] = useState({
    essential: true,
    functional: false,
    marketing: false,
  });

  useEffect(() => {
    try {
      const storedConsent = localStorage.getItem("cookieConsent");
      if (storedConsent) {
        setCookies(JSON.parse(storedConsent));
      } else {
        setIsOpen(true);
      }
    } catch (error) {
      console.error("Fehler beim Laden der Cookie-Einstellungen:", error);
      setIsOpen(true);
    }
  }, []);

  const handleConsent = (type, value) => {
    const updatedCookies = { ...cookies, [type]: value };
    setCookies(updatedCookies);
    localStorage.setItem("cookieConsent", JSON.stringify(updatedCookies));
  };

  const saveConsent = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-lg bg-gray-900 text-white p-6 rounded-lg shadow-lg z-50 transition-opacity duration-300 opacity-100">
      <h3 className="text-lg font-semibold">Privatsphäre-Einstellungen</h3>
      <p className="text-sm mt-2">
        Wir verwenden Cookies, um deine Erfahrung zu verbessern. Du kannst deine
        Einstellungen unten anpassen.
      </p>

      <div className="mt-4 space-y-2">
        <label className="flex items-center space-x-3">
          <input type="checkbox" checked disabled className="accent-purple-500" />
          <span className="text-sm">Essenziell (Immer aktiv)</span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={cookies.functional}
            onChange={(e) => handleConsent("functional", e.target.checked)}
            className="accent-purple-500"
          />
          <span className="text-sm">Funktional (z. B. YouTube, Vimeo)</span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={cookies.marketing}
            onChange={(e) => handleConsent("marketing", e.target.checked)}
            className="accent-purple-500"
          />
          <span className="text-sm">Marketing (z. B. Google Analytics, Meta Pixel)</span>
        </label>
      </div>

      <div className="flex mt-4 space-x-2">
        <button
          className="flex-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition"
          onClick={() => {
            setCookies({ essential: true, functional: true, marketing: true });
            localStorage.setItem(
              "cookieConsent",
              JSON.stringify({ essential: true, functional: true, marketing: true })
            );
            saveConsent();
          }}
        >
          Alle akzeptieren
        </button>
        <button
          className="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-semibold transition"
          onClick={() => {
            setCookies({ essential: true, functional: false, marketing: false });
            localStorage.setItem(
              "cookieConsent",
              JSON.stringify({ essential: true, functional: false, marketing: false })
            );
            saveConsent();
          }}
        >
          Ablehnen
        </button>
      </div>
    </div>
  );
}