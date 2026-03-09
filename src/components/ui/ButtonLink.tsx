import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ComponentProps } from "react";

export default function ButtonLink({
  children,
  className,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-[10px] border border-border-secondary bg-background-primary px-4 py-2.5 font-inter text-sm font-medium -tracking-[0.084px] text-text-primary transition-colors duration-300 hover:bg-background-secondary focus-visible:outline-0 focus-visible:ring-4 focus-visible:ring-[rgba(16,_24,_40,_0.05)]",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
