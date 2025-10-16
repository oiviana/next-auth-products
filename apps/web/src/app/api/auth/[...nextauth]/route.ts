import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

if (!process.env.BACKEND_URL) {
  throw new Error("BACKEND_URL não definida nas variáveis de ambiente");
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET não definida nas variáveis de ambiente");
}

const backendUrl = process.env.BACKEND_URL;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const res = await fetch(`${backendUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            console.error(`Login failed with status: ${res.status}`);
            return null;
          }

          const user = await res.json();

          if (!user?.id || !user?.email) {
            console.error("Invalid user data from backend:", user);
            return null;
          }

          return {
            id: user.id.toString(),
            name: user.name || user.email.split('@')[0],
            email: user.email,
            role: user.role || 'CLIENT',
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id;
      }

      if (session.user && token.role) {
        session.user.role = token.role;
      }

      return session;
    },
  },


  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };