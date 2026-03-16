"use client";

import { useState, useEffect } from "react";
import { Lang, translations } from "@/lib/translations";

interface NavbarProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

export default function Navbar({ lang, onLangChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#projects", label: t.projects },
    { href: "#about", label: t.about },
    { href: "#donate", label: t.donate },
    { href: "#contact", label: t.contact },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 border-b border-purple-500/20 ${
        scrolled
          ? "bg-[#1a0a1a]/95 shadow-[0_4px_20px_rgba(138,43,226,0.15)]"
          : "bg-[#1a0a1a]/85 backdrop-blur-xl"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <a
            href="#"
            className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent tracking-tight"
          >
            Afroboosteur
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-gray-200 font-medium rounded-lg transition-all duration-300 hover:text-white hover:bg-purple-500/10 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-300 -translate-x-1/2 group-hover:w-4/5" />
              </a>
            ))}
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => onLangChange("fr")}
                className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  lang === "fr"
                    ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white border-transparent"
                    : "bg-purple-500/10 border border-purple-500/40 text-gray-300 hover:bg-purple-500/20"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => onLangChange("en")}
                className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  lang === "en"
                    ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white border-transparent"
                    : "bg-purple-500/10 border border-purple-500/40 text-gray-300 hover:bg-purple-500/20"
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1 p-2 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span
              className={`w-6 h-0.5 bg-white rounded transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white rounded transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white rounded transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 border-t border-purple-500/20 ${
            mobileOpen ? "max-h-96 pb-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="w-full text-center px-4 py-3 text-gray-200 font-medium rounded-lg transition-all hover:bg-purple-500/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <div className="flex justify-center gap-3 pt-3">
              <button
                onClick={() => { onLangChange("fr"); setMobileOpen(false); }}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all cursor-pointer ${
                  lang === "fr"
                    ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white"
                    : "bg-purple-500/10 border border-purple-500/40 text-gray-300"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => { onLangChange("en"); setMobileOpen(false); }}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all cursor-pointer ${
                  lang === "en"
                    ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white"
                    : "bg-purple-500/10 border border-purple-500/40 text-gray-300"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
