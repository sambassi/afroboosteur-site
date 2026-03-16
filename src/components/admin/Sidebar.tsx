"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  Landmark,
  Calculator,
  Users,
  Settings,
  Download,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    label: "Tableau de bord",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Projets",
    href: "/admin/projects",
    icon: FolderOpen,
  },
  {
    label: "Subventions",
    href: "/admin/subsidies",
    icon: Landmark,
  },
  {
    label: "Documents",
    href: "/admin/documents",
    icon: FileText,
  },
  {
    label: "Budget & Finance",
    href: "/admin/budget",
    icon: Calculator,
  },
  {
    label: "Équipe & Membres",
    href: "/admin/members",
    icon: Users,
  },
  {
    label: "Paramètres",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[#0f0520]/95 backdrop-blur-xl border-r border-[#8a2be2]/20 flex flex-col transition-all duration-300 z-40 ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-[#8a2be2]/20">
        {!collapsed && (
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] flex items-center justify-center text-sm font-bold">
              A
            </div>
            <span className="font-bold text-lg gradient-text">
              Afroboosteur
            </span>
          </Link>
        )}
        {collapsed && (
          <Link href="/admin/dashboard" className="mx-auto">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] flex items-center justify-center text-sm font-bold">
              A
            </div>
          </Link>
        )}
      </div>

      {/* Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#2a1a2a] border border-[#8a2be2]/30 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#8a2be2] transition-colors z-50"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-[#8a2be2]/20 to-[#ff00ff]/10 text-white border border-[#8a2be2]/30"
                  : "text-gray-400 hover:text-white hover:bg-[#8a2be2]/10"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon
                size={20}
                className={
                  isActive
                    ? "text-[#ff00ff]"
                    : "text-gray-500 group-hover:text-[#8a2be2]"
                }
              />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Export PDF button */}
      <div className="px-3 pb-2">
        <button
          className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] text-white font-medium text-sm hover:opacity-90 transition-opacity ${
            collapsed ? "px-2" : ""
          }`}
          title="Télécharger PDF"
        >
          <Download size={18} />
          {!collapsed && <span>Télécharger PDF</span>}
        </button>
      </div>

      {/* Logout */}
      <div className="px-3 pb-4 pt-2 border-t border-[#8a2be2]/20">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all ${
            collapsed ? "justify-center" : ""
          }`}
          title="Déconnexion"
        >
          <LogOut size={20} />
          {!collapsed && <span className="text-sm font-medium">Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
}
