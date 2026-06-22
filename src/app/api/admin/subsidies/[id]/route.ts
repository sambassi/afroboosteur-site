import { NextResponse } from "next/server";
import { admin } from "@/lib/admin/guard";
import { updateSubsidy, deleteSubsidy } from "@/lib/admin/store";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const a = await admin();
  if (!a.ok) return a.res;
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({ subsidy: await updateSubsidy(id, body) });
}
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const a = await admin();
  if (!a.ok) return a.res;
  const { id } = await params;
  await deleteSubsidy(id);
  return NextResponse.json({ ok: true });
}
