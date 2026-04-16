import AccessGate from "../_components/AccessGate";

export default function TutorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AccessGate>{children}</AccessGate>;
}
