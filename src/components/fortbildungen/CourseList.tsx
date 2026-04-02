"use client";

import { courses } from "@/data/courses";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import CourseCard from "./CourseCard";
import CourseFilter from "./CourseFilter";

export default function CourseList() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("kategorie") || "alle";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedFormat, setSelectedFormat] = useState("alle");

  const filteredCourses = courses
    .filter((course) => {
      const isDeepDive = course.slug.startsWith("deep-dive-modul-");
      const matchesCategory =
        selectedCategory === "alle" ||
        course.categoryId === selectedCategory ||
        (selectedCategory === "ki" && isDeepDive);
      const matchesFormat =
        selectedFormat === "alle" || course.format === selectedFormat;
      return matchesCategory && matchesFormat;
    })
    .sort((a, b) => {
      if (selectedCategory !== "ki") return 0;

      const getOrder = (slug: string) => {
        if (slug === "crash-kurs-ki") return 0;
        const deepDiveMatch = slug.match(/^deep-dive-modul-(\d+)$/);
        if (deepDiveMatch) return 1 + parseInt(deepDiveMatch[1]);
        return 100;
      };

      return getOrder(a.slug) - getOrder(b.slug);
    });

  return (
    <div className="space-y-8">
      <CourseFilter
        selectedCategory={selectedCategory}
        selectedFormat={selectedFormat}
        onCategoryChange={setSelectedCategory}
        onFormatChange={setSelectedFormat}
      />

      {selectedCategory === "ki" && (
        <div className="space-y-4 text-text-secondary">
          <h3 className="text-xl font-semibold text-text-primary">
            KI-Fortbildung für Lehrkräfte: praxisnah & direkt anwendbar
          </h3>
          <p>
            Von der ersten Orientierung bis zur gezielten Vertiefung: Unsere
            Fortbildungsreihe stärkt Ihre KI-Kompetenz für den Schulalltag, mit
            einem Crashkurs als Einstieg und acht Deep-Dive-Modulen zu Themen
            wie Unterrichtsplanung, Plagiatserkennung und KI-gestützter
            Unterrichtsdurchführung. Alle Module können auch einzeln besucht
            werden. Eine bestimmte Reihenfolge oder der Besuch anderer Module
            ist nicht erforderlich.
          </p>
          <p>
            Sie lernen aktuelle KI-Tools kennen, erproben neue Formen des
            Team-Teachings und nehmen konkrete Methoden und Materialien mit, die
            Sie sofort im Unterricht einsetzen können. Unsere Fortbildung ist
            bewusst herstellerunabhängig und wir geben Ihnen einen praxisnahen
            Überblick über die gesamte Bandbreite verfügbarer KI-Technologien.
          </p>
          <p>
            Während der Fortbildung steht allen Teilnehmenden unser DSGVO-konformer KI-Chat
            DeepChat kostenlos zur Verfügung.
            Auf Wunsch gestalten wir die Fortbildung auch gezielt rund um telli.
            Ideal für Schulen, die bereits mit dem Schul-KI-Chat arbeiten
            oder diesen einführen möchten.
          </p>
          <p>
            Wir kommen auch gerne zu Ihnen, als SCHILF oder für einen
            pädagogischen Tag.
          </p>
        </div>
      )}

      {filteredCourses.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-text-secondary">
            Keine Fortbildungen in dieser Kategorie gefunden.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("alle");
              setSelectedFormat("alle");
            }}
            className="mt-4 cursor-pointer text-sm text-primary-dark underline"
          >
            Filter zurücksetzen
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: "easeOut",
              }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
