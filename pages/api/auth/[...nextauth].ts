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
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
};

export default NextAuth(authOptions);
