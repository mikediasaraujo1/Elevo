alter table public.profiles
  add column if not exists subscribed boolean not null default false,
  add column if not exists stripe_customer_id text;
