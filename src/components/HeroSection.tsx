"use client";

import { Lang, translations } from "@/lib/translations";

interface HeroSectionProps {
  lang: Lang;
}

export default function HeroSection({ lang }: HeroSectionProps) {
  const t = translations[lang].hero;

  return (
    <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#1a0a1a] via-[#2a1a2a] to-[#1a0a1a]">
      {/* Animated background */}
      <div className="hero-bg-effect" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-center bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent tracking-tight mb-6 glow-pulse">
          {t.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 text-center mb-10 max-w-2xl leading-relaxed">
          {t.subtitle}
        </p>
        <a
          href="#projects"
          className="cta-button px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-fuchsia-500 rounded-full shadow-[0_4px_20px_rgba(138,43,226,0.4)] hover:shadow-[0_6px_30px_rgba(255,0,255,0.6)] hover:-translate-y-0.5 transition-all duration-300"
        >
          {t.cta}
        </a>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-fuchsia-600/10 rounded-full blur-3xl" />
    </section>
  );
}
