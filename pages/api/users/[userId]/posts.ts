import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";

const handler: NextApiHandler<TGetResponse> = async (req, res) => {
  const {
    query: { userId },
    method,
  } = req;

  switch (method) {
    /**
     * @description get posts of user
     * @access any logged in user
     */
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

export type TGetResponse = Awaited<ReturnType<typeof getPosts>>;
const getPosts = async (id: string) => {
  return await prisma.post.findMany({
    where: { userId: id },
  });
};
