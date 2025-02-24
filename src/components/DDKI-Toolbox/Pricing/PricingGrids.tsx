import SectionTitle from "../../Common/SectionTitle";
import SinglePricing from "./SInglePricing"
// Beispiel für lokale Preisdaten
const pricingData = [
  {
    title: "Einzellizenz Toolbox",
    price: "4,99 €",
    features: [
      "Zugriff auf die DDKI ToolBox",
      "ChatGPT 4o Qualität",
      "Unterrichtsassistenten",
      "Konstante Weiterentwicklung",
      "Unbegrenzte Unterhaltungen",
      "Kundensupport",


    ],
  },
  {
    title: "Schullizenz Toolbox",
    price: "125 €",
    features: [
      "70 Lizenzen für Ihre Schule",
      "ChatGPT 4o Qualität",
      "Unterrichtsassistenten",
      "Konstante Weiterentwicklung",
      "Unbegrenzte Unterhaltungen",
      "Priorisierter Kundensupport"
    ],
  },
  {
    title: "Unilizenz Toolbox",
    price: "500 €",
    features: [
      "300 Lizenzen für Ihre Universität",
      "Für 70 Sprachen",
      "C5 -Framework und GPT-4o",
      "KI für Forschungsprojekte/API's",
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