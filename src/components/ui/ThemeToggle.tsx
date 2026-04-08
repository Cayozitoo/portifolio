"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "@phosphor-icons/react";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        fixed top-6 right-6 z-50 w-12 h-12 rounded-full
        flex items-center justify-center cursor-pointer
        border backdrop-blur-xl
        transition-all duration-500
        shadow-lg
        ${
          isLight
            ? "bg-zinc-100/80 border-zinc-300/50 shadow-zinc-300/30 hover:bg-zinc-200/90"
            : "bg-zinc-900/80 border-white/10 shadow-accent/10 hover:bg-zinc-800/90"
        }
      `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9, rotate: 15 }}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLight ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          >
            <Moon size={22} weight="fill" className="text-zinc-700" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          >
            <Sun size={22} weight="fill" className="text-accent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow ring */}
      <motion.div
        className={`absolute inset-0 rounded-full ${
          isLight ? "bg-amber-400/20" : "bg-accent/20"
        }`}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.button>
  );
}
