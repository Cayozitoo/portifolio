# Cayo Fellipe — Software Engineering Portfolio

[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)

Personal portfolio website showcasing my work as a Fullstack Software Engineer. Built with modern technologies and focused on delivering a premium user experience through scroll-driven animations and glassmorphism design.

## Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion |
| **3D Elements** | React Three Fiber + Drei |
| **Smooth Scroll** | Lenis |
| **Icons** | Phosphor Icons + React Icons |

## Features

- **Scroll-Driven Architecture** — Immersive transitions powered by Framer Motion
- **Lenis Smooth Scroll** — Premium physics-based scrolling with Lerp interpolation
- **Dynamic 3D Glassmorphism** — Interactive cards with mouse-responsive rotation
- **Dark Mode Design** — Native CSS variables for scalable theming
- **Custom Cursor** — Context-aware cursor with magnetic effects
- **Cinematic Preloader** — Animated loading sequence with scanner wipe transition

## Getting Started

### Prerequisites

- Node.js 20+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Cayozitoo/portifolio.git
cd portifolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view locally.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── globals.css       # Global styles & theme variables
│   ├── layout.tsx        # Root layout with providers
│   └── page.tsx          # Main homepage
├── components/           # React components
│   ├── About.tsx         # About section
│   ├── Hero.tsx          # Hero section with 3D avatar
│   ├── ProjectsBento.tsx # Horizontal scroll projects
│   ├── SkillsSection.tsx # 3D tech stack grid
│   ├── TimelineSection.tsx # Career timeline
│   ├── CertificationsBento.tsx # Certifications grid
│   ├── SmoothScroll.tsx  # Lenis scroll wrapper
│   └── ui/               # Reusable UI components
│       ├── CustomCursor.tsx
│       ├── KineticText.tsx
│       ├── ModernHeader.tsx
│       ├── Preloader.tsx
│       └── SocialSidebar.tsx
└── lib/                  # Utilities
    ├── config.ts         # Personal & social config
    └── useScrollSpy.ts   # Scroll observation hook
```

## Configuration

Update your personal information in `src/lib/config.ts`:

```typescript
export const config = {
  personal: {
    name: "Your Name",
    email: "your@email.com",
    location: "Your Location",
  },
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile",
    instagram: "https://instagram.com/yourhandle",
  },
  // ...
}
```

## Customization

### Theme Colors

Edit CSS variables in `src/app/globals.css`:

```css
:root {
  --accent: #c2a4ff;           /* Primary accent color */
  --accent-glow: rgba(194, 164, 255, 0.45);
  --secondary: #a87cff;        /* Secondary color */
  --bg: #000;                  /* Background */
  /* ... more variables */
}
```

### 3D Assets

Replace the 3D models in `/public`:
- `hero_avatar.png` — Main hero character
- `avatar_3d.png` — About section character
- `purple_planet.glb` — Skills section 3D element

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |

## License

This project is licensed under the [MIT License](LICENSE).

**Note:** Personal branding assets (3D models, profile images, custom graphics) are copyrighted and may not be used without permission. Please replace them with your own assets when forking.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contact

- **Email:** cayo.felipe.jobs@gmail.com
- **GitHub:** [@Cayozitoo](https://github.com/Cayozitoo)
- **LinkedIn:** [/in/cayofelipe](https://linkedin.com/in/cayofelipe)
- **Instagram:** [@cayofellipe_](https://www.instagram.com/cayofellipe_/)

---

Designed & Developed by [Cayo Fellipe](https://github.com/Cayozitoo)
