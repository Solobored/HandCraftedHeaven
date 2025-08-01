import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { supabase } from "@/lib/supabase"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Check if user exists in our database
          const { data: user, error } = await supabase.from("users").select("*").eq("email", credentials.email).single()

          if (error || !user) {
            return null
          }

          // In a real app, you'd verify the password here
          // For now, we'll just check if the user exists
          return {
            id: user.id,
            email: user.email,
            name: user.full_name || user.name,
            role: user.role,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
          // Check if user exists in our database
          const { data: existingUser, error: fetchError } = await supabase
            .from("users")
            .select("*")
            .eq("email", user.email)
            .single()

          if (fetchError && fetchError.code !== "PGRST116") {
            console.error("Error fetching user:", fetchError)
            return false
          }

          if (!existingUser) {
            // Create new user in our database
            const { error: insertError } = await supabase.from("users").insert([
              {
                email: user.email,
                full_name: user.name,
                avatar_url: user.image,
                role: "buyer",
                created_at: new Date().toISOString(),
              },
            ])

            if (insertError) {
              console.error("Error creating user:", insertError)
              return false
            }
          }

          return true
        } catch (error) {
          console.error("Sign in error:", error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        // Fetch user data from our database
        const { data: userData, error } = await supabase.from("users").select("*").eq("email", user.email).single()

        if (!error && userData) {
          token.role = userData.role
          token.userId = userData.id
          token.name = userData.full_name || userData.name
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role
        session.user.id = token.userId
        session.user.name = token.name
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
    signUp: "/auth/register",
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
