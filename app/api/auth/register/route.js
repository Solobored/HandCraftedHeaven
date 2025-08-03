import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request) {
  try {
    const { name, email, password, role = "buyer" } = await request.json()

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // Validate role
    if (!["buyer", "seller"].includes(role)) {
      return NextResponse.json({ error: "Invalid role specified" }, { status: 400 })
    }

    // Sign up the user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase().trim(),
      password,
      options: {
        data: {
          full_name: name.trim(),
          name: name.trim(),
          role: role,
        },
      },
    })

    if (error) {
      console.error("Supabase sign-up error:", error.message)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    if (data.user) {
      // Also insert into public.users table with role
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: data.user.id,
          email: email.toLowerCase().trim(),
          full_name: name.trim(),
          name: name.trim(),
          seller_name: role === "seller" ? name.trim() : null,
          role: role,
          created_at: new Date().toISOString(),
        },
      ])

      if (insertError) {
        console.error("Error inserting user profile:", insertError)
        // Don't fail the registration if profile insert fails
      }

      return NextResponse.json(
        {
          message: "User registered successfully",
          user: {
            id: data.user.id,
            email: data.user.email,
            name: name.trim(),
            role: role,
          },
        },
        { status: 201 },
      )
    }

    return NextResponse.json({ error: "Registration failed" }, { status: 400 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
