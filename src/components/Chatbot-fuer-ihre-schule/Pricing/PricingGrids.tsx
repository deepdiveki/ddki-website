import SectionTitle from "../../Common/SectionTitle";
import SinglePricing from "./SInglePricing"
// Beispiel für lokale Preisdaten
const pricingData = [
  {
    title: "Basis-Chatbot",
    price: "15 €",
    features: [
      "Individueller Schul-Chatbot",
      "Wöchentliches DB Update",
      "C5 -Framework",
      "Sprachmodelle: GPT-4o",
      "Unbegrenzte Unterhaltungen",
      "Kundensupport",


    ],
  },
  {
    title: "Premium-Chatbot",
    price: "TBA €",
    features: [
      "Chatbot mit Agent Funktionen",
      "Für 35 Sprachen",
      "C5 -Framework",
      "Sprachmodelle: GPT-4o",
      "Unbegrenzte Unterhaltungen",
      "Priorisierter Kundensupport"
    ],
  },
  {
    title: "Uni-Chatbot",
    price: "TBA €",
    features: [
      "Chatbot mit Agent für 3000+",
      "Für 70 Sprachen",
      "C5 -Framework",
      "Sprachmodelle: GPT-4o",
      "Unbegrenzte Unterhaltungen",
      "Priorisierter Kundensupport"
    ],
  },
];

const PricingGrids = () => {
  return (
    <div>
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <SectionTitle
          subTitle="Jetzt anfragen"
          title="Preise"
          paragraph="Entdecken Sie unsere flexiblen Chatbots – so individuell wie Ihr Bedarf! Neben Schulen bieten wir auch maßgeschneiderte Lösungen für Schulträger, Medienzentren, Bundesländer und Hochschulen an."
        />
        <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-2 lg:grid-cols-3">
          {pricingData &&
            pricingData.map((price, index) => (
              <SinglePricing price={price} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PricingGrids;