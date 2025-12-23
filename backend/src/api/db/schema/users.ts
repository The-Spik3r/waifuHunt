import { mysqlTable, varchar, int } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  age: int("age"),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
