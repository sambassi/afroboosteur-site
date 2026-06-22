import "server-only";
import { adminDb } from "@/lib/firebase/admin";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

type Dict = Record<string, unknown>;

function serialize(
  snap: FirebaseFirestore.DocumentSnapshot
): Dict & { id: string } {
  const data = (snap.data() || {}) as Dict;
  const out: Dict & { id: string } = { id: snap.id };
  for (const [k, v] of Object.entries(data)) {
    out[k] = v instanceof Timestamp ? v.toDate().toISOString() : v;
  }
  return out;
}

const db = () => adminDb();

/* ----------------------------- PROJECTS ----------------------------- */
const PROJECTS = "projects";

export async function listProjects() {
  const q = await db().collection(PROJECTS).orderBy("created_at", "desc").get();
  return q.docs.map(serialize);
}
export async function getProject(id: string) {
  const d = await db().collection(PROJECTS).doc(id).get();
  return d.exists ? serialize(d) : null;
}
export async function createProject(data: Dict, email: string | null) {
  const now = FieldValue.serverTimestamp();
  const ref = await db().collection(PROJECTS).add({
    name: String(data.name || "").trim(),
    description: String(data.description || ""),
    objectives: Array.isArray(data.objectives) ? data.objectives : [],
    target_audience: String(data.target_audience || ""),
    social_impact: String(data.social_impact || ""),
    start_date: data.start_date || null,
    end_date: data.end_date || null,
    location: String(data.location || ""),
    status: String(data.status || "draft"),
    created_by: email,
    created_at: now,
    updated_at: now,
  });
  return getProject(ref.id);
}
export async function updateProject(id: string, data: Dict) {
  const patch: Dict = { updated_at: FieldValue.serverTimestamp() };
  for (const k of [
    "name",
    "description",
    "objectives",
    "target_audience",
    "social_impact",
    "start_date",
    "end_date",
    "location",
    "status",
  ]) {
    if (k in data) patch[k] = data[k];
  }
  await db().collection(PROJECTS).doc(id).set(patch, { merge: true });
  return getProject(id);
}
export async function deleteProject(id: string) {
  await db().collection(PROJECTS).doc(id).delete();
}

/* ----------------------------- SUBSIDIES ---------------------------- */
const SUBSIDIES = "subsidies";

export async function listSubsidies() {
  const q = await db().collection(SUBSIDIES).orderBy("created_at", "desc").get();
  return q.docs.map(serialize);
}
export async function getSubsidy(id: string) {
  const d = await db().collection(SUBSIDIES).doc(id).get();
  return d.exists ? serialize(d) : null;
}
export async function createSubsidy(data: Dict, email: string | null) {
  const now = FieldValue.serverTimestamp();
  const num = (v: unknown) =>
    v === "" || v === null || v === undefined ? null : Number(v);
  const ref = await db().collection(SUBSIDIES).add({
    project_id: data.project_id || null,
    project_name: String(data.project_name || ""),
    type: String(data.type || "ville"),
    target_org: String(data.target_org || "").trim(),
    amount_requested: num(data.amount_requested),
    amount_received: num(data.amount_received),
    deadline: data.deadline || null,
    status: String(data.status || "draft"),
    notes: String(data.notes || ""),
    created_by: email,
    created_at: now,
    updated_at: now,
  });
  return getSubsidy(ref.id);
}
export async function updateSubsidy(id: string, data: Dict) {
  const patch: Dict = { updated_at: FieldValue.serverTimestamp() };
  const num = (v: unknown) =>
    v === "" || v === null || v === undefined ? null : Number(v);
  for (const k of [
    "project_id",
    "project_name",
    "type",
    "target_org",
    "deadline",
    "status",
    "notes",
  ]) {
    if (k in data) patch[k] = data[k];
  }
  if ("amount_requested" in data) patch.amount_requested = num(data.amount_requested);
  if ("amount_received" in data) patch.amount_received = num(data.amount_received);
  await db().collection(SUBSIDIES).doc(id).set(patch, { merge: true });
  return getSubsidy(id);
}
export async function deleteSubsidy(id: string) {
  await db().collection(SUBSIDIES).doc(id).delete();
}

/* ----------------------------- DOCUMENTS ---------------------------- */
const DOCUMENTS = "documents";

export async function listDocuments() {
  const q = await db().collection(DOCUMENTS).orderBy("created_at", "desc").get();
  return q.docs.map(serialize);
}
export async function getDocument(id: string) {
  const d = await db().collection(DOCUMENTS).doc(id).get();
  return d.exists ? serialize(d) : null;
}
export async function recordDocument(data: Dict, email: string | null) {
  const ref = await db().collection(DOCUMENTS).add({
    name: String(data.name || ""),
    type: String(data.type || "autre"),
    format: String(data.format || "pdf"),
    project_id: data.project_id || null,
    subsidy_id: data.subsidy_id || null,
    storage_path: String(data.storage_path || ""),
    file_size: Number(data.file_size || 0),
    mime_type: String(data.mime_type || ""),
    generated_by: email,
    created_at: FieldValue.serverTimestamp(),
  });
  return getDocument(ref.id);
}
export async function deleteDocument(id: string) {
  await db().collection(DOCUMENTS).doc(id).delete();
}
