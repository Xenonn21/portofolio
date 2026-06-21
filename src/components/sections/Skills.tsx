"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FaReact, FaNodeJs, FaWordpress } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiTypescript } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "WORDPRESS",  icon: FaWordpress,   color: "#1296db" },
  { name: "TAILWIND",   icon: SiTailwindcss, color: "#38BDF8" },
  { name: "REACT.JS",   icon: FaReact,       color: "#61DAFB" },
  { name: "NEXT.JS",    icon: SiNextdotjs,   color: "#ffffff" },
  { name: "TYPESCRIPT", icon: SiTypescript,  color: "#3178C6" },
  { name: "NODE.JS",    icon: FaNodeJs,      color: "#68A063" },
];

export default function SkillsSection() {
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
      const yCard    = isMobile ? 50  : 72;   // lebih jauh = momentum lebih terasa
      const scaleH   = isMobile ? 0.90 : 0.86;

      gsap.set(label,   { autoAlpha: 0, y: yLabel,   willChange: "transform, opacity" });
      gsap.set(heading, { autoAlpha: 0, y: yHeading, scale: scaleH, transformOrigin: "center bottom", willChange: "transform, opacity" });
      gsap.set(cards,   { autoAlpha: 0, y: yCard,    willChange: "transform, opacity" });

      // ── Strategi timing ──────────────────────────────────────────────────
      // scrub 2.2  → GSAP ngejar posisi scroll dengan lag yang cukup besar,
      //              hasilnya gerakan terasa mengalir & tidak kasar sama sekali
      // start "top 75%" → animasi masuk cukup awal
      // end "bottom 25%" → animasi keluar sebelum section hilang
      //
      // Total timeline = 1.0
      //   Enter : 0.00 – 0.42
      //   Hold  : 0.42 – 0.58
      //   Exit  : 0.58 – 1.00
      //
      // Card stagger gap = 0.06 (lebih lebar dari sebelumnya 0.03–0.04)
      // Durasi per card = 0.15 (hampir 2× dari sebelumnya)
      // Keduanya berkontribusi agar setiap card punya "waktu napas" sendiri
      // ─────────────────────────────────────────────────────────────────────

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

      // ── MASUK ─────────────────────────────────────────────────────────────
      tl
        .to(label, { autoAlpha: 1, y: 0, duration: 0.12 }, 0.00)
        .to(heading, { autoAlpha: 1, y: 0, scale: 1, duration: 0.16 }, 0.07)

        // Cards: gap 0.06, durasi 0.15 — setiap card bergerak dengan pace sendiri
        .to(cards[0], { autoAlpha: 1, y: 0, duration: 0.15 }, 0.20)
        .to(cards[1], { autoAlpha: 1, y: 0, duration: 0.15 }, 0.26)
        .to(cards[2], { autoAlpha: 1, y: 0, duration: 0.15 }, 0.30)
        .to(cards[3], { autoAlpha: 1, y: 0, duration: 0.15 }, 0.34)
        .to(cards[4], { autoAlpha: 1, y: 0, duration: 0.15 }, 0.38)
        .to(cards[5], { autoAlpha: 1, y: 0, duration: 0.15 }, 0.42)

        // ── HOLD ──────────────────────────────────────────────────────────
        .to({}, { duration: 0.16 }, 0.42)

        // ── KELUAR ────────────────────────────────────────────────────────
        .to(label,   { autoAlpha: 0, y: yLabel,   duration: 0.11 }, 0.58)
        .to(heading, { autoAlpha: 0, y: yHeading, scale: scaleH, duration: 0.13 }, 0.65)

        // Cards keluar: gap 0.05, durasi 0.13
        .to(cards[0], { autoAlpha: 0, y: yCard, duration: 0.13 }, 0.73)
        .to(cards[1], { autoAlpha: 0, y: yCard, duration: 0.13 }, 0.78)
        .to(cards[2], { autoAlpha: 0, y: yCard, duration: 0.13 }, 0.82)
        .to(cards[3], { autoAlpha: 0, y: yCard, duration: 0.13 }, 0.86)
        .to(cards[4], { autoAlpha: 0, y: yCard, duration: 0.13 }, 0.89)
        .to(cards[5], { autoAlpha: 0, y: yCard, duration: 0.13 }, 0.92);

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden bg-black px-6 py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-[120px]" />
        <div className="absolute left-0 top-0 h-[260px] w-[260px] rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center">
          <p
            ref={labelRef}
            className="text-xs font-medium uppercase tracking-[0.35em] text-white/60 md:text-sm"
          >
            Skills & Experience
          </p>

          <h2
            ref={headingRef}
            className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Working with Latest
            <br />
            Technologies & Stack
          </h2>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.name}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative flex h-20 w-20 sm:h-22 sm:w-22 md:h-24 md:w-24 lg:h-26 lg:w-26 items-center justify-center rounded-full">
                  <div
                    className="absolute inset-0 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                    style={{ backgroundColor: skill.color }}
                  />
                  <div className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl" />
                  <Icon size={52} color={skill.color} className="relative z-10" />
                </div>

                <p className="mt-5 text-sm font-semibold tracking-[0.14em] text-white/65 transition-colors duration-300 group-hover:text-white">
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