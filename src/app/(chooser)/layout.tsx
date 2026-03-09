import "./chooser-theme.css";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const stackSans = localFont({
  src: [
    {
      path: "../../../public/fonts/stack-sans-text/stack-sans-text-latin-wght-normal.woff2",
      weight: "200 700",
    },
  ],
  variable: "--font-stack-sans-text",
});

export default function ChooserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn(
        "min-h-screen w-full bg-background-secondary antialiased",
        stackSans.className,
        inter.variable,
      )}
    >
      <a
        href="#main-content"
        className="fixed left-4 z-[200] -top-full rounded-lg bg-primary-darker px-4 py-2 text-sm font-medium text-white transition-all focus:top-4"
      >
        Zum Hauptinhalt springen
      </a>
      {children}
    </div>
  );
}
