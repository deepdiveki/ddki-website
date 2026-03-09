import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { forwardRef, type ComponentProps } from "react";

interface Props {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props & ComponentProps<"button">>(
  function Button(
    {
      children,
      className,
      variant = "primary",
      isLoading,
      disabled,
      ...props
    },
    ref
  ) {
    const baseStyle =
      "inline-flex items-center justify-center gap-1 rounded-[10px] border px-4 py-2.5 font-inter text-sm font-medium -tracking-[0.084px] transition-colors duration-300 focus-visible:outline-0 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantStyle =
      variant === "secondary"
        ? "bg-background-primary border border-border-secondary text-text-primary hover:bg-background-secondary focus-visible:ring-4 focus-visible:ring-[rgba(16,_24,_40,_0.05)]"
        : "border-white/10 text-white [background:linear-gradient(180deg,rgba(255,255,255,0.16)0%,rgba(255,255,255,0)100%),#181B25] [box-shadow:0_1px_2px_0_rgba(21,14,27,0.24),_0_0_0_1px_#000] hover:bg-gray-700 focus-visible:[box-shadow:_0_1px_2px_0_rgba(16,_24,_40,_0.05),_0_0_0_4px_#F2F4F7]";

    return (
      <button
        ref={ref}
        className={cn(baseStyle, variantStyle, className)}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
      </button>
    );
  }
);

export default Button;
