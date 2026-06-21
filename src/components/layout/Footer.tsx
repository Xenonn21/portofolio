"use client";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute bottom-[-140px] right-[-140px] h-[320px] w-[320px] rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14">
        {/* TOP */}
        <div className="flex flex-col gap-10 border-b border-white/10 pb-10 lg:flex-row lg:items-center lg:justify-between">
          {/* BRAND */}
          <div className="max-w-xl">
            <h2 className="text-3xl font-black tracking-tight">
              YourName.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              Crafting modern, responsive, and high-performance
              digital experiences with clean design and smooth user
              interaction.
            </p>
          </div>

          {/* NAVIGATION */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#home"
              className="
                rounded-2xl border border-white/10
                bg-white/5 px-5 py-3 text-sm
                text-zinc-300 transition-all duration-300
                hover:-translate-y-1
                hover:border-cyan-400
                hover:bg-cyan-500/10
                hover:text-cyan-400
              "
            >
              Home
            </a>

            <a
              href="#about"
              className="
                rounded-2xl border border-white/10
                bg-white/5 px-5 py-3 text-sm
                text-zinc-300 transition-all duration-300
                hover:-translate-y-1
                hover:border-cyan-400
                hover:bg-cyan-500/10
                hover:text-cyan-400
              "
            >
              About
            </a>

            <a
              href="#skills"
              className="
                rounded-2xl border border-white/10
                bg-white/5 px-5 py-3 text-sm
                text-zinc-300 transition-all duration-300
                hover:-translate-y-1
                hover:border-cyan-400
                hover:bg-cyan-500/10
                hover:text-cyan-400
              "
            >
              Skills
            </a>

            <a
              href="#works"
              className="
                rounded-2xl border border-white/10
                bg-white/5 px-5 py-3 text-sm
                text-zinc-300 transition-all duration-300
                hover:-translate-y-1
                hover:border-cyan-400
                hover:bg-cyan-500/10
                hover:text-cyan-400
              "
            >
              Works
            </a>

            <a
              href="#contact"
              className="
                rounded-2xl border border-white/10
                bg-white/5 px-5 py-3 text-sm
                text-zinc-300 transition-all duration-300
                hover:-translate-y-1
                hover:border-cyan-400
                hover:bg-cyan-500/10
                hover:text-cyan-400
              "
            >
              Contact
            </a>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-8 flex flex-col gap-4 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 YourName. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="#"
              className="
                transition-colors duration-300
                hover:text-cyan-400
              "
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="
                transition-colors duration-300
                hover:text-cyan-400
              "
            >
              Terms
            </a>

            <a
              href="#"
              className="
                transition-colors duration-300
                hover:text-cyan-400
              "
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}