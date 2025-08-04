create table public.reviews (
  id uuid not null default gen_random_uuid (),
  product_id uuid not null,
  buyer_id uuid not null,
  order_item_id uuid null,
  rating integer not null,
  title text null,
  comment text null,
  images text[] null default '{}'::text[],
  helpful_count integer null default 0,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint reviews_pkey primary key (id),
  constraint reviews_product_id_buyer_id_order_item_id_key unique (product_id, buyer_id, order_item_id),
  constraint reviews_buyer_id_fkey foreign KEY (buyer_id) references users (id) on delete CASCADE,
  constraint reviews_order_item_id_fkey foreign KEY (order_item_id) references order_items (id) on delete CASCADE,
  constraint reviews_product_id_fkey foreign KEY (product_id) references products (id) on delete CASCADE,
  constraint reviews_rating_check check (
    (
      (rating >= 1)
      and (rating <= 5)
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_reviews_product_id on public.reviews using btree (product_id) TABLESPACE pg_default;

create index IF not exists idx_reviews_buyer_id on public.reviews using btree (buyer_id) TABLESPACE pg_default;

create index IF not exists idx_reviews_rating on public.reviews using btree (rating) TABLESPACE pg_default;

create index IF not exists idx_reviews_created_at on public.reviews using btree (created_at) TABLESPACE pg_default;

create trigger update_reviews_updated_at BEFORE
update on reviews for EACH row
execute FUNCTION update_updated_at_column ();