-- 001_create_tables_and_types.sql
-- Creates required extensions, enum types, and tables for the Streetbike app.
-- Adjust as needed for your Supabase/Postgres setup.

-- Enable pgcrypto (for gen_random_uuid)
create extension if not exists "pgcrypto";

-- Enum types
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'step_category') THEN
    CREATE TYPE step_category AS ENUM ('find','strip','build','finish');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'task_status') THEN
    CREATE TYPE task_status AS ENUM ('pending','completed');
  END IF;
END$$;

-- Steps
CREATE TABLE IF NOT EXISTS public.steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  category step_category NOT NULL,
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Timeline phases
CREATE TABLE IF NOT EXISTS public.timeline_phases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phase_number integer NOT NULL,
  title text NOT NULL,
  duration text NOT NULL,
  image_url text,
  image_alt text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_timeline_phases_phase_number ON public.timeline_phases(phase_number);

-- Tasks
CREATE TABLE IF NOT EXISTS public.tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phase_id uuid REFERENCES public.timeline_phases(id) ON DELETE CASCADE,
  task_id text NOT NULL,
  task text NOT NULL,
  details text NOT NULL,
  technical_notes text,
  status task_status NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tasks_phase_id ON public.tasks(phase_id);

-- Stats
CREATE TABLE IF NOT EXISTS public.stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  value text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Specs
CREATE TABLE IF NOT EXISTS public.specs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_title text NOT NULL,
  label text NOT NULL,
  value text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Progress updates
CREATE TABLE IF NOT EXISTS public.progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  date date,
  tag text,
  image_url text,
  image_alt text,
  description text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Project meta
CREATE TABLE IF NOT EXISTS public.project_meta (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_name text,
  model_type text,
  tags text[] DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Optional: Example RLS / policy hints (commented out)
-- NOTE: Be intentional with RLS. Below are examples you can adapt in Supabase SQL editor.
-- -- Enable RLS on admin-writable tables (then add policies)
-- ALTER TABLE public.steps ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "allow authenticated reads" ON public.steps FOR SELECT USING (auth.role() = 'authenticated');
-- CREATE POLICY "allow authenticated writes" ON public.steps FOR INSERT, UPDATE, DELETE USING (auth.role() = 'authenticated');


-- Done

