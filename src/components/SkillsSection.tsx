"use client";

import { motion } from "framer-motion";
import { Code, Database, Globe, HardDrives as Server, Shield, Terminal, Cloud, Cpu } from "@phosphor-icons/react";
import { ScrollReveal } from "./ui/ScrollReveal";

const skills = [
  { name: "C#",         icon: Code,     level: 95, category: "Backend"  },
  { name: ".NET 8",     icon: Server,   level: 90, category: "Backend"  },
  { name: "APIs REST",  icon: Terminal, level: 95, category: "Backend"  },
  { name: "TypeScript", icon: Code,     level: 85, category: "Frontend" },
  { name: "React",      icon: Globe,    level: 80, category: "Frontend" },
  { name: "SQL Server", icon: Database, level: 85, category: "Database" },
  { name: "Docker",     icon: Cpu,      level: 75, category: "DevOps"   },
  { name: "AWS",        icon: Cloud,    level: 70, category: "Cloud"    },
];

// Alternating orange/blue per category
const categoryStyle: Record<string, { gradient: string; barGradient: string; iconGlow: string }> = {
  Backend:  { gradient: "from-orange-500/15 to-amber-500/8",   barGradient: "from-[#fb923c] to-[#f97316]", iconGlow: "var(--accent-glow)"   },
  Frontend: { gradient: "from-blue-500/15 to-sky-500/8",       barGradient: "from-[#60a5fa] to-[#38bdf8]", iconGlow: "var(--secondary-glow)" },
  Database: { gradient: "from-orange-500/12 to-red-500/8",     barGradient: "from-[#fb923c] to-[#ef4444]", iconGlow: "var(--accent-glow)"   },
  Cloud:    { gradient: "from-blue-500/15 to-indigo-500/8",    barGradient: "from-[#60a5fa] to-[#818cf8]", iconGlow: "var(--secondary-glow)" },
  DevOps:   { gradient: "from-blue-500/15 to-cyan-500/8",      barGradient: "from-[#60a5fa] to-[#22d3ee]", iconGlow: "var(--secondary-glow)" },
};

export function SkillsSection() {
  return (
    <section className="relative py-32 w-full px-4 md:px-8">
      <div className="mx-auto w-full max-w-[1400px] relative z-10">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4" style={{ color: "var(--text-heading)" }}>
              Stack <span className="gradient-text">Técnica</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              Tecnologias e ferramentas que domino para entregar soluções de alto impacto
            </p>
          </div>
        </ScrollReveal>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {skills.map((skill, index) => {
            const style = categoryStyle[skill.category] ?? categoryStyle.Backend;
            const isOrange = style.iconGlow === "var(--accent-glow)";

            return (
              <ScrollReveal key={skill.name} direction="scale" delay={index * 0.08} once={true}>
                <motion.div
                  className={`group relative p-6 rounded-2xl overflow-hidden cursor-default`}
                  style={{
                    background: "var(--skill-card-bg)",
                    border: "1px solid var(--border-subtle)",
                    backdropFilter: "blur(16px)",
                  }}
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Hover glow background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Icon */}
                  <motion.div
                    className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                    style={{
                      background: "var(--skill-icon-bg)",
                      border: "1px solid var(--border-subtle)",
                    }}
                    whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
                  >
                    <skill.icon
                      size={26}
                      weight="duotone"
                      style={{ color: isOrange ? "var(--accent)" : "var(--secondary)" }}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </motion.div>

                  {/* Name */}
                  <h3
                    className="relative z-10 text-base font-bold mb-1 transition-colors duration-300"
                    style={{ color: "var(--text-heading)" }}
                  >
                    {skill.name}
                  </h3>

                  {/* Category */}
                  <span
                    className="relative z-10 text-[10px] uppercase tracking-widest font-mono"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {skill.category}
                  </span>

                  {/* Progress bar */}
                  <div
                    className="relative z-10 mt-4 h-1 rounded-full overflow-hidden"
                    style={{ background: "var(--progress-bg)" }}
                  >
                    <motion.div
                      className={`h-full bg-gradient-to-r ${style.barGradient} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: index * 0.08 + 0.3, ease: "easeOut" }}
                    />
                  </div>

                  {/* Level */}
                  <div className="relative z-10 mt-2 flex justify-end">
                    <span
                      className="text-xs font-mono font-bold"
                      style={{ color: isOrange ? "var(--accent)" : "var(--secondary)" }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Additional tech tags */}
        <ScrollReveal direction="up" delay={0.5}>
          <div className="mt-14 flex flex-wrap justify-center gap-3">
            {["Node.js", "Express.js", "Java", "Spring Boot", "NestJS", "Angular", "React Native", "PostgreSQL", "Firebase", "Linux", "Docker"].map(
              (tech, i) => (
                <motion.span
                  key={tech}
                  className="px-4 py-2 rounded-full text-sm font-medium cursor-default"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-secondary)",
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    color: i % 2 === 0 ? "var(--accent)" : "var(--secondary)",
                    borderColor: i % 2 === 0 ? "var(--accent)" : "var(--secondary)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tech}
                </motion.span>
              )
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
