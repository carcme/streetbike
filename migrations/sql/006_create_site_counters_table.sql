 -- counter table
  create table site_counters (
    key text primary key,
    count bigint not null default 0
  );
  insert into site_counters (key, count) values ('page_views', 0);

  -- atomic increment function
  create or replace function increment_counter(counter_key text)
  returns void as $$
    update site_counters set count = count + 1 where key = counter_key;
  $$ language sql;

  -- sessions table (one row per unique visitor)
  create table sessions (
    session_id text primary key,
    first_seen timestamptz not null default now(),
    referrer text
  );
