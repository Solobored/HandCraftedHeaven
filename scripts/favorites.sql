create table public.favorites (
  id uuid not null default gen_random_uuid (),
  user_id uuid not null,
  product_id uuid not null,
  created_at timestamp with time zone null default now(),
  constraint favorites_pkey primary key (id),
  constraint favorites_user_id_product_id_key unique (user_id, product_id),
  constraint favorites_product_id_fkey foreign KEY (product_id) references products (id) on delete CASCADE,
  constraint favorites_user_id_fkey foreign KEY (user_id) references users (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_favorites_user_id on public.favorites using btree (user_id) TABLESPACE pg_default;