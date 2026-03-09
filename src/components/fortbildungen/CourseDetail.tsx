"use client";

import { categories } from "@/data/categories";
import type { Course } from "@/data/courses";
import { courses } from "@/data/courses";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  Monitor,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import Badge from "../ui/Badge";
import ButtonLink from "../ui/button-link-fortbildung";
import CourseCard from "./CourseCard";

export default function CourseDetail({ course }: { course: Course }) {
  const category = categories.find((c) => c.id === course.categoryId);
  const relatedCourses = courses
    .filter(
      (c) => c.categoryId === course.categoryId && c.slug !== course.slug,
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <section className="bg-[linear-gradient(180deg,#DDD7FE_0%,#FFF_100%)] pt-31.5 pb-10 lg:pt-38 lg:pb-14">
        <div className="bg-[url('/images/bg-gradient.svg')] bg-cover bg-center">
        <div className="mx-auto max-w-304 px-4 xl:px-0">
          <Link
            href="/fortbildung/fortbildungen"
            className="mb-6 inline-flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            <ArrowLeft className="size-4" />
            Zurück zur Übersicht
          </Link>
          <div className="flex items-center gap-2">
            <Badge variant="primary">{category?.name}</Badge>
            <Badge>{course.format}</Badge>
          </div>
          <h1 className="mt-4 text-display-sm font-light -tracking-[0.96px] text-text-primary lg:text-display-lg">
            {course.title}
          </h1>
          <p className="mt-3 max-w-160 text-md font-light text-text-secondary">
            {course.shortDescription}
          </p>
        </div>
        </div>
      </section>

      <section className="bg-background-secondary py-10 md:py-14 lg:py-20">
        <div className="mx-auto flex max-w-304 flex-col gap-8 px-4 lg:flex-row xl:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <div className="rounded-2xl bg-white p-6 md:p-8">
              <h2 className="text-display-xs text-text-primary">
                Über diese Fortbildung
              </h2>
              <p className="mt-4 text-md font-light leading-relaxed text-text-secondary">
                {course.description}
              </p>

              <h3 className="mt-8 text-lg font-medium text-text-primary">
                Themen & Inhalte
              </h3>
              <ul className="mt-4 space-y-3">
                {course.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary-dark" />
                    <span className="text-md font-light text-text-secondary">
                      {topic}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-80 xl:w-96"
          >
            <div className="sticky top-28 space-y-6">
              <div className="rounded-2xl bg-white p-6">
                <h3 className="text-lg font-medium text-text-primary">
                  Kurs-Informationen
                </h3>
                <div className="mt-4 space-y-4">
                  <InfoItem
                    icon={<Clock className="size-5" />}
                    label="Dauer"
                    value={course.duration}
                  />
                  <InfoItem
                    icon={<Monitor className="size-5" />}
                    label="Format"
                    value={course.format}
                  />
                  <InfoItem
                    icon={<Users className="size-5" />}
                    label="Zielgruppe"
                    value={course.targetAudience}
                  />
                  <InfoItem
                    icon={<BookOpen className="size-5" />}
                    label="Voraussetzungen"
                    value={course.prerequisites}
                  />
                  <InfoItem
                    icon={<User className="size-5" />}
                    label="Dozent/in"
                    value={course.instructor}
                  />
                </div>

                <ButtonLink href="/fortbildung/kontakt" className="mt-6 w-full">
                  Jetzt anfragen
                </ButtonLink>
                {course.pdfUrl && (
                  <a
                    href={course.pdfUrl}
                    download
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border-secondary bg-white px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-background-secondary"
                  >
                    <Download className="size-4" />
                    Beschreibung als PDF
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {relatedCourses.length > 0 && (
        <section className="bg-white py-10 md:py-14 lg:py-20">
          <div className="mx-auto max-w-304 px-4 xl:px-0">
            <h2 className="text-display-xs text-text-primary lg:text-display-sm">
              Verwandte Fortbildungen
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {relatedCourses.map((relCourse) => (
                <CourseCard key={relCourse.slug} course={relCourse} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-text-tertiary">{icon}</span>
      <div>
        <p className="text-xs text-text-tertiary">{label}</p>
        <p className="text-sm text-text-primary">{value}</p>
      </div>
    </div>
  );
}
