import type { NextApiHandler } from "next";
import { z } from "zod";
import type { ZodSchema } from "zod";

const withValidation = <T extends ZodSchema>(
  schema: T,
  handler: NextApiHandler
) => {
  const middleware: NextApiHandler = async (req, res) => {
    try {
      const body = req.body ? req.body : {};
      console.log(body);
      await schema.parse(body);
      return handler(req, res);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }
      return res.status(422).end();
    }
  };
  return middleware;
};

export default withValidation;
