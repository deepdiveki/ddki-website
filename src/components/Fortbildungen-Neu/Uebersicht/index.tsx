import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="overflow-hidden">
      <div className="relative mx-auto max-w-[1170px] px-4 py-20 sm:px-8 lg:py-25 xl:px-0">
        <div className="about-divider-gradient absolute bottom-0 left-0 h-[1px] w-full"></div>

        <div className="flex flex-wrap justify-between gap-11 xl:flex-nowrap">
          <div className="wow fadeInLeft w-full max-w-[570px]">
            <span className="hero-subtitle-text mb-5 block font-semibold">
              Unsere KI Fortbildungen
            </span>

            <h2 className="mb-5 text-2xl font-extrabold text-white sm:text-4xl xl:text-heading-2">
            Crash Kurs und DeepDive Module I-VI
            </h2>
            <p className="mb-9 font-medium">
            In unseren Fortbildungen stärken die Teilnehmerinnen und Teilnehmer ihre Kompetenz im Umgang mit Künstlicher Intelligenz. Sie erhalten praktische und direkt anwendbare Unterrichtsmethoden/KI - Tools sowie Material für die Verwendung von KI. Die Teilnehmerinnen und Teilnehmer lernen unterschiedliche KI-basierte Werkzeuge kennen und erproben eine neue Form von Team-Teaching. Es gibt eine Keynote und neun unterschiedliche Fortbildungen mit verschiedenen inhaltlichen Ausrichtungen wie z.B. Unterrichtseinheiten erstellen, Umgang mit Plagiaten und Unterrichtsdurchführung mit KI.
            </p>
            <p className="mb-9 font-medium">
            Unser KI-Chat <strong>DeepChat</strong> steht allen KuK während der Fortbildung kostenlos zur Verfügung. Damit können Sie praktische Anwendungen datenschutzkonform und mit bester Performance direkt in der Fortbildung ausprobieren.
            </p>

            <a
              href="/fortbildungen#ddki-toolbox"
              className="hero-button-gradient inline-flex rounded-lg px-7 py-3 font-medium text-white duration-300 ease-in hover:opacity-80"
            >
              Zur Fortbildungsübersicht
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

export default AboutSection;
