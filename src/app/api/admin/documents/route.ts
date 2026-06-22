import { NextResponse } from "next/server";
import { admin } from "@/lib/admin/guard";
import { listDocuments } from "@/lib/admin/store";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const a = await admin();
  if (!a.ok) return a.res;
  return NextResponse.json({ documents: await listDocuments() });
}
