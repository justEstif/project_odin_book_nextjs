import type { NextApiResponse, NextApiRequest } from "next";
import { TPostsFriendsCount, UserService } from "@/lib-server/services/user";

export type TResponse =
  | TPostsFriendsCount
  | {
    message: string;
  };

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
        const data = await UserService.postsFriendsCount(id);
        res.status(200).json(data);
      } else {
        res.status(400).json({ message: "Invalid id type" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
