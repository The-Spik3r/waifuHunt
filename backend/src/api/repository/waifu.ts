import { db } from "../db";
import { waifus } from "../db/schema/waifus";
import { eq, desc, asc, like, sql } from "drizzle-orm";

export interface WaifuData {
  id?: string;
  name: string;
  slug: string;
  imageUrl: string;
  source?: string;
}

// Get all waifus
export async function getAll(limit = 100, offset = 0) {
  return await db
    .select()
    .from(waifus)
    .orderBy(desc(waifus.createdAt))
    .limit(limit)
    .offset(offset);
}

// Get waifu by ID
export async function getById(id: string) {
  const result = await db.select().from(waifus).where(eq(waifus.id, id));

  return result[0] || null;
}

// Get waifu by slug
export async function getBySlug(slug: string) {
  const result = await db.select().from(waifus).where(eq(waifus.slug, slug));

  return result[0] || null;
}

// Create new waifu
export async function create(waifuData: WaifuData) {
  const id = waifuData.id || crypto.randomUUID();

  await db.insert(waifus).values({
    id,
    name: waifuData.name,
    slug: waifuData.slug,
    imageUrl: waifuData.imageUrl,
    source: waifuData.source,
  });

  return await getById(id);
}

// Update waifu
export async function update(id: string, waifuData: Partial<WaifuData>) {
  await db.update(waifus).set(waifuData).where(eq(waifus.id, id));

  return await getById(id);
}

// Delete waifu
export async function deleteById(id: string) {
  const waifu = await getById(id);

  if (!waifu) {
    return null;
  }

  await db.delete(waifus).where(eq(waifus.id, id));

  return waifu;
}

// Search waifus by name
export async function searchByName(query: string, limit = 20) {
  return await db
    .select()
    .from(waifus)
    .where(like(waifus.name, `%${query}%`))
    .limit(limit);
}

// Get waifus by source
export async function getBySource(source: string, limit = 50, offset = 0) {
  return await db
    .select()
    .from(waifus)
    .where(eq(waifus.source, source))
    .orderBy(desc(waifus.createdAt))
    .limit(limit)
    .offset(offset);
}

// Count total waifus
export async function count() {
  const result = await db.select({ count: sql<number>`count(*)` }).from(waifus);

  return result[0]?.count || 0;
}
