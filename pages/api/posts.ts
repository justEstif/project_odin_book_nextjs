import withAuth from "@/lib-server/middleware/with-auth";
import withValidation from "@/lib-server/middleware/with-validation";
import prisma from "@/lib-server/prisma";
import { postSchema } from "@/lib-server/validations/post";
import type { NextApiHandler } from "next";

const handler: NextApiHandler<TGetResponse | TPostResponse> = async (
  req,
  res
) => {
  const {
    method,
    query: { currentUserId },
    body: { content },
  } = req;

  switch (method) {
    /**
     * @description get posts of friends of current user
     * @access any logged in user
     */
    case "GET":
      if (typeof currentUserId === "string") {
        const data = await getPosts(currentUserId);
        res.status(200).json(data);
      }
      res.status(403).end();
      break;
    /**
     * @description create a post
     * @access any logged in user
     */
    case "POST":
      if (typeof currentUserId === "string") {
        const data = await createPost(currentUserId, content);
        res.status(200).json(data);
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
const getPosts = async (currentUserId: string) => {
  return await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    where: {
      OR: [
        { user: { friends: { some: { id: currentUserId } } } },
        { user: { friendsOf: { some: { id: currentUserId } } } },
      ],
    },
  });
};

export type TPostResponse = Awaited<ReturnType<typeof createPost>>;
const createPost = async (currentUserId: string, content: string) => {
  return await prisma.post.create({
    data: {
      content: content,
      user: { connect: { id: currentUserId } },
    },
  });
};
