import NextAuth, { NextAuthConfig } from "next-auth"

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
  ],
  callbacks: {
    authorized: ({ request }) => {
      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app")
      if (isTryingToAccessApp) {
        return false
      } else {
        return true
      }
    }
  }
} satisfies NextAuthConfig

export const { auth } = NextAuth(authOptions)