import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { supabase } from "@/lib/supabase"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const seller_id = searchParams.get("seller_id")
    const search = searchParams.get("search")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")

    let query = supabase.from("products").select(`
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

    if (category && category !== "all") {
      query = query.eq("category_id", category)
    }

    if (seller_id) {
      query = query.eq("seller_id", seller_id)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    if (minPrice) {
      query = query.gte("price", Number.parseFloat(minPrice))
    }

    if (maxPrice) {
      query = query.lte("price", Number.parseFloat(maxPrice))
    }

    const { data: products, error } = await query.order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching products:", error)
      return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
    }

    // Ensure price is a number for all products
    const processedProducts = products.map((product) => ({
      ...product,
      price: Number.parseFloat(product.price) || 0,
      stock_quantity: Number.parseInt(product.stock_quantity) || 0,
    }))

    return NextResponse.json(processedProducts)
  } catch (error) {
    console.error("Error in products GET:", error)
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
    const { name, description, price, category_id, stock_quantity, image_url } = body

    // Validate required fields
    if (!name || !price || !category_id) {
      return NextResponse.json(
        {
          error: "Missing required fields: name, price, and category_id are required",
        },
        { status: 400 },
      )
    }

    // Validate price is a number
    const numericPrice = Number.parseFloat(price)
    if (isNaN(numericPrice) || numericPrice < 0) {
      return NextResponse.json(
        {
          error: "Price must be a valid positive number",
        },
        { status: 400 },
      )
    }

    // Validate stock quantity
    const numericStock = Number.parseInt(stock_quantity) || 0
    if (numericStock < 0) {
      return NextResponse.json(
        {
          error: "Stock quantity must be a positive number",
        },
        { status: 400 },
      )
    }

    // Get user profile to check if they're a seller or admin
    const { data: userProfile, error: userError } = await supabase
      .from("users")
      .select("id, role, name, full_name")
      .eq("id", session.user.id)
      .single()

    if (userError || !userProfile) {
      console.error("User profile error:", userError)
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if user is seller or admin
    if (userProfile.role !== "seller" && userProfile.role !== "admin") {
      return NextResponse.json(
        {
          error: "Only sellers and admins can create products",
        },
        { status: 403 },
      )
    }

    // Verify category exists
    const { data: category, error: categoryError } = await supabase
      .from("categories")
      .select("id")
      .eq("id", category_id)
      .single()

    if (categoryError || !category) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 })
    }

    // For admin users, allow them to specify a different seller_id
    let actualSellerId = session.user.id
    if (userProfile.role === "admin" && body.seller_id) {
      // Verify the specified seller exists and is a seller
      const { data: specifiedSeller, error: sellerError } = await supabase
        .from("users")
        .select("id, role")
        .eq("id", body.seller_id)
        .single()
      
      if (!sellerError && specifiedSeller && (specifiedSeller.role === "seller" || specifiedSeller.role === "admin")) {
        actualSellerId = body.seller_id
      }
    }

    // Create the product
    const { data: product, error: productError } = await supabase
      .from("products")
      .insert({
        name: name.trim(),
        description: description?.trim() || "",
        price: numericPrice,
        category_id: category_id,
        seller_id: actualSellerId,
        stock: numericStock,
        stock_quantity: numericStock,
        image_url: image_url || null,
        status: userProfile.role === "admin" ? "approved" : "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
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
      .single()

    if (productError) {
      console.error("Error creating product:", productError)
      return NextResponse.json(
        {
          error: "Failed to create product",
          details: productError.message,
        },
        { status: 500 },
      )
    }

    // Ensure price is properly formatted in response
    const processedProduct = {
      ...product,
      price: Number.parseFloat(product.price) || 0,
      stock: Number.parseInt(product.stock) || 0,
      stock_quantity: Number.parseInt(product.stock_quantity) || Number.parseInt(product.stock) || 0,
    }

    return NextResponse.json(processedProduct, { status: 201 })
  } catch (error) {
    console.error("Error in products POST:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
