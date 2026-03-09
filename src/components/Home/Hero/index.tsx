"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import ConnectorAnimation from "@/components/animations/ConnectorAnimation";
import Image from "next/image";
import Link from "next/link";
import AIEngineAnimation from "@/components/animations/AIEngineAnimation";

const Hero = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // AI Engine Animation wird direkt in der Komponente gerendert

  useEffect(() => {
    const letters = document.querySelectorAll(".animated-title span");

    const tl = gsap.timeline({ delay: 0.6 });

    tl.fromTo(
      letters,
      {
        y: 0,
        rotationX: 0,
        opacity: 1,
      },
      {
        y: -30,
        rotationX: 90,
        duration: 0.1,
        opacity: 0.8,
        ease: "power1.in",
        stagger: {
          each: 0.015,
          from: "center",
        },
      }
    ).to(
      letters,
      {
        y: 0,
        rotationX: 0,
        opacity: 1,
        duration: 0.15,
        ease: "back.out(2)",
        stagger: {
          each: 0.015,
          from: "center",
        },
        onComplete: () => {
          gsap.fromTo(
            ".circled-path",
            {
              strokeDasharray: 1000,
              strokeDashoffset: 1000,
            },
            {
              strokeDashoffset: 0,
              duration: 1.2,
              ease: "power2.inOut",
            }
          );
          gsap.fromTo(
            ".circled-path-secondary",
            {
              strokeDasharray: 1000,
              strokeDashoffset: 1000,
            },
            {
              strokeDashoffset: 0,
              duration: 1.2,
              ease: "power2.inOut",
              delay: 1.4,
            }
          );
        },
      },
      ">0.05"
    );
  }, []);

  return (
    <section
    id="home"
    className="relative z-10 overflow-visible pt-35 md:pt-40 xl:pt-45 pb-0"
    style={{ position: "relative" }}
  >

      <div className="relative z-1 mx-auto max-w-[900px] px-4 sm:px-8 xl:px-0">
        <div className="text-center">
          <span className="hero-subtitle-gradient hover:hero-subtitle-hover relative mb-5 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
            <Image
              src="/images/hero/icon-title.svg"
              alt="icon"
              width={16}
              height={16}
            />
            <span className="hero-subtitle-text">Für die Zukunft mit KI</span>
          </span>
          <h1 className="mb-6 text-3xl font-extrabold text-white sm:text-5xl xl:text-heading-1">
            DeepDiveKI – Ihr Partner für KI
          </h1>
          <p className="mx-auto mb-9 max-w-[500px] font-medium md:text-lg text-white">
            Wir bieten vier innovative KI-Produkte für Lehrende, Lernende und Schulen – perfekt aufeinander abgestimmt:
          </p>

        </div>

        {/* AI Engine Animation */}
        <div className="mt-2 relative z-20">
          <AIEngineAnimation />
        </div>
        
        {/* Abstand zwischen AI Engine und nächstem Abschnitt */}
        <div className="h-16 md:h-20"></div>


      </div>
     
    </section>
  );
};

export default Hero;