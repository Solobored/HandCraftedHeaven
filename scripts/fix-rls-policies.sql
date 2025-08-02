-- Drop existing policies
DROP POLICY IF EXISTS "Sellers can insert own products" ON public.products;
DROP POLICY IF EXISTS "Sellers can update own products" ON public.products;

-- Create new policies that work with authenticated users
CREATE POLICY "Authenticated users can insert products" ON public.products 
FOR INSERT WITH CHECK (
  auth.uid() IS NOT NULL AND 
  auth.uid() = seller_id
);

CREATE POLICY "Sellers can update own products" ON public.products 
FOR UPDATE USING (
  auth.uid() IS NOT NULL AND 
  auth.uid() = seller_id
);

-- Also ensure users can be inserted/updated
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile" ON public.users 
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users 
FOR INSERT WITH CHECK (auth.uid() = id);
