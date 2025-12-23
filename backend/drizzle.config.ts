import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/api/db/schema/*",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "waifuhunt",
    port: Number(process.env.DB_PORT) || 3306,
  },
});
