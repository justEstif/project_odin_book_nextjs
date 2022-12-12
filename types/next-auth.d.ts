import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    image: string;
    name: string;
    isNewUser: boolean;

  }
}

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
  }
  interface Session {
    user: {
      id: string;
      email: string;
      image: string;
      name: string;
      isNewUser: boolean;
    };
  }
}
