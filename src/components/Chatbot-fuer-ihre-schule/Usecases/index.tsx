import { motion } from "framer-motion";
import ChatbotPreview from "@/components/ChatbotPreview";
import SectionTitle from "@/components/Common/SectionTitle";


const Usecases = () => {
  return (
    <section
      id="features"
      className="scroll-mt-17 overflow-hidden pt-17.5 lg:pt-22.5 xl:pt-27.5"
    >
      <div className="mx-auto max-w-[1222px] px-4 sm:px-8 xl:px-0">
        <SectionTitle variant="software"
          subTitle="Produktvorschau"
          title="Anwendungsmöglichkeiten"
          paragraph="Entdecken Sie die vielfältigen Einsatzmöglichkeiten des KI-Schulbüros – von Schülerinnen und Schülern, die sich über Mensakosten informieren, über Eltern, die aktuelle Veranstaltungen im Blick behalten möchten, bis hin zu Schulanmeldungen oder Krankmeldungen, die direkt über das KI-Schulbüro übermittelt werden."
        />
        <div className="mt-10">
          <ChatbotPreview />
        </div>
      </div>
    </section>
  );
};

export default Usecases;
