"use client";

import React, { useRef, useEffect, useCallback } from "react";

interface BrushPoint {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

interface FluidTrailOverlayProps {
  color?: string;
  brushSize?: number;
  fadeSpeed?: number;
  trailDecay?: number;
  className?: string;
}

export function FluidTrailOverlay({
  color = "168, 85, 247", // Cor roxa por padrão (RGB)
  brushSize = 40,
  trailDecay = 0.96,
  className = "",
}: FluidTrailOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const brushPointsRef = useRef<BrushPoint[]>([]);
  const lastMouseRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const interpolatePoints = useCallback(
    (x0: number, y0: number, x1: number, y1: number, distance: number) => {
      const points: { x: number; y: number }[] = [];
      const steps = Math.ceil(distance / (brushSize * 0.25));

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        points.push({
          x: x0 + (x1 - x0) * t,
          y: y0 + (y1 - y0) * t,
        });
      }
      return points;
    },
    [brushSize]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      // Ajusta para o tamanho do contêiner pai
      const rect = canvas.parentElement?.getBoundingClientRect();
      const width = rect?.width || window.innerWidth;
      const height = rect?.height || window.innerHeight;

      dimensionsRef.current = { width, height };
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener("resize", resize);
    resize();

    const animate = () => {
      const { width, height } = dimensionsRef.current;

      // Limpa o canvas inteiro
      ctx.clearRect(0, 0, width, height);

      // Atualiza os pontos
      brushPointsRef.current = brushPointsRef.current.filter((point) => {
        point.alpha *= trailDecay;
        point.radius *= 1.01; // Expansão leve
        return point.alpha > 0.01;
      });

      // Desenha as poças/rastros
      brushPointsRef.current.forEach((point) => {
        const gradient = ctx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          point.radius
        );

        gradient.addColorStop(0, `rgba(${color}, ${point.alpha})`);
        gradient.addColorStop(0.5, `rgba(${color}, ${point.alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Ponto central pulsante (mantém o cursor vivo quando o mouse está parado)
      if (lastMouseRef.current) {
        const { x, y } = lastMouseRef.current;
        const pulseRadius = brushSize * (1.1 + Math.sin(Date.now() / 150) * 0.15);
        
        const pulseGradient = ctx.createRadialGradient(x, y, 0, x, y, pulseRadius);
        pulseGradient.addColorStop(0, `rgba(${color}, 0.8)`);
        pulseGradient.addColorStop(0.5, `rgba(${color}, 0.4)`);
        pulseGradient.addColorStop(1, `rgba(${color}, 0)`);

        ctx.fillStyle = pulseGradient;
        ctx.beginPath();
        ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [trailDecay, color]);

  // Rastreador global de mouse (ligado ao window para não bugar com os outros elementos por cima)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      
      // Checa se o mouse está DENTRO da área desta seção
      if (
        e.clientY < rect.top ||
        e.clientY > rect.bottom ||
        e.clientX < rect.left ||
        e.clientX > rect.right
      ) {
        lastMouseRef.current = null;
        return;
      }

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = Date.now();

      if (lastMouseRef.current) {
        const dx = x - lastMouseRef.current.x;
        const dy = y - lastMouseRef.current.y;
        const dt = now - lastMouseRef.current.time;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = dt > 0 ? distance / dt : 0;

        if (distance > 0) {
          const points = interpolatePoints(
            lastMouseRef.current.x,
            lastMouseRef.current.y,
            x,
            y,
            distance
          );

          points.forEach((point, index) => {
            const speedFactor = Math.min(speed / 2, 1);
            const baseRadius = brushSize * (1 - speedFactor * 0.3);
            const alpha = 0.8 * (1 - speedFactor * 0.2);
            const radiusVariation = baseRadius * (0.8 + Math.random() * 0.4);

            brushPointsRef.current.push({
              x: point.x,
              y: point.y,
              radius: radiusVariation + (index / points.length) * brushSize * 0.1,
              alpha,
            });
          });
        }
      }

      lastMouseRef.current = { x, y, time: now };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [brushSize, interpolatePoints]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      style={{ mixBlendMode: "screen" }}
    />
  );
}
