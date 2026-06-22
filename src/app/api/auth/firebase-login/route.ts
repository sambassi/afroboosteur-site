import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";
import { FB_SESSION_COOKIE, COOKIE_DOMAIN, adminEmails } from "@/lib/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EXPIRES_IN_MS = 14 * 24 * 60 * 60 * 1000; // 14 jours
const ALLOWED = [
  "https://formation.afroboosteur.com",
  "https://afroboosteur.com",
  "https://www.afroboosteur.com",
];
function cors(origin: string | null): Record<string, string> {
  const h: Record<string, string> = { Vary: "Origin" };
  if (origin && ALLOWED.includes(origin)) {
    h["Access-Control-Allow-Origin"] = origin;
    h["Access-Control-Allow-Credentials"] = "true";
    h["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    h["Access-Control-Allow-Headers"] = "Content-Type";
  }
  return h;
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, { status: 204, headers: cors(request.headers.get("origin")) });
}

export async function POST(request: Request) {
  const headers = cors(request.headers.get("origin"));
  let idToken: string;
  try {
    ({ idToken } = await request.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide" }, { status: 400, headers });
  }
  if (!idToken) {
    return NextResponse.json({ ok: false, error: "idToken manquant" }, { status: 400, headers });
  }
  try {
    const decoded = await adminAuth().verifyIdToken(idToken, true);
    const email = (decoded.email || "").toLowerCase();
    const allow = adminEmails();
    if (allow.length && !allow.includes(email)) {
      return NextResponse.json(
        { ok: false, error: "Compte non autorisé pour l'administration" },
        { status: 403, headers }
      );
    }
    const sessionCookie = await adminAuth().createSessionCookie(idToken, { expiresIn: EXPIRES_IN_MS });
    const res = NextResponse.json({ ok: true }, { headers });
    res.cookies.set(FB_SESSION_COOKIE, sessionCookie, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      domain: COOKIE_DOMAIN,
      maxAge: EXPIRES_IN_MS / 1000,
    });
    return res;
  } catch {
    return NextResponse.json({ ok: false, error: "Jeton Firebase invalide" }, { status: 401, headers });
  }
}
