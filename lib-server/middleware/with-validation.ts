import type { NextApiHandler } from "next";
import { z } from "zod";
import type { ZodSchema } from "zod";

const withValidation = <T extends ZodSchema>(
  schema: T,
  handler: NextApiHandler
) => {
  const middleware: NextApiHandler = async (req, res) => {
    const { method } = req;

    switch (method) {
      case "POST":
        try {
          const body = req.body ? req.body : {};
          await schema.parse(body);
          return handler(req, res);
        } catch (error) {
          if (error instanceof z.ZodError) {
            return res.status(422).json(error.issues);
          }
          return res.status(422).end();
        }
      default:
        return handler(req, res);
    }
  };
  return middleware;
};

export default withValidation;
