import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const categorySlug = searchParams.get("category")
  const searchQuery = searchParams.get("search")
  const sellerId = searchParams.get("seller_id")
  const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")) : 10
  const offset = searchParams.get("offset") ? Number.parseInt(searchParams.get("offset")) : 0

  let query = supabase.from("products").select(`
      *,
      categories ( name, slug ),
      users ( name as seller_name )
    `)

  if (categorySlug && categorySlug !== "all") {
    query = query.eq("categories.slug", categorySlug)
  }

  if (searchQuery) {
    query = query.ilike("name", `%${searchQuery}%`)
  }

  if (sellerId) {
    query = query.eq("seller_id", sellerId)
  }

  // Only show approved products for non-sellers
  query = query.eq("status", "approved")

  query = query.range(offset, offset + limit - 1)

  const { data, error } = await query

  if (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request) {
  const { name, description, price, stock, image_url, category_id, seller_id } = await request.json()

  if (!name || !price || !stock || !category_id || !seller_id) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        name,
        description,
        price,
        stock_quantity: stock,
        image_url,
        category_id,
        seller_id,
        images: image_url ? [image_url] : [],
      },
    ])
    .select(`
      *,
      categories ( name, slug ),
      users ( name as seller_name )
    `)

  if (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0], { status: 201 })
}
