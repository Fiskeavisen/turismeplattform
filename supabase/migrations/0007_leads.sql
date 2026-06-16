create type public.visibility_lead_status as enum (
  'scanning',
  'report_sent',
  'contacted',
  'won',
  'lost'
);

create table public.visibility_leads (
  id uuid primary key default gen_random_uuid(),
  website text not null,
  company_name text not null,
  org_number text,
  phone text not null,
  email text not null,
  brreg_verified boolean not null default false,
  scan_score integer check (scan_score is null or (scan_score >= 0 and scan_score <= 100)),
  status public.visibility_lead_status not null default 'scanning',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index visibility_leads_created_idx
  on public.visibility_leads (created_at desc);

alter table public.visibility_leads enable row level security;

-- Det offentlige skjemaet kan opprette leads (anon-nøkkel). Lesing skjer via service_role
-- i admin-panelet, som uansett går utenom RLS, så vi gir ingen select-policy til vanlige brukere.
create policy "Anyone can submit a lead"
  on public.visibility_leads for insert
  to anon, authenticated
  with check (true);
