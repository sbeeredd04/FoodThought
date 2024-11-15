"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const FloatingNav = ({ navItems, className }) => {
  const router = useRouter();

  return (
    <motion.div
      className={cn(
        "sticky top-0 z-50 flex max-w-full mx-auto px-4 py-3 items-center justify-center space-x-2 md:space-x-4",
        "border border-transparent dark:border-white/[0.2] rounded-3xl", // Increased border radius
        "bg-white dark:bg-black shadow-lg w-full md:max-w-3xl", // Decreased max-width for desktop view
        "mt-4 mx-2 md:mt-6 md:mx-4" // Added margins for both mobile and desktop views
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {navItems.map((navItem, idx) => (
        <Link
          key={idx}
          href={navItem.link}
          className="relative flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-300 group w-full md:w-auto"
        >
          {/* Icon visible at all sizes */}
          <span className="block">{navItem.icon}</span>

          {/* Text styling for mobile and larger screens */}
          <span
            className="relative z-10 text-xs md:text-sm transition-colors duration-300
            text-neutral-600 dark:text-neutral-50 group-hover:text-white dark:group-hover:text-black truncate"
          >
            {navItem.name}
          </span>

          {/* Hover effect background with fill transition */}
          <span
            className="absolute inset-0 rounded-md transition-all duration-300 opacity-0 group-hover:opacity-100
            group-hover:bg-black dark:group-hover:bg-white"
          />
        </Link>
      ))}
    </motion.div>
  );
};
