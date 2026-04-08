"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Trophy as Award, Building, Code } from "@phosphor-icons/react";
import { ScrollReveal } from "./ui/ScrollReveal";
import { GlassPanel } from "./ui/GlassPanel";

interface TimelineItem {
  id: number;
  type: "work" | "education" | "award" | "personal";
  title: string;
  company?: string;
  period: string;
  description: string;
  achievements?: string[];
}

const timeline: TimelineItem[] = [
  {
    id: 1,
    type: "work",
    title: "Engenheiro de Software",
    company: "ARPSIST",
    period: "Nov 2024 - Nov 2025",
    description: "Automação de fluxos operacionais e desenvolvimento de APIs REST corporativas com .NET 8.",
    achievements: [
      "Integração entre múltiplos sistemas internos legados e modernos",
      "Diagnóstico e correção de falhas críticas em sistemas de produção",
      "Desenvolvimento de ferramentas internas que eliminaram tarefas manuais repetitivas",
    ],
  },
  {
    id: 2,
    type: "personal",
    title: "Projetos Pessoais & Estudos",
    company: "Independente — Recife, PE",
    period: "Mar 2024 - Nov 2024",
    description: "Período dedicado a aprofundamento técnico e desenvolvimento de projetos full stack próprios.",
    achievements: [
      "Desenvolvimento do Controle de Gastos: API RESTful com ASP.NET Core + React",
      "Estudos avançados de Docker, arquitetura em camadas e Entity Framework Core",
      "Aplicação prática de padrões DTO, Migrations e Clean Architecture",
    ],
  },
  {
    id: 3,
    type: "work",
    title: "Analista de Software",
    company: "CPOR/R - Exército Brasileiro",
    period: "Mar 2023 - Mar 2024",
    description: "Desenvolvimento e sustentação de sistemas críticos de inteligência militar.",
    achievements: [
      "Operação e resolução de incidentes em ambientes de alta pressão e missão crítica",
      "Mapeamento de dados logísticos e operacionais de alta sensibilidade",
      "Sustentação de microsserviços e bancos de dados SQL Server em produção",
    ],
  },
  {
    id: 4,
    type: "education",
    title: "Bacharelado em Eng. de Software",
    company: "Estácio",
    period: "2022 - 2026",
    description:
      "Formação focada em arquitetura de sistemas, qualidade de software, engenharia de requisitos e ciclo de vida de aplicações. Conclusão prevista para 2026.",
  },
];

// orange for work, blue for education/personal
const typeConfig = {
  work: {
    icon: Briefcase,
    accentColor: "var(--accent)",
    glowColor: "var(--accent-glow)",
    bgVar: "rgba(251,146,60,0.10)",
    borderVar: "rgba(251,146,60,0.25)",
    dotGlow: "0 0 16px var(--accent-glow)",
  },
  personal: {
    icon: Code,
    accentColor: "var(--secondary)",
    glowColor: "var(--secondary-glow)",
    bgVar: "rgba(96,165,250,0.08)",
    borderVar: "rgba(96,165,250,0.20)",
    dotGlow: "0 0 16px var(--secondary-glow)",
  },
  education: {
    icon: GraduationCap,
    accentColor: "var(--secondary)",
    glowColor: "var(--secondary-glow)",
    bgVar: "rgba(96,165,250,0.10)",
    borderVar: "rgba(96,165,250,0.25)",
    dotGlow: "0 0 16px var(--secondary-glow)",
  },
  award: {
    icon: Award,
    accentColor: "var(--accent)",
    glowColor: "var(--accent-glow)",
    bgVar: "rgba(251,146,60,0.08)",
    borderVar: "rgba(251,146,60,0.20)",
    dotGlow: "0 0 16px var(--accent-glow)",
  },
};

export function TimelineSection() {
  return (
    <section className="relative py-32 w-full overflow-hidden px-4 md:px-8">
      <div className="mx-auto w-full max-w-[1000px] relative z-10">
        <ScrollReveal direction="up">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4" style={{ color: "var(--text-heading)" }}>
              Trajetória <span className="gradient-text">Profissional</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              Minha evolução através de experiências desafiadoras em ambientes críticos
            </p>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Center line — gradient orange to blue */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, var(--accent), var(--secondary), transparent)" }}
          />

          {timeline.map((item, index) => {
            const config = typeConfig[item.type];
            const Icon = config.icon;
            const isLeft = index % 2 === 0;

            return (
              <ScrollReveal key={item.id} direction={isLeft ? "left" : "right"} delay={index * 0.15}>
                <div className={`relative flex items-start gap-6 mb-12 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>

                  {/* Card */}
                  <div className={`flex-1 ml-12 md:ml-0 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                    <GlassPanel
                      className="group hover:border-opacity-50 transition-all duration-500 relative overflow-hidden"
                      style={{ border: "1px solid var(--border-subtle)" }}
                    >
                      {/* Hover gradient */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                        style={{
                          background: `linear-gradient(135deg, ${config.bgVar} 0%, transparent 100%)`,
                        }}
                      />

                      {/* Period + icon badge */}
                      <div className={`relative z-10 flex items-center gap-3 mb-4 ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
                        <span
                          className="text-sm font-mono uppercase tracking-widest"
                          style={{ color: config.accentColor }}
                        >
                          {item.period}
                        </span>
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: config.bgVar, border: `1px solid ${config.borderVar}` }}
                        >
                          <Icon size={16} weight="bold" style={{ color: config.accentColor }} />
                        </div>
                      </div>

                      <h3 className="relative z-10 text-xl font-bold mb-1 transition-colors" style={{ color: "var(--text-heading)" }}>
                        {item.title}
                      </h3>

                      {item.company && (
                        <div className={`relative z-10 flex items-center gap-2 mb-4 ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
                          <Building size={13} style={{ color: "var(--text-muted)" }} />
                          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{item.company}</span>
                        </div>
                      )}

                      <p className="relative z-10 text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                        {item.description}
                      </p>

                      {item.achievements && (
                        <ul className={`relative z-10 space-y-2 ${isLeft ? "md:text-right" : "md:text-left"}`}>
                          {item.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                              {!isLeft && (
                                <span
                                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                                  style={{ background: config.accentColor }}
                                />
                              )}
                              <span>{achievement}</span>
                              {isLeft && (
                                <span
                                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 md:order-first"
                                  style={{ background: config.accentColor }}
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </GlassPanel>
                  </div>

                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 mt-6 z-10"
                    style={{
                      background: config.accentColor,
                      boxShadow: config.dotGlow,
                    }}
                    whileInView={{ scale: [0, 1.4, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                  />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
