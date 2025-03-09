import SectionTitle from "../../Common/SectionTitle";
import SinglePricing from "./SInglePricing"; // Korrigierter Import

// Beispiel für lokale Preisdaten
const pricingData = [
  {
    title: "Einzellizenz KI-Chat",
    price: "4,99 €",
    features: [
      "Zugriff auf den DDKI KI-Chat",
      "ChatGPT o3 Qualität",
      "Planung von Unterrichtseinheiten",
      "Stetig neue Funktionalitäten",
      "Datenschutzkonforme KI-Nutzung",
      "Priorisierter Kundensupport"
    ],
    link: "https://buy.stripe.com/4gw03IfBz8SF0xifYZ", // Link 
    patch: "basic",
  },
];

const PricingGrids = () => {
  return (
    <div>
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <SectionTitle
          subTitle="Jetzt anfragen"
          title="Preise"
          paragraph="Entdecken Sie den DDKI-Chat – Ihre intelligente, funktionsreiche und datenschutzkonforme KI-Anwendung. Mit einer Vielzahl an Funktionalitäten, perfekt für den Unterricht oder als administrative Unterstützung und garantiert mit höchsten Datenschutzstandards. Ob für Schulen, Schulträger, Medienzentren, Bundesländer oder Hochschulen – profitieren Sie von einem maßgeschneiderten DDKI-Chat, die flexibel und sicher sind."
        />
        <div className="flex justify-center items-center">
          <SinglePricing price={pricingData[0]} />
        </div>
      </div>
    </div>
  );
};


export default PricingGrids;