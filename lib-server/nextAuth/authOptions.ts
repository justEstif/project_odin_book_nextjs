import { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import EmailProvider from "next-auth/providers/email";
import env from "@/lib-server/env";
import prisma from "@/lib-server/prisma";
import PrismaAdapter from "@/lib-server/nextAuth/adapters/prisma";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/sign-in", // custom sign in page
  },
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
    jwt: async ({ token, user, isNewUser }) => {
      const dbUser = await prisma.user.findUnique({
        where: {
          id: token.id || "",
        },
        include: {
          profile: true,
        },
      });

      if (!!isNewUser) {
        token.isNewUser = isNewUser;
      }

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

    session: async ({ session, token, user }) => {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.name = token.name;
        session.isNewUser = token.isNewUser;
      } else {
        session.user.id = user.id;
        session.user.email = user.email;
      }
      return session;
    },

    redirect: async ({ url, baseUrl }) => {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

export default authOptions;
