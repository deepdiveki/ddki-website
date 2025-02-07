import AboutSection from "@/components/About/AboutSection";
import Team from "@/components/About/Team";
import Breadcrumb from "@/components/Breadcrumb";
import CallToAction from "@/components/CallToAction";
import Features from "@/components/DDKI-Toolbox/Tools";
import { Metadata } from "next";
import Clients from "@/components/About/Kunden";
import Uebersicht from "@/components/DDKI-Toolbox/Uebersicht";

export const metadata: Metadata = {
  title: "Über uns | DeepDive KI ToolBox und KI Fortbildungen",
  description: "Über uns DeepDive KI ToolBox und KI Fortbildungen",
  // other metadata
};

const ddki_toolbox = () => {
  return (
    <>
      <Breadcrumb pageTitle="DeepDiveKI ToolBox" />
      <Uebersicht />
      <Features />
      <CallToAction />
    </>
  );
};

export default ddki_toolbox;
