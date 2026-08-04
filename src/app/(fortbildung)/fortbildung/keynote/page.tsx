import type { Metadata } from "next";
import KeynoteContent from "./_components/KeynoteContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "/fortbildung/keynote",
  },
  title: "Keynote – KI in der Bildung",
  description:
    "Inspirierende Keynotes rund um Künstliche Intelligenz in der Bildung – für Konferenzen, Schulveranstaltungen und pädagogische Tage.",
  openGraph: {
    title: "Keynote – KI in der Bildung | DeepDive Fortbildungen",
    description:
      "Inspirierende Vorträge zu KI im Klassenzimmer, Zukunft der Bildung und Datenschutz – individuell für Ihre Veranstaltung.",
  },
};

export default function KeynotePage() {
  return <KeynoteContent />;
}
