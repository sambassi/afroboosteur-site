import { NextResponse } from "next/server";
import { admin } from "@/lib/admin/guard";
import { listProjects, createProject } from "@/lib/admin/store";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const a = await admin();
  if (!a.ok) return a.res;
  return NextResponse.json({ projects: await listProjects() });
}
export async function POST(req: Request) {
  const a = await admin();
  if (!a.ok) return a.res;
  const body = await req.json().catch(() => ({}));
  if (!String(body.name || "").trim())
    return NextResponse.json({ error: "Le nom est requis" }, { status: 400 });
  return NextResponse.json({ project: await createProject(body, a.email) }, { status: 201 });
}
