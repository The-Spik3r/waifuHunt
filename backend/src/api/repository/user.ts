import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema/users";
import type { CreateUserBody, UserResponse } from "../user/validation";

export const getAllUsers = async (): Promise<UserResponse[]> => {
  const allUsers = await db.select().from(users);
  return allUsers.map((user) => ({
    ...user,
    age: user.age ?? undefined,
  }));
};

export const createUser = async (
  userData: CreateUserBody
): Promise<UserResponse> => {
  const newUser = {
    id: `u_${Date.now()}`,
    name: userData.name,
    email: userData.email,
    age: userData.age ?? null,
  };

  await db.insert(users).values(newUser);
  return {
    ...newUser,
    age: newUser.age ?? undefined,
  };
};

export const getUserById = async (id: string): Promise<UserResponse | null> => {
  const [user] = await db.select().from(users).where(eq(users.id, Number.parseInt(id)));

  if (!user) return null;

  return {
    ...user,
    age: user.age ?? undefined,
  };
};
