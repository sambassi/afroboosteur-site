import { NextResponse } from "next/server";
import { admin } from "@/lib/admin/guard";
import { getProject, getSubsidy, recordDocument } from "@/lib/admin/store";
import { buildProjectPdf, buildProjectDocx } from "@/lib/documents/generate";
import { uploadDocument, signedUrl } from "@/lib/documents/storage";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const a = await admin();
  if (!a.ok) return a.res;
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const format = body.format === "docx" ? "docx" : "pdf";
  const project = await getProject(id);
  if (!project) return NextResponse.json({ error: "Projet introuvable" }, { status: 404 });
  const subsidy = body.subsidy_id ? await getSubsidy(String(body.subsidy_id)) : null;

  let data: Buffer; let mime: string;
  if (format === "docx") {
    data = await buildProjectDocx(project, subsidy);
    mime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  } else {
    data = Buffer.from(await buildProjectPdf(project, subsidy));
    mime = "application/pdf";
  }
  const ts = Date.now();
  const base = subsidy ? "dossier-subvention" : "fiche-projet";
  const path = `documents/${id}/${base}-${ts}.${format}`;
  await uploadDocument(path, data, mime);
  const name = `${base}-${String(project.name || "").slice(0, 40).replace(/[^\w\- ]+/g, "").trim() || "projet"}.${format}`;
  const doc = await recordDocument(
    {
      name,
      type: subsidy ? "dossier_subvention" : "rapport",
      format,
      project_id: id,
      subsidy_id: body.subsidy_id || null,
      storage_path: path,
      file_size: data.length,
      mime_type: mime,
    },
    a.email
  );
  const url = await signedUrl(path, 60);
  return NextResponse.json({ document: doc, url }, { status: 201 });
}
