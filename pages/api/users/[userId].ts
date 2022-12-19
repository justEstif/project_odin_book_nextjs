import withAuth from "@/lib-server/middleware/with-auth";
import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";

const handler: NextApiHandler<TResponse> = async (req, res) => {
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
        const data = await getPostsProfileFriendsCount(userId, currentUserId);
        res.status(200).json(data);
      }
      res.status(403).end();
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withAuth(handler);
export type TResponse = Awaited<ReturnType<typeof getPostsProfileFriendsCount>>;

const getPostsProfileFriendsCount = async (
  userId: string,
  currentUserId: string
) =>
  await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
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
