import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/admin";
import { FB_SESSION_COOKIE, adminEmails } from "@/lib/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EXPIRES_IN_MS = 14 * 24 * 60 * 60 * 1000; // 14 jours

export async function POST(request: Request) {
  let idToken: string;
  try {
    ({ idToken } = await request.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide" }, { status: 400 });
  }
  if (!idToken) {
    return NextResponse.json({ ok: false, error: "idToken manquant" }, { status: 400 });
  }
  try {
    const decoded = await adminAuth().verifyIdToken(idToken, true);
    const email = (decoded.email || "").toLowerCase();
    const allow = adminEmails();
    if (allow.length && !allow.includes(email)) {
      return NextResponse.json(
        { ok: false, error: "Compte non autorisé pour l'administration" },
        { status: 403 }
      );
    }
    const sessionCookie = await adminAuth().createSessionCookie(idToken, {
      expiresIn: EXPIRES_IN_MS,
    });
    (await cookies()).set(FB_SESSION_COOKIE, sessionCookie, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: EXPIRES_IN_MS / 1000,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Jeton Firebase invalide" }, { status: 401 });
  }
}
