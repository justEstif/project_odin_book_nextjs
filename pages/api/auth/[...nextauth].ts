import NextAuth, { NextAuthOptions } from "next-auth";
import FBProvider from "next-auth/providers/facebook";
import env from "lib/env";

export const authOptions: NextAuthOptions = {
  providers: [
    FBProvider({
      clientId: env.FACEBOOK_ID,
      clientSecret: env.FACEBOOK_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
