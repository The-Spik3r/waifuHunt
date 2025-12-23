import { dependecyContainer } from "@/api/config/dependecyContainer";
import type { CreateUserBody, UserResponse } from "../validation";

export const getAllUser = async (): Promise<UserResponse[]> => {
  // Lógica de negocio para obtener todos los usuarios
  return await dependecyContainer.RepositoryUser.getAllUsers();
};

export const createUser = async (
  userData: CreateUserBody
): Promise<UserResponse> => {
  // Lógica de negocio para crear un usuario
  // Aquí irían validaciones adicionales de negocio
  return await dependecyContainer.RepositoryUser.createUser(userData);
};

export const getUserById = async (id: string): Promise<UserResponse | null> => {
  // Lógica de negocio para obtener un usuario por ID
  // Aquí irían validaciones o transformaciones adicionales
  return await dependecyContainer.RepositoryUser.getUserById(id);
};
