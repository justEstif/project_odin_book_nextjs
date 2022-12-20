import withAuth from "@/lib-server/middleware/with-auth";
import prisma from "@/lib-server/prisma";
import { NextApiHandler } from "next";

const handler: NextApiHandler<TGetResponse> = async (req, res) => {
  const {
    method,
    query: { userId, currentUserId },
  } = req;
  switch (method) {
    /**
     * @description get all the liked posts
     * @access any logged in user
     */
    case "GET":
      if (
        typeof userId === "string" &&
        typeof currentUserId === "string" &&
        userId === currentUserId
      ) {
        const data = await getLikedPosts(currentUserId);
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

export type TGetResponse = Awaited<ReturnType<typeof getLikedPosts>>;
const getLikedPosts = async (currentUserId: string) => {
  return await prisma.user.findUnique({
    where: { id: currentUserId },
    select: { likedPosts: true },
  });
};
