import { pgTable, text } from "drizzle-orm/pg-core";
import { company } from "./users";

export const project = pgTable("project", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  companyId: text("company_id").references(() => company.id, {
    onDelete: "cascade",
  }),
});

export const subProject = pgTable("sub_project", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  projectId: text("project_id").references(() => project.id, {
    onDelete: "cascade",
  }),
});