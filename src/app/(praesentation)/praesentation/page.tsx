import AccessGate from "@/components/praesentation/AccessGate";
import DeckIndex from "@/components/praesentation/DeckIndex";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Präsentationen",
};

export default function PraesentationIndex() {
  return (
    <AccessGate>
    <main className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm font-medium tracking-[0.14em] text-primary-dark uppercase">
        DeepDiveKI · Intern
      </p>
      <h1 className="mt-3 text-display-md font-semibold tracking-tight text-text-primary">
        Präsentationen
      </h1>
      <DeckIndex />
      <p className="mt-10 text-sm text-text-tertiary">
        Tipp: Bühne auf den Beamer, Presenter auf das Laptop-Display. Taste P
        öffnet den Presenter aus der Bühne heraus, F schaltet Vollbild.
      </p>
    </main>
    </AccessGate>
  );
}
