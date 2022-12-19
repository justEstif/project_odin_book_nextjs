import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";

type TGetResponse = TGetPosts;

const handler: NextApiHandler<TResponse> = async (req, res) => {
  const {
    query: { userId },
    method,
  } = req;

  switch (method) {
    /** @access logged in user: not required to be the current user */
    case "GET":
      if (typeof userId === "string") {
        const data = await getPosts(userId);
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
export type TResponse = TGetResponse;

const getPosts = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    select: { posts: true },
  });
};

type TGetPosts = Awaited<ReturnType<typeof getPosts>>;
