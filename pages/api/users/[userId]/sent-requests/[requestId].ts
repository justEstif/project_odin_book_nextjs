import { NextApiHandler } from "next";
import prisma from "@/lib-server/prisma";
import withAuth from "@/lib-server/middleware/with-auth";

const handler: NextApiHandler<TPostResponse> = async (req, res) => {
  const {
    method,
    query: { userId, currentUserId, requestId },
  } = req;

  switch (method) {
    /**
     * @description send a friend request
     * @access any logged in user
     */
    case "POST":
      if (
        typeof userId === "string" &&
        typeof currentUserId === "string" &&
        typeof requestId === "string" &&
        userId === currentUserId
      ) {
        const data = await sendFriendRequest({ currentUserId, requestId });
        res.status(201).json(data);
      }
      res.status(403).end();
      break;
    /**
     * @description delete a sent friend request
     * @access any logged in user
     */
    case "DELETE":
      if (
        typeof userId === "string" &&
        typeof currentUserId === "string" &&
        typeof requestId === "string" &&
        userId === currentUserId
      ) {
        const data = await deleteSentRequest({ currentUserId, requestId });
        res.status(200).json(data);
      }
      res.status(403).end();
      break;
    default:
      res.setHeader("Allow", ["POST", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withAuth(handler);

export type TPostResponse = Awaited<ReturnType<typeof sendFriendRequest>>;
const sendFriendRequest = async ({
  currentUserId,
  requestId,
}: {
  currentUserId: string;
  requestId: string;
}) => {
  return await prisma.user.update({
    where: { id: currentUserId },
    data: { sentRequests: { connect: { id: requestId } } },
  });
};

export type TDeleteResponse = Awaited<ReturnType<typeof deleteSentRequest>>;
const deleteSentRequest = async ({
  currentUserId,
  requestId,
}: {
  currentUserId: string;
  requestId: string;
}) => {
  return await prisma.user.update({
    where: { id: currentUserId },
    data: { receivedRequests: { disconnect: { id: requestId } } },
  });
};
