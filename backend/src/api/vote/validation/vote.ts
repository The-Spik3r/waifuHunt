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
  description: z.string().nullable().openapi({
    description: "Descripción de la waifu",
    example: "La heroína principal de Sword Art Online.",
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

export const LeaderWaifuQueries = z.object({
  limit: z.string().optional().openapi({
    description: "Número de waifus a retornar",
    example: "10",
  }),
  offset: z.string().optional().openapi({
    description: "Número de waifus a saltar",
    example: "0",
  }),
});

// Response Schemas
export const MetaResponse = z
  .object({
    limit: z.number().openapi({
      description: "Límite de resultados",
      example: 10,
    }),
    offset: z.number().openapi({
      description: "Desplazamiento",
      example: 0,
    }),
    total: z.number().openapi({
      description: "Total de registros",
      example: 100,
    }),
    count: z.number().openapi({
      description: "Cantidad de registros en la respuesta",
      example: 10,
    }),
  })
  .openapi({
    example: {
      limit: 10,
      offset: 0,
      total: 100,
      count: 10,
    },
  });

export const LeaderboardResponse = z
  .object({
    data: z.array(WaifuWithVotesResponse).openapi({
      description: "Lista de waifus con votos",
    }),
    meta: MetaResponse,
  })
  .openapi({
    example: {
      data: [
        {
          id: "waifu_1",
          name: "Asuna Yuuki",
          slug: "asuna-yuuki",
          imageUrl: "https://example.com/asuna.jpg",
          description: "",
          source: "Sword Art Online",
          totalVotes: 250,
          createdAt: new Date("2024-01-15"),
        },
        {
          id: "waifu_2",
          name: "Mikasa Ackerman",
          slug: "mikasa-ackerman",
          imageUrl: "https://example.com/mikasa.jpg",
          source: "Attack on Titan",
          description: "",
          totalVotes: 200,
          createdAt: new Date("2024-01-16"),
        },
      ],
      meta: {
        limit: 10,
        offset: 0,
        total: 100,
        count: 2,
      },
    },
  });

export const VotesListResponse = z.array(VoteResponse).openapi({
  description: "Lista de votos",
  example: [
    {
      id: "vote_1",
      userId: "user_123",
      waifuId: "waifu_456",
      value: 1,
      source: "normal",
      createdAt: new Date("2024-01-15T10:30:00Z"),
    },
    {
      id: "vote_2",
      userId: "user_123",
      waifuId: "waifu_789",
      value: 2,
      source: "boost",
      createdAt: new Date("2024-01-16T14:20:00Z"),
    },
  ],
});

export const UserVoteCountResponse = z
  .object({
    userId: z.string().openapi({
      description: "ID del usuario",
      example: "user_123",
    }),
    totalVotes: z.number().openapi({
      description: "Total de votos del usuario",
      example: 25,
    }),
  })
  .openapi({
    example: {
      userId: "user_123",
      totalVotes: 25,
    },
  });

export const WaifuVoteCountResponse = z
  .object({
    waifuId: z.string().openapi({
      description: "ID de la waifu",
      example: "waifu_123",
    }),
    totalVotes: z.number().openapi({
      description: "Total de votos de la waifu",
      example: 150,
    }),
  })
  .openapi({
    example: {
      waifuId: "waifu_123",
      totalVotes: 150,
    },
  });

export const HasVotedResponse = z
  .object({
    hasVoted: z.boolean().openapi({
      description: "Indica si el usuario ya votó",
      example: true,
    }),
  })
  .openapi({
    example: {
      hasVoted: true,
    },
  });

export const ErrorResponse = z
  .object({
    error: z.string().openapi({
      description: "Mensaje de error",
      example: "Voto no encontrado",
    }),
  })
  .openapi({
    example: {
      error: "Voto no encontrado",
    },
  });

export const SuccessMessageResponse = z
  .object({
    message: z.string().openapi({
      description: "Mensaje de éxito",
      example: "Voto eliminado exitosamente",
    }),
  })
  .openapi({
    example: {
      message: "Voto eliminado exitosamente",
    },
  });

export const UserVotedWaifusResponse = z
  .array(
    z.object({
      vote: VoteResponse,
      waifu: z.object({
        id: z.string(),
        name: z.string(),
        slug: z.string(),
        imageUrl: z.string(),
        source: z.string().nullable(),
        createdAt: z.date(),
      }),
    })
  )
  .openapi({
    description:
      "Lista de waifus votadas por el usuario con información del voto",
    example: [
      {
        vote: {
          id: "vote_1",
          userId: "user_123",
          waifuId: "waifu_456",
          value: 1,
          source: "normal",
          createdAt: new Date("2024-01-15T10:30:00Z"),
        },
        waifu: {
          id: "waifu_456",
          name: "Asuna Yuuki",
          slug: "asuna-yuuki",
          imageUrl: "https://example.com/asuna.jpg",
          source: "Sword Art Online",
          createdAt: new Date("2024-01-10T08:00:00Z"),
        },
      },
      {
        vote: {
          id: "vote_2",
          userId: "user_123",
          waifuId: "waifu_789",
          value: 2,
          source: "boost",
          createdAt: new Date("2024-01-16T14:20:00Z"),
        },
        waifu: {
          id: "waifu_789",
          name: "Mikasa Ackerman",
          slug: "mikasa-ackerman",
          imageUrl: "https://example.com/mikasa.jpg",
          source: "Attack on Titan",
          createdAt: new Date("2024-01-11T09:15:00Z"),
        },
      },
    ],
  });

// Tipos inferidos de los schemas
export type CreateVoteBody = z.infer<typeof CreateVoteBody>;
export type UpdateVoteBody = z.infer<typeof UpdateVoteBody>;
export type VoteResponse = z.infer<typeof VoteResponse>;
export type WaifuWithVotesResponse = z.infer<typeof WaifuWithVotesResponse>;
