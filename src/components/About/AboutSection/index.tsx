"use client"
import dynamic from "next/dynamic";
const DeepChatAnimation = dynamic(() => import('@/components/animations/DeepChatAnimation1'), { ssr: false });


const AboutSection = () => {
  return (
    <section className="overflow-hidden">
      <div className="relative mx-auto max-w-[1170px] px-4 py-20 sm:px-8 lg:py-25 xl:px-0">
        <div className="about-divider-gradient absolute bottom-0 left-0 h-[1px] w-full"></div>

        <div className="flex flex-wrap justify-between gap-11 xl:flex-nowrap">
          <div className="wow fadeInLeft w-full max-w-[570px]">
            <span className="hero-subtitle-text mb-5 block font-semibold">
              Über unsere Plattform
            </span>

            <h2 className="mb-5 text-2xl font-extrabold text-white sm:text-4xl xl:text-heading-2">
              DeepDiveKI als Partner für Schulen und Universitäten
            </h2>
            <p className="mb-9 font-medium">
              DeepDiveKI wurden von Lehrenden für Lehrende entwickelt. Mit unserem benutzerfreundlichen DeepChat können Lehrkräfte den Lernprozess effizienter gestalten, individuelle Förderung ermöglichen und kreative Lehrmethoden entwickeln. Ob zur Unterstützung bei Aufgaben, der Analyse von Lernergebnissen oder der Erstellung interaktiver Inhalte.
            </p>

            <a
              href="https://toolbox.deepdive-ki.de/"
              className="hero-button-gradient inline-flex rounded-lg px-7 py-3 font-medium text-white duration-300 ease-in hover:opacity-80"
            >
              DeepChat ausprobieren 
            </a>
          </div>

          <div className="wow fadeInRight relative hidden xl:block w-full max-w-[556px]">
            <DeepChatAnimation />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;