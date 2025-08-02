-- Add image_url column to products table if it doesn't exist
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Update existing products to have image_url from the first image in images array
UPDATE public.products 
SET image_url = images[1] 
WHERE image_url IS NULL AND images IS NOT NULL AND array_length(images, 1) > 0;

-- Ensure we have both stock and stock_quantity columns for compatibility
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS stock INTEGER DEFAULT 0;

-- Sync stock with stock_quantity
UPDATE public.products SET stock = stock_quantity WHERE stock = 0 AND stock_quantity > 0;
UPDATE public.products SET stock_quantity = stock WHERE stock_quantity = 0 AND stock > 0;
