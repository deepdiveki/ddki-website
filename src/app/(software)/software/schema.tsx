export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DeepDiveKI",
    url: "https://www.deepdive-ki.de",
    logo: "https://www.deepdive-ki.de/images/logo/logo.svg",
    description:
      "DSGVO-konforme KI-Tools und Fortbildungen für Schulen und Universitäten.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hamburg",
      addressCountry: "DE",
    },
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "German",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Was ist DeepDiveKI?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DeepDiveKI bietet DSGVO-konforme KI-Tools (DDKI Toolbox, KI-Chatbot) und praxisnahe Fortbildungen für Lehrkräfte an Schulen und Universitäten. Alle Produkte werden in Deutschland gehostet.",
        },
      },
      {
        "@type": "Question",
        name: "Sind die KI-Tools von DeepDiveKI DSGVO-konform?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja, alle DeepDiveKI-Produkte sind vollständig DSGVO-konform. Die Daten werden auf deutschen bzw. europäischen Servern verarbeitet und gespeichert.",
        },
      },
      {
        "@type": "Question",
        name: "Welche KI-Fortbildungen bietet DeepDiveKI an?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DeepDiveKI bietet einen Crash Kurs sowie DeepDive Module I–VI an. Die Fortbildungen sind praxisnah und für alle Schulformen geeignet – von der Grundschule bis zum Gymnasium.",
        },
      },
      {
        "@type": "Question",
        name: "Kann ich DeepDiveKI über das Startchancenprogramm finanzieren?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja, die Produkte von DeepDiveKI sind über das Startchancenprogramm förderfähig. Kontaktieren Sie uns für weitere Informationen zur Finanzierung.",
        },
      },
      {
        "@type": "Question",
        name: "Was ist die DDKI Toolbox?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Die DDKI Toolbox ist eine Sammlung DSGVO-konformer KI-Tools für den Unterricht, darunter DeepChat (KI-Chat), Bildgenerierung und verschiedene Sprachmodelle – speziell für den Einsatz in Schulen entwickelt.",
        },
      },
      {
        "@type": "Question",
        name: "Wie funktioniert der KI-Chatbot für Schulwebsites?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Der KI-Chatbot von DeepDiveKI wird auf Ihrer Schulwebsite eingebunden und beantwortet automatisch häufige Fragen von Eltern, Schülern und Lehrkräften. Er entlastet das Schulbüro und ist rund um die Uhr verfügbar.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SoftwareApplicationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DDKI Toolbox",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    description:
      "DSGVO-konforme KI-Tools für den Unterricht: DeepChat, Bildgenerierung, Sprachmodelle und mehr.",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
    },
    creator: {
      "@type": "Organization",
      name: "DeepDiveKI",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
