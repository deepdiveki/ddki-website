import "./fortbildung-theme.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function FortbildungLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      <main
        id="main-content"
        className="animate-in fade-in min-h-screen bg-background-secondary duration-700"
      >
        {children}
      </main>

      <Footer />
    </>
  );
}
