import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { newRole, userId } = body

    if (!["buyer", "seller", "admin"].includes(newRole)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 })
    }

    const targetUserId = userId || session.user.id

    // Only allow users to change their own role to seller, or admins to change any role
    if (session.user.role !== "admin" && (targetUserId !== session.user.id || newRole === "admin")) {
      return NextResponse.json({ error: "Unauthorized to change this role" }, { status: 403 })
    }

    const updateData = {
      role: newRole,
      updated_at: new Date().toISOString(),
    }

    // If becoming a seller, set seller_name
    if (newRole === "seller") {
      const { data: currentUser } = await supabase
        .from("users")
        .select("full_name, name")
        .eq("id", targetUserId)
        .single()

      updateData.seller_name = currentUser?.full_name || currentUser?.name || "Seller"
    } else if (newRole === "buyer") {
      updateData.seller_name = null
    }

    const { data: user, error } = await supabaseAdmin
      .from("users")
      .update(updateData)
      .eq("id", targetUserId)
      .select()
      .single()

    if (error) {
      console.error("Error updating user role:", error)
      return NextResponse.json({ error: "Failed to update role" }, { status: 500 })
    }

    return NextResponse.json({
      message: "Role updated successfully",
      user: user,
    })
  } catch (error) {
    console.error("Role update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
