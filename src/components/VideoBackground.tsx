"use client";

import { useEffect, useRef } from "react";
import { useScroll, useSpring } from "framer-motion";

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const requestRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.0001,
  });

  useEffect(() => {
    if (!videoRef.current) return;
    const unsubscribe = smoothProgress.on("change", (latest) => {
      const video = videoRef.current;
      if (video && video.duration && !isNaN(video.duration)) {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        requestRef.current = requestAnimationFrame(() => {
          video.currentTime = Math.max(0.01, latest * video.duration);
        });
      }
    });
    return () => {
      unsubscribe();
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [smoothProgress]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
      {/* Video source */}
      <video
        ref={videoRef}
        src="/bg-video-scrub.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
      />
      {/* Overlay: controlled by CSS var so dark/light themes can tune it */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, var(--video-overlay) 0%, var(--video-overlay) 70%, var(--video-overlay-bottom) 100%)`,
        }}
      />
    </div>
  );
}
