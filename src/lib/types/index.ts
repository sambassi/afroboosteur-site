// ============================================
// Types de la plateforme Afroboosteur
// ============================================

export type UserRole = "president" | "admin" | "member" | "viewer";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
}

export type ProjectStatus = "draft" | "active" | "completed" | "archived";

export interface Project {
  id: string;
  name: string;
  description: string | null;
  objectives: string[];
  target_audience: string | null;
  social_impact: string | null;
  start_date: string | null;
  end_date: string | null;
  location: string | null;
  status: ProjectStatus;
  created_by: string | null;
  duplicated_from: string | null;
  created_at: string;
  updated_at: string;
}

export interface Budget {
  id: string;
  project_id: string;
  total_expenses: number;
  total_revenue: number;
  balance: number;
  currency: string;
  created_at: string;
}

export type BudgetLineType = "expense" | "revenue";

export interface BudgetLine {
  id: string;
  budget_id: string;
  type: BudgetLineType;
  category: string;
  description: string | null;
  amount: number;
  sort_order: number;
}

export type SubsidyType = "ville" | "canton" | "fondation" | "federal";
export type SubsidyStatus =
  | "draft"
  | "submitted"
  | "approved"
  | "rejected"
  | "completed";

export interface Subsidy {
  id: string;
  project_id: string | null;
  type: SubsidyType;
  target_org: string;
  amount_requested: number | null;
  amount_received: number | null;
  deadline: string | null;
  status: SubsidyStatus;
  notes: string | null;
  created_by: string | null;
  created_at: string;
}

export type DocumentType =
  | "statuts"
  | "reglement"
  | "pv"
  | "rapport"
  | "budget"
  | "lettre"
  | "dossier_subvention"
  | "autre";

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  category: string;
  file_url: string | null;
  file_size: number | null;
  mime_type: string | null;
  project_id: string | null;
  subsidy_id: string | null;
  uploaded_by: string | null;
  requires_sign: boolean;
  status: string;
  created_at: string;
}

export type SignatureStatus = "pending" | "signed" | "declined";

export interface Signature {
  id: string;
  document_id: string;
  signer_id: string;
  signature_data: string | null;
  signature_hash: string | null;
  ip_address: string | null;
  user_agent: string | null;
  status: SignatureStatus;
  invited_at: string;
  signed_at: string | null;
}

// Dashboard metrics
export interface DashboardMetrics {
  totalProjects: number;
  activeProjects: number;
  totalBudget: number;
  totalMembers: number;
  pendingSubsidies: number;
  documentsCount: number;
}
