import { object, string } from "zod";

const envSchema = object({
  // facebook provider
  FACEBOOK_ID: string(),
  FACEBOOK_SECRET: string(),

  // email provider
  EMAIL_SERVER: string(),
  EMAIL_FROM: string(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error(JSON.stringify(env.error.format(), null, 4));
  process.exit(1);
}

export default env.data;
