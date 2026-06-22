// src/components/sections/Home.tsx
"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";

// ── Terminal lines ─────────────────────────────────────────────────────────────
const TERMINAL_LINES_EN = [
  { tokens: [{ t: "kw", v: "const" }, { t: "plain", v: " " }, { t: "fn", v: "dev" }, { t: "op", v: " = " }, { t: "plain", v: "{" }] },
  { tokens: [{ t: "plain", v: "  name: " }, { t: "str", v: '"Raditya Arjun"' }, { t: "plain", v: "," }] },
  { tokens: [{ t: "plain", v: "  stack: [" }, { t: "str", v: '"Next.js"' }, { t: "plain", v: ", " }, { t: "str", v: '"TS"' }, { t: "plain", v: "]," }] },
  { tokens: [{ t: "plain", v: "  role: " }, { t: "str", v: '"Fullstack Dev"' }, { t: "plain", v: "," }] },
  { tokens: [{ t: "plain", v: "  open: " }, { t: "kw", v: "true" }, { t: "plain", v: "," }] },
  { tokens: [{ t: "plain", v: "  quotes: " }, { t: "str", v: '"clean code 🧹"' }, { t: "plain", v: "," }] },
  { tokens: [{ t: "plain", v: "};" }] },
  { tokens: [] },
  { tokens: [{ t: "cm", v: "// ready to ship 🚀" }] },
];

const TERMINAL_LINES_ID = [
  { tokens: [{ t: "kw", v: "const" }, { t: "plain", v: " " }, { t: "fn", v: "dev" }, { t: "op", v: " = " }, { t: "plain", v: "{" }] },
  { tokens: [{ t: "plain", v: "  nama: " }, { t: "str", v: '"Raditya Arjun"' }, { t: "plain", v: "," }] },
  { tokens: [{ t: "plain", v: "  stack: [" }, { t: "str", v: '"Next.js"' }, { t: "plain", v: ", " }, { t: "str", v: '"TS"' }, { t: "plain", v: "]," }] },
  { tokens: [{ t: "plain", v: "  peran: " }, { t: "str", v: '"Dev Fullstack"' }, { t: "plain", v: "," }] },
  { tokens: [{ t: "plain", v: "  terbuka: " }, { t: "kw", v: "true" }, { t: "plain", v: "," }] },
  { tokens: [{ t: "plain", v: "  motto: " }, { t: "str", v: '"kode bersih 🧹"' }, { t: "plain", v: "," }] },
  { tokens: [{ t: "plain", v: "};" }] },
  { tokens: [] },
  { tokens: [{ t: "cm", v: "// siap kirim 🚀" }] },
];

// Fire pills after line index 2 (3rd line) = early in typing
const PILLS_TRIGGER_LINE = 2;

const TOKEN_COLORS_DARK: Record<string, string> = {
  kw:    "text-purple-400",
  fn:    "text-blue-400",
  str:   "text-emerald-400",
  op:    "text-pink-300",
  cm:    "text-white/30",
  plain: "text-white/75",
};

const TOKEN_COLORS_LIGHT: Record<string, string> = {
  kw:    "text-purple-600",
  fn:    "text-blue-600",
  str:   "text-emerald-600",
  op:    "text-pink-500",
  cm:    "text-black/30",
  plain: "text-black/70",
};

const STAT_LABELS = {
  en: ["Projects", "Experience", "Perf score"],
  id: ["Proyek",   "Pengalaman", "Skor Perf"],
};

const STATS_BASE = [
  { value: "12+", color: "from-blue-500/15 to-blue-500/5",       border: "border-blue-500/20",    icon: "◈" },
  { value: "3yr", color: "from-emerald-500/15 to-emerald-500/5", border: "border-emerald-500/20", icon: "◉" },
  { value: "99",  color: "from-purple-500/15 to-purple-500/5",   border: "border-purple-500/20",  icon: "◆" },
];

// ── Terminal ───────────────────────────────────────────────────────────────────
function Terminal({
  compact = false,
  isLight = false,
  language = "en",
  onTrigger,
}: {
  compact?: boolean;
  isLight?: boolean;
  language?: "en" | "id";
  onTrigger?: () => void;
}) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [currentChars, setCurrentChars] = useState(0);
  const [done, setDone] = useState(false);
  const firedRef = useRef(false);

  const TOKEN_COLORS = isLight ? TOKEN_COLORS_LIGHT : TOKEN_COLORS_DARK;
  const TERMINAL_LINES = language === "id" ? TERMINAL_LINES_ID : TERMINAL_LINES_EN;

  const lineLen = (idx: number) =>
    TERMINAL_LINES[idx].tokens.reduce((acc, t) => acc + t.v.length, 0);

  // Re-type animation only on compact change (initial mount)
  // Language change just swaps content instantly without re-typing
  useEffect(() => {
    firedRef.current = false;
    setVisibleLines(0);
    setCurrentChars(0);
    setDone(false);

    let timeout: ReturnType<typeof setTimeout>;
    const typeLine = (lineIdx: number, charIdx: number) => {
      if (lineIdx >= TERMINAL_LINES.length) { setDone(true); return; }

      if (lineIdx >= PILLS_TRIGGER_LINE && !firedRef.current) {
        firedRef.current = true;
        onTrigger?.();
      }

      const len = lineLen(lineIdx);
      if (len === 0) {
        setVisibleLines(lineIdx + 1);
        setCurrentChars(0);
        timeout = setTimeout(() => typeLine(lineIdx + 1, 0), 60);
        return;
      }
      if (charIdx <= len) {
        setVisibleLines(lineIdx);
        setCurrentChars(charIdx);
        timeout = setTimeout(
          () => typeLine(lineIdx, charIdx + 1),
          charIdx === 0 ? 90 : 26 + Math.random() * 20
        );
      } else {
        setVisibleLines(lineIdx + 1);
        setCurrentChars(0);
        timeout = setTimeout(() => typeLine(lineIdx + 1, 0), 100);
      }
    };
    timeout = setTimeout(() => typeLine(0, 0), compact ? 400 : 900);
    return () => clearTimeout(timeout);
  }, [compact]); // intentionally excludes language — swap is instant, no re-type

  const renderTokens = (lineIdx: number) => {
    const line = TERMINAL_LINES[lineIdx];
    const isCurrent = lineIdx === visibleLines;
    const isComplete = lineIdx < visibleLines;
    if (!isComplete && !isCurrent) return null;
    let charsLeft = isCurrent ? currentChars : Infinity;
    return line.tokens.map((tok, ti) => {
      const slice = Math.min(tok.v.length, charsLeft);
      charsLeft -= slice;
      if (slice <= 0) return null;
      return (
        <span key={ti} className={TOKEN_COLORS[tok.t]}>
          {tok.v.slice(0, slice)}
        </span>
      );
    });
  };

  const termBg     = isLight ? "bg-[#f5f5f8]"        : "bg-[#0d0d14]";
  const titleBg    = isLight ? "bg-[#ebebf0]"         : "bg-[#0a0a10]";
  const borderCol  = isLight ? "border-black/[0.06]"  : "border-white/[0.07]";
  const titleBdr   = isLight ? "border-black/[0.05]"  : "border-white/[0.05]";
  const titleTxt   = isLight ? "text-black/25"        : "text-white/20";
  const lineNumCol = isLight ? "text-black/15"        : "text-white/15";
  const cursorCol  = isLight ? "bg-purple-500"        : "bg-purple-400";

  return (
    <div className={`overflow-hidden rounded-xl border shadow-xl shadow-black/30 transition-colors duration-300 ${termBg} ${borderCol}`}>
      <div className={`flex items-center gap-1.5 border-b px-3 py-2.5 transition-colors duration-300 ${titleBg} ${titleBdr}`}>
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className={`mx-auto font-mono text-[10px] ${titleTxt}`}>portfolio.tsx</span>
      </div>
      <div className={`px-5 py-4 font-mono leading-[1.8] ${compact ? "text-[11px]" : "text-[14px]"}`}>
        {TERMINAL_LINES.map((_, idx) => {
          if (idx > visibleLines) return null;
          const isCurrent = idx === visibleLines;
          return (
            <div key={idx} className="flex gap-4">
              <span className={`w-3 shrink-0 select-none text-right ${lineNumCol}`}>{idx + 1}</span>
              <span>
                {renderTokens(idx)}
                {isCurrent && !done && (
                  <span className={`inline-block h-[14px] w-[6px] translate-y-[1px] animate-[blink_1s_step-end_infinite] ${cursorCol}`} />
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Stat pill ──────────────────────────────────────────────────────────────────
function StatPill({
  stat,
  label,
  floatDir,
  scrollProgress,
  exitX,
  exitY,
  enterX,
  enterY,
  visible,
  isLight,
}: {
  stat: typeof STATS_BASE[0];
  label: string;
  floatDir: 1 | -1;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  exitX: number;
  exitY: number;
  enterX: number;
  enterY: number;
  visible: boolean;
  isLight: boolean;
}) {
  const rawX       = useTransform(scrollProgress, [0, 0.6], [0, exitX]);
  const rawY       = useTransform(scrollProgress, [0, 0.6], [0, exitY]);
  const rawOpacity = useTransform(scrollProgress, [0, 0.45], [1, 0]);

  const scrollX  = useSpring(rawX,       { stiffness: 80, damping: 28 });
  const scrollY  = useSpring(rawY,       { stiffness: 80, damping: 28 });
  const scrollOp = useSpring(rawOpacity, { stiffness: 80, damping: 28 });

  const valueColor  = isLight ? "text-black"    : "text-white";
  const labelColor  = isLight ? "text-black/40" : "text-white/40";
  const shadowClass = isLight ? "shadow-black/10" : "shadow-black/30";

  return (
    <motion.div style={{ x: scrollX, y: scrollY, opacity: scrollOp }}>
      <AnimatePresence>
        {visible && (
          <motion.div
            key="pill"
            initial={{ opacity: 0, x: enterX, y: enterY, scale: 0.75 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <motion.div
              animate={{ y: [0, floatDir * 6, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              className={`
                flex items-center gap-2.5 rounded-2xl border px-3 py-2
                bg-gradient-to-br backdrop-blur-xl
                ${stat.color} ${stat.border}
                shadow-lg ${shadowClass}
                transition-colors duration-300
              `}
            >
              <span className="text-base leading-none">{stat.icon}</span>
              <div>
                <p className={`font-mono text-base font-bold leading-none ${valueColor}`}>{stat.value}</p>
                <p className={`mt-0.5 text-[10px] ${labelColor}`}>{label}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Content ────────────────────────────────────────────────────────────────────
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

// ── Main ───────────────────────────────────────────────────────────────────────
export default function Home() {
  const { language, theme } = useApp();
  const t       = content[language];
  const isLight = theme === "light";
  const labels  = STAT_LABELS[language];

  const [pillsVisible, setPillsVisible] = useState([false, false, false]);
  const [mobilePillsVisible, setMobilePillsVisible] = useState([false, false, false]);

  const handleTrigger = () => {
    setTimeout(() => setPillsVisible(prev => [true,    prev[1], prev[2]]), 0);
    setTimeout(() => setPillsVisible(prev => [prev[0], true,    prev[2]]), 280);
    setTimeout(() => setPillsVisible(prev => [prev[0], prev[1], true   ]), 560);
  };

  const handleMobileTrigger = () => {
    setTimeout(() => setMobilePillsVisible(prev => [true,    prev[1], prev[2]]), 0);
    setTimeout(() => setMobilePillsVisible(prev => [prev[0], true,    prev[2]]), 280);
    setTimeout(() => setMobilePillsVisible(prev => [prev[0], prev[1], true   ]), 560);
  };

  const homeRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: homeRef,
    offset: ["start start", "end start"],
  });

  // ── LEFT COLUMN: title exits top-left, enters from top-left ──────────────
  // Title: enter from top-left (x:-60, y:-40), exit back to top-left
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const titleX       = useTransform(scrollYProgress, [0, 0.35], [0, -60]);
  const titleY       = useTransform(scrollYProgress, [0, 0.35], [0, -40]);

  // Description: enter from left, exit to left
  const descOpacity  = useTransform(scrollYProgress, [0.05, 0.38], [1, 0]);
  const descX        = useTransform(scrollYProgress, [0.05, 0.4],  [0, -60]);

  // Button 1 (primary): exits to bottom first
  const btn1Opacity  = useTransform(scrollYProgress, [0.1, 0.38], [1, 0]);
  const btn1Y        = useTransform(scrollYProgress, [0.1, 0.38], [0, 30]);

  // Button 2 (secondary): exits to bottom after btn1 (later range)
  const btn2Opacity  = useTransform(scrollYProgress, [0.2, 0.48], [1, 0]);
  const btn2Y        = useTransform(scrollYProgress, [0.2, 0.48], [0, 30]);

  const sTitleOp  = useSpring(titleOpacity, { stiffness: 80, damping: 30 });
  const sTitleX   = useSpring(titleX,       { stiffness: 80, damping: 30 });
  const sTitleY   = useSpring(titleY,       { stiffness: 80, damping: 30 });
  const sDescOp   = useSpring(descOpacity,  { stiffness: 80, damping: 30 });
  const sDescX    = useSpring(descX,        { stiffness: 80, damping: 30 });
  const sBtn1Op   = useSpring(btn1Opacity,  { stiffness: 80, damping: 30 });
  const sBtn1Y    = useSpring(btn1Y,        { stiffness: 80, damping: 30 });
  const sBtn2Op   = useSpring(btn2Opacity,  { stiffness: 80, damping: 30 });
  const sBtn2Y    = useSpring(btn2Y,        { stiffness: 80, damping: 30 });

  // ── RIGHT COLUMN: scale down + fade ──────────────────────────────────────
  const rightScale   = useTransform(scrollYProgress, [0, 0.6], [1, 0.82]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const sRightScale  = useSpring(rightScale,   { stiffness: 80, damping: 30 });
  const sRightOp     = useSpring(rightOpacity, { stiffness: 80, damping: 30 });

  // ── MOBILE scroll exits ───────────────────────────────────────────────────
  const mTitleOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const mTitleX       = useTransform(scrollYProgress, [0, 0.32], [0, -60]);
  const mTitleY       = useTransform(scrollYProgress, [0, 0.32], [0, -35]);

  const mDescOpacity  = useTransform(scrollYProgress, [0.05, 0.34], [1, 0]);
  const mDescX        = useTransform(scrollYProgress, [0.05, 0.36], [0, -60]);

  const mBtn1Opacity  = useTransform(scrollYProgress, [0.08, 0.35], [1, 0]);
  const mBtn1Y        = useTransform(scrollYProgress, [0.08, 0.35], [0, 28]);

  const mBtn2Opacity  = useTransform(scrollYProgress, [0.18, 0.44], [1, 0]);
  const mBtn2Y        = useTransform(scrollYProgress, [0.18, 0.44], [0, 28]);

  const mRightScale   = useTransform(scrollYProgress, [0, 0.55], [1, 0.82]);
  const mRightOpacity = useTransform(scrollYProgress, [0, 0.48], [1, 0]);

  const smTitleOp  = useSpring(mTitleOpacity, { stiffness: 80, damping: 30 });
  const smTitleX   = useSpring(mTitleX,       { stiffness: 80, damping: 30 });
  const smTitleY   = useSpring(mTitleY,       { stiffness: 80, damping: 30 });
  const smDescOp   = useSpring(mDescOpacity,  { stiffness: 80, damping: 30 });
  const smDescX    = useSpring(mDescX,        { stiffness: 80, damping: 30 });
  const smBtn1Op   = useSpring(mBtn1Opacity,  { stiffness: 80, damping: 30 });
  const smBtn1Y    = useSpring(mBtn1Y,        { stiffness: 80, damping: 30 });
  const smBtn2Op   = useSpring(mBtn2Opacity,  { stiffness: 80, damping: 30 });
  const smBtn2Y    = useSpring(mBtn2Y,        { stiffness: 80, damping: 30 });
  const smRightScale = useSpring(mRightScale,   { stiffness: 80, damping: 30 });
  const smRightOp    = useSpring(mRightOpacity, { stiffness: 80, damping: 30 });

  const sectionBg = isLight ? "bg-white text-black" : "bg-black text-white";
  const descColor = isLight ? "text-black/60"       : "text-white/60";
  const gridColor = isLight
    ? "linear-gradient(rgba(0,0,0,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.05) 1px,transparent 1px)"
    : "linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)";
  const btnSecondaryClass = isLight
    ? "border border-black/10 bg-black/5 hover:bg-black/10"
    : "border border-white/10 bg-white/5 hover:bg-white/10";

  const gradientWord = (word: string) =>
    ["Digital", "Modern", "Pengalaman"].includes(word)
      ? "bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent"
      : "";

  return (
    <section
      id="home"
      ref={homeRef}
      className={`relative flex min-h-screen items-center overflow-hidden transition-colors duration-300 ${sectionBg}`}
    >
      {/* grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: gridColor,
          backgroundSize: "52px 52px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-0 py-24">

        {/* ── DESKTOP: two columns ──────────────────────────────────────────── */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:items-center lg:gap-10 xl:gap-14">

          {/* LEFT */}
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Heading: enters from top-left, exits to top-left */}
              <motion.div style={{ opacity: sTitleOp, x: sTitleX, y: sTitleY }}>
                <motion.h1
                  initial="hidden"
                  animate="visible"
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
                  className="text-5xl font-black leading-[1.08] tracking-tight xl:text-7xl"
                >
                  {t.title.map((word, i) => (
                    <motion.span
                      key={`${language}-${i}`}
                      variants={{ hidden: { opacity: 0, x: -40, y: -20 }, visible: { opacity: 1, x: 0, y: 0 } }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className={`mr-3 inline-block ${gradientWord(word)}`}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>
              </motion.div>

              {/* Description: enters from left, exits to right */}
              <motion.div style={{ opacity: sDescOp, x: sDescX }}>
                <motion.p
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className={`mt-5 max-w-lg text-base leading-relaxed xl:text-lg ${descColor}`}
                >
                  {t.description}
                </motion.p>
              </motion.div>

              {/* Buttons: each enters from bottom, exits to bottom independently */}
              <div className="mt-6 flex flex-wrap gap-3">
                <motion.div style={{ opacity: sBtn1Op, y: sBtn1Y }}>
                  <motion.button
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.88, duration: 0.6 }}
                    className="rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-6 py-3.5 font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
                  >
                    {t.btnPrimary}
                  </motion.button>
                </motion.div>
                <motion.div style={{ opacity: sBtn2Op, y: sBtn2Y }}>
                  <motion.button
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.6 }}
                    className={`rounded-2xl px-6 py-3.5 font-semibold transition-colors duration-300 ${btnSecondaryClass}`}
                  >
                    {t.btnSecondary}
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div
            style={{ scale: sRightScale, opacity: sRightOp }}
            className="min-w-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto max-w-[480px] px-10 pt-10 pb-10"
            >
              {/* purple glow */}
              <div
                className="pointer-events-none absolute inset-0 -z-10 rounded-3xl opacity-20"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(139,92,246,0.25), transparent 80%)",
                }}
              />

              <Terminal isLight={isLight} language={language} onTrigger={handleTrigger} />

              {/* TOP-RIGHT: 12+ Projects */}
              <div className="absolute top-0 right-0">
                <StatPill
                  stat={STATS_BASE[0]}
                  label={labels[0]}
                  floatDir={-1}
                  scrollProgress={scrollYProgress}
                  exitX={80}   exitY={-60}
                  enterX={50}  enterY={-40}
                  visible={pillsVisible[0]}
                  isLight={isLight}
                />
              </div>

              {/* BOTTOM-RIGHT: Experience */}
              <div className="absolute bottom-6 right-0">
                <StatPill
                  stat={STATS_BASE[1]}
                  label={labels[1]}
                  floatDir={1}
                  scrollProgress={scrollYProgress}
                  exitX={80}   exitY={60}
                  enterX={50}  enterY={40}
                  visible={pillsVisible[1]}
                  isLight={isLight}
                />
              </div>

              {/* BOTTOM-LEFT: Perf score */}
              <div className="absolute bottom-6 left-0">
                <StatPill
                  stat={STATS_BASE[2]}
                  label={labels[2]}
                  floatDir={-1}
                  scrollProgress={scrollYProgress}
                  exitX={-80}  exitY={60}
                  enterX={-50} enterY={40}
                  visible={pillsVisible[2]}
                  isLight={isLight}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── MOBILE / TABLET: stacked ──────────────────────────────────────── */}
        <div className="flex flex-col gap-8 lg:hidden">

          {/* Left content with scroll-driven exits */}
          <div>
            {/* Title: exits top-left */}
            <motion.div style={{ opacity: smTitleOp, x: smTitleX, y: smTitleY }}>
              <motion.h1
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
                className="text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl"
              >
                {t.title.map((word, i) => (
                  <motion.span
                    key={`${language}-m-${i}`}
                    variants={{ hidden: { opacity: 0, x: -30, y: -15 }, visible: { opacity: 1, x: 0, y: 0 } }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className={`mr-2.5 inline-block ${gradientWord(word)}`}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
            </motion.div>

            {/* Description: exits to right */}
            <motion.div style={{ opacity: smDescOp, x: smDescX }}>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className={`mt-4 text-sm leading-relaxed sm:text-base ${descColor}`}
              >
                {t.description}
              </motion.p>
            </motion.div>

            {/* Buttons: each exits to bottom independently */}
            <div className="mt-5 flex flex-wrap gap-3">
              <motion.div style={{ opacity: smBtn1Op, y: smBtn1Y }}>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white"
                >
                  {t.btnPrimary}
                </motion.button>
              </motion.div>
              <motion.div style={{ opacity: smBtn2Op, y: smBtn2Y }}>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.82, duration: 0.6 }}
                  className={`rounded-2xl px-5 py-3 text-sm font-semibold transition-colors ${btnSecondaryClass}`}
                >
                  {t.btnSecondary}
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Terminal + absolute pills (mirrors desktop layout) */}
          <motion.div
            style={{ scale: smRightScale, opacity: smRightOp }}
            className="relative mx-auto w-full max-w-md px-6 pt-6 pb-6"
          >
            {/* purple glow */}
            <div
              className="pointer-events-none absolute inset-0 -z-10 rounded-3xl opacity-20"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(139,92,246,0.25), transparent 80%)",
              }}
            />

            <Terminal compact isLight={isLight} language={language} onTrigger={handleMobileTrigger} />

            {/* TOP-RIGHT pill */}
            <div className="absolute top-0 right-0">
              <StatPill
                stat={STATS_BASE[0]}
                label={labels[0]}
                floatDir={-1}
                scrollProgress={scrollYProgress}
                exitX={60}   exitY={-50}
                enterX={40}  enterY={-30}
                visible={mobilePillsVisible[0]}
                isLight={isLight}
              />
            </div>

            {/* BOTTOM-RIGHT pill */}
            <div className="absolute bottom-4 right-0">
              <StatPill
                stat={STATS_BASE[1]}
                label={labels[1]}
                floatDir={1}
                scrollProgress={scrollYProgress}
                exitX={60}   exitY={50}
                enterX={40}  enterY={30}
                visible={mobilePillsVisible[1]}
                isLight={isLight}
              />
            </div>

            {/* BOTTOM-LEFT pill */}
            <div className="absolute bottom-4 left-0">
              <StatPill
                stat={STATS_BASE[2]}
                label={labels[2]}
                floatDir={-1}
                scrollProgress={scrollYProgress}
                exitX={-60}  exitY={50}
                enterX={-40} enterY={30}
                visible={mobilePillsVisible[2]}
                isLight={isLight}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}