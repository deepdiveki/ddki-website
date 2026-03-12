import PricingGrids from "./PricingGrids";

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="relative z-20 scroll-mt-17 overflow-hidden pt-22.5 lg:pt-27.5 xl:pt-32.5"
    >
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        {/* Decorative background circle */}
        <div className="relative top-18">
          <div className="pointer-events-none absolute inset-0 -z-10 -my-55 overflow-hidden">
            <div
              className="absolute left-1/2 top-0 mx-auto aspect-square w-full max-w-[830px] -translate-x-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(140,113,246,0.08) 0%, transparent 70%)",
              }}
            />
          </div>
          <div className="pricing-circle absolute left-1/2 top-0 h-[830px] w-full max-w-[830px] -translate-x-1/2 rounded-full border border-border-tertiary bg-white/40 backdrop-blur-md"></div>
        </div>

        {/* Grid row */}
        <div className="relative -z-1 flex justify-center gap-7.5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="relative h-[250px] w-full max-w-[50px]">
              <div className="absolute inset-0 border-x border-border-tertiary/30" />
            </div>
          ))}
        </div>

        <PricingGrids />
      </div>
    </section>
  );
};

export default Pricing;
