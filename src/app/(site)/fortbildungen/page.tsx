import AboutSection from "@/components/Fortbildungen-Neu/Uebersicht";
import Breadcrumb from "@/components/Breadcrumb";
import CallToAction from "@/components/CallToAction";
import { Metadata } from "next";
import FeaturesList from "@/components/Fortbildungen-Neu/Module";

export const metadata: Metadata = {
  title: "ChatBot für Ihre Schulwebsite | ChatBot für Ihre Schulwebsite",
  description: "ChatBot für Ihre Schulwebsite",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb pageTitle="DeepDiveKI Fortbildungen" />
      <AboutSection />
      <FeaturesList />
      <CallToAction />
    </>
  );
};

export default AboutPage;