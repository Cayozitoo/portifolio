"use client";

import { motion } from "framer-motion";
import { House, User, Code, Swap, Layout, EnvelopeSimple } from "@phosphor-icons/react";

interface CyberTrackerProps {
  activeId: string;
}

const sections = [
  { id: "hero",     label: "Início",    icon: House },
  { id: "about",    label: "Sobre",     icon: User },
  { id: "projects", label: "Projetos",  icon: Layout },
  { id: "skills",   label: "Stack",     icon: Code },
  { id: "timeline", label: "Trajetória",icon: Swap },
  { id: "contato",  label: "Contato",   icon: EnvelopeSimple },
];

export function CyberTracker({ activeId }: CyberTrackerProps) {
  const activeIndex =
    sections.findIndex((s) => s.id === activeId) !== -1
      ? sections.findIndex((s) => s.id === activeId)
      : 0;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-0 top-0 h-[100dvh] w-24 flex-col items-center justify-center pointer-events-none z-50 hidden md:flex">
      {/* Rail */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[2px] h-[60vh] rounded-full"
        style={{ background: "var(--border-subtle)" }}
      />

      {/* Active glow traveler */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-[3px] rounded-full z-10"
        style={{
          background: "var(--accent)",
          boxShadow: "0 0 16px var(--accent-glow)",
        }}
        animate={{
          top: `calc(20vh + ${(activeIndex / (sections.length - 1)) * 60}vh)`,
          height: "44px",
          y: "-50%",
        }}
        transition={{ type: "spring", stiffness: 100, damping: 22 }}
      />

      <div className="relative h-[60vh] w-full flex flex-col justify-between items-center py-4">
        {sections.map((section, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={section.id}
              className="relative w-full flex justify-center items-center pointer-events-auto group cursor-pointer"
              onClick={() => scrollTo(section.id)}
            >
              {/* Dot */}
              <motion.div
                animate={{
                  scale: isActive ? 1.6 : 1,
                  backgroundColor: isActive ? "var(--accent)" : "var(--bg-surface)",
                  borderColor: isActive ? "transparent" : "var(--border-subtle)",
                  boxShadow: isActive ? "0 0 14px var(--accent-glow)" : "none",
                }}
                className="w-2.5 h-2.5 rounded-full border z-20 transition-all duration-300"
              />

              {/* Tooltip — respects theme via CSS vars */}
              <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-0 -translate-x-3 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto transition-all duration-300 pr-2">
                <div
                  className="px-4 py-2 rounded-xl flex items-center gap-3 whitespace-nowrap shadow-xl backdrop-blur-xl"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--glass-border)",
                  }}
                >
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: isActive ? "var(--accent)" : "var(--text-primary)" }}
                  >
                    {section.label}
                  </span>
                  <section.icon
                    size={16}
                    weight={isActive ? "fill" : "regular"}
                    style={{ color: isActive ? "var(--accent)" : "var(--text-muted)" }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
