alter type public.visibility_integration_type add value if not exists 'google_ads';
alter type public.visibility_integration_type add value if not exists 'meta_ads';
alter type public.visibility_action_category add value if not exists 'paid_ads';

create type public.visibility_paid_ads_channel as enum (
  'google_ads',
  'meta_ads',
  'linkedin_ads',
  'microsoft_ads'
);

create type public.visibility_paid_ads_alert_type as enum (
  'spend_spike',
  'cpa_increase',
  'roas_drop',
  'low_quality_score',
  'landing_page_mismatch',
  'organic_paid_overlap',
  'budget_limited',
  'conversion_drop'
);

create type public.visibility_paid_ads_alert_severity as enum (
  'low',
  'medium',
  'high'
);

create table public.paid_ads_campaigns (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  channel public.visibility_paid_ads_channel not null,
  external_campaign_id text,
  name text not null,
  status text not null default 'enabled',
  objective text not null default 'leads',
  spend numeric(12,2) not null default 0,
  previous_spend numeric(12,2) not null default 0,
  impressions integer not null default 0,
  clicks integer not null default 0,
  ctr numeric(8,5) not null default 0,
  cpc numeric(10,2) not null default 0,
  conversions numeric(10,2) not null default 0,
  conversion_rate numeric(8,5) not null default 0,
  cost_per_conversion numeric(12,2) not null default 0,
  revenue numeric(12,2),
  roas numeric(8,2),
  landing_page text not null default '/',
  quality_score integer check (quality_score is null or (quality_score >= 1 and quality_score <= 10)),
  next_action text not null default '',
  synced_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.paid_ads_alerts (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  campaign_id uuid references public.paid_ads_campaigns(id) on delete cascade,
  type public.visibility_paid_ads_alert_type not null,
  severity public.visibility_paid_ads_alert_severity not null default 'medium',
  title text not null,
  description text not null,
  recommended_action text not null,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table public.paid_landing_page_observations (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  url text not null,
  paid_spend numeric(12,2) not null default 0,
  paid_conversions numeric(10,2) not null default 0,
  organic_clicks integer not null default 0,
  page_score integer not null default 50 check (page_score >= 0 and page_score <= 100),
  issue text not null,
  recommended_action text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (site_id, url)
);

create index paid_ads_campaigns_site_channel_idx
  on public.paid_ads_campaigns (site_id, channel);

create index paid_ads_alerts_site_severity_idx
  on public.paid_ads_alerts (site_id, severity, created_at desc);

create index paid_landing_page_observations_site_score_idx
  on public.paid_landing_page_observations (site_id, page_score asc);

alter table public.paid_ads_campaigns enable row level security;
alter table public.paid_ads_alerts enable row level security;
alter table public.paid_landing_page_observations enable row level security;

create policy "Members can read paid ads campaigns"
  on public.paid_ads_campaigns for select
  to authenticated
  using (
    exists (
      select 1
      from public.sites s
      join public.memberships m on m.organization_id = s.organization_id
      where s.id = paid_ads_campaigns.site_id
      and m.user_id = auth.uid()
    )
  );

create policy "Members can read paid ads alerts"
  on public.paid_ads_alerts for select
  to authenticated
  using (
    exists (
      select 1
      from public.sites s
      join public.memberships m on m.organization_id = s.organization_id
      where s.id = paid_ads_alerts.site_id
      and m.user_id = auth.uid()
    )
  );

create policy "Members can read paid landing page observations"
  on public.paid_landing_page_observations for select
  to authenticated
  using (
    exists (
      select 1
      from public.sites s
      join public.memberships m on m.organization_id = s.organization_id
      where s.id = paid_landing_page_observations.site_id
      and m.user_id = auth.uid()
    )
  );
