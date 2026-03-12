"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <section
      id="features"
      className="scroll-mt-17 overflow-hidden pt-17.5 lg:pt-22.5 xl:pt-27.5"
    >
      <div className="mx-auto max-w-[1222px] px-4 sm:px-8 xl:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <SectionTitle
            subTitle="Technische Informationen"
            title="Unser Techstack im Überblick"
            paragraph="Spezifische Informationen zu den Funktionen, Technologien und genutzen API's unserer Plattform finden Sie hier:"
          />
        </motion.div>

        <div className="relative">
          {/* <!--=== Features Row ===--> */}
          <div className="flex flex-wrap justify-center">
            {featuresData.slice(0, 3).map((feature, index) => (
              <motion.div
                key={feature.id}
                className="w-full sm:w-1/2 lg:w-1/3"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
              >
                <SingleFeature feature={feature} />
              </motion.div>
            ))}
          </div>

          <div className="sw-accent-line mx-auto h-px w-full max-w-[1000px]"></div>

          {/* <!--=== Features Row ===--> */}
          <div className="flex flex-wrap justify-center">
            {featuresData.slice(3).map((feature, index) => (
              <motion.div
                key={feature.id}
                className="w-full sm:w-1/2 lg:w-1/3"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
              >
                <SingleFeature feature={feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
