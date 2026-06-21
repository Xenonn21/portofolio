// src/components/sections/Contact.tsx
"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { Mail, MapPin, Phone, Send, Globe, User } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contactItems = [
  { label: "Email",    value: "ajunf2@gmail.com",        href: "mailto:ajunf2@gmail.com",       icon: Mail   },
  { label: "Phone",    value: "+62 857 7315 3585",        href: "https://wa.me/6285773153585",   icon: Phone  },
  { label: "Location", value: "Indonesia, Jakarta Selatan", href: "#",                           icon: MapPin },
];

const socialItems = [
  { label: "Website", href: "#", icon: Globe },
  { label: "Profile", href: "#", icon: User  },
];

export default function Contact() {
  const sectionRef    = useRef<HTMLElement | null>(null);
  const labelRef      = useRef<HTMLParagraphElement | null>(null);
  const headingRef    = useRef<HTMLHeadingElement | null>(null);
  const subRef        = useRef<HTMLParagraphElement | null>(null);
  const leftCardRef   = useRef<HTMLDivElement | null>(null);
  const socialCardRef = useRef<HTMLDivElement | null>(null);
  const rightCardRef  = useRef<HTMLDivElement | null>(null);

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
      const label      = labelRef.current;
      const heading    = headingRef.current;
      const sub        = subRef.current;
      const leftCard   = leftCardRef.current;
      const socialCard = socialCardRef.current;
      const rightCard  = rightCardRef.current;

      if (!label || !heading || !sub || !leftCard || !socialCard || !rightCard) return;

      const isMobile = window.innerWidth < 768;

      // ── SLASH: setiap elemen datang dari arah diagonal yang berbeda ────────
      // Label  : slash dari kiri  (x negatif + y positif kecil)
      // Heading: slash dari kanan (x positif + y positif + sedikit scale)
      // Sub    : slash dari kiri  (x negatif kecil)
      // Left   : slash dari kiri bawah + rotasi kecil
      // Social : slash dari kiri bawah, lebih ringan
      // Right  : slash dari kanan bawah + rotasi berlawanan

      gsap.set(label, {
        autoAlpha: 0,
        x: isMobile ? -28 : -44,
        y: isMobile ? 12 : 16,
        willChange: "transform, opacity",
      });

      gsap.set(heading, {
        autoAlpha: 0,
        x: isMobile ? 0  : 36,
        y: isMobile ? 32 : 48,
        scale: isMobile ? 0.95 : 0.93,
        transformOrigin: "left bottom",
        willChange: "transform, opacity",
      });

      gsap.set(sub, {
        autoAlpha: 0,
        x: isMobile ? -18 : -30,
        y: isMobile ? 10 : 14,
        willChange: "transform, opacity",
      });

      gsap.set(leftCard, {
        autoAlpha: 0,
        x: isMobile ? -24 : -52,
        y: isMobile ? 40 : 60,
        rotation: isMobile ? 0 : -2,
        transformOrigin: "left bottom",
        willChange: "transform, opacity",
      });

      gsap.set(socialCard, {
        autoAlpha: 0,
        x: isMobile ? -18 : -40,
        y: isMobile ? 30 : 44,
        rotation: isMobile ? 0 : -1.5,
        transformOrigin: "left bottom",
        willChange: "transform, opacity",
      });

      gsap.set(rightCard, {
        autoAlpha: 0,
        x: isMobile ? 24 : 52,
        y: isMobile ? 40 : 60,
        rotation: isMobile ? 0 : 2,
        transformOrigin: "right bottom",
        willChange: "transform, opacity",
      });

      // ── Timeline ──────────────────────────────────────────────────────────
      // Contact biasanya di paling bawah halaman, jadi hanya perlu animasi
      // MASUK saja. Tidak ada exit karena tidak ada section sesudahnya.
      // scrub 1.8 → cukup smooth, sedikit lag yang elegan
      // start "top 82%" → animasi mulai cukup awal
      // end "top 18%" → semua elemen sudah di posisi final sebelum section
      //                  benar-benar di tengah viewport

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          end:   "top 18%",
          scrub: 1.8,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
        defaults: { ease: "none" },
      });

      tl
        // Label slash dari kiri
        .to(label, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.14,
        }, 0.00)

        // Heading slash dari kanan bawah + scale
        .to(heading, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.18,
        }, 0.08)

        // Sub slash dari kiri
        .to(sub, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.14,
        }, 0.20)

        // Left card slash dari kiri bawah + luruskan rotasi
        .to(leftCard, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.18,
        }, 0.30)

        // Social card menyusul
        .to(socialCard, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.16,
        }, 0.42)

        // Right card slash dari kanan bawah — masuk bersamaan dengan left
        // tapi sedikit lebih lambat untuk memberi kesan "sayap terbuka"
        .to(rightCard, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.20,
        }, 0.36);

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-black px-6 py-24 text-white"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* heading */}
        <div className="mb-12 max-w-2xl">
          <p
            ref={labelRef}
            className="text-white/70 tracking-[0.35em] text-xs md:text-sm uppercase font-medium"
          >
            Contact
          </p>
          <h2
            ref={headingRef}
            className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight text-white"
          >
            Let's talk about your next project.
          </h2>
          <p
            ref={subRef}
            className="mt-4 max-w-xl text-sm leading-7 text-zinc-400 md:text-base"
          >
            Punya ide, butuh bantuan, atau cuma mau say hello? Kirim pesan aja
            — saya biasanya balas secepatnya.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          {/* left */}
          <div className="space-y-6">
            <div
              ref={leftCardRef}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-7"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-white/10" />
                <div>
                  <p className="text-sm text-zinc-400">Open for</p>
                  <p className="font-medium text-white">
                    Freelance, collaboration, and new ideas
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-black/20 px-4 py-4 transition hover:border-white/15 hover:bg-white/[0.06]"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8 text-zinc-300 transition group-hover:text-white">
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                          {item.label}
                        </p>
                        <p className="truncate text-sm font-medium text-zinc-200 md:text-base">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <div
              ref={socialCardRef}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-7"
            >
              <p className="mb-4 text-sm text-zinc-400">Find me elsewhere</p>
              <div className="flex flex-wrap gap-3">
                {socialItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="group inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                    >
                      <Icon size={16} className="text-zinc-400 transition group-hover:text-white" />
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* right */}
          <div
            ref={rightCardRef}
            className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-7"
          >
            <form className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">Full name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-600 focus:border-white/20 focus:bg-white/[0.06]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-600 focus:border-white/20 focus:bg-white/[0.06]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">Subject</label>
                <input
                  type="text"
                  placeholder="What is this about?"
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-600 focus:border-white/20 focus:bg-white/[0.06]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">Message</label>
                <textarea
                  rows={6}
                  placeholder="Tell me a bit about your project..."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-600 focus:border-white/20 focus:bg-white/[0.06]"
                />
              </div>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-zinc-500">Usually replies within a day.</p>
                <button
                  type="submit"
                  className="
                    group inline-flex items-center justify-center gap-2
                    rounded-2xl border border-purple-300/20 bg-purple-500/20
                    px-6 py-3.5 font-medium text-white backdrop-blur-sm
                    transition-all duration-300
                    hover:-translate-y-0.5 hover:border-purple-300/40
                    hover:bg-purple-500/30 hover:shadow-lg hover:shadow-purple-500/15
                  "
                >
                  Send message
                  <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}