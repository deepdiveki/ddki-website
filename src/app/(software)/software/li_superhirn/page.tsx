import { Metadata } from "next";
import LiSuperhirnContent from "./LiSuperhirnContent";

export const metadata: Metadata = {
  title: "LI Superhirn – KI-Assistent für Lehrkräfte",
  description:
    "LI Superhirn ist der KI-Assistent für Lehrkräfte, Referendare und Studierende. Erstellen Sie Unterrichtsmaterial, planen Sie Stunden und erhalten Sie didaktische Unterstützung.",
};

export default function LiSuperhirnPage() {
  return <LiSuperhirnContent />;
}
