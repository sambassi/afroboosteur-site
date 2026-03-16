"use client";

import { Landmark, Plus, Search, Filter } from "lucide-react";

export default function SubsidiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Subventions</h1>
          <p className="text-gray-400 mt-1">
            Gérez vos demandes de subvention
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus size={18} />
          Nouvelle demande
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Rechercher une subvention..."
            className="w-full bg-[#1a0a1a] border border-[#8a2be2]/20 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#8a2be2] focus:outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#2a1a2a] border border-[#8a2be2]/20 rounded-lg text-sm text-gray-400 hover:text-white hover:border-[#8a2be2]/40 transition-colors">
          <Filter size={16} />
          Filtrer
        </button>
      </div>

      <div className="bg-[#2a1a2a]/50 backdrop-blur-sm border border-[#8a2be2]/20 rounded-2xl p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#ff00ff]/20 flex items-center justify-center mx-auto mb-4">
          <Landmark size={28} className="text-[#ff00ff]" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Aucune demande de subvention</h3>
        <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
          Générez automatiquement des dossiers de subvention adaptés aux exigences de chaque organisme (ville, canton, fondation, confédération).
        </p>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] rounded-xl font-medium hover:opacity-90 transition-opacity">
          <Plus size={18} />
          Créer une demande
        </button>
      </div>
    </div>
  );
}
