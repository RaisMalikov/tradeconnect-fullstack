create extension if not exists "pgcrypto";

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  trade text not null,
  location text not null,
  description text not null,
  budget text,
  urgency text not null default 'Planned',
  status text not null default 'open',
  created_by uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.tradie_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  full_name text not null,
  trade text not null,
  service_area text not null,
  years_experience integer not null default 0,
  bio text,
  verified boolean not null default false,
  available_now boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  tradie_profile_id uuid not null references public.tradie_profiles(id) on delete cascade,
  message text,
  status text not null default 'applied',
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.jobs(id) on delete cascade,
  sender_profile_id uuid references public.tradie_profiles(id) on delete set null,
  receiver_profile_id uuid references public.tradie_profiles(id) on delete set null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  tradie_profile_id uuid not null references public.tradie_profiles(id) on delete cascade,
  reviewer_name text not null,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

alter table public.jobs enable row level security;
alter table public.tradie_profiles enable row level security;
alter table public.job_applications enable row level security;
alter table public.messages enable row level security;
alter table public.reviews enable row level security;

-- Replace these starter policies with stricter auth-based policies during integration.
create policy if not exists "Public read jobs"
  on public.jobs for select using (true);
create policy if not exists "Public insert jobs"
  on public.jobs for insert with check (true);

create policy if not exists "Public read tradie profiles"
  on public.tradie_profiles for select using (true);
create policy if not exists "Public insert tradie profiles"
  on public.tradie_profiles for insert with check (true);

create policy if not exists "Public read applications"
  on public.job_applications for select using (true);
create policy if not exists "Public insert applications"
  on public.job_applications for insert with check (true);

create policy if not exists "Public read messages"
  on public.messages for select using (true);
create policy if not exists "Public insert messages"
  on public.messages for insert with check (true);

create policy if not exists "Public read reviews"
  on public.reviews for select using (true);
create policy if not exists "Public insert reviews"
  on public.reviews for insert with check (true);
