"use client";

import { motion } from "framer-motion";

export function AnnouncementBar({ message }: { message?: string }): JSX.Element | null {
  if (!message) {
    return null;
  }

  return (
    <motion.div
      className="bg-neutral-900 py-2 text-center text-sm font-medium text-white"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {message}
    </motion.div>
  );
}
