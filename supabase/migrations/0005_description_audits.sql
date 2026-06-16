create type public.visibility_page_type as enum (
  'home',
  'service',
  'article',
  'product',
  'collection',
  'category',
  'contact',
  'other'
);

create type public.visibility_description_source as enum (
  'crawl',
  'shopify',
  'wordpress',
  'woocommerce',
  'manual'
);

alter table public.page_snapshots
  add column if not exists page_type public.visibility_page_type not null default 'other',
  add column if not exists description_score integer not null default 50 check (description_score >= 0 and description_score <= 100);

create table public.description_audits (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  url text not null,
  page_type public.visibility_page_type not null default 'other',
  title text not null,
  current_description text not null default '',
  description_score integer not null default 50 check (description_score >= 0 and description_score <= 100),
  word_count integer not null default 0,
  issue text not null,
  missing_elements_json jsonb not null default '[]'::jsonb,
  recommended_description_brief text not null,
  suggested_sections_json jsonb not null default '[]'::jsonb,
  priority integer not null default 50 check (priority >= 0 and priority <= 100),
  expected_impact text not null default 'medium',
  estimated_time_minutes integer not null default 30,
  source public.visibility_description_source not null default 'crawl',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (site_id, url)
);

create index description_audits_site_priority_idx
  on public.description_audits (site_id, priority desc);

create index description_audits_site_score_idx
  on public.description_audits (site_id, description_score asc);

alter table public.description_audits enable row level security;

create policy "Members can read description audits"
  on public.description_audits for select
  to authenticated
  using (
    exists (
      select 1
      from public.sites s
      join public.memberships m on m.organization_id = s.organization_id
      where s.id = description_audits.site_id
      and m.user_id = auth.uid()
    )
  );
