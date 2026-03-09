import { categories } from "@/data/categories";
import type { Course } from "@/data/courses";
import { ArrowRight, Clock, Monitor } from "lucide-react";
import Link from "next/link";
import Badge from "../ui/Badge";

export default function CourseCard({ course }: { course: Course }) {
  const category = categories.find((c) => c.id === course.categoryId);

  return (
    <Link
      href={`/fortbildung/fortbildungen/${course.slug}`}
      className="group flex h-full flex-col justify-between gap-5 rounded-2xl bg-white p-5 transition-all duration-300 hover:shadow-lg md:p-6"
    >
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="primary">{category?.name}</Badge>
          <Badge>{course.format}</Badge>
        </div>
        <h3 className="mt-3 text-lg font-medium text-text-primary">
          {course.title}
        </h3>
        <p className="mt-1.5 text-sm font-light text-text-secondary line-clamp-2">
          {course.shortDescription}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-text-tertiary">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <Monitor className="size-3.5" />
            {course.format}
          </span>
        </div>
        <span className="flex items-center gap-1 text-sm font-medium text-primary-dark transition-transform duration-300 group-hover:translate-x-1">
          <ArrowRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
