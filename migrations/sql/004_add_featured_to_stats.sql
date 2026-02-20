-- 004_add_featured_to_stats.sql
-- Adds a 'featured' boolean column to the stats table.

ALTER TABLE public.stats ADD COLUMN IF NOT EXISTS featured boolean NOT NULL DEFAULT false;
