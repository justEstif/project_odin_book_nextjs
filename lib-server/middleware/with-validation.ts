import type { NextApiHandler, NextApiRequest } from "next";
import { z } from "zod";
import type { ZodSchema } from "zod";

type TValidation = {
  requestMethod: string;
  schema: ZodSchema;
  validationTarget: keyof NextApiRequest;
};

const withValidation = (
  validations: TValidation[],
  handler: NextApiHandler
) => {
  const middleware: NextApiHandler = (req, res) => {
    for (const validation of validations) {
      const { validationTarget, requestMethod, schema } = validation;
      if (req.method === requestMethod) {
        try {
          schema.parse(req[validationTarget] ? req[validationTarget] : {});
        } catch (error) {
          if (error instanceof z.ZodError) {
            return res.status(422).json(error.issues);
          }
          return res.status(422).end();
        }
      }
    }
    return handler(req, res);
  };
  return middleware;
};

export default withValidation;
