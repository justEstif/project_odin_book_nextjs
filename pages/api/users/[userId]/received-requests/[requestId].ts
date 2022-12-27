import { NextApiHandler } from "next";
import prisma from "@/lib-server/prisma";
import withAuth from "@/lib-server/middleware/with-auth";
import {
  requestQuerySchema,
  TRequestQuerySchema,
} from "@/lib-server/validations/request";
import withValidation from "@/lib-server/middleware/with-validation";

const handler: NextApiHandler<TPostResponse> = async (req, res) => {
  const { method, query } = req;
  if (method === "POST") {
    const { currentUserId, requestId } = query as TRequestQuerySchema;
    const data = await acceptFriendRequest({ currentUserId, requestId });
    res.status(201).json(data);
  } else if (method === "DELETE") {
    const { currentUserId, requestId } = query as TRequestQuerySchema;
    const data = await deleteReceivedRequest({ currentUserId, requestId });
    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["POST", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withValidation(
  {
    requestMethod: "DELETE",
    schema: requestQuerySchema,
    validationTarget: "query",
  },
  withValidation(
    {
      requestMethod: "POST",
      schema: requestQuerySchema,
      validationTarget: "query",
    },
    withAuth(handler)
  )
);

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
