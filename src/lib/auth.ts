import NextAuth, { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "./db";
import bcrypt from "bcryptjs"

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            email
          },
        })
        if (!user) {
          console.log("No user found");
          return null
        }

        const passwordMatch = bcrypt.compare(password as string, user.hashedPassword)
        if (!passwordMatch) {
          console.log("Invalid credentials");
          return null
        }
        
        return user;
      }
    })
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

export const { auth, signIn } = NextAuth(authOptions)