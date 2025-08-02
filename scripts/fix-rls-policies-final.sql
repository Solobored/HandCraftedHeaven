-- First, let's check and fix the users table structure
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS seller_name TEXT;

-- Update seller_name from name for existing users
UPDATE public.users SET seller_name = name WHERE seller_name IS NULL;

-- Drop and recreate RLS policies for products
DROP POLICY IF EXISTS "Authenticated users can insert products" ON public.products;
DROP POLICY IF EXISTS "Sellers can insert own products" ON public.products;
DROP POLICY IF EXISTS "Sellers can update own products" ON public.products;

-- Create new policies that work properly
CREATE POLICY "Sellers can insert products" ON public.products 
FOR INSERT WITH CHECK (
  auth.uid() IS NOT NULL AND 
  auth.uid() = seller_id AND
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('seller', 'admin'))
);

CREATE POLICY "Sellers can update own products" ON public.products 
FOR UPDATE USING (
  auth.uid() IS NOT NULL AND 
  auth.uid() = seller_id
);

-- Fix users policies
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;

CREATE POLICY "Users can insert own profile" ON public.users 
FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users 
FOR UPDATE USING (auth.uid() = id);

-- Add orders policies
CREATE POLICY "Users can view own orders" ON public.orders 
FOR SELECT USING (auth.uid() = buyer_id);

CREATE POLICY "Users can create own orders" ON public.orders 
FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- Add order_items policies  
CREATE POLICY "Users can view order items for own orders" ON public.order_items 
FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND buyer_id = auth.uid())
);

CREATE POLICY "Users can create order items" ON public.order_items 
FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND buyer_id = auth.uid())
);
