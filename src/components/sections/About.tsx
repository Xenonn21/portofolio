// src/components/sections/About.tsx
"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Sparkles, Zap } from "lucide-react";
import { useApp } from "@/context/AppContext";

gsap.registerPlugin(ScrollTrigger);

const content = {
  en: {
    label: "About Me",
    headline: "I'm a Frontend Developer focused on modern UI and performance.",
    description:
      "I love building fast, clean, and interactive websites using Next.js, Tailwind CSS, and other modern technologies. My goal is to create user experiences that feel comfortable, simple, and visually appealing.",
    cards: [
      {
        sub: "Frontend Developer",
        title: "Modern UI",
        desc: "Building modern, fast interfaces that stay lightweight.",
      },
      {
        sub: "Style",
        title: "Minimal",
        desc: "Focused on small details that make the look feel premium.",
      },
      {
        sub: "Focus",
        title: "Fast UI",
        desc: "Responsive, lightweight, and comfortable on all devices.",
      },
    ],
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  id: {
    label: "Tentang Saya",
    headline: "Saya seorang Frontend Developer yang fokus pada UI modern dan performa.",
    description:
      "Saya suka membangun website yang cepat, clean, dan interaktif menggunakan Next.js, Tailwind CSS, dan teknologi modern lainnya. Tujuan saya adalah bikin pengalaman pengguna yang terasa nyaman, sederhana, dan tetap menarik.",
    cards: [
      {
        sub: "Frontend Developer",
        title: "Modern UI",
        desc: "Membuat interface yang modern, cepat, dan tetap ringan.",
      },
      {
        sub: "Style",
        title: "Minimal",
        desc: "Fokus ke detail kecil yang bikin tampilan terasa premium.",
      },
      {
        sub: "Focus",
        title: "Fast UI",
        desc: "Responsif, ringan, dan nyaman dipakai di semua device.",
      },
    ],
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
};

export default function About() {
  const { language, theme } = useApp();
  const t = content[language];
  const isLight = theme === "light";

  const sectionRef    = useRef<HTMLElement | null>(null);
  const cardTopRef    = useRef<HTMLDivElement | null>(null);
  const cardMidRef    = useRef<HTMLDivElement | null>(null);
  const cardBottomRef = useRef<HTMLDivElement | null>(null);
  const aboutLabelRef = useRef<HTMLParagraphElement | null>(null);
  const headlineRef   = useRef<HTMLHeadingElement | null>(null);
  const descRef       = useRef<HTMLParagraphElement | null>(null);
  const tagRefs       = useRef<(HTMLSpanElement | null)[]>([]);

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
      const cardTop    = cardTopRef.current;
      const cardMid    = cardMidRef.current;
      const cardBottom = cardBottomRef.current;
      const aboutLabel = aboutLabelRef.current;
      const headline   = headlineRef.current;
      const desc       = descRef.current;
      const tags       = tagRefs.current.filter(Boolean) as HTMLSpanElement[];

      if (!cardTop || !cardMid || !cardBottom || !aboutLabel || !headline || !desc || tags.length !== 3) return;

      const isMobile = window.innerWidth < 768;

      const motion = {
        aboutLabelIn:  { y: isMobile ? 8  : 12 },
        aboutLabelOut: { y: isMobile ? -8 : -12 },
        headlineIn:    { x: isMobile ? 28  : 70,  y: isMobile ? 10 : 20 },
        descIn:        { x: isMobile ? 20  : 70,  y: 0 },
        cardTopIn:     { x: isMobile ? -28 : -100, y: isMobile ? -38 : -105, rotation: isMobile ? -10 : -18 },
        cardMidIn:     { x: isMobile ? 28  :  100, y: isMobile ? -10 : -12,  rotation: isMobile ?   8 :  12 },
        cardBottomIn:  { x: isMobile ? -22 :  -90, y: isMobile ?  48 :  100, rotation: isMobile ?  10 :  16 },
        tagY: isMobile ? 20 : 30,
      };

      const allEls = [aboutLabel, headline, desc, cardTop, cardMid, cardBottom, ...tags];

      gsap.set(allEls,      { autoAlpha: 0, willChange: "transform, opacity" });
      gsap.set(aboutLabel,  motion.aboutLabelIn);
      gsap.set(headline,    motion.headlineIn);
      gsap.set(desc,        motion.descIn);
      gsap.set(cardTop,     motion.cardTopIn);
      gsap.set(cardMid,     motion.cardMidIn);
      gsap.set(cardBottom,  motion.cardBottomIn);
      gsap.set(tags,        { y: motion.tagY });

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

      tl
        .to(aboutLabel, { autoAlpha: 1, y: 0,                                                        duration: 0.10 }, 0.00)
        .to(cardTop,    { autoAlpha: 1, x: 0, y: 0, rotation: isMobile ? -6 : -8,                   duration: 0.10 }, 0.05)
        .to(headline,   { autoAlpha: 1, x: 0, y: 0,                                                  duration: 0.10 }, 0.10)
        .to(cardMid,    { autoAlpha: 1, x: 0, y: 0, rotation: 0,                                     duration: 0.10 }, 0.15)
        .to(desc,       { autoAlpha: 1, x: 0, y: 0,                                                  duration: 0.10 }, 0.20)
        .to(cardBottom, { autoAlpha: 1, x: 0, y: 0, rotation: isMobile ? 6 : 8,                      duration: 0.10 }, 0.25)
        .to(tags[0],    { autoAlpha: 1, y: 0,                                                        duration: 0.09 }, 0.30)
        .to(tags[1],    { autoAlpha: 1, y: 0,                                                        duration: 0.09 }, 0.34)
        .to(tags[2],    { autoAlpha: 1, y: 0,                                                        duration: 0.09 }, 0.38)
        .to({}, { duration: 0.24 }, 0.38)
        .to(aboutLabel, { autoAlpha: 0, y: motion.aboutLabelOut.y,                                                             duration: 0.09 }, 0.62)
        .to(cardTop,    { autoAlpha: 0, x: motion.cardTopIn.x,    y: motion.cardTopIn.y,    rotation: motion.cardTopIn.rotation,    duration: 0.09 }, 0.67)
        .to(headline,   { autoAlpha: 0, x: motion.headlineIn.x,   y: motion.headlineIn.y,                                           duration: 0.09 }, 0.72)
        .to(cardMid,    { autoAlpha: 0, x: motion.cardMidIn.x,    y: motion.cardMidIn.y,    rotation: motion.cardMidIn.rotation,    duration: 0.09 }, 0.77)
        .to(desc,       { autoAlpha: 0, x: motion.descIn.x,       y: motion.descIn.y,                                              duration: 0.09 }, 0.82)
        .to(cardBottom, { autoAlpha: 0, x: motion.cardBottomIn.x, y: motion.cardBottomIn.y, rotation: motion.cardBottomIn.rotation, duration: 0.09 }, 0.87)
        .to(tags[0],    { autoAlpha: 0, y: motion.tagY,                                                                             duration: 0.08 }, 0.90)
        .to(tags[1],    { autoAlpha: 0, y: motion.tagY,                                                                             duration: 0.08 }, 0.94)
        .to(tags[2],    { autoAlpha: 0, y: motion.tagY,                                                                             duration: 0.08 }, 0.98);

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  // ── Theme classes ──────────────────────────────────────────────────────
  const sectionBg   = isLight ? "bg-white"       : "bg-black";
  const cardBg      = isLight ? "bg-white/90 border-black/10 shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
                               : "bg-zinc-950/75 border-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.22)]";
  const cardHover   = isLight ? "hover:border-purple-400/40 hover:bg-white"
                               : "hover:border-purple-300/25 hover:bg-zinc-950/85";
  const iconBg      = "bg-purple-500/10 text-purple-500";
  const cardSubText = isLight ? "text-zinc-500"  : "text-zinc-400";
  const cardTitle   = isLight ? "text-zinc-900"  : "text-white";
  const cardDesc    = isLight ? "text-zinc-500"  : "text-zinc-400";
  const labelColor  = isLight ? "text-purple-600/80" : "text-purple-300/80";
  const headlineColor = isLight ? "text-zinc-900" : "text-white";
  const descColor   = isLight ? "text-zinc-600"  : "text-zinc-400";
  const tagClass    = isLight
    ? "border border-black/10 bg-black/5 text-zinc-700"
    : "border border-white/10 bg-white/5 text-zinc-300";

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`relative flex min-h-screen items-center overflow-hidden px-6 py-20 lg:px-12 lg:py-24 transition-colors duration-300 ${sectionBg}`}
    >
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 lg:-mt-2">

        {/* LEFT — Cards */}
        <div className="relative isolate mx-auto h-[420px] w-[320px] overflow-visible sm:h-[470px] sm:w-[380px]">

          {/* CARD TOP */}
          <div
            ref={cardTopRef}
            className={`
              group absolute left-[-28px] top-0 z-[3]
              h-[170px] w-[240px] -rotate-[8deg]
              rounded-[30px] border p-5 backdrop-blur-xl
              transition-all duration-300 ease-out
              hover:z-[5] hover:-translate-y-2 hover:rotate-0
              sm:left-[-50px] sm:h-[184px] sm:w-[250px] sm:p-6
              ${cardBg} ${cardHover}
            `}
          >
            <div className="mb-4 flex items-center gap-4">
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl sm:h-12 sm:w-12 ${iconBg}`}>
                <Code2 size={22} />
              </div>
              <div>
                <p className={`text-sm ${cardSubText}`}>{t.cards[0].sub}</p>
                <h3 className={`font-semibold ${cardTitle}`}>{t.cards[0].title}</h3>
              </div>
            </div>
            <p className={`text-sm leading-7 ${cardDesc}`}>{t.cards[0].desc}</p>
          </div>

          {/* CARD MID */}
          <div
            ref={cardMidRef}
            className={`
              group absolute right-0 top-[122px] z-[2]
              h-[170px] w-[240px]
              rounded-[28px] border p-5 backdrop-blur-xl
              transition-all duration-300 ease-out
              hover:z-[4] hover:-translate-y-2 hover:rotate-0
              sm:top-[136px] sm:h-[184px] sm:w-[250px] sm:p-5
              ${cardBg} ${cardHover}
            `}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${iconBg}`}>
                <Sparkles size={18} />
              </div>
              <div>
                <p className={`text-xs uppercase tracking-[0.25em] ${cardSubText}`}>{t.cards[1].sub}</p>
                <h3 className={`font-semibold ${cardTitle}`}>{t.cards[1].title}</h3>
              </div>
            </div>
            <p className={`text-sm leading-7 ${cardDesc}`}>{t.cards[1].desc}</p>
          </div>

          {/* CARD BOTTOM */}
          <div
            ref={cardBottomRef}
            className={`
              group absolute left-[-20px] top-[224px] z-[1]
              h-[170px] w-[240px] rotate-[8deg]
              rounded-[28px] border p-5 backdrop-blur-xl
              transition-all duration-300 ease-out
              hover:z-[3] hover:-translate-y-2 hover:rotate-0
              sm:left-[-50px] sm:top-[242px] sm:h-[178px] sm:w-[240px] sm:p-5
              ${cardBg} ${cardHover}
            `}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${iconBg}`}>
                <Zap size={18} />
              </div>
              <div>
                <p className={`text-xs uppercase tracking-[0.25em] ${cardSubText}`}>{t.cards[2].sub}</p>
                <h3 className={`font-semibold ${cardTitle}`}>{t.cards[2].title}</h3>
              </div>
            </div>
            <p className={`text-sm leading-7 ${cardDesc}`}>{t.cards[2].desc}</p>
          </div>
        </div>

        {/* RIGHT — Text */}
        <div className="max-w-xl">
          <p ref={aboutLabelRef} className={`text-sm uppercase tracking-[0.3em] ${labelColor}`}>
            {t.label}
          </p>

          <h2
            ref={headlineRef}
            className={`mt-4 text-4xl font-semibold leading-tight tracking-tight lg:text-5xl ${headlineColor}`}
          >
            {t.headline}
          </h2>

          <p ref={descRef} className={`mt-6 text-base leading-8 ${descColor}`}>
            {t.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {t.tags.map((tag, index) => (
              <span
                key={tag}
                ref={(el) => { tagRefs.current[index] = el; }}
                className={`rounded-full px-4 py-2 text-sm ${tagClass}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}