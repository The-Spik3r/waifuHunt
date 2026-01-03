import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./client";

export interface Waifu {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  source: string;
  description: string | null;
  createdAt: string;
}

export interface PaginationMeta {
  limit: number;
  offset: number;
  total: number;
}

export interface WaifusResponse {
  data: Waifu[];
  pagination?: PaginationMeta;
  meta?: PaginationMeta;
}

export interface GetWaifusParams {
  limit?: number;
  offset?: number;
  search?: string;
}

/**
 * Obtiene la lista de waifus con paginación y búsqueda opcional
 */
export async function getWaifus(
  params: GetWaifusParams = {}
): Promise<WaifusResponse> {
  const { limit = 100, offset = 0, search } = params;

  const response = await axiosInstance.get<WaifusResponse>("/waifus", {
    params: {
      limit,
      offset,
      ...(search && { search }),
    },
  });

  return response.data;
}

/**
 * Hook personalizado con TanStack Query para obtener waifus
 */
export function useWaifus(
  params: GetWaifusParams = {},
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ["waifus", params],
    queryFn: () => getWaifus(params),
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled,
  });
}

/**
 * Obtiene una waifu específica por ID o slug
 */
export async function getWaifu(idOrSlug: string): Promise<Waifu> {
  const response = await axiosInstance.get<Waifu>(`/waifus/${idOrSlug}`);
  return response.data;
}

/**
 * Hook personalizado con TanStack Query para obtener una waifu específica
 */
export function useWaifu(idOrSlug: string) {
  return useQuery({
    queryKey: ["waifu", idOrSlug],
    queryFn: () => getWaifu(idOrSlug),
    enabled: !!idOrSlug,
    staleTime: 1000 * 60 * 5,
  });
}

export interface SearchWaifusParams {
  q?: string;
  limit?: number;
}

/**
 * Busca waifus usando el endpoint de búsqueda
 */
export async function searchWaifus(
  params: SearchWaifusParams = {}
): Promise<WaifusResponse> {
  const { q = "", limit = 100 } = params;

  const response = await axiosInstance.get<WaifusResponse>("/waifus/search", {
    params: {
      q,
      limit: limit,
    },
  });

  return response.data;
}

/**
 * Hook personalizado con TanStack Query para búsqueda de waifus
 */
export function useSearchWaifus(
  params: SearchWaifusParams = {},
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ["waifus-search", params],
    queryFn: () => searchWaifus(params),
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled,
  });
}
