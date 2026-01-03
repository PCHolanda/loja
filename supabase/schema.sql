-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create products table
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  price integer not null, -- Price in cents
  image_url text,
  type text check (type in ('course', 'simulation')) not null,
  content_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create orders table
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  status text check (status in ('pending', 'paid', 'canceled', 'failed')) not null default 'pending',
  total integer not null,
  payment_id text, -- Transaction ID from Pagar.me
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create order items
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) not null,
  product_id uuid references public.products(id) not null,
  price integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create enrollments (access control)
create table public.enrollments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  product_id uuid references public.products(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, product_id)
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.enrollments enable row level security;

-- Policies

-- Profiles
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- Products
create policy "Products are viewable by everyone." on public.products for select using (true);

-- Orders
create policy "Users can view own orders." on public.orders for select using (auth.uid() = user_id);
create policy "Users can insert own orders." on public.orders for insert with check (auth.uid() = user_id);

-- Order Items
create policy "Users can view own order items." on public.order_items for select using (
  exists ( select 1 from public.orders where id = order_items.order_id and user_id = auth.uid() )
);

-- Enrollments
create policy "Users can view own enrollments." on public.enrollments for select using (auth.uid() = user_id);
