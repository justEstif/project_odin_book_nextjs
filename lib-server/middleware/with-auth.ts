import type { NextApiHandler } from "next";
import { unstable_getServerSession } from "next-auth/next";
import authOptions from "../nextAuth/authOptions";

const withAuth = (handler: NextApiHandler) => {
  const middleware: NextApiHandler = async (req, res) => {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(403).end();
    } else {
      req.query.currentUserId = session?.user.id;
      return handler(req, res);
    }
  };
  return middleware;
};

export default withAuth;
