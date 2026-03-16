"use client";

import { Lang, translations } from "@/lib/translations";

interface AboutSectionProps {
  lang: Lang;
}

export default function AboutSection({ lang }: AboutSectionProps) {
  const t = translations[lang].about;

  return (
    <section id="about" className="py-20 bg-[#2a1a2a]/30">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
          {t.sectionTitle}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold mb-6 gradient-text">
              {t.missionTitle}
            </h3>
            <p className="text-gray-200 text-lg leading-relaxed mb-5">
              {t.missionText1}
            </p>
            <p className="text-gray-200 text-lg leading-relaxed mb-8">
              {t.missionText2}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-5 bg-purple-500/10 rounded-xl border border-purple-500/30 transition-all duration-300 hover:bg-purple-500/20 hover:border-fuchsia-500 hover:-translate-y-1">
                <div className="text-3xl font-black gradient-text mb-1">40+</div>
                <div className="text-gray-300 text-sm font-semibold">
                  {t.stats.members}
                </div>
              </div>
              <div className="text-center p-5 bg-purple-500/10 rounded-xl border border-purple-500/30 transition-all duration-300 hover:bg-purple-500/20 hover:border-fuchsia-500 hover:-translate-y-1">
                <div className="text-3xl font-black gradient-text mb-1">12</div>
                <div className="text-gray-300 text-sm font-semibold">
                  {t.stats.volunteers}
                </div>
              </div>
              <div className="text-center p-5 bg-purple-500/10 rounded-xl border border-purple-500/30 transition-all duration-300 hover:bg-purple-500/20 hover:border-fuchsia-500 hover:-translate-y-1">
                <div className="text-3xl font-black gradient-text mb-1">2024</div>
                <div className="text-gray-300 text-sm font-semibold">
                  {t.stats.founded}
                </div>
              </div>
            </div>
          </div>

          {/* Visual SVG */}
          <div className="flex justify-center items-center">
            <svg viewBox="0 0 500 500" className="w-full max-w-md h-auto">
              <defs>
                <linearGradient id="aboutGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8a2be2" />
                  <stop offset="100%" stopColor="#ff00ff" />
                </linearGradient>
                <linearGradient id="aboutGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ff00ff" />
                  <stop offset="100%" stopColor="#e91e63" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <circle cx="250" cy="250" r="200" fill="url(#aboutGrad1)" opacity="0.2" filter="url(#glow)" />
              <circle cx="250" cy="250" r="150" fill="none" stroke="url(#aboutGrad2)" strokeWidth="3" opacity="0.6" />
              <path d="M250,100 L270,230 L400,250 L270,270 L250,400 L230,270 L100,250 L230,230 Z" fill="url(#aboutGrad1)" opacity="0.7" filter="url(#glow)" />
              <circle cx="150" cy="150" r="40" fill="#8a2be2" opacity="0.5" filter="url(#glow)" />
              <circle cx="350" cy="150" r="35" fill="#ff00ff" opacity="0.5" filter="url(#glow)" />
              <circle cx="150" cy="350" r="35" fill="#e91e63" opacity="0.5" filter="url(#glow)" />
              <circle cx="350" cy="350" r="40" fill="#8a2be2" opacity="0.5" filter="url(#glow)" />
              <circle cx="250" cy="250" r="50" fill="url(#aboutGrad2)" opacity="0.8" filter="url(#glow)" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
