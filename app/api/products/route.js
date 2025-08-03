import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit")
    const category = searchParams.get("category")
    const seller_id = searchParams.get("seller_id")
    const search = searchParams.get("search")

    let query = supabase
      .from("products")
      .select(`
        *,
        categories (
          id,
          name
        ),
        users (
          id,
          full_name,
          seller_name
        )
      `)
      .eq("status", "approved")

    // Apply filters
    if (category && category !== "all") {
      query = query.eq("category_id", category)
    }

    if (seller_id) {
      query = query.eq("seller_id", seller_id)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    // Apply limit
    if (limit) {
      query = query.limit(Number.parseInt(limit))
    }

    // Order by created_at descending
    query = query.order("created_at", { ascending: false })

    const { data: products, error } = await query

    if (error) {
      console.error("Error fetching products:", error)
      return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
    }

    return NextResponse.json(products || [])
  } catch (error) {
    console.error("Products API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, price, stock, category_id, image_url, seller_id } = body

    // Validation
    if (!name || !description || !price || !category_id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const parsedPrice = Number.parseFloat(price)
    const parsedStock = Number.parseInt(stock) || 0

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 })
    }

    // Use seller_id from request if provided (for admin), otherwise use session user id
    const finalSellerId = seller_id || session.user.id

    // Verify user has permission to create products for this seller
    if (session.user.role !== "admin" && finalSellerId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized to create products for this seller" }, { status: 403 })
    }

    // Verify the seller exists and has seller role
    const { data: seller, error: sellerError } = await supabase
      .from("users")
      .select("id, role")
      .eq("id", finalSellerId)
      .single()

    if (sellerError || !seller) {
      return NextResponse.json({ error: "Seller not found" }, { status: 404 })
    }

    if (seller.role !== "seller" && seller.role !== "admin") {
      return NextResponse.json({ error: "User is not a seller" }, { status: 403 })
    }

    // Create the product - keep category_id as string since it's a UUID
    const productData = {
      name: name.trim(),
      description: description.trim(),
      price: parsedPrice,
      stock: parsedStock,
      stock_quantity: parsedStock,
      category_id: category_id, // Keep as string for UUID
      seller_id: finalSellerId,
      image_url: image_url || null,
      status: "approved",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { data: product, error } = await supabase.from("products").insert([productData]).select().single()

    if (error) {
      console.error("Error creating product:", error)
      return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
    }

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("Product creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
