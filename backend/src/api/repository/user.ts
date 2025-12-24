import { db } from "@/api/db";
import { user } from "@/api/db/schema";
import { eq } from "drizzle-orm";

export const getAllUsers = async () => {
  return await db.select().from(user);
};

export const getUserById = async (id: string) => {
  const result = await db.select().from(user).where(eq(user.id, id));
  return result[0];
};

export const getUserByEmail = async (email: string) => {
  const result = await db.select().from(user).where(eq(user.email, email));
  return result[0];
};

export const createUser = async (userData: typeof user.$inferInsert) => {
  const result = await db.insert(user).values(userData);
  return result;
};

export const updateUser = async (
  id: string,
  userData: Partial<typeof user.$inferInsert>
) => {
  const result = await db.update(user).set(userData).where(eq(user.id, id));
  return result;
};

export const deleteUser = async (id: string) => {
  const result = await db.delete(user).where(eq(user.id, id));
  return result;
};
