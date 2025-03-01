// next-auth.d.ts
import NextAuth, { DefaultSession, User } from "next-auth";

declare module "next-auth" {
  interface User {
    access?: string; // Add the `access` property
  }

  interface Session {
    user: {
      id: string;
      access: string;
      name: string;
      email: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      access: string;
      name: string;
      email: string;
    };
  }
}