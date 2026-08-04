import type { Metadata } from "next";
import VideoKursContent from "./_components/VideoKursContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "/fortbildung/video-ki-komplettkurs",
  },
  title: "Video-KI-Komplettkurs für Lehrkräfte",
  description:
    "Der KI-Praxis Komplettkurs für Lehrkräfte: 65 Videos, 14 interaktive Tools und über 60 Materialien. KI verstehen, Unterricht planen und souverän mit Plagiaten umgehen.",
  openGraph: {
    title: "Video-KI-Komplettkurs | DeepDive Fortbildungen",
    description:
      "KI wirklich verstehen, Unterrichtseinheiten mit KI planen und souveräne Antworten auf Plagiate, Hausaufgaben und Klausuren entwickeln. Mit Zertifikat.",
  },
};

export default function VideoKiKomplettkursPage() {
  return <VideoKursContent />;
}
