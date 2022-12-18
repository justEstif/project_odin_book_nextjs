import withAuth from "@/lib-server/middleware/with-auth";
import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";

type TGetResponse = TGetPosts | { message: string };
export type TResponse = TGetResponse;

const handler: NextApiHandler<TResponse> = async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    /** @access logged in user: not required to be the current user */
    case "GET":
      if (typeof id === "string") {
        const data = await getPosts(id);
        res.status(200).json(data);
      }
      res.status(403).end();
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withAuth(handler);

const getPosts = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    select: { posts: true },
  });
};

type TGetPosts = Awaited<ReturnType<typeof getPosts>>;
