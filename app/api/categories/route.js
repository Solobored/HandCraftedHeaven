import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  const { data, error } = await supabase.from("categories").select("*")

  if (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request) {
  const { name, slug, description, image_url } = await request.json()

  if (!name || !slug) {
    return NextResponse.json({ error: "Name and slug are required" }, { status: 400 })
  }

  const { data, error } = await supabase.from("categories").insert([{ name, slug, description, image_url }]).select()

  if (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0], { status: 201 })
}
