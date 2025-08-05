import { NextResponse } from "next/server"
import { supabase, supabaseAdmin } from "@/lib/supabase"

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
    if (!["buyer", "seller", "admin"].includes(role)) {
      return NextResponse.json({ error: "Invalid role specified" }, { status: 400 })
    }

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from("users")
      .select("email")
      .eq("email", email.toLowerCase().trim())
      .single()

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
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
        emailRedirectTo: undefined, // Disable email confirmation redirect
      },
    })

    if (error) {
      console.error("Supabase sign-up error:", error.message)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    if (data.user) {
      // Wait a moment for the trigger to potentially create the user
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Always try to insert/update the user profile to ensure it exists
      try {
        const { data: userProfile, error: insertError } = await supabaseAdmin.from("users").upsert(
          [
            {
              id: data.user.id,
              email: email.toLowerCase().trim(),
              full_name: name.trim(),
              name: name.trim(),
              seller_name: role === "seller" ? name.trim() : null,
              role: role,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ],
          {
            onConflict: "id",
            ignoreDuplicates: false,
          },
        )
        .select()
        .single()

        if (insertError) {
          console.error("Error inserting user profile:", insertError)
          return NextResponse.json({ error: "Failed to create user profile: " + insertError.message }, { status: 500 })
        }

        console.log("User profile created:", userProfile)
      } catch (profileError) {
        console.error("Profile creation error:", profileError)
        return NextResponse.json({ error: "Failed to create user profile" }, { status: 500 })
      }

      return NextResponse.json(
        {
          message: "User registered successfully. You can now sign in.",
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