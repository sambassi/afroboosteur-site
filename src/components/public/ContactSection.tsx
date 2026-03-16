"use client";

import { useState } from "react";
import { Lang, translations } from "@/lib/translations";

interface ContactSectionProps {
  lang: Lang;
}

export default function ContactSection({ lang }: ContactSectionProps) {
  const t = translations[lang].contact;
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="py-20 bg-[#1a0a1a]/50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 gradient-text">
          {t.sectionTitle}
        </h2>
        <p className="text-center text-gray-300 text-lg mb-12">
          {t.sectionSubtitle}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-[#2a1a2a]/50 p-8 rounded-2xl border border-purple-500/30">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 font-semibold mb-2">{t.name}</label>
                <input
                  type="text"
                  required
                  placeholder={t.namePlaceholder}
                  className="w-full px-5 py-3.5 text-white bg-[#1a0a1a]/60 border-2 border-purple-500/40 rounded-xl outline-none transition-all duration-300 focus:border-fuchsia-500 focus:shadow-[0_0_25px_rgba(255,0,255,0.4)] placeholder:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2">{t.email}</label>
                <input
                  type="email"
                  required
                  placeholder={t.emailPlaceholder}
                  className="w-full px-5 py-3.5 text-white bg-[#1a0a1a]/60 border-2 border-purple-500/40 rounded-xl outline-none transition-all duration-300 focus:border-fuchsia-500 focus:shadow-[0_0_25px_rgba(255,0,255,0.4)] placeholder:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2">{t.message}</label>
                <textarea
                  required
                  rows={5}
                  placeholder={t.messagePlaceholder}
                  className="w-full px-5 py-3.5 text-white bg-[#1a0a1a]/60 border-2 border-purple-500/40 rounded-xl outline-none transition-all duration-300 focus:border-fuchsia-500 focus:shadow-[0_0_25px_rgba(255,0,255,0.4)] placeholder:text-gray-500 resize-y font-[inherit]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-fuchsia-500 rounded-xl shadow-[0_4px_20px_rgba(138,43,226,0.4)] hover:-translate-y-0.5 hover:shadow-[0_6px_30px_rgba(255,0,255,0.6)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{sent ? (lang === "fr" ? "Message envoy\u00e9 !" : "Message sent!") : t.send}</span>
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex items-start gap-5 p-6 bg-[#2a1a2a]/50 rounded-xl border border-purple-500/30 transition-all duration-300 hover:border-fuchsia-500 hover:shadow-[0_8px_30px_rgba(138,43,226,0.3)] hover:-translate-y-1">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-600/30 to-fuchsia-500/30 rounded-xl text-fuchsia-500 shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{t.infoEmail}</h3>
                <p className="text-gray-300">contact.artboost@gmail.com</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-5 p-6 bg-[#2a1a2a]/50 rounded-xl border border-purple-500/30 transition-all duration-300 hover:border-fuchsia-500 hover:shadow-[0_8px_30px_rgba(138,43,226,0.3)] hover:-translate-y-1">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-600/30 to-fuchsia-500/30 rounded-xl text-fuchsia-500 shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{t.infoAddress}</h3>
                <p className="text-gray-300">Rue Maillefer 39, 2000 Neuch\u00e2tel, Suisse</p>
              </div>
            </div>

            {/* Phone / WhatsApp */}
            <div className="flex items-start gap-5 p-6 bg-[#2a1a2a]/50 rounded-xl border border-purple-500/30 transition-all duration-300 hover:border-fuchsia-500 hover:shadow-[0_8px_30px_rgba(138,43,226,0.3)] hover:-translate-y-1">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-600/30 to-fuchsia-500/30 rounded-xl text-fuchsia-500 shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{t.infoWhatsapp}</h3>
                <p className="text-gray-300">+41 76 520 33 63</p>
              </div>
            </div>

            {/* IDE Number */}
            <div className="flex items-start gap-5 p-6 bg-[#2a1a2a]/50 rounded-xl border border-purple-500/30 transition-all duration-300 hover:border-fuchsia-500 hover:shadow-[0_8px_30px_rgba(138,43,226,0.3)] hover:-translate-y-1">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-600/30 to-fuchsia-500/30 rounded-xl text-fuchsia-500 shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">N\u00b0 IDE</h3>
                <p className="text-gray-300">CHE-407.097.646</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
