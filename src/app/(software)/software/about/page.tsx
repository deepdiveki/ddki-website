import AboutSection from "@/components/About/AboutSection";
import Team from "@/components/About/Team";
import Breadcrumb from "@/components/Breadcrumb";
import CallToAction from "@/components/CallToAction";
import Features from "@/components/Home/Features";
import { Metadata } from "next";
import Clients from "@/components/About/ClientsLazy";
import Kontakt from "@/components/Kontakt";
import Produktvorschau from "@/components/About/Produktvorschau";
import UserFeedback from "@/components/About/UserFeedback";
import HeroStaticAbout from "@/components/HeroStaticAbout";


export const metadata: Metadata = {
  title: "DeepDiveKI – KI-Tools & Fortbildungen für Schulen",
  description:
    "DeepDiveKI bietet Schulen innovative KI-Tools (DeepChat, KI-Schulbüro) und Fortbildungen für Lehrkräfte. Entdecken Sie jetzt, wie KI Ihren Schulalltag bereichern kann!",
  alternates: {
    canonical: "https://www.deepdive-ki.de/about",
  },
};

const AboutPage = () => {
  return (
    <>
      <HeroStaticAbout />
      <AboutSection />
      <Team />
      <UserFeedback/>
      <Features />
      <Clients />
      <Kontakt />
      <CallToAction />
    </>
  );
};

export default AboutPage;
