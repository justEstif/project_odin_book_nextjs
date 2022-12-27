import type { NextApiHandler, NextApiRequest } from "next";
import { z } from "zod";
import type { ZodSchema } from "zod";

type TValidation = {
  requestMethod: string;
  schema: ZodSchema;
  validationTarget: keyof NextApiRequest;
};

const withValidation = (
  { validationTarget, requestMethod, schema }: TValidation,
  handler: NextApiHandler
) => {
  const middleware: NextApiHandler = (req, res) => {
    switch (req.method) {
      case requestMethod:
        try {
          schema.parse(req[validationTarget] ? req[validationTarget] : {});
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
