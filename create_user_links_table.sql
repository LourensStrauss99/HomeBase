-- Create user_links table
create table public.user_links (
  id uuid not null default gen_random_uuid (),
  user_id uuid not null,
  name character varying(100) not null,
  url text not null,
  icon character varying(50) null,
  click_count integer null default 0,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint user_links_pkey primary key (id),
  constraint user_links_user_id_fkey foreign key (user_id) references public.users (id) on delete cascade
) TABLESPACE pg_default;

-- Create indexes
create index IF not exists idx_user_links_user_id on public.user_links using btree (user_id) TABLESPACE pg_default;
create index IF not exists idx_user_links_created_at on public.user_links using btree (created_at) TABLESPACE pg_default;

-- Enable RLS
alter table public.user_links enable row level security;

-- RLS Policies
create policy "Users can view their own links" on public.user_links
  for select using (auth.uid() = user_id);

create policy "Users can insert their own links" on public.user_links
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own links" on public.user_links
  for update using (auth.uid() = user_id);

create policy "Users can delete their own links" on public.user_links
  for delete using (auth.uid() = user_id);