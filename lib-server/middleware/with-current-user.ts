import type { NextApiHandler } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { z } from "zod";
import authOptions from "../nextAuth/authOptions";

export const schema = z.object({
  userId: z.string(),
});

const withCurrentUser = (handler: NextApiHandler) => {
  const middleware: NextApiHandler = async (req, res) => {
    try {
      const query = schema.parse(req.query);

      // Check if the user has access to this user.
      const session = await unstable_getServerSession(req, res, authOptions);

      if (query.userId !== session?.user.id) {
        return res.status(403).end();
      } else {
        const id = session?.user.id;
        req.query.userId = id;
        return handler(req, res);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }
      return res.status(500).end();
    }
  };
  return middleware;
};

export default withCurrentUser;
