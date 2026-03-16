"use client";

import { Users, Plus, Search } from "lucide-react";

export default function MembersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Équipe & Membres</h1>
          <p className="text-gray-400 mt-1">
            Gérez les membres et les rôles de l&apos;association
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus size={18} />
          Inviter un membre
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input
          type="text"
          placeholder="Rechercher un membre..."
          className="w-full bg-[#1a0a1a] border border-[#8a2be2]/20 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#8a2be2] focus:outline-none"
        />
      </div>

      {/* Current president card */}
      <div className="bg-[#2a1a2a]/50 backdrop-blur-sm border border-[#8a2be2]/20 rounded-2xl p-5">
        <h2 className="text-lg font-semibold mb-4">Membres actuels</h2>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-[#1a0a1a]/50 border border-[#8a2be2]/10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] flex items-center justify-center text-lg font-bold">
            MB
          </div>
          <div className="flex-1">
            <p className="font-medium">Monsieur Bassi</p>
            <p className="text-sm text-gray-400">Président</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#8a2be2]/20 text-[#8a2be2] border border-[#8a2be2]/30">
            Admin
          </span>
        </div>
      </div>

      <div className="bg-[#2a1a2a]/50 backdrop-blur-sm border border-[#8a2be2]/20 rounded-2xl p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#8a2be2]/20 flex items-center justify-center mx-auto mb-4">
          <Users size={28} className="text-[#8a2be2]" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Invitez votre équipe</h3>
        <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
          Ajoutez des membres avec différents rôles (éditeur, lecteur) pour collaborer sur les projets et documents de l&apos;association.
        </p>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] rounded-xl font-medium hover:opacity-90 transition-opacity">
          <Plus size={18} />
          Inviter un membre
        </button>
      </div>
    </div>
  );
}
