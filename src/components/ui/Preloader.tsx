"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";


export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "welcome" | "expanding" | "complete">("loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.random() * 2 + 0.5;
        return Math.min(prev + increment, 100);
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100 && phase === "loading") {
      const timer = setTimeout(() => setPhase("welcome"), 400);
      return () => clearTimeout(timer);
    }
  }, [progress, phase]);

  const handleRevealComplete = useCallback(() => {
    if (phase === "expanding") {
      setPhase("complete");
      onComplete();
    }
  }, [phase, onComplete]);

  const marqueeText = "CREATIVE DEVELOPER • ";
  const premiumEase = [0.76, 0, 0.24, 1] as const;

  return (
    <AnimatePresence>
      {phase !== "complete" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ willChange: "opacity" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0d0714] overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none opacity-[0.08]">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              style={{ willChange: "transform" }}
              className="flex whitespace-nowrap text-[12vw] font-black text-white leading-none uppercase tracking-tighter"
            >
              <span>{marqueeText.repeat(8)}</span>
              <span>{marqueeText.repeat(8)}</span>
            </motion.div>
          </div>

          <motion.div
            initial={false}
            animate={
              phase === "expanding"
                ? {
                  width: "100vw",
                  height: "100vh",
                  borderRadius: "0px",
                }
                : {
                  width: "fit-content",
                  height: "auto",
                  borderRadius: "100px",
                }
            }
            onAnimationComplete={() => {
              if (phase === "expanding") handleRevealComplete();
            }}
            transition={{ duration: 1.1, ease: premiumEase }}
            style={{ 
               backgroundColor: "#000",
               willChange: "width, height, border-radius" 
            }}
            className="relative z-10 flex items-center justify-center min-w-[180px] p-[1px] shadow-2xl overflow-hidden group"
          >
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ transform: "translateZ(0)" }}
              className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_180deg,#a855f7_180deg,#3b82f6_360deg)] opacity-40 group-hover:opacity-100"
            />

            <div className="relative z-10 flex items-center justify-center min-h-[44px] bg-black px-8 py-3 rounded-[100px] w-full h-full overflow-hidden">
              <AnimatePresence mode="wait">
                {phase === "loading" && (
                  <motion.div
                    key="loading-ui"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -25, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-[10px] font-mono tracking-[0.3em] text-white/50 uppercase">
                      Loading
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-normal text-white tabular-nums">
                        {Math.round(progress)}
                      </span>
                      <span className="text-[10px] text-white/30 font-mono">%</span>
                    </div>
                  </motion.div>
                )}
                
                {phase === "welcome" && (
                  <motion.div
                    key="welcome-ui"
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -30, opacity: 0 }}
                    onAnimationComplete={() => {
                        setTimeout(() => setPhase("expanding"), 1200);
                    }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    className="text-[10px] font-mono tracking-[0.4em] text-white uppercase font-bold"
                  >
                    Bem-vindo
                  </motion.div>
                )}
              </AnimatePresence>

              {phase === "welcome" && (
                <motion.div
                  initial={{ x: "180%", opacity: 0 }}
                  animate={{ 
                    x: ["180%", "-180%", "180%"],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{ 
                    duration: 1.2, 
                    times: [0, 0.4, 0.6, 1],
                    ease: premiumEase
                  }}
                  style={{ transform: "translateZ(0)" }}
                  className="absolute inset-y-[-12px] w-[60px] z-20 pointer-events-none flex items-center justify-center"
                >
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent blur-[2px]" />
                  <div className="absolute inset-y-0 w-px bg-white/40 shadow-[0_0_20px_#fff]" />
                  <div className="absolute inset-y-0 w-full backdrop-blur-[4px] rounded-full" />
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
