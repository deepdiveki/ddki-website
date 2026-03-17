import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Logo({ className, label = "Fortbildungen", variant = "default" }: { className?: string; label?: string; variant?: "default" | "software" }) {
  const isSoftware = variant === "software";
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src="/images/ddki-logo.svg"
        alt="DDKI Logo"
        width={32}
        height={32}
        className={`size-8 ${isSoftware ? "brightness-0 invert" : ""}`}
      />
      <span className={`text-lg font-medium tracking-tight ${isSoftware ? "text-white" : "text-text-primary"}`}>
        DDKI <span className={`font-light ${isSoftware ? "text-white/70" : "text-text-secondary"}`}>{label}</span>
      </span>
    </div>
  );
}
