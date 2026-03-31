create table articles (
  id bigint generated always as identity primary key,
  title text not null,
  category text not null,
  content text not null,
  author text not null,
  featured boolean default false,
  image_url text default '',
  created_at timestamptz default now()
);

alter table articles enable row level security;

create policy "Allow anonymous read"
  on articles for select
  to anon
  using (true);

create policy "Allow anonymous insert"
  on articles for insert
  to anon
  with check (true);

create policy "Allow anonymous update"
  on articles for update
  to anon
  using (true);

create policy "Allow anonymous delete"
  on articles for delete
  to anon
  using (true);
