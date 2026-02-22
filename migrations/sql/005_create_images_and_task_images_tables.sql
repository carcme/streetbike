-- 005_create_images_and_task_images_tables.sql
-- Creates images table and a task_images junction table for many-to-many relationship.

-- Images Table
CREATE TABLE IF NOT EXISTS public.images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  alt_text text,
  -- Assuming auth.users table exists in Supabase for referencing uploader
  uploaded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Task Images Junction Table
CREATE TABLE IF NOT EXISTS public.task_images (
  task_id uuid REFERENCES public.tasks(id) ON DELETE CASCADE,
  image_id uuid REFERENCES public.images(id) ON DELETE CASCADE,
  PRIMARY KEY (task_id, image_id),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Optional: Add RLS policies for images (adapt as needed in Supabase SQL editor)
-- ALTER TABLE public.images ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "allow authenticated reads images" ON public.images FOR SELECT USING (auth.role() = 'authenticated');
-- CREATE POLICY "allow authenticated uploads images" ON public.images FOR INSERT WITH CHECK (auth.role() = 'authenticated');
-- CREATE POLICY "allow authenticated deletes images" ON public.images FOR DELETE USING (auth.role() = 'authenticated');

-- Optional: Add RLS policies for task_images (adapt as needed in Supabase SQL editor)
-- ALTER TABLE public.task_images ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "allow authenticated reads task_images" ON public.task_images FOR SELECT USING (auth.role() = 'authenticated');
-- CREATE POLICY "allow authenticated writes task_images" ON public.task_images FOR INSERT, UPDATE, DELETE USING (auth.role() = 'authenticated');
