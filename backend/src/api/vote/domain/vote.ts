import { dependecyContainer } from "@/api/config/dependecyContainer";
import type { VoteData } from "@/api/repository/vote";

export const getAll = async (limit?: number, offset?: number) => {
  return await dependecyContainer.RepositoryVote.getAll(limit, offset);
};

export const getById = async (id: string) => {
  return await dependecyContainer.RepositoryVote.getById(id);
};

export const getByUserId = async (
  userId: string,
  limit?: number,
  offset?: number
) => {
  return await dependecyContainer.RepositoryVote.getByUserId(
    userId,
    limit,
    offset
  );
};

export const getByWaifuId = async (
  waifuId: string,
  limit?: number,
  offset?: number
) => {
  return await dependecyContainer.RepositoryVote.getByWaifuId(
    waifuId,
    limit,
    offset
  );
};

export const hasUserVoted = async (userId: string, waifuId: string) => {
  return await dependecyContainer.RepositoryVote.hasUserVoted(userId, waifuId);
};

export const getUserVote = async (userId: string, waifuId: string) => {
  return await dependecyContainer.RepositoryVote.getUserVote(userId, waifuId);
};

export const create = async (voteData: VoteData) => {
  // Validaciones de negocio adicionales
  return await dependecyContainer.RepositoryVote.create(voteData);
};

export const updateValue = async (id: string, value: number) => {
  return await dependecyContainer.RepositoryVote.updateValue(id, value);
};

export const deleteById = async (id: string) => {
  return await dependecyContainer.RepositoryVote.deleteById(id);
};

export const deleteUserVote = async (userId: string, waifuId: string) => {
  return await dependecyContainer.RepositoryVote.deleteUserVote(
    userId,
    waifuId
  );
};

export const getWaifuVoteCount = async (waifuId: string) => {
  return await dependecyContainer.RepositoryVote.getWaifuVoteCount(waifuId);
};

export const getUserVoteCount = async (userId: string) => {
  return await dependecyContainer.RepositoryVote.getUserVoteCount(userId);
};

export const getTopWaifus = async (limit = 10, offset = 0) => {
  const result = await dependecyContainer.RepositoryVote.getTopWaifus(
    limit,
    offset
  );

  return {
    data: result.data,
    meta: {
      limit,
      offset,
      total: result.total,
      count: result.data.length,
    },
  };
};

export const getUserVotedWaifus = async (
  userId: string,
  limit?: number,
  offset?: number
) => {
  return await dependecyContainer.RepositoryVote.getUserVotedWaifus(
    userId,
    limit,
    offset
  );
};
