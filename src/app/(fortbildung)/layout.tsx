import "./fortbildung-theme.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function FortbildungLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.variable}>
      <Header />
      <AnnouncementBar variant="fortbildung" />

      <main
        id="main-content"
        className="animate-in fade-in min-h-screen font-inter bg-background-secondary duration-700"
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
