import { cn } from "@/lib/utils";
import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full rounded-lg border border-transparent bg-background-secondary px-4 py-3 text-sm text-text-primary transition-all duration-200 outline-none placeholder:text-text-secondary focus:ring-2 focus:ring-primary-base/20 focus-visible:border-primary-base lg:rounded-xl",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
