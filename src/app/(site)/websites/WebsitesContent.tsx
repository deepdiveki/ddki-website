"use client";

import React from "react";
import Kontakt from "@/components/Kontakt";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Inline BentoGrid components
const BentoGrid = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("grid grid-cols-1 md:grid-cols-3 auto-rows-[217px] gap-10 max-w-7xl mx-auto p-6", className)}>
    {children}
  </div>
);

const BentoGridItem = ({ className, title, description, header, icon }: {
  className?: string;
  title: string;
  description: React.ReactNode;
  header: React.ReactNode;
  icon?: React.ReactNode;
}) => (
  <div className={cn("row-span-1 rounded-3xl group/bento hover:shadow-2xl transition-all duration-300 shadow-xl dark:shadow-none p-6 w-full border border-purple-500/20 justify-between flex flex-col space-y-4 bg-gradient-to-br from-gray-900/98 to-gray-800/98 hover:scale-[1.02] hover:border-purple-500/40 hover:shadow-purple-500/20 relative overflow-hidden", className)}>
    {header && <div className="mb-4">{header}</div>}
    <div className="flex items-center gap-2">
      {icon && <span className="text-neutral-600 dark:text-neutral-300">{icon}</span>}
      <h3 className="font-sans font-bold text-white text-xl">{title}</h3>
    </div>
    {description && (
      <p className="font-sans text-neutral-700 dark:text-neutral-200 text-sm leading-relaxed">
        {description}
      </p>
    )}
  </div>
);

function BentoGridThirdDemo() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[22rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
      </motion.div>
    </motion.div>
  );
};

const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      {arr.map((_, i) => (
        <motion.div
          key={"skelenton-two" + i}
          variants={variants}
          style={{
            maxWidth: Math.random() * (100 - 40) + 40 + "%",
          }}
          className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4"
        ></motion.div>
      ))}
    </motion.div>
  );
};

const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
      style={{
        background:
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};

const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
    >
      <motion.div
        variants={first}
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <img
          src="/images/logo/deepdiveki-logo.svg"
          alt="DDKI Logo"
          height="100"
          width="100"
          className="h-10 w-10"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Änderungen Busfahrplan
        </p>
        <p className="border border-red-500 bg-red-100 dark:bg-red-900/20 text-red-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Priorität
        </p>
      </motion.div>
      <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
        <img
          src="/images/logo/deepdiveki-logo.svg"
          alt="DDKI Logo"
          height="100"
          width="100"
          className="h-10 w-10"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Sicherheitshinweise Datenschutz
        </p>
        <p className="border border-green-500 bg-green-100 dark:bg-red-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Sensibel
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <img
          src="/images/logo/deepdiveki-logo.svg"
          alt="DDKI Logo"
          height="100"
          width="100"
          className="h-10 w-10"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Stundenplan-
          änderungen
        </p>
        <p className="border border-orange-500 bg-orange-100 dark:bg-red-900/20 text-orange-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Wichtig
        </p>
      </motion.div>
    </motion.div>
  );
};

const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2  items-start space-x-2 bg-white dark:bg-black"
      >
        <img
          src="/images/logo/deepdiveki-logo.svg"
          alt="DDKI Logo"
          height="100"
          width="100"
          className="h-10 w-10"
        />
        <p className="text-xs text-neutral-500">
          Willkommen zum Chatbot des Gymnasium Alster
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <p className="text-xs text-neutral-500">Hi, eine Frage!</p>
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0" />
      </motion.div>
    </motion.div>
  );
};

const items = [
  {
    title: "Interaktive Inhalte",
    description: (
      <span className="text-sm">
        Framer Motion etc.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: null,
  },
  {
    title: "Neuste Frameworks",
    description: (
      <span className="text-sm">
        Next.js + Hosting in EU
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: null,
  },
  {
    title: "Design",
    description: (
      <span className="text-sm">
        Lass uns gemeinsam deine Website designen.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: null,
  },
  {
    title: "Prioriserung der Inhalte",
    description: (
      <span className="text-sm">
        Deine Inhalte werden priorisiert.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: null,
  },
  {
    title: "KI-Schulbüro",
    description: (
      <span className="text-sm">
        Nutze die KI-Schulbüro-Funktion, um deine Fragen zu beantworten.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: null,
  },
];

export default function WebsitesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative z-10 overflow-hidden pt-35 md:pt-40 xl:pt-45">
        <div className="mx-auto max-w-[900px] px-4 sm:px-8 xl:px-0">
          <div className="text-center">
            <span className="hero-subtitle-gradient hover:hero-subtitle-hover relative mb-5 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
              <Image src="/images/hero/icon-title.svg" alt="icon" width={16} height={16} />
              <span className="hero-subtitle-text">Websites</span>
            </span>
            <h1 className="mb-6 text-3xl font-extrabold text-white sm:text-5xl xl:text-heading-1">
              Websites für Schulen
            </h1>
            <p className="mx-auto mb-9 max-w-[600px] font-medium md:text-lg text-white">
              Professionelle Schulwebsites mit modernem Design und benutzerfreundlicher Bedienung. 
              Responsive Layouts und Content-Management-Systeme für eine effektive Online-Präsenz + KI-Schulbüro.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 overflow-hidden pb-20 lg:pb-25 xl:pb-30">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-8 xl:px-0">
          {/* Zentrale Website-Darstellung */}
          <div className="relative mb-16">
            <div className="mx-auto max-w-4xl">
              {/* Website Mockup */}
              <div className="group relative bg-gradient-to-br from-gray-900/98 via-gray-800/95 to-gray-900/98 border border-purple-500/30 rounded-2xl p-8 shadow-2xl hover:shadow-purple-500/20 transition-all duration-700 hover:scale-[1.02] overflow-hidden">
                {/* Live Website Link */}
                <div className="absolute top-4 right-4 z-20">
                  <a 
                    href="https://schulwebsites-template.osc-fr1.scalingo.io" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-500 hover:scale-105 transform shadow-lg hover:shadow-purple-500/25"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                
                {/* Browser Header - Apple Style */}
                <div className="relative flex items-center space-x-2 mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gradient-to-r from-gray-800/95 to-gray-700/95 backdrop-blur-sm rounded-lg px-4 py-2 text-center border border-gray-600/30 shadow-inner">
                      <span className="text-gray-100 text-sm font-medium">www.gymnasium-alster.de</span>
                    </div>
                  </div>
                </div>
                
                {/* Website Content - Echte Website */}
                <div className="relative rounded-xl overflow-hidden">
                  <img 
                    src="/images/website/Mockup Gymnasium Alster.png" 
                    alt="Gymnasium Alster Website Mockup" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bento Grid Features */}
          <div className="mb-16">
            <BentoGridThirdDemo />
          </div>
        </div>
      </section>

      

      {/* Kontakt Section - Verwendet vorhandene Komponente */}
      <Kontakt />
    </>
  );
}
