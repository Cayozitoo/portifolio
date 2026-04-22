"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";

interface ProjectCard {
  id: number;
  title: string;
  category: string;
  tags: string[];
  url?: string;
}

const projects: ProjectCard[] = [
  {
    id: 1,
    title: "7ª Região Militar do Nordeste",
    category: "Inteligência & Engenharia Militar",
    tags: ["Sistemas Críticos", ".NET / C#", "SQL Server", "Metodologias Ágeis", "Alta Disponibilidade", "Mapeamento Logístico"],
  },
  {
    id: 2,
    title: "SPBM Fabric & FortiGate",
    category: "Engenharia de Redes Core",
    tags: ["SPBM Protocol", "Fortinet NGFW", "IS-IS Routing", "I-SID L2/L3", "Zero-Trust"],
  },
  {
    id: 3,
    title: "Automações & APIs C#",
    category: "Engenharia de Software Back-end",
    tags: [".NET 8", "C# API", "RabbitMQ", "Docker", "Microservices"],
  },
  {
    id: 4,
    title: "UserManagement.API",
    category: "Engenharia de Software",
    tags: [".NET 8", "JWT", "EF Core", "C#"],
    url: "https://github.com/Cayozitoo/UserManagement.API"
  },
  {
    id: 5,
    title: "Controle de Gastos",
    category: "Full Stack Development",
    tags: ["React", "TypeScript", ".NET API", "Tailwind CSS"],
    url: "https://github.com/Cayozitoo/controle-de-gastos"
  },
  {
    id: 6,
    title: "TaskFlow",
    category: "Backend Engine",
    tags: ["C#", "SQL Server", "Performance Tuning"],
    url: "https://github.com/Cayozitoo/TaskFlow"
  },
  {
    id: 7,
    title: "Jogo de Dados",
    category: "Lógica de Programação",
    tags: ["Lógica", "C# Base", "Algorithms"],
    url: "https://github.com/Cayozitoo/Jogo-de-dados"
  },
];

export function ProjectsBento() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60, 
    damping: 20, 
    restDelta: 0.001,
  });

  const xPercent = useTransform(smoothProgress, [0, 1], ["0%", "-54.54%"]);
  const parallaxGlowX = useTransform(smoothProgress, [0, 1], ["-10%", "50%"]);

  return (
    <section ref={containerRef} id="projects" className="relative w-full bg-[#000] lg:h-[450vh]">
      <div className="w-full lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden flex flex-col lg:block">
        
        <motion.div 
           className="hidden lg:block absolute inset-y-0 w-full z-0 pointer-events-none"
           style={{
             background: `radial-gradient(ellipse at 50% 50%, rgba(168, 85, 247, 0.08), transparent 60%)`,
             x: parallaxGlowX
           }}
        />

        <div className="absolute top-0 left-0 w-full z-20 px-4 md:px-12 py-16 md:py-20">
            <h2 className="text-5xl md:text-7xl lg:text-[90px] font-normal tracking-tight text-white leading-none">
              Meus <span className="text-[#a855f7]">Trabalhos</span>
            </h2>
        </div>

        <motion.div
          className="flex flex-col lg:flex-row h-full z-10 lg:w-[220vw] lg:will-change-transform lg:[transform:translateX(var(--xVal))] pt-[30vh] md:pt-[35vh]"
          style={{ "--xVal": xPercent } as React.CSSProperties}
        >
          {projects.map((proj, i) => (
             <ProjectSlide key={proj.id} project={proj} index={i} />
          ))}

          <div className="hidden lg:block w-[10vw] h-full shrink-0" />

        </motion.div>
      </div>
    </section>
  );
}

function ProjectSlide({ project, index }: { project: ProjectCard, index: number }) {
  return (
    <div className="w-full lg:w-[30vw] h-auto lg:h-[60vh] shrink-0 flex flex-col p-8 md:p-12 lg:p-16 relative border-b lg:border-b-0 border-white/10 lg:border-r border-white/10 group hover:bg-white/[0.02] transition-colors duration-500">
      <div className="flex justify-between items-start w-full mb-10 lg:mb-12">
          <span className="text-5xl md:text-6xl lg:text-[50px] font-black leading-none text-white tracking-tighter opacity-100 italic group-hover:text-[#a855f7] transition-colors duration-500">
            0{index + 1}
          </span>
          <div className="flex flex-col items-end text-right mt-1 md:mt-2">
             <h3 className="text-xl md:text-2xl lg:text-2xl font-normal text-white mb-1 group-hover:translate-x-[-10px] transition-transform duration-500">
               {project.title}
             </h3>
             <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/40 font-light">
               {project.category}
             </span>
          </div>
      </div>

      <div className="flex flex-col gap-4 lg:gap-6 flex-1 justify-center">
          <div className="flex flex-col gap-3">
              <h4 className="text-white/40 text-[9px] md:text-[10px] font-normal uppercase tracking-[0.3em] font-mono">
                Tools and features
              </h4>
              <p className="text-white/80 text-base md:text-lg lg:text-lg font-light leading-relaxed max-w-[90%] font-sans">
                {project.tags.join(", ")}
              </p>
          </div>
      </div>

      {project.url && (
        <a 
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 self-end w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#a855f7]/20 hover:border-[#a855f7]/50 transition-all duration-500 group"
        >
          <ArrowUpRight size={24} className="text-white group-hover:scale-110 transition-transform" />
        </a>
      )}

    </div>
  );
}
