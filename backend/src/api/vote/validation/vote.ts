import { z } from "zod";
import { extendZodWithOpenApi } from "zod-openapi";

extendZodWithOpenApi(z);

export const CreateVoteBody = z.object({
  userId: z.string().min(1).openapi({
    description: "ID del usuario que vota",
    example: "user_123",
  }),
  waifuId: z.string().min(1).openapi({
    description: "ID de la waifu votada",
    example: "waifu_123",
  }),
  value: z.number().min(1).optional().openapi({
    description: "Valor del voto (para boosts)",
    example: 1,
  }),
  source: z.string().optional().openapi({
    description: "Fuente del voto (normal/boost/premium)",
    example: "normal",
  }),
});

export const UpdateVoteBody = z.object({
  value: z.number().min(1).openapi({
    description: "Nuevo valor del voto (para boosts)",
    example: 2,
  }),
});

export const VoteResponse = z.object({
  id: z.string().openapi({
    description: "ID único del voto",
    example: "vote_123",
  }),
  userId: z.string().openapi({
    description: "ID del usuario",
    example: "user_123",
  }),
  waifuId: z.string().openapi({
    description: "ID de la waifu",
    example: "waifu_123",
  }),
  value: z.number().openapi({
    description: "Valor del voto",
    example: 1,
  }),
  source: z.string().nullable().openapi({
    description: "Fuente del voto",
    example: "normal",
  }),
  createdAt: z.date().openapi({
    description: "Fecha del voto",
    example: new Date(),
  }),
});

export const WaifuWithVotesResponse = z.object({
  id: z.string().openapi({
    description: "ID de la waifu",
    example: "waifu_123",
  }),
  name: z.string().openapi({
    description: "Nombre de la waifu",
    example: "Asuna Yuuki",
  }),
  slug: z.string().openapi({
    description: "Slug de la waifu",
    example: "asuna-yuuki",
  }),
  imageUrl: z.string().openapi({
    description: "URL de imagen",
    example: "https://example.com/asuna.jpg",
  }),
  source: z.string().nullable().openapi({
    description: "Fuente",
    example: "Sword Art Online",
  }),
  totalVotes: z.number().openapi({
    description: "Total de votos",
    example: 150,
  }),
  createdAt: z.date().openapi({
    description: "Fecha de creación",
    example: new Date(),
  }),
});

// Tipos inferidos de los schemas
export type CreateVoteBody = z.infer<typeof CreateVoteBody>;
export type UpdateVoteBody = z.infer<typeof UpdateVoteBody>;
export type VoteResponse = z.infer<typeof VoteResponse>;
export type WaifuWithVotesResponse = z.infer<typeof WaifuWithVotesResponse>;
