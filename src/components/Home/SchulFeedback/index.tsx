"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/Common/SectionTitle";

const feedbackLines = [
  "Wir haben mit dem Deep-Dive Team wirklich gute Erfahrungen sammeln können. Im Rahmen des Startchancenprogramms haben wir unter anderem mit der angebotenen Schul-KI gearbeitet und uns unsere Homepage neu konzipieren lassen. Die neu konzipierte Homepage stellt uns sehr zufrieden, die Schul-KI wird von den Kolleginnen und Kollegen gut angenommen und erleichtert den datenschutzkonformen Unterricht sehr. Das Deep-Dive-Team ist gut erreichbar, Wünsche und Anliegen werden zeitnah umgesetzt.",
  "Wir können die Zusammenarbeit sehr empfehlen.",
];

const SchulFeedback = () => {
  return (
    <section className="overflow-hidden py-17.5 lg:py-22.5 xl:py-27.5">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <SectionTitle variant="software"
            subTitle="SchulFeedback"
            title="Was unserer Schulen sagen"
            paragraph="Die besten Geschichten schreibt der Schulalltag. Hier erzählen unsere Schulen, wie sie unsere Lösungen einsetzen, was sie begeistert und wie KI ihnen den Rücken im Alltag stärkt."
          />
        </motion.div>

        <div className="mx-auto max-w-[920px] space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="sw-card-glow group relative overflow-hidden rounded-2xl border border-purple-500/20 bg-white/5 p-6 shadow-sm backdrop-blur-sm sm:p-8 md:p-10"
          >
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary-dark via-primary-base to-transparent" />
            <div className="relative space-y-4 pl-4 text-left">
              {feedbackLines.map((line, index) => (
                <p
                  key={index}
                  className="text-sm leading-relaxed text-white/70 sm:text-base"
                >
                  {line}
                </p>
              ))}
              <p className="pt-2 text-sm font-semibold text-white">
                C. Weller{" "}
                <span className="font-normal text-white/50">
                  (Rektorin der DBR in Hannover)
                </span>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="sw-card-glow group relative overflow-hidden rounded-2xl border border-purple-500/20 bg-white/5 p-6 shadow-sm backdrop-blur-sm sm:p-8 md:p-10"
          >
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary-dark via-primary-base to-transparent" />
            <div className="relative space-y-4 pl-4 text-left">
              <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                Björn Isenbiel und Tim Philipp haben eine schulinterne
                Lehrerfortbildung an der Robert-Koch-Schule Clausthal-Zellerfeld
                durchgeführt. Auch die beteiligten Kollegien des Ratsgymnasiums
                Goslar sowie des Oberharzgymnasiums Braunlage waren von der
                Sachkompetenz, der Praxisnähe und der Vielfalt der vorgestellten
                Anwendungen und Möglichkeiten überzeugt.
              </p>
              <p className="pt-2 text-sm font-semibold text-white">
                Jens Wachsmuth{" "}
                <span className="font-normal text-white/50">
                  (Ständiger Vertreter des Schulleiters)
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SchulFeedback;
