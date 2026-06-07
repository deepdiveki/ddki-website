"use client";

import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { DownloadContent } from "../../_data/downloadsContent";

const printStyles = `
@page {
  size: A4;
  margin: 18mm 16mm 20mm 16mm;
}
@media print {
  html, body {
    background: #fff !important;
    color: #111827 !important;
    font-size: 11pt;
    line-height: 1.5;
  }
  /* Keep design colors (purple highlights etc.) */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  /* Avoid orphaned headings */
  h1, h2, h3, h4 {
    break-after: avoid-page;
    page-break-after: avoid;
  }
  /* Keep these blocks together */
  blockquote, pre, table, ul, ol, figure {
    break-inside: avoid;
    page-break-inside: avoid;
  }
  li {
    break-inside: avoid;
    page-break-inside: avoid;
  }
  /* Reveal absolute URLs after links */
  a[href^="http"]::after {
    content: " (" attr(href) ")";
    font-size: 9pt;
    color: #6b7280;
    word-break: break-all;
  }
  /* Don't reveal internal links (lesson references) */
  a[href^="/"]::after,
  a[href^="#"]::after {
    content: none;
  }
  /* Tables - cleaner borders */
  table {
    border-collapse: collapse;
    width: 100%;
  }
  th, td {
    border: 1px solid #e5e7eb !important;
  }
  /* Code blocks - clear background */
  code, pre {
    background: #f3f4f6 !important;
    border: 1px solid #e5e7eb !important;
    color: #111827 !important;
  }
  /* Prevent footer being orphaned */
  footer {
    break-before: avoid;
    page-break-before: avoid;
  }
}
`;

export default function DownloadView({
  slug,
  entry,
}: {
  slug: string;
  entry: DownloadContent;
}) {
  return (
    <div className="min-h-screen bg-white pt-24 font-inter print:pt-0 lg:pt-28">
      <style>{printStyles}</style>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8 lg:px-12 print:max-w-none print:px-0 print:py-0">
        <div className="mb-6 flex items-center justify-between gap-4 print:hidden">
          <Link
            href="/fortbildung/ki-praxis-komplettkurs"
            className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zum Kurs
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-lg border border-border-secondary px-3 py-1.5 text-sm font-semibold text-text-primary transition hover:bg-background-secondary"
          >
            <Printer className="h-4 w-4" />
            Drucken / PDF
          </button>
        </div>

        <div className="print:break-after-avoid">
          <p className="text-xs font-bold uppercase tracking-wider text-purple">
            DeepDiveKI · Kurs-Material
          </p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-text-primary print:mt-1 print:text-2xl">
            {entry.title}
          </h1>
          {entry.intro && (
            <p className="mt-3 text-base leading-relaxed text-text-secondary print:mt-2 print:text-sm">
              {entry.intro}
            </p>
          )}
        </div>

        <article className="mt-8 text-base leading-relaxed text-text-primary print:mt-5">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h2 className="mt-8 mb-3 text-2xl font-semibold text-text-primary">
                  {children}
                </h2>
              ),
              h2: ({ children }) => (
                <h3 className="mt-7 mb-2 text-xl font-semibold text-text-primary">
                  {children}
                </h3>
              ),
              h3: ({ children }) => (
                <h4 className="mt-5 mb-2 text-lg font-semibold text-text-primary">
                  {children}
                </h4>
              ),
              p: ({ children }) => <p className="my-3">{children}</p>,
              strong: ({ children }) => (
                <strong className="font-semibold text-text-primary">
                  {children}
                </strong>
              ),
              em: ({ children }) => <em className="italic">{children}</em>,
              blockquote: ({ children }) => (
                <blockquote className="my-5 rounded-r-lg border-l-4 border-purple bg-purple-light-5 px-4 py-3 italic">
                  {children}
                </blockquote>
              ),
              ul: ({ children }) => (
                <ul className="my-3 list-disc space-y-1 pl-6 marker:text-purple">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="my-3 list-decimal space-y-1 pl-6 marker:text-purple">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li className="leading-relaxed">{children}</li>,
              code: ({ children }) => (
                <code className="rounded bg-background-secondary px-1.5 py-0.5 font-mono text-sm">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="my-4 overflow-x-auto rounded-lg bg-background-secondary p-4 text-sm">
                  {children}
                </pre>
              ),
              hr: () => <hr className="my-6 border-border-secondary" />,
              table: ({ children }) => (
                <div className="my-5 overflow-x-auto rounded-lg border border-border-secondary print:overflow-visible">
                  <table className="w-full border-collapse text-sm">{children}</table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-background-secondary">{children}</thead>
              ),
              th: ({ children }) => (
                <th className="border-b border-border-secondary px-3 py-2 text-left font-semibold">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border-b border-border-secondary px-3 py-2 align-top last:border-b-0">
                  {children}
                </td>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="text-purple underline underline-offset-2 hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
            }}
          >
            {entry.body}
          </ReactMarkdown>
        </article>

        <footer className="mt-12 border-t border-border-secondary pt-4 text-xs text-text-tertiary print:mt-8">
          © DeepDiveKI · Kurs-Material „{entry.title}" ·{" "}
          <code className="font-mono">{slug}</code>
        </footer>
      </div>
    </div>
  );
}
