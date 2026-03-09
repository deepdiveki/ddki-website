import ChooserLanding from "@/components/chooser/ChooserLanding";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DeepDive KI - Fortbildungen & Software für Schulen",
  description:
    "DeepDive KI bietet praxisnahe Lehrerfortbildungen und innovative Software-Lösungen wie DeepChat und KI-Schulbüro für Schulen.",
  openGraph: {
    title: "DeepDive KI - FFortbildungen & Software für Schulen",
    description:
      "Praxisnahe Lehrerfortbildungen und innovative Software-Lösungen wie DeepChat und KI-Schulbüro für Schulen.",
  },
};

export default function ChooserPage() {
  return <ChooserLanding />;
}
