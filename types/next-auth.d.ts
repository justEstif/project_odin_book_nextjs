import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    image?: string;
    name?: string;
    accessToken?: string;
    isNewUser?: boolean;
  }
}

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
  }
  interface Session {
    accessToken?: string;
    isNewUser?: boolean;
    user: {
      id: string;
      email: string;
      image?: string;
      name?: string;
    };
  }
}
