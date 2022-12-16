import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import authOptions from "@/lib-server/nextAuth/authOptions";
import { NameImage, TNameProfile } from "@/lib-server/services/users";

export type TResponse = TNameProfile | { message: string };

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<TResponse>
) => {
  const { method } = req;
  switch (method) {
    case "GET":
      const session = await unstable_getServerSession(req, res, authOptions);
      if (session?.user.id) {
        const id = session?.user.id;
        const data = await NameImage(id);
        res.status(200).json(data);
      } else {
        res.status(400).json({ message: "No user id" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
