// src/components/sections/Works.tsx
"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { FaGithub, FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import {
  SiNextdotjs, SiTailwindcss, SiTypescript, SiPrisma,
  SiPostgresql, SiOpenai, SiFramer, SiFigma,
} from "react-icons/si";
import { Globe } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useApp } from "@/context/AppContext";

gsap.registerPlugin(ScrollTrigger);

const works = [
  {
    titleEn: "Voitzu Store",
    titleId: "Voitzu Store",
    categoryEn: "Fullstack Website",
    categoryId: "Website Fullstack",
    year: "2025",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
    stack: [
      { icon: SiNextdotjs,   label: "Next.js"     },
      { icon: SiTypescript,  label: "TypeScript"  },
      { icon: SiTailwindcss, label: "Tailwind"    },
      { icon: SiPrisma,      label: "Prisma"      },
      { icon: SiPostgresql,  label: "PostgreSQL"  },
    ],
    siteUrl: "#",
    githubUrl: "#",
  },
  {
    titleEn: "Portfolio Website",
    titleId: "Website Portfolio",
    categoryEn: "Frontend Development",
    categoryId: "Pengembangan Frontend",
    year: "2025",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    stack: [
      { icon: SiNextdotjs,   label: "Next.js"    },
      { icon: FaReact,       label: "React"      },
      { icon: SiTailwindcss, label: "Tailwind"   },
      { icon: SiFramer,      label: "Framer"     },
    ],
    siteUrl: "#",
    githubUrl: "#",
  },
  {
    titleEn: "AI Dashboard",
    titleId: "Dashboard AI",
    categoryEn: "UI / UX Design",
    categoryId: "Desain UI / UX",
    year: "2025",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop",
    stack: [
      { icon: FaReact,      label: "React"      },
      { icon: FaNodeJs,     label: "Node.js"    },
      { icon: SiOpenai,     label: "OpenAI"     },
      { icon: FaPython,     label: "Python"     },
      { icon: SiFigma,      label: "Figma"      },
    ],
    siteUrl: "#",
    githubUrl: "#",
  },
];

const content = {
  en: {
    label: "Featured Projects",
    heading: ["Selected Works &", "Recent Projects"],
    viewProject: "View Project",
    viewSource: "View Code",
  },
  id: {
    label: "Proyek Unggulan",
    heading: ["Karya Terpilih &", "Proyek Terbaru"],
    viewProject: "Lihat Proyek",
    viewSource: "Lihat Kode",
  },
};

export default function WorksSection() {
  const { language, theme } = useApp();
  const t = content[language];
  const isLight = theme === "light";

  const sectionRef = useRef<HTMLElement | null>(null);
  const labelRef   = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const cardRefs   = useRef<(HTMLElement | null)[]>([]);

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
      const cards   = cardRefs.current.filter(Boolean) as HTMLElement[];

      if (!label || !heading || cards.length !== works.length) return;

      const isMobile = window.innerWidth < 768;

      const yS = isMobile ? 10 : 16;
      const yM = isMobile ? 16 : 24;
      const yL = isMobile ? 24 : 32;
      const sc = 0.97;

      gsap.set(label,    { autoAlpha: 0, y: yS });
      gsap.set(heading,  { autoAlpha: 0, y: yM, scale: sc, transformOrigin: "center bottom" });
      gsap.set(cards[0], { autoAlpha: 0, y: yL });
      gsap.set(cards[1], { autoAlpha: 0, y: yL });
      gsap.set(cards[2], { autoAlpha: 0, y: yL });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end:   "top 15%",
          scrub: 2.4,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      });

      tl
        .to(label,    { autoAlpha: 1, y: 0 },          0.00)
        .to(heading,  { autoAlpha: 1, y: 0, scale: 1 }, 0.04)
        .to(cards[0], { autoAlpha: 1, y: 0 },          0.10)
        .to(cards[1], { autoAlpha: 1, y: 0 },          0.14)
        .to(cards[2], { autoAlpha: 1, y: 0 },          0.18);

      const tlOut = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "bottom 85%",
          end:   "bottom 10%",
          scrub: 2.4,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      });

      tlOut
        .to([label, heading], { autoAlpha: 0, y: -yM }, 0.00)
        .to(cards[0],         { autoAlpha: 0, y: -yL }, 0.04)
        .to(cards[1],         { autoAlpha: 0, y: -yL }, 0.08)
        .to(cards[2],         { autoAlpha: 0, y: -yL }, 0.12);

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  // ── Theme classes ──────────────────────────────────────────────────────
  const sectionBg     = isLight ? "bg-gray-50"     : "bg-black";
  const glowBg        = isLight ? "bg-black/[0.02]" : "bg-white/[0.03]";
  const labelColor    = isLight ? "text-black/50"   : "text-white/70";
  const headingColor  = isLight ? "text-zinc-900"   : "text-white";
  const cardBorder    = isLight
    ? "border border-black/10 bg-white/80"
    : "border border-white/10 bg-white/[0.03]";
  const categoryColor = isLight ? "text-black/50"   : "text-white/60";
  const titleColor    = isLight ? "text-zinc-900"   : "text-white";
  const yearColor     = isLight ? "text-black/40"   : "text-white/50";

  // stack pill
  const stackPill  = isLight
    ? "bg-black/[0.06] text-black/60 border border-black/[0.08]"
    : "bg-white/[0.07] text-white/60 border border-white/[0.08]";

  // icon button (globe / github) — di baris view project
  const iconBtnClass = isLight
    ? "border border-black/10 bg-black/5 text-zinc-700 hover:bg-black hover:text-white"
    : "border border-white/10 bg-white/10 text-white hover:bg-white hover:text-black";

  // tooltip popup
  const tooltipClass = isLight
    ? "bg-zinc-900 text-white"
    : "bg-white text-zinc-900";

  return (
    <section
      ref={sectionRef}
      id="works"
      className={`sticky top-0 z-0 w-full overflow-hidden px-6 py-28 transition-colors duration-300 ${sectionBg}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] ${glowBg}`}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ── Header ── */}
        <div className="text-center">
          <p
            ref={labelRef}
            className={`text-xs font-medium uppercase tracking-[0.35em] md:text-sm ${labelColor}`}
          >
            {t.label}
          </p>
          <h2
            ref={headingRef}
            className={`mt-5 text-4xl font-black leading-[0.98] tracking-tight sm:text-5xl lg:text-6xl ${headingColor}`}
          >
            {t.heading[0]}
            <br />
            {t.heading[1]}
          </h2>
        </div>

        {/* ── Cards ── */}
        <div className="mt-20 grid gap-8 md:mt-24 md:grid-cols-2 md:gap-10">
          {works.map((work, index) => (
            <article
              key={work.titleEn}
              ref={(el) => { cardRefs.current[index] = el; }}
              className={`
                group relative overflow-hidden rounded-[30px]
                backdrop-blur-xl
                transition-transform duration-300
                hover:-translate-y-1
                ${cardBorder}
              `}
            >
              {/* Image */}
              <div className="relative h-[300px] overflow-hidden sm:h-[360px] md:h-[380px]">
                <img
                  src={work.image}
                  alt={language === "en" ? work.titleEn : work.titleId}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className={`absolute inset-0 ${
                    isLight
                      ? "bg-gradient-to-t from-white/90 via-white/20 to-transparent"
                      : "bg-gradient-to-t from-black via-black/25 to-transparent"
                  }`}
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              {/* Card body */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">

                {/* Row 1 — category + title */}
                <div>
                  <p className={`text-xs uppercase tracking-[0.22em] md:text-sm ${categoryColor}`}>
                    {language === "en" ? work.categoryEn : work.categoryId}
                  </p>
                  <h3 className={`mt-2 text-2xl font-bold md:text-3xl ${titleColor}`}>
                    {language === "en" ? work.titleEn : work.titleId}
                  </h3>
                </div>

                {/* Row 2 — Tech stack pills (menggantikan tombol globe/github) */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {work.stack.map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className={`
                        inline-flex items-center gap-1.5 rounded-full px-3 py-1
                        text-xs font-medium backdrop-blur-md
                        transition-opacity duration-200
                        ${stackPill}
                      `}
                    >
                      <Icon size={12} />
                      {label}
                    </span>
                  ))}
                </div>

                {/* Row 3 — year + view project + icon buttons */}
                <div className="mt-5 flex items-center justify-between">
                  <span className={`text-sm ${yearColor}`}>{work.year}</span>

                  {/* View project + icon buttons */}
                  <div className="flex items-center gap-2">

                    {/* Globe button dengan tooltip */}

                    <div className="relative group/globe">
                      <a
                        href={work.siteUrl}
                        aria-label={t.viewProject}
                        className={`
                          flex h-10 w-10 items-center justify-center rounded-full
                          backdrop-blur-xl transition-all duration-300
                          ${iconBtnClass}
                        `}
                      >
                        <Globe size={17} />
                      </a>
                      {/* Tooltip */}
                      <span
                        className={`
                          pointer-events-none absolute bottom-full left-1/2 mb-2
                          -translate-x-1/2 whitespace-nowrap rounded-lg px-2.5 py-1
                          text-xs font-medium shadow-lg
                          opacity-0 scale-95 translate-y-1
                          transition-all duration-200
                          group-hover/globe:opacity-100 group-hover/globe:scale-100 group-hover/globe:translate-y-0
                          ${tooltipClass}
                        `}
                      >
                        {t.viewProject}
                        {/* Arrow */}
                        <span
                          className={`
                            absolute left-1/2 top-full -translate-x-1/2
                            border-4 border-transparent
                            ${isLight ? "border-t-zinc-900" : "border-t-white"}
                          `}
                        />
                      </span>
                    </div>

                    {/* GitHub button dengan tooltip */}
                    <div className="relative group/github">
                      <a
                        href={work.githubUrl}
                        aria-label={t.viewSource}
                        className={`
                          flex h-10 w-10 items-center justify-center rounded-full
                          backdrop-blur-xl transition-all duration-300
                          ${iconBtnClass}
                        `}
                      >
                        <FaGithub size={16} />
                      </a>
                      {/* Tooltip */}
                      <span
                        className={`
                          pointer-events-none absolute bottom-full left-1/2 mb-2
                          -translate-x-1/2 whitespace-nowrap rounded-lg px-2.5 py-1
                          text-xs font-medium shadow-lg
                          opacity-0 scale-95 translate-y-1
                          transition-all duration-200
                          group-hover/github:opacity-100 group-hover/github:scale-100 group-hover/github:translate-y-0
                          ${tooltipClass}
                        `}
                      >
                        {t.viewSource}
                        <span
                          className={`
                            absolute left-1/2 top-full -translate-x-1/2
                            border-4 border-transparent
                            ${isLight ? "border-t-zinc-900" : "border-t-white"}
                          `}
                        />
                      </span>
                    </div>

                  </div>
                </div>

              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}