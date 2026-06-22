import { redirect } from "next/navigation";

// Inscription publique désactivée pour des raisons de sécurité.
// L'accès à l'administration se fait uniquement via /login ; les comptes
// administrateurs sont créés directement côté Supabase par un administrateur.
export default function RegisterPage() {
  redirect("/login");
}
