import { db } from "../db";
import { votes } from "../db/schema/votes";
import { waifus } from "../db/schema/waifus";
import { eq, and, desc, sql } from "drizzle-orm";

export interface VoteData {
  id?: string;
  userId: string;
  waifuId: string;
  value?: number;
  source?: string;
}

export interface WaifuWithVotes {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  description?: string;
  source: string | null;
  totalVotes: number;
  createdAt: Date;
}

// Get all votes
export async function getAll(limit = 100, offset = 0) {
  return await db
    .select()
    .from(votes)
    .orderBy(desc(votes.createdAt))
    .limit(limit)
    .offset(offset);
}

// Get vote by ID
export async function getById(id: string) {
  const result = await db.select().from(votes).where(eq(votes.id, id));

  return result[0] || null;
}

// Get votes by user
export async function getByUserId(userId: string, limit = 50, offset = 0) {
  return await db
    .select()
    .from(votes)
    .where(eq(votes.userId, userId))
    .orderBy(desc(votes.createdAt))
    .limit(limit)
    .offset(offset);
}

// Get votes by waifu
export async function getByWaifuId(waifuId: string, limit = 50, offset = 0) {
  return await db
    .select()
    .from(votes)
    .where(eq(votes.waifuId, waifuId))
    .orderBy(desc(votes.createdAt))
    .limit(limit)
    .offset(offset);
}

// Check if user already voted for a waifu
export async function hasUserVoted(userId: string, waifuId: string) {
  const result = await db
    .select()
    .from(votes)
    .where(and(eq(votes.userId, userId), eq(votes.waifuId, waifuId)));

  return result.length > 0;
}

// Get user's vote for a specific waifu
export async function getUserVote(userId: string, waifuId: string) {
  const result = await db
    .select()
    .from(votes)
    .where(and(eq(votes.userId, userId), eq(votes.waifuId, waifuId)));

  return result[0] || null;
}

// Create new vote
export async function create(voteData: VoteData) {
  // Check if user already voted
  const existingVote = await getUserVote(voteData.userId, voteData.waifuId);

  if (existingVote) {
    throw new Error("User already voted for this waifu");
  }

  const id = voteData.id || crypto.randomUUID();

  await db.insert(votes).values({
    id,
    userId: voteData.userId,
    waifuId: voteData.waifuId,
    value: voteData.value || 1,
    source: voteData.source || "normal",
  });

  return await getById(id);
}

// Update vote value (for boosts)
export async function updateValue(id: string, value: number) {
  await db.update(votes).set({ value }).where(eq(votes.id, id));

  return await getById(id);
}

// Delete vote
export async function deleteById(id: string) {
  const vote = await getById(id);

  if (!vote) {
    return null;
  }

  await db.delete(votes).where(eq(votes.id, id));

  return vote;
}

// Delete user's vote for a waifu
export async function deleteUserVote(userId: string, waifuId: string) {
  const vote = await getUserVote(userId, waifuId);

  if (!vote) {
    return null;
  }

  await db
    .delete(votes)
    .where(and(eq(votes.userId, userId), eq(votes.waifuId, waifuId)));

  return vote;
}

// Get total votes for a waifu
export async function getWaifuVoteCount(waifuId: string) {
  const result = await db
    .select({ total: sql<number>`sum(${votes.value})` })
    .from(votes)
    .where(eq(votes.waifuId, waifuId));

  return result[0]?.total || 0;
}

// Get user's total votes
export async function getUserVoteCount(userId: string) {
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(votes)
    .where(eq(votes.userId, userId));

  return result[0]?.count || 0;
}

// Get top voted waifus (leaderboard)
export async function getTopWaifus(
  limit = 10,
  offset = 0
): Promise<{ data: WaifuWithVotes[]; total: number }> {
  // Obtener el total de waifus
  const totalResult = await db
    .select({ count: sql<number>`count(distinct ${waifus.id})` })
    .from(waifus);

  const total = totalResult[0]?.count || 0;

  // Obtener las waifus con paginación
  const result = await db
    .select({
      id: waifus.id,
      name: waifus.name,
      slug: waifus.slug,
      imageUrl: waifus.imageUrl,
      description: waifus.description,
      source: waifus.source,
      totalVotes: sql<number>`sum(${votes.value})`,
      createdAt: waifus.createdAt,
    })
    .from(waifus)
    .leftJoin(votes, eq(waifus.id, votes.waifuId))
    .groupBy(waifus.id)
    .orderBy(desc(sql`sum(${votes.value})`))
    .limit(limit)
    .offset(offset);

  return {
    data: result as WaifuWithVotes[],
    total,
  };
}

// Get user's voted waifus
export async function getUserVotedWaifus(
  userId: string,
  limit = 50,
  offset = 0
) {
  return await db
    .select({
      vote: votes,
      waifu: waifus,
    })
    .from(votes)
    .innerJoin(waifus, eq(votes.waifuId, waifus.id))
    .where(eq(votes.userId, userId))
    .orderBy(desc(votes.createdAt))
    .limit(limit)
    .offset(offset);
}
