import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src="/images/ddki-logo.svg"
        alt="DDKI Logo"
        width={32}
        height={32}
        className="size-8"
      />
      <span className="text-lg font-medium tracking-tight text-text-primary">
        DDKI <span className="font-light text-text-secondary">Fortbildungen</span>
      </span>
    </div>
  );
}
