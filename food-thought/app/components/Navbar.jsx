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
        "sticky top-0 z-50 flex max-w-fit mx-auto my-4 px-6 py-3 items-center space-x-4",
        "border border-transparent dark:border-white/[0.2] rounded-full",
        "bg-white dark:bg-black shadow-lg",
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {navItems.map((navItem, idx) => (
        <Link
          key={idx}
          href={navItem.link} // Correctly pass the `link` property to href
          className="relative flex items-center space-x-2 px-3 py-2 rounded-full transition-colors duration-300 group"
        >
          <span className="block sm:hidden">{navItem.icon}</span>

          {/* Text styling with hover effect */}
          <span
            className="relative z-10 hidden sm:block text-sm transition-colors duration-300
            text-neutral-600 dark:text-neutral-50 group-hover:text-white dark:group-hover:text-black"
          >
            {navItem.name}
          </span>

          {/* Hover effect background with fill transition */}
          <span
            className="absolute inset-0 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100
            group-hover:bg-black dark:group-hover:bg-white"
          />
        </Link>
      ))}
    </motion.div>
  );
};
