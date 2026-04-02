"use client";

import SectionTitle from "@/components/Common/SectionTitle";
import { Sparkles } from "lucide-react";

const feedbackItems = [
  {
    title: "Hilfreich im Unterricht",
    description: "Der KI-Chat hilft mir dabei, gezielt Aufgaben für meine Schüler zu entwickeln.",
    icon: <Sparkles className="h-5 w-5 text-purple-400" />,
    header: (
      <div className="text-sm text-white/60 dark:text-neutral-500">Lehrerin, Berlin</div>
    ),
  },
  {
    title: "Intuitive Bedienung",
    description: "Das System ist super einfach zu bedienen, auch für technikferne Kolleg:innen.",
    icon: <Sparkles className="h-5 w-5 text-blue-400" />,
    header: (
      <div className="text-sm text-white/60 dark:text-neutral-500">Schulleiter, Hamburg</div>
    ),
  },
  {
    title: "Enorme Zeitersparnis",
    description: "Ich spare täglich mindestens 30 Minuten bei der Unterrichtsvorbereitung.",
    icon: <Sparkles className="h-5 w-5 text-green-400" />,
    header: (
      <div className="text-sm text-white/60 dark:text-neutral-500">Lehrkraft, NRW</div>
    ),
  },
];

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ") + " bg-gradient-to-b from-[#1a1a1f] to-[#0d0d12]";
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
        "group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-white/10 transition duration-200 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] dark:shadow-purple-500/10 backdrop-blur-sm",
        className,
      )}
    >
      {header}
      {icon && (
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-[#1a1a1f] text-purple-400">
          {icon}
        </div>
      )}
      <div className="font-sans font-semibold text-white">{title}</div>
      <div className="font-sans text-sm text-white/60">{description}</div>
    </div>
  );
};

const UserFeedbackGrid = () => {
  return (
    <section className="overflow-hidden py-17.5 lg:py-22.5 xl:py-27.5">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <SectionTitle variant="software"
          subTitle="Triff unser Team"
          title="Unser Team"
          paragraph="Wir sind ein junges Team aus Hamburg mit einer Leidenschaft für Künstliche Intelligenz und Bildung. Unsere Vision ist es, KI für alle zugänglich zu machen und den Einsatz von KI im Bildungsbereich zu fördern."
        />
        <div className="mt-12">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-1">
            {feedbackItems.map((item, index) => (
              <div className="snap-center shrink-0 w-80" key={index}>
                <BentoGridItem
                  className="hover:border-purple-500/40 hover:shadow-[0_0_10px_#a855f7] border-white/10"
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  icon={item.icon}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserFeedbackGrid;