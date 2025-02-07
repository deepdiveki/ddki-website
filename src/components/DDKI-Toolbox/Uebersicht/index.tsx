import Image from "next/image";

const Uebersicht = () => {
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
              Die KI Toolbox für Schulen und Universitäten
            </h2>
            <p className="mb-9 font-medium">
              DeepDiveKI wurden von Lehrenden für Lehrende entwickelt. Mit unseren benutzerfreundlichen Tools können Lehrkräfte den Lernprozess effizienter gestalten, individuelle Förderung ermöglichen und kreative Lehrmethoden entwickeln. Ob zur Unterstützung bei Aufgaben, der Analyse von Lernergebnissen oder der Erstellung interaktiver Inhalte – unsere Plattform hilft dabei, den Unterricht moderner und zugänglicher zu machen.
            </p>

            <a
              href="https://ddki-chat.vercel.app/"
              className="hero-button-gradient inline-flex rounded-lg px-7 py-3 font-medium text-white duration-300 ease-in hover:opacity-80"
            >
              Jetzt Toolbox ausprobieren
            </a>
          </div>

          <div className="wow fadeInRight relative hidden aspect-[556/401] w-full xl:block">
            <Image src="/images/about/about.svg" alt="about" fill />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Uebersicht;
