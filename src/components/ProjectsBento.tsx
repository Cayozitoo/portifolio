"use client";

import { motion } from "framer-motion";
import { ArrowRight, HardDrives, FlowArrow, Shield, GithubLogo, ArrowSquareOut, Star } from "@phosphor-icons/react";
import { GlassPanel } from "./ui/GlassPanel";
import { ScrollReveal } from "./ui/ScrollReveal";
import { useState } from "react";
import { config } from "@/lib/config";

interface ProjectCard {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  problem?: string;
  solution?: string;
  result?: string;
  icon: React.ElementType;
  category: string;
  tags: string[];
  gradient: string;
  accentColor: string;
  glowColor: string;
  stats?: { label: string; value: string }[];
  links?: { github?: string; live?: string };
}

const projects: ProjectCard[] = [
  {
    id: 1,
    title: "Reestruturação e Mapeamento da 7ª Região Militar",
    category: "Infra & Governança",
    description: "Mapeamento topológico em larga escala para ambiente crítico complexo",
    problem: "Ambiente crítico complexo com falta de documentação base",
    solution: "Execução do mapeamento topológico em larga escala fornecendo total visibilidade",
    result: "Governança centralizada que baseou decisões estratégicas, rendendo reconhecimento oficial da instituição",
    icon: FlowArrow,
    tags: ["Topologia", "Documentação", "Governança"],
    gradient: "from-blue-500/15 to-cyan-500/10",
    accentColor: "var(--secondary)",
    glowColor: "var(--secondary-glow)",
    stats: [
      { label: "Impacto", value: "95%" },
      { label: "Complexidade", value: "Alta" },
    ],
  },
  {
    id: 2,
    title: "Implementação SPBM Fabric & FortiGate",
    category: "Segurança de Rede",
    description: "Segmentação avançada de rede aplicando VLANs, I-SID e roteamento ISIS",
    solution: "Segmentação avançada com VLANs, I-SID e roteamento ISIS",
    result: "Escalabilidade massiva, segurança granular e controle otimizado e preditivo do tráfego",
    icon: Shield,
    tags: ["SPBM", "FortiGate", "I-SID", "VLAN", "ISIS"],
    gradient: "from-orange-500/15 to-amber-500/10",
    accentColor: "var(--accent)",
    glowColor: "var(--accent-glow)",
    stats: [
      { label: "Segurança", value: "+40%" },
      { label: "Performance", value: "+60%" },
    ],
  },
  {
    id: 3,
    title: "Engenharia de Automações & APIs C#",
    category: "Software Engineering",
    subtitle: "Software Engineering",
    description: "Construção de APIs REST utilizando C# e .NET 8 para otimizar processos críticos internos",
    problem: "Tarefas manuais de alto risco logístico",
    solution: "APIs REST resilientes com .NET 8 e Docker",
    result: "Drástico ganho de eficiência e redução de falhas operacionais",
    icon: HardDrives,
    tags: ["C#", ".NET 8", "REST APIs", "Docker", "Automação"],
    gradient: "from-orange-500/15 to-blue-500/10",
    accentColor: "var(--accent)",
    glowColor: "var(--accent-glow)",
    stats: [
      { label: "Eficiência", value: "~x3" },
      { label: "Redução de Erros", value: "Alta" },
    ],
    links: { github: config.social.github, live: undefined },
  },
];

export function ProjectsBento() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const Project1Icon = projects[0].icon;
  const Project2Icon = projects[1].icon;
  const Project3Icon = projects[2].icon;

  return (
    <section className="relative py-32 w-full overflow-visible px-4 md:px-8">
      <div className="mx-auto w-full max-w-[1400px] relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-14">
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter" style={{ color: "var(--text-heading)" }}>
                Projetos em <span className="gradient-text italic">Produção</span>
              </h2>
              <p className="max-w-xl text-lg" style={{ color: "var(--text-secondary)" }}>
                Soluções reais mapeadas, segmentadas e integradas. Onde a complexidade encontra a clareza operacional.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden md:flex items-center gap-2 text-sm font-mono"
              style={{ color: "var(--text-muted)" }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent-glow)" }}
              />
              Todos os projetos institucionais estão em produção
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[minmax(380px,auto)]">

          {/* Project 1: Large (col-span-8) — Blue accent */}
          <ScrollReveal direction="right" delay={0.1} className="md:col-span-8 h-full">
            <div
              className="h-full"
              onMouseEnter={() => setHoveredProject(1)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <GlassPanel className="h-full flex flex-col justify-between overflow-hidden group relative"
                style={{ border: "1px solid var(--border-subtle)" }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${projects[0].gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                {hoveredProject === 1 && (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                          background: "var(--secondary)",
                          boxShadow: "0 0 6px var(--secondary-glow)",
                          left: `${20 + i * 15}%`,
                          top: `60%`,
                        }}
                        initial={{ y: 0, opacity: 0 }}
                        animate={{ y: -100, opacity: [0, 1, 0] }}
                        transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                      />
                    ))}
                  </>
                )}

                <div className="relative z-10 flex justify-between items-start">
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500"
                    style={{
                      background: "var(--skill-icon-bg)",
                      border: "1px solid var(--glass-border)",
                    }}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                  >
                    <Project1Icon size={28} style={{ color: "var(--secondary)" }} weight="duotone" />
                  </motion.div>
                  <div
                    className="text-xs font-mono px-3 py-1.5 rounded-full"
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {projects[0].category}
                  </div>
                </div>

                <div className="relative z-10 mt-8">
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 transition-colors" style={{ color: "var(--text-heading)" }}>
                    {projects[0].title}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                    <strong style={{ color: "var(--text-heading)" }}>Problema:</strong> {projects[0].problem}
                    <br /><br />
                    <strong style={{ color: "var(--text-heading)" }}>Solução:</strong> {projects[0].solution}
                    <br /><br />
                    <strong style={{ color: "var(--text-heading)" }}>Resultado:</strong> {projects[0].result}
                  </p>

                  {projects[0].stats && (
                    <div className="flex gap-8 mb-6">
                      {projects[0].stats.map((stat, i) => (
                        <div key={i}>
                          <div className="text-2xl font-black font-mono" style={{ color: "var(--secondary)" }}>{stat.value}</div>
                          <div className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-6">
                    {projects[0].tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full transition-all duration-300"
                        style={{
                          background: "var(--bg-surface)",
                          border: "1px solid var(--border-subtle)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <motion.div
                    className="flex items-center gap-2 font-medium cursor-pointer"
                    style={{ color: "var(--secondary)" }}
                    whileHover={{ x: 5 }}
                  >
                    Detalhes da Estratégia <ArrowRight weight="bold" />
                  </motion.div>
                </div>
              </GlassPanel>
            </div>
          </ScrollReveal>

          {/* Project 2: Tall (col-span-4) — Orange accent */}
          <ScrollReveal direction="left" delay={0.2} className="md:col-span-4 h-full">
            <div
              className="h-full"
              onMouseEnter={() => setHoveredProject(2)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <GlassPanel className="h-full flex flex-col justify-between group relative overflow-hidden"
                style={{ border: "1px solid var(--border-subtle)" }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${projects[1].gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                <motion.div
                  className="absolute -inset-1 opacity-0 group-hover:opacity-15 blur-lg transition-opacity duration-700 rounded-2xl"
                  style={{ background: "linear-gradient(to right, var(--accent), var(--secondary))" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-500"
                    style={{
                      background: "var(--skill-icon-bg)",
                      border: "1px solid var(--glass-border)",
                    }}
                    whileHover={{ rotate: 180 }}
                  >
                    <Project2Icon size={24} style={{ color: "var(--accent)" }} weight="duotone" />
                  </motion.div>

                  <h3 className="text-xl font-bold mb-3 transition-colors" style={{ color: "var(--text-heading)" }}>
                    {projects[1].title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                    {projects[1].solution}. O resultado entregou {projects[1].result?.toLowerCase()}.
                  </p>

                  {projects[1].stats && (
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {projects[1].stats.map((stat, i) => (
                        <motion.div
                          key={i}
                          className="p-3 rounded-xl"
                          style={{
                            background: "var(--bg-surface)",
                            border: "1px solid var(--border-subtle)",
                          }}
                          initial={{ scale: 0.9 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                        >
                          <div className="text-lg font-bold font-mono" style={{ color: "var(--accent)" }}>{stat.value}</div>
                          <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative z-10 flex flex-wrap gap-2">
                  {projects[1].tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-lg transition-all duration-300"
                      style={{
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassPanel>
            </div>
          </ScrollReveal>

          {/* Project 3: Full width — Gradient blend */}
          <ScrollReveal direction="up" delay={0.3} className="md:col-span-12 h-auto">
            <div
              className="h-full"
              onMouseEnter={() => setHoveredProject(3)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <GlassPanel
                className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-10 overflow-hidden relative group"
                style={{ border: "1px solid var(--border-subtle)" }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${projects[2].gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                <div className="flex-1 z-10 relative">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500"
                      style={{
                        background: "var(--skill-icon-bg)",
                        border: "1px solid var(--glass-border)",
                      }}
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                    >
                      <Project3Icon size={24} style={{ color: "var(--accent)" }} weight="duotone" />
                    </motion.div>
                    <span className="text-sm font-mono uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                      {projects[2].subtitle}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-2 transition-colors" style={{ color: "var(--text-heading)" }}>
                    {projects[2].title}
                  </h3>
                  <p className="max-w-2xl leading-relaxed text-sm md:text-base mb-4" style={{ color: "var(--text-secondary)" }}>
                    {projects[2].description}. Utilizando{" "}
                    <strong style={{ color: "var(--secondary)" }}>C# e .NET</strong> para otimizar processos críticos internos.
                  </p>

                  <motion.div
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-xl"
                    style={{
                      background: "rgba(251,146,60,0.10)",
                      border: "1px solid rgba(251,146,60,0.25)",
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <Star size={16} style={{ color: "var(--accent)" }} weight="fill" />
                    <span className="text-sm font-medium" style={{ color: "var(--accent)" }}>
                      {projects[2].result}
                    </span>
                  </motion.div>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {projects[2].tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1.5 rounded-lg transition-all duration-300"
                        style={{
                          background: "var(--bg-surface)",
                          border: "1px solid var(--border-subtle)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 z-10 relative flex-shrink-0">
                  <motion.a
                    href={projects[2].links?.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all"
                    style={{
                      background: "linear-gradient(135deg, var(--accent), #f97316)",
                      color: "#fff",
                      boxShadow: "0 0 24px var(--accent-glow)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <GithubLogo size={18} weight="bold" />
                    Ver no GitHub
                  </motion.a>

                  <motion.a
                    href={config.projects.controleGastos}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all"
                    style={{
                      border: "1px solid var(--secondary)",
                      color: "var(--secondary)",
                      background: "var(--bg-glass)",
                      backdropFilter: "blur(12px)",
                    }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px var(--secondary-glow)" }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Ver projeto Controle de Gastos"
                  >
                    <ArrowSquareOut size={16} weight="bold" />
                    Controle de Gastos
                  </motion.a>
                </div>
              </GlassPanel>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
