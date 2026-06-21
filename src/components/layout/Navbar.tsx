// src/components/layout/Navbar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";

type SectionId = "home" | "about" | "skills" | "works" | "contact";

type NavItem = {
  id: SectionId;
  labelEn: string;
  labelId: string;
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    id: "home",
    labelEn: "Home",
    labelId: "Beranda",
    href: "#home",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12 11.204 3.046a1.125 1.125 0 0 1 1.592 0L21.75 12M4.5 9.75V19.5A1.5 1.5 0 0 0 6 21h3.75v-4.5h4.5V21H18a1.5 1.5 0 0 0 1.5-1.5V9.75" />
      </svg>
    ),
  },
  {
    id: "about",
    labelEn: "About",
    labelId: "Tentang",
    href: "#about",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.118a7.5 7.5 0 0 1 15 0" />
      </svg>
    ),
  },
  {
    id: "skills",
    labelEn: "Skills",
    labelId: "Keahlian",
    href: "#skills",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
  {
    id: "works",
    labelEn: "Works",
    labelId: "Karya",
    href: "#works",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
      </svg>
    ),
  },
  {
    id: "contact",
    labelEn: "Contact",
    labelId: "Kontak",
    href: "#contact",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 7.5v9A2.25 2.25 0 0 1 19.5 18.75h-15A2.25 2.25 0 0 1 2.25 16.5v-9m19.5 0-8.69 5.52a2.25 2.25 0 0 1-2.12 0L2.25 7.5" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const { language, toggleLanguage, theme, toggleTheme } = useApp();

  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [hoveredItem, setHoveredItem] = useState<SectionId | null>(null);

  const navRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const mobileNavRef = useRef<HTMLElement | null>(null);
  const mobileItemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [mobilePillStyle, setMobilePillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const isLight = theme === "light";

  const computePill = (id: SectionId) => {
    const navEl = navRef.current;
    const itemEl = itemRefs.current[id];
    if (!navEl || !itemEl) return;
    setPillStyle({ left: itemEl.offsetLeft, width: itemEl.offsetWidth, opacity: 1 });
  };

  const computeMobilePill = (id: SectionId) => {
    const navEl = mobileNavRef.current;
    const itemEl = mobileItemRefs.current[id];
    if (!navEl || !itemEl) return;
    setMobilePillStyle({ left: itemEl.offsetLeft, width: itemEl.offsetWidth, opacity: 1 });
  };

  useEffect(() => {
    const target = hoveredItem ?? activeSection;
    computePill(target);
    computeMobilePill(activeSection);
  }, [hoveredItem, activeSection]);

  useEffect(() => {
    const handleResize = () => {
      computePill(hoveredItem ?? activeSection);
      computeMobilePill(activeSection);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hoveredItem, activeSection]);

  useEffect(() => {
    const sectionIds = navItems.map((n) => n.id);
    const observers: IntersectionObserver[] = [];
    const intersecting: Record<string, boolean> = {};

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          intersecting[id] = entry.isIntersecting;
          const current = sectionIds.find((sid) => intersecting[sid]);
          if (current) setActiveSection(current as SectionId);
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Dynamic classes based on theme
  const navBg = isLight
    ? "border-black/10 bg-white/80"
    : "border-white/10 bg-black/50";

  const navTextActive = isLight ? "text-purple-600" : "text-purple-300";
  const navTextInactive = isLight ? "text-black/60 hover:text-black" : "text-white/65 hover:text-white";
  const pillBg = isLight
    ? "bg-purple-500/10 border-purple-500/20"
    : "bg-purple-500/20 border-purple-500/30";

  const logoText = isLight ? "text-black" : "text-white";
  const logoCircle = isLight ? "border-black/10 bg-black/[0.03]" : "border-white/10 bg-white/[0.03]";

  return (
    <>
      <header className="fixed top-5 left-0 z-50 w-full px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">

          {/* Logo */}
          <a href="/" className={`flex items-center gap-3 rounded-full border p-1 backdrop-blur transition-colors duration-300 ${navBg}`}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full overflow-hidden border ${logoCircle}`}>
              <img src="favicon.ico" className={`text-sm font-semibold ${logoText}`}></img>
            </div>
            <span className={`text-sm mr-2 font-semibold ${logoText}`}>RADITYA</span>
          </a>

          {/* Nav — desktop only */}
          <nav
            ref={navRef}
            className={`hidden md:flex relative items-center gap-1 rounded-full border p-1 backdrop-blur transition-colors duration-300 ${navBg}`}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <span
              className={`pointer-events-none absolute top-1 bottom-1 rounded-full border transition-all duration-300 ${pillBg}`}
              style={{ left: pillStyle.left, width: pillStyle.width, opacity: pillStyle.opacity }}
            />

            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                ref={(el) => { itemRefs.current[item.id] = el; }}
                onMouseEnter={() => setHoveredItem(item.id)}
                className={`relative z-10 flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium transition-colors
                  ${activeSection === item.id && !hoveredItem ? navTextActive : navTextInactive}`}
              >
                {item.icon}
                {language === "en" ? item.labelEn : item.labelId}
              </a>
            ))}
          </nav>

          {/* Right — language & theme toggle */}
          <div className={`flex items-center gap-1 rounded-full border p-1 backdrop-blur transition-colors duration-300 ${navBg}`}>

            {/* Language toggle: globe icon, shows current lang as badge */}
            <button
              onClick={toggleLanguage}
              title={language === "en" ? "Switch to Indonesian" : "Switch to English"}
              aria-label="Toggle language"
              className={`relative h-10 w-10 grid place-items-center rounded-full border transition-colors ${logoCircle} ${isLight ? "text-black/60 hover:text-black" : "text-white/70 hover:text-white"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253M3 12a8.959 8.959 0 0 1 .284-2.253" />
              </svg>
              {/* Language badge */}
              <span className="absolute -top-1 -right-1 flex h-4 w-5 items-center justify-center rounded-full bg-purple-500 text-[9px] font-bold text-white leading-none">
                {language.toUpperCase()}
              </span>
            </button>

            {/* Theme toggle: sun (light) / moon (dark) */}
            <button
              onClick={toggleTheme}
              title={isLight ? "Switch to dark mode" : "Switch to light mode"}
              aria-label="Toggle theme"
              className={`h-10 w-10 grid place-items-center rounded-full border transition-colors ${logoCircle} ${isLight ? "text-black/60 hover:text-black" : "text-white/70 hover:text-white"}`}
            >
              {isLight ? (
                /* Moon icon — click to go dark */
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
              ) : (
                /* Sun icon — click to go light */
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile bottom nav — icons only, no labels */}
      <nav
        ref={mobileNavRef}
        className={`md:hidden fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border p-1 backdrop-blur transition-colors duration-300 ${navBg}`}
      >
        <span
          className={`pointer-events-none absolute top-1 bottom-1 rounded-full border transition-all duration-300 ${pillBg}`}
          style={{ left: mobilePillStyle.left, width: mobilePillStyle.width, opacity: mobilePillStyle.opacity }}
        />

        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            ref={(el) => { mobileItemRefs.current[item.id] = el; }}
            aria-label={language === "en" ? item.labelEn : item.labelId}
            title={language === "en" ? item.labelEn : item.labelId}
            className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full transition-colors
              ${activeSection === item.id ? navTextActive : navTextInactive}`}
          >
            {item.icon}
          </a>
        ))}
      </nav>
    </>
  );
}