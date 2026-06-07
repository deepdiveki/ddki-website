"use client";

import type { ReactNode } from "react";

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
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
        } catch {
          /* silent */
        }
      }}
      disabled={!value}
      className="rounded-lg bg-purple px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-dark disabled:cursor-not-allowed disabled:opacity-40"
    >
      {label}
    </button>
  );
}
