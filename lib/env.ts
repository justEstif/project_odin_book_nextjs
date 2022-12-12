import envSchema from "./nextAuth/validation/env";

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error(JSON.stringify(env.error.format(), null, 4));
  process.exit(1);
}

export default env.data;
