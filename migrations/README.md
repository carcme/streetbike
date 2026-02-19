Migrations and seeds for the Streetbike project

Files in this folder:

- sql/001_create_tables_and_types.sql : creates enums, tables, and indexes
- sql/002_seed_example_data.sql : inserts example rows useful for local development

How to run

1. In Supabase Console -> SQL Editor, paste the contents of `001_create_tables_and_types.sql` and run it.
2. Then (optionally) paste and run `002_seed_example_data.sql` to add example rows.

Notes

- These migrations assume the `public` schema. If your project uses a different schema, adjust the scripts.
- The migrations create enums `step_category` and `task_status`.
- Consider enabling Row Level Security (RLS) on write-sensitive tables and adding appropriate policies for `authenticated` users or admin roles.

Example RLS policy (adapt in Supabase SQL editor):

-- Enable RLS
-- ALTER TABLE public.steps ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read
-- CREATE POLICY "Allow authenticated reads" ON public.steps FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to write (INSERT/UPDATE/DELETE)
-- CREATE POLICY "Allow authenticated writes" ON public.steps FOR INSERT, UPDATE, DELETE USING (auth.role() = 'authenticated');

If you want I can:

- Add a more formal migration runner (e.g., node script) to apply these directly to your DB using the `.env` keys.
- Convert these to the migration format of a specific tool (pg-migrate, Flyway, Prisma Migrate, etc.).
