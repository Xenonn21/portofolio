// src/components/sections/Skills.tsx
"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useApp } from "@/context/AppContext";

import { FaReact, FaNodeJs, FaWordpress, FaHtml5, FaCss3Alt, FaJs } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiTypescript, SiPostgresql, SiExpress } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "WordPress",  sub: "CMS & Theming",       icon: FaWordpress,   color: "#1296db" },
  { name: "Tailwind",   sub: "Utility CSS",          icon: SiTailwindcss, color: "#38BDF8" },
  { name: "React.js",   sub: "UI Library",           icon: FaReact,       color: "#61DAFB" },
  { name: "Next.js",    sub: "Full-stack Framework", icon: SiNextdotjs,   color: null      },
  { name: "TypeScript", sub: "Typed JavaScript",     icon: SiTypescript,  color: "#3178C6" },
  { name: "Node.js",    sub: "Server Runtime",       icon: FaNodeJs,      color: "#68A063" },
  { name: "HTML5",      sub: "Markup Language",      icon: FaHtml5,       color: "#E34F26" },
  { name: "CSS3",       sub: "Styling & Layout",     icon: FaCss3Alt,     color: "#1572B6" },
  { name: "JavaScript", sub: "Scripting Language",   icon: FaJs,          color: "#F7DF1E" },
  { name: "PostgreSQL", sub: "Relational Database",  icon: SiPostgresql,  color: "#336791" },
  { name: "Express.js", sub: "Node.js Framework",    icon: SiExpress,     color: null      },
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
  const gridRef    = useRef<HTMLDivElement | null>(null);
  const tileRefs   = useRef<(HTMLDivElement | null)[]>([]);

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
      const tiles   = tileRefs.current.filter(Boolean) as HTMLDivElement[];

      if (!label || !heading || tiles.length === 0) return;

      const isMobile = window.innerWidth < 640;
      const yOffset  = isMobile ? 24 : 36;
      const scaleH   = 0.94;

      // Urutkan tiles berdasarkan posisi visual (baris atas → bawah, kiri → kanan)
      const orderedTiles = [...tiles].sort((a, b) => {
        const ra = a.getBoundingClientRect();
        const rb = b.getBoundingClientRect();
        if (Math.abs(ra.top - rb.top) > 10) return ra.top - rb.top;
        return ra.left - rb.left;
      });

      const allEls = [label, heading, ...orderedTiles];

      // Set initial hidden state — semua dari bawah (y positif)
      gsap.set(allEls, { autoAlpha: 0, willChange: "transform, opacity" });
      gsap.set(label,   { y: yOffset });
      gsap.set(heading, { y: yOffset * 1.2, scale: scaleH });
      orderedTiles.forEach((tile) => gsap.set(tile, { y: yOffset * 0.8 }));

      // ── Timeline di-scrub oleh scroll ────────────────────────────────
      // Sama persis seperti About.tsx: scrub membuat animasi berjalan
      // maju saat scroll ke bawah dan mundur saat scroll ke atas — otomatis.
      //
      // Pembagian progress (0 → 1):
      //   0.00 – 0.08 : label masuk
      //   0.06 – 0.14 : heading masuk
      //   0.12 – 0.65 : tiles masuk satu per satu (11 tiles × ~0.048 interval)
      //   0.65 – 0.72 : hold sebentar (semua terlihat)
      //   0.72 – 0.78 : label keluar
      //   0.76 – 0.84 : heading keluar
      //   0.82 – 1.00 : tiles keluar satu per satu

      const TILE_COUNT   = orderedTiles.length; // 11
      const IN_START     = 0.12;
      const IN_INTERVAL  = 0.048; // jarak antar tile masuk
      const IN_DUR       = 0.06;  // durasi fade-in per tile

      // Tile terakhir masuk di: IN_START + (TILE_COUNT - 1) * IN_INTERVAL
      const lastTileInEnd = IN_START + (TILE_COUNT - 1) * IN_INTERVAL + IN_DUR; // ≈ 0.69

      const HOLD_END     = lastTileInEnd + 0.04; // ≈ 0.73  — sedikit jeda

      const OUT_LABEL_START   = HOLD_END;           // ≈ 0.73
      const OUT_HEADING_START = HOLD_END + 0.05;    // ≈ 0.78
      const OUT_TILE_START    = HOLD_END + 0.10;    // ≈ 0.83
      const OUT_INTERVAL      = 0.038;
      const OUT_DUR           = 0.05;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end:   "bottom 15%",
          scrub: 0.8,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
        defaults: { ease: "none" },
      });

      // ── ANIMASI MASUK ──────────────────────────────────────────────────

      // 1. Label masuk
      tl.to(label, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.00);

      // 2. Heading masuk
      tl.to(heading, { autoAlpha: 1, y: 0, scale: 1, duration: 0.09 }, 0.06);

      // 3. Tiles masuk satu per satu (card[0] dulu → card[10] terakhir)
      orderedTiles.forEach((tile, i) => {
        tl.to(tile, { autoAlpha: 1, y: 0, duration: IN_DUR }, IN_START + i * IN_INTERVAL);
      });

      // ── HOLD ─────────────────────────────────────────────────────────
      tl.to({}, { duration: 0.04 }, lastTileInEnd);

      // ── ANIMASI KELUAR ────────────────────────────────────────────────

      // 4. Label keluar duluan
      tl.to(label, { autoAlpha: 0, y: -(yOffset * 0.6), duration: 0.07 }, OUT_LABEL_START);

      // 5. Heading keluar
      tl.to(heading, { autoAlpha: 0, y: -(yOffset * 0.8), scale: scaleH, duration: 0.08 }, OUT_HEADING_START);

      // 6. Tiles keluar satu per satu (card[0] dulu → card[10] terakhir)
      orderedTiles.forEach((tile, i) => {
        tl.to(tile, { autoAlpha: 0, y: -(yOffset * 0.6), duration: OUT_DUR }, OUT_TILE_START + i * OUT_INTERVAL);
      });

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  // ── theme ──────────────────────────────────────────────────────────────
  const sectionBg    = isLight ? "bg-gray-50"            : "bg-black";
  const glowCenter   = isLight ? "bg-black/[0.02]"       : "bg-white/[0.025]";
  const glowCorner   = isLight ? "bg-purple-400/[0.06]"  : "bg-purple-500/[0.08]";
  const labelColor   = isLight ? "text-black/45"         : "text-white/50";
  const headingColor = isLight ? "text-zinc-900"         : "text-white";
  const tileBg       = isLight ? "bg-white"              : "bg-white/[0.03]";
  const tileBorder   = isLight ? "border-black/[0.08]"   : "border-white/[0.08]";
  const tileHover    = isLight
    ? "hover:border-black/[0.16] hover:bg-white"
    : "hover:border-white/[0.16] hover:bg-white/[0.06]";
  const nameColor    = isLight ? "text-zinc-800"         : "text-white/90";
  const subColor     = isLight ? "text-black/35"         : "text-white/35";

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={`relative overflow-hidden py-20 sm:py-24 lg:py-32 transition-colors duration-300 ${sectionBg}`}
    >
      {/* glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute left-1/2 top-1/2 h-[500px] w-[500px] lg:h-[700px] lg:w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px] ${glowCenter}`} />
        <div className={`absolute right-0 bottom-0 h-[200px] w-[200px] lg:h-[280px] lg:w-[280px] rounded-full blur-[100px] ${glowCorner}`} />
      </div>

      <div className="relative z-10 px-6 sm:px-8 lg:px-10">

        {/* heading */}
        <div className="mb-10 text-center sm:mb-12 lg:mb-16">
          <p
            ref={labelRef}
            className={`mb-4 text-[10px] font-medium uppercase tracking-[0.32em] sm:text-xs ${labelColor}`}
          >
            {t.label}
          </p>
          <h2
            ref={headingRef}
            className={`text-3xl font-black leading-[1.06] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl ${headingColor}`}
          >
            {t.heading[0]}
            <br />
            {t.heading[1]}
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5 lg:gap-5"
        >
          {skills.map((skill, index) => {
            const Icon      = skill.icon;
            const dotColor  = skill.color ?? (isLight ? "#18181b" : "#e4e4e7");
            const iconColor = skill.color ?? (isLight ? "#18181b" : "#e4e4e7");

            return (
              <div
                key={skill.name}
                ref={(el) => { tileRefs.current[index] = el; }}
                className={`
                  group flex cursor-default flex-col
                  rounded-2xl border
                  p-4 gap-3
                  sm:p-5 sm:gap-4
                  lg:p-6 lg:gap-5
                  ${tileBg} ${tileBorder} ${tileHover}
                  transition-colors duration-200
                `}
              >
                <span
                  className="shrink-0 inline-flex
                    text-[26px]
                    sm:text-[30px]
                    lg:text-[38px]
                    transition-transform duration-300 group-hover:scale-110"
                  style={{ color: iconColor }}
                >
                  <Icon />
                </span>

                <div className="flex flex-col gap-1 lg:gap-1.5">
                  <span className={`font-semibold leading-tight text-[12px] sm:text-[13px] lg:text-[15px] ${nameColor}`}>
                    {skill.name}
                  </span>
                  <span className={`leading-snug text-[10px] sm:text-[10px] lg:text-[11px] ${subColor}`}>
                    {skill.sub}
                  </span>
                </div>

                <div
                  className="mt-auto rounded-full h-[5px] w-[5px] sm:h-[6px] sm:w-[6px] lg:h-2 lg:w-2"
                  style={{ backgroundColor: dotColor }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}