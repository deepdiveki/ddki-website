"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import Accordion, {
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion-faq";
import {
  HeaderSubtitle,
  HeaderTitle,
  SectionHeader,
} from "@/components/ui/section-header-fortbildung";

export type FAQ = {
  defaultOpen?: boolean;
  id: string;
  question: string;
  answer: string;
};

const faqs: Omit<FAQ, "id">[] = [
  {
    question: "Wie melde ich mich für eine Fortbildung an?",
    answer:
      "Wählen Sie die gewünschte Fortbildung aus unserem Katalog und nutzen Sie das Kontaktformular, um sich anzumelden. Unser Team wird sich zeitnah bei Ihnen melden und alle weiteren Details klären.",
    defaultOpen: true,
  },
  {
    question: "Welche Formate werden angeboten?",
    answer:
      "Wir bieten Fortbildungen in drei Formaten an: Online (live oder als Selbstlernkurs), Präsenz (an verschiedenen Standorten) und Hybrid (Kombination aus beiden). So finden Sie garantiert das passende Format für Ihre Bedürfnisse.",
  },
  {
    question: "Erhalte ich ein Zertifikat nach Abschluss?",
    answer:
      "Ja, nach erfolgreicher Teilnahme an einer Fortbildung erhalten Sie ein Teilnahmezertifikat. Je nach Kurs kann dies auch als anerkannte Fortbildungsmaßnahme für Ihre berufliche Weiterbildung angerechnet werden.",
  },
  {
    question: "Können Fortbildungen auch für Teams gebucht werden?",
    answer:
      "Selbstverständlich! Wir bieten auch Inhouse-Schulungen und Team-Fortbildungen an. Kontaktieren Sie uns für ein individuelles Angebot, das auf die Bedürfnisse Ihres Teams zugeschnitten ist.",
  },
  {
    question: "Welche Vorkenntnisse benötige ich?",
    answer:
      "Die Voraussetzungen variieren je nach Kurs. Viele unserer Einsteiger-Kurse setzen keine besonderen Vorkenntnisse voraus. Die spezifischen Anforderungen finden Sie in der jeweiligen Kursbeschreibung.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | undefined>("faq-0");

  return (
    <section id="faq" className="py-10 md:py-14 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <SectionHeader>
          <HeaderTitle>Häufig gestellte Fragen</HeaderTitle>
          <HeaderSubtitle>
            Hier finden Sie Antworten auf die wichtigsten Fragen rund um unsere
            Fortbildungsangebote.
          </HeaderSubtitle>
        </SectionHeader>
      </motion.div>

      <ul className="mx-auto mt-10 max-w-165 space-y-5 px-4 lg:mt-16 xl:px-0">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            {...faq}
            id={`faq-${index}`}
            openId={openId}
            onToggle={setOpenId}
          />
        ))}
      </ul>
    </section>
  );
}

function FAQItem({
  question,
  answer,
  defaultOpen = false,
  id,
  openId,
  onToggle,
}: FAQ & {
  openId: string | undefined;
  onToggle: (id: string | undefined) => void;
}) {
  const isOpen = openId === id;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5 }}
      className="rounded-xl bg-white px-2 md:rounded-[20px]"
    >
      <Accordion>
        <AccordionTrigger
          data-state={isOpen ? "open" : "closed"}
          onClick={() => onToggle(isOpen ? undefined : id)}
          className="flex w-full cursor-pointer items-center justify-between px-5 py-6 text-start text-lg font-light text-text-primary [&>svg]:hidden [&[data-state=open]>svg:first-of-type]:block [&[data-state=closed]>svg:last-of-type]:block"
        >
          {question}
          <Minus className="size-6 shrink-0" />
          <Plus className="size-6 shrink-0" />
        </AccordionTrigger>
        <AccordionContent
          isOpen={isOpen}
          className="mb-2 rounded-xl bg-background-secondary px-5 py-6 font-light text-text-secondary"
        >
          {answer}
        </AccordionContent>
      </Accordion>
    </motion.li>
  );
}
