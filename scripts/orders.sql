create table public.orders (
  id uuid not null default gen_random_uuid (),
  buyer_id uuid not null,
  total_amount numeric(10, 2) not null,
  status public.order_status null default 'pending'::order_status,
  shipping_address jsonb not null,
  billing_address jsonb null,
  payment_method text null,
  payment_status text null default 'pending'::text,
  tracking_number text null,
  notes text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  user_id uuid null,
  constraint orders_pkey primary key (id),
  constraint orders_buyer_id_fkey foreign KEY (buyer_id) references users (id) on delete CASCADE,
  constraint orders_user_id_fkey foreign KEY (user_id) references users (id) on delete CASCADE,
  constraint orders_total_amount_check check ((total_amount > (0)::numeric))
) TABLESPACE pg_default;

create index IF not exists idx_orders_buyer_id on public.orders using btree (buyer_id) TABLESPACE pg_default;

create index IF not exists idx_orders_status on public.orders using btree (status) TABLESPACE pg_default;

create index IF not exists idx_orders_user_id on public.orders using btree (user_id) TABLESPACE pg_default;

create trigger update_orders_updated_at BEFORE
update on orders for EACH row
execute FUNCTION update_updated_at_column ();