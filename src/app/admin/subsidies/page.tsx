"use client";

import { useEffect, useState, useCallback } from "react";
import { Landmark, Plus, Search, Pencil, Trash2, FileText, X, Loader2 } from "lucide-react";

type Subsidy = {
  id: string; project_id?: string | null; project_name?: string;
  type?: string; target_org?: string; amount_requested?: number | null;
  amount_received?: number | null; deadline?: string | null; status?: string; notes?: string;
};
type Project = { id: string; name: string };

const TYPES = [{ v: "ville", l: "Ville" }, { v: "canton", l: "Canton" }, { v: "fondation", l: "Fondation" }, { v: "federal", l: "Confédération" }];
const STATUS = [
  { v: "draft", l: "Brouillon" }, { v: "submitted", l: "Soumise" },
  { v: "approved", l: "Approuvée" }, { v: "rejected", l: "Refusée" }, { v: "completed", l: "Terminée" },
];
const badge: Record<string, string> = {
  draft: "bg-gray-500/20 text-gray-300", submitted: "bg-orange-500/20 text-orange-400",
  approved: "bg-emerald-500/20 text-emerald-400", rejected: "bg-red-500/20 text-red-400", completed: "bg-blue-500/20 text-blue-400",
};
const empty: Subsidy = { id: "", project_id: "", type: "ville", target_org: "", amount_requested: null, amount_received: null, deadline: "", status: "draft", notes: "" };

export default function SubsidiesPage() {
  const [items, setItems] = useState<Subsidy[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Subsidy | null>(null);
  const [form, setForm] = useState<Subsidy>(empty);
  const [saving, setSaving] = useState(false);
  const [genId, setGenId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [s, p] = await Promise.all([fetch("/api/admin/subsidies"), fetch("/api/admin/projects")]);
    setItems((await s.json().catch(() => ({})))?.subsidies || []);
    setProjects((await p.json().catch(() => ({})))?.projects || []);
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (s: Subsidy) => { setEditing(s); setForm({ ...empty, ...s }); setOpen(true); };
  const set = (k: keyof Subsidy, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    if (!String(form.target_org || "").trim()) return;
    setSaving(true);
    const project_name = projects.find((p) => p.id === form.project_id)?.name || "";
    const payload = { ...form, project_name };
    const res = editing
      ? await fetch(`/api/admin/subsidies/${editing.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      : await fetch("/api/admin/subsidies", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setSaving(false);
    if (res.ok) { setOpen(false); load(); }
  };
  const remove = async (s: Subsidy) => {
    if (!confirm(`Supprimer la demande « ${s.target_org} » ?`)) return;
    await fetch(`/api/admin/subsidies/${s.id}`, { method: "DELETE" });
    load();
  };
  const generate = async (s: Subsidy) => {
    if (!s.project_id) { alert("Liez d'abord cette demande à un projet."); return; }
    setGenId(s.id);
    const res = await fetch(`/api/admin/projects/${s.project_id}/document`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ format: "pdf", subsidy_id: s.id }),
    });
    setGenId(null);
    const data = await res.json().catch(() => ({}));
    if (data.url) window.open(data.url, "_blank"); else alert(data.error || "Erreur");
  };

  const chf = (n?: number | null) => (n == null ? "—" : "CHF " + Number(n).toLocaleString("fr-CH"));
  const filtered = items.filter((s) => (s.target_org || "").toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Subventions</h1><p className="text-gray-400 mt-1">Gérez vos demandes de subvention</p></div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] rounded-xl text-sm font-medium hover:opacity-90"><Plus size={18} /> Nouvelle demande</button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher une subvention..." className="w-full bg-[#1a0a1a] border border-[#8a2be2]/20 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#8a2be2] focus:outline-none" />
      </div>

      {loading ? (
        <div className="flex justify-center py-16 text-gray-500"><Loader2 className="animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#2a1a2a]/50 border border-[#8a2be2]/20 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#ff00ff]/20 flex items-center justify-center mx-auto mb-4"><Landmark size={28} className="text-[#ff00ff]" /></div>
          <h3 className="text-lg font-semibold mb-2">Aucune demande de subvention</h3>
          <p className="text-gray-400 text-sm mb-6">Créez une demande et générez le dossier adapté à l&apos;organisme.</p>
          <button onClick={openNew} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] rounded-xl font-medium"><Plus size={18} /> Créer une demande</button>
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((s) => (
            <div key={s.id} className="bg-[#2a1a2a]/50 border border-[#8a2be2]/20 rounded-xl p-5 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-semibold truncate">{s.target_org}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#8a2be2]/20 text-[#c79bff]">{TYPES.find((t) => t.v === s.type)?.l}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${badge[s.status || "draft"]}`}>{STATUS.find((x) => x.v === s.status)?.l}</span>
                </div>
                <div className="text-xs text-gray-500 mt-2 flex flex-wrap gap-x-4">
                  {s.project_name && <span>📁 {s.project_name}</span>}
                  <span>💰 {chf(s.amount_requested)}{s.amount_received != null && ` (accordé : ${chf(s.amount_received)})`}</span>
                  {s.deadline && <span>🗓️ {s.deadline}</span>}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => generate(s)} disabled={genId === s.id} title="Générer le dossier PDF" className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#8a2be2]/10">{genId === s.id ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}</button>
                <button onClick={() => openEdit(s)} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#8a2be2]/10"><Pencil size={16} /></button>
                <button onClick={() => remove(s)} className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setOpen(false)}>
          <div className="bg-[#1a0a1a] border border-[#8a2be2]/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5"><h2 className="text-xl font-semibold">{editing ? "Modifier la demande" : "Nouvelle demande"}</h2><button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white"><X /></button></div>
            <div className="space-y-4">
              <Field label="Projet lié">
                <select value={form.project_id || ""} onChange={(e) => set("project_id", e.target.value)} className={inputCls}>
                  <option value="">— Aucun —</option>
                  {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Type d'organisme"><select value={form.type} onChange={(e) => set("type", e.target.value)} className={inputCls}>{TYPES.map((t) => <option key={t.v} value={t.v}>{t.l}</option>)}</select></Field>
                <Field label="Organisme *"><input value={form.target_org} onChange={(e) => set("target_org", e.target.value)} className={inputCls} placeholder="Ville de Neuchâtel" /></Field>
                <Field label="Montant demandé (CHF)"><input type="number" value={form.amount_requested ?? ""} onChange={(e) => set("amount_requested", e.target.value)} className={inputCls} /></Field>
                <Field label="Montant accordé (CHF)"><input type="number" value={form.amount_received ?? ""} onChange={(e) => set("amount_received", e.target.value)} className={inputCls} /></Field>
                <Field label="Échéance"><input type="date" value={form.deadline || ""} onChange={(e) => set("deadline", e.target.value)} className={inputCls} /></Field>
                <Field label="Statut"><select value={form.status} onChange={(e) => set("status", e.target.value)} className={inputCls}>{STATUS.map((s) => <option key={s.v} value={s.v}>{s.l}</option>)}</select></Field>
              </div>
              <Field label="Notes"><textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={3} className={inputCls} /></Field>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setOpen(false)} className="px-4 py-2.5 rounded-lg text-gray-400 hover:text-white">Annuler</button>
              <button onClick={save} disabled={saving || !String(form.target_org || "").trim()} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] rounded-lg font-medium disabled:opacity-50">{saving && <Loader2 size={16} className="animate-spin" />} {editing ? "Enregistrer" : "Créer"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputCls = "w-full bg-[#2a1a2a] border border-[#8a2be2]/20 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#8a2be2] focus:outline-none";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (<div><label className="block text-sm text-gray-400 mb-1.5">{label}</label>{children}</div>);
}
