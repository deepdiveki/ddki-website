import SectionTitle from "@/components/Common/SectionTitle";
import DeepChatAnimationCarousel from "@/components/animations/DeepChatAnimation1";

const Produktvorschau = () => {
  return (
    <section className="overflow-hidden py-17.5 lg:py-22.5 xl:py-27.5">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <SectionTitle
          subTitle="Produktvorschau"
          title="Anwendungsmöglichkeiten"
          paragraph="Entdecken Sie die vielseitigen Möglichkeiten von DeepChat – von der schnellen Formulierung von Elternmails über die Gestaltung kompletter Unterrichtsstunden bis hin zur Entwicklung digitaler Lernhelfer."
        />
        <DeepChatAnimationCarousel />
      </div>
    </section>
  );
};

export default Produktvorschau;
