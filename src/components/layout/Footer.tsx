// src/components/layout/Footer.tsx
"use client";

import { useApp } from "@/context/AppContext";

const navLinks = {
  en: [
    { label: "Home",    href: "#home"    },
    { label: "About",   href: "#about"   },
    { label: "Skills",  href: "#skills"  },
    { label: "Works",   href: "#works"   },
    { label: "Contact", href: "#contact" },
  ],
  id: [
    { label: "Beranda",  href: "#home"    },
    { label: "Tentang",  href: "#about"   },
    { label: "Keahlian", href: "#skills"  },
    { label: "Karya",    href: "#works"   },
    { label: "Kontak",   href: "#contact" },
  ],
};

const content = {
  en: {
    cta: "Start something.",
    ctaLink: "Get in touch →",
    copy: `© ${new Date().getFullYear()} Raditya`,
    stack: "Next.js · Tailwind · Framer Motion",
    legal: [
      { label: "Privacy", href: "#" },
      { label: "Terms",   href: "#" },
    ],
  },
  id: {
    cta: "Mulai sesuatu.",
    ctaLink: "Hubungi saya →",
    copy: `© ${new Date().getFullYear()} Raditya`,
    stack: "Next.js · Tailwind · Framer Motion",
    legal: [
      { label: "Privasi",   href: "#" },
      { label: "Ketentuan", href: "#" },
    ],
  },
};

export default function Footer() {
  const { language, theme } = useApp();
  const t = content[language];
  const nav = navLinks[language];
  const isLight = theme === "light";

  const bg      = isLight ? "bg-white"       : "bg-black";
  const border  = isLight ? "border-black/10" : "border-white/10";
  const nameClr = isLight ? "text-zinc-900"   : "text-white";
  const ctaClr  = isLight ? "text-zinc-400"   : "text-zinc-600";
  const linkClr = isLight
    ? "text-zinc-400 hover:text-zinc-900"
    : "text-zinc-600 hover:text-white";
  const metaClr = isLight ? "text-zinc-400"   : "text-zinc-600";
  const divClr  = isLight ? "bg-black/8"      : "bg-white/10";

  return (
    <footer className={`border-t ${border} ${bg} transition-colors duration-300`}>
      <div className="mx-auto max-w-7xl px-6">

        {/* ── BIG TYPE BLOCK ─────────────────────────────────────── */}
        <div className="pt-16 pb-12">
          <p className={`text-xs uppercase tracking-[0.3em] font-medium mb-6 ${ctaClr}`}>
            {t.cta}
          </p>

          <h2
            className={`font-black leading-none tracking-[-0.04em] ${nameClr}`}
            style={{ fontSize: "clamp(3.5rem, 14vw, 10rem)" }}
          >
            RADITYA
          </h2>

          <a
            href="#contact"
            className={`
              inline-block mt-6 text-sm font-medium tracking-wide
              border-b pb-0.5 transition-all duration-200
              ${isLight
                ? "border-zinc-300 text-zinc-500 hover:border-zinc-900 hover:text-zinc-900"
                : "border-zinc-700 text-zinc-500 hover:border-white hover:text-white"
              }
            `}
          >
            {t.ctaLink}
          </a>
        </div>

        {/* ── DIVIDER ────────────────────────────────────────────── */}
        <div className={`h-px ${divClr}`} />

        {/* ── BOTTOM BAR ─────────────────────────────────────────── */}
        <div className="py-7 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex flex-col gap-1">
            <span className={`text-xs ${metaClr}`}>{t.copy}</span>
            <span className={`text-xs ${metaClr} opacity-60`}>{t.stack}</span>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-xs transition-colors duration-200 ${linkClr}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-5">
            {t.legal.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-xs transition-colors duration-200 ${linkClr}`}
              >
                {item.label}
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}