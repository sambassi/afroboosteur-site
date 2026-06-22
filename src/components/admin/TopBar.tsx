"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { createClient } from "@/lib/supabase/client";
import { Bell, Search, Menu } from "lucide-react";

export default function TopBar() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Firebase (prioritaire) puis Supabase (transition)
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u?.email) setEmail(u.email);
    });
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) setEmail((prev) => prev ?? data.user!.email!);
    });
    return () => unsub();
  }, []);

  const displayName = email?.split("@")[0] || "Administrateur";

  const initials = displayName
    .split(/[\s.]+/)
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="h-16 bg-[#0f0520]/80 backdrop-blur-xl border-b border-[#8a2be2]/20 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left: Page search */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full bg-[#1a0a1a] border border-[#8a2be2]/20 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:border-[#8a2be2] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Right: Notifications + User */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#8a2be2]/10 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#ff00ff]" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">{displayName}</p>
            <p className="text-xs text-gray-400">Administrateur</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] flex items-center justify-center text-sm font-bold text-white">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
