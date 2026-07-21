-- Выполнить в Supabase: SQL Editor → New query → вставить всё → Run
create table events (
  id bigint generated always as identity primary key,
  title text not null,
  city text not null,
  date date not null,
  category text not null,
  description text not null,
  spots int not null default 20
);

create table signups (
  id bigint generated always as identity primary key,
  event_id bigint references events on delete cascade,
  name text not null,
  contact text not null,
  created_at timestamptz default now()
);

create table feedback (
  id bigint generated always as identity primary key,
  name text,
  role text,
  rating int,
  text text,
  created_at timestamptz default now()
);

alter table events enable row level security;
alter table signups enable row level security;
alter table feedback enable row level security;

create policy "read events" on events for select to anon using (true);
create policy "add event" on events for insert to anon with check (true);
create policy "read signups" on signups for select to anon using (true);
create policy "join" on signups for insert to anon with check (true);
create policy "send feedback" on feedback for insert to anon with check (true);

-- Регистрация координаторов: админ одобряет в Supabase dashboard (approved = true)
create table if not exists coordinator_requests (
  id bigint generated always as identity primary key,
  email text not null unique,
  approved boolean default false,
  created_at timestamptz default now()
);

alter table coordinator_requests enable row level security;

create policy "read coordinator_requests" on coordinator_requests for select to anon, authenticated using (true);
create policy "insert coordinator_requests" on coordinator_requests for insert to anon, authenticated with check (true);
create policy "update coordinator_requests" on coordinator_requests for update to anon, authenticated using (true) with check (true);

insert into events (title, city, date, category, description, spots) values
('Субботник на набережной', 'Атырау', '2026-07-25', 'Экология', 'Уборка мусора на набережной Урала. Перчатки и пакеты выдаём на месте.', 30),
('Посадка деревьев в парке', 'Алматы', '2026-08-01', 'Экология', 'Сажаем 100 саженцев вместе с NVS. Инструмент предоставляется.', 25),
('Праздник для детей с инвалидностью', 'Астана', '2026-08-08', 'Дети', 'Помогаем провести праздник с Zhurekten Zhurekke: игры, подарки, аниматоры.', 15);

-- Check-in на площадке (выполнить и для уже созданной БД)
alter table signups add column if not exists checked_in_at timestamptz;
drop policy if exists "check in" on signups;
create policy "check in" on signups for update to anon using (true) with check (true);

-- Проверяемые цифровые сертификаты (выполнить после миграции check-in)
alter table signups add column if not exists certificate_code text unique;
alter table signups add column if not exists certificate_issued_at timestamptz;
