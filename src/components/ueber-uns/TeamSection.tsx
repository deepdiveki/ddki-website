"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  HeaderSubtitle,
  HeaderTitle,
  SectionHeader,
} from "../ui/SectionHeader";

const teamMembers = [
  {
    name: "Björn Isenbiel",
    designation: "Geschäftsführer\nLehrkraft für PGW, Informatik & Sport",
    image: "/images/team/team-01.png",
  },
  {
    name: "Tim Philipp",
    designation: "Geschäftsführer\nLehrkraft für Informatik & Sport",
    image: "/images/team/team-02.png",
  },
{
    name: "Dr. Nora Schröder",
    designation: "Learning Experience Designer\nand Teaching Consultant",
    image: "/images/team/team-06.png",
  },
  {
    name: "Tim Maximilian Baum",
    designation: "Full Stack Software Engineer",
    image: "/images/team/team-05.png",
  },
];

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
          <HeaderTitle className="text-display-xs font-light -tracking-[0.72px] text-text-primary lg:text-display-sm">Unser Team</HeaderTitle>
          <HeaderSubtitle className="mx-auto mt-3 max-w-150 text-md font-light text-text-secondary">
            Wir sind Lehrkräfte, Entwickler und Bildungsenthusiasten. Vereint
            durch die Vision, KI sinnvoll in den Schulalltag zu bringen.
          </HeaderSubtitle>
        </SectionHeader>
      </motion.div>

      <div className="mx-auto mt-10 grid max-w-304 grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 xl:px-0">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
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
            <div
              className={cn(
                "relative size-40 overflow-hidden rounded-full bg-background-secondary",
                (member.image === "/images/team/team-01.png" ||
                  member.image === "/images/team/team-02.png" ||
                  member.image === "/images/team/team-05.png") &&
                  "border-2 border-black"
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
                    "scale-125"
                )}
              />
            </div>
            <h3 className="mt-5 text-lg font-medium text-text-primary">
              {member.name}
            </h3>
            <p className="mt-1 max-w-52 whitespace-pre-line text-sm font-light text-text-secondary">
              {member.designation}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
