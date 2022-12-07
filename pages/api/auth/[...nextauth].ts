import NextAuth, { NextAuthOptions } from "next-auth";
import FBProvider from "next-auth/providers/facebook";
import EmailProvider from "next-auth/providers/email";
import env from "lib/env";

export const authOptions: NextAuthOptions = {
  providers: [
    FBProvider({
      clientId: env.FACEBOOK_ID,
      clientSecret: env.FACEBOOK_SECRET,
    }),
    // email provider
    EmailProvider({
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: env.EMAIL_SERVER_PORT,
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
};

export default NextAuth(authOptions);
