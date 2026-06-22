"use client";

import { useEffect, useState, useCallback } from "react";
import { FolderOpen, Plus, Search, Pencil, Trash2, FileText, X, Loader2 } from "lucide-react";

type Project = {
  id: string;
  name: string;
  description?: string;
  objectives?: string[];
  target_audience?: string;
  social_impact?: string;
  location?: string;
  start_date?: string | null;
  end_date?: string | null;
  status?: string;
};

const STATUS = [
  { v: "draft", l: "Brouillon" },
  { v: "active", l: "Actif" },
  { v: "completed", l: "Terminé" },
  { v: "archived", l: "Archivé" },
];
const statusBadge: Record<string, string> = {
  draft: "bg-gray-500/20 text-gray-300",
  active: "bg-emerald-500/20 text-emerald-400",
  completed: "bg-blue-500/20 text-blue-400",
  archived: "bg-gray-600/20 text-gray-400",
};

const empty: Project = {
  id: "", name: "", description: "", objectives: [], target_audience: "",
  social_impact: "", location: "", start_date: "", end_date: "", status: "draft",
};

export default function ProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<Project>(empty);
  const [saving, setSaving] = useState(false);
  const [genId, setGenId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/projects");
    const data = await res.json().catch(() => ({}));
    setItems(data.projects || []);
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({ ...empty, ...p, objectives: p.objectives || [] });
    setOpen(true);
  };
  const set = (k: keyof Project, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    const payload = { ...form, objectives: (form.objectives || []).filter(Boolean) };
    const res = editing
      ? await fetch(`/api/admin/projects/${editing.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      : await fetch("/api/admin/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setSaving(false);
    if (res.ok) { setOpen(false); load(); }
  };
  const remove = async (p: Project) => {
    if (!confirm(`Supprimer le projet « ${p.name} » ?`)) return;
    await fetch(`/api/admin/projects/${p.id}`, { method: "DELETE" });
    load();
  };
  const generate = async (p: Project, format: "pdf" | "docx") => {
    setGenId(p.id + format);
    const res = await fetch(`/api/admin/projects/${p.id}/document`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ format }),
    });
    setGenId(null);
    const data = await res.json().catch(() => ({}));
    if (data.url) window.open(data.url, "_blank");
    else alert(data.error || "Erreur de génération");
  };

  const filtered = items.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projets</h1>
          <p className="text-gray-400 mt-1">Gérez les projets de l&apos;association</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] rounded-xl text-sm font-medium hover:opacity-90">
          <Plus size={18} /> Nouveau projet
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input value={q} onChange={(e) => setQ(e.target.value)} type="text" placeholder="Rechercher un projet..." className="w-full bg-[#1a0a1a] border border-[#8a2be2]/20 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#8a2be2] focus:outline-none" />
      </div>

      {loading ? (
        <div className="flex justify-center py-16 text-gray-500"><Loader2 className="animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#2a1a2a]/50 border border-[#8a2be2]/20 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#8a2be2]/20 flex items-center justify-center mx-auto mb-4"><FolderOpen size={28} className="text-[#8a2be2]" /></div>
          <h3 className="text-lg font-semibold mb-2">Aucun projet</h3>
          <p className="text-gray-400 text-sm mb-6">Créez votre premier projet pour générer des dossiers de subvention.</p>
          <button onClick={openNew} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] rounded-xl font-medium"><Plus size={18} /> Créer un projet</button>
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((p) => (
            <div key={p.id} className="bg-[#2a1a2a]/50 border border-[#8a2be2]/20 rounded-xl p-5 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold truncate">{p.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadge[p.status || "draft"]}`}>{STATUS.find((s) => s.v === p.status)?.l || p.status}</span>
                </div>
                {p.description && <p className="text-sm text-gray-400 mt-1 line-clamp-2">{p.description}</p>}
                <div className="text-xs text-gray-500 mt-2 flex flex-wrap gap-x-4">
                  {p.location && <span>📍 {p.location}</span>}
                  {(p.start_date || p.end_date) && <span>🗓️ {[p.start_date, p.end_date].filter(Boolean).join(" → ")}</span>}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => generate(p, "pdf")} disabled={genId === p.id + "pdf"} title="Générer dossier PDF" className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#8a2be2]/10">{genId === p.id + "pdf" ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}</button>
                <button onClick={() => generate(p, "docx")} disabled={genId === p.id + "docx"} title="Générer dossier DOCX" className="px-2 py-1 rounded-lg text-[10px] font-bold text-gray-400 hover:text-white hover:bg-[#8a2be2]/10">{genId === p.id + "docx" ? "..." : "DOCX"}</button>
                <button onClick={() => openEdit(p)} title="Modifier" className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#8a2be2]/10"><Pencil size={16} /></button>
                <button onClick={() => remove(p)} title="Supprimer" className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setOpen(false)}>
          <div className="bg-[#1a0a1a] border border-[#8a2be2]/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold">{editing ? "Modifier le projet" : "Nouveau projet"}</h2>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white"><X /></button>
            </div>
            <div className="space-y-4">
              <Field label="Nom du projet *"><input value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} placeholder="Festival Multiculturel 2026" /></Field>
              <Field label="Description"><textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} className={inputCls} /></Field>
              <Field label="Objectifs (un par ligne)"><textarea value={(form.objectives || []).join("\n")} onChange={(e) => set("objectives", e.target.value.split("\n"))} rows={3} className={inputCls} placeholder={"Renforcer le lien social\nPromouvoir la culture afrobeat"} /></Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Public cible"><input value={form.target_audience} onChange={(e) => set("target_audience", e.target.value)} className={inputCls} /></Field>
                <Field label="Lieu"><input value={form.location} onChange={(e) => set("location", e.target.value)} className={inputCls} /></Field>
                <Field label="Date de début"><input type="date" value={form.start_date || ""} onChange={(e) => set("start_date", e.target.value)} className={inputCls} /></Field>
                <Field label="Date de fin"><input type="date" value={form.end_date || ""} onChange={(e) => set("end_date", e.target.value)} className={inputCls} /></Field>
              </div>
              <Field label="Impact social"><textarea value={form.social_impact} onChange={(e) => set("social_impact", e.target.value)} rows={2} className={inputCls} /></Field>
              <Field label="Statut">
                <select value={form.status} onChange={(e) => set("status", e.target.value)} className={inputCls}>
                  {STATUS.map((s) => <option key={s.v} value={s.v}>{s.l}</option>)}
                </select>
              </Field>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setOpen(false)} className="px-4 py-2.5 rounded-lg text-gray-400 hover:text-white">Annuler</button>
              <button onClick={save} disabled={saving || !form.name.trim()} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] rounded-lg font-medium disabled:opacity-50">
                {saving && <Loader2 size={16} className="animate-spin" />} {editing ? "Enregistrer" : "Créer"}
              </button>
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
