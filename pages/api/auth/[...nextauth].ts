import NextAuth from "next-auth";
import authOptions from "@/lib-server/nextAuth/authOptions";

export default NextAuth(authOptions);
