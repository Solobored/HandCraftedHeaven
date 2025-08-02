import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  const { data, error } = await supabaseAdmin.from("users").select("id, email, name, role, created_at")

  if (error) {
    console.error("Error fetching users for admin:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function PUT(request) {
  const { id, role } = await request.json()

  if (!id || !role) {
    return NextResponse.json({ error: "User ID and role are required" }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin.from("users").update({ role }).eq("id", id).select()

  if (error) {
    console.error("Error updating user role:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data || data.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json(data[0])
}

export async function DELETE(request) {
  const { id } = await request.json()

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  const { error } = await supabaseAdmin.from("users").delete().eq("id", id)

  if (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: "User deleted successfully" }, { status: 204 })
}
