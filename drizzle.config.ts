import type { Config } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();

export default {
  dialect: "postgresql",
  schema: "./src/database/schema",
  out: "./src/database/migration",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
