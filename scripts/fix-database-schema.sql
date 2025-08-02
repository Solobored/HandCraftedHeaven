-- Add missing slug column to categories table
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS slug TEXT;

-- Update existing categories with slugs based on names
UPDATE public.categories SET slug = LOWER(REPLACE(name, ' ', '-')) WHERE slug IS NULL;

-- Make slug column NOT NULL and UNIQUE after updating
ALTER TABLE public.categories ALTER COLUMN slug SET NOT NULL;
ALTER TABLE public.categories ADD CONSTRAINT categories_slug_unique UNIQUE (slug);

-- Add missing name column to users table (rename full_name to name for consistency)
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS name TEXT;

-- Copy data from full_name to name if it exists
UPDATE public.users SET name = full_name WHERE name IS NULL AND full_name IS NOT NULL;

-- Add missing columns to products table to match the API expectations
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS stock INTEGER DEFAULT 0;

-- Update stock_quantity to stock for consistency
UPDATE public.products SET stock = stock_quantity WHERE stock = 0 AND stock_quantity > 0;

-- Add missing columns to orders table
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES public.users(id) ON DELETE CASCADE;

-- Copy buyer_id to user_id for consistency
UPDATE public.orders SET user_id = buyer_id WHERE user_id IS NULL;

-- Add missing columns to order_items table
ALTER TABLE public.order_items ADD COLUMN IF NOT EXISTS price_at_purchase DECIMAL(10,2);

-- Update price_at_purchase from unit_price
UPDATE public.order_items SET price_at_purchase = unit_price WHERE price_at_purchase IS NULL;

-- Create indexes for new columns
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_users_name ON public.users(name);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
