import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

interface BadgeProps extends ComponentProps<"span"> {
  variant?: "default" | "primary" | "secondary";
}

export default function Badge({
  children,
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantStyle = {
    default:
      "bg-background-secondary text-text-secondary border-border-tertiary",
    primary: "bg-primary-light/30 text-primary-darker border-primary-base/30",
    secondary:
      "bg-background-tertiary/50 text-text-secondary border-border-tertiary",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        variantStyle[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
