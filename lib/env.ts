import { object, string } from "zod";

const envSchema = object({
  FACEBOOK_ID: string(),
  FACEBOOK_SECRET: string(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error(JSON.stringify(env.error.format(), null, 4));
  process.exit(1);
}

export default env.data;
