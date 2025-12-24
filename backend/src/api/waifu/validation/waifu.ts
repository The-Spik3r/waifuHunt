import { z } from "zod";
import { extendZodWithOpenApi } from "zod-openapi";

extendZodWithOpenApi(z);

export const CreateWaifuBody = z.object({
  name: z.string().min(1).openapi({
    description: "Nombre de la waifu",
    example: "Asuna Yuuki",
  }),
  slug: z.string().min(1).openapi({
    description: "Slug único para URL",
    example: "asuna-yuuki",
  }),
  imageUrl: z.string().url().openapi({
    description: "URL de la imagen",
    example: "https://example.com/asuna.jpg",
  }),
  source: z.string().optional().openapi({
    description: "Fuente (anime/manga/manhwa)",
    example: "Sword Art Online",
  }),
});

export const UpdateWaifuBody = z.object({
  name: z.string().min(1).optional().openapi({
    description: "Nombre de la waifu",
    example: "Asuna Yuuki",
  }),
  slug: z.string().min(1).optional().openapi({
    description: "Slug único para URL",
    example: "asuna-yuuki",
  }),
  imageUrl: z.string().url().optional().openapi({
    description: "URL de la imagen",
    example: "https://example.com/asuna.jpg",
  }),
  source: z.string().optional().openapi({
    description: "Fuente (anime/manga/manhwa)",
    example: "Sword Art Online",
  }),
});

export const WaifuResponse = z.object({
  id: z.string().openapi({
    description: "ID único de la waifu",
    example: "w_123",
  }),
  name: z.string().openapi({
    description: "Nombre de la waifu",
    example: "Asuna Yuuki",
  }),
  slug: z.string().openapi({
    description: "Slug único para URL",
    example: "asuna-yuuki",
  }),
  imageUrl: z.string().openapi({
    description: "URL de la imagen",
    example: "https://example.com/asuna.jpg",
  }),
  source: z.string().nullable().openapi({
    description: "Fuente (anime/manga/manhwa)",
    example: "Sword Art Online",
  }),
  createdAt: z.date().openapi({
    description: "Fecha de creación",
    example: new Date(),
  }),
});

// Tipos inferidos de los schemas
export type CreateWaifuBody = z.infer<typeof CreateWaifuBody>;
export type UpdateWaifuBody = z.infer<typeof UpdateWaifuBody>;
export type WaifuResponse = z.infer<typeof WaifuResponse>;
