import CallToAction from "@/components/CallToAction";
import Features from "@/components/Home/Features";
import FeaturesList from "@/components/Home/FeaturesList";
import Hero from "@/components/Home/Hero";
import SchulFeedback from "@/components/Home/SchulFeedback";
import { Metadata } from "next";
import { integrations } from "../../../integrations.config";
import CookieBanner from "@/components/CookieBanner";
import Kontakt from "@/components/Kontakt";

// import FloatingChatbotWidget from "@/components/FloatingChatbotWidget";


export const metadata: Metadata = {
  title: "DeepDive KI: DeepChat, KI-Schulbüro und KI Fortbildungen",
  description: "DeepDive KI: DeepChat, KI-Schulbüro und KI Fortbildungen",
  // other metadata
};

export default function Home() {
  return (
    <>
      <Hero />
      
      <Features />
      <SchulFeedback />
      <Kontakt />
      <CallToAction />
      {/* <CookieBanner />; */}

      {/* Chatbot Widget */}
      {/* <FloatingChatbotWidget
        chatbotName="DeepDiveKI-Chatbot"
        primaryColor="#8646F4"
        position="bottom-right"
      /> */}
    </>
  );
}
