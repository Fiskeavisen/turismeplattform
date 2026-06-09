create extension if not exists "pgcrypto";

create type public.locale as enum ('nb', 'en', 'de');
create type public.booking_status as enum ('draft', 'pending', 'confirmed', 'paid', 'cancelled');
create type public.payment_provider as enum ('stripe', 'vipps', 'manual');
create type public.section_type as enum (
  'hero',
  'booking',
  'activities',
  'accommodation',
  'articles',
  'reviews',
  'map',
  'faq',
  'cta'
);

create table public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  default_locale public.locale not null default 'nb',
  enabled_locales public.locale[] not null default array['nb', 'en', 'de']::public.locale[],
  created_at timestamptz not null default now()
);

create table public.theme_settings (
  tenant_id uuid primary key references public.tenants(id) on delete cascade,
  template text not null default 'coastal',
  logo_url text,
  primary_color text not null default '#082f49',
  secondary_color text not null default '#e8dfcf',
  accent_color text not null default '#d6a75f',
  background_color text not null default '#f7f3eb',
  heading_font text not null default 'serif',
  body_font text not null default 'sans',
  border_radius text not null default 'rounded',
  updated_at timestamptz not null default now()
);

create table public.page_sections (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  type public.section_type not null,
  title text not null,
  enabled boolean not null default true,
  sort_order integer not null default 0,
  settings jsonb not null default '{}'::jsonb,
  content jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.activities (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  slug text not null,
  title jsonb not null,
  teaser jsonb not null default '{}'::jsonb,
  description jsonb not null default '{}'::jsonb,
  category text not null,
  duration text,
  price_from integer,
  image_url text,
  capacity integer,
  bookable boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, slug)
);

create table public.accommodations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  slug text not null,
  title jsonb not null,
  description jsonb not null default '{}'::jsonb,
  beds integer not null default 0,
  guests integer not null default 0,
  price_from integer,
  image_url text,
  amenities text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, slug)
);

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  slug text not null,
  title jsonb not null,
  excerpt jsonb not null default '{}'::jsonb,
  body jsonb not null default '{}'::jsonb,
  category text not null,
  image_url text,
  reading_minutes integer not null default 4,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, slug)
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  guest_name text not null,
  guest_email text not null,
  guest_phone text,
  product_type text not null,
  product_id uuid,
  product_title text not null,
  arrival_date date not null,
  departure_date date,
  guests integer not null default 1,
  status public.booking_status not null default 'pending',
  payment_provider public.payment_provider not null default 'manual',
  payment_reference text,
  total_amount integer not null default 0,
  source text not null default 'website',
  language public.locale not null default 'nb',
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.booking_messages (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  sender_type text not null check (sender_type in ('guest', 'admin', 'system')),
  message text not null,
  created_at timestamptz not null default now()
);

create table public.email_templates (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  trigger text not null,
  name text not null,
  subject jsonb not null,
  body jsonb not null,
  updated_at timestamptz not null default now(),
  unique (tenant_id, trigger)
);

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  question jsonb not null,
  answer jsonb not null,
  category text not null,
  sort_order integer not null default 0,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  guest_name text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  source text not null default 'manual',
  quote jsonb not null,
  external_url text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.tenants enable row level security;
alter table public.theme_settings enable row level security;
alter table public.page_sections enable row level security;
alter table public.activities enable row level security;
alter table public.accommodations enable row level security;
alter table public.articles enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_messages enable row level security;
alter table public.email_templates enable row level security;
alter table public.faqs enable row level security;
alter table public.reviews enable row level security;

create policy "Public can read tenants"
  on public.tenants for select
  using (true);

create policy "Public can read theme settings"
  on public.theme_settings for select
  using (true);

create policy "Public can read enabled sections"
  on public.page_sections for select
  using (enabled = true);

create policy "Public can read activities"
  on public.activities for select
  using (true);

create policy "Public can read accommodations"
  on public.accommodations for select
  using (true);

create policy "Public can read published articles"
  on public.articles for select
  using (published_at is not null);

create policy "Public can read enabled FAQs"
  on public.faqs for select
  using (enabled = true);

create policy "Public can read published reviews"
  on public.reviews for select
  using (published_at is not null);

create policy "Authenticated admins can manage bookings"
  on public.bookings for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated admins can manage content"
  on public.page_sections for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated admins can manage activities"
  on public.activities for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated admins can manage accommodations"
  on public.accommodations for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated admins can manage articles"
  on public.articles for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated admins can manage messages"
  on public.booking_messages for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated admins can manage email templates"
  on public.email_templates for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated admins can manage FAQs"
  on public.faqs for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated admins can manage reviews"
  on public.reviews for all
  to authenticated
  using (true)
  with check (true);
