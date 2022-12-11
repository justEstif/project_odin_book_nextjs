import { unstable_getServerSession } from "next-auth/next";
import authOptions from "./nextAuth/authOptions";

export const getSession = async () =>
  await unstable_getServerSession(authOptions);
