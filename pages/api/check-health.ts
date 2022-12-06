import type { NextApiRequest, NextApiResponse } from "next";

type TReq = {
  value: string;
};

const handler = (_req: NextApiRequest, res: NextApiResponse<TReq>) => {
  res.status(200).json({
    value: "OK",
  });
};

export default handler;
