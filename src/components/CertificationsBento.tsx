"use client";

import { Certificate, Medal, GraduationCap, Student } from "@phosphor-icons/react";

const certs = [
  "Aplicação da Melhoria Contínua",
  "Desenvolvimento de Projetos Sociais",
  "Análise de Problemas para a Comunidade",
  "Programação de Sistemas de Informação",
  "Programação para Internet",
  "Direitos e Privacidade dos Usuários",
];

function GlassPanel({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`relative rounded-2xl backdrop-blur-xl theme-glass p-8 transition-all duration-500 ${className || ""}`}
      style={style}
    >
      {children}
    </div>
  );
}

export function CertificationsBento() {
  return (
    <section className="relative py-24 w-full px-4 md:px-8">
      <div className="mx-auto w-full max-w-[1400px] relative z-10 flex flex-col gap-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4" style={{ color: "var(--text-heading)" }}>
            Acadêmico & <span className="gradient-text">Conquistas</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Fundamentação teórica, certificações de base e honrarias de serviço.
          </p>
        </div>

        {/* Bento Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card Principal: Formação (Ocupa 2 Colunas no MD) */}
          <GlassPanel className="md:col-span-2 p-8 h-full flex flex-col justify-center relative overflow-hidden group" style={{ border: "1px solid var(--border-subtle)" }}>
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <GraduationCap size={150} weight="fill" color="var(--accent)" />
            </div>

            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--accent)]/10 border border-[var(--accent)]/30">
                <Student size={24} color="var(--accent)" weight="duotone" />
              </div>
              <div>
                 <h3 className="text-xl font-bold text-white tracking-tight">Engenharia de Software</h3>
                 <span className="text-sm font-mono text-white/50">ESTÁCIO • 2022 - 2026 (CURSANDO)</span>
              </div>
            </div>
            <p className="text-base text-white/70 max-w-xl relative z-10">
              Formação focada em arquitetura de sistemas corporativos, engenharia de requisitos, design patterns e ciclo de vida de aplicações. A ponte perfeita entre o negócio e a infraestrutura técnica.
            </p>
          </GlassPanel>

          {/* Card Militar Exército */}
          <GlassPanel className="p-8 h-full flex flex-col justify-center border border-[var(--secondary)]/20 bg-gradient-to-br from-[var(--secondary)]/5 to-transparent group" style={{ border: "1px solid var(--border-subtle)" }}>
            <div className="flex items-center gap-4 mb-4">
              <Medal size={32} color="var(--secondary)" weight="duotone" />
              <h3 className="text-lg font-bold text-white tracking-tight">Destaque Militar TI</h3>
            </div>
            <p className="text-sm text-white/70 mb-6">
              Premiado com honraria pelo serviço excepcional no mapeamento logístico de alto nível estratégico de toda a 7ª Região Militar do Nordeste no Exército Brasileiro.
            </p>
            <div className="inline-flex px-3 py-1 bg-white/5 rounded text-[10px] uppercase font-mono tracking-widest text-[#94a3b8]">
              MISSÃO CRÍTICA
            </div>
          </GlassPanel>

        </div>

        {/* Linha de Certificados */}
        <GlassPanel className="p-8 flex flex-col md:flex-row items-center gap-8 bg-white/[0.02]" style={{ border: "1px solid var(--border-subtle)" }}>
           <div className="flex flex-col items-center md:items-start shrink-0 text-center md:text-left">
              <Certificate size={40} className="text-white/40 mb-2" weight="duotone" />
              <h4 className="text-base font-bold text-white tracking-tight">Certificações<br/>Estácio Ensino</h4>
           </div>

           {/* Divider */}
           <div className="hidden md:block w-px h-16 bg-white/10" />

           <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              {certs.map(cert => (
                <span key={cert} className="px-3 py-1.5 rounded bg-black/40 border border-white/5 text-xs text-white/60 hover:text-white/90 hover:border-white/20 transition-colors">
                  {cert}
                </span>
              ))}
           </div>
        </GlassPanel>

      </div>
    </section>
  );
}
