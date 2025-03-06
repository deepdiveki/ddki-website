"use client";

import Image from "next/image";
import OfferItem from "./OfferItem";

type Price = {
  title: string;
  price: string;
  features: string[];
  link: string; // NEU: Link für den Buchungs-Button
};

const SinglePricing = ({ price }: { price: Price }) => {
  return (
    <div className="wow fadeInUp pricing-item-border relative z-20 overflow-hidden rounded-3xl bg-dark px-8 pb-10 pt-12.5 xl:px-10">
      <span className="absolute right-9 top-9">
        
      </span>

      <h3 className="mb-5.5 text-heading-6 font-semibold text-white">
        {price.title}
      </h3>

      <div className="flex items-center gap-3.5">
        <h2 className="pricing-gradient-text text-custom-1 font-bold">
          {price.price}
        </h2>

        <p className="font-medium">
          / monatlich <br />
          Grundgebühr
        </p>
      </div>

      <div className="pricing-gradient-divider my-10 h-[1px] w-full"></div>

      {/* Feature-Liste */}
      <ul className="flex flex-col gap-4">
        {price.features.map((feature, index) => (
          <OfferItem key={index} text={feature} />
        ))}
      </ul>

      {/* Dynamischer Buchungs-Link */}
      <a
        href={price.link}
        target="_blank"
        rel="noopener noreferrer"
        className="pricing-button-gradient relative mt-11 flex w-full items-center justify-center gap-1.5 rounded-lg p-3 font-medium text-white transition-all duration-300 ease-in-out hover:shadow-button"
      >
        Jetzt buchen
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.8992 7.5999L9.72422 2.3499C9.49922 2.1249 9.14922 2.1249 8.92422 2.3499C8.69922 2.5749 8.69922 2.9249 8.92422 3.1499L13.1242 7.4249H2.49922C2.19922 7.4249 1.94922 7.6749 1.94922 7.9749C1.94922 8.2749 2.19922 8.5499 2.49922 8.5499H13.1742L8.92422 12.8749C8.69922 13.0999 8.69922 13.4499 8.92422 13.6749C9.02422 13.7749 9.17422 13.8249 9.32422 13.8249C9.47422 13.8249 9.62422 13.7749 9.72422 13.6499L14.8992 8.3999C15.1242 8.1749 15.1242 7.8249 14.8992 7.5999Z"
            fill="white"
          />
        </svg>
      </a>

      <p className="mt-4 text-center text-sm">Unverbindlich Anfragen</p>

      {/* Hintergrund-Elemente */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="absolute bottom-0 left-0 -z-1 aspect-[370/553] w-full">
          <Image
            src="/images/blur/blur-16.svg"
            alt="blur"
            fill
            className="max-w-none"
          />
        </span>
        <span className="absolute left-0 top-0 -z-1 aspect-[370/350] w-full">
          <Image
            src="/images/blur/blur-17.svg"
            alt="blur"
            fill
            className="max-w-none"
          />
        </span>
      </div>
    </div>
  );
};

export default SinglePricing;