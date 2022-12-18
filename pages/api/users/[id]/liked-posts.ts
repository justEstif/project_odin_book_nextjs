import prisma from "@/lib-server/prisma";
import { NextApiHandler } from "next";

export type TResponse = TGetResponse;
type TGetResponse = TGetLikedPosts | { message: string };

const handler: NextApiHandler<TResponse> = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;
  switch (method) {
    /** @access logged in user: not required to be the current user */
    case "GET":
      if (typeof id === "string") {
        const data = await getLikedPosts(id);
        res.status(200).json(data);
      }
      res.status(403).end();
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;

const getLikedPosts = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id: id },
    select: { likedPosts: true },
  });
};

type TGetLikedPosts = Awaited<ReturnType<typeof getLikedPosts>>;
