import { NextApiHandler } from "next";
import prisma from "@/lib-server/prisma";
import withAuth from "@/lib-server/middleware/with-auth";
import withValidation from "@/lib-server/middleware/with-validation";
import { z } from "zod";
import { sentRequestsIdSchema } from "@/lib-server/validations/users";

const handler: NextApiHandler<
  TPostResponse | TGetResponse | TDeleteResponse
> = async (req, res) => {
  const { method, query } = req;
  if (method === "POST") {
    const { currentUserId, requestId } = query as z.infer<
      typeof sentRequestsIdSchema["post"]["query"]
    >;
    const data = await sendFriendRequest({ currentUserId, requestId });
    res.status(201).json(data);
  } else if (method === "DELETE") {
    const { currentUserId, requestId } = query as z.infer<
      typeof sentRequestsIdSchema["delete"]["query"]
    >;
    const data = await deleteSentRequest({ currentUserId, requestId });
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
        requestMethod: "POST",
        schema: sentRequestsIdSchema["post"]["query"],
        validationTarget: "query",
      },
      {
        requestMethod: "DELETE",
        schema: sentRequestsIdSchema["delete"]["query"],
        validationTarget: "query",
      },
    ],
    handler
  )
);

export type TGetResponse = Awaited<ReturnType<typeof checkSentRequest>>;
const checkSentRequest = async ({
  currentUserId,
  requestId,
}: {
  currentUserId: string;
  requestId: string;
}) => {
  return !!(await prisma.user.findFirst({
    where: {
      id: currentUserId,
      sentRequests: { some: { id: requestId } },
    },
  }));
};

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
    data: { sentRequests: { disconnect: { id: requestId } } },
  });
};
