import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// Import authOptions from the correct location
const authOptions = {
  // This should match your actual auth configuration
  // For now, we'll handle session differently
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("product_id")
    const sellerId = searchParams.get("seller_id")

    let query = supabase
      .from("reviews")
      .select(`
        *,
        users:buyer_id (
          id,
          name,
          avatar_url
        )
      `)
      .order("created_at", { ascending: false })

    if (productId) {
      query = query.eq("product_id", productId)
    }

    if (sellerId) {
      query = query.eq("seller_id", sellerId)
    }

    const { data: reviews, error } = await query

    if (error) {
      console.error("Reviews fetch error:", error)
      return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
    }

    return NextResponse.json(reviews)
  } catch (error) {
    console.error("Reviews API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    // For now, we'll skip session validation and implement it later
    // const session = await getServerSession(authOptions)

    const body = await request.json()
    const { product_id, seller_id, rating, comment, user_id } = body

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 })
    }

    if (!user_id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Check if user already reviewed this product
    const { data: existingReview } = await supabase
      .from("reviews")
      .select("id")
      .eq("buyer_id", user_id)
      .eq("product_id", product_id)
      .single()

    if (existingReview) {
      return NextResponse.json({ error: "You have already reviewed this product" }, { status: 400 })
    }

    // Create new review
    const { data: review, error } = await supabase
      .from("reviews")
      .insert({
        buyer_id: user_id,
        product_id,
        rating,
        comment,
        created_at: new Date().toISOString(),
      })
      .select(`
        *,
        users:buyer_id (
          id,
          name,
          avatar_url
        )
      `)
      .single()

    if (error) {
      console.error("Review creation error:", error)
      return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
    }

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    console.error("Review creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
