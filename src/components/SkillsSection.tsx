"use client";

import React, { Suspense, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, Environment, PresentationControls } from "@react-three/drei";
import * as THREE from "three";

import {
  SiDotnet, SiPostgresql, SiDocker, SiRabbitmq,
  SiKubernetes, SiPostman,
  SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs,
  SiGit, SiMongodb, SiFigma, SiLinux,
  SiDatabricks, SiDiagramsdotnet
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";

const tools = [
  { name: ".NET", icon: SiDotnet },
  { name: "C#", icon: TbBrandCSharp },
  { name: "SQL Server", icon: SiPostgresql },
  { name: "Docker", icon: SiDocker },
  { name: "RabbitMQ", icon: SiRabbitmq },
  { name: "Microservices", icon: SiKubernetes },
  { name: "REST APIs", icon: SiPostman },
  { name: "Design Patterns", icon: SiDiagramsdotnet },
  { name: "AWS", icon: FaAws },
  { name: "SPBM", icon: SiDatabricks },
  { name: "TypeScript", icon: SiTypescript },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Git", icon: SiGit },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Figma", icon: SiFigma },
  { name: "Linux", icon: SiLinux }
];

function EarthModel() {
  const { scene } = useGLTF("/purple_planet.glb");
  const earthRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
  });

  return (
    <primitive
      ref={earthRef}
      object={scene}
      scale={4.0}
      position={[0, 2.0, 0]}
      rotation={[0.3, 0, 0.2]}
    />
  );
}

function FloatingEarth() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <motion.div
      ref={containerRef}
      style={{ y }}
      className="hidden lg:block absolute inset-y-0 right-0 w-1/2 z-10 pointer-events-none"
    >
      <Canvas camera={{ position: [0, 0, 30], fov: 25 }} dpr={[1, 2]} className="pointer-events-auto">
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#a855f7" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" />

        <Suspense fallback={null}>
          <PresentationControls
            global
            snap
            speed={2}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <EarthModel />
            </Float>
          </PresentationControls>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </motion.div>
  );
}

function TechKey({
  name,
  icon: Icon,
  index,
  globalMouseX,
  globalMouseY
}: {
  name: string;
  icon: React.ComponentType<{ className?: string; size?: number | string }>;
  index: number;
  globalMouseX: MotionValue<number>;
  globalMouseY: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const springX = useSpring(0, { stiffness: 100, damping: 15 });
  const springY = useSpring(0, { stiffness: 100, damping: 15 });

  const localMouseX = useMotionValue(0);
  const localMouseY = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = ((globalMouseX.get() as number) - centerX) / 400;
      const dy = ((globalMouseY.get() as number) - centerY) / 400;

      const angleY = Math.max(Math.min(dx * 20, 20), -20);
      const angleX = Math.max(Math.min(-dy * 20, 20), -20);

      springX.set(angleX);
      springY.set(angleY);
    };

    const unsubscribeX = globalMouseX.on("change", update);
    const unsubscribeY = globalMouseY.on("change", update);

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [globalMouseX, globalMouseY, springX, springY]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    localMouseX.set(mx);
    localMouseY.set(my);
  }

  return (
    <div
      ref={ref}
      style={{ perspective: "1000px" }}
      className="relative"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: "preserve-3d"
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.03, duration: 0.4 }}
        whileHover={{ z: 20 }}
        whileTap={{ z: 0 }}
        className="group relative flex flex-col items-center justify-center w-full max-w-[120px] aspect-square bg-neutral-900/40 border border-white/10 rounded-xl cursor-default transition-all duration-300 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_10px_20px_-5px_rgba(0,0,0,0.5)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_20px_40px_-10px_rgba(0,0,0,0.7)]"
      >
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
          style={{
            background: useTransform(
              [localMouseX, localMouseY],
              ([mx, my]) => `radial-gradient(100px circle at ${mx}px ${my}px, rgba(168, 85, 247, 0.2), transparent 80%)`,
            ),
            transform: "translateZ(10px)"
          }}
        />

        <div className="absolute inset-x-0 bottom-0 h-1 bg-black/40 rounded-b-xl transform translate-y-[1px]" />

        <div className="flex flex-col items-center justify-center gap-2 relative z-10 text-center" style={{ transform: "translateZ(20px)" }}>
          <div className="p-2.5 bg-white/0 rounded-lg group-hover:bg-[#a855f7]/20 transition-colors duration-300">
            <Icon className="w-8 h-8 text-white group-hover:text-[#a855f7] transition-all duration-300" />
          </div>
          <span className="text-[10px] font-mono text-white/50 group-hover:text-white transition-colors duration-300 uppercase tracking-wider leading-tight max-w-full break-words">
            {name}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const globalMouseX = useMotionValue(0);
  const globalMouseY = useMotionValue(0);

  function handleGlobalMouseMove(e: React.MouseEvent) {
    globalMouseX.set(e.clientX);
    globalMouseY.set(e.clientY);
  }

  return (
    <section
      id="skills"
      ref={sectionRef}
      onMouseMove={handleGlobalMouseMove}
      className="relative w-full bg-[#000] py-16 md:py-24 border-b border-white/5 overflow-hidden"
    >

      <FloatingEarth />

      <div className="w-full px-6 md:px-12 lg:px-20 lg:pl-[10%] relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24">
        <div className="lg:w-1/2 flex flex-col gap-8 relative z-10 pointer-events-auto">

          <h2 className="text-5xl md:text-7xl font-normal tracking-tight text-white leading-none mb-6">
            Stack <br /><span className="text-[#a855f7]">Técnica</span>
          </h2>

          <div className="grid grid-cols-5 gap-1.5 w-full max-w-2xl">
            {tools.map((tool, i) => (
              <TechKey
                key={tool.name}
                name={tool.name}
                icon={tool.icon}
                index={i}
                globalMouseX={globalMouseX}
                globalMouseY={globalMouseY}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 hidden lg:block" />
      </div>

      <div className="mt-24 w-full overflow-hidden border-t border-white/5 py-8 relative z-10">
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          className="flex gap-20 whitespace-nowrap px-8"
        >
          {tools.concat(tools).map((tool, i) => (
            <span
              key={i}
              className="text-white/[0.5] text-4xl md:text-6xl font-black uppercase tracking-tighter hover:text-[#a855f7]/20 transition-colors duration-300 cursor-default"
            >
              {tool.name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

useGLTF.preload("/purple_planet.glb");