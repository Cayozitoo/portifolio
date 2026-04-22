"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 18,
    restDelta: 0.0001,
  });

  const contentOpacity = useTransform(smoothProgress, [0.3, 0.8], [1, 0]);
  const contentY = useTransform(smoothProgress, [0.3, 0.8], ["0%", "-10%"]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-[80vh] md:min-h-screen w-full px-6 md:px-12 lg:px-20 flex items-center py-20 overflow-visible"
    >
      <motion.div
        className="absolute inset-x-0 inset-y-0 w-full h-full flex items-center pointer-events-none"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div
          className="absolute bottom-[-8%] left-[-25%] md:left-[-10%] lg:left-[10%] w-[250%] md:w-[85%] lg:w-[45%] h-full flex justify-center md:justify-start items-end pointer-events-none z-0 overflow-visible"
        >
          <div 
            className="absolute inset-x-0 bottom-[-10%] w-full h-full opacity-15 pointer-events-none"
            style={{
              background: "radial-gradient(circle at center, rgba(168, 85, 247, 0.45) 0%, transparent 38%)",
              filter: "blur(100px)"
            }}
          />
          <motion.img
            src="/avatar_3d.png"
            alt="Cayo Fellipe 3D"
            className="relative z-10 w-full h-full object-contain object-bottom drop-shadow-[0_15px_70px_rgba(0,0,0,0.5)] pointer-events-auto"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="w-full max-w-full mx-auto relative z-10 flex justify-end">
          <div className="w-full md:w-1/2 lg:w-[48%] flex flex-col justify-center mt-64 md:mt-0 pb-10 md:pb-0 z-20 pointer-events-auto pr-4 md:pr-12">
            <h4
              className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase mb-6"
              style={{ color: "var(--accent)" }}
            >
              Sobre Mim
            </h4>

            <p className="text-[32px] md:text-[42px] lg:text-[54px] leading-[1.1] tracking-tight font-bold text-white/95">
              Sou um Engenheiro de Software com foco em desenvolver <span className="text-white">APIs e integrações</span> sólidas.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
