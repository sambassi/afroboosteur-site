"use client";

import { Calculator, Plus, Download } from "lucide-react";

export default function BudgetPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Budget & Finance</h1>
          <p className="text-gray-400 mt-1">
            Gérez les budgets prévisionnels de vos projets
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#2a1a2a] border border-[#8a2be2]/20 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:border-[#8a2be2]/40 transition-colors">
            <Download size={18} />
            Exporter Excel
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
            <Plus size={18} />
            Nouveau budget
          </button>
        </div>
      </div>

      <div className="bg-[#2a1a2a]/50 backdrop-blur-sm border border-[#8a2be2]/20 rounded-2xl p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
          <Calculator size={28} className="text-orange-400" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Aucun budget créé</h3>
        <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
          Créez des budgets détaillés avec charges et produits en CHF, visualisez les totaux en temps réel et exportez en format Excel.
        </p>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] rounded-xl font-medium hover:opacity-90 transition-opacity">
          <Plus size={18} />
          Créer un budget
        </button>
      </div>
    </div>
  );
}
