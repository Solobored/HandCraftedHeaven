import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY // This should only be used on the server

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL and Anon Key are required!")
}

// Client-side Supabase client (for public data and RLS-protected user data)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (for admin operations, bypassing RLS)
// Use this with caution and only in secure server environments (API routes, Server Actions)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)
