-- AutoValet – Supabase Schema
-- Run this in the Supabase SQL Editor to set up your database.

-- ─── Enable UUID extension ────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── Bookings table ───────────────────────────────────────────────────────────
create table if not exists public.bookings (
  id                  uuid primary key default uuid_generate_v4(),
  created_at          timestamptz not null default now(),

  -- Customer
  first_name          text not null,
  last_name           text not null,
  phone               text not null,

  -- Trip
  pickup_zip          text not null,
  dropoff_zip         text not null,

  -- Vehicle & Service
  vehicle_make_model  text not null,
  service_type        text not null check (service_type in ('maintenance','dealership','recall','other')),
  preferred_shop      text,

  -- Notes
  notes               text,

  -- Payment
  tip_amount          numeric(6,2),
  payment_method      text not null check (payment_method in ('card','applepay','googlepay')),

  -- Docs
  insurance_doc_url   text,

  -- Agreement
  agreed_to_terms     boolean not null default false,

  -- Status
  status              text not null default 'pending'
                        check (status in ('pending','confirmed','in_progress','completed','cancelled'))
);

-- ─── Row Level Security ───────────────────────────────────────────────────────
alter table public.bookings enable row level security;

-- Service role can do everything (used by API routes)
create policy "Service role full access"
  on public.bookings
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- Anon cannot read bookings (privacy)
-- Public INSERT is handled by the API route using the service role key

-- ─── Storage bucket for insurance docs ───────────────────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'booking-docs',
  'booking-docs',
  false,
  10485760, -- 10 MB
  array['image/jpeg','image/png','image/webp','application/pdf']
)
on conflict (id) do nothing;

-- Storage policy: service role only
create policy "Service role can manage booking-docs"
  on storage.objects
  for all
  using (bucket_id = 'booking-docs' and auth.role() = 'service_role')
  with check (bucket_id = 'booking-docs' and auth.role() = 'service_role');

-- ─── Indexes ──────────────────────────────────────────────────────────────────
create index if not exists bookings_created_at_idx on public.bookings (created_at desc);
create index if not exists bookings_status_idx     on public.bookings (status);
create index if not exists bookings_phone_idx      on public.bookings (phone);
