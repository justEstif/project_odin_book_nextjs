import withAuth from "@/lib-server/middleware/with-auth";
import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";

const handler: NextApiHandler<TResponse> = async (req, res) => {
  const {
    method,
    query: { userId, currentUserId },
  } = req;

  switch (method) {
    /**
     * @description get sent requests of current user
     * @access only if current user matches request id
     */
    case "GET":
      if (
        typeof userId === "string" &&
        typeof currentUserId === "string" &&
        userId === currentUserId
      ) {
        const data = await getSentRequests(userId);
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
export type TResponse = Awaited<ReturnType<typeof getSentRequests>>;

const getSentRequests = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    select: { sentRequests: true },
  });
};
