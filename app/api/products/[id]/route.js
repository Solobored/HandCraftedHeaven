import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request, { params }) {
  try {
    const { id } = params

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })
    }

    const { data: product, error } = await supabase
      .from("products")
      .select(`
        *,
        categories (
          id,
          name
        ),
        users (
          id,
          name
        )
      `)
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error fetching product:", error)
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "Product not found" }, { status: 404 })
      }
      return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
    }

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Get reviews for this product
    const { data: reviews, error: reviewsError } = await supabase
      .from("reviews")
      .select(`
        *,
        users (
          id,
          name,
          avatar
        )
      `)
      .eq("product_id", id)
      .order("created_at", { ascending: false })

    if (reviewsError) {
      console.error("Error fetching reviews:", reviewsError)
    }

    // Calculate average rating and review count
    const validReviews = reviews || []
    const averageRating =
      validReviews.length > 0
        ? validReviews.reduce((sum, review) => sum + (review.rating || 0), 0) / validReviews.length
        : 0
    const reviewCount = validReviews.length

    // Ensure all numeric fields are properly formatted
    const processedProduct = {
      ...product,
      price: Number.parseFloat(product.price) || 0,
      stock_quantity: Number.parseInt(product.stock_quantity) || 0,
      average_rating: Number.parseFloat(averageRating.toFixed(1)),
      review_count: reviewCount,
      reviews: validReviews,
    }

    return NextResponse.json(processedProduct)
  } catch (error) {
    console.error("Error in product GET:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
