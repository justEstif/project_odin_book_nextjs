import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";

const handler: NextApiHandler<TResponse> = async (req, res) => {
  const {
    method,
    query: { commentId },
  } = req;

  switch (method) {
    /**
     * @
     * @access any logged in user
     */
    case "GET":
      if (typeof commentId === "string") {
        const data = await getComment(commentId);
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
export type TResponse = Awaited<ReturnType<typeof getComment>>;

const getComment = async (commentId: string) => {
  return await prisma.comment.findUnique({
    where: { id: commentId },
  });
};
