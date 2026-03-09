"use client";

import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

const formats = ["Alle", "Online", "Präsenz", "Hybrid"] as const;

interface CourseFilterProps {
  selectedCategory: string;
  selectedFormat: string;
  onCategoryChange: (category: string) => void;
  onFormatChange: (format: string) => void;
}

export default function CourseFilter({
  selectedCategory,
  selectedFormat,
  onCategoryChange,
  onFormatChange,
}: CourseFilterProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange("alle")}
          className={cn(
            "cursor-pointer rounded-full border px-4 py-2 text-sm font-light transition-all duration-200",
            selectedCategory === "alle"
              ? "border-primary-base bg-primary-light/30 text-primary-darker"
              : "border-border-tertiary bg-white text-text-secondary hover:border-primary-base/50 hover:bg-primary-light/10",
          )}
        >
          Alle Kategorien
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "cursor-pointer rounded-full border px-4 py-2 text-sm font-light transition-all duration-200",
              selectedCategory === category.id
                ? "border-primary-base bg-primary-light/30 text-primary-darker"
                : "border-border-tertiary bg-white text-text-secondary hover:border-primary-base/50 hover:bg-primary-light/10",
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {formats.map((format) => (
          <button
            key={format}
            onClick={() => onFormatChange(format === "Alle" ? "alle" : format)}
            className={cn(
              "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-light transition-all duration-200",
              (format === "Alle" ? "alle" : format) === selectedFormat
                ? "border-primary-base bg-primary-light/30 text-primary-darker"
                : "border-border-tertiary bg-white text-text-secondary hover:border-primary-base/50 hover:bg-primary-light/10",
            )}
          >
            {format}
          </button>
        ))}
      </div>
    </div>
  );
}
