import {
  mysqlTable,
  varchar,
  timestamp,
  boolean,
  index,
  tinyint,
} from "drizzle-orm/mysql-core";
import { user } from "./auth"; // tu tabla de Better Auth
import { waifus } from "./waifus";

export const votes = mysqlTable(
  "votes",
  {
    id: varchar("id", { length: 36 }).primaryKey(), // uuid
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    waifuId: varchar("waifuId", { length: 36 })
      .notNull()
      .references(() => waifus.id, { onDelete: "cascade" }),

    // 1 normal, 2 o 3 si hubo boost
    value: tinyint("value").notNull().default(1),

    // opcional, ayuda para analytics / logros
    source: varchar("source", { length: 32 }).notNull().default("normal"), // normal|minigame
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (t) => ({
    waifuIdx: index("votes_waifu_idx").on(t.waifuId),
    userIdx: index("votes_user_idx").on(t.userId),
    waifuUserIdx: index("votes_waifu_user_idx").on(t.waifuId, t.userId),
    createdIdx: index("votes_created_idx").on(t.createdAt),
  })
);
