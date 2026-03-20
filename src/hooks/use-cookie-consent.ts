"use client";

import { useState, useEffect } from "react";

/** Returns whether the user has consented to functional cookies (e.g. YouTube). */
export function useCookieConsent() {
  const [hasFunctionalConsent, setHasFunctionalConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const readConsent = () => {
      try {
        const stored = typeof window !== "undefined" ? localStorage.getItem("cookieConsent") : null;
        if (stored) {
          const parsed = JSON.parse(stored);
          setHasFunctionalConsent(parsed.functional === true);
        } else {
          setHasFunctionalConsent(false);
        }
      } catch {
        setHasFunctionalConsent(false);
      }
    };

    const handleUpdate = (e: Event) => {
      const consent = (e as CustomEvent).detail;
      setHasFunctionalConsent(consent?.functional === true);
    };

    readConsent();
    window.addEventListener("cookieConsentUpdated", handleUpdate);
    return () => window.removeEventListener("cookieConsentUpdated", handleUpdate);
  }, []);

  return hasFunctionalConsent;
}
