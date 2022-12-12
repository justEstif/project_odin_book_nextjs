import { object, string } from "zod";

const envSchema = object({
  // db
  DATABASE_URL: string(),

  // jwt
  NEXTAUTH_URL: string(),
  NEXTAUTH_SECRET: string(),

  // email provider
  EMAIL_SERVER_USER: string(),
  EMAIL_SERVER_PASSWORD: string(),
  EMAIL_SERVER_HOST: string(),
  EMAIL_SERVER_PORT: string(),
  EMAIL_FROM: string(),

  // facebook provider
  FACEBOOK_ID: string(),
  FACEBOOK_SECRET: string(),
});

export default envSchema;
