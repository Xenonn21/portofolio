"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Sparkles, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const cardTopRef = useRef<HTMLDivElement | null>(null);
  const cardMidRef = useRef<HTMLDivElement | null>(null);
  const cardBottomRef = useRef<HTMLDivElement | null>(null);

  const aboutLabelRef = useRef<HTMLParagraphElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);

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

      // ─── Penjelasan strategi timing ──────────────────────────────────────
      // ScrollTrigger range: "top 85%" → "bottom 15%"
      //   → Animasi mulai saat section sudah 15% masuk dari bawah viewport
      //   → Animasi keluar selesai saat section masih 15% terlihat dari atas
      //
      // Timeline total duration = 1.0 (scrub unit)
      // Enter:  0.00 – 0.38  (zona masuk, ~38% dari perjalanan scroll)
      // Hold:   0.38 – 0.62  (zona stabil saat section di tengah viewport)
      // Exit:   0.62 – 1.00  (zona keluar, ~38% dari perjalanan scroll)
      //
      // Setiap elemen punya durasi 0.10–0.12 agar gerakannya smooth,
      // bukan "pop" yang terasa kasar. Gap antar elemen 0.05–0.06.
      // ─────────────────────────────────────────────────────────────────────

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",       // animasi mulai saat section 15% muncul dari bawah
          end:   "bottom 15%",    // animasi selesai saat section masih 15% terlihat dari atas
          scrub: 0.8,             // lebih responsif dari 1.2, tapi masih smooth
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
        defaults: { ease: "none" },
      });

      // ── MASUK ─────────────────────────────────────────────────────────────
      // Urutan: aboutLabel → cardTop → headline → cardMid → desc → cardBottom → tags
      tl
        .to(aboutLabel, { autoAlpha: 1, y: 0,                                   duration: 0.10 }, 0.00)
        .to(cardTop,    { autoAlpha: 1, x: 0, y: 0, rotation: isMobile ? -6 : -8, duration: 0.10 }, 0.05)
        .to(headline,   { autoAlpha: 1, x: 0, y: 0,                             duration: 0.10 }, 0.10)
        .to(cardMid,    { autoAlpha: 1, x: 0, y: 0, rotation: 0,                duration: 0.10 }, 0.15)
        .to(desc,       { autoAlpha: 1, x: 0, y: 0,                             duration: 0.10 }, 0.20)
        .to(cardBottom, { autoAlpha: 1, x: 0, y: 0, rotation: isMobile ? 6 : 8, duration: 0.10 }, 0.25)
        .to(tags[0],    { autoAlpha: 1, y: 0,                                   duration: 0.09 }, 0.30)
        .to(tags[1],    { autoAlpha: 1, y: 0,                                   duration: 0.09 }, 0.34)
        .to(tags[2],    { autoAlpha: 1, y: 0,                                   duration: 0.09 }, 0.38)

        // ── HOLD ────────────────────────────────────────────────────────────
        .to({}, { duration: 0.24 }, 0.38)

        // ── KELUAR ──────────────────────────────────────────────────────────
        // Urutan: aboutLabel → cardTop → headline → cardMid → desc → cardBottom → tags
        .to(aboutLabel, { autoAlpha: 0, y: motion.aboutLabelOut.y,                                                          duration: 0.09 }, 0.62)
        .to(cardTop,    { autoAlpha: 0, x: motion.cardTopIn.x,    y: motion.cardTopIn.y,    rotation: motion.cardTopIn.rotation,    duration: 0.09 }, 0.67)
        .to(headline,   { autoAlpha: 0, x: motion.headlineIn.x,   y: motion.headlineIn.y,                                          duration: 0.09 }, 0.72)
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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="
        relative
        flex
        min-h-screen
        items-center
        overflow-hidden
        px-6
        py-20
        lg:px-12
        lg:py-24
      "
    >
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 lg:-mt-2">
        {/* LEFT */}
        <div className="relative isolate mx-auto h-[420px] w-[320px] overflow-visible sm:h-[470px] sm:w-[380px]">
          {/* CARD ATAS */}
          <div
            ref={cardTopRef}
            className="
              group absolute left-[-28px] top-0 z-[3]
              h-[170px] w-[240px]
              -rotate-[8deg]
              rounded-[30px]
              border border-white/10
              bg-zinc-950/75
              p-5
              backdrop-blur-xl
              shadow-[0_18px_50px_rgba(0,0,0,0.22)]
              transition-all duration-300 ease-out
              hover:z-[5]
              hover:-translate-y-2
              hover:rotate-0
              hover:border-purple-300/25
              hover:bg-zinc-950/85
              sm:left-[-50px]
              sm:h-[184px]
              sm:w-[250px]
              sm:p-6
            "
          >
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-300 sm:h-12 sm:w-12">
                <Code2 size={22} />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Frontend Developer</p>
                <h3 className="font-semibold text-white">Modern UI</h3>
              </div>
            </div>
            <p className="text-sm leading-7 text-zinc-400">
              Membuat interface yang modern, cepat, dan tetap ringan.
            </p>
          </div>

          {/* CARD TENGAH */}
          <div
            ref={cardMidRef}
            className="
              group absolute right-0 top-[122px] z-[2]
              h-[170px] w-[240px]
              rounded-[28px]
              border border-white/10
              bg-zinc-950/72
              p-5
              backdrop-blur-xl
              shadow-[0_16px_44px_rgba(0,0,0,0.20)]
              transition-all duration-300 ease-out
              hover:z-[4]
              hover:-translate-y-2
              hover:rotate-0
              hover:border-purple-300/25
              hover:bg-zinc-950/85
              sm:top-[136px]
              sm:h-[184px]
              sm:w-[250px]
              sm:p-5
            "
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-300">
                <Sparkles size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Style</p>
                <h3 className="font-semibold text-white">Minimal</h3>
              </div>
            </div>
            <p className="text-sm leading-7 text-zinc-400">
              Fokus ke detail kecil yang bikin tampilan terasa premium.
            </p>
          </div>

          {/* CARD BAWAH */}
          <div
            ref={cardBottomRef}
            className="
              group absolute left-[-20px] top-[224px] z-[1]
              h-[170px] w-[240px]
              rotate-[8deg]
              rounded-[28px]
              border border-white/10
              bg-zinc-950/70
              p-5
              backdrop-blur-xl
              shadow-[0_16px_44px_rgba(0,0,0,0.20)]
              transition-all duration-300 ease-out
              hover:z-[3]
              hover:-translate-y-2
              hover:rotate-0
              hover:border-purple-300/25
              hover:bg-zinc-950/85
              sm:left-[-50px]
              sm:top-[242px]
              sm:h-[178px]
              sm:w-[240px]
              sm:p-5
            "
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-300">
                <Zap size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Focus</p>
                <h3 className="font-semibold text-white">Fast UI</h3>
              </div>
            </div>
            <p className="text-sm leading-7 text-zinc-400">
              Responsif, ringan, dan nyaman dipakai di semua device.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="max-w-xl">
          <p
            ref={aboutLabelRef}
            className="text-sm uppercase tracking-[0.3em] text-purple-300/80"
          >
            About Me
          </p>

          <h2
            ref={headlineRef}
            className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white lg:text-5xl"
          >
            Saya seorang Frontend Developer yang fokus pada UI modern dan performa.
          </h2>

          <p ref={descRef} className="mt-6 text-base leading-8 text-zinc-400">
            Saya suka membangun website yang cepat, clean, dan interaktif
            menggunakan Next.js, Tailwind CSS, dan teknologi modern lainnya.
            Tujuan saya adalah bikin pengalaman pengguna yang terasa nyaman,
            sederhana, dan tetap menarik.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {["Next.js", "Tailwind CSS", "Framer Motion"].map((tag, index) => (
              <span
                key={tag}
                ref={(el) => { tagRefs.current[index] = el; }}
                className="
                  rounded-full
                  border border-white/10
                  bg-white/5
                  px-4 py-2
                  text-sm text-zinc-300
                "
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