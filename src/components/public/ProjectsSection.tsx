"use client";

import { Lang, translations, projectsData } from "@/lib/translations";

interface ProjectsSectionProps {
  lang: Lang;
}

function ProjectCard({
  project,
  lang,
  index,
}: {
  project: (typeof projectsData)[0];
  lang: Lang;
  index: number;
}) {
  const t = translations[lang].projects;
  const percentage = Math.round((project.funded / project.goal) * 100);

  // SVG patterns for each card
  const svgPatterns = [
    <svg key="1" viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8a2be2" />
          <stop offset="50%" stopColor="#ff00ff" />
          <stop offset="100%" stopColor="#e91e63" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#grad-${index})`} opacity="0.3" />
      <circle cx="150" cy="150" r="80" fill={`url(#grad-${index})`} opacity="0.6" />
      <rect x="200" y="100" width="120" height="120" fill="#ff00ff" opacity="0.4" transform="rotate(45 260 160)" />
    </svg>,
    <svg key="2" viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff00ff" />
          <stop offset="100%" stopColor="#8a2be2" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#grad-${index})`} opacity="0.3" />
      <path d="M50,250 Q150,50 250,200 T400,150" stroke="#ff00ff" strokeWidth="6" fill="none" opacity="0.7" />
      <circle cx="250" cy="100" r="50" fill="#8a2be2" opacity="0.6" />
    </svg>,
    <svg key="3" viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e91e63" />
          <stop offset="100%" stopColor="#8a2be2" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#grad-${index})`} opacity="0.3" />
      <polygon points="200,50 350,250 50,250" fill="#ff00ff" opacity="0.5" />
      <circle cx="200" cy="180" r="60" fill="#8a2be2" opacity="0.6" />
    </svg>,
  ];

  return (
    <div className="group bg-[#2a1a2a]/50 rounded-2xl overflow-hidden border border-purple-500/30 transition-all duration-400 hover:-translate-y-2 hover:border-fuchsia-500 hover:shadow-[0_12px_40px_rgba(255,0,255,0.4)]">
      {/* Image */}
      <div className="w-full h-52 overflow-hidden bg-[#1a0a1a]/80">
        {svgPatterns[index % 3]}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3">
          {project.title[lang]}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-5">
          {project.description[lang]}
        </p>

        {/* Funding progress */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-400 text-sm font-semibold">{t.funded}</span>
            <span className="text-white font-bold text-sm">
              {project.funded.toLocaleString("fr-CH")} CHF /{" "}
              {project.goal.toLocaleString("fr-CH")} CHF
            </span>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection({ lang }: ProjectsSectionProps) {
  const t = translations[lang].projects;

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 gradient-text">
          {t.sectionTitle}
        </h2>
        <p className="text-center text-gray-300 text-lg mb-12">
          {t.sectionSubtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              lang={lang}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
