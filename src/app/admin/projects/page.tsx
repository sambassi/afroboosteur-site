"use client";

import { FolderOpen, Plus, Search, Filter } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projets</h1>
          <p className="text-gray-400 mt-1">
            Gérez les projets de l&apos;association
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus size={18} />
          Nouveau projet
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Rechercher un projet..."
            className="w-full bg-[#1a0a1a] border border-[#8a2be2]/20 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#8a2be2] focus:outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#2a1a2a] border border-[#8a2be2]/20 rounded-lg text-sm text-gray-400 hover:text-white hover:border-[#8a2be2]/40 transition-colors">
          <Filter size={16} />
          Filtrer
        </button>
      </div>

      {/* Empty State */}
      <div className="bg-[#2a1a2a]/50 backdrop-blur-sm border border-[#8a2be2]/20 rounded-2xl p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#8a2be2]/20 flex items-center justify-center mx-auto mb-4">
          <FolderOpen size={28} className="text-[#8a2be2]" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Aucun projet pour l&apos;instant</h3>
        <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
          Créez votre premier projet pour commencer à gérer les activités de l&apos;association et générer des dossiers de subvention.
        </p>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] rounded-xl font-medium hover:opacity-90 transition-opacity">
          <Plus size={18} />
          Créer un projet
        </button>
      </div>
    </div>
  );
}
