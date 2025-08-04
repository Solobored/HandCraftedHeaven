create table public.messages (
  id uuid not null default gen_random_uuid (),
  sender_id uuid not null,
  recipient_id uuid not null,
  product_id uuid null,
  order_id uuid null,
  subject text null,
  content text not null,
  read_at timestamp with time zone null,
  created_at timestamp with time zone null default now(),
  constraint messages_pkey primary key (id),
  constraint messages_order_id_fkey foreign KEY (order_id) references orders (id) on delete set null,
  constraint messages_product_id_fkey foreign KEY (product_id) references products (id) on delete set null,
  constraint messages_recipient_id_fkey foreign KEY (recipient_id) references users (id) on delete CASCADE,
  constraint messages_sender_id_fkey foreign KEY (sender_id) references users (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_messages_sender_id on public.messages using btree (sender_id) TABLESPACE pg_default;

create index IF not exists idx_messages_recipient_id on public.messages using btree (recipient_id) TABLESPACE pg_default;