# Cayo Fellipe - Portfolio

Portfolio pessoal desenvolvido com Next.js 16, React 19 e Tailwind CSS v4.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

## Tecnologias

- **Next.js 16** - Framework React com App Router
- **React 19** - Biblioteca UI
- **Tailwind CSS v4** - Estilização com variáveis CSS customizadas
- **Framer Motion** - Animações e transições
- **TypeScript** - Tipagem estática
- **Phosphor Icons** - Biblioteca de ícones

## Funcionalidades

- Tema claro/escuro com persistência em localStorage
- Navegação por scroll com indicador ativo
- Animações suaves com Framer Motion
- Design responsivo e acessível
- Scroll scrubbing de vídeo background

## Estrutura do Projeto

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css      # Estilos globais e temas
│   ├── layout.tsx       # Layout root
│   └── page.tsx         # Página principal
├── components/          # Componentes React
│   ├── ui/              # Componentes de UI reutilizáveis
│   ├── Hero.tsx         # Seção hero com typewriter
│   ├── About.tsx        # Sobre mim
│   ├── ProjectsBento.tsx # Projetos em layout bento
│   ├── SkillsSection.tsx # Habilidades técnicas
│   ├── TimelineSection.tsx # Linha do tempo
│   └── CyberTracker.tsx # Navegação lateral
├── context/             # Context API
│   └── ThemeContext.tsx # Gerenciamento de tema
└── lib/                 # Utilitários e hooks
    ├── config.ts        # Configurações centralizadas
    ├── useScrollSpy.ts  # Hook para scroll spy
    └── utils.ts         # Funções utilitárias
```

## Começando

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Cayozitoo/portifolio.git

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Inicia servidor de produção |
| `npm run lint` | Executa ESLint |

## Configuração

As configurações pessoais estão centralizadas em `src/lib/config.ts`:

```typescript
export const config = {
  personal: { /* nome, email, localização */ },
  social: { /* github, linkedin */ },
  projects: { /* links dos projetos */ },
}
```

## Build

```bash
npm run build
npm run start
```

## Licença

MIT - veja o arquivo LICENSE para detalhes.

---

Desenvolvido por [Cayo Fellipe](https://github.com/Cayozitoo)
