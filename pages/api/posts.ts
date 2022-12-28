import withAuth from "@/lib-server/middleware/with-auth";
import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";
import { postsSchema } from "@/lib-server/validations/posts";
import withValidation from "@/lib-server/middleware/with-validation";
import { z } from "zod";

const handler: NextApiHandler<TGetResponse> = async (req, res) => {
  const { method, query } = req;
  if (method === "GET") {
    const { currentUserId } = query as z.infer<
      typeof postsSchema["get"]["query"]
    >;
    const data = await getPosts(currentUserId);
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
        schema: postsSchema.get.query,
        requestMethod: "GET",
        validationTarget: "query",
      },
    ],
    handler
  )
);

export type TGetResponse = Awaited<ReturnType<typeof getPosts>>;
const getPosts = async (currentUserId: string) => {
  return await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    where: {
      OR: [
        { user: { friends: { some: { id: currentUserId } } } },
        { user: { friendsOf: { some: { id: currentUserId } } } },
      ],
    },
    include: {
      user: {
        select: {
          id: true,
          profile: { select: { name: true, image: true } },
        },
      },
    },
  });
};
