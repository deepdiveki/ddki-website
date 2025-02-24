import CallToAction from "@/components/CallToAction";
import Features from "@/components/Home/Features";
import FeaturesList from "@/components/Home/FeaturesList";
import Hero from "@/components/Home/Hero";
import { Metadata } from "next";
import { integrations } from "../../../integrations.config";
import CookieBanner from "@/components/CookieBanner";
import Kontakt from "@/components/Kontakt";



export const metadata: Metadata = {
  title: "DeepDive KI ToolBox und KI Fortbildungen",
  description: "DeepDive KI ToolBox und KI Fortbildungen",
  // other metadata
};

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturesList />
      <Kontakt />
      <CallToAction />
      {/* <CookieBanner />; */}

    </>
  );
}
