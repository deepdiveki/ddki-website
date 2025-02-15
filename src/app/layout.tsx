import AuthProvider from "@/app/context/AuthContext";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title: "DeepDiveKI Künstliche Intelligenz für Schulen und Universitäten",
  description: "Mit der DDKI Toolbox, dem ChatBot für Ihre Schulwebsite und den Fortbildungen zum Thema KI, bieten wir eine breite Palette von KI Produkten für Ihre Institution an.",
  other: {
    "google-site-verification": "rapFK4LKVJ-ur_9PSHMiVY7sFbmvzuTvfYj7TS-bqNE."
  }
};

<meta name="google-site-verification" content="rapFK4LKVJ-ur_9PSHMiVY7sFbmvzuTvfYj7TS-bqNE" />