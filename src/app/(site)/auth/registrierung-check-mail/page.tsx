import AboutSection from "@/components/Auth/RegistrierungErfolg";
import Breadcrumb from "@/components/Breadcrumb";
import CallToAction from "@/components/CallToAction";
import { Metadata } from "next";
import FeaturesList from "@/components/Fortbildungen-Neu/Module";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "ChatBot für Ihre Schulwebsite | ChatBot für Ihre Schulwebsite",
  description: "ChatBot für Ihre Schulwebsite",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb pageTitle="Herzlich Willkommen bei DDKI!" />
      <Suspense fallback={<div>Loading...</div>}>
          <AboutSection />
        </Suspense>
    </>
  );
};

export default AboutPage;