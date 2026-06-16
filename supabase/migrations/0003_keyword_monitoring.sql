create type public.visibility_keyword_alert_type as enum (
  'near_top_3',
  'low_ctr',
  'position_drop',
  'new_query',
  'wrong_url',
  'competitor_gap',
  'serp_feature_opportunity'
);

create type public.visibility_keyword_alert_severity as enum ('low', 'medium', 'high');
create type public.visibility_keyword_status as enum ('watching', 'action_needed', 'measuring', 'ignored');

create table public.monitored_keywords (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  keyword text not null,
  target_url text not null,
  current_url text not null,
  intent public.visibility_search_intent not null,
  priority integer not null default 50 check (priority >= 0 and priority <= 100),
  conversion_value text not null default 'medium' check (conversion_value in ('lav', 'medium', 'høy')),
  status public.visibility_keyword_status not null default 'watching',
  next_action text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (site_id, keyword)
);

create table public.keyword_position_snapshots (
  id uuid primary key default gen_random_uuid(),
  keyword_id uuid not null references public.monitored_keywords(id) on delete cascade,
  measured_at date not null,
  position numeric(8, 3) not null,
  best_position numeric(8, 3),
  clicks integer not null default 0,
  impressions integer not null default 0,
  ctr numeric(8, 6) not null default 0,
  current_url text not null,
  serp_features_json jsonb not null default '[]'::jsonb,
  competitors_json jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  unique (keyword_id, measured_at)
);

create index keyword_position_snapshots_keyword_date_idx
  on public.keyword_position_snapshots (keyword_id, measured_at desc);

create table public.keyword_alerts (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  keyword_id uuid not null references public.monitored_keywords(id) on delete cascade,
  type public.visibility_keyword_alert_type not null,
  severity public.visibility_keyword_alert_severity not null default 'medium',
  title text not null,
  description text not null,
  recommended_action text not null,
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);

create index keyword_alerts_site_created_idx on public.keyword_alerts (site_id, created_at desc);

create table public.keyword_clusters (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  name text not null,
  intent public.visibility_search_intent not null,
  commercial_value integer not null default 50 check (commercial_value >= 0 and commercial_value <= 100),
  coverage_score integer not null default 50 check (coverage_score >= 0 and coverage_score <= 100),
  keyword_ids_json jsonb not null default '[]'::jsonb,
  winning_page_type text not null,
  gap text not null,
  recommended_next_step text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.competitor_observations (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  competitor text not null,
  domain text not null,
  shared_keywords integer not null default 0,
  stronger_on_json jsonb not null default '[]'::jsonb,
  weaker_on_json jsonb not null default '[]'::jsonb,
  content_patterns_json jsonb not null default '[]'::jsonb,
  recommended_response text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (site_id, domain)
);

alter table public.monitored_keywords enable row level security;
alter table public.keyword_position_snapshots enable row level security;
alter table public.keyword_alerts enable row level security;
alter table public.keyword_clusters enable row level security;
alter table public.competitor_observations enable row level security;

create policy "Members can read monitored keywords"
  on public.monitored_keywords for select
  to authenticated
  using (
    exists (
      select 1
      from public.sites s
      join public.memberships m on m.organization_id = s.organization_id
      where s.id = monitored_keywords.site_id
      and m.user_id = auth.uid()
    )
  );

create policy "Members can read keyword snapshots"
  on public.keyword_position_snapshots for select
  to authenticated
  using (
    exists (
      select 1
      from public.monitored_keywords k
      join public.sites s on s.id = k.site_id
      join public.memberships m on m.organization_id = s.organization_id
      where k.id = keyword_position_snapshots.keyword_id
      and m.user_id = auth.uid()
    )
  );

create policy "Members can read keyword alerts"
  on public.keyword_alerts for select
  to authenticated
  using (
    exists (
      select 1
      from public.sites s
      join public.memberships m on m.organization_id = s.organization_id
      where s.id = keyword_alerts.site_id
      and m.user_id = auth.uid()
    )
  );

create policy "Members can read keyword clusters"
  on public.keyword_clusters for select
  to authenticated
  using (
    exists (
      select 1
      from public.sites s
      join public.memberships m on m.organization_id = s.organization_id
      where s.id = keyword_clusters.site_id
      and m.user_id = auth.uid()
    )
  );

create policy "Members can read competitor observations"
  on public.competitor_observations for select
  to authenticated
  using (
    exists (
      select 1
      from public.sites s
      join public.memberships m on m.organization_id = s.organization_id
      where s.id = competitor_observations.site_id
      and m.user_id = auth.uid()
    )
  );
