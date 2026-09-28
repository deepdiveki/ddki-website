"use client";
import SectionTitle from "@/components/Common/SectionTitle";
import { Sparkles } from "lucide-react";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "sw-card-glow group/bento row-span-1 flex h-full flex-col justify-between space-y-4 rounded-xl border border-purple-500/20 bg-white/5 p-4 shadow-xs backdrop-blur-sm transition duration-200",
        className,
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mt-2 mb-2 font-sans font-semibold text-white">
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-white/70">
          {description}
        </div>
      </div>
    </div>
  );
};

const feedbackItems = [
  {
    title: "Hilfreich im Unterricht",
    description: "Der DeepChat hilft mir dabei, gezielt Aufgaben für meine Schüler zu entwickeln.",
    icon: <Sparkles className="h-5 w-5 text-purple-400" />,
    header: (
      <div className="text-sm text-white/50">Lehrerin, Berlin</div>
    ),
  },
  {
    title: "Intuitive Bedienung",
    description: "Der DeepChat ist einfach zu bedienen, auch für technikferne Kolleg:innen. Gute Einführung von Björn und Tim.",
    icon: <Sparkles className="h-5 w-5 text-blue-400" />,
    header: (
      <div className="text-sm text-white/50">Schulleiter, Hamburg</div>
    ),
  },
  {
    title: "Enorme Zeitersparnis",
    description: "Ich spare mit dem DeepChat viel Zeit bei administrativen Aufgaben .",
    icon: <Sparkles className="h-5 w-5 text-green-400" />,
    header: (
      <div className="text-sm text-white/50">Lehrkraft, NRW</div>
    ),
  },
  {
    title: "Tolle Fortbildung",
    description: "Viele Information und Tipps, die ich sofort umsetzen kann. Coole Notion Materialsammlung. Gute Diskussion mit Toni.",
    icon: <Sparkles className="h-5 w-5 text-green-400" />,
    header: (
      <div className="text-sm text-white/50">Lehrer, Niedersachsen</div>
    ),
  },
  {
    title: "KI Assistent im DeepChat",
    description: "Den KI Assistenten im DeepChat setze ich gerne ein. So ein Hilfslehrer ist Gold wert.",
    icon: <Sparkles className="h-5 w-5 text-purple-400" />,
    header: (
      <div className="text-sm text-white/50">Lehrer, Köln</div>
    ),
  },
  {
    title: "Planung Klassenreisen",
    description: "Habe meine Klassenfahrt mit dem DeepChat geplant. Das hat mir viel Zeit gespart.",
    icon: <Sparkles className="h-5 w-5 text-blue-400" />,
    header: (
      <div className="text-sm text-white/50">Lehrerin, Hamburg</div>
    ),
  },
  {
    title: "Kuratiertes Promting",
    description: "Ich bin kein Profi beim Thema Digitales. Ich finde das kuratierte Prompting super.",
    icon: <Sparkles className="h-5 w-5 text-green-400" />,
    header: (
      <div className="text-sm text-white/50">Lehrer, Stuttgart</div>
    ),
  },
  {
    title: "Schilf mit DeepDiveKI",
    description: "Björn und Tim waren bei uns an der Schule. Das waren super Workshops. Cool dass man viel ausprobiern konnte.",
    icon: <Sparkles className="h-5 w-5 text-blue-400" />,
    header: (
      <div className="text-sm text-white/50">Didaktische Leitung, Niedersachsen</div>
    ),
  },
  {
    title: "Fortbildung mit DeepDiveKI",
    description: "Vorstellung vieler Apps, direkte Links im Chat, Möglichkeiten zum Ausprobieren, die Videos für zu Hause waren toll.",
    icon: <Sparkles className="h-5 w-5 text-purple-400" />,
    header: (
      <div className="text-sm text-white/50">Lehrerin, Thüringen</div>
    ),
  },
];

const UserFeedback = () => {
  return (
    <section className="overflow-hidden py-17.5 lg:py-22.5 xl:py-27.5">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <SectionTitle variant="software"
          subTitle="User Feedback"
          title="Was unsere Lehrer:innen sagen"
          paragraph="Die besten Geschichten schreibt der Schulalltag. Hier erzählen Lehrer:innen, wie sie unsere Lösungen einsetzen, was sie begeistert, und wie KI ihnen den Rücken im Alltag stärkt."
        />

        <div className="mt-10 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {feedbackItems.map((item, index) => (
            <div className="w-full" key={index}>
              <BentoGridItem
                title={item.title}
                description={item.description}
                header={item.header}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserFeedback;
