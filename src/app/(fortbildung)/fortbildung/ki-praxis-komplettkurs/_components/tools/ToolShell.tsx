"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";

export default function ToolShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-8 lg:py-12">
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-purple">
          Interaktives Tool
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-text-primary md:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-sm text-text-secondary">{description}</p>
      </header>
      <div className="rounded-2xl border border-border-secondary bg-white p-5 shadow-sm md:p-7">
        {children}
      </div>
    </div>
  );
}

export function CopyButton({ value, label = "In Zwischenablage kopieren" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      /* Clipboard nicht verfügbar – still ignorieren */
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handleCopy}
        disabled={!value}
        className="flex items-center gap-2 rounded-lg bg-purple px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-dark disabled:cursor-not-allowed disabled:opacity-40"
      >
        {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        {copied ? "Kopiert!" : label}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "In die Zwischenablage kopiert." : ""}
      </span>
    </div>
  );
}
