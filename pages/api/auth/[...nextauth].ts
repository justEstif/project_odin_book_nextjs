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
  events: {
    signIn: async ({ user: { email } }) => {
      console.log(`Sign in user:${email} `);
    },
    signOut: async ({ session: { user } }) => {
      console.log(`Sign out user: ${user?.email}`);
    },
    createUser: async ({ user: { email } }) => {
      console.log(`Created user: ${email}`);
    },
    session: async ({ token, session }) => {
      console.log({
        token,
        session,
      });
    },
  },
};

export default NextAuth(authOptions);
