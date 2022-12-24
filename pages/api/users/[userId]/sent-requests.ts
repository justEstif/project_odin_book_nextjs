import withAuth from "@/lib-server/middleware/with-auth";
import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";

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
     * @description get sent requests of current user
     * @access only if current user matches request id
     */
    case "GET":
      if (
        typeof userId === "string" &&
        typeof currentUserId === "string" &&
        userId === currentUserId
      ) {
        const data = await getSentRequests({ currentUserId });
        res.status(200).json(data);
      }
      res.status(403).end();
      break;
    /**
     * @description send a friend request by creating a connection
     * @access any logged in user
     */
    case "POST":
      if (typeof userId === "string" && typeof currentUserId === "string") {
        const data = await sendFriendRequest({ currentUserId, userId });
        res.status(201).json(data);
      }
      res.status(403).end();
      break;
    // TODO delete sent request
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withAuth(handler);

export type TGetResponse = Awaited<ReturnType<typeof getSentRequests>>;
const getSentRequests = async ({
  currentUserId,
}: {
  currentUserId: string;
}) => {
  return await prisma.user.findUnique({
    where: { id: currentUserId },
    select: {
      sentRequests: {
        select: {
          id: true,
          profile: { select: { name: true, image: true } },
        },
      },
    },
  });
};

export type TPostResponse = Awaited<ReturnType<typeof sendFriendRequest>>;
const sendFriendRequest = async ({
  currentUserId,
  userId,
}: {
  currentUserId: string;
  userId: string;
}) => {
  return await prisma.user.update({
    where: { id: currentUserId },
    data: { sentRequests: { connect: { id: userId } } },
  });
};
