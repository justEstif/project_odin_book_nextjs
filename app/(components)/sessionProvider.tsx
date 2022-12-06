"use client";

import { SessionProvider as NextAuthSP } from "next-auth/react";

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  return <NextAuthSP>{children}</NextAuthSP>;
};

export default SessionProvider;
