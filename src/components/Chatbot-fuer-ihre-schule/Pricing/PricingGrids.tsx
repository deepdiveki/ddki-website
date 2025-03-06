import SectionTitle from "../../Common/SectionTitle";
import SinglePricing from "./SInglePricing"; // Korrigierter Import

// Beispiel für lokale Preisdaten mit individuellen Links
const pricingData = [
  {
    title: "Basis-ChatBot",
    price: "14,99 €",
    features: [
      "Individueller Schul-ChatBot",
      "Wöchentliches DB Update",
      "C5 -Framework",
      "Sprachmodelle: GPT-4o",
      "Unbegrenzte Unterhaltungen",
      "Kundensupport",
    ],
    link: "/kontakt-chat-bot", // Link zur Bestellung
  },
  {
    title: "Premium-ChatBot",
    price: "29,99 €",
    features: [
      "ChatBot mit Agent Funktionen",
      "Für 35 Sprachen",
      "C5 -Framework",
      "Sprachmodelle: GPT-4o",
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
        <SectionTitle
          subTitle="Jetzt anfragen"
          title="Preise"
          paragraph="Entdecken Sie unsere flexiblen ChatBots – so individuell wie Ihr Bedarf! Neben Schulen bieten wir auch maßgeschneiderte Lösungen für Schulträger, Medienzentren, Bundesländer und Hochschulen an."
        />
        <div className="flex justify-center items-center gap-x-6">
          {pricingData.map((price, index) => (
            <SinglePricing price={price} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingGrids;