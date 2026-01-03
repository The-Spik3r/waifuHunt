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
  description: z.string().optional().openapi({
    description: "Descripción de la waifu",
    example:
      "La heroína principal de Sword Art Online, conocida por su destreza con la espada y su relación con Kirito.",
  }),
});
export const SearchWaifu = z.object({
  q: z.string().default("").openapi({
    description: "nombre de la waifu",
  }),
  limit: z.coerce.number().default(100).openapi({
    description: "máximo de waifus por obtener",
  }),
  offset: z.coerce.number().default(0).openapi({
    description: "offset para paginación",
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
  description: z.string().optional().openapi({
    description: "Descripción de la waifu",
    example:
      "La heroína principal de Sword Art Online, conocida por su destreza con la espada y su relación con Kirito.",
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
  description: z.string().nullable().openapi({
    description: "Descripción de la waifu",
    example:
      "La heroína principal de Sword Art Online, conocida por su destreza con la espada y su relación con Kirito.",
  }),
  createdAt: z.date().openapi({
    description: "Fecha de creación",
    example: new Date(),
  }),
});

// Tipos inferidos de los schemas
export type CreateWaifuBody = z.infer<typeof CreateWaifuBody>;
export type UpdateWaifuBody = z.infer<typeof UpdateWaifuBody>;
export type SearchWaifu = z.infer<typeof SearchWaifu>;
export type WaifuResponse = z.infer<typeof WaifuResponse>;
