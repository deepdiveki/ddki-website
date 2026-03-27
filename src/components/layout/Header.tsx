"use client";

import Logo from "@/components/shared/Logo";
import PlatformSwitcher from "@/components/shared/PlatformSwitcher";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../ui/button-fortbildung";
import ButtonLink from "../ui/button-link-fortbildung";

const links = [
  { name: "Keynote", href: "/fortbildung/keynote" },
  { name: "Fortbildungen", href: "/fortbildung/fortbildungen" },
  { name: "Pädagogischer Tag", href: "/fortbildung/paedagogischer-tag" },
  { name: "Escape Game", href: "/fortbildung/escape-game" },
  { name: "Über uns", href: "/fortbildung/ueber-uns" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="font-inter fixed top-4 left-1/2 z-50 mx-auto flex w-[calc(100%-32px)] max-w-304 -translate-x-1/2 items-center justify-between rounded-xl bg-white px-6 py-4 md:top-6 md:rounded-2xl lg:top-7 xl:w-full">
      <PlatformSwitcher variant="light" activePlatform="fortbildungen" />

      <nav aria-label="Hauptnavigation" className="hidden p-1 lg:block">
        <ul className="flex items-center">
          {links.map((link) => (
            <li key={link.name} className="px-4 py-2">
              <Link
                href={link.href}
                className={cn(
                  "text-md font-light duration-100 focus-visible:outline-primary-dark",
                  pathname === link.href
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-primary-dark",
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hidden items-center gap-3 lg:inline-flex">
        <ButtonLink href="/fortbildung/fortbildungen" variant="secondary">
          Alle Kurse
        </ButtonLink>
        <ButtonLink href="/fortbildung/kontakt">Kontakt</ButtonLink>
      </div>

      <MobileMenubar />
    </header>
  );
}

function MobileMenubar() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !triggerRef.current?.contains(target) &&
        !contentRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div className="relative flex items-center justify-center lg:hidden">
      <Button
        ref={triggerRef}
        variant="secondary"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
        aria-expanded={isOpen}
        className={cn(
          "size-10 cursor-pointer items-center justify-center rounded-lg bg-white px-0 py-0 text-text-primary",
          isOpen && "border-primary-base",
        )}
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </Button>

      {isOpen &&
        mounted &&
        createPortal(
          <div
            ref={contentRef}
            className="fixed top-24 right-0 z-50 w-full max-w-106.25 rounded-xl bg-white p-5 pr-4 shadow-xl sm:right-4 md:top-28"
          >
            <ul className="flex flex-col gap-y-3.5 py-2">
              {links.map((link) => (
                <li
                  key={link.href}
                  className="text-center text-lg text-text-primary"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-md font-light duration-100 focus-visible:outline-primary-dark",
                      pathname === link.href
                        ? "text-text-primary"
                        : "text-text-secondary hover:text-primary-dark",
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-3.5 flex flex-col gap-3">
              <ButtonLink
                href="/fortbildung/fortbildungen"
                variant="secondary"
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                Alle Kurse
              </ButtonLink>
              <ButtonLink
                href="/fortbildung/kontakt"
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                Kontakt
              </ButtonLink>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
