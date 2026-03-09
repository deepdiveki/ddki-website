"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import type { ComponentProps } from "react";

export default function Accordion({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("overflow-hidden", className)} {...props}>
      {children}
    </div>
  );
}

export function AccordionTrigger({
  children,
  className,
  type = "button",
  "data-state": dataState,
  ...props
}: ComponentProps<"button"> & { "data-state"?: "open" | "closed" }) {
  return (
    <button
      type={type}
      className={cn("group", className)}
      data-state={dataState}
      {...props}
    >
      {children}
    </button>
  );
}

export function AccordionContent({
  children,
  className,
  isOpen,
  ...props
}: ComponentProps<"div"> & { isOpen: boolean }) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
          layout
        >
          <div className={className} {...props}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
