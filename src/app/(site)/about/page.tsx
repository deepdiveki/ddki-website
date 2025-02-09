import AboutSection from "@/components/About/AboutSection";
import Team from "@/components/About/Team";
import Breadcrumb from "@/components/Breadcrumb";
import CallToAction from "@/components/CallToAction";
import Features from "@/components/Home/Features";
import { Metadata } from "next";
import Clients from "@/components/About/Kunden";
import Kontakt from "@/components/Kontakt";

export const metadata: Metadata = {
  title: "Über uns | DeepDive KI ToolBox und KI Fortbildungen",
  description: "Über uns DeepDive KI ToolBox und KI Fortbildungen",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb pageTitle="Über uns" />
      <AboutSection />
      <Team />
      <Features />
      <Clients />
      <Kontakt />
      <CallToAction />
    </>
  );
};

export default AboutPage;
