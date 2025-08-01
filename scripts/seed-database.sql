-- Seed data for 'users' table
INSERT INTO users (id, email, name, role, avatar_url) VALUES
('a0eebc99-9c0b-4d07-ae21-000000000001', 'buyer@example.com', 'Alice Buyer', 'buyer', 'https://picsum.photos/id/1005/60/60'),
('a0eebc99-9c0b-4d07-ae21-000000000002', 'seller@example.com', 'Bob Seller', 'seller', 'https://picsum.photos/id/1011/60/60'),
('a0eebc99-9c0b-4d07-ae21-000000000003', 'admin@example.com', 'Charlie Admin', 'admin', 'https://picsum.photos/id/1025/60/60'),
('a0eebc99-9c0b-4d07-ae21-000000000004', 'sarah.chen@example.com', 'Sarah Chen', 'seller', 'https://picsum.photos/id/1027/60/60'),
('a0eebc99-9c0b-4d07-ae21-000000000005', 'marcus.rodriguez@example.com', 'Marcus Rodriguez', 'seller', 'https://picsum.photos/id/1028/60/60'),
('a0eebc99-9c0b-4d07-ae21-000000000006', 'elena.vasquez@example.com', 'Elena Vasquez', 'seller', 'https://picsum.photos/id/1029/60/60');

-- Seed data for 'categories' table
INSERT INTO categories (id, name, slug, description, image_url) VALUES
('b0eebc99-9c0b-4d07-ae21-000000000001', 'Home Decor', 'home-decor', 'Beautiful handcrafted items to adorn your living space.', 'https://picsum.photos/id/10/300/200'),
('b0eebc99-9c0b-4d07-ae21-000000000002', 'Jewelry', 'jewelry', 'Unique handmade jewelry for every style and occasion.', 'https://picsum.photos/id/100/300/200'),
('b0eebc99-9c0b-4d07-ae21-000000000003', 'Art Collection', 'art-collection', 'Original artworks and sculptures from talented artists.', 'https://picsum.photos/id/1000/300/200'),
('b0eebc99-9c0b-4d07-ae21-000000000004', 'Clothing', 'clothing', 'Hand-stitched apparel and accessories.', 'https://picsum.photos/id/1002/300/200'),
('b0eebc99-9c0b-4d07-ae21-000000000005', 'Gifts', 'gifts', 'Thoughtful and unique gifts for your loved ones.', 'https://picsum.photos/id/1003/300/200'),
('b0eebc99-9c0b-4d07-ae21-000000000006', 'Kitchen', 'kitchen', 'Handmade kitchenware and culinary tools.', 'https://picsum.photos/id/1004/300/200');

-- Seed data for 'products' table
INSERT INTO products (id, seller_id, category_id, name, description, price, stock, image_url) VALUES
('c0eebc99-9c0b-4d07-ae21-000000000001', 'a0eebc99-9c0b-4d07-ae21-000000000004', 'b0eebc99-9c0b-4d07-ae21-000000000001', 'Hand-Painted Ceramic Mug', 'A beautiful, unique ceramic mug, hand-painted with intricate designs. Perfect for your morning coffee or tea.', 25.00, 50, 'https://picsum.photos/id/237/400/400'),
('c0eebc99-9c0b-4d07-ae21-000000000002', 'a0eebc99-9c0b-4d07-ae21-000000000005', 'b0eebc99-9c0b-4d07-ae21-000000000001', 'Woven Macrame Wall Hanging', 'An elegant macrame wall hanging, hand-woven with natural cotton ropes. Adds a bohemian touch to any room.', 45.00, 30, 'https://picsum.photos/id/238/400/400'),
('c0eebc99-9c0b-4d07-ae21-000000000003', 'a0eebc99-9c0b-4d07-ae21-000000000006', 'b0eebc99-9c0b-4d07-ae21-000000000002', 'Sterling Silver Leaf Necklace', 'Delicate sterling silver necklace featuring a finely detailed leaf pendant. A timeless piece for nature lovers.', 60.00, 20, 'https://picsum.photos/id/239/400/400'),
('c0eebc99-9c0b-4d07-ae21-000000000004', 'a0eebc99-9c0b-4d07-ae21-000000000002', 'b0eebc99-9c0b-4d07-ae21-000000000004', 'Hand-Knitted Wool Scarf', 'Warm and cozy hand-knitted scarf made from 100% pure merino wool. Perfect for chilly days.', 55.00, 40, 'https://picsum.photos/id/240/400/400'),
('c0eebc99-9c0b-4d07-ae21-000000000005', 'a0eebc99-9c0b-4d07-ae21-000000000004', 'b0eebc99-9c0b-4d07-ae21-000000000005', 'Custom Leather Wallet', 'A personalized leather wallet, handcrafted from genuine full-grain leather. Durable and stylish.', 75.00, 15, 'https://picsum.photos/id/241/400/400'),
('c0eebc99-9c0b-4d07-ae21-000000000006', 'a0eebc99-9c0b-4d07-ae21-000000000005', 'b0eebc99-9c0b-4d07-ae21-000000000001', 'Artisan Soap Bar Set', 'A set of three luxurious artisan soap bars, made with natural ingredients and essential oils. Great for sensitive skin.', 30.00, 60, 'https://picsum.photos/id/242/400/400'),
('c0eebc99-9c0b-4d07-ae21-000000000007', 'a0eebc99-9c0b-4d07-ae21-000000000006', 'b0eebc99-9c0b-4d07-ae21-000000000003', 'Wooden Carved Animal Figurine', 'Intricately hand-carved wooden animal figurine, a unique piece of art for your collection or as a gift.', 35.00, 25, 'https://picsum.photos/id/243/400/400'),
('c0eebc99-9c0b-4d07-ae21-000000000008', 'a0eebc99-9c0b-4d07-ae21-000000000002', 'b0eebc99-9c0b-4d07-ae21-000000000005', 'Hand-Bound Leather Journal', 'A beautifully hand-bound journal with a soft leather cover and high-quality paper. Perfect for writing or sketching.', 40.00, 35, 'https://picsum.photos/id/244/400/400');

-- Seed data for 'orders' table (example)
INSERT INTO orders (id, user_id, total_amount, status, shipping_address) VALUES
('d0eebc99-9c0b-4d07-ae21-000000000001', 'a0eebc99-9c0b-4d07-ae21-000000000001', 70.00, 'completed', '{"street": "123 Main St", "city": "Anytown", "zip": "12345"}'),
('d0eebc99-9c0b-4d07-ae21-000000000002', 'a0eebc99-9c0b-4d07-ae21-000000000001', 100.00, 'pending', '{"street": "456 Oak Ave", "city": "Otherville", "zip": "67890"}');

-- Seed data for 'order_items' table (example)
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES
('d0eebc99-9c0b-4d07-ae21-000000000001', 'c0eebc99-9c0b-4d07-ae21-000000000001', 1, 25.00),
('d0eebc99-9c0b-4d07-ae21-000000000001', 'c0eebc99-9c0b-4d07-ae21-000000000003', 1, 45.00),
('d0eebc99-9c0b-4d07-ae21-000000000002', 'c0eebc99-9c0b-4d07-ae21-000000000004', 1, 55.00),
('d0eebc99-9c0b-4d07-ae21-000000000002', 'c0eebc99-9c0b-4d07-ae21-000000000005', 1, 45.00);
