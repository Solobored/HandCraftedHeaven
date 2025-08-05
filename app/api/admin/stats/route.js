import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase" // Use supabaseAdmin for bypassing RLS

export async function GET() {
  try {
    // Get total users
    const { count: totalUsers, error: usersError } = await supabaseAdmin
      .from("users")
      .select("*", { count: "exact", head: true })

    if (usersError) throw usersError

    // Get total products
    const { count: totalProducts, error: productsError } = await supabaseAdmin
      .from("products")
      .select("*", { count: "exact", head: true })

    if (productsError) throw productsError

    // Get total sellers
    const { count: totalSellers, error: sellersError } = await supabaseAdmin
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("role", "seller")

    if (sellersError) throw sellersError

    // Get total orders
    const { count: totalOrders, error: ordersError } = await supabaseAdmin
      .from("orders")
      .select("*", { count: "exact", head: true })

    if (ordersError) throw ordersError

    return NextResponse.json({
      totalUsers,
      totalProducts,
      totalSellers,
      totalOrders,
    })
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
