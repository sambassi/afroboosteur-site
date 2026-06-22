import "server-only";
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  TextRun,
  AlignmentType,
} from "docx";

type Project = Record<string, unknown>;
type Subsidy = Record<string, unknown> | null;

const ORG = "Association Afroboosteur";
const ORG_SUB = "Culture, Santé & Lien Social — Neuchâtel";

// WinAnsi-safe (les polices standard PDF n'encodent pas l'unicode complet)
function safe(s: unknown): string {
  return String(s ?? "")
    .normalize("NFC")
    .replace(
      /[^\x09\x0A\x0D\x20-\x7E -ÿ€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ]/g,
      ""
    );
}

const STATUS_FR: Record<string, string> = {
  draft: "Brouillon",
  active: "Actif",
  completed: "Terminé",
  archived: "Archivé",
  submitted: "Soumise",
  approved: "Approuvée",
  rejected: "Refusée",
};
const TYPE_FR: Record<string, string> = {
  ville: "Ville",
  canton: "Canton",
  fondation: "Fondation",
  federal: "Confédération",
};

/* ------------------------------ PDF ------------------------------ */
export async function buildProjectPdf(
  project: Project,
  subsidy: Subsidy
): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const A4: [number, number] = [595.28, 841.89];
  const M = 56;
  let page: PDFPage = pdf.addPage(A4);
  let y = A4[1] - M;
  const purple = rgb(0.54, 0.17, 0.89);

  const newPageIfNeeded = (need: number) => {
    if (y - need < M) {
      page = pdf.addPage(A4);
      y = A4[1] - M;
    }
  };
  const wrap = (text: string, f: PDFFont, size: number, maxW: number) => {
    const words = safe(text).split(/\s+/);
    const lines: string[] = [];
    let line = "";
    for (const w of words) {
      const test = line ? line + " " + w : w;
      if (f.widthOfTextAtSize(test, size) > maxW && line) {
        lines.push(line);
        line = w;
      } else line = test;
    }
    if (line) lines.push(line);
    return lines;
  };
  const para = (text: string, opts: { size?: number; f?: PDFFont; color?: ReturnType<typeof rgb>; gap?: number } = {}) => {
    const size = opts.size ?? 11;
    const f = opts.f ?? font;
    const maxW = A4[0] - 2 * M;
    for (const ln of wrap(text, f, size, maxW)) {
      newPageIfNeeded(size + 4);
      page.drawText(ln, { x: M, y, size, font: f, color: opts.color ?? rgb(0.1, 0.1, 0.1) });
      y -= size + 4;
    }
    y -= opts.gap ?? 4;
  };
  const heading = (text: string) => {
    y -= 8;
    newPageIfNeeded(22);
    page.drawText(safe(text), { x: M, y, size: 13, font: bold, color: purple });
    y -= 18;
  };
  const field = (label: string, value: unknown) => {
    const v = safe(value);
    if (!v) return;
    newPageIfNeeded(16);
    page.drawText(safe(label) + " :", { x: M, y, size: 11, font: bold });
    const lblW = bold.widthOfTextAtSize(safe(label) + " : ", 11);
    const maxW = A4[0] - 2 * M - lblW;
    const lines = wrap(v, font, 11, maxW);
    lines.forEach((ln, i) => {
      if (i > 0) {
        newPageIfNeeded(15);
        y -= 15;
      }
      page.drawText(ln, { x: M + lblW, y, size: 11, font });
    });
    y -= 15;
  };

  // En-tête
  page.drawText(ORG, { x: M, y, size: 18, font: bold, color: purple });
  y -= 18;
  page.drawText(safe(ORG_SUB), { x: M, y, size: 10, font, color: rgb(0.4, 0.4, 0.4) });
  y -= 28;

  const title = subsidy
    ? "Dossier de demande de subvention"
    : "Fiche projet";
  page.drawText(safe(title), { x: M, y, size: 16, font: bold });
  y -= 26;

  heading("Projet");
  field("Nom", project.name);
  field("Statut", STATUS_FR[String(project.status)] || project.status);
  field("Lieu", project.location);
  field("Période", [project.start_date, project.end_date].filter(Boolean).join(" → "));
  field("Public cible", project.target_audience);
  if (project.description) {
    y -= 2;
    para(String(project.description), { gap: 6 });
  }
  const objectives = Array.isArray(project.objectives) ? (project.objectives as unknown[]) : [];
  if (objectives.length) {
    heading("Objectifs");
    for (const o of objectives) para("•  " + safe(o), { gap: 0 });
  }
  if (project.social_impact) {
    heading("Impact social");
    para(String(project.social_impact));
  }

  if (subsidy) {
    heading("Demande de subvention");
    field("Organisme", subsidy.target_org);
    field("Type", TYPE_FR[String(subsidy.type)] || subsidy.type);
    field("Statut", STATUS_FR[String(subsidy.status)] || subsidy.status);
    field("Échéance", subsidy.deadline);
    if (subsidy.amount_requested != null)
      field("Montant demandé", `CHF ${Number(subsidy.amount_requested).toLocaleString("fr-CH")}`);
    if (subsidy.amount_received != null)
      field("Montant accordé", `CHF ${Number(subsidy.amount_received).toLocaleString("fr-CH")}`);
    if (subsidy.notes) {
      y -= 2;
      para(String(subsidy.notes));
    }
  }

  newPageIfNeeded(30);
  y -= 16;
  page.drawText(safe(`Document généré le ${new Date().toLocaleDateString("fr-CH")} — ${ORG}`), {
    x: M,
    y,
    size: 9,
    font,
    color: rgb(0.5, 0.5, 0.5),
  });

  return pdf.save();
}

/* ------------------------------ DOCX ----------------------------- */
export async function buildProjectDocx(
  project: Project,
  subsidy: Subsidy
): Promise<Buffer> {
  const children: Paragraph[] = [];
  const h = (t: string) =>
    children.push(new Paragraph({ text: t, heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 80 } }));
  const kv = (label: string, value: unknown) => {
    const v = String(value ?? "").trim();
    if (!v) return;
    children.push(
      new Paragraph({
        children: [new TextRun({ text: `${label} : `, bold: true }), new TextRun(v)],
        spacing: { after: 40 },
      })
    );
  };
  const p = (t: string) => children.push(new Paragraph({ text: t, spacing: { after: 80 } }));

  children.push(new Paragraph({ text: ORG, heading: HeadingLevel.TITLE }));
  children.push(new Paragraph({ text: ORG_SUB, spacing: { after: 120 } }));
  children.push(
    new Paragraph({
      text: subsidy ? "Dossier de demande de subvention" : "Fiche projet",
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 120 },
    })
  );

  h("Projet");
  kv("Nom", project.name);
  kv("Statut", STATUS_FR[String(project.status)] || project.status);
  kv("Lieu", project.location);
  kv("Période", [project.start_date, project.end_date].filter(Boolean).join(" → "));
  kv("Public cible", project.target_audience);
  if (project.description) p(String(project.description));

  const objectives = Array.isArray(project.objectives) ? (project.objectives as unknown[]) : [];
  if (objectives.length) {
    h("Objectifs");
    for (const o of objectives)
      children.push(new Paragraph({ text: String(o), bullet: { level: 0 } }));
  }
  if (project.social_impact) {
    h("Impact social");
    p(String(project.social_impact));
  }
  if (subsidy) {
    h("Demande de subvention");
    kv("Organisme", subsidy.target_org);
    kv("Type", TYPE_FR[String(subsidy.type)] || subsidy.type);
    kv("Statut", STATUS_FR[String(subsidy.status)] || subsidy.status);
    kv("Échéance", subsidy.deadline);
    if (subsidy.amount_requested != null)
      kv("Montant demandé", `CHF ${Number(subsidy.amount_requested).toLocaleString("fr-CH")}`);
    if (subsidy.amount_received != null)
      kv("Montant accordé", `CHF ${Number(subsidy.amount_received).toLocaleString("fr-CH")}`);
    if (subsidy.notes) p(String(subsidy.notes));
  }

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `Document généré le ${new Date().toLocaleDateString("fr-CH")} — ${ORG}`,
          italics: true,
          size: 18,
          color: "808080",
        }),
      ],
      alignment: AlignmentType.LEFT,
      spacing: { before: 240 },
    })
  );

  const doc = new Document({ sections: [{ children }] });
  return Packer.toBuffer(doc);
}
