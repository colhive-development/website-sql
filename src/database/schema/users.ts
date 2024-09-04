import { boolean, pgTable, text } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password"),
  emailVerified: boolean("email_verified").default(false),
  image: text("image"),
  companyId: text("company_id").references(() => company.id, {
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
  password: text("password"),
  emailVerified: boolean("email_verified").default(false),
  image: text("image"),
});
