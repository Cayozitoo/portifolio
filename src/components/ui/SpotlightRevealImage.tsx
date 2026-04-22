"use client";

import React, { useRef, useEffect, useCallback } from "react";

interface SpotlightRevealImageProps {
  baseImage: string;
  revealImage: string;
  alt: string;
  className?: string;
  brushSize?: number;
  fadeSpeed?: number;
  trailDecay?: number;
}

interface BrushPoint {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

export function SpotlightRevealImage({
  baseImage,
  revealImage,
  className = "",
  brushSize = 50,
  fadeSpeed = 0.02,
  trailDecay = 0.97,
}: SpotlightRevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const compositeCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const brushPointsRef = useRef<BrushPoint[]>([]);
  const lastMouseRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const isHoveringRef = useRef(false);

  // Refs para imagens carregadas
  const baseImageRef = useRef<HTMLImageElement | null>(null);
  const revealImageRef = useRef<HTMLImageElement | null>(null);
  const imagesLoadedRef = useRef(false);

  // Dimensões atuais
  const dimensionsRef = useRef({ width: 0, height: 0 });

  // Função para interpolar pontos entre duas posições
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

  // Calcula dimensões de desenho com object-fit: contain
  const calculateContainDimensions = useCallback(
    (
      imgWidth: number,
      imgHeight: number,
      containerWidth: number,
      containerHeight: number
    ) => {
      const scale = Math.min(
        containerWidth / imgWidth,
        containerHeight / imgHeight
      );
      const drawWidth = imgWidth * scale;
      const drawHeight = imgHeight * scale;
      const x = (containerWidth - drawWidth) / 2;
      const y = (containerHeight - drawHeight) / 2;

      return { x, y, drawWidth, drawHeight, scale };
    },
    []
  );

  // Carrega imagens e configura canvases
  useEffect(() => {
    const container = containerRef.current;
    const trailCanvas = trailCanvasRef.current;
    const compositeCanvas = compositeCanvasRef.current;

    if (!container || !trailCanvas || !compositeCanvas) return;

    const trailCtx = trailCanvas.getContext("2d");
    const compositeCtx = compositeCanvas.getContext("2d");
    if (!trailCtx || !compositeCtx) return;

    const dpr = window.devicePixelRatio || 1;

    const resizeCanvases = () => {
      const { width, height } = container.getBoundingClientRect();
      dimensionsRef.current = { width, height };

      [trailCanvas, compositeCanvas].forEach((canvas) => {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      });

      trailCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      compositeCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Redesenha se as imagens já estiverem carregadas
      if (imagesLoadedRef.current) {
        drawComposite();
      }
    };

    const drawComposite = () => {
      const { width, height } = dimensionsRef.current;
      if (!baseImageRef.current || !revealImageRef.current) return;

      compositeCtx.clearRect(0, 0, width, height);

      // Desenha apenas a imagem base (estado inicial sem rastro)
      const baseDims = calculateContainDimensions(
        baseImageRef.current.width,
        baseImageRef.current.height,
        width,
        height
      );
      compositeCtx.drawImage(
        baseImageRef.current,
        baseDims.x,
        baseDims.y,
        baseDims.drawWidth,
        baseDims.drawHeight
      );
    };

    // Carrega imagem base
    const baseImg = new Image();
    baseImg.crossOrigin = "anonymous";
    baseImg.src = baseImage;
    baseImg.onload = () => {
      baseImageRef.current = baseImg;
      if (revealImageRef.current) {
        imagesLoadedRef.current = true;
      }
      resizeCanvases();
    };

    // Carrega reveal image
    const revealImg = new Image();
    revealImg.crossOrigin = "anonymous";
    revealImg.src = revealImage;
    revealImg.onload = () => {
      revealImageRef.current = revealImg;
      if (baseImageRef.current) {
        imagesLoadedRef.current = true;
      }
      resizeCanvases();
    };

    resizeCanvases();
    window.addEventListener("resize", resizeCanvases);

    return () => {
      window.removeEventListener("resize", resizeCanvases);
    };
  }, [baseImage, revealImage, calculateContainDimensions]);

  // Loop de animação do trail
  useEffect(() => {
    const trailCanvas = trailCanvasRef.current;
    const container = containerRef.current;
    if (!trailCanvas || !container) return;

    const trailCtx = trailCanvas.getContext("2d");
    if (!trailCtx) return;

    const animate = () => {
      const { width, height } = dimensionsRef.current;

      // Limpa totalmente o canvas de rastro para desenhar o próximo frame (as partículas mantêm sua própria alpha)
      trailCtx.clearRect(0, 0, width, height);

      // Atualiza e desenha brush points com decay
      brushPointsRef.current = brushPointsRef.current.filter((point) => {
        // Aplica decay na alpha
        point.alpha *= trailDecay;

        // Expande levemente (efeito de poça se espalhando)
        point.radius *= 1.008;

        // Remove pontos muito fracos
        return point.alpha > 0.01;
      });

      // Desenha todos os pontos ativos
      brushPointsRef.current.forEach((point) => {
        const gradient = trailCtx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          point.radius
        );

        gradient.addColorStop(0, `rgba(255, 255, 255, ${point.alpha})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${point.alpha * 0.6})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        trailCtx.fillStyle = gradient;
        trailCtx.beginPath();
        trailCtx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        trailCtx.fill();
      });

      // Ponto central pulsante (mantém o raio-X vivo quando o mouse está parado)
      // Usamos isHoveringRef.current para não pulsar fora da imagem base/avatar
      if (lastMouseRef.current && isHoveringRef.current) {
        const { x, y } = lastMouseRef.current;
        const pulseRadius = brushSize * (1.1 + Math.sin(Date.now() / 150) * 0.15);
        
        const pulseGradient = trailCtx.createRadialGradient(x, y, 0, x, y, pulseRadius);
        pulseGradient.addColorStop(0, `rgba(255, 255, 255, 0.8)`);
        pulseGradient.addColorStop(0.5, `rgba(255, 255, 255, 0.4)`);
        pulseGradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        trailCtx.fillStyle = pulseGradient;
        trailCtx.beginPath();
        trailCtx.arc(x, y, pulseRadius, 0, Math.PI * 2);
        trailCtx.fill();
      }

      // Redesenha o composite com o trail atualizado
      const compositeCanvas = compositeCanvasRef.current;
      const compositeCtx = compositeCanvas?.getContext("2d");
      if (compositeCanvas && compositeCtx && imagesLoadedRef.current) {
        const { width: cw, height: ch } = dimensionsRef.current;

        compositeCtx.clearRect(0, 0, cw, ch);

        // 1. Desenha o trail (máscara) primeiro
        compositeCtx.globalCompositeOperation = "source-over";
        compositeCtx.drawImage(trailCanvas, 0, 0, cw, ch);

        // 2. Aplica a revealImage (esqueleto) usando source-in (só aparece DENTRO da máscara do trail)
        compositeCtx.globalCompositeOperation = "source-in";
        if (revealImageRef.current) {
          const revealDims = calculateContainDimensions(
            revealImageRef.current.width,
            revealImageRef.current.height,
            cw,
            ch
          );
          compositeCtx.drawImage(
            revealImageRef.current,
            revealDims.x,
            revealDims.y,
            revealDims.drawWidth,
            revealDims.drawHeight
          );
        }

        // 3. Desenha a baseImage (avatar) por baixo de tudo usando destination-over
        compositeCtx.globalCompositeOperation = "destination-over";
        if (baseImageRef.current) {
          const baseDims = calculateContainDimensions(
            baseImageRef.current.width,
            baseImageRef.current.height,
            cw,
            ch
          );
          compositeCtx.drawImage(
            baseImageRef.current,
            baseDims.x,
            baseDims.y,
            baseDims.drawWidth,
            baseDims.drawHeight
          );
        }

        // Restaura para o padrão
        compositeCtx.globalCompositeOperation = "source-over";
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [fadeSpeed, trailDecay, calculateContainDimensions]);

  // Rastreador de mouse GLOBAL, idêntico ao FluidTrailOverlay,
  // mas mapeado para o boundingRect deste container local
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const now = Date.now();
      
      // Coordenadas globais traduzidas para o espaço local do avatar
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Mesmo que o mouse esteja fora do container, continuamos calculando a física do rastro!
      // Isso permite que o fluido "vaze" ou "entre" suavemente
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
            const baseRadius = brushSize * (1 - speedFactor * 0.4);
            const alpha = 0.9 * (1 - speedFactor * 0.3);
            const radiusVariation = baseRadius * (0.8 + Math.random() * 0.4);

            brushPointsRef.current.push({
              x: point.x,
              y: point.y,
              radius: radiusVariation + (index / points.length) * brushSize * 0.2,
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

  const handleMouseEnter = useCallback(() => {
    isHoveringRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full cursor-none overflow-visible ${className}`}
    >
      {/* Canvas do Trail (máscara dinâmica - invisível) */}
      <canvas
        ref={trailCanvasRef}
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Canvas Composite (renderiza o efeito final) */}
      <canvas
        ref={compositeCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ imageRendering: "auto" }}
      />
    </div>
  );
}
