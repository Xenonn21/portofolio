"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { ArrowUpRight, Globe } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const works = [
  {
    title: "Voitzu Store",
    category: "Fullstack Website",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Portfolio Website",
    category: "Frontend Development",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "AI Dashboard",
    category: "UI / UX Design",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function WorksSection() {
  const sectionRef  = useRef<HTMLElement | null>(null);
  const labelRef    = useRef<HTMLParagraphElement | null>(null);
  const headingRef  = useRef<HTMLHeadingElement | null>(null);
  // card[0] = kiri atas, card[1] = kanan atas, card[2] = card ketiga (full-width atau kiri)
  const cardRefs    = useRef<(HTMLElement | null)[]>([]);

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

      // ── Initial states ────────────────────────────────────────────────────
      // Label: fade in up sederhana
      gsap.set(label, {
        autoAlpha: 0,
        y: isMobile ? 20 : 28,
        willChange: "transform, opacity",
      });

      // Heading: fade + scale zoom in
      gsap.set(heading, {
        autoAlpha: 0,
        y: isMobile ? 36 : 52,
        scale: isMobile ? 0.91 : 0.87,
        transformOrigin: "center bottom",
        willChange: "transform, opacity",
      });

      // Card 0 (kiri): masuk dari kiri bawah + sedikit rotasi
      gsap.set(cards[0], {
        autoAlpha: 0,
        x: isMobile ? 0 : -60,
        y: isMobile ? 60 : 80,
        rotation: isMobile ? 0 : -3,
        transformOrigin: "left bottom",
        willChange: "transform, opacity",
      });

      // Card 1 (kanan): masuk dari kanan bawah + sedikit rotasi berlawanan
      gsap.set(cards[1], {
        autoAlpha: 0,
        x: isMobile ? 0 : 60,
        y: isMobile ? 70 : 90,
        rotation: isMobile ? 0 : 3,
        transformOrigin: "right bottom",
        willChange: "transform, opacity",
      });

      // Card 2 (bawah): masuk dari bawah, scale up
      gsap.set(cards[2], {
        autoAlpha: 0,
        y: isMobile ? 80 : 100,
        scale: isMobile ? 0.94 : 0.92,
        transformOrigin: "center bottom",
        willChange: "transform, opacity",
      });

      // ── Timeline ──────────────────────────────────────────────────────────
      // scrub 2.0 → smooth & flowing
      // start "top 78%" → animasi mulai saat section sudah kelihatan
      // end "bottom 22%" → keluar sebelum section hilang dari viewport
      //
      // Zona:
      //   Enter : 0.00 – 0.42
      //   Hold  : 0.42 – 0.58
      //   Exit  : 0.58 – 1.00

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

      // ── MASUK ─────────────────────────────────────────────────────────────
      tl
        .to(label, {
          autoAlpha: 1,
          y: 0,
          duration: 0.12,
        }, 0.00)

        .to(heading, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.16,
        }, 0.07)

        // Card 0 & 1 masuk bersamaan tapi dengan offset kecil — terasa seperti
        // dua kartu yang "dibuka" dari tengah ke samping
        .to(cards[0], {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.18,
        }, 0.20)

        .to(cards[1], {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.18,
        }, 0.26)

        // Card 2 masuk belakangan, naik dari bawah + scale up
        .to(cards[2], {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.18,
        }, 0.34)

        // ── HOLD ────────────────────────────────────────────────────────────
        .to({}, { duration: 0.16 }, 0.42)

        // ── KELUAR ──────────────────────────────────────────────────────────
        // Urutan kebalikan masuk: card2 → card1 → card0 → heading → label
        // Setiap elemen "jatuh ke bawah" dengan y positif
        .to(label, {
          autoAlpha: 0,
          y: isMobile ? 20 : 28,
          duration: 0.11,
        }, 0.58)

        .to(heading, {
          autoAlpha: 0,
          y: isMobile ? 36 : 52,
          scale: isMobile ? 0.91 : 0.87,
          duration: 0.13,
        }, 0.64)

        .to(cards[0], {
          autoAlpha: 0,
          x: isMobile ? 0 : -50,
          y: isMobile ? 60 : 70,
          rotation: isMobile ? 0 : -2,
          duration: 0.15,
        }, 0.72)

        .to(cards[1], {
          autoAlpha: 0,
          x: isMobile ? 0 : 50,
          y: isMobile ? 70 : 80,
          rotation: isMobile ? 0 : 2,
          duration: 0.15,
        }, 0.78)

        .to(cards[2], {
          autoAlpha: 0,
          y: isMobile ? 80 : 90,
          scale: isMobile ? 0.94 : 0.92,
          duration: 0.15,
        }, 0.84);

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative w-full overflow-hidden bg-black px-6 py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center">
          <p
            ref={labelRef}
            className="text-xs font-medium uppercase tracking-[0.35em] text-white/70 md:text-sm"
          >
            Featured Projects
          </p>

          <h2
            ref={headingRef}
            className="mt-5 text-4xl font-black leading-[0.98] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Selected Works &<br />
            Recent Projects
          </h2>
        </div>

        <div className="mt-20 grid gap-8 md:mt-24 md:grid-cols-2 md:gap-10">
          {works.map((work, index) => (
            <article
              key={work.title}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="
                group relative overflow-hidden rounded-[30px]
                border border-white/10 bg-white/[0.03]
                backdrop-blur-xl
                transition-transform duration-300
                hover:-translate-y-1
              "
            >
              <div className="relative h-[300px] overflow-hidden sm:h-[360px] md:h-[380px]">
                <img
                  src={work.image}
                  alt={work.title}
                  loading="lazy"
                  className="
                    h-full w-full object-cover
                    transition-transform duration-700
                    group-hover:scale-105
                  "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                  <div className="max-w-2xl">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/60 md:text-sm">
                      {work.category}
                    </p>
                    <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl">
                      {work.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href="#"
                      aria-label={`Open ${work.title} website`}
                      className="
                        flex h-12 w-12 items-center justify-center rounded-full
                        border border-white/10 bg-white/10 text-white
                        backdrop-blur-xl transition-all duration-300
                        hover:bg-white hover:text-black
                      "
                    >
                      <Globe size={20} />
                    </a>
                    <a
                      href="#"
                      aria-label={`Open ${work.title} GitHub`}
                      className="
                        flex h-12 w-12 items-center justify-center rounded-full
                        border border-white/10 bg-white/10 text-white
                        backdrop-blur-xl transition-all duration-300
                        hover:bg-white hover:text-black
                      "
                    >
                      <FaGithub size={18} />
                    </a>
                  </div>
                </div>

                <div className="mt-7 flex items-center justify-between">
                  <span className="text-sm text-white/50">{work.year}</span>
                  <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                    View Project
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