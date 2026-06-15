-- Запустить в Supabase → SQL Editor

create table public.bookings (
  id               uuid primary key default gen_random_uuid(),
  client_name      text not null,
  client_phone     text not null,
  service_id       text not null,
  service_name     text not null,
  booking_date     date not null,
  booking_time     time not null,
  duration_minutes integer not null,
  status           text not null default 'pending'
                     check (status in ('pending', 'confirmed', 'cancelled')),
  created_at       timestamptz not null default now()
);

-- Индекс для быстрого поиска по дате
create index bookings_date_idx on public.bookings (booking_date);

-- Row Level Security — публичный доступ только на вставку
alter table public.bookings enable row level security;

create policy "Anyone can create a booking"
  on public.bookings for insert
  with check (true);

create policy "Anyone can read bookings by date"
  on public.bookings for select
  using (true);
