import { dependecyContainer } from "@/api/config/dependecyContainer";
import type { WaifuData } from "@/api/repository/waifu";

export const getAll = async (limit?: number, offset?: number) => {
  return await dependecyContainer.RepositoryWaifu.getAll(limit, offset);
};

export const getById = async (id: string) => {
  return await dependecyContainer.RepositoryWaifu.getById(id);
};

export const getBySlug = async (slug: string) => {
  return await dependecyContainer.RepositoryWaifu.getBySlug(slug);
};

export const create = async (waifuData: WaifuData) => {
  // Validaciones de negocio adicionales pueden ir aquí
  return await dependecyContainer.RepositoryWaifu.create(waifuData);
};

export const update = async (id: string, waifuData: Partial<WaifuData>) => {
  return await dependecyContainer.RepositoryWaifu.update(id, waifuData);
};

export const deleteById = async (id: string) => {
  return await dependecyContainer.RepositoryWaifu.deleteById(id);
};

export const searchByName = async (query: string, limit?: number) => {
  return await dependecyContainer.RepositoryWaifu.searchByName(query, limit);
};

export const getBySource = async (
  source: string,
  limit?: number,
  offset?: number
) => {
  return await dependecyContainer.RepositoryWaifu.getBySource(
    source,
    limit,
    offset
  );
};

export const count = async () => {
  return await dependecyContainer.RepositoryWaifu.count();
};
