import { NextResponse } from "next/server";
import { admin } from "@/lib/admin/guard";
import { listSubsidies, createSubsidy } from "@/lib/admin/store";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const a = await admin();
  if (!a.ok) return a.res;
  return NextResponse.json({ subsidies: await listSubsidies() });
}
export async function POST(req: Request) {
  const a = await admin();
  if (!a.ok) return a.res;
  const body = await req.json().catch(() => ({}));
  if (!String(body.target_org || "").trim())
    return NextResponse.json({ error: "L'organisme est requis" }, { status: 400 });
  return NextResponse.json({ subsidy: await createSubsidy(body, a.email) }, { status: 201 });
}
