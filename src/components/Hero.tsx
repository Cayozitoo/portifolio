"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { config } from "@/lib/config";
import { KineticText } from "./ui/KineticText";

export function Hero() {
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

  const contentY = useTransform(smoothProgress, [0, 1], ["0%", "-20%"]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={heroContainerRef}
      className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden bg-[#000] selection:bg-purple-500/30"
    >
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full opacity-30 z-0 pointer-events-none filter blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
      />

      <motion.div
        className="absolute inset-0 z-20 flex items-end justify-center pointer-events-none overflow-hidden"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -15, 0]
          }}
          transition={{ 
            duration: 0.8,
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
          src="/hero_avatar.png"
          alt="Cayo Fellipe Mascote"
          className="h-[75vh] md:h-[85vh] w-auto object-contain translate-y-[10%]"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center px-6 md:px-12 pointer-events-none overflow-visible"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="w-full max-w-[1600px] flex flex-col md:flex-row items-center justify-between gap-20">
          
          <div className="flex flex-col items-start md:-ml-12 lg:-ml-24">
            <KineticText 
              showDetails={false}
              main={config.personal.name.split(" ")[0].toUpperCase()}
              sub={config.personal.name.split(" ")[1].toUpperCase()}
            />
          </div>

          <div className="flex flex-col items-start md:-mr-24 lg:-mr-48">
            <KineticText 
              main="FULLSTACK"
              sub="ENGINEER"
            />
          </div>

        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#000] to-transparent z-40" />

    </section>
  );
}
