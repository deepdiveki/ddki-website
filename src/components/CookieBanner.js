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

  // Reopen banner when user clicks "Privatsphäre-Einstellungen" in footer (DSGVO Art. 7 Abs. 3)
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("openCookieBanner", handleOpen);
    return () => window.removeEventListener("openCookieBanner", handleOpen);
  }, []);

  const saveAndNotify = (consent) => {
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cookieConsentUpdated", { detail: consent }));
    }
  };

  const handleConsent = (type, value) => {
    const updatedCookies = { ...cookies, [type]: value };
    setCookies(updatedCookies);
    saveAndNotify(updatedCookies);
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
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <button
          className="flex-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition"
          onClick={() => {
            const consent = { essential: true, functional: true, marketing: true };
            setCookies(consent);
            saveAndNotify(consent);
            saveConsent();
          }}
        >
          Alle akzeptieren
        </button>
        <button
          className="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-semibold transition"
          onClick={() => {
            const consent = { essential: true, functional: false, marketing: false };
            setCookies(consent);
            saveAndNotify(consent);
            saveConsent();
          }}
        >
          Ablehnen
        </button>
        <button
          className="py-2 px-4 border border-gray-500 rounded-lg text-gray-300 hover:bg-gray-800 font-medium transition text-sm"
          onClick={saveConsent}
        >
          Schließen
        </button>
      </div>
    </div>
  );
}