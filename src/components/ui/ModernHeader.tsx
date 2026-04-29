"use client";

import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/lib/config";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";

export function ModernHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "SOBRE", href: "#about" },
    { name: "PROJETOS", href: "#projects" },
    { name: "CONTATO", href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
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

        <nav className="hidden md:flex flex-1 items-center justify-end gap-8 md:gap-12 pointer-events-auto h-full">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="text-xs md:text-sm font-bold tracking-[0.2em] text-white/90 hover:text-white transition-colors duration-300"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.name}
            </motion.a>
          ))}
        </nav>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex md:hidden flex-1 justify-end pointer-events-auto"
        >
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:text-[#a855f7] transition-colors"
          >
            <List size={32} />
          </button>
        </motion.div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center pointer-events-auto"
          >
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-[#a855f7] transition-colors"
            >
              <X size={32} />
            </button>

            <nav className="flex flex-col items-center gap-12">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="text-2xl font-black tracking-widest text-white hover:text-[#a855f7] transition-colors duration-300"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                href={`mailto:${config.personal.email}`}
                className="mt-8 text-sm font-bold tracking-widest text-white/50 hover:text-white transition-colors duration-300"
              >
                {config.personal.email}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
