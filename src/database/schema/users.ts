import { InferSelectModel } from "drizzle-orm";
import { boolean, pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  emailVerified: boolean("email_verified").default(false),
  image: text("image"),
  role: text("role").notNull(),
  companyId: text("company_id")
    .notNull()
    .references(() => company.id, {
      onDelete: "cascade",
      onUpdate: "no action",
    }),
});

export const company = pgTable("company", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  emailVerified: boolean("email_verified").default(false),
  image: text("image"),
});

export const insertCompanySchema = createInsertSchema(company, {
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  email: z.string().email({ message: "Email is needed for acount creation." }),
});

export const insertIndividualSchema = createInsertSchema(users, {
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  email: z.string().email({ message: "Email is needed for acount creation." }),
});

export type Individuals = InferSelectModel<typeof users>;

export type Company = InferSelectModel<typeof company>;
