import type { NextApiHandler } from "next";
import withAuth from "@/lib-server/middleware/with-auth";
import prisma from "@/lib-server/prisma";

const handler: NextApiHandler<TGetResponse | TPostResponse> = async (
  req,
  res
) => {
  const {
    method,
    query: { userId, currentUserId },
  } = req;

  switch (method) {
    /**
     * @description get received requests of current user
     * @access only if current user matches request id
     */
    case "GET":
      if (
        typeof userId === "string" &&
        typeof currentUserId === "string" &&
        userId === currentUserId
      ) {
        const data = await getReceivedRequests(userId);
        res.status(200).json(data);
      }
      res.status(403).end();
      break;
    /**
     * @description accept friend request by disconnecting request and adding user to friends
     * @access any logged in user
     */
    case "POST":
      if (typeof userId === "string" && typeof currentUserId === "string") {
        const data = await acceptFriendRequest({ currentUserId, userId });
        res.status(200).json(data);
      }
      res.status(403).end();
      break;
    // TODO delete received request
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withAuth(handler);

export type TGetResponse = Awaited<ReturnType<typeof getReceivedRequests>>;
const getReceivedRequests = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    select: { receivedRequests: true },
  });
};

export type TPostResponse = Awaited<ReturnType<typeof acceptFriendRequest>>;
const acceptFriendRequest = async ({
  currentUserId,
  userId,
}: {
  currentUserId: string;
  userId: string;
}) => {
  return await prisma.user.update({
    where: { id: currentUserId },
    data: {
      receivedRequests: { disconnect: { id: userId } },
      friends: { connect: { id: userId } },
    },
  });
};
