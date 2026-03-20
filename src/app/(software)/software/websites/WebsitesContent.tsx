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
  <div className={cn("sw-card-glow row-span-1 rounded-3xl group/bento transition-all duration-300 shadow-sm p-6 w-full border border-purple-500/20 justify-between flex flex-col space-y-4 bg-white/5 backdrop-blur-sm relative overflow-hidden", className)}>
    {header && <div className="mb-4">{header}</div>}
    <div className="flex items-center gap-2">
      {icon && <span className="text-text-tertiary">{icon}</span>}
      <h3 className="font-sans font-semibold text-white text-xl">{title}</h3>
    </div>
    {description && (
      <p className="font-sans text-white/70 text-sm leading-relaxed">
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
    initial: { x: 0 },
    animate: { x: 10, rotate: 5, transition: { duration: 0.2 } },
  };
  const variantsSecond = {
    initial: { x: 0 },
    animate: { x: -10, rotate: -5, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-dot-white/[0.05] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-white/10 p-2 items-center space-x-2 bg-white/10"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0" />
        <div className="w-full bg-white/10 h-4 rounded-full" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-white/10 p-2 items-center space-x-2 w-3/4 ml-auto bg-white/10"
      >
        <div className="w-full bg-white/10 h-4 rounded-full" />
        <div className="w-full bg-white/10 h-4 rounded-full" />
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-white/10 p-2 items-center space-x-2 bg-white/10"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0" />
        <div className="w-full bg-white/10 h-4 rounded-full" />
      </motion.div>
    </motion.div>
  );
};

const SkeletonTwo = () => {
  const variants = {
    initial: { width: 0 },
    animate: { width: "100%", transition: { duration: 0.2 } },
    hover: { width: ["0%", "100%"], transition: { duration: 2 } },
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-dot-white/[0.05] flex-col space-y-2"
    >
      {arr.map((_, i) => (
        <motion.div
          key={"skelenton-two" + i}
          variants={variants}
          style={{ maxWidth: Math.random() * (100 - 40) + 40 + "%" }}
          className="flex flex-row rounded-full border border-white/10 p-2 items-center space-x-2 bg-white/10 w-full h-4"
        ></motion.div>
      ))}
    </motion.div>
  );
};

const SkeletonThree = () => {
  const variants = {
    initial: { backgroundPosition: "0 50%" },
    animate: { backgroundPosition: ["0, 50%", "100% 50%", "0 50%"] },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg bg-dot-white/[0.05] flex-col space-y-2"
      style={{
        background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};

const SkeletonFour = () => {
  const first = {
    initial: { x: 20, rotate: -5 },
    hover: { x: 0, rotate: 0 },
  };
  const second = {
    initial: { x: -20, rotate: 5 },
    hover: { x: 0, rotate: 0 },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-dot-white/[0.05] flex-row space-x-2"
    >
      <motion.div
        variants={first}
        className="h-full w-1/3 rounded-2xl bg-white/10 p-4 border border-white/10 flex flex-col items-center justify-center"
      >
        <img src="/images/logo/deepdiveki-logo.svg" alt="DDKI Logo" height="100" width="100" className="h-10 w-10 brightness-0 invert" />
        <p className="sm:text-sm text-xs text-center font-semibold text-white/60 mt-4">
          Änderungen Busfahrplan
        </p>
        <p className="border border-red-400/30 bg-red-500/20 text-red-400 text-xs rounded-full px-2 py-0.5 mt-4">
          Priorität
        </p>
      </motion.div>
      <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-white/10 p-4 border border-white/10 flex flex-col items-center justify-center">
        <img src="/images/logo/deepdiveki-logo.svg" alt="DDKI Logo" height="100" width="100" className="h-10 w-10 brightness-0 invert" />
        <p className="sm:text-sm text-xs text-center font-semibold text-white/60 mt-4">
          Sicherheitshinweise Datenschutz
        </p>
        <p className="border border-green-400/30 bg-green-500/20 text-green-400 text-xs rounded-full px-2 py-0.5 mt-4">
          Sensibel
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="h-full w-1/3 rounded-2xl bg-white/10 p-4 border border-white/10 flex flex-col items-center justify-center"
      >
        <img src="/images/logo/deepdiveki-logo.svg" alt="DDKI Logo" height="100" width="100" className="h-10 w-10 brightness-0 invert" />
        <p className="sm:text-sm text-xs text-center font-semibold text-white/60 mt-4">
          Stundenplan-
          änderungen
        </p>
        <p className="border border-orange-400/30 bg-orange-500/20 text-orange-400 text-xs rounded-full px-2 py-0.5 mt-4">
          Wichtig
        </p>
      </motion.div>
    </motion.div>
  );
};

const SkeletonFive = () => {
  const variants = {
    initial: { x: 0 },
    animate: { x: 10, rotate: 5, transition: { duration: 0.2 } },
  };
  const variantsSecond = {
    initial: { x: 0 },
    animate: { x: -10, rotate: -5, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-dot-white/[0.05] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-white/10 p-2 items-start space-x-2 bg-white/10"
      >
        <img src="/images/logo/deepdiveki-logo.svg" alt="DDKI Logo" height="100" width="100" className="h-10 w-10 brightness-0 invert" />
        <p className="text-xs text-white/60">
          Willkommen zum Chatbot des Gymnasium Alster
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-white/10 p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white/10"
      >
        <p className="text-xs text-white/60">Hi, eine Frage!</p>
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0" />
      </motion.div>
    </motion.div>
  );
};

const items = [
  {
    title: "Interaktive Inhalte",
    description: (<span className="text-sm">Framer Motion etc.</span>),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: null,
  },
  {
    title: "Neuste Frameworks",
    description: (<span className="text-sm">Next.js + Hosting in EU</span>),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: null,
  },
  {
    title: "Design",
    description: (<span className="text-sm">Lass uns gemeinsam deine Website designen.</span>),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: null,
  },
  {
    title: "Prioriserung der Inhalte",
    description: (<span className="text-sm">Deine Inhalte werden priorisiert.</span>),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: null,
  },
  {
    title: "KI-Schulbüro",
    description: (<span className="text-sm">Nutze die KI-Schulbüro-Funktion, um deine Fragen zu beantworten.</span>),
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
            <span className="sw-glass relative mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-primary-light">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1C12 1 12.7 5.3 14.7 7.3C16.7 9.3 21 10 21 10C21 10 16.7 10.7 14.7 12.7C12.7 14.7 12 19 12 19C12 19 11.3 14.7 9.3 12.7C7.3 10.7 3 10 3 10C3 10 7.3 9.3 9.3 7.3C11.3 5.3 12 1 12 1Z"/><path d="M19 15C19 15 19.4 17.1 20.1 17.9C20.9 18.6 23 19 23 19C23 19 20.9 19.4 20.1 20.1C19.4 20.9 19 23 19 23C19 23 18.6 20.9 17.9 20.1C17.1 19.4 15 19 15 19C15 19 17.1 18.6 17.9 17.9C18.6 17.1 19 15 19 15Z" opacity="0.7"/><circle cx="20" cy="5" r="1" opacity="0.5"/></svg>
              Websites
            </span>
            <h1 className="mb-6 text-display-sm font-bold -tracking-[1.2px] text-white lg:text-display-lg xl:text-display-xl">
              Websites für Schulen
            </h1>
            <p className="mx-auto mb-9 max-w-[600px] text-md font-light text-white/70">
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
              <div className="sw-card-glow group relative rounded-2xl border border-purple-500/20 bg-white/5 p-8 shadow-md backdrop-blur-sm transition-all duration-700 overflow-hidden">
                {/* Browser Header - Apple Style */}
                <div className="relative flex items-center space-x-2 mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-white/5 rounded-lg px-4 py-2 text-center border border-purple-500/20">
                      <span className="text-white/70 text-sm font-medium">www.dbrs-hannover.de</span>
                    </div>
                  </div>
                </div>

                {/* Website Content - Video */}
                <div className="relative rounded-xl overflow-hidden">
                  <video
                    src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/DBR%20Website%20KI-Schulbu%CC%88ro%20Einsatz.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
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

          {/* KI-Schulbüro iPhone Video */}
          <div className="relative mb-16">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-3 text-center text-3xl font-bold text-white lg:text-4xl">
                KI-Schulbüro in Aktion
              </h2>
              <p className="mb-8 text-center text-md font-light text-white/70">
                Für die heutige Mobile-First-Nutzung optimiert und angepasst.
              </p>
              <div className="sw-card-glow relative rounded-2xl border border-purple-500/20 bg-white/5 p-6 shadow-md backdrop-blur-sm transition-all duration-700 overflow-hidden">
                <div className="relative rounded-xl overflow-hidden">
                  <video
                    src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/KI-Schulbu%CC%88ro%20DBR%20Iphone.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kontakt Section */}
      <Kontakt />
    </>
  );
}
