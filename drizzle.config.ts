import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://admin_blog:npg_LAqJsM2Wtm0X@ep-nameless-pond-zaciigr9.c-2.eu-west-2.aws.neon.tech/neondb?sslmode=require",
  },
});