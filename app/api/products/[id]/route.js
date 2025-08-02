import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request, { params }) {
  const { id } = params

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories ( name, slug ),
      users ( name )
    `)
    .eq("id", id)
    .eq("status", "approved")
    .single()

  if (error) {
    console.error("Error fetching product:", error)
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function PUT(request, { params }) {
  const { id } = params
  const { name, description, price, stock, image_url, category_id } = await request.json()

  const { data, error } = await supabase
    .from("products")
    .update({
      name,
      description,
      price,
      stock_quantity: stock,
      stock: stock,
      image_url,
      category_id,
      images: image_url ? [image_url] : [],
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select(`
      *,
      categories ( name, slug ),
      users ( name )
    `)

  if (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data || data.length === 0) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  return NextResponse.json(data[0])
}

export async function DELETE(request, { params }) {
  const { id } = params

  const { error } = await supabase.from("products").delete().eq("id", id)

  if (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: "Product deleted successfully" })
}
