import type { NextApiHandler } from "next";
import prisma from "@/lib-server/prisma";
import { postSchema, TPostSchema } from "@/lib-server/validations/post";
import withAuth from "@/lib-server/middleware/with-auth";
import withValidation from "@/lib-server/middleware/with-validation";

const handler: NextApiHandler<TGetResponse | TPostResponse> = async (
  req,
  res
) => {
  const {
    query: { userId, currentUserId },
    method,
    body,
  } = req;

  switch (method) {
    /**
     * @description get posts of user
     * @access any logged in user
     */
    case "GET":
      if (typeof userId === "string") {
        const data = await getPosts({ userId });
        res.status(200).json(data);
      }
      res.status(403).end();
      break;

    /**
     * @description create a post
     * @access any logged in user can create a post from themselves
     */
    case "POST":
      if (
        typeof currentUserId === "string" &&
        typeof userId === "string" &&
        currentUserId === userId
      ) {
        const postBody = body as TPostSchema;
        const data = await createPost({ currentUserId, postBody });
        res.status(201).json(data);
      }
      res.status(403).end();
      break;


    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withValidation(postSchema, withAuth(handler));

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
  postBody: TPostSchema;
}) => {
  return await prisma.post.create({
    data: {
      content: postBody.content,
      user: { connect: { id: currentUserId } },
    },
  });
};
