
create table public.page_views (
  id uuid primary key default gen_random_uuid(),
  page_path text not null,
  session_id text not null,
  entered_at timestamptz default now(),
  duration_seconds integer default 0
);

alter table public.page_views enable row level security;

create policy "allow_public_insert" on public.page_views for insert with check (true);

create policy "allow_public_update_own_session" on public.page_views for update using (true) with check (true);
