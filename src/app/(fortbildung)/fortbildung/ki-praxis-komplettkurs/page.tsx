import type { Metadata } from "next";
import CoursePlayer from "./_components/CoursePlayer";

export const metadata: Metadata = {
  title: "KI-Praxis Komplettkurs",
  description: "KI-Praxis Komplettkurs – interne Seite.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: undefined,
  },
};

export default function KiPraxisKomplettkursPage() {
  return <CoursePlayer />;
}
