-- Analytics fields on proposals
alter table public.proposals
  add column if not exists views integer not null default 0,
  add column if not exists last_viewed timestamptz;

-- Broker contact for public proposal page
alter table public.profiles
  add column if not exists whatsapp text;

-- View tracking log
create table if not exists public.proposal_views (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid not null references public.proposals (id) on delete cascade,
  ip text,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.proposal_views enable row level security;

-- Public read for proposal pages (anon + authenticated)
create policy "Public can view proposals"
  on public.proposals for select
  using (true);

-- Allow profile contact info for brokers with proposals
create policy "Public can view broker contact info"
  on public.profiles for select
  using (
    exists (
      select 1 from public.proposals
      where proposals.user_id = profiles.id
    )
  );

-- Track views via API (RPC runs as security definer)
create or replace function public.track_proposal_view(
  p_slug text,
  p_ip text,
  p_user_agent text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_proposal_id uuid;
begin
  select id into v_proposal_id
  from public.proposals
  where slug = p_slug;

  if v_proposal_id is null then
    return;
  end if;

  insert into public.proposal_views (proposal_id, ip, user_agent)
  values (v_proposal_id, p_ip, p_user_agent);

  update public.proposals
  set
    views = views + 1,
    last_viewed = now(),
    updated_at = now()
  where id = v_proposal_id;
end;
$$;

grant execute on function public.track_proposal_view(text, text, text) to anon, authenticated;
