const HeroStatic = () => {
  return (
    <section
      id="home"
      className="relative z-10 overflow-visible pb-0 pt-35 md:pt-40 xl:pt-45"
    >
      <div className="relative z-1 mx-auto max-w-[900px] px-4 sm:px-8 xl:px-0">
        <div className="text-center">
          <span className="relative mb-5 inline-flex items-center gap-2 rounded-full border border-border-tertiary bg-white px-4.5 py-2 text-sm font-medium text-primary-darker shadow-xs">
            Fortbildungen
          </span>
          <h1 className="mb-6 text-display-sm font-light -tracking-[1.2px] text-text-primary lg:text-display-lg xl:text-display-xl">
            KI-Fortbildungen für Lehrkräfte
          </h1>
          <p className="mx-auto mb-9 max-w-[500px] text-md font-light text-text-secondary">
            Stärken Sie Ihre KI-Kompetenz für den Unterricht – praxisnah und sofort anwendbar: vom Crashkurs bis zu den Vertiefungen in den Deep‑Dive‑Modulen. Gerne kommen wir auch für eine SCHILF oder einen pädagogischen Tag zu Ihnen.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroStatic;
