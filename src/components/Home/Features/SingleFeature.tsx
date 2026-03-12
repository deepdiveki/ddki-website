import { Feature } from "@/types/feature";
import Image from "next/image";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  return (
    <div className="sw-card-glow group relative overflow-hidden rounded-2xl border border-transparent px-4 py-8 text-center transition-all duration-300 hover:border-border-tertiary hover:bg-white/70 hover:backdrop-blur-sm sm:py-10 lg:px-8 xl:px-13 xl:py-15">
      {/* Animation oder Icon */}
      <span className="relative mx-auto mb-8 inline-flex h-20 w-full max-w-[80px] items-center justify-center rounded-full border border-border-tertiary bg-white/70 shadow-sm backdrop-blur-sm transition-shadow duration-300 group-hover:shadow-md">
        {feature.animationComponent ? (
          feature.animationComponent
        ) : (
          <Image src={feature.icon} alt="icon" width={32} height={32} />
        )}
      </span>

      {/* Titel und Beschreibung */}
      <h3 className="mb-4 text-lg font-semibold text-text-primary">{feature.title}</h3>
      <p className="text-sm font-light text-text-secondary">{feature.description}</p>
    </div>
  );
};

export default SingleFeature;
