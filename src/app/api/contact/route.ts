import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function escapeHtml(s: string) {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c] as string
  );
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const message = String(body?.message ?? "").trim();
  const honeypot = String(body?.company ?? "").trim();

  // Honeypot : champ invisible rempli => bot. Succès silencieux, aucun envoi.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  // Validation basique
  if (!name || name.length > 100) {
    return NextResponse.json({ ok: false, error: "invalid_name" }, { status: 400 });
  }
  if (!isEmail(email) || email.length > 200) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (!message || message.length < 5 || message.length > 5000) {
    return NextResponse.json({ ok: false, error: "invalid_message" }, { status: 400 });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "465");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO || user;

  if (!host || !user || !pass || !to) {
    console.error("[contact] SMTP non configuré (variables d'env manquantes)");
    return NextResponse.json({ ok: false, error: "smtp_not_configured" }, { status: 500 });
  }

  const secure = port === 465; // 465 = SSL direct ; 587 = STARTTLS
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS: !secure, // force STARTTLS sur 587 (jamais d'auth en clair)
    auth: { user, pass },
    connectionTimeout: 12000,
    greetingTimeout: 12000,
    socketTimeout: 20000,
  });

  try {
    const info = await transporter.sendMail({
      from: `"Afroboosteur — Contact" <${user}>`,
      to,
      replyTo: email,
      subject: `Nouveau message de contact — ${name}`,
      text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html:
        `<p><strong>Nom :</strong> ${escapeHtml(name)}</p>` +
        `<p><strong>Email :</strong> ${escapeHtml(email)}</p>` +
        `<p><strong>Message :</strong></p>` +
        `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });
    return NextResponse.json({ ok: true, id: info.messageId });
  } catch (err) {
    console.error("[contact] échec d'envoi SMTP:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
