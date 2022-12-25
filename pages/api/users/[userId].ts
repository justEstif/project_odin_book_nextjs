import withAuth from "@/lib-server/middleware/with-auth";
import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";

const handler: NextApiHandler<TGetResponse | TDeleteResponse> = async (
  req,
  res
) => {
  const {
    query: { userId, currentUserId },
    method,
  } = req;

  switch (method) {
    /**
     * @description get posts, profile, and relation with user by returning its id in the relation type
     * @access any logged in user
     */
    case "GET":
      if (typeof userId === "string" && typeof currentUserId === "string") {
        const data = await getPostsProfileFriendsCount({
          currentUserId,
          userId,
        });
        res.status(200).json(data);
      }
      res.status(403).end();
      break;
    /**
     * @description delete the user
     * @access any logged in user
     */
    case "DELETE":
      if (
        typeof userId === "string" &&
        typeof currentUserId === "string" &&
        userId === currentUserId
      ) {
        const data = await deleteUser({ currentUserId });
        res.status(200).json(data);
      }
      res.status(403).end();
      break;

    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withAuth(handler);

export type TGetResponse = Awaited<
  ReturnType<typeof getPostsProfileFriendsCount>
>;
const getPostsProfileFriendsCount = async ({
  userId,
  currentUserId,
}: {
  userId: string;
  currentUserId: string;
}) =>
  await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      posts: true,
      profile: true,
      friends: {
        where: { id: currentUserId },
        select: { id: true },
      },
      friendsOf: {
        where: { id: currentUserId },
        select: { id: true },
      },
      sentRequests: {
        where: { id: currentUserId },
        select: { id: true },
      },
      receivedRequests: {
        where: { id: currentUserId },
        select: { id: true },
      },
      _count: {
        select: {
          friends: true,
          posts: true,
        },
      },
    },
  });

export type TDeleteResponse = Awaited<ReturnType<typeof deleteUser>>;
const deleteUser = async ({ currentUserId }: { currentUserId: string }) => {
  return await prisma.user.delete({
    where: { id: currentUserId },
  });
};
