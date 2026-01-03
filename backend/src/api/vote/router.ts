import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { validator as zValidator } from "hono-openapi/zod";
import {
  CreateVoteBody,
  UpdateVoteBody,
  LeaderWaifuQueries,
  VoteResponse,
  VotesListResponse,
  LeaderboardResponse,
  UserVoteCountResponse,
  WaifuVoteCountResponse,
  HasVotedResponse,
  ErrorResponse,
  SuccessMessageResponse,
  UserVotedWaifusResponse,
} from "./validation";

export const voteRoute = new Hono()
  .get(
    "/",
    describeRoute({
      tags: ["Votes"],
      description: "Obtener todos los votos con paginación",
      responses: {
        200: {
          description: "Lista de votos",
          content: {
            "application/json": {
              schema: VotesListResponse,
            },
          },
        },
      },
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const limit = Number(c.req.query("limit")) || 100;
      const offset = Number(c.req.query("offset")) || 0;

      const votes = await voteService.getAll(limit, offset);
      return c.json(votes);
    }
  )
  .post(
    "/",
    zValidator("json", CreateVoteBody),
    describeRoute({
      tags: ["Votes"],
      description: "Crear un nuevo voto",
      responses: {
        201: {
          description: "Voto creado exitosamente",
          content: {
            "application/json": {
              schema: VoteResponse,
            },
          },
        },
        409: {
          description: "El usuario ya votó por esta waifu",
          content: {
            "application/json": {
              schema: ErrorResponse,
            },
          },
        },
      },
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const body = c.req.valid("json");

      try {
        const newVote = await voteService.create(body);
        return c.json(newVote, 201);
      } catch (error) {
        if (error instanceof Error && error.message.includes("already voted")) {
          return c.json({ error: "Ya has votado por esta waifu" }, 409);
        }
        throw error;
      }
    }
  )
  .get(
    "/leaderboard",
    zValidator("query", LeaderWaifuQueries),
    describeRoute({
      tags: ["Votes"],
      description: "Obtener el ranking de waifus más votadas",
      responses: {
        200: {
          description: "Ranking de waifus con metadatos de paginación",
          content: {
            "application/json": {
              schema: LeaderboardResponse,
            },
          },
        },
      },
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const query = c.req.valid("query");
      const limit = Number(query.limit) || 10;
      const offset = Number(query.offset) || 0;

      const result = await voteService.getTopWaifus(limit, offset);
      return c.json(result);
    }
  )
  .get(
    "/user/:userId",
    describeRoute({
      tags: ["Votes"],
      description: "Obtener votos de un usuario",
      responses: {
        200: {
          description: "Lista de votos del usuario",
          content: {
            "application/json": {
              schema: VotesListResponse,
            },
          },
        },
      },
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const userId = c.req.param("userId");
      const limit = Number(c.req.query("limit")) || 50;
      const offset = Number(c.req.query("offset")) || 0;

      const votes = await voteService.getByUserId(userId, limit, offset);
      return c.json(votes);
    }
  )
  .get(
    "/user/:userId/waifus",
    describeRoute({
      tags: ["Votes"],
      description: "Obtener waifus votadas por un usuario",
      responses: {
        200: {
          description: "Lista de waifus votadas por el usuario",
          content: {
            "application/json": {
              schema: UserVotedWaifusResponse,
            },
          },
        },
      },
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const userId = c.req.param("userId");
      const limit = Number(c.req.query("limit")) || 50;
      const offset = Number(c.req.query("offset")) || 0;

      const votedWaifus = await voteService.getUserVotedWaifus(
        userId,
        limit,
        offset
      );
      return c.json(votedWaifus);
    }
  )
  .get(
    "/user/:userId/count",
    describeRoute({
      tags: ["Votes"],
      description: "Obtener el total de votos de un usuario",
      responses: {
        200: {
          description: "Total de votos del usuario",
          content: {
            "application/json": {
              schema: UserVoteCountResponse,
            },
          },
        },
      },
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const userId = c.req.param("userId");

      const count = await voteService.getUserVoteCount(userId);
      return c.json({ userId, totalVotes: count });
    }
  )
  .get(
    "/waifu/:waifuId",
    describeRoute({
      tags: ["Votes"],
      description: "Obtener votos de una waifu",
      responses: {
        200: {
          description: "Lista de votos de la waifu",
          content: {
            "application/json": {
              schema: VotesListResponse,
            },
          },
        },
      },
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const waifuId = c.req.param("waifuId");
      const limit = Number(c.req.query("limit")) || 50;
      const offset = Number(c.req.query("offset")) || 0;

      const votes = await voteService.getByWaifuId(waifuId, limit, offset);
      return c.json(votes);
    }
  )
  .get(
    "/waifu/:waifuId/count",
    describeRoute({
      tags: ["Votes"],
      description: "Obtener el total de votos de una waifu",
      responses: {
        200: {
          description: "Total de votos de la waifu",
          content: {
            "application/json": {
              schema: WaifuVoteCountResponse,
            },
          },
        },
      },
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const waifuId = c.req.param("waifuId");

      const total = await voteService.getWaifuVoteCount(waifuId);
      return c.json({ waifuId, totalVotes: total });
    }
  )
  .get(
    "/check/:userId/:waifuId",
    describeRoute({
      tags: ["Votes"],
      description: "Verificar si un usuario ya votó por una waifu",
      responses: {
        200: {
          description: "Estado de votación del usuario",
          content: {
            "application/json": {
              schema: HasVotedResponse,
            },
          },
        },
      },
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const userId = c.req.param("userId");
      const waifuId = c.req.param("waifuId");

      const hasVoted = await voteService.hasUserVoted(userId, waifuId);
      return c.json({ hasVoted });
    }
  )
  .get(
    "/:id",
    describeRoute({
      tags: ["Votes"],
      description: "Obtener un voto por ID",
      responses: {
        200: {
          description: "Voto encontrado",
          content: {
            "application/json": {
              schema: VoteResponse,
            },
          },
        },
        404: {
          description: "Voto no encontrado",
          content: {
            "application/json": {
              schema: ErrorResponse,
            },
          },
        },
      },
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const id = c.req.param("id");
      const vote = await voteService.getById(id);

      if (!vote) {
        return c.json({ error: "Voto no encontrado" }, 404);
      }

      return c.json(vote);
    }
  )
  .patch(
    "/:id",
    zValidator("json", UpdateVoteBody),
    describeRoute({
      tags: ["Votes"],
      description: "Actualizar el valor de un voto (boost)",
      responses: {
        200: {
          description: "Voto actualizado exitosamente",
          content: {
            "application/json": {
              schema: VoteResponse,
            },
          },
        },
        404: {
          description: "Voto no encontrado",
          content: {
            "application/json": {
              schema: ErrorResponse,
            },
          },
        },
      },
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const id = c.req.param("id");
      const body = c.req.valid("json");

      const updatedVote = await voteService.updateValue(id, body.value);

      if (!updatedVote) {
        return c.json({ error: "Voto no encontrado" }, 404);
      }

      return c.json(updatedVote);
    }
  )
  .delete(
    "/:id",
    describeRoute({
      tags: ["Votes"],
      description: "Eliminar un voto",
      responses: {
        200: {
          description: "Voto eliminado exitosamente",
          content: {
            "application/json": {
              schema: SuccessMessageResponse,
            },
          },
        },
        404: {
          description: "Voto no encontrado",
          content: {
            "application/json": {
              schema: ErrorResponse,
            },
          },
        },
      },
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const id = c.req.param("id");

      const deletedVote = await voteService.deleteById(id);

      if (!deletedVote) {
        return c.json({ error: "Voto no encontrado" }, 404);
      }

      return c.json({ message: "Voto eliminado exitosamente" });
    }
  )
  .delete(
    "/user/:userId/waifu/:waifuId",
    describeRoute({
      tags: ["Votes"],
      description: "Eliminar voto de un usuario para una waifu específica",
      responses: {
        200: {
          description: "Voto eliminado exitosamente",
          content: {
            "application/json": {
              schema: SuccessMessageResponse,
            },
          },
        },
        404: {
          description: "Voto no encontrado",
          content: {
            "application/json": {
              schema: ErrorResponse,
            },
          },
        },
      },
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const userId = c.req.param("userId");
      const waifuId = c.req.param("waifuId");

      const deletedVote = await voteService.deleteUserVote(userId, waifuId);

      if (!deletedVote) {
        return c.json({ error: "Voto no encontrado" }, 404);
      }

      return c.json({ message: "Voto eliminado exitosamente" });
    }
  );
