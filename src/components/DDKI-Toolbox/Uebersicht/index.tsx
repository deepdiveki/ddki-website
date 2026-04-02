import Image from "next/image";

const Uebersicht = () => {
  return (
    <section className="overflow-hidden">
      <div className="relative mx-auto max-w-[1170px] px-4 py-20 sm:px-8 lg:py-25 xl:px-0">
        <div className="sw-accent-line absolute bottom-0 left-0 h-px w-full"></div>

        <div className="flex flex-wrap justify-between gap-11 xl:flex-nowrap">
          <div className="w-full max-w-[570px]">
            <span className="mb-5 block font-semibold text-purple-light">
              Über unsere Plattform
            </span>

            <h2 className="mb-5 text-display-sm -tracking-[0.96px] text-white lg:text-display-lg">
              Die KI Toolbox für Schulen und Universitäten
            </h2>
            <p className="mb-9 text-md font-light text-white/70">
              DeepDiveKI wurden von Lehrenden für Lehrende entwickelt. Mit unseren benutzerfreundlichen Tools können Lehrkräfte den Lernprozess effizienter gestalten, individuelle Förderung ermöglichen und kreative Lehrmethoden entwickeln. Ob zur Unterstützung bei Aufgaben, der Analyse von Lernergebnissen oder der Erstellung interaktiver Inhalte. Unsere Plattform hilft dabei, den Unterricht moderner und zugänglicher zu machen.
            </p>

            <a
              href="https://www.deepdive-ki.de/software/ddki-toolbox"
              className="inline-flex rounded-lg bg-purple px-7 py-3 font-medium text-white duration-300 ease-in hover:bg-purple-light"
            >
              Jetzt Toolbox ausprobieren
            </a>
          </div>

          <div className="relative hidden aspect-[556/401] w-full xl:block">
            <Image src="/images/about/about.svg" alt="about" fill />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Uebersicht;
