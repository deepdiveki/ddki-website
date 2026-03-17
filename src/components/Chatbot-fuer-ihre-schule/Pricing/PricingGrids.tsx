import SectionTitle from "../../Common/SectionTitle";
import SinglePricing from "./SInglePricing"; // Korrigierter Import

// Beispiel für lokale Preisdaten mit individuellen Links
const pricingData = [
  {
    title: "KI-Schulbüro",
    price: "Auf Anfrage",
    features: [
      "Individuelles KI-Schulbüro",
      "Tägliches DB Update",
      "Die besten Sprachmodelle",
      "Unbegrenzte Unterhaltungen",
      "Kundensupport",
    ],
    link: "/kontakt-chat-bot", // Link zur Bestellung
  },
  {
    title: "KI-Schulbüro Premium",
    price: "Auf Anfrage",
    features: [
      "KI-Schulbüro mit Kuration",
      "Für 35 Sprachen",
      "Die besten Sprachmodelle",
      "Unbegrenzte Unterhaltungen",
      "Priorisierter Kundensupport",
    ],
    link: "kontakt-chat-bot",
  },
];

const PricingGrids = () => {
  return (
    <div>
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <SectionTitle variant="software"
          subTitle="Jetzt anfragen"
          title="Preise"
          paragraph="Entdecken Sie unser KI-Schulbüro – so individuell wie Ihr Bedarf! Neben Schulen bieten wir auch maßgeschneiderte Lösungen für Schulträger, Medienzentren, Bundesländer und Hochschulen an."
        />
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {pricingData.map((price, index) => (
            <SinglePricing price={price} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingGrids;