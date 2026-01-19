import SectionTitle from "../../Common/SectionTitle";
import SinglePricing from "./SInglePricing";

const pricingData = [
  {
    title: "Einzellizenz DeepChat",
    price: "7,99 €",
    features: [
      "All-in-One KI-Chat",
      "Die besten Sprachmodelle",
      "Planung von Unterrichtseinheiten",
      "Stetig neue Funktionalitäten",
      "Datenschutzkonforme KI-Nutzung",
      "Priorisierter Kundensupport"
    ],
    link: "https://buy.stripe.com/4gw03IfBz8SF0xifYZ",
    patch: "basic",
  },
  {
    title: "Schullizenz DeepChat",
    price: "ab 59,99 €",
    priceNote: "abhängig von Kollegiumsgröße",
    features: [
      "Zugang für das gesamte Kollegium",
      "Die besten Sprachmodelle", 
      "Exklusives Feature-Development",
      "Feedback- und Feature-Umfragen",
      "Onboarding durch unser Team",
      "Premium-Support"
    ],
    link: "https://www.deepdive-ki.de/kontakt",
    patch: "school",
  },
];

const PricingGrids = () => {
  return (
    <div>
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <SectionTitle
          subTitle="Jetzt anfragen"
          title="Preise"
          paragraph="Entdecken Sie den DeepChat – Ihre intelligente, funktionsreiche und datenschutzkonforme KI-Anwendung. Mit einer Vielzahl an Funktionalitäten, perfekt für den Unterricht oder als administrative Unterstützung und garantiert mit höchsten Datenschutzstandards. Ob für Schulen, Schulträger, Medienzentren, Bundesländer oder Hochschulen – profitieren Sie von einem maßgeschneiderten DeepChat, die flexibel und sicher sind."
        />
        <div className="flex justify-center items-stretch gap-6 flex-wrap">
          {pricingData.map((price, index) => (
            <div key={index} className="w-[430px]">
              <SinglePricing price={price} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingGrids;