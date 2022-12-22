import { z } from "zod";

const envSchema = z.object({
  BASE_FETCH_URL: z.string(),
  NODE_ENV: z.string(),
  // db
  DATABASE_URL: z.string(),

  // jwt
  NEXTAUTH_URL: z.string(),
  NEXTAUTH_SECRET: z.string(),

  // email provider
  EMAIL_SERVER_USER: z.string(),
  EMAIL_SERVER_PASSWORD: z.string(),
  EMAIL_SERVER_HOST: z.string(),
  EMAIL_SERVER_PORT: z.string(),
  EMAIL_FROM: z.string(),

  // facebook provider
  FACEBOOK_ID: z.string(),
  FACEBOOK_SECRET: z.string(),
});

const envParse = envSchema.safeParse(process.env);

if (!envParse.success) {
  console.error(JSON.stringify(envParse.error.format(), null, 4));
  process.exit?.(1);
}

const env = envParse.data;
export default env;
