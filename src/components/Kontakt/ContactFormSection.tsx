"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import ContactForm from "./ContactForm";

export default function ContactFormSection() {
  return (
    <section className="bg-background-secondary px-4 pt-28 pb-10 md:pt-43.25 md:pb-14 lg:px-4 lg:pb-20 xl:px-28">
      <div className="mx-auto flex max-w-304 flex-col items-start justify-between gap-y-10 lg:mb-0 lg:flex-row lg:items-start lg:gap-x-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full text-center lg:w-122 lg:text-start"
        >
          <h1 className="mx-auto max-w-[70%] text-display-md tracking-[-0.96px] text-text-primary lg:mx-0 lg:text-display-lg">
            Kontaktieren Sie uns
          </h1>
          <p className="mx-auto mt-4 max-w-104.25 px-2 text-md font-light text-text-secondary lg:mx-0 lg:px-0">
            Haben Sie Fragen zu unseren Fortbildungen, Produkten oder Fördermöglichkeiten? Wir beraten Sie gerne
            und finden gemeinsam das passende Angebot für Sie. Schreiben Sie uns durch das Kontaktformular, buchen
            Sie direkt einen Termin, oder rufen Sie gerne einfach an.
          </p>

          <div className="mt-6 flex flex-col gap-9 md:mt-12 md:flex-row lg:flex-col">
            <ContactItem
              icon={<PhoneCall className="size-6" />}
              title="Telefon"
              value="+49 176 61411514"
            />
            <ContactItem
              icon={<Mail className="size-6" />}
              title="E-Mail"
              value="info@deepdive-ki.de"
            />
            <ContactItem
              icon={<MapPin className="size-6" />}
              title="Adresse"
              value="Eppendorfer Landstraße 55, 20249 Hamburg"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-auto"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-x-4">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white">
        <span className="text-text-secondary">{icon}</span>
      </div>
      <div className="text-start">
        <p className="text-sm font-light text-text-secondary">{title}</p>
        <p className="text-md font-light text-text-primary">{value}</p>
      </div>
    </div>
  );
}
