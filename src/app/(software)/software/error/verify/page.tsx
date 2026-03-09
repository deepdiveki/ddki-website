import React from "react";
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Verifizierungsfehler | DeepDive-KI",
  description: "Es gab ein Problem bei der E-Mail-Verifizierung.",
};

interface ErrorPageProps {
  searchParams: Promise<{ code?: string }>;
}

export default async function ErrorPage({ searchParams }: ErrorPageProps) {
  const { code } = await searchParams;
  let message = "Ein unbekannter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.";

  switch (code) {
    case "missing_params":
      message = "Ungültiger Verifizierungslink. Es fehlen Parameter. Bitte verwenden Sie den Link aus Ihrer E-Mail.";
      break;
    case "invalid_token":
      message = "Ihr Verifizierungslink ist ungültig. Möglicherweise wurde er bereits verwendet oder ist fehlerhaft.";
      break;
    case "token_expired":
      message = "Ihr Verifizierungslink ist abgelaufen. Bitte fordern Sie einen neuen Link an.";
      break;
  }

  return (
    <>
      <Breadcrumb pageTitle="Verifizierung fehlgeschlagen" />
      <section className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-semibold mb-4">{message}</h1>
        <p className="mb-8">Schreiben Sie uns gerne unter <u>support@deepdive-ki.de</u>, sollte das Problem weiterhin bestehen.</p>
      </section>
    </>
  );
};
