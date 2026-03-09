import { Metadata } from "next";
import EscapeGameContent from "./EscapeGameContent";

export const metadata: Metadata = {
  title: "KI Escape Game – Spielerisch KI entdecken",
  description:
    "Erleben Sie unser interaktives KI Escape Game für Schulen. Schülerinnen und Schüler lösen Rätsel rund um künstliche Intelligenz und lernen spielerisch KI-Konzepte kennen.",
};

export default function EscapeGamePage() {
  return <EscapeGameContent />;
}
