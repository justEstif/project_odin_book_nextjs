import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

export const getSession = async () =>
  await unstable_getServerSession(authOptions);

/**
 * @description get user of session
 * @description only in client side components
 */
export const getCurrentUser = async () => {
  const session = await getSession();
  return session?.user;
};
