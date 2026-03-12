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

  const filteredCourses = courses.filter((course) => {
    const isDeepDive = course.slug.startsWith("deep-dive-modul-");
    const matchesCategory =
      selectedCategory === "alle" ||
      course.categoryId === selectedCategory ||
      (selectedCategory === "ki" && isDeepDive);
    const matchesFormat =
      selectedFormat === "alle" || course.format === selectedFormat;
    return matchesCategory && matchesFormat;
  });

  return (
    <div className="space-y-8">
      <CourseFilter
        selectedCategory={selectedCategory}
        selectedFormat={selectedFormat}
        onCategoryChange={setSelectedCategory}
        onFormatChange={setSelectedFormat}
      />

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
