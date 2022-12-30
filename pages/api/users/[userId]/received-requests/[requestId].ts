import { NextApiHandler } from "next";
import prisma from "@/lib-server/prisma";
import withAuth from "@/lib-server/middleware/with-auth";
import withValidation from "@/lib-server/middleware/with-validation";
import { receivedRequestsIdSchema } from "@/lib-server/validations/users";
import { z } from "zod";

const handler: NextApiHandler<
  TGetResponse | TPostResponse | TDeleteResponse
> = async (req, res) => {
  const { method, query } = req;
  if (method === "POST") {
    const { currentUserId, requestId } = query as z.infer<
      typeof receivedRequestsIdSchema["post"]["query"]
    >;
    const data = await acceptFriendRequest({ currentUserId, requestId });
    res.status(201).json(data);
  } else if (method === "DELETE") {
    const { currentUserId, requestId } = query as z.infer<
      typeof receivedRequestsIdSchema["delete"]["query"]
    >;
    const data = await deleteReceivedRequest({ currentUserId, requestId });
    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["POST", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withAuth(
  withValidation(
    [
      {
        requestMethod: "DELETE",
        schema: receivedRequestsIdSchema["delete"]["query"],
        validationTarget: "query",
      },
      {
        requestMethod: "POST",
        schema: receivedRequestsIdSchema["post"]["query"],
        validationTarget: "query",
      },
    ],
    handler
  )
);

export type TGetResponse = Awaited<ReturnType<typeof checkReceivedRequest>>;
const checkReceivedRequest = async ({
  currentUserId,
  requestId,
}: {
  currentUserId: string;
  requestId: string;
}) => {
  return !!(await prisma.user.findFirst({
    where: {
      id: currentUserId,
      receivedRequests: { some: { id: requestId } },
    },
  }));
};

export type TPostResponse = Awaited<ReturnType<typeof acceptFriendRequest>>;
const acceptFriendRequest = async ({
  currentUserId,
  requestId,
}: {
  currentUserId: string;
  requestId: string;
}) => {
  return await prisma.user.update({
    where: { id: currentUserId },
    data: {
      receivedRequests: { disconnect: { id: requestId } },
      friends: { connect: { id: requestId } },
    },
  });
};

export type TDeleteResponse = Awaited<ReturnType<typeof deleteReceivedRequest>>;
const deleteReceivedRequest = async ({
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
