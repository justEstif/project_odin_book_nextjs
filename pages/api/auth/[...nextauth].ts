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
    session: async ({ session, token, user }) => {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.image = token.image || "";
        session.user.name = token.name || "";
      } else {
        session.user.id = user.id;
        session.user.email = user.email;
      }
      return session;
    },

    async jwt({ token, user }) {
      const dbUser = await prisma.user.findUnique({
        where: {
          id: token.id || "",
        },
        include: {
          profile: true,
        },
      });

      if (!dbUser && user) {
        token.id = user.id;
        token.email = user.email;
        return token;
      }

      if (dbUser) {
        token.id = dbUser.id;
        token.email = dbUser.email;
        token.image = dbUser.profile.image;
        token.name = dbUser.profile.name;
      }

      return token;
    },
  },
};

export default NextAuth(authOptions);
