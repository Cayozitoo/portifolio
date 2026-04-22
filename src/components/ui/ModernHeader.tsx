"use client";

import { motion } from "framer-motion";
import { config } from "@/lib/config";

export function ModernHeader() {
  const navLinks = [
    { name: "SOBRE", href: "#about" },
    { name: "PROJETOS", href: "#projects" },
    { name: "CONTATO", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-12 md:py-8 flex items-center justify-between pointer-events-none">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pointer-events-auto flex-1 h-full flex items-center"
      >
        <span className="text-xl font-black tracking-tighter text-white">
          {config.personal.name.toLowerCase().replace(" ", "")}.dev
        </span>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="hidden md:flex flex-1 justify-center pointer-events-auto h-full items-center"
      >
        <a 
          href={`mailto:${config.personal.email}`}
          className="text-sm font-bold tracking-widest text-white/90 hover:text-white transition-colors duration-300"
        >
          {config.personal.email}
        </a>
      </motion.div>

      <nav className="flex flex-1 items-center justify-end gap-8 md:gap-12 pointer-events-auto h-full">
        {navLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.href}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="text-xs md:text-sm font-bold tracking-[0.2em] text-white/90 hover:text-white transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {link.name}
          </motion.a>
        ))}
      </nav>
    </header>
  );
}
