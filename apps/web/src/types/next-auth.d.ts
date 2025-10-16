// src/types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role?: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    role?: string;
  }
}
