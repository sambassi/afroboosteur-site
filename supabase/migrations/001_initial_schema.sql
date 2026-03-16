-- ============================================
-- Association Afroboosteur — Initial Schema
-- ============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE user_role AS ENUM ('admin', 'editor', 'viewer');
CREATE TYPE project_status AS ENUM ('draft', 'active', 'completed', 'archived');
CREATE TYPE subsidy_type AS ENUM ('ville', 'canton', 'fondation', 'federal');
CREATE TYPE subsidy_status AS ENUM ('draft', 'submitted', 'approved', 'rejected', 'revision');
CREATE TYPE document_type AS ENUM ('pdf', 'docx', 'xlsx', 'budget', 'subsidy_dossier', 'report');
CREATE TYPE signature_status AS ENUM ('pending', 'signed', 'rejected');
CREATE TYPE budget_line_type AS ENUM ('expense', 'revenue');

-- ============================================
-- PROFILES (extends Supabase auth.users)
-- ============================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  role user_role NOT NULL DEFAULT 'viewer',
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'viewer'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- PROJECTS
-- ============================================

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  status project_status NOT NULL DEFAULT 'draft',
  start_date DATE,
  end_date DATE,
  objectives TEXT DEFAULT '',
  target_audience TEXT DEFAULT '',
  social_impact TEXT DEFAULT '',
  location TEXT DEFAULT '',
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- BUDGETS
-- ============================================

CREATE TABLE budgets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Budget prévisionnel',
  total_expenses NUMERIC(12,2) NOT NULL DEFAULT 0,
  total_revenue NUMERIC(12,2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'CHF',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE budget_lines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  budget_id UUID NOT NULL REFERENCES budgets(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  type budget_line_type NOT NULL,
  category TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- SUBSIDIES
-- ============================================

CREATE TABLE subsidies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  type subsidy_type NOT NULL,
  status subsidy_status NOT NULL DEFAULT 'draft',
  organism_name TEXT NOT NULL DEFAULT '',
  amount_requested NUMERIC(12,2) NOT NULL DEFAULT 0,
  amount_granted NUMERIC(12,2),
  deadline DATE,
  submission_date DATE,
  response_date DATE,
  notes TEXT DEFAULT '',
  generated_content JSONB DEFAULT '{}',
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- DOCUMENTS
-- ============================================

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  subsidy_id UUID REFERENCES subsidies(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  type document_type NOT NULL,
  file_url TEXT,
  file_size INTEGER,
  content JSONB DEFAULT '{}',
  template_id TEXT,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- SIGNATURES
-- ============================================

CREATE TABLE signatures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  signer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  signer_name TEXT NOT NULL,
  signer_email TEXT NOT NULL,
  status signature_status NOT NULL DEFAULT 'pending',
  signature_data TEXT,
  signature_hash TEXT,
  signed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_budgets_updated_at BEFORE UPDATE ON budgets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subsidies_updated_at BEFORE UPDATE ON subsidies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE subsidies ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE signatures ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read all, update own
CREATE POLICY "Profiles are viewable by authenticated users" ON profiles
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Projects: all authenticated can read, admin/editor can write
CREATE POLICY "Projects are viewable by authenticated users" ON projects
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and editors can insert projects" ON projects
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

CREATE POLICY "Admins and editors can update projects" ON projects
  FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

CREATE POLICY "Admins can delete projects" ON projects
  FOR DELETE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Budgets: same as projects
CREATE POLICY "Budgets are viewable by authenticated users" ON budgets
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and editors can manage budgets" ON budgets
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

-- Budget lines: same as budgets
CREATE POLICY "Budget lines are viewable by authenticated users" ON budget_lines
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and editors can manage budget lines" ON budget_lines
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

-- Subsidies: same pattern
CREATE POLICY "Subsidies are viewable by authenticated users" ON subsidies
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and editors can manage subsidies" ON subsidies
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

-- Documents: same pattern
CREATE POLICY "Documents are viewable by authenticated users" ON documents
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and editors can manage documents" ON documents
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

-- Signatures: same pattern
CREATE POLICY "Signatures are viewable by authenticated users" ON signatures
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and editors can manage signatures" ON signatures
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_created_by ON projects(created_by);
CREATE INDEX idx_budgets_project_id ON budgets(project_id);
CREATE INDEX idx_budget_lines_budget_id ON budget_lines(budget_id);
CREATE INDEX idx_subsidies_project_id ON subsidies(project_id);
CREATE INDEX idx_subsidies_status ON subsidies(status);
CREATE INDEX idx_documents_project_id ON documents(project_id);
CREATE INDEX idx_documents_subsidy_id ON documents(subsidy_id);
CREATE INDEX idx_signatures_document_id ON signatures(document_id);

-- ============================================
-- STORAGE BUCKET
-- ============================================
-- Run in Supabase Dashboard > Storage:
-- Create bucket "documents" (public: false)
-- Policies: authenticated users can upload/download
