import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function SectionHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-4 px-4 text-center", className)}>
      {children}
    </div>
  );
}

/** Eyebrow im neuen Landing-Design: Lila-Caps mit weitem Tracking */
export function HeaderEyebrow({ className, children }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-sm font-medium tracking-[0.14em] text-primary-base uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function HeaderTitle({ className, children }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "mx-auto text-display-xs font-semibold -tracking-[0.5px] text-text-primary md:text-display-sm lg:max-w-155 lg:text-display-md",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function HeaderSubtitle({ className, children }: ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "mx-auto text-md font-light leading-relaxed text-text-secondary md:max-w-117.5 lg:w-full lg:max-w-155 lg:px-0 lg:text-lg",
        className,
      )}
    >
      {children}
    </h3>
  );
}
