import AboutSection from "@/components/About/AboutSection";
import Team from "@/components/About/Team";
import Breadcrumb from "@/components/Breadcrumb";
import CallToAction from "@/components/CallToAction";
import Chatbot from "@/components/Chatbot-fuer-ihre-schule/Chatbot";
import Features from "@/components/Chatbot-fuer-ihre-schule/Chatbot";
import HeroChatbot from "@/components/Chatbot-fuer-ihre-schule/Hero";
import Hero from "@/components/Home/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ChatBot für Ihre Schulwebsite | ChatBot für Ihre Schulwebsite",
  description: "ChatBot für Ihre Schulwebsite",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb pageTitle="ChatBot für Ihre Schulwebsite" />
      <HeroChatbot />
      <Chatbot />
      <Team />
      <CallToAction />
    </>
  );
};

export default AboutPage;
