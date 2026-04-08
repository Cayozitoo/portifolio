"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface CustomCursorProps {
  className?: string;
}

export function CustomCursor({ className }: CustomCursorProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 500, damping: 28, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsVisible(true);

    const updateCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor='hover']")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener("mousemove", updateCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (typeof window === "undefined") return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 w-3 h-3 rounded-full bg-accent pointer-events-none z-[9999]",
          "shadow-[0_0_20px_rgba(163,255,0,0.8)]",
          className
        )}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 1.5 : 1,
        }}
      />

      {/* Trailing circle */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 w-8 h-8 rounded-full border border-accent/50 pointer-events-none z-[9998]",
          "shadow-[0_0_30px_rgba(163,255,0,0.3)]"
        )}
        style={{
          x: useSpring(cursorX, { stiffness: 150, damping: 20, mass: 1 }),
          y: useSpring(cursorY, { stiffness: 150, damping: 20, mass: 1 }),
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 1.2 : 1,
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Outer glow ring */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 w-12 h-12 rounded-full border border-accent/20 pointer-events-none z-[9997]",
          isHovering && "border-secondary/40 scale-110"
        )}
        style={{
          x: useSpring(cursorX, { stiffness: 80, damping: 15, mass: 2 }),
          y: useSpring(cursorY, { stiffness: 80, damping: 15, mass: 2 }),
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 0.5 : 0,
        }}
      />
    </>
  );
}
