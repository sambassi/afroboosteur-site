"use client";

import { useEffect, useState, useCallback } from "react";
import { FileText, Search, Download, Trash2, Loader2 } from "lucide-react";

type Doc = {
  id: string; name: string; type?: string; format?: string;
  file_size?: number; created_at?: string; project_id?: string | null; generated_by?: string;
};

const typeFr: Record<string, string> = {
  dossier_subvention: "Dossier de subvention", rapport: "Rapport", budget: "Budget", lettre: "Lettre",
  statuts: "Statuts", pv: "Procès-verbal", contrat: "Contrat", reglement: "Règlement", autre: "Autre",
};

export default function DocumentsPage() {
  const [items, setItems] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/documents");
    setItems((await res.json().catch(() => ({})))?.documents || []);
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const download = async (d: Doc) => {
    setBusy(d.id);
    const res = await fetch(`/api/admin/documents/${d.id}`);
    setBusy(null);
    const data = await res.json().catch(() => ({}));
    if (data.url) window.open(data.url, "_blank"); else alert(data.error || "Erreur");
  };
  const remove = async (d: Doc) => {
    if (!confirm(`Supprimer « ${d.name} » ?`)) return;
    await fetch(`/api/admin/documents/${d.id}`, { method: "DELETE" });
    load();
  };
  const size = (b?: number) => (!b ? "" : b < 1024 ? b + " o" : b < 1048576 ? (b / 1024).toFixed(0) + " Ko" : (b / 1048576).toFixed(1) + " Mo");
  const date = (s?: string) => (s ? new Date(s).toLocaleDateString("fr-CH") : "");
  const filtered = items.filter((d) => d.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Documents</h1><p className="text-gray-400 mt-1">Documents générés à partir de vos projets</p></div>
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher un document..." className="w-full bg-[#1a0a1a] border border-[#8a2be2]/20 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#8a2be2] focus:outline-none" />
      </div>

      {loading ? (
        <div className="flex justify-center py-16 text-gray-500"><Loader2 className="animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#2a1a2a]/50 border border-[#8a2be2]/20 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-4"><FileText size={28} className="text-emerald-400" /></div>
          <h3 className="text-lg font-semibold mb-2">Aucun document</h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto">Générez un dossier depuis la page <b>Projets</b> ou <b>Subventions</b> : il apparaîtra ici (PDF / DOCX), stocké et téléchargeable.</p>
        </div>
      ) : (
        <div className="grid gap-2">
          {filtered.map((d) => (
            <div key={d.id} className="bg-[#2a1a2a]/50 border border-[#8a2be2]/20 rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-[#8a2be2]/15 flex items-center justify-center shrink-0 text-[11px] font-bold uppercase text-[#c79bff]">{d.format}</div>
                <div className="min-w-0">
                  <p className="font-medium truncate">{d.name}</p>
                  <p className="text-xs text-gray-500">{typeFr[d.type || "autre"]} · {date(d.created_at)}{d.file_size ? ` · ${size(d.file_size)}` : ""}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => download(d)} disabled={busy === d.id} title="Télécharger" className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#8a2be2]/10">{busy === d.id ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}</button>
                <button onClick={() => remove(d)} title="Supprimer" className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
