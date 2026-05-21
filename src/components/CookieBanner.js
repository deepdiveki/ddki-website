"use client";

import { useState, useEffect } from "react";

const PROVIDER_DETAILS = [
  {
    category: "functional",
    name: "YouTube",
    provider: "Google Ireland Limited / Google LLC (USA)",
    purpose:
      "Einbettung von Lernvideos im Escape Game und in Tutorials (erweiterter Datenschutzmodus über youtube-nocookie.com).",
    transfer: "Drittlandübermittlung in die USA (Art. 46 / Art. 45 DSGVO).",
  },
  {
    category: "functional",
    name: "Calendly",
    provider: "Calendly LLC (USA)",
    purpose:
      "Bereitstellung der Online-Terminbuchung auf der Kontaktseite.",
    transfer: "Drittlandübermittlung in die USA (Art. 46 / Art. 45 DSGVO).",
  },
];

const defaultConsent = { essential: true, functional: false };

export default function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookies] = useState(defaultConsent);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    try {
      const storedConsent = localStorage.getItem("cookieConsent");
      if (storedConsent) {
        const parsed = JSON.parse(storedConsent);
        setCookies({
          essential: true,
          functional: parsed.functional === true,
        });
      } else {
        setIsOpen(true);
      }
    } catch (error) {
      console.error("Fehler beim Laden der Cookie-Einstellungen:", error);
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("openCookieBanner", handleOpen);
    return () => window.removeEventListener("openCookieBanner", handleOpen);
  }, []);

  const persistConsent = (consent) => {
    try {
      localStorage.setItem("cookieConsent", JSON.stringify(consent));
    } catch (error) {
      console.error("Cookie-Consent konnte nicht gespeichert werden:", error);
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("cookieConsentUpdated", { detail: consent }),
      );
    }
  };

  const acceptAll = () => {
    const consent = { essential: true, functional: true };
    setCookies(consent);
    persistConsent(consent);
    setIsOpen(false);
  };

  const rejectAll = () => {
    const consent = { essential: true, functional: false };
    setCookies(consent);
    persistConsent(consent);
    setIsOpen(false);
  };

  const saveSelection = () => {
    const consent = { essential: true, functional: cookies.functional === true };
    setCookies(consent);
    persistConsent(consent);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const buttonStyle =
    "flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition border border-purple-500 bg-purple-600 text-white hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 cursor-pointer";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
      className="fixed bottom-4 left-1/2 z-50 w-[92%] max-w-xl -translate-x-1/2 rounded-xl bg-gray-900 p-6 text-white shadow-2xl"
    >
      <h3 id="cookie-banner-title" className="text-lg font-semibold">
        Privatsphäre-Einstellungen
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-200">
        Wir verwenden technisch notwendige Cookies, um diese Website
        bereitzustellen. Mit Ihrer Einwilligung binden wir zusätzlich Inhalte
        und Funktionen von Drittanbietern (z. B. YouTube und Calendly) ein.
        Dabei kann es zu einer Übermittlung personenbezogener Daten (u. a. IP-Adresse)
        in die USA kommen. Rechtsgrundlage ist § 25 Abs. 1 TDDDG i.V.m. Art. 6
        Abs. 1 Buchst. a DSGVO. Sie können Ihre Einwilligung jederzeit über den
        Link „Privatsphäre-Einstellungen" im Footer widerrufen oder anpassen.
        Weitere Informationen finden Sie in unserer{" "}
        <a
          href="/datenschutz"
          className="text-purple-300 underline hover:text-purple-200"
        >
          Datenschutzerklärung
        </a>
        .
      </p>

      <div className="mt-4 space-y-2">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked
            disabled
            className="accent-purple-500"
            aria-label="Essenzielle Cookies (immer aktiv)"
          />
          <span className="text-sm">
            Essenziell <span className="text-gray-400">(immer aktiv)</span>
          </span>
        </label>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={cookies.functional}
            onChange={(e) =>
              setCookies({ ...cookies, functional: e.target.checked })
            }
            className="accent-purple-500"
            aria-label="Funktionale Cookies (Drittanbieter)"
          />
          <span className="text-sm">
            Funktional <span className="text-gray-400">(YouTube, Calendly)</span>
          </span>
        </label>
      </div>

      <button
        type="button"
        onClick={() => setShowDetails((v) => !v)}
        className="mt-3 text-xs text-purple-300 underline hover:text-purple-200 cursor-pointer"
        aria-expanded={showDetails}
      >
        {showDetails ? "Details ausblenden" : "Details zu Diensten anzeigen"}
      </button>

      {showDetails && (
        <ul className="mt-3 space-y-3 rounded-lg bg-gray-800 p-3 text-xs text-gray-200">
          {PROVIDER_DETAILS.map((p) => (
            <li key={p.name}>
              <p className="font-semibold text-white">{p.name}</p>
              <p>
                <span className="text-gray-400">Anbieter:</span> {p.provider}
              </p>
              <p>
                <span className="text-gray-400">Zweck:</span> {p.purpose}
              </p>
              <p>
                <span className="text-gray-400">Hinweis:</span> {p.transfer}
              </p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button type="button" className={buttonStyle} onClick={rejectAll}>
          Alle ablehnen
        </button>
        <button type="button" className={buttonStyle} onClick={saveSelection}>
          Auswahl speichern
        </button>
        <button type="button" className={buttonStyle} onClick={acceptAll}>
          Alle akzeptieren
        </button>
      </div>
    </div>
  );
}
