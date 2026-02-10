import SectionTitle from "@/components/Common/SectionTitle";

const feedbackLines = [
  "Wir haben mit dem Deep-Dive Team wirklich gute Erfahrungen sammeln können. Im Rahmen des Startchencenprogramms haben wir unter anderem mit der angebotenen Schul-KI gearbeitet und uns unsere Homepage neu konzipieren lassen. Die neu konzipierte Homepage stellt uns sehr zufrieden, die Schul-KI wird von den Kolleginnen und Kollegen gut angenommen und erleichtert den datenschutzkonformen Unterricht sehr. Das Deep-Dive-Team ist gut erreichbar, Wünsche und Anliegen werden zeitnah umgesetzt.",
  "Wir können die Zusammenarbeit sehr empfehlen.",
];

const SchulFeedback = () => {
  return (
    <section className="overflow-hidden py-17.5 lg:py-22.5 xl:py-27.5">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <SectionTitle
          subTitle="SchulFeedback"
          title="Was unserer Schulen sagen"
          paragraph="Die besten Geschichten schreibt der Schulalltag. Hier erzählen unsere Schulen, wie sie unsere Lösungen einsetzen, was sie begeistert – und wie KI ihnen den Rücken im Alltag stärkt."
        />

        <div className="mx-auto max-w-[920px]">
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-input transition hover:border-purple-500/40 hover:shadow-[0_0_10px_#a855f7] sm:p-8 md:p-10">
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-500/80 via-purple-500/40 to-transparent" />
            <div className="relative space-y-4 pl-4 text-left">
              {feedbackLines.map((line, index) => (
                <p
                  key={index}
                  className="text-sm leading-relaxed text-neutral-200 sm:text-base"
                >
                  {line}
                </p>
              ))}
              <p className="pt-2 text-sm font-semibold text-white">
                C. Weller{" "}
                <span className="font-normal text-neutral-400">
                  (Rektorin der DBR in Hannover)
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchulFeedback;
