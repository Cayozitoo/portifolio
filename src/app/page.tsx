"use client";

import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ProjectsBento } from "@/components/ProjectsBento";
import { SkillsSection } from "@/components/SkillsSection";
import { TimelineSection } from "@/components/TimelineSection";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { CyberTracker } from "@/components/CyberTracker";
import { VideoBackground } from "@/components/VideoBackground";
import { useScrollSpy } from "@/lib/useScrollSpy";
import { motion } from "framer-motion";
import { LinkedinLogo, EnvelopeSimple, GithubLogo } from "@phosphor-icons/react";
import { config } from "@/lib/config";

export default function Home() {
  const activeId = useScrollSpy(["hero", "about", "projects", "skills", "timeline", "contato"], 150);

  const divider = (
    <div
      className="w-full h-px max-w-full"
      style={{ background: "linear-gradient(to right, transparent, var(--divider), transparent)" }}
    />
  );

  return (
    <main className="flex min-h-[100dvh] w-full flex-col theme-text selection:bg-accent/30 selection:text-white overflow-clip relative">
      {/* Fixed video background — global */}
      <VideoBackground />

      <ThemeToggle />
      <CyberTracker activeId={activeId} />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col px-4 md:px-8">
        <div className="w-full flex flex-col">

          <div id="hero"><Hero /></div>
          {divider}
          <div id="about"><About /></div>
          {divider}
          <div id="projects"><ProjectsBento /></div>
          {divider}
          <div id="skills"><SkillsSection /></div>
          {divider}
          <div id="timeline"><TimelineSection /></div>

          {/* Footer */}
          <footer
            id="contato"
            className="w-full py-28 px-4 text-center flex flex-col items-center justify-center mt-auto relative overflow-hidden"
            style={{ borderTop: "1px solid var(--divider)" }}
          >
            {/* Background glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at bottom center, var(--accent-glow) 0%, transparent 70%)`,
                opacity: 0.15,
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at top center, var(--secondary-glow) 0%, transparent 60%)`,
                opacity: 0.10,
              }}
            />

            <div className="relative z-10 w-full flex flex-col items-center max-w-3xl mx-auto">
              {/* Tag */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-mono uppercase tracking-widest"
                style={{
                  background: "var(--badge-bg)",
                  border: "1px solid var(--badge-border)",
                  color: "var(--accent)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
                {config.status.badge}
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-black tracking-tighter mb-6"
                style={{ color: "var(--text-heading)" }}
              >
                Pronto para arquitetar e{" "}
                <span className="gradient-text">entregar o inegociável</span>.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="max-w-xl mx-auto mb-12 text-lg"
                style={{ color: "var(--text-secondary)" }}
              >
                Em evolução constante rumo à liderança técnica. Busco desafios onde a robustez da
                infraestrutura e a eficiência do código se fundem para criar impacto real.
              </motion.p>

              {/* CTA Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center gap-4 mb-16"
              >
                <motion.a
                  href={config.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-white transition-all"
                  style={{
                    background: "linear-gradient(135deg, var(--accent), #f97316)",
                    boxShadow: "0 0 32px var(--accent-glow)",
                  }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 48px var(--accent-glow)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <LinkedinLogo size={20} weight="fill" />
                  Conectar no LinkedIn
                </motion.a>

                <motion.a
                  href={`mailto:${config.personal.email}`}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold transition-all"
                  style={{
                    border: "1px solid var(--secondary)",
                    color: "var(--secondary)",
                    background: "var(--bg-glass)",
                    backdropFilter: "blur(14px)",
                  }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 28px var(--secondary-glow)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <EnvelopeSimple size={20} weight="bold" />
                  Enviar Email
                </motion.a>

                <motion.a
                  href={config.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold transition-all"
                  style={{
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-secondary)",
                    background: "var(--bg-glass)",
                    backdropFilter: "blur(14px)",
                  }}
                  whileHover={{ scale: 1.05, borderColor: "var(--border-hover)", color: "var(--text-heading)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <GithubLogo size={20} weight="bold" />
                  GitHub
                </motion.a>
              </motion.div>

              {/* Bottom bar */}
              <div
                className="w-full pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
                style={{ borderTop: "1px solid var(--border-subtle)" }}
              >
                <span className="text-sm font-mono uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                  © {new Date().getFullYear()} {config.personal.name} — {config.personal.location}
                </span>
                <div className="flex items-center gap-2 text-sm font-mono" style={{ color: "var(--text-muted)" }}>
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--accent)", boxShadow: "0 0 6px var(--accent-glow)" }}
                  />
                  Engineering & Operations
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--secondary)", boxShadow: "0 0 6px var(--secondary-glow)" }}
                  />
                </div>
              </div>
            </div>
          </footer>

        </div>
      </div>
    </main>
  );
}
