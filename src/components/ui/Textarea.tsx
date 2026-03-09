import { cn } from "@/lib/utils";
import { forwardRef, type ComponentProps } from "react";

const Textarea = forwardRef<HTMLTextAreaElement, ComponentProps<"textarea">>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-border-secondary bg-white px-4 py-3 text-md outline-none transition-colors placeholder:text-text-tertiary focus:border-primary-dark focus:ring-2 focus:ring-primary-light/30",
          className
        )}
        {...props}
      />
    );
  }
);

export { Textarea };
