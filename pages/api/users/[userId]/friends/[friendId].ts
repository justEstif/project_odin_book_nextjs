import { NextApiHandler } from "next";
import prisma from "@/lib-server/prisma";
import withAuth from "@/lib-server/middleware/with-auth";

const handler: NextApiHandler<TDeleteResponse> = async (req, res) => {
  const {
    method,
    query: { userId, currentUserId, requestId },
  } = req;

  switch (method) {
    /**
     * @description send a friend request
     * @access any logged in user
     * @todo test
     */
    case "DELETE":
      if (
        typeof userId === "string" &&
        typeof currentUserId === "string" &&
        typeof requestId === "string" &&
        userId === currentUserId
      ) {
        const data = await deleteFriend({ currentUserId, requestId });
        res.status(201).json(data);
      }
      res.status(403).end();
      break;
    default:
      res.setHeader("Allow", ["DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withAuth(handler);

export type TDeleteResponse = Awaited<ReturnType<typeof deleteFriend>>;
const deleteFriend = async ({
  currentUserId,
  requestId,
}: {
  currentUserId: string;
  requestId: string;
}) => {
  return await prisma.user.update({
    where: { id: currentUserId },
    data: {
      friends: { disconnect: { id: requestId } },
      friendsOf: { disconnect: { id: requestId } },
    },
  });
};
