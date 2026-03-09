"use client";

import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  BrainCircuit,
  GraduationCap,
  Lightbulb,
  PenTool,
} from "lucide-react";

const floatingItems = [
  {
    icon: BookOpen,
    x: "15%",
    y: "18%",
    size: 22,
    delay: 0,
    duration: 5.5,
    range: 8,
  },
  {
    icon: Lightbulb,
    x: "78%",
    y: "14%",
    size: 18,
    delay: 0.8,
    duration: 6,
    range: 10,
  },
  {
    icon: Award,
    x: "82%",
    y: "70%",
    size: 20,
    delay: 1.5,
    duration: 5,
    range: 7,
  },
  {
    icon: PenTool,
    x: "12%",
    y: "72%",
    size: 16,
    delay: 0.4,
    duration: 6.5,
    range: 9,
  },
  {
    icon: BrainCircuit,
    x: "25%",
    y: "45%",
    size: 15,
    delay: 2,
    duration: 7,
    range: 6,
  },
  {
    icon: BookOpen,
    x: "72%",
    y: "42%",
    size: 14,
    delay: 1.2,
    duration: 5.8,
    range: 8,
  },
];

export default function FortbildungenAnimation() {
  return (
    <div className="relative h-full w-full">
      {/* Central graduation cap */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="flex size-20 items-center justify-center rounded-2xl bg-white/80 shadow-md lg:size-24"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <GraduationCap className="size-10 text-primary-darker lg:size-12" />
        </motion.div>
      </div>

      {/* Orbiting ring — subtle rotating dashed circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="size-36 rounded-full border border-dashed border-primary-base/25 lg:size-44"
          animate={{ rotate: 360 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating icons */}
      {floatingItems.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: item.x, top: item.y }}
            animate={{
              y: [-item.range, item.range, -item.range],
              x: [
                -item.range * 0.4,
                item.range * 0.4,
                -item.range * 0.4,
              ],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="flex items-center justify-center rounded-lg bg-white/60 p-2 shadow-sm backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: item.delay + 0.3,
              }}
            >
              <Icon
                size={item.size}
                className="text-primary-dark/70"
              />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Decorative dots */}
      {[
        { x: "40%", y: "12%", delay: 0.5 },
        { x: "60%", y: "85%", delay: 1.0 },
        { x: "90%", y: "30%", delay: 1.5 },
        { x: "8%", y: "55%", delay: 2.0 },
      ].map((dot, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute size-1.5 rounded-full bg-primary-base/40"
          style={{ left: dot.x, top: dot.y }}
          animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: 3,
            delay: dot.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
