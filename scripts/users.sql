create table public.users (
  id uuid not null,
  email text not null,
  full_name text null,
  avatar_url text null,
  role public.user_role null default 'buyer'::user_role,
  bio text null,
  location text null,
  website text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  name text null,
  seller_name text null,
  phone text null,
  address text null,
  constraint users_pkey primary key (id),
  constraint users_email_key unique (email),
  constraint users_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_users_name on public.users using btree (name) TABLESPACE pg_default;

create index IF not exists idx_users_seller_name on public.users using btree (seller_name) TABLESPACE pg_default;

create index IF not exists idx_users_email on public.users using btree (email) TABLESPACE pg_default;

create index IF not exists idx_users_role on public.users using btree (role) TABLESPACE pg_default;

create trigger update_users_updated_at BEFORE
update on users for EACH row
execute FUNCTION update_updated_at_column ();