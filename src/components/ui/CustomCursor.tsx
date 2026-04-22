"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "hover" | "social" | "hidden">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [sidebarRect, setSidebarRect] = useState<DOMRect | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const cursorX = useSpring(mouseX, { stiffness: 600, damping: 30 });
  const cursorY = useSpring(mouseY, { stiffness: 600, damping: 30 });

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (!target || !target.closest) return;

      const sidebarContainer = target.closest('[data-cursor="social-container"]');
      if (sidebarContainer) {
        if (cursorType !== "social") {
          const rect = sidebarContainer.getBoundingClientRect();
          setSidebarRect(rect);
          setCursorType("social");
        }
        return;
      }

      if (target.closest('[data-cursor="hide"]')) {
        if (cursorType !== "hidden") {
          setCursorType("hidden");
          setSidebarRect(null);
        }
        return;
      }

      const interactive = target.tagName === "A" || target.tagName === "BUTTON" || 
                          target.closest("a") || target.closest("button") || 
                          target.closest("[data-cursor='hover']");
      
      if (interactive) {
        if (cursorType !== "hover") setCursorType("hover");
      } else {
        if (cursorType !== "default") setCursorType("default");
      }
      if (cursorType !== "social") setSidebarRect(null);
    };

    document.addEventListener("mousemove", updateCursor);

    return () => {
      document.removeEventListener("mousemove", updateCursor);
    };
  }, [mouseX, mouseY, isVisible, cursorType]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isSocial = cursorType === "social";
  const isHovering = cursorType === "hover";
  const isHidden = cursorType === "hidden";

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
        }}
        animate={{
          width: isSocial || isHidden ? 0 : (isHovering ? 100 : 60),
          height: isSocial || isHidden ? 0 : (isHovering ? 100 : 60),
          opacity: isVisible && !isHidden ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
      >
        <div 
          className="w-full h-full rounded-full" 
          style={{ 
            background: "#c2a4ff",
            boxShadow: "0 0 20px #c2a4ff, 0 0 40px #8b5cf6, 0 0 80px rgba(139, 92, 246, 0.5)",
          }}
        />
      </motion.div>

      <AnimatePresence>
        {isSocial && sidebarRect && (
          <motion.div
            className="fixed pointer-events-none z-[49] rounded-[30px]"
            initial={{
              left: sidebarRect.left + sidebarRect.width / 2,
              top: sidebarRect.top + sidebarRect.height / 2,
              width: 40,
              height: 40,
              opacity: 0,
            }}
            animate={{
              left: sidebarRect.left - 16,
              top: sidebarRect.top - 20,
              width: sidebarRect.width + 32,
              height: sidebarRect.height + 40,
              opacity: 1,
            }}
            exit={{
              left: sidebarRect.left + sidebarRect.width / 2,
              top: sidebarRect.top + sidebarRect.height / 2,
              width: 40,
              height: 40,
              opacity: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
            }}
            style={{
              background: "rgba(139, 92, 246, 0.6)",
              boxShadow: "0 0 60px rgba(139, 92, 246, 0.4), 0 0 120px rgba(139, 92, 246, 0.15)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
