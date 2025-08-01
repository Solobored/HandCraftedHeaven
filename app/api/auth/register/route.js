import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request) {
  const { name, email, password } = await request.json()

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
  }

  // Sign up the user with Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        name: name,
      },
    },
  })

  if (error) {
    console.error("Supabase sign-up error:", error.message)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  if (data.user) {
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: data.user.id,
          email: data.user.email,
          name: name,
        },
      },
      { status: 201 },
    )
  }

  return NextResponse.json({ error: "Registration failed" }, { status: 400 })
}
