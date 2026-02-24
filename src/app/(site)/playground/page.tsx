import { Metadata } from "next";
import PlaygroundContent from "./PlaygroundContent";

export const metadata: Metadata = {
  title: "Playground – KI-Schulbüro live testen",
  description:
    "Testen Sie das KI-Schulbüro live am Beispiel des fiktiven Nordlicht-Gymnasiums. Stellen Sie Fragen und erleben Sie, wie der Chatbot Ihrer Schulgemeinschaft helfen kann.",
};

export default function PlaygroundPage() {
  return <PlaygroundContent />;
}
