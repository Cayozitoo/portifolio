"use client";

import { useRef } from "react";
import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

const timeline = [
  {
    id: 1,
    year: "2024",
    title: "Engenheiro de Software",
    company: "ARPSIST",
    description:
      "Automatizei fluxos operacionais desenvolvendo APIs REST corporativas com .NET 8. Arquitetei integrações entre sistemas legados, diagnostiquei falhas críticas em produção e eliminei processos manuais de alto risco.",
  },
  {
    id: 2,
    year: "2023",
    title: "Analista de Software",
    company: "CPOR/R — Exército Brasileiro",
    description:
      "Desenvolvimento e sustentação de sistemas críticos de inteligência militar (C#, .NET, SQL Server) com foco em alta disponibilidade e precisão estratégica. Liderança na resolução de incidentes em ambientes de alta pressão e mapeamento de dados logísticos/operacionais para a 7ª Região Militar do Nordeste. Aplicação de metodologias ágeis em cenários de máxima conformidade.",
  },
  {
    id: 3,
    year: "2022",
    title: "Bacharelado em Eng. de Software",
    company: "Estácio",
    description:
      "Formação centrada em arquitetura de sistemas, engenharia de requisitos, design patterns e ciclo de vida de aplicações modernas. Conclusão prevista para 2026.",
  },
];

const TAIL_H = 280;

function TimelineRow({
  item,
  progress,
  threshold,
}: {
  item: (typeof timeline)[0];
  progress: MotionValue<number>;
  threshold: number;
}) {
  const opacity = useTransform(
    progress,
    [threshold - 0.06, threshold, threshold + 0.06],
    [0, 0.6, 1]
  );
  const y = useTransform(
    progress,
    [threshold - 0.06, threshold + 0.06],
    [18, 0]
  );

  return (
    <motion.div
      className="relative flex flex-col md:grid md:grid-cols-[1fr_auto_100px_1fr] items-start md:items-center py-8 md:py-14 gap-2 md:gap-0 border-b border-white/5 md:border-none"
      style={{
        opacity,
        y,
      }}
    >
      <div className="flex flex-col md:pr-8">
        <h3
          className="text-xl md:text-xl lg:text-2xl font-bold tracking-tight leading-tight mb-1"
          style={{ color: "var(--text-heading)", fontFamily: "var(--font-heading)" }}
        >
          {item.title}
        </h3>
        <span className="text-sm font-medium mb-2 md:mb-0" style={{ color: "var(--accent)" }}>
          {item.company}
        </span>
      </div>

      <div className="flex items-center justify-start md:justify-end md:pr-12">
        <span
          className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-mono mb-4 md:mb-0"
          style={{ color: "var(--text-heading)" }}
        >
          {item.year}
        </span>
      </div>

      <div className="hidden md:block" />

      <div className="md:pl-4">
        <p
          className="text-sm md:text-base leading-relaxed"
          style={{ color: "rgba(148,163,184,0.82)" }}
        >
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.25"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 28,
    damping: 20,
    restDelta: 0.00005,
  });

  const tracerY     = useTransform(smooth, [0, 1], ["0%", "100%"]);
  const glowOpacity = useTransform(smooth, [0, 0.03, 0.93, 1], [0, 1, 1, 0]);

  const trailHeight = useTransform(smooth, [0, 1], ["0%", "100%"]);

  const titleOpacity = useTransform(smooth, [0, 0.08, 0.28, 0.42], [0.40, 1, 0.45, 0.18]);
  const titleGlow    = useTransform(smooth, [0, 0.08, 0.26], [0, 1, 0]);

  const thresholds = [0.20, 0.48, 0.76];

  return (
    <section ref={sectionRef} className="relative py-28 md:py-36 w-full overflow-hidden px-4 md:px-8">
      <div className="mx-auto w-full max-w-[1200px] relative z-10">

        <motion.div
          className="relative text-center mb-16 md:mb-24 select-none"
          style={{ opacity: titleOpacity }}
        >
          <div
            className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none"
            style={{
              fontFamily: "var(--font-heading)",
              color: "rgba(194,164,255,0.30)",
              letterSpacing: "-0.02em",
            }}
          >
            Minha carreira &amp;
          </div>
          <motion.div
            className="text-4xl md:text-6xl lg:text-[86px] font-black tracking-tight leading-none -mt-1 md:-mt-2"
            style={{
              fontFamily: "var(--font-heading)",
              color: "#ffffff",
              letterSpacing: "-0.03em",
              filter: useTransform(
                titleGlow,
                (v) =>
                  `drop-shadow(0 0 ${Math.round(v * 36)}px rgba(194,164,255,${(v * 0.65).toFixed(2)}))`
              ),
            }}
          >
            Experiência
          </motion.div>
        </motion.div>

        <div className="relative flex flex-col">

          {timeline.map((item, i) => (
            <TimelineRow
              key={item.id}
              item={item}
              progress={smooth}
              threshold={thresholds[i]}
            />
          ))}

          <motion.div
            className="absolute top-0 hidden md:block pointer-events-none"
            style={{
              left: "50%",
              marginLeft: "-0.5px",
              width: "1px",
              height: trailHeight,
              background:
                "linear-gradient(to bottom, rgba(194,164,255,0.04) 0%, rgba(194,164,255,0.12) 60%, rgba(194,164,255,0.06) 100%)",
              opacity: glowOpacity,
            }}
          />

          <motion.div
            className="absolute hidden md:block pointer-events-none"
            style={{
              left: "50%",
              marginLeft: "-1px",
              top: tracerY,
              marginTop: `-${TAIL_H}px`,
              width: "2px",
              height: `${TAIL_H}px`,
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(194,164,255,0.02) 18%, rgba(194,164,255,0.10) 42%, rgba(194,164,255,0.45) 72%, rgba(194,164,255,0.88) 92%, #c2a4ff 100%)",
              filter: "blur(0.6px)",
              opacity: glowOpacity,
            }}
          />

          <motion.div
            className="absolute hidden md:block pointer-events-none"
            style={{
              left: "50%",
              top: tracerY,
              marginLeft: "-50px",
              marginTop: "-50px",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(194,164,255,0.28) 0%, rgba(168,124,255,0.08) 45%, transparent 70%)",
              filter: "blur(8px)",
              opacity: glowOpacity,
            }}
          />

          <motion.div
            className="absolute hidden md:block pointer-events-none"
            style={{
              left: "50%",
              top: tracerY,
              marginLeft: "-85px",
              marginTop: "-85px",
              width: "170px",
              height: "170px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(168,124,255,0.10) 0%, transparent 70%)",
              filter: "blur(20px)",
              opacity: glowOpacity,
            }}
          />

          <motion.div
            className="absolute hidden md:block pointer-events-none rounded-full"
            style={{
              left: "50%",
              top: tracerY,
              marginLeft: "-5px",
              marginTop: "-5px",
              width: "10px",
              height: "10px",
              background:
                "radial-gradient(circle, #ffffff 0%, #ddd0ff 50%, #c2a4ff 100%)",
              boxShadow: [
                "0 0 0 1.5px rgba(194,164,255,0.5)",
                "0 0 10px 3px rgba(194,164,255,0.75)",
                "0 0 28px 8px rgba(168,124,255,0.40)",
                "0 0 55px 18px rgba(168,124,255,0.15)",
              ].join(", "),
              opacity: glowOpacity,
            }}
          />

        </div>
      </div>
    </section>
  );
}
