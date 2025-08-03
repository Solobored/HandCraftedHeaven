import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { supabase } from "@/lib/supabase"

const handler = async (req, res) => {
  // Your existing auth handler code
}

export const authOptions = {
  // Your existing auth options
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const categorySlug = searchParams.get("category")
    const searchQuery = searchParams.get("search")
    const sellerId = searchParams.get("seller_id")
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")) : 50

    let query = supabase.from("products").select(`
        *,
        categories ( name, slug ),
        users ( name, full_name, seller_name )
      `)

    // Filter by category if specified
    if (categorySlug && categorySlug !== "all") {
      // Join with categories table and filter by slug
      query = query.eq("categories.slug", categorySlug)
    }

    // Filter by search query if specified
    if (searchQuery && searchQuery.trim()) {
      query = query.or(`name.ilike.%${searchQuery.trim()}%,description.ilike.%${searchQuery.trim()}%`)
    }

    // Filter by seller if specified
    if (sellerId) {
      query = query.eq("seller_id", sellerId)
    }

    // Only show approved products for public viewing
    if (!sellerId) {
      query = query.or("status.eq.approved,status.is.null")
    }

    // Add limit
    query = query.limit(limit)

    // Order by created_at descending
    query = query.order("created_at", { ascending: false })

    const { data, error } = await query

    if (error) {
      console.error("Error fetching products:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Transform the data to ensure proper structure
    const transformedData = data.map((product) => ({
      ...product,
      image_url: product.image_url || (product.images && product.images[0]) || null,
      categories: product.categories,
      users: {
        name: product.users?.seller_name || product.users?.full_name || product.users?.name || "Unknown Seller",
      },
    }))

    console.log("API returning products:", transformedData.length) // Debug log
    return NextResponse.json(transformedData)
  } catch (error) {
    console.error("Error in GET /api/products:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized - Please log in" }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, price, stock, image_url, category_id } = body

    // Validation
    if (!name || !price || !stock || !category_id) {
      return NextResponse.json(
        {
          error: "Missing required fields: name, price, stock, and category are required",
        },
        { status: 400 },
      )
    }

    const parsedPrice = Number.parseFloat(price)
    const parsedStock = Number.parseInt(stock)

    if (isNaN(parsedPrice) || parsedPrice < 0) {
      return NextResponse.json({ error: "Price must be a valid positive number" }, { status: 400 })
    }

    if (isNaN(parsedStock) || parsedStock < 0) {
      return NextResponse.json({ error: "Stock must be a valid positive number" }, { status: 400 })
    }

    // Create the product data
    const productData = {
      name: name.trim(),
      description: description?.trim() || "",
      price: parsedPrice,
      stock: parsedStock,
      stock_quantity: parsedStock,
      category_id,
      seller_id: session.user.id,
      status: "approved",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Add image if provided
    if (image_url && image_url.trim()) {
      productData.image_url = image_url.trim()
      productData.images = [image_url.trim()]
    }

    const { data, error } = await supabase
      .from("products")
      .insert([productData])
      .select(`*
        *,
        categories ( name, slug ),
        users ( name, full_name )
      `)

    if (error) {
      console.error("Supabase error creating product:", error)
      return NextResponse.json(
        {
          error: `Failed to create product: ${error.message}`,
        },
        { status: 500 },
      )
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Product created but no data returned" }, { status: 500 })
    }

    const createdProduct = data[0]

    return NextResponse.json(
      {
        ...createdProduct,
        image_url: createdProduct.image_url || (createdProduct.images && createdProduct.images[0]) || null,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error in POST /api/products:", error)
    return NextResponse.json(
      {
        error: `Internal server error: ${error.message}`,
      },
      { status: 500 },
    )
  }
}
