import { type MySql2Database, drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { env } from "../../utils/env";
import * as table from "./schema";

declare global {
  var __db__: MySql2Database<typeof table> | undefined;
}

let db: MySql2Database<typeof table>;

const dbConfig = {
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  port: env.DB_PORT,
};

if (env.NODE_ENV === "production") {
  db = drizzle(mysql.createPool(dbConfig), { schema: table, mode: "default" });
} else {
  if (!global.__db__) {
    global.__db__ = drizzle(mysql.createPool(dbConfig), {
      schema: table,
      mode: "default",
    });
  }
  db = global.__db__;
}

export { db };
