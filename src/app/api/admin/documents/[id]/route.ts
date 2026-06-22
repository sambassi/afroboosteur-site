import { NextResponse } from "next/server";
import { admin } from "@/lib/admin/guard";
import { getDocument, deleteDocument } from "@/lib/admin/store";
import { signedUrl, deleteStorage } from "@/lib/documents/storage";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const a = await admin();
  if (!a.ok) return a.res;
  const { id } = await params;
  const doc = await getDocument(id);
  if (!doc || !doc.storage_path) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  return NextResponse.json({ url: await signedUrl(String(doc.storage_path), 60) });
}
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const a = await admin();
  if (!a.ok) return a.res;
  const { id } = await params;
  const doc = await getDocument(id);
  if (doc?.storage_path) await deleteStorage(String(doc.storage_path));
  await deleteDocument(id);
  return NextResponse.json({ ok: true });
}
