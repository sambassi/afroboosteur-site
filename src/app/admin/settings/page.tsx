"use client";

import { Settings, Building2, Globe, Palette, Shield, Bell } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Paramètres</h1>
        <p className="text-gray-400 mt-1">
          Configuration de l&apos;association et de la plateforme
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Association Info */}
        <div className="bg-[#2a1a2a]/50 backdrop-blur-sm border border-[#8a2be2]/20 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#8a2be2]/20 flex items-center justify-center">
              <Building2 size={20} className="text-[#8a2be2]" />
            </div>
            <h2 className="text-lg font-semibold">Association</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Nom</label>
              <p className="text-sm text-white">Association Afroboosteur</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">IDE</label>
              <p className="text-sm text-white">CHE-407.097.646</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Adresse</label>
              <p className="text-sm text-white">Rue Maillefer 39, 2000 Neuchâtel, Suisse</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Contact</label>
              <p className="text-sm text-white">+41 76 520 33 63</p>
            </div>
          </div>
        </div>

        {/* Site Settings */}
        <div className="bg-[#2a1a2a]/50 backdrop-blur-sm border border-[#8a2be2]/20 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#ff00ff]/20 flex items-center justify-center">
              <Globe size={20} className="text-[#ff00ff]" />
            </div>
            <h2 className="text-lg font-semibold">Site web</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Domaine</label>
              <p className="text-sm text-white">afroboosteur.com</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Hébergement</label>
              <p className="text-sm text-white">Vercel (fra1)</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Base de données</label>
              <p className="text-sm text-white">Supabase (PostgreSQL)</p>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-[#2a1a2a]/50 backdrop-blur-sm border border-[#8a2be2]/20 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <Shield size={20} className="text-emerald-400" />
            </div>
            <h2 className="text-lg font-semibold">Sécurité</h2>
          </div>
          <div className="space-y-3 text-sm text-gray-400">
            <p>Authentification Supabase avec protection des routes admin via middleware.</p>
            <p>Row Level Security (RLS) activée sur toutes les tables.</p>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-[#2a1a2a]/50 backdrop-blur-sm border border-[#8a2be2]/20 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <Bell size={20} className="text-orange-400" />
            </div>
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          <div className="space-y-3 text-sm text-gray-400">
            <p>Les notifications par email seront configurées avec Resend dans une prochaine phase.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
