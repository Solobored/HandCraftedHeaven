create table public.products (
  id uuid not null default gen_random_uuid (),
  seller_id uuid not null,
  category_id uuid null,
  name text not null,
  description text null,
  price numeric(10, 2) not null,
  images text[] null default '{}'::text[],
  status public.product_status null default 'pending'::product_status,
  stock integer null default 0,
  weight numeric(8, 2) null,
  dimensions text null,
  materials text[] null,
  care_instructions text null,
  shipping_info text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  image_url text null,
  constraint products_pkey primary key (id),
  constraint products_category_id_fkey foreign KEY (category_id) references categories (id) on delete set null,
  constraint products_seller_id_fkey foreign KEY (seller_id) references users (id) on delete CASCADE,
  constraint products_price_check check ((price > (0)::numeric)),
  constraint products_stock_quantity_check check ((stock >= 0))
) TABLESPACE pg_default;

create index IF not exists idx_products_seller_id on public.products using btree (seller_id) TABLESPACE pg_default;

create index IF not exists idx_products_category_id on public.products using btree (category_id) TABLESPACE pg_default;

create index IF not exists idx_products_status on public.products using btree (status) TABLESPACE pg_default;

create index IF not exists idx_products_created_at on public.products using btree (created_at desc) TABLESPACE pg_default;

create index IF not exists idx_products_image_url on public.products using btree (image_url) TABLESPACE pg_default;

create trigger update_products_updated_at BEFORE
update on products for EACH row
execute FUNCTION update_updated_at_column ();