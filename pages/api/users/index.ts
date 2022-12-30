import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";
import withAuth from "@/lib-server/middleware/with-auth";
import withValidation from "@/lib-server/middleware/with-validation";
import { usersSchema } from "@/lib-server/validations/users";
import { z } from "zod";

const handler: NextApiHandler<TGetResponse> = async (req, res) => {
  const { method, query } = req;
  if (method === "GET") {
    const { currentUserId } = query as z.infer<
      typeof usersSchema["get"]["query"]
    >;
    const data = await getUsers({ currentUserId });
    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withAuth(
  withValidation(
    [
      {
        schema: usersSchema.get.query,
        requestMethod: "GET",
        validationTarget: "query",
      },
    ],
    handler
  )
);

export type TGetResponse = Awaited<ReturnType<typeof getUsers>>;
const getUsers = async ({ currentUserId }: { currentUserId: string }) => {
  const xprisma = prisma.$extends({
    name: "with-relation",
    model: {
      user: {
        findWithRelation: async () => {
          const users = await prisma.user.findMany({
            select: {
              id: true,
              profile: { select: { name: true, image: true } },
            },
          });

          return await Promise.all(
            users.map(async (user) => ({
              ...user,
              relation: await getRelation({ id: user.id, currentUserId }),
            }))
          );
        },
      },
    },
  });

  return await xprisma.user.findWithRelation();
};

const getRelation = async ({
  id,
  currentUserId,
}: {
  id: string;
  currentUserId: string;
}) => {
  const user = id === currentUserId;
  const receivedRequests = !!(await prisma.user.findFirst({
    where: {
      id: id,
      receivedRequests: { some: { id: currentUserId } },
    },
  }));
  const sentRequest = !!(await prisma.user.findFirst({
    where: {
      id: id,
      sentRequests: { some: { id: currentUserId } },
    },
  }));
  const friend = !!(await prisma.user.findFirst({
    where: {
      id: id,
      OR: [
        { friends: { some: { id: currentUserId } } },
        { friendsOf: { some: { id: currentUserId } } },
      ],
    },
  }));

  if (receivedRequests) return "received-request";
  if (sentRequest) return "sent-request";
  if (friend) return "friend";
  if (user) return "user";
  return "other";
};
