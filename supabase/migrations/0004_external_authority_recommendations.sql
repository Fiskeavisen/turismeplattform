create type public.visibility_external_authority_type as enum (
  'external_mentions',
  'outbound_citations',
  'reputation_signal',
  'expert_source'
);

alter table public.weekly_reports
  add column if not exists authority_advice_json jsonb not null default '[]'::jsonb;

create table public.external_authority_recommendations (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  title text not null,
  type public.visibility_external_authority_type not null,
  priority integer not null default 50 check (priority >= 0 and priority <= 100),
  related_url text not null,
  issue text not null,
  recommendation text not null,
  why_it_matters text not null,
  suggested_targets_json jsonb not null default '[]'::jsonb,
  measurement text not null,
  risk_note text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index external_authority_recommendations_site_priority_idx
  on public.external_authority_recommendations (site_id, priority desc);

alter table public.external_authority_recommendations enable row level security;

create policy "Members can read external authority recommendations"
  on public.external_authority_recommendations for select
  to authenticated
  using (
    exists (
      select 1
      from public.sites s
      join public.memberships m on m.organization_id = s.organization_id
      where s.id = external_authority_recommendations.site_id
      and m.user_id = auth.uid()
    )
  );
