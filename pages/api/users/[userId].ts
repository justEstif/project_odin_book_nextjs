import withAuth from "@/lib-server/middleware/with-auth";
import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";
import { userIdSchema } from "@/lib-server/validations/users";
import withValidation from "@/lib-server/middleware/with-validation";
import { z } from "zod";

const handler: NextApiHandler<TGetResponse | TDeleteResponse> = async (
  req,
  res
) => {
  const { query, method } = req;

  if (method === "GET") {
    const { currentUserId, userId } = query as z.infer<
      typeof userIdSchema["get"]["query"]
    >;
    const data = await getPostsProfileFriendsCount({
      currentUserId,
      userId,
    });
    res.status(200).json(data);
  } else if (method === "DELETE") {
    const { currentUserId } = query as z.infer<
      typeof userIdSchema["delete"]["query"]
    >;
    const data = await deleteUser({ currentUserId });
    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["GET", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withValidation(
  [
    {
      requestMethod: "GET",
      validationTarget: "query",
      schema: userIdSchema.get.query,
    },
    {
      requestMethod: "DELETE",
      validationTarget: "query",
      schema: userIdSchema.delete.query,
    },
  ],
  withAuth(handler)
);

export type TGetResponse = Awaited<
  ReturnType<typeof getPostsProfileFriendsCount>
>;
const getPostsProfileFriendsCount = async ({
  userId,
  currentUserId,
}: {
  userId: string;
  currentUserId: string;
}) =>
  await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      posts: true,
      profile: true,
      friends: {
        where: { id: currentUserId },
        select: { id: true },
      },
      friendsOf: {
        where: { id: currentUserId },
        select: { id: true },
      },
      sentRequests: {
        where: { id: currentUserId },
        select: { id: true },
      },
      receivedRequests: {
        where: { id: currentUserId },
        select: { id: true },
      },
      _count: {
        select: {
          friends: true,
          posts: true,
        },
      },
    },
  });

export type TDeleteResponse = Awaited<ReturnType<typeof deleteUser>>;
const deleteUser = async ({ currentUserId }: { currentUserId: string }) => {
  return await prisma.user.delete({
    where: { id: currentUserId },
  });
};
