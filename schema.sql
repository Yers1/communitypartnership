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

create policy "read events" on events for select to anon, authenticated using (true);
create policy "add event" on events for insert to anon with check (true);
create policy "read signups" on signups for select to anon, authenticated using (true);
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

-- SECURITY v3: сертификат выдаётся только подтверждённым координатором.
drop policy if exists "check in" on signups;
create policy "coordinator check in" on signups for update to authenticated
using (exists (select 1 from coordinator_requests where email = (auth.jwt() ->> 'email') and approved = true))
with check (exists (select 1 from coordinator_requests where email = (auth.jwt() ->> 'email') and approved = true));
drop policy if exists "add event" on events;
create policy "coordinator manages events" on events for insert to authenticated
with check (exists (select 1 from coordinator_requests where email = (auth.jwt() ->> 'email') and approved = true));
drop policy if exists "update coordinator_requests" on coordinator_requests;
drop policy if exists "read coordinator_requests" on coordinator_requests;
create policy "coordinator reads own request" on coordinator_requests for select to authenticated
using (email = (auth.jwt() ->> 'email'));
-- WAITLIST v1: автоматический резервный список.
alter table events add column if not exists default_hours numeric(5,2) not null default 3 check (default_hours >= 0.5 and default_hours <= 24);
alter table signups add column if not exists volunteer_hours numeric(5,2) check (volunteer_hours >= 0.5 and volunteer_hours <= 24);
alter table signups add column if not exists status text not null default 'confirmed';
alter table signups drop constraint if exists signups_status_check;
alter table signups add constraint signups_status_check check (status in ('confirmed', 'waitlist', 'no_show'));
create or replace function promote_waitlist_after_cancel() returns trigger language plpgsql security definer set search_path = public as $$
declare
  vacancy_event_id bigint;
begin
  if tg_op = 'DELETE' and old.status = 'confirmed' then
    vacancy_event_id := old.event_id;
  elsif tg_op = 'UPDATE' and old.status = 'confirmed' and new.status = 'no_show' then
    vacancy_event_id := old.event_id;
  end if;
  if vacancy_event_id is not null then
    update signups set status = 'confirmed' where id = (select id from signups where event_id = vacancy_event_id and status = 'waitlist' order by created_at asc limit 1);
  end if;
  if tg_op = 'DELETE' then return old; end if;
  return new;
end;
$$;
drop trigger if exists promote_waitlist_after_cancel on signups;
create trigger promote_waitlist_after_cancel after delete on signups for each row execute function promote_waitlist_after_cancel();
drop trigger if exists promote_waitlist_after_no_show on signups;
create trigger promote_waitlist_after_no_show after update of status on signups for each row execute function promote_waitlist_after_cancel();

-- Approved coordinators can maintain events as well as publish them.
drop policy if exists "coordinator updates events" on events;
create policy "coordinator updates events" on events for update to authenticated
using (exists (select 1 from coordinator_requests where email = (auth.jwt() ->> 'email') and approved = true))
with check (exists (select 1 from coordinator_requests where email = (auth.jwt() ->> 'email') and approved = true));
drop policy if exists "coordinator deletes events" on events;
create policy "coordinator deletes events" on events for delete to authenticated
using (exists (select 1 from coordinator_requests where email = (auth.jwt() ->> 'email') and approved = true));
