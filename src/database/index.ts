import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(
  "postgresql://website_owner:hNi7Iug0GvbE@ep-noisy-thunder-a1v5hnbr.ap-southeast-1.aws.neon.tech/website?sslmode=require",
);

export const db = drizzle(sql);
