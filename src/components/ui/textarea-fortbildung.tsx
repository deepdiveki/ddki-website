import { cn } from "@/lib/utils";
import * as React from "react";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "min-h-[80px] w-full rounded-lg border border-transparent bg-background-secondary px-4 py-3 text-sm text-text-primary transition-all duration-200 outline-none placeholder:text-text-tertiary focus:ring-2 focus:ring-primary-base/20 focus-visible:border-primary-base lg:rounded-xl",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
