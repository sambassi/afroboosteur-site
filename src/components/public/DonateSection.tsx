"use client";

import { useState } from "react";
import { Lang, translations } from "@/lib/translations";

interface DonateSectionProps {
  lang: Lang;
}

export default function DonateSection({ lang }: DonateSectionProps) {
  const t = translations[lang].donate;
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const amounts = [10, 20, 50];

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount || 0;

  return (
    <section id="donate" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 gradient-text">
          {t.sectionTitle}
        </h2>
        <p className="text-center text-gray-300 text-lg mb-12">
          {t.sectionSubtitle}
        </p>

        <div className="max-w-xl mx-auto p-8 md:p-10 bg-[#2a1a2a]/50 rounded-2xl border border-purple-500/30">
          <h3 className="text-xl font-bold text-white text-center mb-6">
            {t.chooseAmount}
          </h3>

          {/* Amount buttons */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {amounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handleAmountClick(amount)}
                className={`py-4 text-2xl font-bold text-white rounded-xl transition-all duration-300 cursor-pointer ${
                  selectedAmount === amount
                    ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 border-fuchsia-500 shadow-[0_0_25px_rgba(255,0,255,0.6)]"
                    : "bg-gradient-to-r from-purple-600/30 to-fuchsia-500/30 border-2 border-purple-500/50 hover:from-purple-600 hover:to-fuchsia-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,0,255,0.5)]"
                }`}
              >
                {amount} CHF
              </button>
            ))}
          </div>

          {/* Custom amount */}
          <div className="mb-8">
            <label className="block text-center text-gray-300 font-semibold mb-3">
              {t.customAmount}
            </label>
            <div className="relative">
              <input
                type="number"
                value={customAmount}
                onChange={(e) => handleCustomChange(e.target.value)}
                placeholder="Montant"
                min="1"
                className="w-full px-5 py-4 pr-16 text-xl font-semibold text-white bg-[#1a0a1a]/60 border-2 border-fuchsia-500/40 rounded-xl outline-none transition-all duration-300 focus:border-fuchsia-500 focus:shadow-[0_0_20px_rgba(255,0,255,0.3)]"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xl font-bold text-fuchsia-500">
                CHF
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={() => {
              if (finalAmount > 0) {
                alert(
                  lang === "fr"
                    ? `Merci pour votre don de ${finalAmount} CHF ! (Le paiement sera int\u00e9gr\u00e9 prochainement)`
                    : `Thank you for your donation of ${finalAmount} CHF! (Payment will be integrated soon)`
                );
              }
            }}
            className="w-full py-4 text-xl font-bold text-white bg-gradient-to-r from-purple-600 to-fuchsia-500 rounded-xl shadow-[0_4px_20px_rgba(138,43,226,0.4)] hover:-translate-y-0.5 hover:shadow-[0_6px_30px_rgba(255,0,255,0.6)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t.submit}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <p className="text-center text-gray-400 text-sm mt-5 font-medium">
            {t.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
