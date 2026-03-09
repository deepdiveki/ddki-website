"use client";

import { categories } from "@/data/categories";
import { getFeaturedCourses } from "@/data/courses";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Monitor } from "lucide-react";
import Link from "next/link";
import Badge from "../ui/Badge";
import {
  HeaderSubtitle,
  HeaderTitle,
  SectionHeader,
} from "../ui/section-header-fortbildung";

export default function FeaturedCoursesSection() {
  const featuredCourses = getFeaturedCourses();

  return (
    <section
      id="empfehlungen"
      className="bg-background-secondary py-10 md:py-14 lg:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <SectionHeader>
          <HeaderTitle>Empfohlene Fortbildungen</HeaderTitle>
          <HeaderSubtitle>
            Unsere beliebtesten Kurse – von Experten entwickelt und von
            Teilnehmern empfohlen.
          </HeaderSubtitle>
        </SectionHeader>
      </motion.div>

      <div className="mx-auto mt-10 grid max-w-304 grid-cols-1 gap-5 px-4 md:grid-cols-2 lg:mt-16 xl:px-0">
        {featuredCourses.map((course, index) => {
          const category = categories.find(
            (c) => c.id === course.categoryId,
          );
          return (
            <motion.div
              key={course.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <Link
                href={`/fortbildung/fortbildungen/${course.slug}`}
                className="group flex h-full flex-col justify-between gap-6 rounded-2xl bg-white p-6 transition-all duration-300 hover:shadow-lg md:rounded-3xl md:p-8"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="primary">{category?.name}</Badge>
                    <Badge>{course.format}</Badge>
                  </div>
                  <h3 className="mt-4 text-display-xs text-text-primary">
                    {course.title}
                  </h3>
                  <p className="mt-2 text-md font-light text-text-secondary">
                    {course.shortDescription}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-text-tertiary">
                    <span className="flex items-center gap-1">
                      <Clock className="size-4" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Monitor className="size-4" />
                      {course.format}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium text-primary-dark transition-transform duration-300 group-hover:translate-x-1">
                    Details
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
