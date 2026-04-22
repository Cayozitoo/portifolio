"use client";

import { motion } from "framer-motion";
import { GithubLogo, LinkedinLogo, InstagramLogo } from "@phosphor-icons/react";
import { config } from "@/lib/config";

export function SocialSidebar() {
  const socials = [
    { icon: GithubLogo, href: config.social.github, label: "GitHub" },
    { icon: LinkedinLogo, href: config.social.linkedin, label: "LinkedIn" },
    { icon: InstagramLogo, href: config.social.instagram, label: "Instagram" },
  ];

  return (
    <div className="fixed left-6 md:left-10 bottom-10 z-50 hidden lg:flex flex-col gap-8" data-cursor="social-container">
      {socials.map((social, index) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + index * 0.1 }}
          className="text-white/80 hover:text-white transition-colors duration-300 group relative"
          aria-label={social.label}
          data-cursor="social"
        >
          <social.icon size={28} weight="bold" />
          
          <span className="absolute left-full ml-4 px-2 py-1 bg-white/10 backdrop-blur-md rounded text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {social.label}
          </span>
        </motion.a>
      ))}
    </div>
  );
}
