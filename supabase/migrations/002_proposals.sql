-- proposals table for ELEVO
create table if not exists public.proposals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  slug text not null unique,
  titulo text not null,
  endereco text not null,
  bairro text not null,
  cidade text not null,
  preco numeric not null,
  area_m2 numeric,
  quartos integer,
  banheiros integer,
  vagas integer,
  descricao text,
  fotos text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.proposals enable row level security;

create policy "Users can view own proposals"
  on public.proposals for select
  using (auth.uid() = user_id);

create policy "Users can insert own proposals"
  on public.proposals for insert
  with check (auth.uid() = user_id);

create policy "Users can update own proposals"
  on public.proposals for update
  using (auth.uid() = user_id);

create policy "Users can delete own proposals"
  on public.proposals for delete
  using (auth.uid() = user_id);
