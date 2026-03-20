"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const platforms = [
  {
    name: "Fortbildungen",
    href: "/fortbildung",
    description: "Kurse & Workshops für Lehrkräfte",
  },
  {
    name: "Software",
    href: "/software",
    description: "DeepChat, KI-Schulbüro & mehr",
  },
];

type Variant = "light" | "dark";

export default function PlatformSwitcher({
  variant = "light",
  activePlatform,
}: {
  variant?: Variant;
  activePlatform: "fortbildungen" | "software" | "plattform";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("pointerdown", handleClickOutside);
    return () => window.removeEventListener("pointerdown", handleClickOutside);
  }, []);

  const isLight = variant === "light";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors duration-150 focus-visible:outline-primary-base",
          isLight
            ? "hover:bg-black/[0.04]"
            : "hover:bg-white/[0.08]",
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Image
          src={isLight ? "/images/ddki-logo.svg" : "/images/logo/logo.svg"}
          alt="DDKI Logo"
          width={32}
          height={32}
          className={cn("size-8", !isLight && "h-10 w-auto")}
        />
        <span
          className={cn(
            "text-lg font-medium tracking-tight",
            isLight ? "text-text-primary" : "text-white text-xl font-bold",
          )}
        >
          {activePlatform === "fortbildungen" ? (
            <>
              DeepDive{" "}
              <span
                className={cn(
                  "font-light",
                  isLight ? "text-text-secondary" : "text-white/70",
                )}
              >
                Fortbildungen
              </span>
            </>
          ) : (
            <>
              DDKI{" "}
              <span
                className={cn(
                  "font-light",
                  isLight ? "text-text-secondary" : "text-white/70",
                )}
              >
                {activePlatform === "software" ? "Software" : "Plattform"}
              </span>
            </>
          )}
        </span>
        <ChevronDown
          className={cn(
            "size-4 transition-transform duration-200",
            open && "rotate-180",
            isLight ? "text-text-tertiary" : "text-white/50",
          )}
        />
      </button>

      {open && (
        <div
          className={cn(
            "absolute left-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border shadow-lg",
            isLight
              ? "border-gray-200 bg-white"
              : "border-white/10 bg-[#1C192C]",
          )}
        >
          <div className={cn(
            "px-3 py-2 text-xs font-medium uppercase tracking-wider",
            isLight ? "text-text-tertiary" : "text-white/40",
          )}>
            Plattform wechseln
          </div>
          {platforms.map((platform) => {
            const isActive =
              (platform.href === "/fortbildung" && activePlatform === "fortbildungen") ||
              (platform.href === "/software" && activePlatform === "software");

            return (
              <Link
                key={platform.href}
                href={platform.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex flex-col gap-0.5 px-3 py-3 transition-colors duration-150",
                  isActive
                    ? isLight
                      ? "bg-primary-light/10"
                      : "bg-white/[0.08]"
                    : isLight
                      ? "hover:bg-gray-50"
                      : "hover:bg-white/[0.06]",
                )}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isActive
                        ? isLight ? "text-primary-darker" : "text-purple-light"
                        : isLight ? "text-text-primary" : "text-white",
                    )}
                  >
                    {platform.name === "Fortbildungen"
                      ? "DeepDive Fortbildungen"
                      : `DDKI ${platform.name}`}
                  </span>
                  {isActive && (
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                        isLight
                          ? "bg-primary-light/20 text-primary-darker"
                          : "bg-white/10 text-white/60",
                      )}
                    >
                      Aktiv
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs",
                    isLight ? "text-text-tertiary" : "text-white/40",
                  )}
                >
                  {platform.description}
                </span>
              </Link>
            );
          })}
          {activePlatform !== "plattform" && (
            <div className={cn(
              "border-t px-3 py-2",
              isLight ? "border-gray-100" : "border-white/5",
            )}>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-1.5 text-xs font-medium transition-colors duration-150",
                  isLight
                    ? "text-text-secondary hover:text-primary-darker"
                    : "text-white/40 hover:text-white/70",
                )}
              >
                Zur Übersicht
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
