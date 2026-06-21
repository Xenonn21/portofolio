// src/components/sections/Home.tsx
"use client";

import { motion } from "framer-motion";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Atom, FileCode2, Wind, Braces } from "lucide-react";
import { useApp } from "@/context/AppContext";

const floatingItems = [
  {
    icon: Atom,
    className: "left-10 top-24",
    iconClass: "text-cyan-400",
    boxClass: "bg-cyan-400/5 ring-1 ring-cyan-400/60",
    animate: { y: [0, -8, 0] },
  },
  {
    icon: FileCode2,
    className: "bottom-24 left-16",
    iconClass: "text-blue-400",
    boxClass: "bg-blue-400/5 ring-1 ring-blue-400/60",
    animate: { y: [0, 8, 0] },
  },
  {
    icon: Wind,
    className: "bottom-20 right-16",
    iconClass: "text-cyan-300",
    boxClass: "bg-cyan-300/5 ring-1 ring-cyan-300/60",
    animate: { y: [0, -6, 0] },
  },
  {
    icon: Braces,
    className: "right-10 top-24",
    iconClass: "text-purple-300",
    boxClass: "bg-purple-300/5 ring-1 ring-purple-400/60",
    animate: { y: [0, 6, 0] },
  },
];

const content = {
  en: {
    title: ["Build", "Modern", "Digital", "Experiences"],
    description:
      "Futuristic web developer focused on building immersive, high-performance, and interactive interfaces using React, Next.js, and modern frontend technologies.",
    btnPrimary: "Explore Work",
    btnSecondary: "Contact Me",
  },
  id: {
    title: ["Bangun", "Pengalaman", "Digital", "Modern"],
    description:
      "Web developer futuristik yang fokus membangun antarmuka imersif, berperforma tinggi, dan interaktif menggunakan React, Next.js, dan teknologi frontend modern.",
    btnPrimary: "Lihat Karya",
    btnSecondary: "Hubungi Saya",
  },
};

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { language, theme } = useApp();
  const t = content[language];
  const isLight = theme === "light";

  const homeRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = {
        trigger: homeRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      };

      gsap.to(".home-title",   { x: -250, opacity: 0, scrollTrigger: trigger });
      gsap.to(".home-desc",    { x: -150, opacity: 0, scrollTrigger: trigger });
      gsap.to(".home-buttons", { y: 120,  opacity: 0, scrollTrigger: trigger });
      gsap.to(".home-center",  { scale: 0.5, rotate: 25, scrollTrigger: trigger });

      gsap.utils.toArray(".home-icon").forEach((icon, i) => {
        gsap.to(icon as HTMLElement, {
          x: i % 2 === 0 ? -180 : 180,
          rotate: i % 2 === 0 ? -25 : 25,
          scale: 0.6,
          ease: "none",
          scrollTrigger: trigger,
        });
      });
    }, homeRef);

    return () => ctx.revert();
  }, []);

  // Theme-driven classes
  const sectionBg  = isLight ? "bg-white text-black" : "bg-black text-white";
  const descColor  = isLight ? "text-black/60" : "text-white/60";
  const gridColor  = isLight
    ? "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)"
    : "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)";
  const particleBg = isLight
    ? "bg-[radial-gradient(circle,rgba(0,0,0,.4)_1px,transparent_1px)]"
    : "bg-[radial-gradient(circle,rgba(255,255,255,.5)_1px,transparent_1px)]";
  const btnSecondaryClass = isLight
    ? "border border-black/10 bg-black/5 hover:bg-black/10"
    : "border border-white/10 bg-white/5 hover:bg-white/10";

  return (
    <section
      id="home"
      ref={homeRef}
      className={`relative flex min-h-screen items-center overflow-hidden px-6 transition-colors duration-300 ${sectionBg}`}
    >
      {/* left grid */}
      <div
        className="absolute left-0 top-0 h-full w-[40%] opacity-[0.04]"
        style={{
          backgroundImage: gridColor,
          backgroundSize: "58px 58px",
          maskImage: "linear-gradient(to right, black, transparent)",
          WebkitMaskImage: "linear-gradient(to right, black, transparent)",
        }}
      />

      {/* particles */}
      <div className={`absolute inset-0 ${particleBg} [background-size:58px_58px] opacity-[0.02]`} />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          {/* title */}
          <div className="home-title">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
              className="max-w-2xl text-5xl font-black leading-[1.1] md:text-7xl"
            >
              {t.title.map((word, index) => (
                <motion.span
                  key={`${language}-${index}`}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`mr-4 inline-block ${
                    word === "Digital" || word === "Digital"
                      ? "bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent"
                      : ""
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* description */}
          <div className="home-desc">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className={`mt-4 max-w-xl text-lg leading-relaxed ${descColor}`}
            >
              {t.description}
            </motion.p>
          </div>

          {/* buttons */}
          <div className="home-buttons">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="mt-5 flex flex-wrap gap-4"
            >
              <button className="rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-7 py-4 font-semibold transition-transform duration-300 hover:scale-[1.03] text-white">
                {t.btnPrimary}
              </button>
              <button className={`rounded-2xl px-7 py-4 font-semibold transition-colors duration-300 ${btnSecondaryClass}`}>
                {t.btnSecondary}
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT — unchanged visual, same as original */}
        <div className="home-right">
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden h-[80vh] max-h-[620px] items-center justify-center lg:flex"
          >
            <div className="absolute h-[220px] w-[220px] rounded-full bg-purple-500/10 blur-[50px]" />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute h-[240px] w-[240px] rounded-full border border-purple-500/15"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              className="absolute h-[320px] w-[320px] rounded-full border border-fuchsia-500/10"
            />

            <div className="home-center relative flex h-[220px] w-[220px] items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="absolute h-[170px] w-[170px] rounded-[2rem] border border-purple-500/20"
              />
              <div className="absolute h-[120px] w-[120px] rounded-[1.8rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl" />
              <motion.div
                whileHover={{ scale: 1.06 }}
                className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10"
              >
                <motion.div
                  animate={{ rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <Atom className="h-9 w-9 text-cyan-400" />
                </motion.div>
              </motion.div>
            </div>

            {floatingItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className={`home-icon absolute z-20 ${item.className}`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div
                      animate={item.animate}
                      transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
                      className={`rounded-2xl p-4 ${item.boxClass}`}
                      style={{ isolation: "isolate" }}
                    >
                      <Icon className={`h-8 w-8 ${item.iconClass}`} />
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}