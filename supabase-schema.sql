-- KISAAN BAZAAR starter database schema (Supabase SQL Editor)
-- Run only after reviewing the policies and setting up Supabase Auth.
create extension if not exists pgcrypto;

create table if not exists public.farmer_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text not null,
  city text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  farmer_id uuid not null references public.farmer_profiles(id) on delete cascade,
  name text not null,
  category text not null,
  price numeric(12,2) not null check (price > 0),
  unit text not null,
  quantity text not null,
  image_url text,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  phone text not null,
  delivery_address text not null,
  status text not null default 'new',
  subtotal numeric(12,2) not null check (subtotal >= 0),
  platform_fee numeric(12,2) not null default 0 check (platform_fee >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  farmer_id uuid not null references public.farmer_profiles(id),
  product_name text not null,
  quantity numeric(12,2) not null check (quantity > 0),
  unit text not null,
  unit_price numeric(12,2) not null check (unit_price >= 0)
);

alter table public.farmer_profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Public visitors can view active products. Farmers manage only their own profile/products.
create policy "Public can view active products" on public.products
for select using (is_active = true);

create policy "Farmers can insert own profile" on public.farmer_profiles
for insert to authenticated with check (id = auth.uid());

create policy "Farmers can view own profile" on public.farmer_profiles
for select to authenticated using (id = auth.uid());

create policy "Farmers can update own profile" on public.farmer_profiles
for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

create policy "Farmers can insert own products" on public.products
for insert to authenticated with check (farmer_id = auth.uid());

create policy "Farmers can update own products" on public.products
for update to authenticated using (farmer_id = auth.uid()) with check (farmer_id = auth.uid());

create policy "Farmers can delete own products" on public.products
for delete to authenticated using (farmer_id = auth.uid());

-- Orders intentionally have no public insert/read policy yet.
-- Add secure order policies or an Edge Function before accepting real customer orders.
-- Never put the Supabase service_role key in browser code.
