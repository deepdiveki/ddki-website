import { prisma } from "@/libs/prismaDB";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { type NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import { JWT } from "next-auth/jwt";

// Define the custom user type
export interface CustomUser {
  id: string
  name: string;
  email: string;
  access: string;
}

// Extend the token and session types
declare module "next-auth" {
  interface Session {
    user: CustomUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: CustomUser;
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  session: {
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 60 * 60, // Refresh session every 1 hour of inactivity
    strategy: "jwt",
  },

  useSecureCookies: process.env.NODE_ENV === "production", // Use secure cookies in production
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        domain: ".deepdive-ki.de",  // Make cookie accessible across subdomains of example.com
        path: "/",
        secure: process.env.NODE_ENV === "production", // Use secure cookies only in production
        httpOnly: true,            // Prevent JavaScript access to the cookie (XSS protection)
        sameSite: "lax",           // Or 'strict'/'none' depending on your needs
        maxAge: 7 * 24 * 60 * 60, // 7 days
      },
    },
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Jhondoe" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // check to see if email and password is there
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email or password");
        }

        // check to see if user already exist
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: { id: true, name: true, email: true, password: true, emailVerified: true, access: true, },
        });

        // if user was not found
        if (!user || !user?.password) {
          throw new Error("No user found");
        }

        if (!user?.name || !user?.email) {
          throw new Error("User information is incomplete");
        }

        // check to see if passwords match
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        if (!user.emailVerified) {
          throw new Error(
            "Email not verified. Please verify your email before logging in."
          );
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            access: user.access,
          } as CustomUser;
      },
    }),

    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST!,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER!,
          pass: process.env.EMAIL_SERVER_PASSWORD!,
        },
      },
      from: process.env.EMAIL_FROM!,
    }),

  ],

  callbacks: {
  async jwt({ token, user }) {
    // Add custom user data to the token on login
    if (user) {
      token.user = {
        id: user.id,
        name: user.name ?? "Unbenannt",
        email: user.email ?? "",
        access: (user as CustomUser).access,
      };
    }

    return token;
  },

  async session({ session, token }) {
    // Pass the custom user data to the session
    session.user = token.user as CustomUser;  // Explicitly cast the type
    return session;
  },
},
};
