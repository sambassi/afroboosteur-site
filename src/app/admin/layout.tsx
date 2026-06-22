import { redirect } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import TopBar from "@/components/admin/TopBar";
import { getCurrentUser } from "@/lib/auth/session";

export const metadata = {
  title: "Admin - Afroboosteur",
  description: "Plateforme d'administration Association Afroboosteur",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Garde d'accès serveur : session Firebase OU session Supabase (transition).
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0a1a] via-[#0f0520] to-[#1a0a1a] text-white">
      <Sidebar />
      <div className="ml-[260px] transition-all duration-300">
        <TopBar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
