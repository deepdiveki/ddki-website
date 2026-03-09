import AboutSection from "@/components/About/AboutSection";
import Team from "@/components/About/Team";
import Breadcrumb from "@/components/Breadcrumb";
import CallToAction from "@/components/CallToAction";
import Features from "@/components/Home/Features";
import { Metadata } from "next";
import Clients from "@/components/About/Kunden";
import Kontakt from "@/components/KontaktSinglePage";
import CookieBanner from "@/components/CookieBanner";


export const metadata: Metadata = {
  title: "Kontakt – Sprechen Sie uns an",
  description:
    "Nehmen Sie Kontakt mit DeepDiveKI auf. Wir beraten Sie gerne zu DeepChat, KI-Schulbüro und Fortbildungen für Ihre Schule.",
};

const KontaktPage = () => {
  return (
    <>
      <Kontakt />
    </>
  );
};

export default KontaktPage;
