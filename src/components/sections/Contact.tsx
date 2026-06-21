// src/components/sections/Contact.tsx
"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { Mail, MapPin, Phone, Send, Globe, User } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useApp } from "@/context/AppContext";

gsap.registerPlugin(ScrollTrigger);

const content = {
  en: {
    label: "Contact",
    heading: "Let's talk about your next project.",
    sub: "Have an idea, need help, or just want to say hello? Send me a message — I usually reply as soon as possible.",
    openFor: "Open for",
    openForDesc: "Freelance, collaboration, and new ideas",
    findMe: "Find me elsewhere",
    fields: {
      name: "Full name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@example.com",
      subject: "Subject",
      subjectPlaceholder: "What is this about?",
      message: "Message",
      messagePlaceholder: "Tell me a bit about your project...",
      reply: "Usually replies within a day.",
      send: "Send message",
    },
    contactItems: [
      { label: "Email",    value: "ajunf2@gmail.com",           href: "mailto:ajunf2@gmail.com",     icon: Mail   },
      { label: "Phone",    value: "+62 857 7315 3585",           href: "https://wa.me/6285773153585", icon: Phone  },
      { label: "Location", value: "Indonesia, South Jakarta",    href: "#",                           icon: MapPin },
    ],
    socialItems: [
      { label: "Website", href: "#", icon: Globe },
      { label: "Profile", href: "#", icon: User  },
    ],
  },
  id: {
    label: "Kontak",
    heading: "Ayo ngobrol soal proyek kamu berikutnya.",
    sub: "Punya ide, butuh bantuan, atau cuma mau say hello? Kirim pesan aja — saya biasanya balas secepatnya.",
    openFor: "Terbuka untuk",
    openForDesc: "Freelance, kolaborasi, dan ide baru",
    findMe: "Temukan saya di",
    fields: {
      name: "Nama lengkap",
      namePlaceholder: "Nama kamu",
      email: "Email",
      emailPlaceholder: "kamu@contoh.com",
      subject: "Subjek",
      subjectPlaceholder: "Ini tentang apa?",
      message: "Pesan",
      messagePlaceholder: "Ceritakan sedikit tentang proyekmu...",
      reply: "Biasanya membalas dalam sehari.",
      send: "Kirim pesan",
    },
    contactItems: [
      { label: "Email",    value: "ajunf2@gmail.com",            href: "mailto:ajunf2@gmail.com",     icon: Mail   },
      { label: "Telepon",  value: "+62 857 7315 3585",           href: "https://wa.me/6285773153585", icon: Phone  },
      { label: "Lokasi",   value: "Indonesia, Jakarta Selatan",  href: "#",                           icon: MapPin },
    ],
    socialItems: [
      { label: "Website", href: "#", icon: Globe },
      { label: "Profil",  href: "#", icon: User  },
    ],
  },
};

export default function Contact() {
  const { language, theme } = useApp();
  const t = content[language];
  const isLight = theme === "light";

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

      gsap.set(label,      { autoAlpha: 0, x: isMobile ? -28 : -44, y: isMobile ? 12 : 16,  willChange: "transform, opacity" });
      gsap.set(heading,    { autoAlpha: 0, x: isMobile ? 0  :  36,  y: isMobile ? 32 : 48,  scale: isMobile ? 0.95 : 0.93, transformOrigin: "left bottom", willChange: "transform, opacity" });
      gsap.set(sub,        { autoAlpha: 0, x: isMobile ? -18 : -30, y: isMobile ? 10 : 14,  willChange: "transform, opacity" });
      gsap.set(leftCard,   { autoAlpha: 0, x: isMobile ? -24 : -52, y: isMobile ? 40 : 60,  rotation: isMobile ? 0 : -2,   transformOrigin: "left bottom",  willChange: "transform, opacity" });
      gsap.set(socialCard, { autoAlpha: 0, x: isMobile ? -18 : -40, y: isMobile ? 30 : 44,  rotation: isMobile ? 0 : -1.5, transformOrigin: "left bottom",  willChange: "transform, opacity" });
      gsap.set(rightCard,  { autoAlpha: 0, x: isMobile ? 24  :  52, y: isMobile ? 40 : 60,  rotation: isMobile ? 0 :  2,   transformOrigin: "right bottom", willChange: "transform, opacity" });

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
        .to(label,      { autoAlpha: 1, x: 0, y: 0,                duration: 0.14 }, 0.00)
        .to(heading,    { autoAlpha: 1, x: 0, y: 0, scale: 1,      duration: 0.18 }, 0.08)
        .to(sub,        { autoAlpha: 1, x: 0, y: 0,                duration: 0.14 }, 0.20)
        .to(leftCard,   { autoAlpha: 1, x: 0, y: 0, rotation: 0,   duration: 0.18 }, 0.30)
        .to(rightCard,  { autoAlpha: 1, x: 0, y: 0, rotation: 0,   duration: 0.20 }, 0.36)
        .to(socialCard, { autoAlpha: 1, x: 0, y: 0, rotation: 0,   duration: 0.16 }, 0.42);

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  // ── Theme classes ──────────────────────────────────────────────────────
  const sectionBg     = isLight ? "bg-gray-50 text-zinc-900"  : "bg-black text-white";
  const labelColor    = isLight ? "text-black/50"              : "text-white/70";
  const headingColor  = isLight ? "text-zinc-900"              : "text-white";
  const subColor      = isLight ? "text-zinc-500"              : "text-zinc-400";
  const cardBg        = isLight
    ? "rounded-[28px] border border-black/10 bg-white/80 p-6 backdrop-blur-xl md:p-7"
    : "rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-7";
  const contactRowBg  = isLight
    ? "border border-black/8 bg-black/[0.03] hover:border-black/15 hover:bg-black/[0.06]"
    : "border border-white/5 bg-black/20 hover:border-white/15 hover:bg-white/[0.06]";
  const contactIcon   = isLight ? "bg-black/5 text-zinc-500 group-hover:text-zinc-900"   : "bg-white/8 text-zinc-300 group-hover:text-white";
  const contactLabel  = isLight ? "text-zinc-400"  : "text-zinc-500";
  const contactValue  = isLight ? "text-zinc-700"  : "text-zinc-200";
  const socialRowBg   = isLight
    ? "border border-black/10 bg-black/[0.03] text-zinc-600 hover:border-black/20 hover:bg-black/[0.07] hover:text-zinc-900"
    : "border border-white/10 bg-black/20 text-zinc-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white";
  const socialIconColor = isLight ? "text-zinc-400 group-hover:text-zinc-900" : "text-zinc-400 group-hover:text-white";
  const openForSub    = isLight ? "text-zinc-400"  : "text-zinc-400";
  const openForTitle  = isLight ? "text-zinc-800"  : "text-white";
  const findMeColor   = isLight ? "text-zinc-400"  : "text-zinc-400";
  const inputClass    = isLight
    ? "w-full rounded-2xl border border-black/10 bg-black/[0.03] px-4 py-3.5 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-black/20 focus:bg-black/[0.06]"
    : "w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-600 focus:border-white/20 focus:bg-white/[0.06]";
  const inputLabel    = isLight ? "mb-2 block text-sm text-zinc-500" : "mb-2 block text-sm text-zinc-400";
  const replyColor    = isLight ? "text-zinc-400"  : "text-zinc-500";
  const avatarBox     = isLight ? "h-10 w-10 rounded-2xl bg-black/10" : "h-10 w-10 rounded-2xl bg-white/10";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative overflow-hidden px-6 py-24 transition-colors duration-300 ${sectionBg}`}
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-12 max-w-2xl">
          <p ref={labelRef} className={`tracking-[0.35em] text-xs md:text-sm uppercase font-medium ${labelColor}`}>
            {t.label}
          </p>
          <h2 ref={headingRef} className={`mt-6 text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight ${headingColor}`}>
            {t.heading}
          </h2>
          <p ref={subRef} className={`mt-4 max-w-xl text-sm leading-7 md:text-base ${subColor}`}>
            {t.sub}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Left */}
          <div className="space-y-6">
            <div ref={leftCardRef} className={cardBg}>
              <div className="mb-6 flex items-center gap-3">
                <div className={avatarBox} />
                <div>
                  <p className={`text-sm ${openForSub}`}>{t.openFor}</p>
                  <p className={`font-medium ${openForTitle}`}>{t.openForDesc}</p>
                </div>
              </div>

              <div className="space-y-4">
                {t.contactItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className={`group flex items-center gap-4 rounded-2xl px-4 py-4 transition ${contactRowBg}`}
                    >
                      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl transition ${contactIcon}`}>
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className={`text-xs uppercase tracking-[0.2em] ${contactLabel}`}>{item.label}</p>
                        <p className={`truncate text-sm font-medium md:text-base ${contactValue}`}>{item.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <div ref={socialCardRef} className={cardBg}>
              <p className={`mb-4 text-sm ${findMeColor}`}>{t.findMe}</p>
              <div className="flex flex-wrap gap-3">
                {t.socialItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className={`group inline-flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${socialRowBg}`}
                    >
                      <Icon size={16} className={`transition ${socialIconColor}`} />
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div ref={rightCardRef} className={cardBg}>
            <form className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className={inputLabel}>{t.fields.name}</label>
                  <input type="text" placeholder={t.fields.namePlaceholder} className={inputClass} />
                </div>
                <div>
                  <label className={inputLabel}>{t.fields.email}</label>
                  <input type="email" placeholder={t.fields.emailPlaceholder} className={inputClass} />
                </div>
              </div>

              <div>
                <label className={inputLabel}>{t.fields.subject}</label>
                <input type="text" placeholder={t.fields.subjectPlaceholder} className={inputClass} />
              </div>

              <div>
                <label className={inputLabel}>{t.fields.message}</label>
                <textarea rows={6} placeholder={t.fields.messagePlaceholder} className={`resize-none ${inputClass}`} />
              </div>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <p className={`text-sm ${replyColor}`}>{t.fields.reply}</p>
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
                  {t.fields.send}
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