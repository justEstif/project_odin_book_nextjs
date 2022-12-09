import NextAuth, { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import EmailProvider from "next-auth/providers/email";
import env from "@/lib/env";
import prisma from "@/lib/prisma";
import PrismaAdapter from "@/lib/adapters/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    FacebookProvider({
      clientId: env.FACEBOOK_ID,
      clientSecret: env.FACEBOOK_SECRET,
    }),
    EmailProvider({
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: env.EMAIL_SERVER_PORT,
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },

    async jwt({ token, user }) {
      const dbUser = await prisma.user.findUnique({
        where: {
          id: token.id,
        },
      });

      if (!dbUser && user) {
        return {
          id: user.id,
        };
      }

      if (dbUser) {
        return {
          id: dbUser.id,
        };
      }

      return {
        id: "",
      };
    },
  },
};

export default NextAuth(authOptions);
