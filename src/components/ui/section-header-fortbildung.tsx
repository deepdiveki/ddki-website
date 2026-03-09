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

export function HeaderTitle({ className, children }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "mx-auto text-display-sm -tracking-[0.96px] text-text-primary lg:max-w-155 lg:text-display-lg",
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
        "mx-auto text-md font-light text-text-secondary md:max-w-117.5 lg:w-full lg:max-w-155 lg:px-0",
        className,
      )}
    >
      {children}
    </h3>
  );
}
