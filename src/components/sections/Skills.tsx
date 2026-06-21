// src/components/sections/Skills.tsx
"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useApp } from "@/context/AppContext";

import { FaReact, FaNodeJs, FaWordpress } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiTypescript } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "WORDPRESS",  icon: FaWordpress,   color: "#1296db" },
  { name: "TAILWIND",   icon: SiTailwindcss, color: "#38BDF8" },
  { name: "REACT.JS",   icon: FaReact,       color: "#61DAFB" },
  { name: "NEXT.JS",    icon: SiNextdotjs,   color: "#000000" }, // overridden per theme
  { name: "TYPESCRIPT", icon: SiTypescript,  color: "#3178C6" },
  { name: "NODE.JS",    icon: FaNodeJs,      color: "#68A063" },
];

const content = {
  en: {
    label: "Skills & Experience",
    heading: ["Working with Latest", "Technologies & Stack"],
  },
  id: {
    label: "Keahlian & Pengalaman",
    heading: ["Bekerja dengan Teknologi", "& Stack Terkini"],
  },
};

export default function SkillsSection() {
  const { language, theme } = useApp();
  const t = content[language];
  const isLight = theme === "light";

  const sectionRef = useRef<HTMLElement | null>(null);
  const labelRef   = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("hashchange", refresh);
    window.addEventListener("resize", refresh);
    return () => {
      window.removeEventListener("hashchange", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const label   = labelRef.current;
      const heading = headingRef.current;
      const cards   = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      if (!label || !heading || cards.length !== skills.length) return;

      const isMobile = window.innerWidth < 768;

      const yLabel   = isMobile ? 20  : 28;
      const yHeading = isMobile ? 44  : 64;
      const yCard    = isMobile ? 50  : 72;
      const scaleH   = isMobile ? 0.90 : 0.86;

      gsap.set(label,   { autoAlpha: 0, y: yLabel,   willChange: "transform, opacity" });
      gsap.set(heading, { autoAlpha: 0, y: yHeading, scale: scaleH, transformOrigin: "center bottom", willChange: "transform, opacity" });
      gsap.set(cards,   { autoAlpha: 0, y: yCard,    willChange: "transform, opacity" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end:   "bottom 25%",
          scrub: 2.2,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
        defaults: { ease: "none" },
      });

      tl
        .to(label,    { autoAlpha: 1, y: 0,                   duration: 0.12 }, 0.00)
        .to(heading,  { autoAlpha: 1, y: 0, scale: 1,         duration: 0.16 }, 0.07)
        .to(cards[0], { autoAlpha: 1, y: 0,                   duration: 0.15 }, 0.20)
        .to(cards[1], { autoAlpha: 1, y: 0,                   duration: 0.15 }, 0.26)
        .to(cards[2], { autoAlpha: 1, y: 0,                   duration: 0.15 }, 0.30)
        .to(cards[3], { autoAlpha: 1, y: 0,                   duration: 0.15 }, 0.34)
        .to(cards[4], { autoAlpha: 1, y: 0,                   duration: 0.15 }, 0.38)
        .to(cards[5], { autoAlpha: 1, y: 0,                   duration: 0.15 }, 0.42)
        .to({}, { duration: 0.16 }, 0.42)
        .to(label,    { autoAlpha: 0, y: yLabel,               duration: 0.11 }, 0.58)
        .to(heading,  { autoAlpha: 0, y: yHeading, scale: scaleH, duration: 0.13 }, 0.65)
        .to(cards[0], { autoAlpha: 0, y: yCard,               duration: 0.13 }, 0.73)
        .to(cards[1], { autoAlpha: 0, y: yCard,               duration: 0.13 }, 0.78)
        .to(cards[2], { autoAlpha: 0, y: yCard,               duration: 0.13 }, 0.82)
        .to(cards[3], { autoAlpha: 0, y: yCard,               duration: 0.13 }, 0.86)
        .to(cards[4], { autoAlpha: 0, y: yCard,               duration: 0.13 }, 0.89)
        .to(cards[5], { autoAlpha: 0, y: yCard,               duration: 0.13 }, 0.92);

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  // ── Theme classes ──────────────────────────────────────────────────────
  const sectionBg   = isLight ? "bg-gray-50"   : "bg-black";
  const glowCenter  = isLight ? "bg-black/[0.03]" : "bg-white/[0.03]";
  const glowCorner  = isLight ? "bg-purple-500/5"  : "bg-purple-500/10";
  const labelColor  = isLight ? "text-black/50"    : "text-white/60";
  const headingColor = isLight ? "text-zinc-900"   : "text-white";
  const iconRingBg  = isLight
    ? "border border-black/10 bg-black/[0.03]"
    : "border border-white/10 bg-white/[0.03]";
  const skillNameColor = isLight
    ? "text-black/50 group-hover:text-black"
    : "text-white/65 group-hover:text-white";

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={`relative overflow-hidden px-6 py-28 transition-colors duration-300 ${sectionBg}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] ${glowCenter}`} />
        <div className={`absolute left-0 top-0 h-[260px] w-[260px] rounded-full blur-[100px] ${glowCorner}`} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center">
          <p
            ref={labelRef}
            className={`text-xs font-medium uppercase tracking-[0.35em] md:text-sm ${labelColor}`}
          >
            {t.label}
          </p>

          <h2
            ref={headingRef}
            className={`mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl ${headingColor}`}
          >
            {t.heading[0]}
            <br />
            {t.heading[1]}
          </h2>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-x-8 gap-y-12 lg:grid-cols-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            // Next.js icon should be dark on light bg
            const iconColor = skill.name === "NEXT.JS"
              ? (isLight ? "#000000" : "#ffffff")
              : skill.color;

            return (
              <div
                key={skill.name}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full">
                  <div
                    className="absolute inset-0 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                    style={{ backgroundColor: skill.color }}
                  />
                  <div className={`absolute inset-0 rounded-full backdrop-blur-xl ${iconRingBg}`} />
                  <Icon size={52} color={iconColor} className="relative z-10" />
                </div>

                <p className={`mt-5 text-sm font-semibold tracking-[0.14em] transition-colors duration-300 ${skillNameColor}`}>
                  {skill.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}