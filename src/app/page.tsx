"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Preloader } from "@/components/ui/Preloader";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ProjectsBento } from "@/components/ProjectsBento";
import { SkillsSection } from "@/components/SkillsSection";
import { TimelineSection } from "@/components/TimelineSection";
import { CertificationsBento } from "@/components/CertificationsBento";
import { ModernHeader } from "@/components/ui/ModernHeader";
import { SocialSidebar } from "@/components/ui/SocialSidebar";

import { useScrollSpy } from "@/lib/useScrollSpy";
import { ArrowUpRight } from "@phosphor-icons/react";
import { config } from "@/lib/config";

export default function Home() {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);
  useScrollSpy(["hero", "about", "projects", "skills", "timeline", "contact"]);

  const handlePreloaderComplete = useCallback(() => {
    setIsPreloaderComplete(true);
  }, []);

  const divider = (
    <div
      className="w-full h-px max-w-full"
      style={{ background: "linear-gradient(to right, transparent, var(--divider), transparent)" }}
    />
  );

  return (
    <>
      {isPreloaderComplete || (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {isPreloaderComplete && (
        <main
          className="flex min-h-[100dvh] w-full flex-col theme-text selection:bg-accent/30 selection:text-white relative bg-[#000] z-10 animate-fade-in"
          style={{ animation: 'fadeIn 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards' }}
        >
            {/* Global Background (Solid Black for perfect transitions) */}
            <div className="fixed inset-0 z-[-1] pointer-events-none bg-black" />

            <ModernHeader />
            <SocialSidebar />

            <div id="hero" className="w-full">
               <Hero />
            </div>

            <div id="about" className="w-full relative z-10">
              <About />
            </div>

            <div className="w-full relative z-10">
               <ProjectsBento />
            </div>

            <div id="skills" className="w-full relative z-10">
              <SkillsSection />
            </div>

            <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col px-4 md:px-8">
              <div className="w-full flex flex-col">
                {divider}
                <div id="timeline"><TimelineSection /></div>
                {divider}
                <CertificationsBento />
              </div>
            </div>

            <footer
              id="contact"
              className="w-full py-24 md:py-32 px-6 md:px-8 mt-auto border-t border-white/5 relative z-10 bg-black"
            >
              <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 place-content-between">

                <div className="flex flex-col gap-12">
                  <h2 className="text-5xl md:text-7xl font-normal tracking-wide text-white font-sans">
                    CONTATO
                  </h2>
                  
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                      <span className="text-white/40 text-sm font-medium">E-mail</span>
                      <a href={`mailto:${config.personal.email}`} className="text-white/90 md:text-lg hover:text-white transition-colors">
                        {config.personal.email}
                      </a>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <span className="text-white/40 text-sm font-medium">Localização</span>
                      <span className="text-white/90 md:text-lg">
                        {config.personal.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 md:pl-20 pt-2 lg:pt-0">
                  <span className="text-white/40 text-sm font-medium mb-2">Redes Sociais</span>
                  <div className="flex flex-col w-full max-w-[200px]">
                    {[
                      { name: "GitHub", url: config.social.github },
                      { name: "LinkedIn", url: config.social.linkedin },
                      { name: "Instagram", url: config.social.instagram || "https://instagram.com" }
                    ].map((link) => (
                      <a 
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-8 py-3 border-b border-white/10 text-white/90 hover:text-white transition-colors md:text-xl font-normal"
                      >
                        {link.name}
                        <ArrowUpRight size={18} className="text-white/50 group-hover:text-white transition-colors group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between items-start md:items-end text-left md:text-right gap-8 pt-2 lg:pt-0">
                  <div className="flex flex-col gap-1 mt-auto md:mt-0">
                    <span className="text-white/90 md:text-xl font-normal tracking-tight">
                      Design e Desenvolvimento
                    </span>
                    <span className="md:text-xl font-normal tracking-tight">
                      por <span style={{ color: "var(--accent)" }}>{config.personal.name}</span>
                    </span>
                  </div>

                  <div className="text-white/50 md:text-lg tracking-wider mt-8 md:mt-0">
                    © {new Date().getFullYear()}
                  </div>
                </div>

              </div>
            </footer>
          </main>
        )}
    </>
  );
}
