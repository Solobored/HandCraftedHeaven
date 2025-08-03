import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { supabase } from "@/lib/supabase"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const category = searchParams.get("category")
    const sellerId = searchParams.get("seller_id")
    const limit = searchParams.get("limit") || "50"

    let query = supabase
      .from("products")
      .select(
        `
        *,
        categories (
          id,
          name,
          slug
        ),
        users (
          id,
          name,
          seller_name
        )
      `,
      )
      .order("created_at", { ascending: false })
      .limit(Number.parseInt(limit))

    // Apply filters
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    if (category && category !== "all") {
      query = query.eq("category_id", category)
    }

    if (sellerId) {
      query = query.eq("seller_id", sellerId)
    }

    const { data: products, error } = await query

    if (error) {
      console.error("Error fetching products:", error)
      return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
    }

    return NextResponse.json(products || [])
  } catch (error) {
    console.error("Error in GET /api/products:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, description, price, stock, image_url, category_id } = await request.json()

    // Validation
    if (!name || !description || !price || stock === undefined || !category_id) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Create product using service role client to bypass RLS
    const { data: product, error } = await supabase.from("products").insert([
      {
        name: name.trim(),
        description: description.trim(),
        price: Number.parseFloat(price),
        stock: Number.parseInt(stock),
        stock_quantity: Number.parseInt(stock),
        image_url: image_url || null,
        category_id: category_id,
        seller_id: session.user.id,
        created_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error("Supabase error creating product:", error)
      return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
    }

    return NextResponse.json({ message: "Product created successfully", product }, { status: 201 })
  } catch (error) {
    console.error("Error in POST /api/products:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
