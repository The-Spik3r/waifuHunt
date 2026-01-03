import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./client";

export interface WaifuLeaderboard {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  source: string | null;
  totalVotes: number;
  createdAt: string;
}

export interface LeaderboardMeta {
  limit: number;
  offset: number;
  total: number;
  count: number;
}

export interface LeaderboardResponse {
  data: WaifuLeaderboard[];
  meta: LeaderboardMeta;
}

export async function getLeaderboard(
  limit: number = 10,
  offset: number = 0
): Promise<LeaderboardResponse> {
  const response = await axiosInstance.get<LeaderboardResponse>(
    "/votes/leaderboard",
    {
      params: { limit, offset },
    }
  );
  return response.data;
}

// Hook personalizado con TanStack Query
export function useLeaderboard(limit: number = 10, offset: number = 0) {
  return useQuery({
    queryKey: ["leaderboard", limit, offset],
    queryFn: () => getLeaderboard(limit, offset),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

export interface CreateVotePayload {
  userId: string;
  waifuId: string;
  value: number;
  source: string;
}

export interface CreateVoteResponse {
  success: boolean;
  data: {
    id: string;
    userId: string;
    waifuId: string;
    value: number;
    source: string;
    createdAt: string;
  };
}

/**
 * Crear un nuevo voto
 */
export async function createVote(
  payload: CreateVotePayload
): Promise<CreateVoteResponse> {
  const response = await axiosInstance.post<CreateVoteResponse>(
    "/votes",
    payload
  );
  return response.data;
}
