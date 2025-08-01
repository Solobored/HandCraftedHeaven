-- Create the 'public' schema if it doesn't exist (default in Supabase)
-- CREATE SCHEMA IF NOT EXISTS public;

-- Set search path to public
SET search_path TO public;

-- Drop tables if they exist to allow for clean re-creation
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create 'users' table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    password TEXT, -- For email/password authentication
    name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'buyer', -- 'buyer', 'seller', 'admin'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create 'categories' table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create 'products' table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID REFERENCES users(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create 'orders' table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'cancelled'
    shipping_address JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create 'order_items' table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL,
    price_at_purchase NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for 'users' table
CREATE POLICY "Allow public read access to users" ON users FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to insert their own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Allow authenticated users to update their own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for 'categories' table
CREATE POLICY "Allow public read access to categories" ON categories FOR SELECT USING (true);

-- RLS Policies for 'products' table
CREATE POLICY "Allow public read access to products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow sellers to insert their own products" ON products FOR INSERT WITH CHECK (auth.uid() = seller_id AND (SELECT role FROM users WHERE id = auth.uid()) = 'seller');
CREATE POLICY "Allow sellers to update their own products" ON products FOR UPDATE USING (auth.uid() = seller_id AND (SELECT role FROM users WHERE id = auth.uid()) = 'seller');
CREATE POLICY "Allow sellers to delete their own products" ON products FOR DELETE USING (auth.uid() = seller_id AND (SELECT role FROM users WHERE id = auth.uid()) = 'seller');

-- RLS Policies for 'orders' table
CREATE POLICY "Allow authenticated users to insert their own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow authenticated users to view their own orders" ON orders FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for 'order_items' table
CREATE POLICY "Allow authenticated users to view their own order items" ON order_items FOR SELECT USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

-- Admin policies (example - typically handled via functions or specific roles)
-- For simplicity, we'll assume admin role can bypass RLS for now or use specific functions.
-- In a real app, you'd have more granular admin policies.
