import TimSeite from "@/components/praesentation/tim-seite/TimSeite";
import type { Metadata } from "next";

/**
 * Interaktive Fortbildungsseite „Tim Seite“ (90 Minuten, KI-Tools Deep Dive).
 * Bewusst ohne Zugangscode: Teilnehmende öffnen die Seite auf dem eigenen
 * Gerät und kopieren dort Prompts. noindex kommt aus dem Layout.
 */
export const metadata: Metadata = {
  title: "Tim Seite · KI-Tools Deep Dive",
  description: "90 Minuten: Das richtige KI-Werkzeug für diese Aufgabe. Interaktive Fortbildung für Fachschaften mit Niveaus, Fachbeispielen und Quiz-Schmiede.",
};

export default function TimSeitePage() {
  return <TimSeite />;
}
