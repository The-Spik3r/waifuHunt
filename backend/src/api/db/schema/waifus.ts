import {
  mysqlTable,
  varchar,
  timestamp,
  boolean,
  text,
  index,
} from "drizzle-orm/mysql-core";

export const waifus = mysqlTable(
  "waifus",
  {
    id: varchar("id", { length: 36 }).primaryKey(), // uuid
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    imageUrl: varchar("imageUrl", { length: 1024 }).notNull(),
    source: varchar("source", { length: 255 }), // anime/manga/manhwa
    description: text("description"), // descripción de la waifu
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (t) => ({
    slugIdx: index("waifus_slug_idx").on(t.slug),
  })
);
