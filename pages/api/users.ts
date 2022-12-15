import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import authOptions from "@/lib/nextAuth/authOptions";
import { GetResponse, TGetResponse } from "@/lib/api/users";

/**
 * @description api handler to get all users in website
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session?.user.id) {
      const obj = new GetResponse(session?.user.id);
      const response: TGetResponse = await obj.response;
      res.status(200).json(response);
    } else {
      res.status(400).json("No user id");
    }
  }
};

export default handler;
