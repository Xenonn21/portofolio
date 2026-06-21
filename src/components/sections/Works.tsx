// src/components/sections/Works.tsx
"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { ArrowUpRight, Globe } from "lucide-react";
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
  },
  {
    titleEn: "Portfolio Website",
    titleId: "Website Portfolio",
    categoryEn: "Frontend Development",
    categoryId: "Pengembangan Frontend",
    year: "2025",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
  },
  {
    titleEn: "AI Dashboard",
    titleId: "Dashboard AI",
    categoryEn: "UI / UX Design",
    categoryId: "Desain UI / UX",
    year: "2025",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop",
  },
];

const content = {
  en: {
    label: "Featured Projects",
    heading: ["Selected Works &", "Recent Projects"],
    viewProject: "View Project",
  },
  id: {
    label: "Proyek Unggulan",
    heading: ["Karya Terpilih &", "Proyek Terbaru"],
    viewProject: "Lihat Proyek",
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

      gsap.set(label,   { autoAlpha: 0, y: isMobile ? 20 : 28,  willChange: "transform, opacity" });
      gsap.set(heading, { autoAlpha: 0, y: isMobile ? 36 : 52, scale: isMobile ? 0.91 : 0.87, transformOrigin: "center bottom", willChange: "transform, opacity" });
      gsap.set(cards[0], { autoAlpha: 0, x: isMobile ? 0 : -60, y: isMobile ? 60 : 80, rotation: isMobile ? 0 : -3, transformOrigin: "left bottom",  willChange: "transform, opacity" });
      gsap.set(cards[1], { autoAlpha: 0, x: isMobile ? 0 :  60, y: isMobile ? 70 : 90, rotation: isMobile ? 0 :  3, transformOrigin: "right bottom", willChange: "transform, opacity" });
      gsap.set(cards[2], { autoAlpha: 0, y: isMobile ? 80 : 100, scale: isMobile ? 0.94 : 0.92, transformOrigin: "center bottom", willChange: "transform, opacity" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          end:   "bottom 22%",
          scrub: 2.0,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
        defaults: { ease: "none" },
      });

      tl
        .to(label,    { autoAlpha: 1, y: 0,                   duration: 0.12 }, 0.00)
        .to(heading,  { autoAlpha: 1, y: 0, scale: 1,         duration: 0.16 }, 0.07)
        .to(cards[0], { autoAlpha: 1, x: 0, y: 0, rotation: 0, duration: 0.18 }, 0.20)
        .to(cards[1], { autoAlpha: 1, x: 0, y: 0, rotation: 0, duration: 0.18 }, 0.26)
        .to(cards[2], { autoAlpha: 1, y: 0, scale: 1,         duration: 0.18 }, 0.34)
        .to({}, { duration: 0.16 }, 0.42)
        .to(label,    { autoAlpha: 0, y: isMobile ? 20 : 28,                    duration: 0.11 }, 0.58)
        .to(heading,  { autoAlpha: 0, y: isMobile ? 36 : 52, scale: isMobile ? 0.91 : 0.87, duration: 0.13 }, 0.64)
        .to(cards[0], { autoAlpha: 0, x: isMobile ? 0 : -50, y: isMobile ? 60 : 70, rotation: isMobile ? 0 : -2, duration: 0.15 }, 0.72)
        .to(cards[1], { autoAlpha: 0, x: isMobile ? 0 :  50, y: isMobile ? 70 : 80, rotation: isMobile ? 0 :  2, duration: 0.15 }, 0.78)
        .to(cards[2], { autoAlpha: 0, y: isMobile ? 80 : 90, scale: isMobile ? 0.94 : 0.92, duration: 0.15 }, 0.84);

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  // ── Theme classes ──────────────────────────────────────────────────────
  const sectionBg    = isLight ? "bg-gray-50"     : "bg-black";
  const glowBg       = isLight ? "bg-black/[0.02]" : "bg-white/[0.03]";
  const labelColor   = isLight ? "text-black/50"   : "text-white/70";
  const headingColor = isLight ? "text-zinc-900"   : "text-white";
  const cardBorder   = isLight
    ? "border border-black/10 bg-white/80"
    : "border border-white/10 bg-white/[0.03]";
  const categoryColor = isLight ? "text-black/50"  : "text-white/60";
  const titleColor    = isLight ? "text-zinc-900"  : "text-white";
  const yearColor     = isLight ? "text-black/40"  : "text-white/50";
  const viewColor     = isLight ? "text-black/70"  : "text-white/80";
  const iconBtnClass  = isLight
    ? "border border-black/10 bg-black/5 text-zinc-700 hover:bg-black hover:text-white"
    : "border border-white/10 bg-white/10 text-white hover:bg-white hover:text-black";

  return (
    <section
      ref={sectionRef}
      id="works"
      className={`relative w-full overflow-hidden px-6 py-28 transition-colors duration-300 ${sectionBg}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] ${glowBg}`} />
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
            className={`mt-5 text-4xl font-black leading-[0.98] tracking-tight sm:text-5xl lg:text-6xl ${headingColor}`}
          >
            {t.heading[0]}
            <br />
            {t.heading[1]}
          </h2>
        </div>

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
              <div className="relative h-[300px] overflow-hidden sm:h-[360px] md:h-[380px]">
                <img
                  src={work.image}
                  alt={language === "en" ? work.titleEn : work.titleId}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className={`absolute inset-0 ${isLight ? "bg-gradient-to-t from-white/90 via-white/20 to-transparent" : "bg-gradient-to-t from-black via-black/25 to-transparent"}`} />
                <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                  <div className="max-w-2xl">
                    <p className={`text-xs uppercase tracking-[0.22em] md:text-sm ${categoryColor}`}>
                      {language === "en" ? work.categoryEn : work.categoryId}
                    </p>
                    <h3 className={`mt-3 text-2xl font-bold md:text-3xl ${titleColor}`}>
                      {language === "en" ? work.titleEn : work.titleId}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href="#"
                      aria-label={`Open ${work.titleEn} website`}
                      className={`flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-xl transition-all duration-300 ${iconBtnClass}`}
                    >
                      <Globe size={20} />
                    </a>
                    <a
                      href="#"
                      aria-label={`Open ${work.titleEn} GitHub`}
                      className={`flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-xl transition-all duration-300 ${iconBtnClass}`}
                    >
                      <FaGithub size={18} />
                    </a>
                  </div>
                </div>

                <div className="mt-7 flex items-center justify-between">
                  <span className={`text-sm ${yearColor}`}>{work.year}</span>
                  <div className={`flex items-center gap-2 text-sm font-medium ${viewColor}`}>
                    {t.viewProject}
                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
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