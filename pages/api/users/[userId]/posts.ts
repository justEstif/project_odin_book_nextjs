import type { NextApiHandler } from "next";
import prisma from "@/lib-server/prisma";
import withAuth from "@/lib-server/middleware/with-auth";
import withValidation from "@/lib-server/middleware/with-validation";
import { z } from "zod";
import { postsSchema } from "@/lib-server/validations/users";

const handler: NextApiHandler<TGetResponse | TPostResponse> = async (
  req,
  res
) => {
  const { query, method, body } = req;
  if (method === "GET") {
    const { userId } = query as z.infer<typeof postsSchema["get"]["query"]>;
    const data = await getPosts({ userId });
    res.status(200).json(data);
  } else if (method === "POST") {
    const { currentUserId } = query as z.infer<
      typeof postsSchema["post"]["query"]
    >;
    const postBody = body as z.infer<typeof postsSchema["post"]["body"]>;
    const data = await createPost({ currentUserId, postBody });
    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withAuth(
  withValidation(
    [
      {
        requestMethod: "GET",
        schema: postsSchema["get"]["query"],
        validationTarget: "query",
      },
      {
        requestMethod: "POST",
        schema: postsSchema["post"]["query"],
        validationTarget: "query",
      },
      {
        requestMethod: "POST",
        schema: postsSchema["post"]["body"],
        validationTarget: "body",
      },
    ],
    handler
  )
);

export type TGetResponse = Awaited<ReturnType<typeof getPosts>>;
const getPosts = async ({ userId }: { userId: string }) => {
  return await prisma.post.findMany({
    where: { user: { id: userId } },
  });
};

export type TPostResponse = Awaited<ReturnType<typeof createPost>>;
const createPost = async ({
  currentUserId,
  postBody,
}: {
  currentUserId: string;
  postBody: z.infer<typeof postsSchema["post"]["body"]>;
}) => {
  return await prisma.post.create({
    data: {
      content: postBody.content,
      user: { connect: { id: currentUserId } },
    },
  });
};
