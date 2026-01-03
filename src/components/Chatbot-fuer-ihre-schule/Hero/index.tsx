"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import ChatbotIphoneAnimation from "@/components/ChatbotIphoneAnimation";

const HeroChatbot = () => {
  
  return (
    <section className="overflow-hidden">
      <div className="relative mx-auto max-w-[1170px] px-4 py-20 sm:px-8 lg:py-25 xl:px-0">
        <div className="about-divider-gradient absolute bottom-0 left-0 h-[1px] w-full"></div>

        <div className="flex flex-wrap justify-between gap-11 xl:flex-nowrap">
          {/* Linker Bereich */}
          <div className="wow fadeInLeft w-full max-w-[570px]">
          <span className="hero-subtitle-text mb-5 block font-semibold">
              KI-Schulbüro
            </span>

            <h1 className="mb-6 text-3xl font-extrabold text-white sm:text-5xl xl:text-heading-1">
              Das KI-Schulbüro auf Ihrer Website
            </h1>
            <p className="mb-9 font-medium">
            Mit unserem KI-Schulbüro haben Sie die Möglichkeit, in Ihrer Schulwebsite einen KI-Chatbot zu integrieren. Damit verbessern Sie den Informationsfluss zu Ihren Schülerinnen und Schülern, Eltern und Lehrkräften. Das KI-Schulbüro beantwortet Fragen zu Öffnungszeiten, Terminen, Anmeldungen, Vertretungsplänen und vielem mehr. So entlasten Sie Ihr Schulbüro und Ihre Verwaltung und bieten gleichzeitig einen modernen Service für Ihre Schulgemeinschaf - rund um die Uhr verfügbar und in 32 Sprachen.
            </p>

            <a
              href="https://www.deepdive-ki.de/kontakt-chat-bot"
              className="hero-button-gradient inline-flex rounded-lg px-7 py-3 font-medium text-white duration-300 ease-in hover:opacity-80"
            >
              Jetzt Kontakt aufnehmen
            </a>
          </div>

          {/* Rechter Bereich */}
          <div className="wow fadeInRight relative hidden aspect-[556/401] w-full xl:block">
  <ChatbotIphoneAnimation />
</div>
        </div>

        {/* Chatbot-Einbindung */}
        
      </div>
    </section>
  );
};

export default HeroChatbot;