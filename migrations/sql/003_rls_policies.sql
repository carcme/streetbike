-- 003_rls_policies.sql
-- Row Level Security (RLS) policies for admin-writable tables.
-- WARNING: The policies below allow any authenticated user to INSERT/UPDATE/DELETE.
-- For a real admin panel, you should restrict writes to an `admins` table or a custom
-- claim (e.g., a `role` claim set in the JWT). See notes below.

-- Enable RLS on admin-write tables
ALTER TABLE IF EXISTS public.steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.timeline_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.specs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.project_meta ENABLE ROW LEVEL SECURITY;

-- Allow public SELECT (read) on those tables
-- Option A: public reads
CREATE POLICY IF NOT EXISTS "public_select_steps" ON public.steps FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "public_select_timeline_phases" ON public.timeline_phases FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "public_select_tasks" ON public.tasks FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "public_select_stats" ON public.stats FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "public_select_specs" ON public.specs FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "public_select_progress" ON public.progress FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "public_select_project_meta" ON public.project_meta FOR SELECT USING (true);

-- Allow authenticated users to INSERT/UPDATE/DELETE
CREATE POLICY IF NOT EXISTS "auth_insert_steps" ON public.steps FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY IF NOT EXISTS "auth_update_steps" ON public.steps FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY IF NOT EXISTS "auth_delete_steps" ON public.steps FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "auth_insert_timeline_phases" ON public.timeline_phases FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY IF NOT EXISTS "auth_update_timeline_phases" ON public.timeline_phases FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY IF NOT EXISTS "auth_delete_timeline_phases" ON public.timeline_phases FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "auth_insert_tasks" ON public.tasks FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY IF NOT EXISTS "auth_update_tasks" ON public.tasks FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY IF NOT EXISTS "auth_delete_tasks" ON public.tasks FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "auth_insert_stats" ON public.stats FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY IF NOT EXISTS "auth_update_stats" ON public.stats FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY IF NOT EXISTS "auth_delete_stats" ON public.stats FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "auth_insert_specs" ON public.specs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY IF NOT_EXISTS "auth_update_specs" ON public.specs FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY IF NOT EXISTS "auth_delete_specs" ON public.specs FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT_EXISTS "auth_insert_progress" ON public.progress FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY IF NOT_EXISTS "auth_update_progress" ON public.progress FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY IF NOT_EXISTS "auth_delete_progress" ON public.progress FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT_EXISTS "auth_insert_project_meta" ON public.project_meta FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY IF NOT_EXISTS "auth_update_project_meta" ON public.project_meta FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY IF NOT_EXISTS "auth_delete_project_meta" ON public.project_meta FOR DELETE USING (auth.role() = 'authenticated');

-- Notes and next steps:
-- 1) These policies are permissive: they allow any authenticated user to perform writes.
--    For an admin panel you should restrict writes to a small set of admin users. Two common approaches:
--    a) Create a table `public.admins(user_id uuid primary key)` and then change the WITH CHECK / USING
--       expressions to: (exists (select 1 from public.admins where user_id = auth.uid()))
--    b) Use a custom claim in the JWT (e.g., set `role: 'admin'`) and check auth.jwt() ->> 'role' = 'admin'.
-- 2) To apply: paste this SQL into Supabase SQL editor and run. Or run via pg client with sufficient privileges.
-- 3) If you prefer I can add a migration runner to apply these automatically from the repo.
