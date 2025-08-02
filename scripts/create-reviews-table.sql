-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_seller_id ON reviews(seller_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at);

-- Create unique constraint to prevent duplicate reviews from same user for same product
CREATE UNIQUE INDEX IF NOT EXISTS idx_reviews_user_product_unique ON reviews(user_id, product_id);

-- Enable Row Level Security
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create reviews for products they haven't reviewed" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews" ON reviews
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to update average rating for products
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the product's average rating
  UPDATE products 
  SET average_rating = (
    SELECT COALESCE(AVG(rating::numeric), 0)
    FROM reviews 
    WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
  ),
  review_count = (
    SELECT COUNT(*)
    FROM reviews 
    WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
  )
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update product ratings
DROP TRIGGER IF EXISTS trigger_update_product_rating_insert ON reviews;
CREATE TRIGGER trigger_update_product_rating_insert
  AFTER INSERT ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_product_rating();

DROP TRIGGER IF EXISTS trigger_update_product_rating_update ON reviews;
CREATE TRIGGER trigger_update_product_rating_update
  AFTER UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_product_rating();

DROP TRIGGER IF EXISTS trigger_update_product_rating_delete ON reviews;
CREATE TRIGGER trigger_update_product_rating_delete
  AFTER DELETE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_product_rating();

-- Add rating columns to products table if they don't exist
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS average_rating DECIMAL(3,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0;

-- Update existing products with their current ratings
UPDATE products 
SET 
  average_rating = COALESCE((
    SELECT AVG(rating::numeric)
    FROM reviews 
    WHERE product_id = products.id
  ), 0),
  review_count = COALESCE((
    SELECT COUNT(*)
    FROM reviews 
    WHERE product_id = products.id
  ), 0);
