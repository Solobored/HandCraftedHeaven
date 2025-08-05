import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { supabase } from "@/lib/supabase"

export const authOptions = {
  providers: [
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
          // Sign in with Supabase
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          })

          if (error || !data.user) {
            console.error("Supabase auth error:", error)
            return null
          }

          // Get user profile from database
          const { data: userProfile, error: profileError } = await supabase
            .from("users")
            .select("*")
            .eq("id", data.user.id)
            .single()

          if (profileError || !userProfile) {
            console.error("Profile fetch error:", profileError)
            // If no profile exists, create one
            const { data: newProfile, error: insertError } = await supabase.from("users").insert([
              {
                id: data.user.id,
                email: data.user.email,
                full_name: data.user.user_metadata?.full_name || "",
                name: data.user.user_metadata?.name || "",
                role: "buyer",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
            ]).select().single()

            if (insertError) {
              console.error("Error creating user profile:", insertError)
              return null
            }

            return {
              id: newProfile?.id || data.user.id,
              email: newProfile?.email || data.user.email,
              name: newProfile?.name || data.user.user_metadata?.name || "",
              role: newProfile?.role || "buyer",
            }
          }

          return {
            id: userProfile.id,
            email: userProfile.email,
            name: userProfile.name || userProfile.full_name,
            role: userProfile.role,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.role = token.role
      }
      return session
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          // Check if user exists in our database
          const { data: existingUser, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", user.email)
            .single()

          if (error && error.code !== "PGRST116") {
            console.error("Error checking user:", error)
            return false
          }

          if (!existingUser) {
            // Create new user profile
            const { error: insertError } = await supabase.from("users").insert([
              {
                id: user.id,
                email: user.email,
                full_name: user.name,
                name: user.name,
                role: "buyer",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
            ])

            if (insertError) {
              console.error("Error creating Google user profile:", insertError)
              return false
            }

            user.role = "buyer"
          } else {
            user.role = existingUser.role
          }
        } catch (error) {
          console.error("Google sign-in error:", error)
          return false
        }
      }
      return true
    },
  },
  pages: {
    signIn: "/auth/login",
    signUp: "/auth/register",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
