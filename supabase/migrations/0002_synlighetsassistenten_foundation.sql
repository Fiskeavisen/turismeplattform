create extension if not exists "pgcrypto";

create type public.visibility_plan as enum ('starter', 'growth', 'pro_agency', 'done_for_you');
create type public.visibility_role as enum ('owner', 'admin', 'member', 'viewer');
create type public.visibility_cms_type as enum ('none', 'wordpress', 'shopify', 'webflow', 'custom');
create type public.visibility_connection_status as enum ('connected', 'needs_setup', 'mocked', 'error', 'coming_soon', 'revoked');
create type public.visibility_action_status as enum ('new', 'approved', 'sent_to_cms', 'in_progress', 'completed', 'measuring', 'ignored', 'failed');
create type public.visibility_action_category as enum (
  'technical_seo',
  'content_gap',
  'ctr_optimization',
  'content_decay',
  'answer_readiness',
  'entity_authority',
  'local_visibility',
  'structured_data',
  'conversion_opportunity',
  'ai_visibility_gap',
  'agent_readiness',
  'reputation_signal',
  'internal_linking'
);
create type public.visibility_difficulty as enum ('low', 'medium', 'high');
create type public.visibility_qa_status as enum ('passed', 'needs_review', 'rejected');
create type public.visibility_report_status as enum ('draft', 'needs_review', 'approved', 'sent', 'failed');
create type public.visibility_integration_type as enum (
  'google_search_console',
  'google_analytics',
  'wordpress',
  'shopify',
  'google_business_profile',
  'bing_webmaster_tools',
  'slack',
  'trello',
  'asana',
  'clickup'
);
create type public.visibility_search_intent as enum (
  'transactional_intent',
  'local_intent',
  'commercial_research',
  'price_cost_comparison',
  'problem_friction_intent',
  'trust_safety_doubt',
  'ai_answer_intent'
);

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text not null unique,
  image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  plan public.visibility_plan not null default 'starter',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  role public.visibility_role not null default 'member',
  created_at timestamptz not null default now(),
  unique (user_id, organization_id)
);

create table public.sites (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  domain text not null,
  name text not null,
  default_country text not null default 'NO',
  default_language text not null default 'nb',
  cms_type public.visibility_cms_type not null default 'none',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, domain)
);

create table public.google_connections (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid references public.users(id) on delete set null,
  access_token_encrypted text,
  refresh_token_encrypted text,
  scopes text[] not null default '{}',
  expires_at timestamptz,
  status public.visibility_connection_status not null default 'needs_setup',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.gsc_properties (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  google_connection_id uuid references public.google_connections(id) on delete set null,
  site_url text not null,
  permission_level text,
  is_selected boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.ga4_properties (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  google_connection_id uuid references public.google_connections(id) on delete set null,
  property_id text not null,
  display_name text not null,
  is_selected boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.gsc_daily_rows (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  date date not null,
  page text not null,
  query text not null,
  device text not null default 'all',
  country text not null default 'NO',
  clicks integer not null default 0,
  impressions integer not null default 0,
  ctr numeric(8, 6) not null default 0,
  position numeric(8, 3) not null default 0,
  created_at timestamptz not null default now(),
  unique (site_id, date, page, query, device, country)
);

create index gsc_daily_rows_site_date_idx on public.gsc_daily_rows (site_id, date);
create index gsc_daily_rows_site_page_idx on public.gsc_daily_rows (site_id, page);
create index gsc_daily_rows_site_query_idx on public.gsc_daily_rows (site_id, query);
create index gsc_daily_rows_site_page_query_idx on public.gsc_daily_rows (site_id, page, query);

create table public.ga4_daily_rows (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  date date not null,
  landing_page text not null,
  source_medium text not null default 'google / organic',
  sessions integer not null default 0,
  engaged_sessions integer not null default 0,
  engagement_rate numeric(8, 6) not null default 0,
  conversions numeric(12, 2) not null default 0,
  revenue numeric(12, 2) not null default 0,
  created_at timestamptz not null default now(),
  unique (site_id, date, landing_page, source_medium)
);

create table public.page_snapshots (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  url text not null,
  title text,
  meta_description text,
  h1 text,
  headings_json jsonb not null default '[]'::jsonb,
  body_excerpt text,
  word_count integer not null default 0,
  status_code integer,
  canonical text,
  robots_meta text,
  schema_json jsonb not null default '[]'::jsonb,
  internal_links_json jsonb not null default '[]'::jsonb,
  external_links_json jsonb not null default '[]'::jsonb,
  crawled_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index page_snapshots_site_url_idx on public.page_snapshots (site_id, url);

create table public.opportunities (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  url text not null,
  query text,
  category public.visibility_action_category not null,
  opportunity_type text not null,
  score integer not null check (score >= 0 and score <= 100),
  evidence_json jsonb not null default '{}'::jsonb,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.recommendations (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid references public.opportunities(id) on delete set null,
  site_id uuid not null references public.sites(id) on delete cascade,
  title text not null,
  issue text not null,
  recommendation text not null,
  why_it_matters text not null,
  suggested_change_json jsonb not null default '{}'::jsonb,
  implementation_steps_json jsonb not null default '[]'::jsonb,
  expected_impact text not null,
  difficulty public.visibility_difficulty not null default 'medium',
  estimated_time_minutes integer not null default 30,
  confidence numeric(4, 3) not null default 0.5,
  ai_model text,
  input_tokens integer not null default 0,
  output_tokens integer not null default 0,
  cost_estimate numeric(12, 6) not null default 0,
  qa_status public.visibility_qa_status not null default 'needs_review',
  qa_score integer not null default 0 check (qa_score >= 0 and qa_score <= 100),
  qa_issues_json jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.actions (
  id uuid primary key default gen_random_uuid(),
  recommendation_id uuid references public.recommendations(id) on delete set null,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  site_id uuid not null references public.sites(id) on delete cascade,
  assigned_to_user_id uuid references public.users(id) on delete set null,
  status public.visibility_action_status not null default 'new',
  due_date date,
  completed_at timestamptz,
  measurement_start_at timestamptz,
  measurement_end_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.measurements (
  id uuid primary key default gen_random_uuid(),
  action_id uuid not null references public.actions(id) on delete cascade,
  clicks_before integer not null default 0,
  clicks_after integer not null default 0,
  impressions_before integer not null default 0,
  impressions_after integer not null default 0,
  ctr_before numeric(8, 6) not null default 0,
  ctr_after numeric(8, 6) not null default 0,
  position_before numeric(8, 3) not null default 0,
  position_after numeric(8, 3) not null default 0,
  conversions_before numeric(12, 2) not null default 0,
  conversions_after numeric(12, 2) not null default 0,
  measured_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table public.weekly_reports (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  site_id uuid not null references public.sites(id) on delete cascade,
  week_start date not null,
  week_end date not null,
  summary text not null,
  html text not null default '',
  status public.visibility_report_status not null default 'draft',
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.integrations (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  type public.visibility_integration_type not null,
  status public.visibility_connection_status not null default 'needs_setup',
  config_encrypted text,
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (site_id, type)
);

create table public.ai_visibility_tests (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  prompt text not null,
  tested_at timestamptz not null default now(),
  model_provider text not null,
  mentioned_brand boolean not null default false,
  mentioned_competitors jsonb not null default '[]'::jsonb,
  cited_sources jsonb not null default '[]'::jsonb,
  summary text not null,
  gaps jsonb not null default '[]'::jsonb,
  recommended_actions jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table public.search_ownership_segments (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  category public.visibility_search_intent not null,
  user_need text not null,
  winning_page_type text not null,
  commercial_value integer not null default 50 check (commercial_value >= 0 and commercial_value <= 100),
  difficulty integer not null default 50 check (difficulty >= 0 and difficulty <= 100),
  gaps_json jsonb not null default '[]'::jsonb,
  recommended_next_step text not null,
  relevant_urls_json jsonb not null default '[]'::jsonb,
  missing_urls_json jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.content_waves (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  wave_number integer not null check (wave_number between 1 and 4),
  name text not null,
  description text not null,
  warnings_json jsonb not null default '[]'::jsonb,
  action_ids_json jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.ai_usage_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  site_id uuid references public.sites(id) on delete cascade,
  model text not null,
  task_type text not null,
  input_tokens integer not null default 0,
  output_tokens integer not null default 0,
  cost_estimate numeric(12, 6) not null default 0,
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid references public.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;
alter table public.organizations enable row level security;
alter table public.memberships enable row level security;
alter table public.sites enable row level security;
alter table public.google_connections enable row level security;
alter table public.gsc_properties enable row level security;
alter table public.ga4_properties enable row level security;
alter table public.gsc_daily_rows enable row level security;
alter table public.ga4_daily_rows enable row level security;
alter table public.page_snapshots enable row level security;
alter table public.opportunities enable row level security;
alter table public.recommendations enable row level security;
alter table public.actions enable row level security;
alter table public.measurements enable row level security;
alter table public.weekly_reports enable row level security;
alter table public.integrations enable row level security;
alter table public.ai_visibility_tests enable row level security;
alter table public.search_ownership_segments enable row level security;
alter table public.content_waves enable row level security;
alter table public.ai_usage_logs enable row level security;
alter table public.audit_logs enable row level security;

create policy "Users can read own profile"
  on public.users for select
  to authenticated
  using (id = auth.uid());

create policy "Users can update own profile"
  on public.users for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "Members can read memberships"
  on public.memberships for select
  to authenticated
  using (user_id = auth.uid());

create policy "Members can read organizations"
  on public.organizations for select
  to authenticated
  using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = organizations.id
      and m.user_id = auth.uid()
    )
  );

create policy "Members can read sites"
  on public.sites for select
  to authenticated
  using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = sites.organization_id
      and m.user_id = auth.uid()
    )
  );

create policy "Members can read google connections"
  on public.google_connections for select
  to authenticated
  using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = google_connections.organization_id
      and m.user_id = auth.uid()
    )
  );

create policy "Members can read GSC properties"
  on public.gsc_properties for select
  to authenticated
  using (
    exists (
      select 1
      from public.sites s
      join public.memberships m on m.organization_id = s.organization_id
      where s.id = gsc_properties.site_id
      and m.user_id = auth.uid()
    )
  );

create policy "Members can read GA4 properties"
  on public.ga4_properties for select
  to authenticated
  using (
    exists (
      select 1
      from public.sites s
      join public.memberships m on m.organization_id = s.organization_id
      where s.id = ga4_properties.site_id
      and m.user_id = auth.uid()
    )
  );

create policy "Owners and admins can manage sites"
  on public.sites for all
  to authenticated
  using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = sites.organization_id
      and m.user_id = auth.uid()
      and m.role in ('owner', 'admin')
    )
  )
  with check (
    exists (
      select 1 from public.memberships m
      where m.organization_id = sites.organization_id
      and m.user_id = auth.uid()
      and m.role in ('owner', 'admin')
    )
  );

create policy "Members can read org reports"
  on public.weekly_reports for select
  to authenticated
  using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = weekly_reports.organization_id
      and m.user_id = auth.uid()
    )
  );

create policy "Members can read org actions"
  on public.actions for select
  to authenticated
  using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = actions.organization_id
      and m.user_id = auth.uid()
    )
  );

create policy "Members can update org actions"
  on public.actions for update
  to authenticated
  using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = actions.organization_id
      and m.user_id = auth.uid()
      and m.role in ('owner', 'admin', 'member')
    )
  )
  with check (
    exists (
      select 1 from public.memberships m
      where m.organization_id = actions.organization_id
      and m.user_id = auth.uid()
      and m.role in ('owner', 'admin', 'member')
    )
  );

create policy "Members can read site data"
  on public.gsc_daily_rows for select
  to authenticated
  using (
    exists (
      select 1
      from public.sites s
      join public.memberships m on m.organization_id = s.organization_id
      where s.id = gsc_daily_rows.site_id
      and m.user_id = auth.uid()
    )
  );

create policy "Members can read ga4 data"
  on public.ga4_daily_rows for select
  to authenticated
  using (
    exists (
      select 1
      from public.sites s
      join public.memberships m on m.organization_id = s.organization_id
      where s.id = ga4_daily_rows.site_id
      and m.user_id = auth.uid()
    )
  );

create policy "Members can read page snapshots"
  on public.page_snapshots for select
  to authenticated
  using (
    exists (
      select 1
      from public.sites s
      join public.memberships m on m.organization_id = s.organization_id
      where s.id = page_snapshots.site_id
      and m.user_id = auth.uid()
    )
  );

create policy "Members can read opportunities"
  on public.opportunities for select
  to authenticated
  using (
    exists (
      select 1
      from public.sites s
      join public.memberships m on m.organization_id = s.organization_id
      where s.id = opportunities.site_id
      and m.user_id = auth.uid()
    )
  );

create policy "Members can read recommendations"
  on public.recommendations for select
  to authenticated
  using (
    exists (
      select 1
      from public.sites s
      join public.memberships m on m.organization_id = s.organization_id
      where s.id = recommendations.site_id
      and m.user_id = auth.uid()
    )
  );

create policy "Members can read integrations"
  on public.integrations for select
  to authenticated
  using (
    exists (
      select 1
      from public.sites s
      join public.memberships m on m.organization_id = s.organization_id
      where s.id = integrations.site_id
      and m.user_id = auth.uid()
    )
  );

create policy "Members can read measurements"
  on public.measurements for select
  to authenticated
  using (
    exists (
      select 1
      from public.actions a
      join public.memberships m on m.organization_id = a.organization_id
      where a.id = measurements.action_id
      and m.user_id = auth.uid()
    )
  );

create policy "Members can read AI visibility tests"
  on public.ai_visibility_tests for select
  to authenticated
  using (
    exists (
      select 1
      from public.sites s
      join public.memberships m on m.organization_id = s.organization_id
      where s.id = ai_visibility_tests.site_id
      and m.user_id = auth.uid()
    )
  );

create policy "Members can read search ownership"
  on public.search_ownership_segments for select
  to authenticated
  using (
    exists (
      select 1
      from public.sites s
      join public.memberships m on m.organization_id = s.organization_id
      where s.id = search_ownership_segments.site_id
      and m.user_id = auth.uid()
    )
  );

create policy "Members can read content waves"
  on public.content_waves for select
  to authenticated
  using (
    exists (
      select 1
      from public.sites s
      join public.memberships m on m.organization_id = s.organization_id
      where s.id = content_waves.site_id
      and m.user_id = auth.uid()
    )
  );

create policy "Members can read AI usage"
  on public.ai_usage_logs for select
  to authenticated
  using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = ai_usage_logs.organization_id
      and m.user_id = auth.uid()
      and m.role in ('owner', 'admin')
    )
  );

create policy "Members can read audit logs"
  on public.audit_logs for select
  to authenticated
  using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = audit_logs.organization_id
      and m.user_id = auth.uid()
      and m.role in ('owner', 'admin')
    )
  );
