import ButtonLink from "@/components/ui/ButtonLink";
import { ChevronLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center gap-20 overflow-hidden bg-background-secondary py-10">
      <div className="relative z-30 mx-auto w-full max-w-142.5 px-4 text-center lg:px-0">
        <h1 className="text-3xl -tracking-[0.96px] text-text-primary lg:text-display-lg">
          Seite nicht gefunden
        </h1>
        <p className="mt-3 text-base font-light text-text-secondary lg:text-lg">
          Die angeforderte Seite existiert leider nicht oder wurde verschoben.
          Bitte überprüfen Sie die URL.
        </p>
        <ButtonLink href="/" className="mt-9">
          <ChevronLeft className="size-6" />
          Zur Startseite
        </ButtonLink>
      </div>

      <div className="w-4/5 lg:w-[815.8px]">
        <svg
          viewBox="0 0 816 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M732.2 0H768.2V280H732.2V0ZM614.2 179.2H815.8V211.6H614.2V179.2ZM720.2 0H757.8L621.8 211.6H601V182.8L720.2 0Z"
            fill="url(#paint0_linear)"
          />
          <path
            d="M408.4 292.8C381.2 292.8 358.8 286.267 341.2 273.2C323.867 259.867 310.933 242.133 302.4 220C294.133 197.867 290 173.2 290 146C290 126 292.267 107.2 296.8 89.6C301.6 71.7333 308.8 56.1333 318.4 42.8C328.267 29.4667 340.667 19.0667 355.6 11.6C370.533 3.86666 388.133 0 408.4 0C428.667 0 446.133 3.86666 460.8 11.6C475.733 19.0667 488 29.4667 497.6 42.8C507.467 56.1333 514.667 71.7333 519.2 89.6C524 107.2 526.4 126 526.4 146C526.4 173.2 522.133 197.867 513.6 220C505.333 242.133 492.4 259.867 474.8 273.2C457.467 286.267 435.333 292.8 408.4 292.8ZM408.4 258C425.467 258 439.867 253.067 451.6 243.2C463.6 233.067 472.667 219.6 478.8 202.8C484.933 186 488 167.067 488 146C488 125.2 484.933 106.4 478.8 89.6C472.667 72.8 463.6 59.4667 451.6 49.6C439.867 39.7333 425.467 34.8 408.4 34.8C391.333 34.8 376.8 39.7333 364.8 49.6C352.8 59.4667 343.733 72.8 337.6 89.6C331.467 106.4 328.4 125.2 328.4 146C328.4 167.067 331.467 186 337.6 202.8C343.733 219.6 352.8 233.067 364.8 243.2C376.8 253.067 391.333 258 408.4 258Z"
            fill="url(#paint1_linear)"
          />
          <path
            d="M131.2 0H167.2V280H131.2V0ZM13.2 179.2H214.8V211.6H13.2V179.2ZM119.2 0H156.8L20.8 211.6H0V182.8L119.2 0Z"
            fill="url(#paint2_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="708.4"
              y1="0"
              x2="708.4"
              y2="280"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#C6BDFA" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear"
              x1="408.2"
              y1="0"
              x2="408.2"
              y2="292.8"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#C6BDFA" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint2_linear"
              x1="107.4"
              y1="0"
              x2="107.4"
              y2="280"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#C6BDFA" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
