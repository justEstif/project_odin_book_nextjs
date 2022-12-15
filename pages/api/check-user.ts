import type { NextApiRequest, NextApiResponse } from "next";
import authOptions from "@/lib-server/nextAuth/authOptions";
import { unstable_getServerSession } from "next-auth";

type TReq = {
  user: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<TReq>) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(200).json({
      user: "There is no user",
    });
  } else {
    res.status(200).json({
      user: "There is a user",
    });
  }
};

export default handler;
