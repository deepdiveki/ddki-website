import { courses } from "@/data/courses";
import CourseDetail from "@/components/fortbildungen/CourseDetail";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) return { title: "Kurs nicht gefunden" };

  return {
    // Marke nicht doppeln: das Root-Layout hängt bereits "| DeepDiveKI" an.
    title: course.title,
    description: course.shortDescription,
    alternates: {
      canonical: `/fortbildung/fortbildungen/${course.slug}`,
    },
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  return <CourseDetail course={course} />;
}
