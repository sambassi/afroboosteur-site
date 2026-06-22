import { NextResponse } from "next/server";
import { FB_SESSION_COOKIE, COOKIE_DOMAIN } from "@/lib/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
  const res = NextResponse.json({ ok: true }, { headers });
  res.cookies.set(FB_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    domain: COOKIE_DOMAIN,
    maxAge: 0,
  });
  return res;
}
