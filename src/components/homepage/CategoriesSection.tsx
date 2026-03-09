"use client";

import { categories } from "@/data/categories";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  HeaderSubtitle,
  HeaderTitle,
  SectionHeader,
} from "../ui/section-header-fortbildung";

export default function CategoriesSection() {
  return (
    <section id="kategorien" className="bg-white py-10 md:py-14 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <SectionHeader>
          <HeaderTitle>Unsere Themenbereiche</HeaderTitle>
          <HeaderSubtitle>
            Wählen Sie aus zwölf Themenbereichen und finden Sie die passende
            Fortbildung für Ihre berufliche Entwicklung.
          </HeaderSubtitle>
        </SectionHeader>
      </motion.div>

      <div className="mx-auto mt-10 grid max-w-304 grid-cols-1 gap-5 px-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 xl:grid-cols-4 xl:px-0">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
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
              href={`/fortbildung/fortbildungen?kategorie=${category.id}`}
              className="group flex flex-col gap-4 rounded-2xl bg-background-secondary p-6 transition-all duration-300 hover:bg-primary-light/20 hover:shadow-md"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-white transition-colors duration-300 group-hover:bg-primary-base/20">
                <category.icon className="size-6 text-text-secondary transition-colors duration-300 group-hover:text-primary-dark" />
              </div>
              <div>
                <h3 className="text-md font-medium text-text-primary">
                  {category.name}
                </h3>
                <p className="mt-1 text-sm font-light text-text-secondary">
                  {category.description}
                </p>
              </div>
              <span className="text-xs text-text-tertiary">
                {category.courseCount} Kurse
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
