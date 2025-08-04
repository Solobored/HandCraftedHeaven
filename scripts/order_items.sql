create table public.order_items (
  id uuid not null default gen_random_uuid (),
  order_id uuid not null,
  product_id uuid not null,
  seller_id uuid not null,
  quantity integer not null,
  unit_price numeric(10, 2) not null,
  total_price numeric(10, 2) not null,
  created_at timestamp with time zone null default now(),
  price_at_purchase numeric(10, 2) null,
  constraint order_items_pkey primary key (id),
  constraint order_items_seller_id_fkey foreign KEY (seller_id) references users (id) on delete CASCADE,
  constraint order_items_product_id_fkey foreign KEY (product_id) references products (id) on delete CASCADE,
  constraint order_items_order_id_fkey foreign KEY (order_id) references orders (id) on delete CASCADE,
  constraint order_items_quantity_check check ((quantity > 0)),
  constraint order_items_total_price_check check ((total_price > (0)::numeric)),
  constraint order_items_unit_price_check check ((unit_price > (0)::numeric))
) TABLESPACE pg_default;

create index IF not exists idx_order_items_order_id on public.order_items using btree (order_id) TABLESPACE pg_default;

create index IF not exists idx_order_items_product_id on public.order_items using btree (product_id) TABLESPACE pg_default;

create index IF not exists idx_order_items_seller_id on public.order_items using btree (seller_id) TABLESPACE pg_default;

create trigger update_product_stock_trigger
after INSERT on order_items for EACH row
execute FUNCTION update_product_stock ();