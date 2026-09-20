"use client";

import teamData from "@/components/About/Team/teamData";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  HeaderSubtitle,
  HeaderTitle,
  SectionHeader,
} from "../ui/SectionHeader";

const FOUNDER_NAMES = ["Björn Isenbiel", "Tim Philipp"];
const founders = teamData.filter((m) => FOUNDER_NAMES.includes(m.name));
const dozenten = teamData.filter((m) => !FOUNDER_NAMES.includes(m.name));

function MemberCard({
  member,
  index,
  founder = false,
}: {
  member: (typeof teamData)[number];
  index: number;
  founder?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="flex flex-col items-center text-center"
    >
      <div className="rounded-full p-[3px] [background:linear-gradient(120deg,#8646F4_0%,#D345F8_100%)] shadow-[0_8px_24px_rgba(134,70,244,0.25)]">
        <div
          className={cn(
            "relative overflow-hidden rounded-full border-[3px] border-white bg-background-secondary",
            founder ? "size-44" : "size-40",
          )}
        >
          <Image
            src={member.image}
            alt={member.name}
            fill
            className={cn(
              "object-cover",
              (member.image === "/images/team/team-01.png" ||
                member.image === "/images/team/team-02.png") &&
                "scale-125",
              member.image === "/images/team/team-06.png" &&
                "object-[center_35%]",
            )}
          />
        </div>
      </div>
      <h3 className="mt-5 text-lg font-medium text-text-primary">
        {member.name}
      </h3>
      <p className="mt-1 max-w-52 whitespace-pre-line text-sm font-light text-text-secondary">
        {member.designation}
      </p>
    </motion.div>
  );
}

export default function TeamSection() {
  return (
    <section className="bg-white py-10 md:py-14 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <SectionHeader className="mx-auto max-w-304 px-4 text-center xl:px-0">
          <HeaderTitle className="text-display-xs font-semibold -tracking-[0.72px] text-text-primary lg:text-display-sm">
            Unser Team
          </HeaderTitle>
          <HeaderSubtitle className="mx-auto mt-3 max-w-150 text-md font-light text-text-secondary">
            Wir sind Lehrkräfte, Entwickler und Bildungsenthusiasten. Vereint
            durch die Vision, KI sinnvoll in den Schulalltag zu bringen.
          </HeaderSubtitle>
        </SectionHeader>
      </motion.div>

      {/* Geschäftsführung */}
      <div className="mx-auto mt-10 flex max-w-304 flex-col items-center gap-8 px-4 sm:flex-row sm:justify-center sm:gap-16 lg:mt-16 lg:gap-24 xl:px-0">
        {founders.map((member, index) => (
          <MemberCard key={member.name} member={member} index={index} founder />
        ))}
      </div>

      {/* Dozenten & Team */}
      <div className="mx-auto mt-12 flex max-w-304 flex-col items-center gap-8 px-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-12 lg:mt-16 lg:gap-20 xl:px-0">
        {dozenten.map((member, index) => (
          <MemberCard key={member.name} member={member} index={index} />
        ))}
      </div>
    </section>
  );
}
