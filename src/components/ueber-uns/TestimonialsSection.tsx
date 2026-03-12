"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import {
  HeaderSubtitle,
  HeaderTitle,
  SectionHeader,
} from "../ui/SectionHeader";

const testimonials = [
  {
    title: "Hilfreich im Unterricht",
    quote:
      "Der DeepChat hilft mir dabei, gezielt Aufgaben für meine Schüler zu entwickeln.",
    role: "Lehrerin, Berlin",
  },
  {
    title: "Intuitive Bedienung",
    quote:
      "Der DeepChat ist einfach zu bedienen – auch für technikferne Kolleg:innen. Gute Einführung von Björn und Tim.",
    role: "Schulleiter, Hamburg",
  },
  {
    title: "Enorme Zeitersparnis",
    quote:
      "Ich spare mit dem DeepChat viel Zeit bei administrativen Aufgaben.",
    role: "Lehrkraft, NRW",
  },
  {
    title: "Tolle Fortbildung",
    quote:
      "Viele Informationen und Tipps, die ich sofort umsetzen kann. Coole Notion Materialsammlung. Gute Diskussion mit Toni.",
    role: "Lehrer, Niedersachsen",
  },
  {
    title: "KI Assistent im DeepChat",
    quote:
      "Den KI Assistenten im DeepChat setze ich gerne ein. So ein Hilfslehrer ist Gold wert.",
    role: "Lehrer, Köln",
  },
  {
    title: "Planung Klassenreisen",
    quote:
      "Habe meine Klassenfahrt mit dem DeepChat geplant. Das hat mir viel Zeit gespart.",
    role: "Lehrerin, Hamburg",
  },
  {
    title: "Kuratiertes Prompting",
    quote:
      "Ich bin kein Profi beim Thema Digitales. Ich finde das kuratierte Prompting super.",
    role: "Lehrer, Stuttgart",
  },
  {
    title: "Schilf mit DeepDiveKI",
    quote:
      "Björn und Tim waren bei uns an der Schule. Das waren super Workshops. Cool das man viel ausprobieren konnte.",
    role: "Didaktische Leitung, Niedersachsen",
  },
  {
    title: "Fortbildung mit DeepDiveKI",
    quote:
      "Vorstellung vieler Apps, direkte Links im Chat, Möglichkeiten zum Ausprobieren, die Videos für zu Hause waren toll.",
    role: "Lehrerin, Thüringen",
  },
];

const schulFeedback = [
  {
    quote: [
      "Wir haben mit dem Deep-Dive Team wirklich gute Erfahrungen sammeln können. Im Rahmen des Startchancenprogramms haben wir unter anderem mit der angebotenen Schul-KI gearbeitet und uns unsere Homepage neu konzipieren lassen. Die neu konzipierte Homepage stellt uns sehr zufrieden, die Schul-KI wird von den Kolleginnen und Kollegen gut angenommen und erleichtert den datenschutzkonformen Unterricht sehr. Das Deep-Dive-Team ist gut erreichbar, Wünsche und Anliegen werden zeitnah umgesetzt.",
      "Wir können die Zusammenarbeit sehr empfehlen.",
    ],
    author: "C. Weller",
    role: "Rektorin der DBR in Hannover",
  },
  {
    quote: [
      "Björn Isenbiel und Tim Philipp haben eine schulinterne Lehrerfortbildung an der Robert-Koch-Schule Clausthal-Zellerfeld durchgeführt. Auch die beteiligten Kollegien des Ratsgymnasiums Goslar sowie des Oberharzgymnasiums Braunlage waren von der Sachkompetenz, der Praxisnähe und der Vielfalt der vorgestellten Anwendungen und Möglichkeiten überzeugt.",
    ],
    author: "Jens Wachsmuth",
    role: "Ständiger Vertreter des Schulleiters",
  },
];

export function SchulFeedbackSection() {
  return (
    <section className="bg-white py-10 md:py-14 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <SectionHeader className="mx-auto max-w-304 px-4 text-center xl:px-0">
          <HeaderTitle className="text-display-xs font-light -tracking-[0.72px] text-text-primary lg:text-display-sm">
            Was unsere Schulen sagen
          </HeaderTitle>
          <HeaderSubtitle className="mx-auto mt-3 max-w-150 text-md font-light text-text-secondary">
            Schulen berichten, wie die Zusammenarbeit mit DeepDiveKI ihren
            Schulalltag verändert hat.
          </HeaderSubtitle>
        </SectionHeader>
      </motion.div>

      <div className="mx-auto mt-10 max-w-230 space-y-5 px-4 lg:mt-16 xl:px-0">
        {schulFeedback.map((item, index) => (
          <motion.div
            key={item.author}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.7,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            className="relative overflow-hidden rounded-2xl border border-border-tertiary bg-background-secondary p-6 sm:p-8 md:p-10"
          >
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary-base via-primary-base/40 to-transparent" />
            <div className="space-y-4 pl-4">
              {item.quote.map((line, i) => (
                <p
                  key={i}
                  className="text-sm font-light leading-relaxed text-text-secondary sm:text-base"
                >
                  {line}
                </p>
              ))}
              <p className="pt-2 text-sm font-medium text-text-primary">
                {item.author}{" "}
                <span className="font-light text-text-tertiary">
                  ({item.role})
                </span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="bg-background-secondary py-10 md:py-14 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <SectionHeader className="mx-auto max-w-304 px-4 text-center xl:px-0">
          <HeaderTitle className="text-display-xs font-light -tracking-[0.72px] text-text-primary lg:text-display-sm">Was unsere Lehrer:innen sagen</HeaderTitle>
          <HeaderSubtitle className="mx-auto mt-3 max-w-150 text-md font-light text-text-secondary">
            Die besten Geschichten schreibt der Schulalltag. Hier erzählen
            Lehrer:innen, wie sie unsere Lösungen einsetzen, was sie begeistert
            – und wie KI ihnen den Rücken im Alltag stärkt.
          </HeaderSubtitle>
        </SectionHeader>
      </motion.div>

      <div className="mx-auto mt-10 grid max-w-304 grid-cols-1 gap-5 px-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 xl:px-0">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.7,
              delay: index * 0.08,
              ease: "easeOut",
            }}
            className="flex flex-col justify-between rounded-2xl bg-white p-6"
          >
            <div>
              <Quote className="size-8 text-primary-base" />
              <h3 className="mt-3 text-md font-medium text-text-primary">
                {testimonial.title}
              </h3>
              <p className="mt-2 text-sm font-light leading-relaxed text-text-secondary">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
            <p className="mt-4 text-xs font-medium text-text-tertiary">
              — {testimonial.role}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
