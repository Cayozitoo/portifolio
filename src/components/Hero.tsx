"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { MagneticButton } from "./ui/MagneticButton";
import { ArrowRight, Cube } from "@phosphor-icons/react";
import { ScrollReveal } from "./ui/ScrollReveal";

export function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "APIs & Integrações Escaláveis.";

  const heroContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroContainerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 18,
    restDelta: 0.0001,
  });

  const contentY = useTransform(smoothProgress, [0, 1], ["0%", "-15%"]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.70], [1, 0]);
  const indicatorOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={heroContainerRef}
      className="relative w-full h-[100dvh] flex items-center justify-center"
    >
      <motion.div
        className="mx-auto w-full max-w-[1400px] px-4 md:px-8 flex flex-col items-center text-center gap-10 relative z-10"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Badge */}
        <ScrollReveal direction="up" delay={0.2}>
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
            style={{
              background: "var(--badge-bg)",
              border: "1px solid var(--badge-border)",
              boxShadow: "0 0 30px var(--accent-glow)",
            }}
          >
            <Cube size={14} weight="fill" className="text-accent" />
            <span className="text-xs font-mono tracking-widest text-accent uppercase">
              Cayo Fellipe — Software Engineer (.NET)
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"
              style={{ boxShadow: "0 0 8px var(--secondary-glow)" }}
            />
          </div>
        </ScrollReveal>

        {/* Heading */}
        <ScrollReveal direction="up" delay={0.35}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.02] max-w-5xl mx-auto">
            <span
              className="block mb-2"
              style={{ color: "var(--text-heading)" }}
            >
              Arquitetura,
            </span>
            <span className="gradient-text block">{displayedText}</span>
          </h1>
        </ScrollReveal>

        {/* Subtitle & CTA */}
        <ScrollReveal direction="up" delay={0.55}>
          <div className="flex flex-col items-center gap-8">
            <p
              className="text-lg md:text-xl max-w-[62ch] leading-relaxed font-medium text-center"
              style={{ color: "var(--text-secondary)" }}
            >
              Soluções focadas em{" "}
              <span className="font-semibold" style={{ color: "var(--accent)" }}>
                robustez e automações
              </span>
              . Construo integrações de alta performance que reduzem esforço
              manual e preparam empresas para escalar.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {/* Primary CTA — orange gradient */}
              <MagneticButton
                className="group gap-2 font-bold tracking-wide text-white border-0"
                style={{
                  background: "linear-gradient(135deg, var(--accent), #f53a00)",
                  boxShadow: "0 0 32px var(--accent-glow)",
                } as React.CSSProperties}
                aria-label="Explorar projetos"
              >
                Explorar Projetos
                <ArrowRight
                  weight="bold"
                  className="group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </MagneticButton>

              {/* Secondary CTA — glass */}
              <button
                className="px-8 py-3 rounded-full hover:scale-105 active:scale-95 transition-all font-medium"
                style={{
                  border: "1px solid var(--glass-border)",
                  background: "var(--bg-glass)",
                  backdropFilter: "blur(14px)",
                  color: "var(--text-primary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--secondary)";
                  e.currentTarget.style.boxShadow = "0 0 20px var(--secondary-glow)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--glass-border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                onClick={() =>
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
                }
                aria-label="Me conheça"
              >
                Me Conheça
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Floating stat pills */}
        <ScrollReveal direction="up" delay={0.75}>
          <div className="flex flex-wrap justify-center gap-6 mt-2">
            {[
              { value: "x3", label: "Eficiência estimada" },
              { value: "2", label: "Ambientes críticos sustentados" },
              { value: "3+", label: "Anos de experiência" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center px-6 py-3 rounded-2xl"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <span
                  className="text-2xl font-black font-mono"
                  style={{ color: "var(--accent)" }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-xs uppercase tracking-widest mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        style={{ opacity: indicatorOpacity }}
      >
        <span
          className="text-xs font-mono uppercase tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          Scroll para explorar
        </span>
        <div
          className="w-px h-10"
          style={{ background: "linear-gradient(to bottom, var(--accent), transparent)" }}
        />
      </motion.div>
    </section>
  );
}
