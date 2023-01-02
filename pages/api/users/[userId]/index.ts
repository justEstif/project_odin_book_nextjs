import withAuth from "@/lib-server/middleware/with-auth";
import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";
import { userIdSchema } from "@/lib-server/validations/users";
import withValidation from "@/lib-server/middleware/with-validation";
import { z } from "zod";
import { getRelation } from "@/lib-server/utils";

const handler: NextApiHandler<TGetResponse | TDeleteResponse> = async (
  req,
  res
) => {
  const { query, method } = req;

  if (method === "GET") {
    const { currentUserId, userId } = query as z.infer<
      typeof userIdSchema["get"]["query"]
    >;
    const data = await getUser({
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

export default withAuth(
  withValidation(
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
    handler
  )
);

export type TGetResponse = Awaited<ReturnType<typeof getUser>>;
const getUser = async ({
  userId,
  currentUserId,
}: {
  userId: string;
  currentUserId: string;
}) => {
  const xprisma = prisma.$extends({
    name: "user-with-relation",
    model: {
      user: {
        findUniqueWithRelation: async () => {
          const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
              id: true,
              posts: true,
              profile: true,
              _count: {
                select: {
                  friends: true,
                  posts: true,
                },
              },
            },
          });

          return {
            ...user,
            relation: await getRelation({ id: userId, currentUserId }),
          };
        },
      },
    },
  });
  return xprisma.user.findUniqueWithRelation();
};

export type TDeleteResponse = Awaited<ReturnType<typeof deleteUser>>;
const deleteUser = async ({ currentUserId }: { currentUserId: string }) => {
  return await prisma.user.delete({
    where: { id: currentUserId },
  });
};
