import "server-only";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/admin";
import { createClient } from "@/lib/supabase/server";

export const FB_SESSION_COOKIE = "fb_session";

export function adminEmails(): string[] {
  return (process.env.FIREBASE_ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export type CurrentUser = { email: string | null; source: "firebase" | "supabase" };

// Retourne l'utilisateur admin courant via le cookie de session Firebase,
// sinon via la session Supabase (transition non destructive). null si aucun.
export async function getCurrentUser(): Promise<CurrentUser | null> {
  // 1) Firebase (cookie de session)
  try {
    const cookie = (await cookies()).get(FB_SESSION_COOKIE)?.value;
    if (cookie) {
      const decoded = await adminAuth().verifySessionCookie(cookie, true);
      const email = (decoded.email || "").toLowerCase();
      const allow = adminEmails();
      if (!allow.length || allow.includes(email)) {
        return { email: decoded.email ?? null, source: "firebase" };
      }
    }
  } catch {
    /* cookie absent/invalide -> on tente Supabase */
  }
  // 2) Supabase (existant)
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) return { email: user.email ?? null, source: "supabase" };
  } catch {
    /* ignore */
  }
  return null;
}

// Admin strict : l'utilisateur courant dont l'email figure dans ADMIN_EMAILS.
// (Firebase est déjà filtré par getCurrentUser ; ceci sécurise aussi la voie Supabase.)
export async function requireAdmin(): Promise<CurrentUser | null> {
  const user = await getCurrentUser();
  if (!user) return null;
  const allow = adminEmails();
  if (allow.length && !(user.email && allow.includes(user.email.toLowerCase()))) {
    return null;
  }
  return user;
}
