"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "scale";
  duration?: number;
  delay?: number;
  distance?: number;
  once?: boolean;
}

const directionOffset: Record<string, { x: number; y: number }> = {
  up: { x: 0, y: 100 },
  down: { x: 0, y: -100 },
  left: { x: 100, y: 0 },
  right: { x: -100, y: 0 },
  scale: { x: 0, y: 0 },
};

export function ScrollReveal({
  children,
  className,
  direction = "up",
  duration = 0.8,
  delay = 0,
  distance = 100,
  once = true,
}: ScrollRevealProps) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: directionOffset[direction].x * (distance / 100),
      y: directionOffset[direction].y * (distance / 100),
      scale: direction === "scale" ? 0.8 : 1,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        type: "spring",
        stiffness: 80,
        damping: 20,
      },
    },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          controls.start("hidden");
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [controls, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={cn("reveal-element", className)}
    >
      {children}
    </motion.div>
  );
}
