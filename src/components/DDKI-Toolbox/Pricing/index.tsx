import PricingGrids from "./PricingGrids";

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="relative z-20 scroll-mt-17 overflow-hidden pt-22.5 lg:pt-27.5 xl:pt-32.5"
    >
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <PricingGrids />
      </div>
    </section>
  );
};

export default Pricing;
