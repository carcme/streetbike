-- 002_seed_example_data.sql
-- Insert some example rows to help local development and testing.

-- Example timeline phases
INSERT INTO public.timeline_phases (phase_number, title, duration, image_url, image_alt)
VALUES
  (1, 'Find & Acquire', '1-2 weeks', '', 'Acquisition'),
  (2, 'Strip & Inspect', '2-3 weeks', '', 'Strip down'),
  (3, 'Build', '3-8 weeks', '', 'Build phase');

-- Example steps
INSERT INTO public.steps (title, description, date, category, image_url, sort_order)
VALUES
  ('Found the donor bike', 'Bought a barn find, needs lots of work', '2026-02-01', 'find', '', 0),
  ('Stripped wiring harness', 'Removed old harness and labelled connectors', '2026-02-10', 'strip', '', 1);

-- Example tasks
INSERT INTO public.tasks (phase_id, task_id, task, details, technical_notes, status)
SELECT tp.id, '1.1', 'Inspect frame', 'Check for rot and cracks', NULL, 'pending' FROM public.timeline_phases tp WHERE tp.phase_number = 1 LIMIT 1;

-- Example stats
INSERT INTO public.stats (label, value) VALUES ('Engine CC', '650'), ('Year', '1975');

-- Example specs
INSERT INTO public.specs (section_title, label, value, sort_order) VALUES
  ('Engine', 'Displacement', '649 cc', 0),
  ('Chassis', 'Frame Type', 'Tubular', 0);

-- Example progress update
INSERT INTO public.progress (title, date, tag, image_url, image_alt, description, sort_order)
VALUES ('Initial teardown', '2026-02-15', 'strip', '', 'Teardown photo', 'Stripped bike and inventoried parts', 0);

-- Example project meta
INSERT INTO public.project_meta (project_name, model_type, tags)
VALUES ('BMW R65 Project', 'bmw-r65', ARRAY['restoration','barn-find']);

