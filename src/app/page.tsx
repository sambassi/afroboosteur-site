"use client";

import { useState } from "react";
import { Lang } from "@/lib/translations";
import ScrollProgress from "@/components/public/ScrollProgress";
import Navbar from "@/components/public/Navbar";
import HeroSection from "@/components/public/HeroSection";
import ProjectsSection from "@/components/public/ProjectsSection";
import AboutSection from "@/components/public/AboutSection";
import DonateSection from "@/components/public/DonateSection";
import ContactSection from "@/components/public/ContactSection";
import Footer from "@/components/public/Footer";

export default function Home() {
  const [lang, setLang] = useState<Lang>("fr");

  return (
    <>
      <ScrollProgress />
      <Navbar lang={lang} onLangChange={setLang} />
      <main className="bg-gradient-to-br from-[#1a0a1a] via-[#2a1a2a] to-[#1a0a1a]">
        <HeroSection lang={lang} />
        <ProjectsSection lang={lang} />
        <AboutSection lang={lang} />
        <DonateSection lang={lang} />
        <ContactSection lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
