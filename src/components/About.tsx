"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "./ui/GlassPanel";
import { ScrollReveal } from "./ui/ScrollReveal";
import { ShieldCheck, Network, Code, TrendUp, User, IdentificationCard } from "@phosphor-icons/react";
import Image from "next/image";

const differentials = [
  {
    title: "Sistemas Críticos",
    description: "Diagnóstico e correção de falhas complexas em sistemas de missão crítica. Foco em disponibilidade.",
    icon: ShieldCheck,
    accentColor: "var(--secondary)",
    glowColor: "var(--secondary-glow)",
  },
  {
    title: "Background Operacional",
    description: "Execução sob alta pressão. Experiência em sistemas de inteligência do EB.",
    icon: TrendUp,
    accentColor: "var(--accent)",
    glowColor: "var(--accent-glow)",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-32 w-full px-4 md:px-8">
      <div className="mx-auto w-full max-w-[1400px] relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start">

          {/* Left Side: Avatar & Badge */}
          <ScrollReveal direction="right" className="w-full lg:w-1/3">
            <div className="relative group mx-auto lg:mx-0 w-max">
              {/* Outer Glow Aura */}
              <motion.div
                className="absolute -inset-4 rounded-[40px] opacity-20 filter blur-3xl group-hover:opacity-40 transition-opacity duration-700"
                style={{ background: "radial-gradient(circle, var(--accent), var(--secondary))" }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Image Container Card */}
              <GlassPanel 
                className="relative overflow-hidden p-3 rounded-[32px] w-[300px] md:w-[380px] aspect-[4/5] flex flex-col"
                style={{ 
                  border: "1px solid var(--border-subtle)",
                  background: "rgba(255, 255, 255, 0.03)"
                }}
              >
                {/* Status Badge */}
                <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse" />
                  <span className="text-[10px] font-mono text-white/80 uppercase tracking-widest font-bold">
                    Available for projects
                  </span>
                </div>

                <div className="relative flex-1 rounded-[24px] overflow-hidden group-hover:bg-white/5 transition-colors duration-500 flex items-end justify-center">
                  <img
                    src="/profile.png"
                    alt="Cayo Fellipe - Software Engineer"
                    className="w-[115%] max-w-none h-auto object-contain translate-y-[5%] group-hover:scale-[1.05] transition-transform duration-700 ease-out"
                  />
                  
                  {/* Subtle vignette to blend bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>

                {/* Info Bar inside Card */}
                <div className="mt-4 px-2 py-1 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold tracking-tight text-white/90">Cayo Fellipe</h4>
                    <p className="text-[10px] text-white/40 font-mono">RECIFE • BRAZIL</p>
                  </div>
                  <IdentificationCard size={24} className="text-white/20" />
                </div>
              </GlassPanel>

              {/* Decorative Floating Tech Tags */}
              <motion.div 
                className="absolute -right-6 top-1/2 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl z-30"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2">
                  <Code size={16} className="text-orange-400" />
                  <span className="text-xs font-mono font-bold text-white/90">.NET 8 Specialist</span>
                </div>
              </motion.div>

              <motion.div 
                className="absolute -left-8 bottom-1/4 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl z-30"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center gap-2">
                  <Network size={16} className="text-blue-400" />
                  <span className="text-xs font-mono font-bold text-white/90">API Architect</span>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Right Side: Copy & Differentials */}
          <div className="flex-1 flex flex-col gap-8">
            <ScrollReveal direction="left">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6" style={{ color: "var(--text-heading)" }}>
                Automação e{" "}
                <span className="gradient-text">Engenharia de Missão Crítica</span>
              </h2>

              <div className="space-y-6 text-lg leading-relaxed max-w-[65ch]" style={{ color: "var(--text-secondary)" }}>
                <p>
                  Sou um desenvolvedor focado em construir a espinha dorsal de sistemas corporativos. Minha atuação no{" "}
                  <strong style={{ color: "var(--text-heading)" }}>Exército Brasileiro</strong> me ensinou que software não é sobre código, é sobre{" "}
                  <strong style={{ color: "var(--accent)" }}>confiabilidade</strong>.
                </p>
                <p>
                  Hoje, utilizo o ecossistema{" "}
                  <strong style={{ color: "var(--secondary)" }}>C# & .NET 8</strong> para arquitetar integrações robustas e ferramentas de automação que transformam operações manuais lentas em processos técnicos estáveis e escaláveis.
                </p>
              </div>

              {/* Tech Skill tags */}
              <div className="flex flex-wrap gap-3 mt-8">
                {["C# / .NET 8", "APIs REST", "Microsserviços", "SQL Server", "Docker", "AWS"].map(
                  (skill, i) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-full text-xs font-bold tracking-tight border"
                      style={{
                        background: "var(--bg-surface)",
                        borderColor: "var(--border-subtle)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </ScrollReveal>

            {/* Differential Mini Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {differentials.map((item, i) => (
                <ScrollReveal key={item.title} direction="up" delay={i * 0.1}>
                  <GlassPanel className="p-5 flex items-start gap-4 group cursor-default" style={{ border: "1px solid var(--border-subtle)" }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-orange-500/50 transition-colors">
                      <item.icon size={20} style={{ color: item.accentColor }} weight="duotone" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1" style={{ color: "var(--text-heading)" }}>{item.title}</h4>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.description}</p>
                    </div>
                  </GlassPanel>
                </ScrollReveal>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
