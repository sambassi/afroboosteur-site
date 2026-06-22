import "server-only";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";

// Renvoie l'admin courant, ou une réponse 401 à retourner tel quel.
export async function admin(): Promise<
  { ok: true; email: string | null } | { ok: false; res: NextResponse }
> {
  const user = await requireAdmin();
  if (!user) {
    return {
      ok: false,
      res: NextResponse.json({ error: "Accès administrateur requis" }, { status: 401 }),
    };
  }
  return { ok: true, email: user.email };
}
