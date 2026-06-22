import { NextResponse } from "next/server";
import { admin } from "@/lib/admin/guard";
import { getProject, updateProject, deleteProject } from "@/lib/admin/store";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const a = await admin();
  if (!a.ok) return a.res;
  const { id } = await params;
  const p = await getProject(id);
  return p ? NextResponse.json({ project: p }) : NextResponse.json({ error: "Introuvable" }, { status: 404 });
}
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const a = await admin();
  if (!a.ok) return a.res;
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({ project: await updateProject(id, body) });
}
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const a = await admin();
  if (!a.ok) return a.res;
  const { id } = await params;
  await deleteProject(id);
  return NextResponse.json({ ok: true });
}
