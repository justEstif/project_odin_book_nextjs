import type { NextApiHandler, NextApiRequest } from "next";
import { z } from "zod";
import type { ZodSchema } from "zod";

type TValidation = {
  requestMethod: string;
  schema: ZodSchema;
  handler: NextApiHandler;
  validationTarget: keyof NextApiRequest;
};

// method, schema, obj
const validation = ({
  requestMethod,
  schema,
  handler,
  validationTarget,
}: TValidation) => {
  const middleware: NextApiHandler = async (req, res) => {
    switch (req.method) {
      case requestMethod:
        try {
          await schema.parse(
            req[validationTarget] ? req[validationTarget] : {}
          );
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

const withValidation = (schema: ZodSchema, handler: NextApiHandler) => {
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
