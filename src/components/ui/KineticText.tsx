"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface KineticTextProps {
  main: string;
  sub: string;
  className?: string;
  showDetails?: boolean;
}

export function KineticText({ main, sub, className = "", showDetails = true }: KineticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 25 });

  const echoX = useTransform(smoothX, [-300, 300], [10, -10]);
  const echoY = useTransform(smoothY, [-300, 300], [5, -5]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      
      if (Math.abs(x) < 800 && Math.abs(y) < 600) {
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.03,
      }
    }
  };

  const letterVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] as const }
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative flex flex-col items-start select-none cursor-default will-change-transform ${className}`}
    >
      {showDetails && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 0.4, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-[12px] md:text-sm font-mono tracking-[0.4em] uppercase mb-4 text-[#c2a4ff]"
        >
        </motion.span>
      )}

      <div className="relative group">
        <motion.div
          style={{ x: echoX, y: echoY }}
          className="absolute inset-0 z-0 opacity-10 blur-[1px] pointer-events-none select-none will-change-transform"
        >
          <h1 className="text-6xl md:text-8xl lg:text-[130px] font-black tracking-tighter leading-[0.9] text-purple-500 italic">
            {main} <br /> {sub}
          </h1>
        </motion.div>

        <motion.h1 
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="relative z-10 text-6xl md:text-8xl lg:text-[130px] font-black tracking-tighter leading-[0.9] text-white will-change-transform"
        >
          <div className="flex flex-wrap">
            {main.split("").map((char, i) => (
              <motion.span key={i} variants={letterVariants} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
          <div className="flex flex-wrap text-purple-400">
             <span className="bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
               {sub}
             </span>
          </div>
        </motion.h1>

        <motion.div 
          animate={{ y: ["0%", "100%", "0%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[1px] bg-purple-500/20 blur-sm z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>

      {showDetails && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8 flex items-center gap-4 text-[11px] font-mono text-white/30"
        >
          <span className="px-2 py-0.5 border border-white/10 rounded">EST. 2024</span>
          <span className="w-8 h-[1px] bg-white/10" />
          <span>BRAZIL BASED / REMOTE FRIENDLY</span>
        </motion.div>
      )}
    </div>
  );
}
