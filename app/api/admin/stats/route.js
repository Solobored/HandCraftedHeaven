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

    // Get total sales (sum of total_amount from orders)
    // Note: This is a simplified sum. In a real app, you might filter by status (e.g., 'completed')
    const { data: salesData, error: salesError } = await supabaseAdmin.from("orders").select("total_amount")

    if (salesError) throw salesError

    const totalSales = salesData.reduce((sum, order) => sum + Number.parseFloat(order.total_amount), 0)

    return NextResponse.json({
      totalUsers,
      totalProducts,
      totalSales,
    })
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
