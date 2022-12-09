import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

export const getSession = async () =>
  await unstable_getServerSession(authOptions);

export const getCurrentUser = async () => {
  const session = await getSession();
  return session?.user;
};
