import { TPosts, UserService } from "@/lib-server/services/user";
import type { NextApiResponse, NextApiRequest } from "next";

export type TResponse = TPosts | { message: string };

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<TResponse>
) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      if (typeof id === "string") {
        const posts = await UserService.posts(id);
        res.status(200).json(posts);
      }
      res.status(400).json({
        message: "Invalid id type",
      });
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
